// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Codemod: Retarget provably Field-family FieldStatusVariant imports
 *
 * FieldStatusVariant now describes only variants rendered by FieldStatus.
 * Field-family statusVariant props use FieldStatusPresentation, which also
 * includes the tooltip sentinel consumed before FieldStatus renders.
 *
 * The Field subpath exports both Field and FieldStatus, so an import alone does
 * not reveal which contract the type describes. This transform changes an
 * import only when every reference to that binding is a cast written directly
 * on a known Field-family component's `statusVariant` JSX prop. All other uses
 * remain unchanged for manual review.
 */

export const meta = {
  title: 'Retarget Field status presentation type imports',
  description:
    'Retargets FieldStatusVariant imports only when every use is directly on ' +
    'a known Field-family statusVariant prop. Ambiguous and mixed direct-' +
    'FieldStatus uses remain unchanged for manual review.',
  pr: '#5738',
};

const FIELD_IMPORT_SOURCES = new Set([
  '@astryxdesign/core/Field',
  '@xds/core/Field',
]);

const FIELD_FAMILY_COMPONENTS = new Set([
  'ComplexSelector',
  'DateInput',
  'DateRangeInput',
  'Field',
  'FileInput',
  'MultiSelector',
  'NumberInput',
  'PowerSearch',
  'RichTextEditor',
  'Selector',
  'TextArea',
  'TextInput',
  'TimeInput',
  'Tokenizer',
  'TransferList',
  'Typeahead',
]);

const FIELD_FAMILY_IMPORT_PREFIXES = [
  '@astryxdesign/core',
  '@astryxdesign/lab',
  '@astryxdesign/richtext',
  '@xds/core',
];

/** @param {string} source */
function isFieldFamilyImportSource(source) {
  return FIELD_FAMILY_IMPORT_PREFIXES.some(
    prefix => source === prefix || source.startsWith(`${prefix}/`),
  );
}

/** @param {any} node */
function jsxIdentifierName(node) {
  return node?.type === 'JSXIdentifier' ? node.name : null;
}

/** @param {any} identifierPath */
function isInsideImport(identifierPath) {
  for (let path = identifierPath; path != null; path = path.parentPath) {
    if (path.node?.type === 'ImportDeclaration') {
      return true;
    }
  }
  return false;
}

/**
 * @param {any} identifierPath
 * @param {Map<string, any>} fieldFamilyBindings
 */
function isSafeStatusVariantTypeReference(identifierPath, fieldFamilyBindings) {
  let expressionPath = null;
  for (let path = identifierPath; path != null; path = path.parentPath) {
    if (
      path.node?.type === 'TSAsExpression' ||
      path.node?.type === 'TSTypeAssertion'
    ) {
      expressionPath = path;
      break;
    }
    if (path.node?.type === 'ImportDeclaration') {
      return false;
    }
  }
  if (expressionPath == null) {
    return false;
  }

  const containerPath = expressionPath.parentPath;
  const attributePath = containerPath?.parentPath;
  const openingPath = attributePath?.parentPath;
  if (
    containerPath?.node?.type !== 'JSXExpressionContainer' ||
    attributePath?.node?.type !== 'JSXAttribute' ||
    jsxIdentifierName(attributePath.node.name) !== 'statusVariant' ||
    openingPath?.node?.type !== 'JSXOpeningElement'
  ) {
    return false;
  }

  const componentName = jsxIdentifierName(openingPath.node.name);
  if (componentName == null) {
    return false;
  }
  const importScope = fieldFamilyBindings.get(componentName);
  return (
    importScope != null &&
    openingPath.get('name').scope.lookup(componentName) === importScope
  );
}

/**
 * @param {import('../../../../authoring/codemod/type').AstryxCodemodFile} file
 * @param {import('../../../../authoring/codemod/type').CodemodTransformApi} api
 * @returns {string | null | undefined}
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  /** @type {Map<string, any>} */
  const fieldFamilyBindings = new Map();
  let hasChanges = false;

  root.find(j.ImportDeclaration).forEach((/** @type {any} */ path) => {
    const source = path.node.source.value;
    if (!isFieldFamilyImportSource(source)) {
      return;
    }
    for (const specifier of path.node.specifiers ?? []) {
      if (
        specifier.type === 'ImportSpecifier' &&
        FIELD_FAMILY_COMPONENTS.has(specifier.imported.name)
      ) {
        fieldFamilyBindings.set(
          specifier.local?.name ?? specifier.imported.name,
          path.scope,
        );
      }
    }
  });

  root.find(j.ImportDeclaration).forEach((/** @type {any} */ path) => {
    if (!FIELD_IMPORT_SOURCES.has(path.node.source.value)) {
      return;
    }

    for (const [index, specifier] of (path.node.specifiers ?? []).entries()) {
      if (
        specifier.type !== 'ImportSpecifier' ||
        specifier.imported.name !== 'FieldStatusVariant'
      ) {
        continue;
      }

      const localName = specifier.local?.name ?? specifier.imported.name;
      const importScope = path.scope;
      /** @type {any[]} */
      const references = [];
      root
        .find(j.Identifier, {name: localName})
        .forEach((/** @type {any} */ identifierPath) => {
          if (
            !isInsideImport(identifierPath) &&
            identifierPath.scope.lookup(localName) === importScope
          ) {
            references.push(identifierPath);
          }
        });

      if (
        references.length === 0 ||
        !references.every((/** @type {any} */ identifierPath) =>
          isSafeStatusVariantTypeReference(identifierPath, fieldFamilyBindings),
        )
      ) {
        continue;
      }

      // Preserve the local binding so no consumer references need rewriting.
      const replacement = j.importSpecifier(
        j.identifier('FieldStatusPresentation'),
        j.identifier(localName),
      );
      replacement.importKind = specifier.importKind;
      path.node.specifiers[index] = replacement;
      hasChanges = true;
    }
  });

  if (!hasChanges) {
    return undefined;
  }
  return root.toSource({quote: 'single'});
}
