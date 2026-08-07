import {Markdown} from '@astryxdesign/core/Markdown';

const content = `# Changelog

## v2.1.0

### Added
- Dark mode with \`prefers-color-scheme\` detection
- New \`Grid\` component for responsive layouts
- \`Button\` supports \`isLoading\` prop

### Fixed
- Focus trap release on dialog close
- \`Tooltip\` hydration mismatch in SSR
- \`TextInput\` clear resets validation

### Changed
- \`variant="danger"\` renamed to \`variant="destructive"\`
`;

export default function ChangelogPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Markdown>{content}</Markdown>
    </div>
  );
}
