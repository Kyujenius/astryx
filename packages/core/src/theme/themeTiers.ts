// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file themeTiers.ts
 * @input Width-tier overrides from defineTheme (`mobile`, `tablet`, `desktop`,
 *        `wide`) and the root theme's own value axes
 * @output Resolved tier layers — a media query plus fully resolved values
 * @position Theme system core; consumed by defineTheme and generateThemeRules
 *
 * A **width tier** is a named viewport band a theme can give different values
 * to. Tiers are named rather than written as raw media queries so an author
 * never has to invent a breakpoint, and so a tier can be referred to by name
 * from elsewhere in the system.
 *
 * Two properties define the model:
 *
 * **Tiers partition the width axis.** Exactly one tier matches at any viewport
 * width, so there is never a question of which tier wins — the question does
 * not arise.
 *
 * Only *declared* tiers take part in that partition. A tier a theme does not
 * declare is not a narrower band with nothing in it — it is not a boundary at
 * all, and the tier above it reaches down to wherever the nearest declared
 * tier below it ends. A theme declaring `mobile` and `desktop` has one
 * boundary and two bands: phone, and everything else up to the desktop line.
 * Above the widest declared tier, and below the narrowest, the theme's own
 * values apply — which is what a theme with no tiers resolves to everywhere.
 *
 * **`extends` is value inheritance, not the cascade.** A tier that extends
 * another is resolved by merging their inputs and running the result through
 * the ordinary resolution pipeline, exactly as the base theme is. It does not
 * mean "the other tier's CSS also applies here" — nothing about a tier's CSS
 * reaches a viewport outside its own band.
 *
 * Pointer state is a separate axis, nested inside a tier:
 *
 * ```ts
 * mobile: {
 *   tokens: {'--spacing-4': '12px'},              // narrow, any pointer
 *   '@media (pointer: coarse)': {                  // narrow AND touch
 *     typography: {scale: {base: 16}},
 *   },
 * }
 * ```
 *
 * Width and pointer stay separate because the reasons to adapt are separate. A
 * 16px body floor is a *touch* concern — iOS Safari zooms an input whose text
 * is under 16px, on a phone and on a tablet alike, and never on a desktop
 * window dragged narrow. Tighter gutters are a *width* concern. Fusing them
 * into one condition gives the wrong answer to every device that is one but
 * not the other.
 *
 * Unset means nothing is emitted: a theme that declares no tier produces no
 * tier layer, no CSS, and output byte-identical to a theme defined before
 * tiers existed.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/theme/defineTheme.ts (`DefineThemeInput` tier fields)
 * - /packages/core/src/theme/generateThemeRules.ts (`generateTierCSS`)
 * - /packages/cli/assets/theme.template.ts (documents every field)
 * - /packages/cli/assets/docs/theme.doc.mjs (`astryx docs theme`)
 * - /packages/cli/api/theme/build/build.mjs (`INPUT_ONLY_FIELDS`)
 */

import type {ComponentStyleMap, TokenName, TokenValue} from './defineTheme';
import type {TypographyConfig, TypographyRole} from './types';
import type {MotionScaleConfig} from './expandMotionScale';
import type {RadiusScaleConfig} from './expandRadiusScale';
import type {ColorScaleConfig} from './expandColorScale';
import {
  resolveThemeValues,
  type ResolvedThemeValues,
  type ThemeValuesInput,
  type ThemeValuesSeed,
} from './resolveThemeValues';
import {deepMergeComponents} from './mergeComponents';

// =============================================================================
// Tier vocabulary
// =============================================================================

/**
 * The width tiers, narrowest first.
 *
 * The vocabulary is fixed rather than open so a tier can be named from outside
 * the theme — by a component prop, a layout primitive, or documentation — and
 * mean the same band everywhere.
 */
export const WIDTH_TIERS = ['mobile', 'tablet', 'desktop', 'wide'] as const;

/** A width tier a theme can give values to. */
export type WidthTier = (typeof WIDTH_TIERS)[number];

