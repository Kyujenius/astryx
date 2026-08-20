export default function ChangelogView() {
  return (
    <div style={{maxWidth: 680, margin: '0 auto', padding: 24, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'}}>
      <h1>Changelog</h1>
      <h2>v2.4.0 (2024-03-15)</h2>
      <h3>New Features</h3>
      <ul>
        <li>Added dark mode support with <code>useTheme</code> hook</li>
        <li>Introduced <code>CommandPalette</code> component for keyboard-first navigation</li>
        <li>New <code>DateRangeInput</code> for selecting date ranges</li>
      </ul>
      <h3>Bug Fixes</h3>
      <ul>
        <li>Fixed focus trap escaping in nested dialogs</li>
        <li>Resolved <code>Table</code> column resize flicker on Safari</li>
        <li>Corrected <code>Tooltip</code> positioning near viewport edges</li>
      </ul>
      <h3>Breaking Changes</h3>
      <ul>
        <li>Removed deprecated <code>variant=&quot;outline&quot;</code> from Button; use <code>variant=&quot;ghost&quot;</code> instead</li>
        <li><code>Dialog</code> now requires <code>onOpenChange</code> prop (previously optional)</li>
      </ul>
      <h2>v2.3.2 (2024-02-28)</h2>
      <h3>Bug Fixes</h3>
      <ul>
        <li>Fixed <code>Selector</code> keyboard navigation with grouped options</li>
        <li>Resolved memory leak in <code>useIntersectionObserver</code></li>
      </ul>
      <h3>Improvements</h3>
      <ul>
        <li>Reduced bundle size by 12% through tree-shaking improvements</li>
        <li>Added <code>aria-describedby</code> to all form inputs automatically</li>
      </ul>
    </div>
  );
}
