// Copyright (c) Meta Platforms, Inc. and affiliates.

import {describe, expect, it} from 'vitest';
import {docs as buttonDocs} from '../packages/core/src/Button/Button.doc.mjs';
import {
  buttonAccessibilityThemeCoverage,
  buttonGroupAccessibilityThemeCoverage,
  iconButtonAccessibilityThemeCoverage,
  segmentedControlAccessibilityThemeCoverage,
  toggleButtonAccessibilityThemeCoverage,
} from '../packages/core/src/Button/buttonFamilyAccessibilityThemeCoverage.mjs';
import {docs as buttonGroupDocs} from '../packages/core/src/ButtonGroup/ButtonGroup.doc.mjs';
import {docs as iconButtonDocs} from '../packages/core/src/IconButton/IconButton.doc.mjs';
import {docs as segmentedControlDocs} from '../packages/core/src/SegmentedControl/SegmentedControl.doc.mjs';
import {docs as toggleButtonDocs} from '../packages/core/src/ToggleButton/ToggleButton.doc.mjs';
import {neutralTheme} from '../packages/themes/neutral/src/neutralTheme.ts';
import {
  compositeColor,
  createTokenResolver,
  resultStatus,
} from './accessibility/contrast-audit-engine.mjs';
import {
  buildButtonFamilyAccessibilityThemeCoverage,
  buttonFamilyAuditProfiles,
  buttonFamilySource,
  getButtonFamilyAuditContract,
} from './accessibility/button-family-audit-profiles.mjs';

const docsByComponent = {
  Button: buttonDocs,
  IconButton: iconButtonDocs,
  ToggleButton: toggleButtonDocs,
  ButtonGroup: buttonGroupDocs,
  SegmentedControl: segmentedControlDocs,
};

const generatedByComponent = {
  Button: buttonAccessibilityThemeCoverage,
  IconButton: iconButtonAccessibilityThemeCoverage,
  ToggleButton: toggleButtonAccessibilityThemeCoverage,
  ButtonGroup: buttonGroupAccessibilityThemeCoverage,
  SegmentedControl: segmentedControlAccessibilityThemeCoverage,
};

function measurementsFor(coverage) {
  return coverage.flatMap(theme =>
    theme.tables.flatMap(table =>
      table.modes.flatMap(mode =>
        mode.results.flatMap(result => result.measurements),
      ),
    ),
  );
}

describe('contrast audit engine', () => {
  it('resolves semantic tokens, modes, local values, and fallbacks', () => {
    const resolve = createTokenResolver({
      tokens: {
        '--semantic': 'light-dark(var(--light), var(--dark))',
        '--light': '#fff',
        '--dark': 'rgba(0, 0, 0, 0.5)',
      },
    });
    expect(resolve('var(--semantic)', 0)).toBe('#fff');
    expect(resolve('var(--semantic)', 1)).toBe('rgba(0, 0, 0, 0.5)');
    expect(resolve('var(--local, #123456)', 0, {'--local': '#abcdef'})).toBe(
      '#abcdef',
    );
    expect(resolve('var(--missing, #123456)', 0)).toBe('#123456');
  });

  it('composites alpha colors in paint order', () => {
    expect(compositeColor('#fff8', '#000000')).toBe('#888888');
    expect(compositeColor('rgba(255, 255, 255, 0.5)', '#000000')).toBe(
      '#808080',
    );
    const surface = compositeColor('#ffffff1a', '#1b1b1b');
    expect(surface).toBe('#323232');
    expect(compositeColor('#0000001a', surface)).toBe('#2d2d2d');
  });
});

