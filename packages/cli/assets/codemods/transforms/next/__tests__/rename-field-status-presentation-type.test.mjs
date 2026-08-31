// Copyright (c) Meta Platforms, Inc. and affiliates.

import {describe, expect, it} from 'vitest';

async function applyTransform(source) {
  const {default: transform} =
    await import('../rename-field-status-presentation-type.mjs');
  const jscodeshift = (await import('jscodeshift')).default;
  const j = jscodeshift.withParser('tsx');
  const api = {jscodeshift: j, stats: () => {}, report: () => {}};
  const file = {source, path: 'test.tsx'};
  const result = transform(file, api);
  return result ?? source;
}

describe('rename-field-status-presentation-type', () => {
  it('retargets a cast directly on a Field-family statusVariant prop', async () => {
    const input = `import {Field, type FieldStatusVariant} from '@astryxdesign/core/Field';
const field = (
  <Field label="Email" inputID="email" statusVariant={'tooltip' as FieldStatusVariant}>
    <input id="email" />
  </Field>
);`;

    const output = await applyTransform(input);

    expect(output).toContain(`FieldStatusPresentation as FieldStatusVariant`);
    expect(output).toContain(`statusVariant={'tooltip' as FieldStatusVariant}`);
  });

  it('recognizes aliased Field-family components and type imports', async () => {
    const input = `import {TextInput as Input} from '@astryxdesign/core/TextInput';
import type {FieldStatusVariant as Presentation} from '@astryxdesign/core/Field';
const field = <Input label="Email" value="" onChange={() => {}} statusVariant={'tooltip' as Presentation} />;`;

    const output = await applyTransform(input);

    expect(output).toContain(`FieldStatusPresentation as Presentation`);
    expect(output).toContain(`'tooltip' as Presentation`);
  });

  it('leaves a standalone type annotation unchanged because its use is ambiguous', async () => {
    const input = `import type {FieldStatusVariant} from '@astryxdesign/core/Field';
const presentation: FieldStatusVariant = 'tooltip';`;

    expect(await applyTransform(input)).toBe(input);
  });

  it('leaves mixed Field-family and direct FieldStatus usage unchanged', async () => {
    const input = `import {Field, FieldStatus, type FieldStatusVariant} from '@astryxdesign/core/Field';
const content = (
  <>
    <Field label="Email" inputID="email" statusVariant={'tooltip' as FieldStatusVariant}>
      <input id="email" />
    </Field>
    <FieldStatus type="error" message="Invalid" variant={'attached' as FieldStatusVariant} />
  </>
);`;

    expect(await applyTransform(input)).toBe(input);
  });

  it('does not collide with an existing FieldStatusPresentation import', async () => {
    const input = `import {Field, type FieldStatusVariant, type FieldStatusPresentation} from '@astryxdesign/core/Field';
const field = <Field label="Email" inputID="email" statusVariant={'tooltip' as FieldStatusVariant}><input id="email" /></Field>;
const other: FieldStatusPresentation = 'attached';`;

    const output = await applyTransform(input);

    expect(output).toContain(
      `FieldStatusPresentation as FieldStatusVariant, type FieldStatusPresentation`,
    );
    expect(output).toContain(`const other: FieldStatusPresentation`);
  });

  it('leaves a parameter shadowing an imported Field-family component unchanged', async () => {
    const input = `import {Field, type FieldStatusVariant} from '@astryxdesign/core/Field';
function Example(Field: React.ComponentType<any>) {
  return <Field statusVariant={'tooltip' as FieldStatusVariant} />;
}`;

    expect(await applyTransform(input)).toBe(input);
  });

  it('leaves a local binding shadowing an imported Field-family component unchanged', async () => {
    const input = `import {TextInput, type FieldStatusVariant} from '@astryxdesign/core/Field';
function Example() {
  const TextInput = CustomInput;
  return <TextInput statusVariant={'tooltip' as FieldStatusVariant} />;
}`;

    expect(await applyTransform(input)).toBe(input);
  });

  it('is idempotent', async () => {
    const input = `import {Field, type FieldStatusVariant} from '@astryxdesign/core/Field';
const field = <Field label="Email" inputID="email" statusVariant={'tooltip' as FieldStatusVariant}><input id="email" /></Field>;`;

    const once = await applyTransform(input);
    expect(await applyTransform(once)).toBe(once);
  });

  it('leaves re-exports for manual migration', async () => {
    const input = `export type {FieldStatusVariant} from '@astryxdesign/core/Field';`;

    expect(await applyTransform(input)).toBe(input);
  });

  it('leaves ambiguous root and direct-component imports unchanged', async () => {
    const rootImport = `import type {FieldStatusVariant} from '@astryxdesign/core';`;
    const directImport = `import type {FieldStatusVariant} from '@astryxdesign/core/FieldStatus';`;

    expect(await applyTransform(rootImport)).toBe(rootImport);
    expect(await applyTransform(directImport)).toBe(directImport);
  });
});
