import {useState} from 'react';

const navLinks = [{label: 'Home', href: '/'}, {label: 'Products', href: '/products'}, {label: 'About', href: '/about'}, {label: 'Contact', href: '/contact'}];

export default function ResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', padding: '12px 24px'}} aria-label="Main navigation">
      <span style={{fontWeight: 700, fontSize: 18}}>MyApp</span>
      <button onClick={() => setIsOpen(!isOpen)} style={{border: 'none', background: 'none', cursor: 'pointer', padding: 8}} aria-label="Toggle menu">
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" /></svg>
      </button>
      {isOpen && (
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 12}} role="menu">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} style={{textDecoration: 'none', color: 'inherit', padding: '8px 12px', borderRadius: 4}}>{link.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}
