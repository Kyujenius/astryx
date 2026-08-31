import {useState} from 'react';

const navLinks = ['Home', 'About', 'Products', 'Contact'];

export default function ResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{fontFamily: 'system-ui', borderBottom: '1px solid #e5e7eb'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16}}>
        <span style={{fontSize: 18, fontWeight: 700}}>Logo</span>
        <div style={{display: 'flex', gap: 8}} className="desktop-nav">
          {navLinks.map((link) => (
            <button key={link} style={{padding: '8px 16px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', borderRadius: 4}}>{link}</button>
          ))}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} style={{display: 'none', padding: 8, border: 'none', backgroundColor: 'transparent', cursor: 'pointer'}} className="mobile-toggle" aria-label="Toggle menu">
          ☰
        </button>
      </div>
      {isOpen && (
        <div style={{display: 'flex', flexDirection: 'column', padding: '0 16px 16px'}}>
          {navLinks.map((link) => (
            <button key={link} style={{padding: '12px 16px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', textAlign: 'left', borderRadius: 4}}>{link}</button>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
