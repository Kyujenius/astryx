import {useState} from 'react';

export default function AdminPanel({children}: {children?: React.ReactNode}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');
  const navItems = [{group: 'Main', items: ['Dashboard', 'Users', 'Content']}, {group: 'Settings', items: ['General', 'Security']}];

  return (
    <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
      <header style={{display: 'flex', alignItems: 'center', padding: '12px 24px', borderBottom: '1px solid #e0e0e0', gap: 12}}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{cursor: 'pointer'}}>Menu</button>
        <h1 style={{fontSize: 20, fontWeight: 700}}>Admin Panel</h1>
      </header>
      <div style={{display: 'flex', flex: 1, overflow: 'hidden'}}>
        {sidebarOpen && (
          <nav style={{width: 240, borderRight: '1px solid #e0e0e0', padding: 16, overflowY: 'auto'}}>
            {navItems.map((section) => (
              <div key={section.group} style={{marginBottom: 16}}>
                <p style={{fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 8}}>{section.group}</p>
                {section.items.map((item) => (
                  <button key={item} onClick={() => setActivePage(item.toLowerCase())}
                    style={{display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', border: 'none', borderRadius: 4, cursor: 'pointer',
                      backgroundColor: activePage === item.toLowerCase() ? '#f0f0f0' : 'transparent', fontWeight: activePage === item.toLowerCase() ? 600 : 400}}>
                    {item}
                  </button>
                ))}
              </div>
            ))}
          </nav>
        )}
        <main style={{flex: 1, padding: 24, overflowY: 'auto'}}>{children ?? <p>Select a page.</p>}</main>
      </div>
    </div>
  );
}
