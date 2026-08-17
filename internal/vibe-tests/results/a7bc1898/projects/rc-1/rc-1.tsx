import {useState} from 'react';

const navItems = [{label: 'Home', href: '/'}, {label: 'Products', href: '/products'}, {label: 'About', href: '/about'}, {label: 'Contact', href: '/contact'}];

export default function ResponsiveNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{borderBottom: '1px solid #e5e5e5'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: 56}}>
        <span style={{fontSize: 18, fontWeight: 700}}>MyApp</span>
        <div style={{display: 'flex', gap: 24}}>
          {navItems.map(item => (
            <a key={item.label} href={item.href} style={{fontSize: 14, fontWeight: 500, color: '#333', textDecoration: 'none'}}>
              {item.label}
            </a>
          ))}
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          style={{display: 'none', background: 'none', border: 'none', cursor: 'pointer', fontSize: 24}}
        >
          {menuOpen ? '\u2715' : '\u2630'}
        </button>
      </div>
      {menuOpen && (
        <div style={{padding: 16, display: 'flex', flexDirection: 'column', gap: 12, borderTop: '1px solid #e5e5e5'}}>
          {navItems.map(item => (
            <a key={item.label} href={item.href} style={{fontSize: 16, fontWeight: 500, color: '#333', textDecoration: 'none'}}>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
