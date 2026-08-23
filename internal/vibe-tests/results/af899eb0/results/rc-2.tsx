import {useState, useEffect} from 'react';

const NAV_ITEMS = ['Dashboard', 'Projects', 'Tasks', 'Messages', 'Settings'];

export default function ResponsiveSidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [active, setActive] = useState('Dashboard');

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const nav = NAV_ITEMS.map((item) => (
    <button key={item} onClick={() => {setActive(item); setSheetOpen(false);}} style={{display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', border: 'none', borderRadius: 6, cursor: 'pointer', backgroundColor: item === active ? '#f0f0f0' : 'transparent', fontWeight: item === active ? 'bold' : 'normal'}}>{item}</button>
  ));

  if (isMobile) {
    return (
      <div style={{padding: 16}}>
        <h1 style={{fontSize: 24, fontWeight: 'bold'}}>{active}</h1>
        <p>Content for {active}.</p>
        <button onClick={() => setSheetOpen(true)} style={{position: 'fixed', bottom: 16, right: 16, padding: '12px 24px', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer'}}>Menu</button>
        {sheetOpen && (
          <>
            <div onClick={() => setSheetOpen(false)} style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)'}} />
            <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderRadius: '16px 16px 0 0', padding: 24, boxShadow: '0 -4px 16px rgba(0,0,0,0.1)'}}>{nav}</div>
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{display: 'flex', minHeight: '100vh'}}>
      <nav style={{width: 240, borderRight: '1px solid #e0e0e0', padding: 16}}>{nav}</nav>
      <main style={{flex: 1, padding: 24}}><h1 style={{fontSize: 24, fontWeight: 'bold'}}>{active}</h1><p>Content for {active}.</p></main>
    </div>
  );
}