/**
 * Default upper bound per tier, in px — the widest viewport still inside it.
 *
 * These apply to a tier the theme *declares*. An undeclared tier contributes
 * no boundary at all, so these are defaults, not fixed lines on the axis.
 *
 * `wide` has no entry: it is open-topped by definition, everything above
 * `desktop`. 756 is the canonical phone line, 1024 is iPad landscape, and 1440
 * is the usual laptop-to-large-display boundary.
 */
export const DEFAULT_TIER_MAX_WIDTH: Record<
  Exclude<WidthTier, 'wide'>,
  number
> = {
  mobile: 756,
  tablet: 1024,
  desktop: 1440,
};

/**
 * The scales a partial one in a tier is completed from when the theme has no
 * scale of its own.
 *
 * A tier can restate part of a scale (`radius: {multiplier: 0}`), and the
 * expanders take complete configs — so a partial merged over a theme that
 * declared no scale of its own has to land somewhere. It lands here rather
 * than reaching an expander with an undefined field, which computes `NaN` and
 * emits it as a value no browser rejects and nothing renders from.
 *
 * These APPROXIMATE the shipped token defaults rather than reproducing them.
 * `radius` is exact. The duration table is hand-rounded and no single ratio
 * reproduces it — 175×r = 130 and 175÷r = 230 want different ratios — so
 * completing a partial `motion` recomputes the whole axis and two of its nine
 * tokens land 5ms from the shipped value. `themeTiers.test.ts` pins exactly
 * which, so the difference is a documented one rather than a surprise.
 *
 * SYNC: /packages/core/src/theme/expandRadiusScale.ts,
 *       /packages/core/src/theme/expandMotionScale.ts,
 *       /packages/core/src/theme/tokens.stylex.ts (durationDefaults)
 */
export const DEFAULT_RADIUS_SCALE: RadiusScaleConfig = {base: 4, multiplier: 1};

/** @see DEFAULT_RADIUS_SCALE */
export const DEFAULT_MOTION_SCALE: MotionScaleConfig = {
  fast: 175,
  medium: 410,
  slow: 975,
  ratio: 0.75,
};

/**
 * The type scale Astryx ships with, mirroring the built-in token defaults.
 *
 * A tier that raises `base` without stating a `ratio` inherits the theme's own
 * ratio; this is the fallback for a theme that declares no scale at all.
 *
 * SYNC: /packages/core/src/theme/tokens.stylex.ts (typeScaleDefaults)
 */
export const DEFAULT_TYPE_SCALE = {base: 14, ratio: 1.2} as const;

/**
 * The media key a tier refinement is declared under: `'@media (pointer:
 * coarse)'` or `'@media (pointer: fine)'`.
 *
 * Real CSS notation, with the suffix fenced to what the theme layer
 * implements. `coarse` is a finger or a stylus, `fine` is a mouse or a
 * trackpad — the *primary* pointer, not `any-pointer`, so a laptop with a
 * touchscreen stays on the fine side.
 *
 * The fence is deliberate. An open `@media ${string}` reads as a promise that
 * the whole CSS media-query surface works here, and the axis it most invites —
 * `prefers-color-scheme` — is one Astryx already solves better elsewhere (a
 * `[light, dark]` token tuple). Widening this union is how the surface grows.
 *
 * The union is written inline rather than behind a named alias so a reader
 * without an IDE can see the legal values — see `docPropLiterals.test.ts`,
 * which reaches this type through `DefinedTheme`.
 */
export type TierConditionKey =
  `@media ${'(pointer: coarse)' | '(pointer: fine)'}`;

/** Every legal refinement key, for validation and iteration. */
const TIER_CONDITION_KEYS: ReadonlyArray<TierConditionKey> = [
  '@media (pointer: coarse)',
  '@media (pointer: fine)',
];

// =============================================================================
// Input types
// =============================================================================

/**
 * A type scale inside a tier. Both fields are optional and each one omitted is
 * inherited from the theme's own scale, so a tier states only what differs.
 *
 * @example
 * ```
 * // Floor body text to 16px on touch; keep the theme's ratio.
 * scale: {base: 16}
 * ```
 */
