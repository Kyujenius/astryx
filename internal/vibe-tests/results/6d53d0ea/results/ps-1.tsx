import {useState} from 'react';

const navItems = ['General', 'Account', 'Notifications', 'Privacy'];

export default function SettingsDashboard() {
  const [page, setPage] = useState('General');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'system-ui, sans-serif'}}>
      <header style={{borderBottom: '1px solid #e5e5e5', padding: '16px 24px'}}>
        <h1 style={{fontSize: 24, fontWeight: 700, margin: 0}}>Settings</h1>
      </header>
      <div style={{display: 'flex', flex: 1}}>
        <nav style={{width: 200, borderRight: '1px solid #e5e5e5', padding: 16}}>
          <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
            {navItems.map((item) => (
              <li key={item} style={{marginBottom: 4}}>
                <button
                  onClick={() => setPage(item)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: 6,
                    background: page === item ? '#f3f4f6' : 'transparent',
                    fontWeight: page === item ? 600 : 400,
                    cursor: 'pointer',
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <main style={{flex: 1, padding: 24}}>
          <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>{page}</h2>
          <div style={{border: '1px solid #e5e5e5', borderRadius: 8, padding: 24}}>
            <label style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16}}>
              <span>Dark Mode</span>
              <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
            </label>
            <label style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <span>Notifications</span>
              <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
            </label>
          </div>
        </main>
      </div>
    </div>
  );
}
