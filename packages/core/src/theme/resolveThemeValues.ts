// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file resolveThemeValues.ts
 * @input The value-bearing axes of a theme input (typography, color, radius,
 *        motion, syntax, tokens, components) and an optional resolved seed
 * @output A resolved token map and component style map
 * @position Theme system core; consumed by defineTheme and themeTiers
 *
 * One resolution pipeline, shared by every layer that turns declarative theme
 * axes into concrete values. `defineTheme` runs its top-level input through it;
 * a width tier runs its merged input through the same function.
 *
 * That sharing is the point. A tier is not "the base theme plus a few patched
 * tokens" — it is a theme input in its own right, resolved from scratch. Two
 * classes of bug follow from resolving a tier as a patch instead, and neither
 * is expressible here:
 *
 * - A tier that sets `typography.scale` cannot revert the base theme's font
 *   *weights*, because the weights come from the merged typography config
 *   rather than from the built-in defaults.
 * - A tier that sets a generated axis (`color`, `radius`, `motion`) cannot beat
 *   the base theme's explicit `tokens`, because explicit tokens are applied
 *   last here, exactly as they are for the base theme.
 *
 * Precedence, lowest to highest: seed → color → type scale → radius → motion →
 * font families → syntax → explicit `tokens`.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/theme/defineTheme.ts (its only other caller)
 * - /packages/core/src/theme/themeTiers.ts
 */

import type {ComponentStyleMap, TokenName, TokenValue} from './defineTheme';
import type {TypographyConfig, FontWeight} from './types';
import type {SyntaxThemeDefinition} from './syntax';
import {
  expandTypeScale,
  generateTypeScaleComponents,
  type TypeScaleConfig,
} from './expandTypeScale';
import {expandMotionScale, type MotionScaleConfig} from './expandMotionScale';
import {expandRadiusScale, type RadiusScaleConfig} from './expandRadiusScale';
import {expandColorScale, type ColorScaleConfig} from './expandColorScale';
import {deepMergeComponents} from './mergeComponents';

// =============================================================================
// Types
// =============================================================================

/**
 * The value-bearing axes of a theme — everything that resolves to tokens or
 * component styles. Deliberately excludes identity (`name`), inheritance
 * (`extends`), the registries (`icons`, `indicators`), the surface overrides
 * (`onDark`/`onLight`) and the tiers themselves: none of those participate in
 * value resolution.
 */
export interface ThemeValuesInput {
  /** Typography — fonts, scale, and weights. */
  typography?: TypographyConfig;
  /** Color scale configuration. */
  color?: ColorScaleConfig;
  /** Radius scale configuration. */
  radius?: RadiusScaleConfig;
  /** Motion scale configuration. */
  motion?: MotionScaleConfig;
  /** Syntax highlighting theme. */
  syntax?: SyntaxThemeDefinition;
  /** Explicit token overrides — highest precedence. */
  tokens?: Partial<Record<TokenName, TokenValue>>;
  /** Component style overrides. */
  components?: ComponentStyleMap;
}

/** Already-resolved values to start from — the lowest precedence layer. */
export interface ThemeValuesSeed {
  /** Resolved token values. */
  tokens?: Record<string, string>;
  /** Resolved component styles. */
  components?: ComponentStyleMap;
}

/** The resolved output of one theme layer. */
export interface ResolvedThemeValues {
  /** Resolved token CSS values. */
  tokens: Record<string, string>;
  /** Resolved component style overrides, if any. */
  components?: ComponentStyleMap;
}

// =============================================================================
// Value helpers
// =============================================================================

/**
 * Resolve a token value to a CSS string.
 * - String values pass through as-is
 * - [light, dark] tuples become light-dark(light, dark)
 */
export function resolveTokenValue(value: TokenValue): string {
  if (Array.isArray(value)) {
    return `light-dark(${value[0]}, ${value[1]})`;
  }
  return value;
}

/**
 * Resolve a FontWeight name to a var() reference.
 * Named weights map to var(--font-weight-*); raw values pass through.
 */
export function resolveFontWeight(weight: FontWeight): string {
  const named: Record<string, string> = {
    normal: 'var(--font-weight-normal)',
    medium: 'var(--font-weight-medium)',
    semibold: 'var(--font-weight-semibold)',
    bold: 'var(--font-weight-bold)',
  };
  return named[weight] ?? weight;
}

/**
 * Build the full CSS font-family value from family + fallbacks.
 * Quotes the family name if it contains spaces.
 */
export function buildFontFamily(
  family?: string,
  fallbacks?: string,
): string | undefined {
  if (!family) {
    return undefined;
  }
  const quoted = family.includes(' ') ? `"${family}"` : family;
  if (fallbacks) {
    return `${quoted}, ${fallbacks}`;
  }
  return quoted;
}

// =============================================================================
// Axis builders
// =============================================================================

/**
 * Build the type-scale config from a typography config, collecting the weight
 * overrides its roles imply.
 *
 * Returns undefined when the config declares no scale — font families and
 * weights alone do not produce one.
 */