export interface TierTypeScale {
  /** Base font size in px, anchored to body text. Inherited when omitted. */
  base?: number;
  /** Scaling ratio for the geometric progression. Inherited when omitted. */
  ratio?: number;
}

/** Typography inside a tier — the theme's config with an inheriting scale. */
export interface TierTypographyConfig extends Omit<TypographyConfig, 'scale'> {
  /** Type scale for this tier. Omitted fields follow the theme's own. */
  scale?: TierTypeScale;
}

/**
 * The values a tier (or a refinement inside one) can set — the same axes as
 * the theme itself, each merged over what the tier inherits.
 *
 * Every axis is independent: only the axes actually set here produce CSS.
 */
export interface TierValues {
  /** Typography overrides — scale, families, weights. */
  typography?: TierTypographyConfig;
  /** Color scale overrides, merged over the theme's color config. */
  color?: Partial<ColorScaleConfig>;
  /** Radius scale overrides, merged over the theme's radius config. */
  radius?: Partial<RadiusScaleConfig>;
  /** Motion scale overrides, merged over the theme's motion config. */
  motion?: Partial<MotionScaleConfig>;
  /** Explicit token overrides — highest precedence within this tier. */
  tokens?: Partial<Record<TokenName, TokenValue>>;
  /** Component style overrides. */
  components?: ComponentStyleMap;
}

/**
 * A width tier: what a theme looks like inside one band of viewport widths.
 *
 * Declaring a tier turns it on — there is no enable flag, and a theme that
 * declares none is unaffected by this feature.
 */
export type ThemeTier = TierValues & {
  /**
   * The widest viewport still inside this tier, in px. Defaults to 756
   * (`mobile`), 1024 (`tablet`) and 1440 (`desktop`).
   *
   * `wide` is open-topped and takes no `maxWidth`. A tier's lower bound is the
   * bound of the nearest tier the theme declares below it, so setting this
   * moves both boundaries at once.
   */
  maxWidth?: number;
  /**
   * Which values this tier starts from, before its own are applied.
   *
   * Defaults to `'default'` — the theme's own top-level values. Name another
   * tier to build on that tier's resolved values instead.
   *
   * This is value inheritance resolved when the theme is defined, not the CSS
   * cascade: `tablet: {extends: 'mobile'}` takes mobile's *values*, and
   * mobile's CSS still applies only at mobile widths.
   */
  extends?: WidthTier | 'default';
} & {
  [K in TierConditionKey]?: TierValues;
};

/** The tier fields of a theme input, keyed by tier name. */
export type ThemeTierInput = {
  [T in WidthTier]?: ThemeTier;
};

// =============================================================================
// Resolved output
// =============================================================================

/**
 * A resolved tier layer stored on DefinedTheme.
 * @internal
 */
export interface ResolvedTierLayer {
  /** The tier this layer belongs to. */
  tier: WidthTier;
  /** The pointer refinement, when this layer is one. */
  condition?: TierConditionKey;
  /** The media query this layer compiles to, without the `@media` keyword. */
  query: string;
  /** Fully resolved token values for this layer — not a delta. */
  tokens: Record<string, string>;
  /** Fully resolved component styles for this layer. */
  components?: ComponentStyleMap;
}

// =============================================================================
// Queries
// =============================================================================

/**
 * The boundaries a theme puts on the width axis, keyed by the tier that owns
 * each one — a tier's own upper bound.
 *
 * Only declared, bounded tiers appear. An absent tier is a boundary the theme
 * does not have.
 */
export type TierBreakpoints = Readonly<Partial<Record<WidthTier, number>>>;

/**
 * Build the width query for a tier.
 *
 * A tier's upper bound is its own entry in `breakpoints`; its lower bound is
 * the nearest entry below it. Because only declared tiers have entries, an
 * undeclared tier does not cut the axis — `{mobile, desktop}` gives desktop
 * everything from the phone line to the desktop line, rather than leaving the
 * tablet band to fall back to the theme's own values.
 *
 * Range syntax (`756px < width <= 1024px`) rather than paired min/max: the
 * bands are half-open and adjacent, and writing `min-width: 757px` to express
 * that invites the off-by-one it looks like.
 */
