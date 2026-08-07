export default function Changelog() {
  return (
    <article className="prose prose-neutral max-w-2xl mx-auto p-6">
      <h1>Changelog</h1>
      <h2>v2.1.0 - 2024-03-15</h2>
      <h3>Features</h3>
      <ul>
        <li>Added dark mode support with automatic <code>prefers-color-scheme</code> detection</li>
        <li>New <code>Grid</code> component for responsive layouts</li>
        <li><code>Button</code> now supports <code>isLoading</code> prop</li>
      </ul>
      <h3>Bug Fixes</h3>
      <ul>
        <li>Fixed focus trap not releasing on dialog close</li>
        <li>Resolved hydration mismatch in <code>Tooltip</code></li>
        <li><code>TextInput</code> clear button resets validation</li>
      </ul>
      <h3>Breaking Changes</h3>
      <ul>
        <li>Renamed <code>variant=&quot;danger&quot;</code> to <code>variant=&quot;destructive&quot;</code></li>
        <li><code>Dialog</code> requires explicit <code>onOpenChange</code></li>
      </ul>
      <h2>v2.0.0 - 2024-02-15</h2>
      <h3>Features</h3>
      <ul>
        <li>Complete rewrite using StyleX for zero-runtime CSS</li>
        <li>New token system: <code>colorVars</code>, <code>spacingVars</code>, <code>typeScaleVars</code></li>
        <li>Tree-shakeable subpath exports</li>
      </ul>
    </article>
  );
}
