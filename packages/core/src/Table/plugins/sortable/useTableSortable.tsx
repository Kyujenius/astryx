// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useTableSortable.tsx
 * @input React, types, Icon, theme tokens, i18n (useTranslator)
 * @output Exports useTableSortable hook and sort-related types
 * @position Sortable plugin; consumed by Table via plugins prop
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Table/Table.doc.mjs (sort documentation)
 * - /packages/core/src/Table/index.ts (exports)
 */

import {useRef, useMemo, type ReactNode} from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  colorVars,
  spacingVars,
  radiusVars,
  durationVars,
  easeVars,
} from '../../../theme/tokens.stylex';
import {focusOutlineProps} from '../../../utils/focusOutline.stylex';
import {mergeProps} from '../../../utils';
import {themeProps} from '../../../utils/themeProps';
import {Icon} from '../../../Icon';
import {resolveContextActions} from '../../tableContextMenu';
import {useTranslator, type TranslatorFn} from '../../../i18n';
import type {
  TablePlugin,
  HeaderCellRenderProps,
  TableColumn,
  TableContextAction,
} from '../../types';

// =============================================================================
// Sort Types
// =============================================================================

/**
 * Sort direction for a single column.
 */
export type TableSortDirection = 'ascending' | 'descending';

/**
 * A single sort entry in the sort state array.
 */
export interface TableSortEntry<TSortKey extends string = string> {
  /** The sort key identifying which column (or derived value) to sort by. */
  sortKey: TSortKey;
  /** The sort direction. */
  direction: TableSortDirection;
}

/**
 * Complete sort state — an ordered array of sort entries.
 * The first entry is the primary sort; subsequent entries are tiebreakers.
 * Empty array = no sort applied.
 *
 * @example
 * ```
 * const sort: TableSortState = [
 *   { sortKey: 'name', direction: 'ascending' },
 *   { sortKey: 'age', direction: 'descending' },
 * ];
 * ```
 */
export type TableSortState<TSortKey extends string = string> =
  TableSortEntry<TSortKey>[];

// =============================================================================
// Hook Config
// =============================================================================

/**
 * Configuration for useTableSortable.
 *
 * Follows Astryx headless plugin conventions: the consumer owns all state
 * and provides callbacks. The plugin never holds internal sort state.
 *
 * @template TSortKey - Union of valid sort key strings
 *
 * @example
 * ```
 * const [sort, setSort] = useState<TableSortState>([
 *   { sortKey: 'name', direction: 'ascending' },
 * ]);
 * const sortPlugin = useTableSortable({ sort, onSortChange: setSort });
 * <Table plugins={{ sort: sortPlugin }} columns={columns} data={data} />
 * ```
 */
export interface UseTableSortableConfig<TSortKey extends string = string> {
  /** Current sort state — ordered array of active sort entries. */
  sort: TableSortState<TSortKey>;

  /**
   * Called when the user changes sort via header click.
   * Receives the complete new sort state array.
   */
  onSortChange: (sort: TableSortState<TSortKey>) => void;

  /**
   * Allow returning to unsorted state.
   * When true, clicking a sorted column cycles: asc → desc → unsorted.
   * When false, clicking cycles: asc → desc → asc.
   *
   * @default true
   */
  allowUnsortedState?: boolean;

  /**
   * Enable multi-sort via modifier key (Shift+click).
   * When true, Shift+click adds/toggles a column as a secondary sort.
   * Regular click still replaces the entire sort state (single-sort behavior).
   *
   * @default false
   */
  isMultiSortEnabled?: boolean;
}

// =============================================================================
// Styles
// =============================================================================

