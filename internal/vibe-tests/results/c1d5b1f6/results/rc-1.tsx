import {useState} from 'react';

const navItems = [{label: 'Home', href: '/'}, {label: 'Products', href: '/products'}, {label: 'About', href: '/about'}, {label: 'Contact', href: '/contact'}];

export default function ResponsiveNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', borderBottom: '1px solid #e0e0e0'}}>
        <span style={{fontWeight: 'bold', fontSize: 18}}>MyApp</span>
        <div style={{display: 'flex', gap: 16}} className="desktop-nav">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} style={{textDecoration: 'none', color: '#333'}}>{item.label}</a>
          ))}
        </div>
        <button onClick={() => setMobileOpen(true)} style={{display: 'none', background: 'none', border: 'none', fontSize: 24, cursor: 'pointer'}} className="mobile-toggle" aria-label="Open menu">
          \u2630
        </button>
      </nav>
      {mobileOpen && (
        <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100}} onClick={() => setMobileOpen(false)}>
          <div style={{position: 'fixed', top: 0, left: 0, bottom: 0, width: 280, backgroundColor: '#fff', padding: 24, display: 'flex', flexDirection: 'column', gap: 16}} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setMobileOpen(false)} style={{alignSelf: 'flex-end', background: 'none', border: 'none', fontSize: 20, cursor: 'pointer'}} aria-label="Close menu">\u2715</button>
            {navItems.map((item) => (
              <a key={item.label} href={item.href} style={{textDecoration: 'none', color: '#333', fontSize: 18}}>{item.label}</a>
            ))}
          </div>
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </>
  );
}
