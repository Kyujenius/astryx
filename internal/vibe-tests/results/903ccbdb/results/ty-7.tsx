import {Markdown} from '@astryxdesign/core/Markdown';
import {Stack} from '@astryxdesign/core/Stack';

const changelogContent = `# Changelog

## v2.1.0 - 2024-03-15

### Features

- Added dark mode support with automatic system preference detection
- New \`Grid\` component for responsive layouts
- \`Button\` now supports \`isLoading\` prop with built-in spinner

### Bug Fixes

- Fixed focus trap not releasing on dialog close
- Resolved hydration mismatch in \`Tooltip\` during SSR
- \`TextInput\` clear button now properly resets validation state

### Breaking Changes

- Renamed \`variant="danger"\` to \`variant="destructive"\` on Button
- \`Dialog\` requires explicit \`onOpenChange\` (no longer auto-closes)

## v2.0.1 - 2024-02-28

### Bug Fixes

- Patched CSS specificity issue with \`Card\` hover states
- Fixed \`Table\` sort indicator alignment in RTL mode

## v2.0.0 - 2024-02-15

### Features

- Complete rewrite using StyleX for zero-runtime CSS
- New token system: \`colorVars\`, \`spacingVars\`, \`typeScaleVars\`
- Tree-shakeable exports via subpath imports

### Migration

- Replace all \`css\` prop usage with \`xstyle\`
- Update imports from \`@astryxdesign/core\` to subpath pattern
`;

export default function ChangelogPage() {
  return (
    <Stack direction="vertical" padding={4} maxWidth={720}>
      <Markdown>{changelogContent}</Markdown>
    </Stack>
  );
}