const sortStyles = stylex.create({
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: spacingVars['--spacing-1'],
    background: 'transparent',
    border: 'none',
    padding: 0,
    margin: 0,
    cursor: {
      default: 'pointer',
      ':is(:disabled,[aria-disabled="true"])': 'default',
    },
    font: 'inherit',
    // The glyph reads this through `color="inherit"`, so a theme setting a
    // colour on `astryx-table-sort-button` reaches the thing it is aiming at.
    // The label carries the header's colour itself (see `label`) rather than
    // inheriting it from here.
    color: colorVars['--color-icon-secondary'],
    width: '100%',
    height: '100%',
    textAlign: 'inherit',
    borderRadius: radiusVars['--radius-inner'],
    // Rest -> hover -> pressed, the treatment every other borderless control
    // in the system draws. The resting state carries no tint: the affordance
    // is legible on its colour alone (`--color-icon-secondary`, 4.74:1)
    // rather than on the dimming that put it at 1.57:1.
    backgroundColor: {
      default: 'transparent',
      ':active:where(:not(:disabled,[aria-disabled="true"]))':
        colorVars['--color-overlay-pressed'],
    },
    transitionProperty: 'background-color, color',
    transitionDuration: durationVars['--duration-fast'],
    transitionTimingFunction: easeVars['--ease-standard'],
  },
  // Guarded on `hover: hover` so a touch device does not stick in the hover
  // tint after a tap (Component Audit Rubric A8).
  buttonHoverOnPointer: {
    '@media (hover: hover)': {
      backgroundColor: {
        ':hover:where(:not(:disabled,[aria-disabled="true"]))':
          colorVars['--color-overlay-hover'],
      },
      color: {
        // The glyph darkens a step as well, so the feedback survives a
        // forced-colors mode that drops the background tint.
        ':hover:where(:not(:disabled,[aria-disabled="true"]))':
          colorVars['--color-text-primary'],
      },
    },
  },
  // Accent is the SORTED state and nothing else, so "this column is sorted"
  // never reads as "the pointer is here".
  buttonSorted: {
    color: colorVars['--color-accent'],
  },
  // The header text belongs to the cell, not to the affordance. It is pinned
  // to the token the `<th>` sets so the button's icon colour cannot bleed into
  // it — without this, colouring the sort target repaints the header label too.
  label: {
    color: colorVars['--color-text-secondary'],
  },
  iconWrapper: {
    display: 'inline-flex',
  },
  rank: {
    fontSize: 10,
    // eslint-disable-next-line @astryx/no-hardcoded-styles -- no token for lineHeight:1 (tight badge)
    lineHeight: '1',
    color: colorVars['--color-accent'],
  },
});

// =============================================================================
// Helpers
// =============================================================================

function resolveSortKey<T extends Record<string, unknown>>(
  column: TableColumn<T>,
): string | null {
  const {sortable} = column;
  if (!sortable) {
    return null;
  }
  if (sortable === true) {
    return column.key;
  }
  return sortable.sortKey ?? column.key;
}

function getHeaderLabel<T extends Record<string, unknown>>(
  column: TableColumn<T>,
): string {
  const {header} = column;
  if (typeof header === 'string') {
    return header;
  }
  return column.key;
}

function buildAriaLabel<T extends Record<string, unknown>>(
  t: TranslatorFn,
  column: TableColumn<T>,
  direction: TableSortDirection | null,
  rank: number | null,
  total: number,
): string {
  const label = getHeaderLabel(column);
  if (direction == null) {
    return t('@astryx.table.sort.sortBy', {label});
  }
  const directionLabel =
    direction === 'ascending'
      ? t('@astryx.table.sort.direction.ascending')
      : t('@astryx.table.sort.direction.descending');
  if (rank != null && total > 1) {
    return t('@astryx.table.sort.sortedByWithPriority', {
      label,
      direction: directionLabel,
      rank,
      total,
    });
  }
  return t('@astryx.table.sort.sortedBy', {label, direction: directionLabel});
}

function getNextDirection(
  current: TableSortDirection | null,
  allowUnsortedState: boolean,
): TableSortDirection | null {
  if (current == null) {
    return 'ascending';
  }
  if (current === 'ascending') {
    return 'descending';
  }
  // current === 'descending'
  return allowUnsortedState ? null : 'ascending';
}

// =============================================================================
// Sort Header Button Component
// =============================================================================

function SortHeaderButton<T extends Record<string, unknown>>({
  column,
  children,
  configRef,
}: {
  column: TableColumn<T>;
  children: ReactNode;
  configRef: React.RefObject<UseTableSortableConfig>;
}) {
  const t = useTranslator();
  const config = configRef.current;
  const sortKey = resolveSortKey(column) ?? '';
  const entryIndex = config.sort.findIndex(e => e.sortKey === sortKey);
  const entry = entryIndex >= 0 ? config.sort[entryIndex] : null;
  const direction = entry?.direction ?? null;

  const isMultiSort =
    config.isMultiSortEnabled === true && config.sort.length > 1;
  const rank = isMultiSort && entryIndex >= 0 ? entryIndex + 1 : null;

  const iconName =
    direction === 'ascending'
      ? 'arrowUp'
      : direction === 'descending'
        ? 'arrowDown'
        : 'arrowsUpDown';

  const ariaLabel = buildAriaLabel(
    t,
    column,
    direction,
    rank,
    config.sort.length,
  );

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    const cfg = configRef.current;
    const isShift = e.shiftKey && cfg.isMultiSortEnabled;
    const allowUnsorted = cfg.allowUnsortedState ?? true;

    if (isShift) {
      // Multi-sort: toggle in place or append
      const idx = cfg.sort.findIndex(s => s.sortKey === sortKey);
      if (idx >= 0) {
        const nextDir = getNextDirection(
          cfg.sort[idx].direction,
          allowUnsorted,
        );
        if (nextDir == null) {
          // Remove from array
          const newSort = [...cfg.sort];
          newSort.splice(idx, 1);
          cfg.onSortChange(newSort);
        } else {
          const newSort = [...cfg.sort];
          newSort[idx] = {...newSort[idx], direction: nextDir};
          cfg.onSortChange(newSort);
        }
      } else {
        // Append new entry
        cfg.onSortChange([...cfg.sort, {sortKey, direction: 'ascending'}]);
      }
    } else {
      // Single-sort: replace entire array
      const currentEntry = cfg.sort.find(s => s.sortKey === sortKey);
      const nextDir = getNextDirection(
        currentEntry?.direction ?? null,
        allowUnsorted,
      );
      if (nextDir == null) {
        cfg.onSortChange([]);
      } else {
        cfg.onSortChange([{sortKey, direction: nextDir}]);
      }
    }
  };

  return (
    <button
      type="button"
      {...mergeProps(
        themeProps('table-sort-button', {direction}),
        focusOutlineProps.focusVisible(
          sortStyles.button,
          sortStyles.buttonHoverOnPointer,
          direction != null && sortStyles.buttonSorted,
        ),
      )}
      aria-label={ariaLabel}
      onClick={handleClick}>
      <span {...stylex.props(sortStyles.label)}>{children}</span>
      <span {...stylex.props(sortStyles.iconWrapper)}>
        <Icon icon={iconName} size="xsm" color="inherit" />
      </span>
      {rank != null && (
        <span {...stylex.props(sortStyles.rank)} aria-hidden="true">
          {rank}
        </span>
      )}
    </button>
  );
}

