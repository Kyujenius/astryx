import {useState, useEffect} from 'react';

const NAV_ITEMS = ['Home', 'Projects', 'Tasks', 'Messages', 'Settings'];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export default function ResponsiveSidebar() {
  const [selected, setSelected] = useState('Home');
  const [sheetOpen, setSheetOpen] = useState(false);
  const isMobile = useIsMobile();

  const navList = (
    <nav style={{display: 'flex', flexDirection: 'column', gap: 4}}>
      {NAV_ITEMS.map(item => (
        <button key={item} onClick={() => { setSelected(item); setSheetOpen(false); }} style={{padding: '8px 12px', textAlign: 'left', border: 'none', borderRadius: 6, background: selected === item ? '#e6f0ff' : 'transparent', fontWeight: selected === item ? 600 : 400, cursor: 'pointer'}}>
          {item}
        </button>
      ))}
    </nav>
  );

  if (isMobile) {
    return (
      <>
        <button onClick={() => setSheetOpen(true)} style={{padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, background: '#fff', cursor: 'pointer'}}>Menu</button>
        {sheetOpen && (
          <>
            <div onClick={() => setSheetOpen(false)} style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 99}} />
            <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16, zIndex: 100, maxHeight: '60vh', overflowY: 'auto'}}>
              <div style={{width: 40, height: 4, background: '#ccc', borderRadius: 2, margin: '0 auto 12px'}} />
              {navList}
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <aside style={{width: 240, borderRight: '1px solid #e0e0e0', height: '100vh', padding: 12}}>
      {navList}
    </aside>
  );
}
