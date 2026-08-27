import {useState} from 'react';

const links = ['Home', 'Products', 'About', 'Contact'];

export default function ResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{fontFamily: 'system-ui'}}>
      <nav style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #e5e7eb'}}>
        <span style={{fontWeight: 700, fontSize: 18}}>MyApp</span>
        <div style={{display: 'flex', gap: 16}}>
          {links.map(link => (
            <a key={link} href={`/${link.toLowerCase()}`} style={{textDecoration: 'none', color: '#333', fontSize: 14}}>{link}</a>
          ))}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{display: 'none', padding: 8, border: 'none', background: 'none', cursor: 'pointer'}}
          className="mobile-menu-btn"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        </button>
      </nav>
      {isOpen && (
        <div style={{position: 'fixed', top: 0, left: 0, bottom: 0, width: 280, background: '#fff', borderRight: '1px solid #e5e7eb', padding: 16, zIndex: 100}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 24}}>
            <span style={{fontWeight: 700}}>MyApp</span>
            <button onClick={() => setIsOpen(false)} style={{border: 'none', background: 'none', cursor: 'pointer', fontSize: 18}}>x</button>
          </div>
          {links.map(link => (
            <a key={link} href={`/${link.toLowerCase()}`} style={{display: 'block', padding: '8px 0', textDecoration: 'none', color: '#333'}}>{link}</a>
          ))}
        </div>
      )}
    </div>
  );
}
