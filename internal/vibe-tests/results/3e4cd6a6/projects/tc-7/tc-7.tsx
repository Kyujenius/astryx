export default function DualThemeLayout() {
  return (
    <div style={{display: 'flex', height: '100vh'}}>
      <aside style={{width: 260, background: '#1a1a2e', color: '#fff', padding: 16, display: 'flex', flexDirection: 'column', gap: 16}}>
        <h4 style={{margin: 0}}>Navigation</h4>
        <nav style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <a href="#" style={{padding: '8px 12px', borderRadius: 6, color: '#fff', textDecoration: 'none'}}>Dashboard</a>
          <a href="#" style={{padding: '8px 12px', borderRadius: 6, color: '#fff', textDecoration: 'none'}}>Projects</a>
          <a href="#" style={{padding: '8px 12px', borderRadius: 6, color: '#fff', textDecoration: 'none'}}>Settings</a>
          <a href="#" style={{padding: '8px 12px', borderRadius: 6, color: '#fff', textDecoration: 'none'}}>Help</a>
        </nav>
      </aside>
      <main style={{flex: 1, padding: 32, background: '#fff'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <h1 style={{margin: 0}}>Dashboard</h1>
          <p>This content area uses a light theme while the sidebar uses a dark theme.</p>
          <p style={{color: '#666'}}>Each section can have its own theme without affecting the rest.</p>
        </div>
      </main>
    </div>
  );
}