describe('Button-family generated contrast coverage', () => {
  const calculated = buildButtonFamilyAccessibilityThemeCoverage();

  it('matches every generated theme result exactly', () => {
    for (const [component, coverage] of Object.entries(generatedByComponent)) {
      expect(coverage).toEqual(calculated[component]);
      expect(docsByComponent[component].usage.accessibilityThemeCoverage).toBe(
        coverage,
      );
    }
  });

  it('keeps representative rendered results stable', () => {
    const buttonLight = calculated.Button[0].tables[0].modes[0];
    const primary = buttonLight.results.find(
      result => result.name === 'Primary',
    );
    const destructive = buttonLight.results.find(
      result => result.name === 'Destructive',
    );
    expect(primary.measurements).toContainEqual(
      expect.objectContaining({label: 'Rest', value: '15.13:1'}),
    );
    expect(destructive.measurements).toContainEqual(
      expect.objectContaining({
        label: 'Pointer down',
        value: '4.41:1',
        status: 'Fail',
      }),
    );

    const segmentedDark = calculated.SegmentedControl[0].tables[0].modes[1];
    const unselected = segmentedDark.results.find(
      result => result.name === 'Unselected',
    );
    expect(unselected.measurements).toContainEqual(
      expect.objectContaining({label: 'Rest', value: '4.37:1', status: 'Fail'}),
    );
    expect(unselected.measurements).toContainEqual(
      expect.objectContaining({
        label: 'Hover',
        value: '3.74:1',
        status: 'Fail',
      }),
    );
  });

  it('covers every declared Button and Badge variant', () => {
    const contract = getButtonFamilyAuditContract();
    expect(contract.buttonVariants).toEqual(contract.expectedButtonVariants);
    expect(contract.badgeVariants).toEqual(contract.expectedBadgeVariants);
    expect(contract.badgeVariants).toHaveLength(14);
    expect(contract.badgeCombinationCount).toBe(336);
  });

  it('keeps profiles tied to the rendered component contracts', () => {
    expect(buttonFamilySource.Button).toContain(
      'interactionOverlayStyles.backgroundImage',
    );
    expect(buttonFamilySource.Button).toContain(
      'visuallyDisabled && styles.disabled',
    );
    expect(buttonFamilySource.IconButton).toContain('<Button {...props}');
    expect(buttonFamilySource.IconButton).toContain('isIconOnly');
    expect(buttonFamilySource.ToggleButton).toContain('variant="ghost"');
    expect(buttonFamilySource.ToggleButton).toContain(
      "default: colorVars['--color-overlay-pressed']",
    );
    expect(buttonFamilySource.ToggleButton).toContain('isInterruptible');
    expect(buttonFamilySource.ButtonGroup).toContain(
      "borderInlineStartColor: colorVars['--color-border']",
    );
    expect(buttonFamilySource.SegmentedControl).toContain(
      "backgroundColor: colorVars['--color-neutral']",
    );
    expect(buttonFamilySource.SegmentedControlItem).toContain(
      "color: colorVars['--color-text-secondary']",
    );
    expect(buttonFamilySource.SegmentedControlItem).toContain(
      "'@media (hover: hover)': colorVars['--color-overlay-hover']",
    );
    expect(neutralTheme.components?.['button-group']).toBeUndefined();
    expect(
      Object.keys(neutralTheme.components?.['toggle-button'] ?? {}),
    ).toEqual([]);
    expect(
      Object.keys(neutralTheme.components?.['segmented-control'] ?? {}),
    ).toEqual([]);
    expect(
      Object.keys(neutralTheme.components?.['segmented-control-item'] ?? {}),
    ).toEqual([]);
  });

  it('derives every row status from required measurements', () => {
    for (const coverage of Object.values(generatedByComponent)) {
      for (const theme of coverage) {
        for (const table of theme.tables) {
          for (const mode of table.modes) {
            for (const result of mode.results) {
              expect(result.status).toBe(resultStatus(result.measurements));
            }
          }
        }
      }
    }
    expect(
      resultStatus([
        {status: 'Fail', applicability: 'Conditional'},
        {status: 'Fail', applicability: 'Supplemental'},
        {status: 'Fail', applicability: 'Decorative'},
      ]),
    ).toBe('Pass');
  });

  it('keeps theme intent in profiles and out of measured columns', () => {
    expect(buttonFamilyAuditProfiles.ButtonGroup.theme.notMeasured).toContain(
      'Divider — Decorative in Neutral.',
    );
    expect(
      measurementsFor(generatedByComponent.ButtonGroup).map(item => item.label),
    ).not.toContain('Divider');

    for (const component of ['ToggleButton', 'SegmentedControl']) {
      expect(
        buttonFamilyAuditProfiles[component].theme.notMeasured,
      ).toContainEqual(
        expect.stringContaining('Selected background — Supplemental'),
      );
      expect(
        measurementsFor(generatedByComponent[component]).map(
          item => item.label,
        ),
      ).not.toContain('Selected surface');
    }

    for (const component of [
      'Button',
      'IconButton',
      'ToggleButton',
      'ButtonGroup',
    ]) {
      expect(buttonFamilyAuditProfiles[component].theme.notMeasured).toContain(
        'Spinner track — Decorative. The moving arc must meet 3:1.',
      );
      const labels = measurementsFor(generatedByComponent[component]).map(
        item => item.label,
      );
      expect(labels).toContain('Spinner arc');
      expect(labels).not.toContain('Spinner');
    }
  });

  it('keeps published terms and Badge context clear', () => {
    for (const docs of Object.values(docsByComponent)) {
      const requirements = docs.usage.accessibility ?? [];
      expect(requirements).toContainEqual(
        expect.objectContaining({
          name: 'Disabled appearance',
          description:
            'Disabled controls do not need to meet these contrast ratios.',
        }),
      );
      expect(requirements.flatMap(item => item.states ?? [])).not.toContain(
        'Pressed',
      );
    }

    for (const component of [
      'Button',
      'IconButton',
      'ToggleButton',
      'ButtonGroup',
    ]) {
      expect(docsByComponent[component].usage.accessibility).toContainEqual(
        expect.objectContaining({name: 'Essential icon or spinner arc'}),
      );
    }

    const badgeBreakdowns = measurementsFor(
      generatedByComponent.Button,
    ).flatMap(measurement => measurement.breakdown ?? []);
    expect(badgeBreakdowns).toContainEqual(
      expect.objectContaining({detail: 'Rest state · Page background'}),
    );
    expect(badgeBreakdowns).toContainEqual(
      expect.objectContaining({
        detail: 'Pointer down state · Surface background',
      }),
    );
    expect(badgeBreakdowns).not.toContainEqual(
      expect.objectContaining({detail: expect.stringContaining('Body')}),
    );
  });
});
