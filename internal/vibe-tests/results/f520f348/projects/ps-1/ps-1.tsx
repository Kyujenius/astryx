// Copyright (c) Meta Platforms, Inc. and affiliates.

const navItems = ['General', 'Account', 'Notifications', 'Security', 'Integrations'];

export default function SettingsDashboard() {
  return (
    <div style={{display: 'flex', minHeight: '100vh'}}>
      <aside style={{width: 240, borderRight: '1px solid #e5e7eb', padding: 20}}>
        <h2 style={{fontSize: 18, fontWeight: 600, marginBottom: 16}}>Settings</h2>
        <nav style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          {navItems.map((item, i) => (
            <a key={item} href="#" style={{padding: '8px 12px', borderRadius: 6, background: i === 0 ? '#f3f4f6' : 'transparent', textDecoration: 'none', color: '#374151', fontSize: 14}}>{item}</a>
          ))}
        </nav>
      </aside>
      <main style={{flex: 1, padding: 32}}>
        <h1 style={{fontSize: 28, fontWeight: 700, marginBottom: 24}}>General Settings</h1>
        <div style={{display: 'grid', gap: 16}}>
          <div style={{border: '1px solid #e5e7eb', borderRadius: 8, padding: 20}}>
            <h3 style={{fontSize: 16, fontWeight: 600, marginBottom: 8}}>Application</h3>
            <p style={{fontSize: 14, color: '#6b7280', margin: 0}}>Manage your application preferences.</p>
          </div>
          <div style={{border: '1px solid #e5e7eb', borderRadius: 8, padding: 20}}>
            <h3 style={{fontSize: 16, fontWeight: 600, marginBottom: 8}}>Appearance</h3>
            <p style={{fontSize: 14, color: '#6b7280', margin: 0}}>Customize colors and layout.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
