import {useState} from 'react';

const links = ['Home','About','Services','Contact'];

export default function ResponsiveNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{padding:'12px 24px',borderBottom:'1px solid #e0e0e0'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontWeight:'bold',fontSize:18}}>Logo</span>
        <div style={{display:'flex',gap:8}} className="desktop-links">
          {links.map(l=><button key={l} style={{background:'none',border:'none',padding:'6px 12px',cursor:'pointer'}}>{l}</button>)}
        </div>
        <button onClick={()=>setOpen(!open)} style={{display:'none',background:'none',border:'none',fontSize:20,cursor:'pointer'}} className="hamburger" aria-label="Menu">☰</button>
      </div>
      {open && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:100}} onClick={()=>setOpen(false)}>
          <div style={{width:260,height:'100%',background:'#fff',padding:24}} onClick={e=>e.stopPropagation()}>
            <button onClick={()=>setOpen(false)} style={{float:'right',border:'none',background:'none',fontSize:18,cursor:'pointer'}}>✕</button>
            <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:40}}>
              {links.map(l=><button key={l} onClick={()=>setOpen(false)} style={{textAlign:'left',background:'none',border:'none',padding:'8px 0',fontSize:16,cursor:'pointer'}}>{l}</button>)}
            </div>
          </div>
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .desktop-links { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