export function tierWidthQuery(
  tier: WidthTier,
  breakpoints: TierBreakpoints,
): string {
  const index = WIDTH_TIERS.indexOf(tier);

  let lower: number | undefined;
  for (let below = index - 1; below >= 0; below--) {
    const boundary = breakpoints[WIDTH_TIERS[below]];
    if (boundary !== undefined) {
      lower = boundary;
      break;
    }
  }
  const upper = breakpoints[tier];

  if (lower === undefined && upper === undefined) {
    // No boundary on either side, so the tier covers every width. Only `wide`
    // declared on its own reaches this, and validation refuses that.
    return 'all';
  }
  if (lower === undefined) {
    return `(width <= ${upper}px)`;
  }
  if (upper === undefined) {
    return `(width > ${lower}px)`;
  }
  return `(${lower}px < width <= ${upper}px)`;
}

/** Add a pointer refinement to a tier's width query. */
function refineQuery(widthQuery: string, condition: TierConditionKey): string {
  const feature = condition.slice('@media '.length);
  return widthQuery === 'all' ? feature : `${widthQuery} and ${feature}`;
}

// =============================================================================
// Input merging
// =============================================================================

/** Merge two typography role objects, with `over` winning field by field. */
function mergeRole(
  base?: TypographyRole,
  over?: TypographyRole,
): TypographyRole | undefined {
  if (!base) {
    return over;
  }
  if (!over) {
    return base;
  }
  return {
    ...base,
    ...over,
    weights:
      base.weights || over.weights
        ? {...base.weights, ...over.weights}
        : undefined,
  };
}

/**
 * Merge a tier's typography over a complete config, completing the scale.
 *
 * A tier that states only `base` keeps the inherited `ratio`, and a theme that
 * declared no scale at all falls back to the shipped default, so the tier
 * still resolves to a full ladder.
 */
function mergeTypography(
  base: TypographyConfig | undefined,
  over: TierTypographyConfig | undefined,
): TypographyConfig | undefined {
  if (!over) {
    return base;
  }

  const scaleBase = over.scale?.base ?? base?.scale?.base;
  const scaleRatio = over.scale?.ratio ?? base?.scale?.ratio;

  let scale: {base: number; ratio: number} | undefined;
  if (scaleBase !== undefined || scaleRatio !== undefined) {
    scale = {
      base: scaleBase ?? DEFAULT_TYPE_SCALE.base,
      ratio: scaleRatio ?? DEFAULT_TYPE_SCALE.ratio,
    };
  }

  return {
    ...(scale ? {scale} : {}),
    body: mergeRole(base?.body, over.body),
    heading: mergeRole(base?.heading, over.heading),
    code: mergeRole(base?.code, over.code),
  };
}

/** Merge two tier typography configs, leaving the scale as partial as it came. */
function mergeTierTypography(
  base: TierTypographyConfig | undefined,
  over: TierTypographyConfig | undefined,
): TierTypographyConfig | undefined {
  if (!base) {
    return over;
  }
  if (!over) {
    return base;
  }
  return {
    ...(base.scale || over.scale
      ? {scale: {...base.scale, ...over.scale}}
      : {}),
    body: mergeRole(base.body, over.body),
    heading: mergeRole(base.heading, over.heading),
    code: mergeRole(base.code, over.code),
  };
}

/**
 * The axes a tier can restate one field of, and therefore the ones a tier has
 * to be able to see whole.
 *
 * A tier that raises `typography.scale.base` and says nothing about `ratio`
 * needs the theme's ratio, or its ladder is computed from the wrong one. The
 * same goes for a partial `color`, `radius` or `motion`. These four are
 * carried down an `extends` chain for exactly that reason — as a COMPLETION
 * SOURCE, never as something re-expanded on their own. An axis no tier
 * restates never enters a tier's pipeline: the theme's resolved values already
 * carry it, at the precedence the theme gave it.
 *
 * Deliberately not here: `syntax`, which no tier can set, and the theme's
 * explicit `tokens` and `components`, which are not generated from a config
 * and so have nothing to complete.
 */
