import {useState} from 'react';

const navItems = ['Home', 'Products', 'About', 'Contact'];

export default function ResponsiveNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{borderBottom: '1px solid #e2e8f0', fontFamily: 'system-ui'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px'}}>
        <span style={{fontWeight: 700, fontSize: '18px'}}>Brand</span>
        <div style={{display: 'flex', gap: '4px'}} className="desktop-nav">
          {navItems.map(item => (
            <button key={item} style={{padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px', fontSize: '14px'}}>{item}</button>
          ))}
        </div>
        <button onClick={() => setOpen(!open)} style={{display: 'none', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer'}} className="mobile-menu-btn" aria-label="Open menu">
          &#9776;
        </button>
      </div>
      {open && (
        <div style={{display: 'flex', flexDirection: 'column', gap: '4px', padding: '8px 24px 16px'}} className="mobile-nav">
          {navItems.map(item => (
            <button key={item} style={{padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', borderRadius: '4px', fontSize: '14px'}}>{item}</button>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
