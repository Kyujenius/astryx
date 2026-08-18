const navItems = ['General', 'Security', 'Notifications', 'Billing', 'API Keys'];

export default function SettingsDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ padding: '12px 24px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 'bold', margin: 0 }}>Settings</h1>
      </header>
      <div style={{ display: 'flex', flex: 1 }}>
        <aside style={{ width: 220, borderRight: '1px solid #eee', padding: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: '#666', marginBottom: 8 }}>Navigation</p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navItems.map((item) => (
              <button key={item} style={{ padding: '8px 12px', textAlign: 'left', border: 'none', borderRadius: 4, background: 'transparent', cursor: 'pointer', fontSize: 14 }}>{item}</button>
            ))}
          </nav>
        </aside>
        <main style={{ flex: 1, padding: 24 }}>
          <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>General Settings</h2>
          <p style={{ color: '#666', marginBottom: 24 }}>Manage your account settings and preferences.</p>
          {[
            { label: 'Display name', desc: 'Your public display name' },
            { label: 'Email', desc: 'user@example.com' },
            { label: 'Language', desc: 'English (US)' },
          ].map((setting) => (
            <div key={setting.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
              <div>
                <p style={{ fontWeight: 500, margin: 0 }}>{setting.label}</p>
                <p style={{ fontSize: 13, color: '#666', margin: '2px 0 0' }}>{setting.desc}</p>
              </div>
              <button style={{ padding: '4px 12px', border: '1px solid #ddd', borderRadius: 4, background: 'white', cursor: 'pointer' }}>Edit</button>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
