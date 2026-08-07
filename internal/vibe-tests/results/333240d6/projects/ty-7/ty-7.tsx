export default function Changelog() {
  return (
    <div style={{maxWidth: 680, margin: '0 auto', padding: 32, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'}}>
      <h1 style={{fontSize: 32, fontWeight: 700, marginBottom: 32}}>Changelog</h1>
      <h2 style={{fontSize: 24, fontWeight: 600, borderBottom: '1px solid #e5e7eb', paddingBottom: 8, marginTop: 32}}>v2.1.0 - 2024-03-15</h2>
      <h3 style={{fontSize: 18, fontWeight: 600, marginTop: 20}}>Features</h3>
      <ul style={{lineHeight: 1.8, fontSize: 15}}>
        <li>Dark mode with <code style={{background: '#f3f4f6', padding: '2px 6px', borderRadius: 4, fontSize: 13}}>prefers-color-scheme</code> detection</li>
        <li>New <code style={{background: '#f3f4f6', padding: '2px 6px', borderRadius: 4, fontSize: 13}}>Grid</code> component</li>
        <li><code style={{background: '#f3f4f6', padding: '2px 6px', borderRadius: 4, fontSize: 13}}>Button</code> supports <code style={{background: '#f3f4f6', padding: '2px 6px', borderRadius: 4, fontSize: 13}}>isLoading</code></li>
      </ul>
      <h3 style={{fontSize: 18, fontWeight: 600, marginTop: 20}}>Bug Fixes</h3>
      <ul style={{lineHeight: 1.8, fontSize: 15}}>
        <li>Focus trap release on dialog close</li>
        <li>Tooltip hydration mismatch</li>
        <li>TextInput clear resets validation</li>
      </ul>
      <h2 style={{fontSize: 24, fontWeight: 600, borderBottom: '1px solid #e5e7eb', paddingBottom: 8, marginTop: 32}}>v2.0.0 - 2024-02-15</h2>
      <h3 style={{fontSize: 18, fontWeight: 600, marginTop: 20}}>Features</h3>
      <ul style={{lineHeight: 1.8, fontSize: 15}}>
        <li>Complete rewrite with StyleX</li>
        <li>Token system: <code style={{background: '#f3f4f6', padding: '2px 6px', borderRadius: 4, fontSize: 13}}>colorVars</code>, <code style={{background: '#f3f4f6', padding: '2px 6px', borderRadius: 4, fontSize: 13}}>spacingVars</code></li>
        <li>Tree-shakeable subpath exports</li>
      </ul>
    </div>
  );
}
