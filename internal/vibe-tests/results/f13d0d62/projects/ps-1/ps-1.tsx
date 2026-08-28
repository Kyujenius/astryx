import {useState} from 'react';

type Page = 'general' | 'notifications' | 'security' | 'appearance';

export default function SettingsDashboard() {
  const [page, setPage] = useState<Page>('general');

  const navItems: {key: Page; label: string}[] = [
    {key: 'general', label: 'General'},
    {key: 'notifications', label: 'Notifications'},
    {key: 'security', label: 'Security'},
    {key: 'appearance', label: 'Appearance'},
  ];

  const inputStyle: React.CSSProperties = {width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, boxSizing: 'border-box'};

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'system-ui'}}>
      <header style={{padding: '16px 24px', borderBottom: '1px solid #e5e5e5'}}>
        <h1 style={{margin: 0, fontSize: 24, fontWeight: 700}}>Acme App</h1>
      </header>
      <div style={{display: 'flex', flex: 1}}>
        <nav style={{width: 200, borderRight: '1px solid #e5e5e5', padding: 16}} aria-label="Settings navigation">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              style={{display: 'block', width: '100%', padding: '8px 12px', marginBottom: 4, border: 'none', borderRadius: 6, cursor: 'pointer', textAlign: 'left', fontWeight: page === item.key ? 600 : 400, background: page === item.key ? '#f3f4f6' : 'transparent'}}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <main style={{flex: 1, padding: 24}}>
          {page === 'general' && (
            <div>
              <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>General Settings</h2>
              <div style={{border: '1px solid #e5e5e5', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12}}>
                <label>Display Name<input style={inputStyle} defaultValue="Jane Doe" /></label>
                <label>Email<input style={inputStyle} defaultValue="jane@acme.com" /></label>
                <label>Company<input style={inputStyle} defaultValue="Acme Inc." /></label>
              </div>
            </div>
          )}
          {page === 'notifications' && (
            <div>
              <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>Notifications</h2>
              <div style={{border: '1px solid #e5e5e5', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 16}}>
                <label style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>Email notifications<input type="checkbox" defaultChecked /></label>
                <hr style={{border: 'none', borderTop: '1px solid #eee'}} />
                <label style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>Push notifications<input type="checkbox" defaultChecked /></label>
                <hr style={{border: 'none', borderTop: '1px solid #eee'}} />
                <label style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>Weekly digest<input type="checkbox" /></label>
              </div>
            </div>
          )}
          {page === 'security' && (
            <div>
              <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>Security</h2>
              <div style={{border: '1px solid #e5e5e5', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12}}>
                <label>Current Password<input style={inputStyle} type="password" /></label>
                <label>New Password<input style={inputStyle} type="password" /></label>
                <label>Confirm Password<input style={inputStyle} type="password" /></label>
              </div>
            </div>
          )}
          {page === 'appearance' && (
            <div>
              <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>Appearance</h2>
              <div style={{border: '1px solid #e5e5e5', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 16}}>
                <p style={{color: '#666', margin: 0}}>Theme settings for your account.</p>
                <label style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>Dark mode<input type="checkbox" /></label>
                <label style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>Reduce motion<input type="checkbox" /></label>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