export interface ThemeGenerativeAxes {
  /** Typography — fonts, scale, and weights. */
  typography?: TypographyConfig;
  /** Color scale configuration. */
  color?: ColorScaleConfig;
  /** Radius scale configuration. */
  radius?: RadiusScaleConfig;
  /** Motion scale configuration. */
  motion?: MotionScaleConfig;
}

/**
 * A theme's own explicit overrides — the two axes that are not generated from
 * a config, and so travel into a tier as declarations rather than as resolved
 * values, to keep beating a generated axis there as they do everywhere else.
 */
export interface ThemeOwnOverrides {
  /** Explicit token overrides, as declared. */
  tokens?: Partial<Record<TokenName, TokenValue>>;
  /** Component style overrides, as declared. */
  components?: ComponentStyleMap;
}

/**
 * Merge the generative axes of a theme being extended with those of the theme
 * extending it, field by field.
 */
export function mergeThemeAxes(
  base: ThemeGenerativeAxes,
  over: ThemeGenerativeAxes,
): ThemeGenerativeAxes {
  return {
    typography: mergeTypography(base.typography, over.typography),
    color: over.color ? {...base.color, ...over.color} : base.color,
    radius: over.radius ? {...base.radius, ...over.radius} : base.radius,
    motion: over.motion ? {...base.motion, ...over.motion} : base.motion,
  };
}

/**
 * Merge two tier declarations, keeping every axis as partial as it was
 * declared. Unlike {@link tierValuesToInput} this completes nothing — it only
 * combines two sets of overrides that will be resolved later.
 */
function mergeTierValues(base: TierValues, over: TierValues): TierValues {
  return {
    typography: mergeTierTypography(base.typography, over.typography),
    color: over.color ? {...base.color, ...over.color} : base.color,
    radius: over.radius ? {...base.radius, ...over.radius} : base.radius,
    motion: over.motion ? {...base.motion, ...over.motion} : base.motion,
    tokens: over.tokens ? {...base.tokens, ...over.tokens} : base.tokens,
    components: deepMergeComponents(base.components, over.components),
  };
}

/**
 * Merge the tier declarations of a theme being extended with those of the
 * theme extending it, tier by tier.
 *
 * A theme that extends another inherits its tiers, so a variant theme that
 * only re-points an accent keeps the responsive behaviour it was built on.
 * Where both declare the same tier, the extending theme's values win per
 * field, the way every other axis of `extends` behaves.
 */
export function mergeTierInputs(
  base: ThemeTierInput | undefined,
  over: ThemeTierInput,
): ThemeTierInput {
  if (!base) {
    return over;
  }

  const merged: ThemeTierInput = {...base};
  for (const tier of WIDTH_TIERS) {
    const overTier = over[tier];
    if (!overTier) {
      continue;
    }
    const baseTier = merged[tier];
    if (!baseTier) {
      merged[tier] = overTier;
      continue;
    }
    const mergedTier: ThemeTier = {
      ...mergeTierValues(baseTier, overTier),
      // Structural fields take the extending theme's value when it states one.
      maxWidth: overTier.maxWidth ?? baseTier.maxWidth,
      extends: overTier.extends ?? baseTier.extends,
    };
    for (const key of TIER_CONDITION_KEYS) {
      const baseCondition = baseTier[key];
      const overCondition = overTier[key];
      if (baseCondition && overCondition) {
        mergedTier[key] = mergeTierValues(baseCondition, overCondition);
      } else if (overCondition ?? baseCondition) {
        mergedTier[key] = overCondition ?? baseCondition;
      }
    }
    merged[tier] = mergedTier;
  }
  return merged;
}

// =============================================================================
// Validation
// =============================================================================

/**
 * Resolve the boundary each declared tier puts on the width axis.
 *
 * Only declared tiers get one. A tier the theme never mentions is not a band
 * with nothing in it — it is not a boundary, so the tier above it reaches down
 * past it. `wide` never gets one either: it is the open top.
 */
