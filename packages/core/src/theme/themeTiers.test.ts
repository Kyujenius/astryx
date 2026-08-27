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
} from './index';
import {durationDefaults, radiusDefaults} from './tokens.stylex';

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

  it('gives an undeclared tier no boundary, so the tier above it reaches down', () => {
    // No tablet declared, so the 1024px line does not exist and `desktop`
    // covers everything from the phone line up to its own.
    const theme = defineTheme({
      name: 'gapped',
      mobile: {tokens: {'--spacing-4': '1px'}},
      desktop: {tokens: {'--spacing-4': '3px'}},
    });

    expect(queries(theme)).toEqual([
      '(width <= 756px)',
      '(756px < width <= 1440px)',
    ]);
  });

  it('leaves no width uncovered between two declared tiers', () => {
    // The open-topped tier reaching down as far as mobile is the same rule:
    // with no tablet and no desktop declared there is one boundary, not three.
    const theme = defineTheme({
      name: 'two-band',
      mobile: {tokens: {'--spacing-4': '1px'}},
      wide: {tokens: {'--spacing-4': '4px'}},
    });

    expect(queries(theme)).toEqual(['(width <= 756px)', '(width > 756px)']);
  });

  it('gives a single mid-scale tier everything below its own bound', () => {
    const theme = defineTheme({
      name: 'lonely-desktop',
      desktop: {tokens: {'--spacing-4': '3px'}},
    });

    expect(queries(theme)).toEqual(['(width <= 1440px)']);
  });

  it('honours a moved bound on the only declared tier, with no phantom neighbour', () => {
    // Nothing else is declared, so 1200 conflicts with nothing — the default
    // bound of a tier this theme never mentions is not a boundary.
    const theme = defineTheme({
      name: 'wide-mobile',
      mobile: {maxWidth: 1200, tokens: {'--spacing-4': '1px'}},
    });

    expect(queries(theme)).toEqual(['(width <= 1200px)']);
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

  it('matches the documented tier vocabulary', () => {
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
      mobile: {
        tokens: {'--spacing-4': '12px'},
        '@media (pointer: coarse)': {
          tokens: {'--size-element-md': '40px'},
        },
      },
    });

    expect(queries(theme)).toEqual([
      '(width <= 756px)',
      '(width <= 756px) and (pointer: coarse)',
    ]);
    expect(theme.__tiers?.[1].tokens['--size-element-md']).toBe('40px');
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
      mobile: {tokens: {'--spacing-4': '12px'}},
      tablet: {'@media (pointer: fine)': {tokens: {'--spacing-4': '14px'}}},
    });

    expect(queries(theme)).toEqual([
      '(width <= 756px)',
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
    // `extends: 'mobile'` asks to be like mobile, including the taller control
    // sizing mobile declares for a coarse primary pointer.
    const theme = defineTheme({
      name: 'refinement-inherit',
      mobile: {
        tokens: {'--spacing-4': '12px'},
        '@media (pointer: coarse)': {
          tokens: {'--size-element-md': '40px'},
        },
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
    expect(tabletTouch?.tokens['--size-element-md']).toBe('40px');
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

  it('refuses the open-topped tier declared on its own', () => {
    expect(() =>
      defineTheme({name: 'only-wide', wide: {tokens: {'--spacing-4': '4px'}}}),
    ).toThrow(/declaring it on its own/);
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

  it("emits a refinement that returns a value to the base theme's", () => {
    // The refinement's competitor is the tier it sits in, not the base theme:
    // on a coarse-pointer phone BOTH media queries match. A refinement value
    // that happens to equal the base theme's still has to be emitted, or the
    // tier underneath goes on applying.
    const theme = defineTheme({
      name: 'back-to-base',
      tokens: {'--spacing-4': '16px', '--radius-container': '8px'},
      mobile: {
        tokens: {'--spacing-4': '12px', '--radius-container': '2px'},
        '@media (pointer: coarse)': {
          tokens: {
            '--spacing-4': '16px', // back to the base theme's value
            '--radius-container': '4px', // genuinely new
          },
        },
      },
    });

    const {component} = generateTierCSS(theme);
    const coarse = component.slice(component.indexOf('(pointer: coarse)'));

    expect(coarse).toContain('--spacing-4: 16px');
    expect(coarse).toContain('--radius-container: 4px');
  });

  it("emits a refinement component rule that returns to the base theme's", () => {
    const theme = defineTheme({
      name: 'back-to-base-component',
      components: {card: {base: {borderWidth: '2px'}}},
      mobile: {
        components: {card: {base: {borderWidth: '1px'}}},
        '@media (pointer: coarse)': {
          components: {card: {base: {borderWidth: '2px'}}},
        },
      },
    });

    const {component} = generateTierCSS(theme);
    const coarse = component.slice(component.indexOf('(pointer: coarse)'));

    expect(coarse).toContain('border-width: 2px');
  });

  it('still drops a refinement that repeats the tier it sits in', () => {
    const theme = defineTheme({
      name: 'redundant-refinement',
      tokens: {'--spacing-4': '16px'},
      mobile: {
        tokens: {'--spacing-4': '12px'},
        '@media (pointer: coarse)': {tokens: {'--spacing-4': '12px'}},
      },
    });

    const {component} = generateTierCSS(theme);
    expect(component).not.toContain('(pointer: coarse)');
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

// =============================================================================
// Required behaviours
//
// Three rules the API is required to hold to. They are stated here as
// requirements in their own right, and tested directly, rather than left to
// fall out of the tests above — so that a change which breaks one fails a test
// that says what was broken.
// =============================================================================

describe('required: no breakpoints means no responsive theme', () => {
  it('emits no media query at all when a theme declares no tier', () => {
    const theme = defineTheme({
      name: 'req1-none',
      typography: {scale: {base: 14, ratio: 1.2}},
      color: {accent: '#3B82F6'},
      tokens: {'--spacing-4': '16px'},
      onDark: {tokens: {'--color-background-body': '#000000'}},
    });

    expect(theme.__tiers).toBeUndefined();

    const {component, prose} = generateThemeCSS(theme);
    expect(component).not.toContain('@media');
    expect(prose).not.toContain('@media');
    expect(generateTierCSS(theme)).toEqual({prose: '', component: ''});
  });

  it('produces exactly the CSS it produced before tiers existed', () => {
    const input = {
      name: 'req1-same',
      typography: {scale: {base: 15, ratio: 1.3}},
      tokens: {'--spacing-4': '16px'},
      components: {card: {base: {borderWidth: '2px'}}},
    };

    // The same theme built twice, once with a tier declared and once without:
    // only the tiered one may differ, and only by its media blocks.
    const plain = defineTheme(input);
    const tiered = defineTheme({
      ...input,
      name: 'req1-same-tiered',
      mobile: {tokens: {'--spacing-4': '12px'}},
    });

    const plainCss = generateThemeCSS(plain).component;
    const tieredCss = generateThemeCSS(tiered)
      .component.replaceAll('req1-same-tiered', 'req1-same')
      // strip the trailing tier block
      .split('@media')[0]
      .trimEnd();

    expect(tieredCss).toBe(plainCss);
  });
});

describe('required: an undeclared tier is not a breakpoint', () => {
  it('hands the band of an undeclared tier to the tier above it', () => {
    const theme = defineTheme({
      name: 'req2-gap',
      mobile: {tokens: {'--spacing-4': '1px'}},
      desktop: {tokens: {'--spacing-4': '3px'}},
    });

    // 900px is nominally tablet. With no tablet declared it must be desktop,
    // not the theme's own values.
    expect(queries(theme)).toEqual([
      '(width <= 756px)',
      '(756px < width <= 1440px)',
    ]);
  });

  it('leaves no gap anywhere below the widest declared tier', () => {
    const theme = defineTheme({
      name: 'req2-cover',
      mobile: {maxWidth: 500, tokens: {'--spacing-4': '1px'}},
      wide: {tokens: {'--spacing-4': '4px'}},
    });

    expect(queries(theme)).toEqual(['(width <= 500px)', '(width > 500px)']);
  });

  it('does not let an undeclared tier default conflict with a declared bound', () => {
    // mobile past the tablet default is fine while no tablet is declared...
    expect(() =>
      defineTheme({
        name: 'req2-ok',
        mobile: {maxWidth: 1200, tokens: {'--spacing-4': '1px'}},
      }),
    ).not.toThrow();

    // ...and an error the moment the theme actually declares that neighbour.
    expect(() =>
      defineTheme({
        name: 'req2-clash',
        mobile: {maxWidth: 1200, tokens: {'--spacing-4': '1px'}},
        tablet: {tokens: {'--spacing-4': '2px'}},
      }),
    ).toThrow(/tier bounds must increase/);
  });
});

describe('required: a tier @media block overrides what has no media query', () => {
  /**
   * The top-level blocks of a CSS string, in source order — enough to ask
   * whether anything without a media query trails one that has it.
   */
  function topLevelBlocks(css: string): string[] {
    const blocks: string[] = [];
    let depth = 0;
    let start = 0;
    for (let i = 0; i < css.length; i++) {
      if (css[i] === '{') {
        depth++;
      } else if (css[i] === '}') {
        depth--;
        if (depth === 0) {
          blocks.push(css.slice(start, i + 1).trim());
          start = i + 1;
        }
      }
    }
    return blocks.filter(Boolean);
  }

  /** Assert every media block in `css` follows every block without one. */
  function expectMediaLast(css: string): void {
    const blocks = topLevelBlocks(css);
    const firstMedia = blocks.findIndex(block => block.startsWith('@media'));
    expect(firstMedia).toBeGreaterThan(-1);
    expect(
      blocks.slice(firstMedia).filter(block => !block.startsWith('@media')),
    ).toEqual([]);
  }

  it('emits every tier block after every rule without a media query', () => {
    const theme = defineTheme({
      name: 'req3-order',
      tokens: {'--spacing-4': '16px'},
      components: {card: {base: {borderWidth: '2px'}}},
      // A surface override is the last thing emitted without a media query,
      // so a tier block landing before it would lose where both apply.
      onDark: {tokens: {'--color-background-body': '#000000'}},
      onLight: {tokens: {'--color-background-body': '#ffffff'}},
      mobile: {
        tokens: {'--spacing-4': '12px', '--color-background-body': '#111111'},
        components: {card: {base: {borderWidth: '1px'}}},
      },
    });

    const {component} = generateThemeCSS(theme);

    expect(component).toContain('[data-astryx-media="dark"]');
    expect(component.indexOf('@media')).toBeGreaterThan(
      component.lastIndexOf('[data-astryx-media="dark"]'),
    );
    expect(component.indexOf('@media')).toBeGreaterThan(
      component.lastIndexOf('--spacing-4: 16px'),
    );
    expectMediaLast(component);
  });

  it('puts a pointer refinement after the tier it refines', () => {
    const theme = defineTheme({
      name: 'req3-pointer',
      mobile: {
        tokens: {'--spacing-4': '12px'},
        '@media (pointer: coarse)': {tokens: {'--spacing-4': '14px'}},
      },
    });

    const {component} = generateThemeCSS(theme);
    expect(mediaPreludes(component)).toEqual([
      '(width <= 756px)',
      '(width <= 756px) and (pointer: coarse)',
    ]);
  });

  it('keeps tier prose rules after the base prose rules too', () => {
    const theme = defineTheme({
      name: 'req3-prose',
      typography: {scale: {base: 14, ratio: 1.2}},
      mobile: {typography: {scale: {base: 18}}},
    });

    const {prose} = generateThemeCSS(theme);
    expectMediaLast(prose);
  });
});

// =============================================================================
// A tier changes what it names, and nothing else
//
// The invariant that makes tiers safe to add to an existing theme. It is easy
// to break in a way no single-token assertion catches: a tier that re-expands
// an axis it never mentioned reverts whatever the theme resolved that axis
// against, and the damage shows up as extra declarations nobody asked for.
// =============================================================================

describe('a tier changes only what it names', () => {
  /** Tokens whose tier value differs from the theme's own. */
  function movedTokens(
    theme: ReturnType<typeof defineTheme>,
    layer = 0,
  ): string[] {
    const tokens = theme.__tiers?.[layer].tokens ?? {};
    return Object.keys(tokens)
      .filter(name => theme.tokens[name] !== tokens[name])
      .sort();
  }

  it('moves one token when the tier names one token', () => {
    const theme = defineTheme({
      name: 'named-only',
      typography: {scale: {base: 14, ratio: 1.25}},
      color: {accent: '#0064E0'},
      radius: {base: 4, multiplier: 2},
      tokens: {'--spacing-4': '16px'},
      components: {card: {base: {borderWidth: '2px'}}},
      mobile: {tokens: {'--spacing-4': '12px'}},
    });

    expect(movedTokens(theme)).toEqual(['--spacing-4']);
  });

  it('moves one token when the theme it extends declared every axis', () => {
    // Every axis at once, plus explicit tokens that beat three of them — the
    // shape a real shipped theme has, and the one that breaks if a tier
    // re-expands an axis it never mentioned.
    const base = defineTheme({
      name: 'rich-base',
      typography: {scale: {base: 14, ratio: 1.25}, body: {weight: 'medium'}},
      color: {accent: '#0064E0'},
      radius: {base: 4, multiplier: 2},
      motion: {fast: 150, medium: 300, slow: 600, ratio: 0.8},
      tokens: {
        '--font-size-lg': '99px',
        '--color-accent': '#FF0000',
        '--radius-element': '99px',
      },
      components: {heading: {'level:1': {fontSize: '99px'}}},
    });

    const variant = defineTheme({
      name: 'rich-variant',
      extends: base,
      mobile: {tokens: {'--spacing-4': '12px'}},
    });

    expect(movedTokens(variant)).toEqual(['--spacing-4']);
    expect(generateTierCSS(variant).prose).toBe('');
  });

  it("keeps the base theme's explicit token above the extending theme's axis", () => {
    // The base pins the accent; the child regenerates it from a scale. The
    // child's root resolution has the child winning — and the tier has to
    // agree with the root, or the accent flips inside the media query.
    const base = defineTheme({
      name: 'pinned-base',
      tokens: {'--color-accent': '#FF0000'},
    });
    const variant = defineTheme({
      name: 'regenerating-variant',
      extends: base,
      color: {accent: '#0064E0'},
      mobile: {tokens: {'--spacing-4': '12px'}},
    });

    expect(variant.__tiers?.[0].tokens['--color-accent']).toBe(
      variant.tokens['--color-accent'],
    );
    expect(movedTokens(variant)).toEqual(['--spacing-4']);
  });

  it('still re-expands an axis the tier does name', () => {
    const theme = defineTheme({
      name: 'named-axis',
      typography: {scale: {base: 14, ratio: 1.25}},
      mobile: {typography: {scale: {base: 16}}},
    });

    const moved = movedTokens(theme);
    expect(moved.length).toBeGreaterThan(1);
    expect(moved).toContain('--font-size-base');
    // One step up from a 16px base at the theme's own 1.25 ratio is 20px. At
    // the shipped default ratio of 1.2 it would be 1.2rem, so this is the
    // assertion that the tier inherited the ratio it did not name.
    expect(theme.__tiers?.[0].tokens['--font-size-lg']).toBe('1.25rem');
  });

  it('leaves the theme itself untouched by its tiers', () => {
    const plain = defineTheme({
      name: 'untouched-plain',
      tokens: {'--spacing-4': '16px'},
    });
    const tiered = defineTheme({
      name: 'untouched-tiered',
      tokens: {'--spacing-4': '16px'},
      mobile: {tokens: {'--spacing-4': '12px'}},
    });

    expect(tiered.tokens).toEqual(plain.tokens);
  });
});

describe('completing a scale the theme never declared', () => {
  it('moves the whole axis, and exactly these tokens away from the defaults', () => {
    // Completing a partial scale has to hand the expander a whole config, so
    // the axis is recomputed end to end. The shipped duration table is
    // hand-rounded and no single ratio reproduces it, so two of its nine
    // tokens land 5ms off. Pinned here so the difference stays a known one:
    // if the shipped table or DEFAULT_MOTION_SCALE moves, this fails.
    const theme = defineTheme({
      name: 'completed-motion',
      mobile: {motion: {fast: 175}}, // the shipped `fast`, so only rounding moves
    });

    const tokens = theme.__tiers?.[0].tokens ?? {};
    const drifted: Record<string, string> = {};
    for (const [name, value] of Object.entries(durationDefaults)) {
      if (tokens[name] !== undefined && tokens[name] !== value) {
        drifted[name] = `${value} -> ${tokens[name]}`;
      }
    }

    expect(drifted).toEqual({
      '--duration-fast-max': '230ms -> 235ms',
      '--duration-medium-max': '550ms -> 545ms',
    });
  });

  it('reproduces the radius defaults exactly', () => {
    const theme = defineTheme({
      name: 'completed-radius',
      mobile: {radius: {base: 4}},
    });

    const tokens = theme.__tiers?.[0].tokens ?? {};
    for (const [name, value] of Object.entries(radiusDefaults)) {
      if (tokens[name] !== undefined) {
        expect([name, tokens[name]]).toEqual([name, value]);
      }
    }
  });
});

// =============================================================================
// Inherited overrides inside a tier
//
// An explicit `tokens`/`components` override is applied LAST at the theme
// level, above every generated axis — that is the whole of what pinning a
// token means. A tier that regenerates an axis must not undo that, and a tier
// of a theme that INHERITED the override must not undo it either: the override
// reaches the tier through the resolved seed, which sits below the regenerated
// axis rather than above it.
// =============================================================================

describe('a tier keeps the overrides its theme inherited', () => {
  /** A base whose explicit overrides beat its own generated axes. */
  function pinnedBase(name: string) {
    return defineTheme({
      name,
      color: {accent: '#0064E0'}, //            generates a blue accent…
      tokens: {'--color-accent': '#FF0000'}, // …which this pins to red
      typography: {scale: {base: 14, ratio: 1.25}},
      components: {heading: {'level:1': {fontSize: '99px'}}},
    });
  }

  it('keeps an inherited pinned token when the tier regenerates that axis', () => {
    const child = defineTheme({
      name: 'inherit-token',
      extends: pinnedBase('inherit-token-base'),
      // The child changes nothing. The tier restates a DIFFERENT part of the
      // color axis, which regenerates the whole of it — including the accent
      // the base deliberately pinned and nobody here mentioned.
      mobile: {color: {neutralStyle: 'warm'}},
    });

    expect(child.tokens['--color-accent']).toBe('#FF0000');
    expect(child.__tiers?.[0].tokens['--color-accent']).toBe('#FF0000');
  });

  it('keeps an inherited component override when the tier regenerates the type scale', () => {
    const child = defineTheme({
      name: 'inherit-component',
      extends: pinnedBase('inherit-component-base'),
      mobile: {typography: {scale: {base: 16}}},
    });

    expect(child.components?.heading?.['level:1']?.fontSize).toBe('99px');
    expect(child.__tiers?.[0].components?.heading?.['level:1']?.fontSize).toBe(
      '99px',
    );
  });

  it('emits neither of them into the tier block, because neither moved', () => {
    const child = defineTheme({
      name: 'inherit-quiet',
      extends: pinnedBase('inherit-quiet-base'),
      mobile: {color: {neutralStyle: 'warm'}},
    });

    const {component, prose} = generateTierCSS(child);
    expect(component).not.toContain('--color-accent');
    expect(prose).not.toContain('99px');
  });

  it('still lets the tier itself override an inherited pin', () => {
    const child = defineTheme({
      name: 'inherit-overridden',
      extends: pinnedBase('inherit-overridden-base'),
      mobile: {tokens: {'--color-accent': '#00FF00'}},
    });

    expect(child.__tiers?.[0].tokens['--color-accent']).toBe('#00FF00');
  });

  it("does not resurrect a base pin the child's own axis legitimately beat", () => {
    // The mirror case. An `extends` replaces a scale outright, so the child's
    // color axis beats the base's pinned accent at the root — and the tier has
    // to agree with the root, not re-apply a declaration that already lost.
    const child = defineTheme({
      name: 'inherit-superseded',
      extends: pinnedBase('inherit-superseded-base'),
      color: {accent: '#00A000'},
      mobile: {color: {neutralStyle: 'warm'}},
    });

    expect(child.tokens['--color-accent']).not.toBe('#FF0000');
    expect(child.__tiers?.[0].tokens['--color-accent']).toBe(
      child.tokens['--color-accent'],
    );
  });

  it('carries the same rule two levels down an extends chain', () => {
    const middle = defineTheme({
      name: 'inherit-middle',
      extends: pinnedBase('inherit-deep-base'),
      tokens: {'--spacing-4': '16px'},
    });
    const leaf = defineTheme({
      name: 'inherit-leaf',
      extends: middle,
      mobile: {color: {neutralStyle: 'warm'}},
    });

    expect(leaf.__tiers?.[0].tokens['--color-accent']).toBe('#FF0000');
    expect(leaf.__tiers?.[0].tokens['--spacing-4']).toBe('16px');
  });

  it('refuses a base built before the fields tiers resolve against existed', () => {
    // A built module from an older CLI carries neither `__axes` nor the
    // declared overrides, so a tier could neither complete a partial scale
    // from it nor keep its pins. Silent wrong values are the alternative.
    const stale = {
      name: 'stale-built',
      __built: true,
      tokens: {'--color-accent': '#FF0000'},
    } as unknown as ReturnType<typeof defineTheme>;

    expect(() =>
      defineTheme({
        name: 'on-stale',
        extends: stale,
        mobile: {tokens: {'--spacing-4': '12px'}},
      }),
    ).toThrow(/older `astryx theme build`/);

    // …and a theme that declares no tier is unaffected by the staleness.
    expect(() =>
      defineTheme({name: 'on-stale-untiered', extends: stale}),
    ).not.toThrow();
  });
});

describe('a tier of a theme extending a BUILT theme', () => {
  /** The shape `astryx theme build` serializes — resolved values plus the
   * declarations and axis configs an extending theme needs to read back. */
  function builtBase() {
    const live = defineTheme({
      name: 'built-shaped-source',
      color: {accent: '#0064E0'},
      tokens: {'--color-accent': '#FF0000'},
      typography: {scale: {base: 14, ratio: 1.25}},
      components: {heading: {'level:1': {fontSize: '99px'}}},
    });
    return {
      name: 'built-shaped',
      __built: true,
      tokens: live.tokens,
      components: live.components,
      __axes: live.__axes,
      __onDark: live.__onDark,
      __onLight: live.__onLight,
    } as unknown as ReturnType<typeof defineTheme>;
  }

  it('keeps the built theme pins its tier never mentioned', () => {
    const child = defineTheme({
      name: 'on-built',
      extends: builtBase(),
      mobile: {color: {neutralStyle: 'warm'}, typography: {scale: {base: 16}}},
    });

    expect(child.__tiers?.[0].tokens['--color-accent']).toBe('#FF0000');
    expect(child.__tiers?.[0].components?.heading?.['level:1']?.fontSize).toBe(
      '99px',
    );
  });

  it('completes a partial scale from the built theme own ratio', () => {
    const child = defineTheme({
      name: 'on-built-scale',
      extends: builtBase(),
      mobile: {typography: {scale: {base: 16}}},
    });

    // 16 × 1.25 = 20px = 1.25rem. The shipped default ratio of 1.2 would give
    // 1.2rem, so this is the assertion that the built theme's ratio came back.
    expect(child.__tiers?.[0].tokens['--font-size-lg']).toBe('1.25rem');
  });
});

// =============================================================================
// Explicit pins equal to their generated values
//
// Value comparison recovers ordinary pins, but cannot tell an explicit value
// from a generated one when the two happen to be equal. That is harmless until
// a tier regenerates the axis to a DIFFERENT value — exactly what tiers do.
// =============================================================================

describe('an explicit pin equal to its generated value', () => {
  function equalPinnedBase(name: string) {
    return defineTheme({
      name,
      typography: {scale: {base: 14, ratio: 1.2}},
      // This is exactly what the scale above generates today, but writing it
      // explicitly means "hold this value" when a tier changes the scale.
      tokens: {'--font-size-base': '0.875rem'},
    });
  }

  it('stays pinned when a tier regenerates the axis', () => {
    const theme = defineTheme({
      name: 'equal-pin',
      typography: {scale: {base: 14, ratio: 1.2}},
      tokens: {'--font-size-base': '0.875rem'},
      mobile: {typography: {scale: {base: 16}}},
    });

    expect(theme.tokens['--font-size-base']).toBe('0.875rem');
    expect(theme.__tiers?.[0].tokens['--font-size-base']).toBe('0.875rem');
    expect(theme.__equalOverrides).toEqual({tokens: ['--font-size-base']});
  });

  it('survives through an unchanged child theme', () => {
    const child = defineTheme({
      name: 'equal-pin-child',
      extends: equalPinnedBase('equal-pin-base'),
      mobile: {typography: {scale: {base: 16}}},
    });

    expect(child.__tiers?.[0].tokens['--font-size-base']).toBe('0.875rem');
    expect(child.__equalOverrides).toEqual({tokens: ['--font-size-base']});
  });

  it('survives two levels of extends', () => {
    const middle = defineTheme({
      name: 'equal-pin-middle',
      extends: equalPinnedBase('equal-pin-deep-base'),
    });
    const leaf = defineTheme({
      name: 'equal-pin-leaf',
      extends: middle,
      mobile: {typography: {scale: {base: 16}}},
    });

    expect(leaf.__tiers?.[0].tokens['--font-size-base']).toBe('0.875rem');
  });

  it("does not resurrect it after the child's own axis supersedes it", () => {
    const child = defineTheme({
      name: 'equal-pin-superseded',
      extends: equalPinnedBase('equal-pin-superseded-base'),
      // An `extends` replaces the scale input: this legitimately beats the
      // base's pin, so the inherited marker has to be removed too.
      typography: {scale: {base: 15, ratio: 1.2}},
      mobile: {typography: {scale: {base: 16}}},
    });

    expect(child.tokens['--font-size-base']).toBe('0.9375rem');
    expect(child.__tiers?.[0].tokens['--font-size-base']).toBe('1rem');
    expect(child.__equalOverrides).toBeUndefined();
  });

  it('drops inherited metadata when the child replaces the pin with a distinct value', () => {
    const child = defineTheme({
      name: 'equal-pin-explicitly-replaced',
      extends: equalPinnedBase('equal-pin-explicitly-replaced-base'),
      tokens: {'--font-size-base': '2rem'},
      mobile: {typography: {scale: {base: 16}}},
    });

    expect(child.tokens['--font-size-base']).toBe('2rem');
    expect(child.__tiers?.[0].tokens['--font-size-base']).toBe('2rem');
    expect(child.__equalOverrides).toBeUndefined();
  });

  it('lets an explicit tier value beat the pin', () => {
    const child = defineTheme({
      name: 'equal-pin-tier-wins',
      extends: equalPinnedBase('equal-pin-tier-wins-base'),
      mobile: {tokens: {'--font-size-base': '2rem'}},
    });

    expect(child.__tiers?.[0].tokens['--font-size-base']).toBe('2rem');
  });

  it('records an equal generated component path without storing its value', () => {
    const theme = defineTheme({
      name: 'equal-component-pin',
      typography: {scale: {base: 14, ratio: 1.2}},
      components: {
        heading: {
          'level:1': {fontSize: 'var(--text-heading-1-size)'},
        },
      },
      mobile: {typography: {scale: {base: 16}}},
    });

    expect(theme.__equalOverrides).toEqual({
      components: [['heading', 'level:1', 'fontSize']],
    });
    expect(theme.__tiers?.[0].components?.heading?.['level:1']?.fontSize).toBe(
      'var(--text-heading-1-size)',
    );
  });

  it('stores nothing for the ordinary distinct-value case', () => {
    const theme = defineTheme({
      name: 'distinct-pin',
      typography: {scale: {base: 14, ratio: 1.2}},
      tokens: {'--font-size-base': '2rem'},
      mobile: {typography: {scale: {base: 16}}},
    });

    expect(theme.__tiers?.[0].tokens['--font-size-base']).toBe('2rem');
    expect(theme.__equalOverrides).toBeUndefined();
  });

  it('round-trips through the shape of a built theme', () => {
    const live = equalPinnedBase('equal-pin-built-source');
    const built = {
      name: 'equal-pin-built',
      __built: true,
      tokens: live.tokens,
      components: live.components,
      __axes: live.__axes,
      __equalOverrides: live.__equalOverrides,
    } as unknown as ReturnType<typeof defineTheme>;

    const child = defineTheme({
      name: 'equal-pin-on-built',
      extends: built,
      mobile: {typography: {scale: {base: 16}}},
    });

    expect(child.__tiers?.[0].tokens['--font-size-base']).toBe('0.875rem');
  });
});
