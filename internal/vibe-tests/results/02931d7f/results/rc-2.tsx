import {useState} from 'react';

const navItems = [
  {id: 'dashboard', label: 'Dashboard'},
  {id: 'projects', label: 'Projects'},
  {id: 'tasks', label: 'Tasks'},
  {id: 'settings', label: 'Settings'},
];

export default function ResponsiveSidebar() {
  const [active, setActive] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div style={{display: 'flex', height: '100vh'}}>
      {/* Desktop sidebar */}
      <aside style={{width: '240px', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'none'}} className="desktop-sidebar">
        <h2 style={{fontSize: '18px', fontWeight: 700, marginBottom: '16px'}}>My App</h2>
        <nav>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              style={{display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: '6px', border: 'none', backgroundColor: active === item.id ? '#eff6ff' : 'transparent', color: active === item.id ? '#1d4ed8' : '#374151', fontWeight: active === item.id ? 500 : 400, cursor: 'pointer', marginBottom: '2px'}}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile bottom sheet */}
      {isMobileOpen && (
        <div style={{position: 'fixed', inset: 0, zIndex: 50}}>
          <div onClick={() => setIsMobileOpen(false)} style={{position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)'}} />
          <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', padding: '16px', maxHeight: '60vh'}}>
            <div style={{width: '40px', height: '4px', backgroundColor: '#d1d5db', borderRadius: '4px', margin: '0 auto 16px'}} />
            <nav>
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActive(item.id); setIsMobileOpen(false); }}
                  style={{display: 'block', width: '100%', textAlign: 'left', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: active === item.id ? '#eff6ff' : 'transparent', fontWeight: active === item.id ? 500 : 400, cursor: 'pointer'}}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <main style={{flex: 1, padding: '32px'}}>
        <button
          onClick={() => setIsMobileOpen(true)}
          style={{marginBottom: '16px', padding: '8px 16px', borderRadius: '6px', border: '1px solid #d1d5db', backgroundColor: 'white', cursor: 'pointer'}}
        >
          Menu
        </button>
        <h1 style={{fontSize: '24px', fontWeight: 700, marginBottom: '8px'}}>
          {navItems.find(i => i.id === active)?.label}
        </h1>
        <p style={{color: '#6b7280'}}>Content for the {active} section goes here.</p>
      </main>
    </div>
  );
}