// =============================================================================
// Hook
// =============================================================================

/**
 * useTableSortable — table plugin for column sorting.
 *
 * Returns a stable TablePlugin<T> that transforms header cells to add
 * clickable sort indicators. Follows the headless pattern: consumer owns
 * sort state, plugin provides UI and interaction.
 *
 * @example
 * ```
 * const [sort, setSort] = useState<TableSortState>([]);
 * const sortPlugin = useTableSortable({ sort, onSortChange: setSort });
 * <Table
 *   data={users}
 *   columns={[
 *     { key: 'name', header: 'Name', sortable: true },
 *     { key: 'age', header: 'Age', sortable: true },
 *   ]}
 *   plugins={{ sort: sortPlugin }}
 * />
 * ```
 */
export function useTableSortable<
  T extends Record<string, unknown>,
  TSortKey extends string = string,
>(config: UseTableSortableConfig<TSortKey>): TablePlugin<T> {
  const t = useTranslator();
  const configRef = useRef(config);
  configRef.current = config;

  return useMemo(
    (): TablePlugin<T> => ({
      transformHeaderCell(
        props: HeaderCellRenderProps,
        column: TableColumn<T>,
      ): HeaderCellRenderProps {
        const sortKey = resolveSortKey(column);
        if (sortKey == null) {
          return props;
        }

        const cfg = configRef.current;
        const entry = cfg.sort.find(e => e.sortKey === sortKey);

        // Context-menu actions are built lazily (only when the menu opens) via
        // a getter, reading the current sort state at call time — so we don't
        // build an action array for every header on every render, and the
        // checked/clear state always reflects the latest sort.
        const getSortActions = (): TableContextAction[] => {
          const c = configRef.current;
          const dir =
            c.sort.find(e => e.sortKey === sortKey)?.direction ?? null;
          const actions: TableContextAction[] = [
            {
              id: 'sort-asc',
              group: 'sort',
              label: t('@astryx.table.sort.ascending'),
              icon: <Icon icon="arrowUp" size="xsm" aria-hidden />,
              checked: dir === 'ascending',
              onSelect: () =>
                c.onSortChange([
                  {sortKey: sortKey as TSortKey, direction: 'ascending'},
                ]),
            },
            {
              id: 'sort-desc',
              group: 'sort',
              label: t('@astryx.table.sort.descending'),
              icon: <Icon icon="arrowDown" size="xsm" aria-hidden />,
              checked: dir === 'descending',
              onSelect: () =>
                c.onSortChange([
                  {sortKey: sortKey as TSortKey, direction: 'descending'},
                ]),
            },
          ];
          if (dir != null) {
            actions.push({
              id: 'sort-clear',
              group: 'sort-clear',
              label: t('@astryx.table.sort.clear'),
              icon: <Icon icon="close" size="xsm" aria-hidden />,
              onSelect: () =>
                c.onSortChange(c.sort.filter(e => e.sortKey !== sortKey)),
            });
          }
          return actions;
        };

        // Merge with any actions a prior plugin contributed (array or getter),
        // resolving both lazily at open time.
        const priorActions = props.contextMenuActions;
        return {
          ...props,
          htmlProps: {
            ...props.htmlProps,
            ...(entry != null ? {'aria-sort': entry.direction} : {}),
          },
          content: (
            <SortHeaderButton
              column={column}
              configRef={
                configRef as unknown as React.RefObject<UseTableSortableConfig>
              }>
              {props.content}
            </SortHeaderButton>
          ),
          contextMenuActions: () => [
            ...resolveContextActions(priorActions),
            ...getSortActions(),
          ],
        };
      },
    }),
    [t],
  );
}
