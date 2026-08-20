import {Markdown} from '@astryxdesign/core/Markdown';
import {Stack} from '@astryxdesign/core/Stack';

const CHANGELOG = `# Changelog

## v2.4.0 (2024-03-15)

### New Features

- Added dark mode support with \`useTheme\` hook
- Introduced \`CommandPalette\` component for keyboard-first navigation
- New \`DateRangeInput\` for selecting date ranges

### Bug Fixes

- Fixed focus trap escaping in nested dialogs
- Resolved \`Table\` column resize flicker on Safari
- Corrected \`Tooltip\` positioning near viewport edges

### Breaking Changes

- Removed deprecated \`variant="outline"\` from Button; use \`variant="ghost"\` instead
- \`Dialog\` now requires \`onOpenChange\` prop (previously optional)

## v2.3.2 (2024-02-28)

### Bug Fixes

- Fixed \`Selector\` keyboard navigation with grouped options
- Resolved memory leak in \`useIntersectionObserver\`

### Improvements

- Reduced bundle size by 12% through tree-shaking improvements
- Added \`aria-describedby\` to all form inputs automatically
`;

export default function ChangelogView() {
  return (
    <Stack padding={4}>
      <Markdown>{CHANGELOG}</Markdown>
    </Stack>
  );
}
