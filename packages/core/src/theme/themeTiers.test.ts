// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file themeTiers.test.ts
 * Tests for responsive width tiers in defineTheme — how a tier resolves, what
 * query it compiles to, what CSS it emits, and what it must never do to the
 * theme underneath it.
 */

import {describe, it, expect} from 'vitest';
import {
  defineTheme,
  generateThemeCSS,
  generateTierCSS,
  generateThemeRules,
  WIDTH_TIERS,
  DEFAULT_TIER_MAX_WIDTH,
} from './index';

/** The queries of every resolved layer, in emission order. */
function queries(theme: ReturnType<typeof defineTheme>): string[] {
  return (theme.__tiers ?? []).map(layer => layer.query);
}

/** The `@media` prelude of every tier block in a CSS string, in order. */
function mediaPreludes(css: string): string[] {
  return [...css.matchAll(/@media ([^{]+)\{/g)].map(m => m[1].trim());
}

// =============================================================================
// Opting in
// =============================================================================

describe('declaring a tier', () => {
  it('emits nothing when a theme declares none', () => {
    const theme = defineTheme({
      name: 'plain',
      typography: {scale: {base: 14, ratio: 1.2}},
      tokens: {'--spacing-4': '16px'},
    });

    expect(theme.__tiers).toBeUndefined();
    expect(generateTierCSS(theme)).toEqual({prose: '', component: ''});
  });

  it('leaves a theme without tiers byte-identical to before the feature', () => {
    const input = {
      name: 'untouched',
      typography: {scale: {base: 14, ratio: 1.2}},
      color: {accent: '#0064E0'},
      tokens: {'--spacing-4': '16px'},
      components: {button: {base: {fontWeight: '600'}}},
    };

    const withoutTiers = generateThemeCSS(defineTheme(input));
    const withTiers = generateThemeCSS(
      defineTheme({...input, name: 'tiered', mobile: {tokens: {}}}),
    );

    // The tiered theme differs only by its (empty) tier — the base CSS it
    // shares is identical once the name is normalized.
    expect(withTiers.component.replace(/tiered/g, 'untouched')).toBe(
      withoutTiers.component,
    );
  });

  it('turns a tier on by declaring it, with no enable flag', () => {
    const theme = defineTheme({
      name: 'opt-in',
      mobile: {tokens: {'--spacing-4': '12px'}},
    });

    expect(theme.__tiers).toHaveLength(1);
    expect(theme.__tiers?.[0].tier).toBe('mobile');
  });
});

// =============================================================================
// Queries — the partition
// =============================================================================

describe('tier queries', () => {
  it('partitions the width axis with adjacent, non-overlapping ranges', () => {
    const theme = defineTheme({
      name: 'four',
      mobile: {tokens: {'--spacing-4': '1px'}},
      tablet: {tokens: {'--spacing-4': '2px'}},
      desktop: {tokens: {'--spacing-4': '3px'}},
      wide: {tokens: {'--spacing-4': '4px'}},
    });

    expect(queries(theme)).toEqual([
      '(width <= 756px)',
      '(756px < width <= 1024px)',
      '(1024px < width <= 1440px)',
      '(width > 1440px)',
    ]);
  });

  it('uses the canonical bounds of undeclared tiers, so a tier means its own band', () => {
    // Only mobile and wide are declared. `wide` must still mean "above the
    // desktop line", not "above mobile" — a 1000px laptop is not wide.
    const theme = defineTheme({
      name: 'gapped',
      mobile: {tokens: {'--spacing-4': '1px'}},
      wide: {tokens: {'--spacing-4': '4px'}},
    });

    expect(queries(theme)).toEqual(['(width <= 756px)', '(width > 1440px)']);
  });

  it('moves both adjacent boundaries when a maxWidth is set', () => {
    const theme = defineTheme({
      name: 'custom',
      mobile: {maxWidth: 640, tokens: {'--spacing-4': '1px'}},
      tablet: {tokens: {'--spacing-4': '2px'}},
    });

    expect(queries(theme)).toEqual([
      '(width <= 640px)',
      '(640px < width <= 1024px)',
    ]);
  });

  it('leaves widths above the widest declared tier to the theme itself', () => {
    const theme = defineTheme({
      name: 'capped',
      mobile: {tokens: {'--spacing-4': '1px'}},
    });

    expect(queries(theme)).toEqual(['(width <= 756px)']);
  });

  it('defaults match the documented breakpoints', () => {
    expect(DEFAULT_TIER_MAX_WIDTH).toEqual({
      mobile: 756,
      tablet: 1024,
      desktop: 1440,
    });
    expect(WIDTH_TIERS).toEqual(['mobile', 'tablet', 'desktop', 'wide']);
  });
});

// =============================================================================
// Pointer refinement
// =============================================================================

describe('pointer refinement', () => {
  it('ands the pointer onto the tier width', () => {
    const theme = defineTheme({
      name: 'touch',
      typography: {scale: {base: 14, ratio: 1.2}},
      mobile: {
        tokens: {'--spacing-4': '12px'},
        '@media (pointer: coarse)': {typography: {scale: {base: 16}}},
      },
    });

    expect(queries(theme)).toEqual([
      '(width <= 756px)',
      '(width <= 756px) and (pointer: coarse)',
    ]);
  });

  it('emits the refinement after its tier, so it wins where both match', () => {
    const theme = defineTheme({
      name: 'order',
      mobile: {
        tokens: {'--spacing-4': '12px'},
        '@media (pointer: coarse)': {tokens: {'--spacing-4': '10px'}},
      },
    });

    const {component} = generateTierCSS(theme);
    expect(mediaPreludes(component)).toEqual([
      '(width <= 756px)',
      '(width <= 756px) and (pointer: coarse)',
    ]);
    expect(component.indexOf('12px')).toBeLessThan(component.indexOf('10px'));
  });

  it('carries a fine-pointer refinement too', () => {
    const theme = defineTheme({
      name: 'fine',
      tablet: {'@media (pointer: fine)': {tokens: {'--spacing-4': '14px'}}},
    });

    expect(queries(theme)).toEqual([
      '(756px < width <= 1024px)',
      '(756px < width <= 1024px) and (pointer: fine)',
    ]);
  });

  it('inherits the tier it sits in', () => {
    const theme = defineTheme({
      name: 'nested-inherit',
      mobile: {
        tokens: {'--spacing-4': '12px', '--radius-element': '4px'},
        '@media (pointer: coarse)': {tokens: {'--radius-element': '12px'}},
      },
    });

    const refinement = theme.__tiers?.find(l => l.condition);
    // The tier's own spacing carries into the refinement untouched.
    expect(refinement?.tokens['--spacing-4']).toBe('12px');
    expect(refinement?.tokens['--radius-element']).toBe('12px');
  });
});

// =============================================================================
// extends
// =============================================================================

describe('extends', () => {
  it('defaults to the theme itself', () => {
    const theme = defineTheme({
      name: 'implicit',
      tokens: {'--spacing-4': '16px'},
      mobile: {tokens: {'--radius-element': '12px'}},
    });

    const mobile = theme.__tiers?.[0];
    expect(mobile?.tokens['--spacing-4']).toBe('16px');
    expect(mobile?.tokens['--radius-element']).toBe('12px');
  });

  it('takes the values of the tier it names', () => {
    const theme = defineTheme({
      name: 'chained',
      tokens: {'--spacing-4': '16px'},
      mobile: {tokens: {'--spacing-4': '12px', '--radius-element': '4px'}},
      tablet: {extends: 'mobile', tokens: {'--radius-element': '8px'}},
    });

    const tablet = theme.__tiers?.find(l => l.tier === 'tablet');
    expect(tablet?.tokens['--spacing-4']).toBe('12px'); // from mobile
    expect(tablet?.tokens['--radius-element']).toBe('8px'); // its own
  });

  it('is value inheritance, not the cascade — the extended tier keeps its own band', () => {
    const theme = defineTheme({
      name: 'bands',
      mobile: {tokens: {'--spacing-4': '12px'}},
      tablet: {extends: 'mobile'},
    });

    expect(queries(theme)).toEqual([
      '(width <= 756px)',
      '(756px < width <= 1024px)',
    ]);
  });

  it('follows a chain more than one link long', () => {
    const theme = defineTheme({
      name: 'deep',
      mobile: {tokens: {'--spacing-1': '1px'}},
      tablet: {extends: 'mobile', tokens: {'--spacing-2': '2px'}},
      desktop: {extends: 'tablet', tokens: {'--spacing-3': '3px'}},
    });

    const desktop = theme.__tiers?.find(l => l.tier === 'desktop');
    expect(desktop?.tokens['--spacing-1']).toBe('1px');
    expect(desktop?.tokens['--spacing-2']).toBe('2px');
    expect(desktop?.tokens['--spacing-3']).toBe('3px');
  });

  it('carries a pointer refinement along with the tier it extends', () => {
    // `extends: 'mobile'` asks to be like mobile, and the touch values are
    // part of what mobile is — the iOS input-zoom bug the 16px floor exists
    // for fires on an iPad too.
    const theme = defineTheme({
      name: 'refinement-inherit',
      typography: {scale: {base: 14, ratio: 1.2}},
      mobile: {
        tokens: {'--spacing-4': '12px'},
        '@media (pointer: coarse)': {typography: {scale: {base: 16}}},
      },
      tablet: {extends: 'mobile'},
    });

    expect(queries(theme)).toEqual([
      '(width <= 756px)',
      '(width <= 756px) and (pointer: coarse)',
      '(756px < width <= 1024px)',
      '(756px < width <= 1024px) and (pointer: coarse)',
    ]);

    const tabletTouch = theme.__tiers?.find(
      l => l.tier === 'tablet' && l.condition,
    );
    expect(tabletTouch?.tokens['--font-size-base']).toBe('1rem');
  });

  it('lets the extending tier override an inherited refinement', () => {
    const theme = defineTheme({
      name: 'refinement-override',
      mobile: {
        '@media (pointer: coarse)': {
          tokens: {'--spacing-4': '10px', '--radius-element': '12px'},
        },
      },
      tablet: {
        extends: 'mobile',
        '@media (pointer: coarse)': {tokens: {'--spacing-4': '14px'}},
      },
    });

    const tabletTouch = theme.__tiers?.find(
      l => l.tier === 'tablet' && l.condition,
    );
    expect(tabletTouch?.tokens['--spacing-4']).toBe('14px'); // its own
    expect(tabletTouch?.tokens['--radius-element']).toBe('12px'); // inherited
  });

  it('rejects a cycle rather than looping', () => {
    expect(() =>
      defineTheme({
        name: 'cyclic',
        mobile: {extends: 'tablet'},
        tablet: {extends: 'mobile'},
      }),
    ).toThrow(/forms a cycle/);
  });

  it('rejects a tier the theme does not declare', () => {
    expect(() =>
      defineTheme({name: 'dangling', mobile: {extends: 'tablet'}}),
    ).toThrow(/names 'tablet', which this theme does not declare/);
  });
});

// =============================================================================
// Validation
// =============================================================================

describe('validation', () => {
  it('refuses a maxWidth on the open-topped tier', () => {
    expect(() =>
      defineTheme({name: 'bad-wide', wide: {maxWidth: 2000}}),
    ).toThrow(/`wide` takes no `maxWidth`/);
  });

  it('refuses bounds that do not increase', () => {
    expect(() =>
      defineTheme({
        name: 'inverted',
        mobile: {maxWidth: 1200},
        tablet: {maxWidth: 800},
      }),
    ).toThrow(/tier bounds must increase/);
  });

  it('refuses a maxWidth that is not a positive number', () => {
    expect(() =>
      defineTheme({name: 'nan', mobile: {maxWidth: Number.NaN}}),
    ).toThrow(/must be a positive number of px/);
  });
});

// =============================================================================
// The type scale
// =============================================================================

describe('type scale in a tier', () => {
  it('inherits the ratio when a tier states only the base', () => {
    const theme = defineTheme({
      name: 'floor',
      typography: {scale: {base: 14, ratio: 1.2}},
      mobile: {typography: {scale: {base: 16}}},
    });

    const mobile = theme.__tiers?.[0];
    // 16 × 1.2³ = 27.6 → 28px = 1.75rem at the h1 step.
    expect(mobile?.tokens['--font-size-2xl']).toBe('1.75rem');
    expect(mobile?.tokens['--font-size-base']).toBe('1rem');
  });

  it('inherits the base when a tier states only the ratio', () => {
    const theme = defineTheme({
      name: 'tamer',
      typography: {scale: {base: 14, ratio: 1.2}},
      mobile: {typography: {scale: {ratio: 1.1}}},
    });

    const mobile = theme.__tiers?.[0];
    expect(mobile?.tokens['--font-size-base']).toBe('0.875rem'); // still 14
  });

  it('keeps the theme font weights a tier did not mention', () => {
    // Regression: resolving a tier as a patch rather than as a theme input
    // reverted role-derived weights to the built-in defaults, so a bold
    // heading silently became semibold inside the tier.
    const theme = defineTheme({
      name: 'weights',
      typography: {
        scale: {base: 14, ratio: 1.2},
        heading: {weight: 'bold'},
      },
      mobile: {typography: {scale: {base: 16}}},
    });

    expect(theme.tokens['--text-heading-1-weight']).toBe(
      'var(--font-weight-bold)',
    );
    expect(theme.__tiers?.[0].tokens['--text-heading-1-weight']).toBe(
      'var(--font-weight-bold)',
    );
  });

  it('keeps the theme font families a tier did not mention', () => {
    const theme = defineTheme({
      name: 'families',
      typography: {
        scale: {base: 14, ratio: 1.2},
        body: {family: 'Geist', fallbacks: 'sans-serif'},
      },
      mobile: {typography: {scale: {base: 16}}},
    });

    expect(theme.__tiers?.[0].tokens['--font-family-body']).toBe(
      'Geist, sans-serif',
    );
  });
});

describe('partial scales in a tier', () => {
  it('completes a radius scale the theme never declared', () => {
    // The expanders take complete configs. A tier that restates one field over
    // a theme with no radius scale of its own must not reach the expander with
    // the other field undefined — that computes NaN, which is a value CSS
    // accepts and nothing renders from.
    const theme = defineTheme({
      name: 'partial-radius',
      mobile: {radius: {multiplier: 0}},
    });

    const tokens = theme.__tiers?.[0].tokens ?? {};
    for (const [name, value] of Object.entries(tokens)) {
      expect(`${name}: ${value}`).not.toContain('NaN');
    }
    expect(tokens['--radius-element']).toBe('0px');
  });

  it('completes a motion scale the theme never declared', () => {
    const theme = defineTheme({
      name: 'partial-motion',
      mobile: {motion: {fast: 100}},
    });

    const tokens = theme.__tiers?.[0].tokens ?? {};
    for (const [name, value] of Object.entries(tokens)) {
      expect(`${name}: ${value}`).not.toContain('NaN');
    }
    expect(tokens['--duration-fast']).toBe('100ms');
  });

  it("merges a partial scale over the theme's own before defaulting", () => {
    const theme = defineTheme({
      name: 'partial-over-own',
      radius: {base: 6, multiplier: 1},
      mobile: {radius: {multiplier: 2}},
    });

    // base 6 × 2 steps × multiplier 2
    expect(theme.__tiers?.[0].tokens['--radius-element']).toBe('24px');
  });
});

// =============================================================================
// Precedence
// =============================================================================

describe('precedence', () => {
  it('keeps an explicit theme token above a generated axis in a tier', () => {
    // Regression: a tier's generated color scale used to overwrite a token the
    // theme set explicitly, inverting the documented rule across the tier
    // boundary — explicit `tokens` win over anything generated.
    const theme = defineTheme({
      name: 'explicit-wins',
      tokens: {'--color-accent': '#FF0000'},
      mobile: {color: {contrast: 'high'}},
    });

    expect(theme.tokens['--color-accent']).toBe('#FF0000');
    expect(theme.__tiers?.[0].tokens['--color-accent']).toBe('#FF0000');
  });

  it("lets a tier's own explicit token beat its own generated axis", () => {
    const theme = defineTheme({
      name: 'tier-explicit',
      mobile: {
        color: {accent: '#00FF00'},
        tokens: {'--color-accent': '#0000FF'},
      },
    });

    expect(theme.__tiers?.[0].tokens['--color-accent']).toBe('#0000FF');
  });

  it('emits tier CSS after the base rules', () => {
    const theme = defineTheme({
      name: 'after',
      tokens: {'--spacing-4': '16px'},
      mobile: {tokens: {'--spacing-4': '12px'}},
    });

    const {component} = generateThemeCSS(theme);
    expect(component.indexOf('--spacing-4: 16px')).toBeLessThan(
      component.indexOf('@media'),
    );
  });
});

// =============================================================================
// Emitted CSS
// =============================================================================

describe('emitted CSS', () => {
  it('scopes a tier block exactly as the base theme is scoped', () => {
    const theme = defineTheme({
      name: 'scoped',
      mobile: {tokens: {'--spacing-4': '12px'}},
    });

    const {component} = generateTierCSS(theme);
    expect(component).toContain('@media (width <= 756px) {');
    expect(component).toContain(
      '@scope ([data-astryx-theme="scoped"]) to ([data-astryx-theme]) {',
    );
    expect(component).toContain('--spacing-4: 12px;');
  });

  it('carries only the tokens the tier changes', () => {
    const theme = defineTheme({
      name: 'delta',
      typography: {scale: {base: 14, ratio: 1.2}},
      tokens: {'--spacing-4': '16px', '--radius-element': '8px'},
      mobile: {tokens: {'--spacing-4': '12px'}},
    });

    const {component} = generateTierCSS(theme);
    expect(component).toContain('--spacing-4: 12px;');
    // Everything else the tier resolved is identical to the base theme's, so
    // none of it is repeated.
    expect(component).not.toContain('--radius-element');
    expect(component).not.toContain('--font-size-base');
  });

  it('repeats no rule the base theme already emits', () => {
    const theme = defineTheme({
      name: 'pruned',
      typography: {scale: {base: 14, ratio: 1.2}},
      mobile: {tokens: {'--spacing-4': '12px'}},
    });

    const baseRules = generateThemeRules(theme);
    const {component, prose} = generateTierCSS(theme);
    const tierCss = component + prose;

    for (const rule of baseRules) {
      const body = rule.trim();
      if (body.startsWith(':scope')) {
        continue;
      }
      expect(tierCss).not.toContain(body);
    }
  });

  it('emits nothing for a tier that changes nothing', () => {
    const theme = defineTheme({
      name: 'noop',
      tokens: {'--spacing-4': '16px'},
      mobile: {tokens: {'--spacing-4': '16px'}},
    });

    expect(generateTierCSS(theme)).toEqual({prose: '', component: ''});
  });

  it('keeps tier prose rules in the prose layer, not the component layer', () => {
    const theme = defineTheme({
      name: 'prose-tier',
      typography: {scale: {base: 14, ratio: 1.2}},
      mobile: {typography: {scale: {base: 16}}},
    });

    const {prose, component} = generateTierCSS(theme);
    expect(prose).toContain(':where(h1)');
    expect(component).not.toContain(':where(h1)');
    // And the prose rule carries this tier's size, not the base theme's.
    expect(prose).toContain('@media (width <= 756px)');
  });

  it('emits a tier component rule when the tier restyles a component', () => {
    const theme = defineTheme({
      name: 'comp-tier',
      components: {button: {base: {paddingInline: '16px'}}},
      mobile: {components: {button: {base: {paddingInline: '12px'}}}},
    });

    const {component} = generateTierCSS(theme);
    expect(component).toContain('12px');
    expect(component).not.toContain('16px');
  });
});

// =============================================================================
// Inheritance between themes
// =============================================================================

describe('a theme that extends a tiered theme', () => {
  it('inherits its tiers', () => {
    const base = defineTheme({
      name: 'base-tiered',
      tokens: {'--spacing-4': '16px'},
      mobile: {tokens: {'--spacing-4': '12px'}},
    });

    const variant = defineTheme({
      name: 'variant',
      extends: base,
      tokens: {'--color-accent': '#FF0000'},
    });

    expect(variant.__tiers).toHaveLength(1);
    expect(variant.__tiers?.[0].tokens['--spacing-4']).toBe('12px');
    // And the variant's own values reach into the inherited tier.
    expect(variant.__tiers?.[0].tokens['--color-accent']).toBe('#FF0000');
  });

  it('resolves an inherited tier against the base theme axes it was declared with', () => {
    // The variant declares no typography of its own, so mobile's `{base: 16}`
    // has to find the base theme's 1.414 ratio rather than falling back to a
    // default it never saw.
    const base = defineTheme({
      name: 'base-scale',
      typography: {scale: {base: 14, ratio: 1.414}},
      mobile: {typography: {scale: {base: 16}}},
    });

    const variant = defineTheme({name: 'variant-scale', extends: base});

    expect(variant.__tiers?.[0].tokens['--font-size-base']).toBe('1rem');
    // 16 × 1.414² = 31.99 → 32px = 2rem at the h2 step.
    expect(variant.__tiers?.[0].tokens['--font-size-xl']).toBe('2rem');
  });

  it('lets the extending theme refine an inherited tier', () => {
    const base = defineTheme({
      name: 'base-refine',
      mobile: {tokens: {'--spacing-4': '12px', '--radius-element': '4px'}},
    });

    const variant = defineTheme({
      name: 'variant-refine',
      extends: base,
      mobile: {tokens: {'--radius-element': '8px'}},
    });

    expect(variant.__tiers?.[0].tokens['--spacing-4']).toBe('12px');
    expect(variant.__tiers?.[0].tokens['--radius-element']).toBe('8px');
  });

  it('lets the extending theme move an inherited tier boundary', () => {
    const base = defineTheme({
      name: 'base-bound',
      mobile: {maxWidth: 756, tokens: {'--spacing-4': '12px'}},
    });

    const variant = defineTheme({
      name: 'variant-bound',
      extends: base,
      mobile: {maxWidth: 640},
    });

    expect(queries(variant)).toEqual(['(width <= 640px)']);
  });
});
