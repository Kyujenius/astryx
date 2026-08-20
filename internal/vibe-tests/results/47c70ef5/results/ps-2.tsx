export default function RootLayout() {
  const navItems = ['Dashboard', 'Users', 'Reports', 'Settings'];

  return (
    <div style={{height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'}}>
      <header style={{height: 56, borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', padding: '0 16px'}}>
        <h1 style={{margin: 0, fontSize: 18, fontWeight: 600}}>Internal Tool</h1>
      </header>
      <div style={{display: 'flex', flex: 1, overflow: 'hidden'}}>
        <aside style={{width: 240, borderRight: '1px solid #e0e0e0', padding: 12, display: 'flex', flexDirection: 'column', gap: 2}}>
          {navItems.map((item, i) => (
            <button key={item} style={{padding: '8px 12px', textAlign: 'left', border: 'none', borderRadius: 6, background: i === 0 ? '#e6f0ff' : 'transparent', fontWeight: i === 0 ? 600 : 400, cursor: 'pointer'}}>
              {item}
            </button>
          ))}
        </aside>
        <main style={{flex: 1, padding: 24, overflow: 'auto'}}>
          <h2 style={{margin: '0 0 8px', fontSize: 24}}>Dashboard</h2>
          <p style={{color: '#666'}}>Welcome to the internal tool.</p>
        </main>
      </div>
    </div>
  );
}
