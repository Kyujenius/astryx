export default function SettingsDashboard() {
  const navItems = [
    {section: 'Account', items: ['Profile', 'Security', 'Notifications']},
    {section: 'Preferences', items: ['Appearance', 'Language', 'Accessibility']},
  ];

  return (
    <div style={{fontFamily: 'system-ui', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <header style={{padding: '12px 16px', borderBottom: '1px solid #e5e7eb'}}>
        <h1 style={{margin: 0, fontSize: 18, fontWeight: 700}}>Settings Dashboard</h1>
      </header>
      <div style={{display: 'flex', flex: 1}}>
        <aside style={{width: 220, borderRight: '1px solid #e5e7eb', padding: 16}}>
          {navItems.map(group => (
            <div key={group.section} style={{marginBottom: 16}}>
              <h3 style={{fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: '#6b7280', marginBottom: 8}}>{group.section}</h3>
              {group.items.map(item => (
                <a key={item} href="#" style={{display: 'block', padding: '6px 8px', borderRadius: 4, textDecoration: 'none', color: '#333', fontSize: 14}}>{item}</a>
              ))}
            </div>
          ))}
        </aside>
        <main style={{flex: 1, padding: 24}}>
          <h2 style={{fontSize: 20, fontWeight: 700, marginBottom: 16}}>Profile Settings</h2>
          <div style={{border: '1px solid #e5e7eb', borderRadius: 8, padding: 16}}>
            <p style={{fontWeight: 500, marginBottom: 4}}>Display Name</p>
            <p style={{color: '#6b7280', fontSize: 14}}>Configure how your name appears across the app.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