function resolveBreakpoints(
  declared: ReadonlyArray<WidthTier>,
  input: ThemeTierInput,
  themeName: string,
): TierBreakpoints {
  if (input.wide?.maxWidth !== undefined) {
    throw new Error(
      `defineTheme("${themeName}"): \`wide\` takes no \`maxWidth\` — it is the open top of the scale, ` +
        `everything above \`desktop\`. Move the bound to \`desktop.maxWidth\` instead.`,
    );
  }

  // `wide` alone has no boundary below it and none of its own, so it would
  // match every width — never what "wide" is meant to say.
  if (declared.length === 1 && declared[0] === 'wide') {
    throw new Error(
      `defineTheme("${themeName}"): \`wide\` is the open top of the scale, so declaring it on its own ` +
        `leaves it no lower boundary and it would match every width. Declare \`desktop\` to give it one, ` +
        `or move these values to the theme itself.`,
    );
  }

  const breakpoints: Partial<Record<WidthTier, number>> = {};
  for (const tier of declared) {
    if (tier === 'wide') {
      continue;
    }
    const stated = input[tier]?.maxWidth;
    if (stated !== undefined && (!Number.isFinite(stated) || stated <= 0)) {
      throw new Error(
        `defineTheme("${themeName}"): \`${tier}.maxWidth\` must be a positive number of px, got ${String(stated)}.`,
      );
    }
    breakpoints[tier] = stated ?? DEFAULT_TIER_MAX_WIDTH[tier];
  }

  // Boundaries must ascend, or a tier would describe an empty or inverted
  // range. Only declared tiers are compared — an undeclared tier's default is
  // not a boundary and cannot conflict with one.
  let below: {tier: WidthTier; bound: number} | undefined;
  for (const tier of declared) {
    const bound = breakpoints[tier];
    if (bound === undefined) {
      continue;
    }
    if (below !== undefined && bound <= below.bound) {
      throw new Error(
        `defineTheme("${themeName}"): tier bounds must increase — \`${tier}.maxWidth\` (${bound}) ` +
          `is not above \`${below.tier}.maxWidth\` (${below.bound}), which leaves \`${tier}\` with no widths to match.`,
      );
    }
    below = {tier, bound};
  }

  return breakpoints;
}

/**
 * Walk a tier's `extends` chain, outermost first.
 *
 * Returns the tiers whose values apply, in the order they should be merged:
 * the furthest ancestor first, the tier itself last.
 */
function resolveExtendsChain(
  tier: WidthTier,
  input: ThemeTierInput,
  themeName: string,
): WidthTier[] {
  const chain: WidthTier[] = [];
  const seen = new Set<WidthTier>();
  let current: WidthTier | 'default' = tier;

  while (current !== 'default') {
    if (seen.has(current)) {
      throw new Error(
        `defineTheme("${themeName}"): \`${current}.extends\` forms a cycle (${[...seen, current].join(' → ')}). ` +
          `A tier's \`extends\` chain must end at 'default'.`,
      );
    }
    seen.add(current);
    chain.unshift(current);

    const next: WidthTier | 'default' = input[current]?.extends ?? 'default';
    if (next !== 'default' && input[next] === undefined) {
      throw new Error(
        `defineTheme("${themeName}"): \`${current}.extends\` names '${next}', which this theme does not declare. ` +
          `Declare a \`${next}\` tier, or extend 'default' (the theme's own values).`,
      );
    }
    current = next;
  }

  return chain;
}

// =============================================================================
// Resolution
// =============================================================================