export function buildTypeScaleConfig(
  typo: TypographyConfig,
): TypeScaleConfig | undefined {
  if (!typo.scale) {
    return undefined;
  }

  // Collect weight overrides from typography roles
  const headingWeights: Partial<Record<1 | 2 | 3 | 4 | 5 | 6, string>> = {};
  const headingRole = typo.heading;
  if (headingRole?.weights) {
    for (const [level, w] of Object.entries(headingRole.weights)) {
      if (w) {
        headingWeights[Number(level) as 1 | 2 | 3 | 4 | 5 | 6] =
          resolveFontWeight(w);
      }
    }
  }
  // Default heading weight from role
  const defaultHeadingWeight = headingRole?.weight
    ? resolveFontWeight(headingRole.weight)
    : undefined;
  if (defaultHeadingWeight) {
    for (let i = 1; i <= 6; i++) {
      if (!(i in headingWeights)) {
        headingWeights[i as 1 | 2 | 3 | 4 | 5 | 6] = defaultHeadingWeight;
      }
    }
  }

  // Text weight overrides from roles
  const textWeights: Partial<Record<string, string>> = {};
  if (typo.body?.weight) {
    textWeights.body = resolveFontWeight(typo.body.weight);
  }
  if (typo.code?.weight) {
    textWeights.code = resolveFontWeight(typo.code.weight);
  }

  return {
    base: typo.scale.base,
    ratio: typo.scale.ratio,
    weights: {
      ...(Object.keys(headingWeights).length > 0
        ? {heading: headingWeights}
        : {}),
      ...(Object.keys(textWeights).length > 0 ? {text: textWeights} : {}),
    },
  };
}

/**
 * Build the `--font-family-*` token overrides implied by a typography config.
 * Heading inherits from body when it declares no family of its own.
 */
export function buildFontFamilyTokens(
  typo: TypographyConfig,
): Record<string, string> {
  const tokens: Record<string, string> = {};

  const bodyFamily = buildFontFamily(typo.body?.family, typo.body?.fallbacks);
  const headingFamily =
    buildFontFamily(typo.heading?.family, typo.heading?.fallbacks) ??
    bodyFamily;
  const codeFamily = buildFontFamily(typo.code?.family, typo.code?.fallbacks);

  if (bodyFamily) {
    tokens['--font-family-body'] = bodyFamily;
  }
  if (headingFamily) {
    tokens['--font-family-heading'] = headingFamily;
  }
  if (codeFamily) {
    tokens['--font-family-code'] = codeFamily;
  }

  return tokens;
}

// =============================================================================
// Resolution
// =============================================================================

/**
 * Resolve one theme layer's declarative axes into tokens and component styles.
 *
 * `seed` is the already-resolved layer underneath — the base theme for an
 * `extends`, or nothing for a root theme. It sits below everything this input
 * declares.
 */
export function resolveThemeValues(
  input: ThemeValuesInput,
  seed?: ThemeValuesSeed,
): ResolvedThemeValues {
  const tokens: Record<string, string> = {...seed?.tokens};

  const typo = input.typography;
  const typeScaleConfig = typo ? buildTypeScaleConfig(typo) : undefined;

  // 1. Color-generated tokens (lowest precedence for colors)
  if (input.color) {
    Object.assign(tokens, expandColorScale(input.color));
  }

  // 2. Type-scale-generated tokens
  if (typeScaleConfig) {
    Object.assign(tokens, expandTypeScale(typeScaleConfig));
  }

  // 3. Radius-generated tokens
  if (input.radius) {
    Object.assign(tokens, expandRadiusScale(input.radius));
  }

  // 4. Motion-generated tokens
  if (input.motion) {
    Object.assign(tokens, expandMotionScale(input.motion));
  }

  // 5. Font family tokens
  if (typo) {
    Object.assign(tokens, buildFontFamilyTokens(typo));
  }

  // 6. Syntax theme tokens
  if (input.syntax) {
    const prefix = '--color-syntax-';
    for (const [key, value] of Object.entries(input.syntax.tokens)) {
      tokens[prefix + key] = value;
    }
  }

  // 7. Explicit token overrides — highest precedence, over everything
  // generated above. This is the rule that keeps a generated axis in one
  // layer from silently beating an explicit token in the layer below it.
  if (input.tokens) {
    for (const [key, value] of Object.entries(input.tokens)) {
      if (value !== undefined) {
        tokens[key] = resolveTokenValue(value);
      }
    }
  }

  // Components: generated type-scale rules (lowest) → this input's own →
  // all of it over the seed's.
  let components = input.components;
  if (typeScaleConfig) {
    components = deepMergeComponents(
      generateTypeScaleComponents(typeScaleConfig),
      input.components,
    );
  }
  if (seed?.components) {
    components = deepMergeComponents(seed.components, components);
  }

  return {tokens, components};
}
