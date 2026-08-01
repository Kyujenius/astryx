import {useState} from 'react';

const links = [
  {label: 'Home', href: '/'},
  {label: 'Products', href: '/products'},
  {label: 'About', href: '/about'},
  {label: 'Contact', href: '/contact'},
];

export default function ResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{borderBottom: '1px solid #e5e5e5', fontFamily: 'system-ui, sans-serif'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: 56}}>
        <span style={{fontSize: 18, fontWeight: 600}}>Acme App</span>
        <div style={{display: 'flex', gap: 24}}>
          {links.map((link) => (
            <a key={link.href} href={link.href} style={{fontSize: 14, fontWeight: 500, color: '#333', textDecoration: 'none'}}>
              {link.label}
            </a>
          ))}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          style={{display: 'none', background: 'none', border: 'none', fontSize: 24, cursor: 'pointer'}}
        >
          ☰
        </button>
      </div>
      {isOpen && (
        <div style={{display: 'flex', flexDirection: 'column', padding: 16, gap: 12, borderTop: '1px solid #e5e5e5'}}>
          {links.map((link) => (
            <a key={link.href} href={link.href} style={{fontSize: 16, fontWeight: 500, color: '#333', textDecoration: 'none'}}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