/**
 * Turn a tier's declarations into a theme input the ordinary pipeline can
 * resolve.
 *
 * The rule that matters here is which axes are LEFT OUT. An axis the tier says
 * nothing about does not appear at all — not inherited, not re-expanded. The
 * layer resolves on top of the theme's own resolved values, so an axis nobody
 * restates is already carried there at exactly the precedence the theme gave
 * it. Re-expanding it would recompute it from the declarations and so beat the
 * explicit tokens the theme resolved it against, quietly reverting them inside
 * every tier.
 *
 * An axis the tier states only part of is completed, because an expander takes
 * a whole config and a partial one computes `NaN` — a value CSS accepts and
 * nothing renders from. Completion comes from the theme's own config where
 * there is one and from the shipped scale where there is not.
 *
 * The theme's own explicit `tokens` and `components` ride along so they keep
 * beating a generated axis inside a tier, exactly as they do outside one.
 */
function tierValuesToInput(
  declared: TierValues,
  own: ThemeOwnOverrides,
  axes: ThemeGenerativeAxes,
): ThemeValuesInput {
  return {
    typography: declared.typography
      ? mergeTypography(axes.typography, declared.typography)
      : undefined,
    color: declared.color ? {...axes.color, ...declared.color} : undefined,
    radius: declared.radius
      ? {...DEFAULT_RADIUS_SCALE, ...axes.radius, ...declared.radius}
      : undefined,
    motion: declared.motion
      ? {...DEFAULT_MOTION_SCALE, ...axes.motion, ...declared.motion}
      : undefined,
    tokens: {...own.tokens, ...declared.tokens},
    components: deepMergeComponents(own.components, declared.components),
  };
}

/**
 * Resolve every declared tier into a layer with its query and its values.
 *
 * `own` is the theme's own explicit tokens and components, `seed` the values
 * the theme itself resolved to, and `axes` the generative configs it and
 * anything it extends were declared with.
 *
 * Returns layers in emission order: each tier in width order, and each tier's
 * pointer refinements directly after it so they win inside that tier.
 */
export function resolveThemeTiers(
  themeName: string,
  tierInput: ThemeTierInput,
  own: ThemeOwnOverrides,
  seed: ThemeValuesSeed,
  axes: ThemeGenerativeAxes,
): ResolvedTierLayer[] | undefined {
  const declaredTiers = WIDTH_TIERS.filter(
    tier => tierInput[tier] !== undefined,
  );
  if (declaredTiers.length === 0) {
    return undefined;
  }

  const breakpoints = resolveBreakpoints(declaredTiers, tierInput, themeName);
  const layers: ResolvedTierLayer[] = [];

  for (const tier of declaredTiers) {
    // The tiers whose values apply here, furthest ancestor first.
    const chain = resolveExtendsChain(tier, tierInput, themeName);

    let declared: TierValues = {};
    for (const link of chain) {
      declared = mergeTierValues(declared, tierInput[link] as TierValues);
    }

    const widthQuery = tierWidthQuery(tier, breakpoints);
    const resolved: ResolvedThemeValues = resolveThemeValues(
      tierValuesToInput(declared, own, axes),
      seed,
    );

    layers.push({
      tier,
      query: widthQuery,
      tokens: resolved.tokens,
      components: resolved.components,
    });

    // Pointer refinements sit inside the tier, and are emitted straight after
    // it so that where both match, the refinement wins on source order.
    //
    // A refinement travels along `extends` with the rest of the tier: a
    // `tablet` that extends `mobile` is asking to be like mobile, and the
    // touch values are part of what mobile is. It would be a strange
    // inheritance that carried the phone's gutters to a tablet but not its
    // 16px body floor — the iOS input-zoom bug the floor exists for fires on
    // an iPad just as readily.
    for (const condition of TIER_CONDITION_KEYS) {
      let refinement: TierValues | undefined;
      for (const link of chain) {
        const declaredHere = tierInput[link]?.[condition];
        if (declaredHere) {
          refinement = refinement
            ? mergeTierValues(refinement, declaredHere)
            : declaredHere;
        }
      }
      if (!refinement) {
        continue;
      }
      const refinedValues = resolveThemeValues(
        tierValuesToInput(mergeTierValues(declared, refinement), own, axes),
        seed,
      );
      layers.push({
        tier,
        condition,
        query: refineQuery(widthQuery, condition),
        tokens: refinedValues.tokens,
        components: refinedValues.components,
      });
    }
  }

  return layers;
}
