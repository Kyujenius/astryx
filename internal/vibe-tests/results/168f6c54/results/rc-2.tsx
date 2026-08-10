// Copyright (c) Meta Platforms, Inc. and affiliates.

const navItems = ['Dashboard', 'Projects', 'Analytics', 'Settings', 'Help'];

const styles = {
  container: {display: 'flex', minHeight: '100vh'} as const,
  sidebar: {width: 280, borderRight: '1px solid #e5e7eb', padding: 16} as const,
  main: {flex: 1, padding: 24} as const,
};

export default function ResponsiveSidebar() {
  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h5 style={{margin: '0 0 12px', fontSize: 14, fontWeight: 600}}>Navigation</h5>
        <hr style={{border: 'none', borderTop: '1px solid #e5e7eb', margin: '0 0 12px'}} />
        <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          {navItems.map(item => (
            <button key={item} style={{padding: '8px 12px', border: 'none', background: 'transparent', textAlign: 'left', borderRadius: 6, cursor: 'pointer', fontSize: 14}}>
              {item}
            </button>
          ))}
        </div>
      </aside>
      <main style={styles.main}>
        <h2 style={{margin: '0 0 12px', fontSize: 24, fontWeight: 700}}>Main Content</h2>
        <p style={{color: '#6b7280'}}>This sidebar becomes a bottom sheet on mobile viewports.</p>
      </main>
    </div>
  );
}
