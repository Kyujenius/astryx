import {useState} from 'react';

const navItems = ['Home', 'Products', 'About', 'Contact'];

export default function ResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{borderBottom: '1px solid #ddd'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px'}}>
        <span style={{fontSize: 18, fontWeight: 'bold'}}>MyBrand</span>
        <div style={{display: 'flex', gap: 16}}>
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{padding: '8px 12px', textDecoration: 'none', color: '#333'}}>{item}</a>
          ))}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} style={{display: 'none', background: 'none', border: 'none', fontSize: 20, cursor: 'pointer'}} aria-label={isOpen ? 'Close menu' : 'Open menu'}>{isOpen ? '\u2715' : '\u2630'}</button>
      </div>
      {isOpen && (
        <div style={{display: 'flex', flexDirection: 'column', gap: 4, padding: '8px 24px 16px'}}>
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{padding: '8px 12px', textDecoration: 'none', color: '#333'}}>{item}</a>
          ))}
        </div>
      )}
    </nav>
  );
}
