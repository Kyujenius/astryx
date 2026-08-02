import React, {useState} from 'react';

export default function ResponsiveNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ['Home', 'Products', 'About', 'Contact'];

  return (
    <nav style={{borderBottom: '1px solid #e5e7eb'}}>
      <div style={{maxWidth: '1024px', margin: '0 auto', padding: '0 16px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <span style={{fontWeight: 'bold', fontSize: '18px'}}>MyApp</span>

        <div style={{display: 'flex', gap: '8px'}}>
          {navItems.map((item) => (
            <a key={item} href="#" style={{padding: '8px 12px', textDecoration: 'none', color: '#374151'}}>{item}</a>
          ))}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} style={{display: 'none', padding: '8px', border: 'none', background: 'none', cursor: 'pointer'}} aria-label="Menu">
          <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div style={{padding: '16px', borderTop: '1px solid #e5e7eb'}}>
          {navItems.map((item) => (
            <a key={item} href="#" style={{display: 'block', padding: '12px', textDecoration: 'none', color: '#374151'}}>{item}</a>
          ))}
        </div>
      )}
    </nav>
  );
}
