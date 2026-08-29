import {useState} from 'react';
const links = [{label:'Home',href:'/'},{label:'Products',href:'/products'},{label:'About',href:'/about'},{label:'Contact',href:'/contact'}];
export default function ResponsiveNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{borderBottom:'1px solid #e5e7eb',fontFamily:'system-ui'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 16px',height:56}}>
        <a href="/" style={{fontSize:18,fontWeight:700,textDecoration:'none',color:'#111'}}>MyApp</a>
        <div style={{display:'flex',gap:24}}>{links.map(l=><a key={l.href} href={l.href} className="nav-link" style={{fontSize:14,textDecoration:'none',color:'#555'}}>{l.label}</a>)}</div>
        <button onClick={()=>setOpen(!open)} aria-label="Open navigation" style={{display:'none',background:'none',border:'none',fontSize:24,cursor:'pointer'}}>&#9776;</button>
      </div>
      {open&&(<div style={{padding:16,borderTop:'1px solid #e5e7eb'}}>
        {links.map(l=><a key={l.href} href={l.href} style={{display:'block',padding:'8px 0',fontSize:16,textDecoration:'none',color:'#333'}} onClick={()=>setOpen(false)}>{l.label}</a>)}
      </div>)}
      <style>{`@media(max-width:768px){.nav-link{display:none!important}button[aria-label="Open navigation"]{display:block!important}}`}</style>
    </nav>
  );
}
