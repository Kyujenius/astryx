const colors: Record<string,{bg:string,fg:string}> = {Article:{bg:'#dbeafe',fg:'#1d4ed8'},Video:{bg:'#ede9fe',fg:'#7c3aed'},Podcast:{bg:'#ccfbf1',fg:'#0d9488'},Newsletter:{bg:'#ffedd5',fg:'#c2410c'},Course:{bg:'#dcfce7',fg:'#16a34a'}};
const items = [{t:'Getting Started with React',ty:'Article',a:'Jane Doe',d:'2024-01-15'},{t:'Advanced TypeScript',ty:'Video',a:'John Smith',d:'2024-02-01'},{t:'Design Systems Deep Dive',ty:'Podcast',a:'Alice Wang',d:'2024-02-10'},{t:'Weekly Frontend Digest',ty:'Newsletter',a:'Bob Lee',d:'2024-03-01'},{t:'Full-Stack Bootcamp',ty:'Course',a:'Carol Davis',d:'2024-03-15'},{t:'CSS Grid Mastery',ty:'Article',a:'Dan Brown',d:'2024-04-01'},{t:'Node.js Performance',ty:'Video',a:'Eve Garcia',d:'2024-04-10'}];
export default function ContentLibrary() {
  return (
    <div style={{fontFamily:'system-ui'}}>
      <h2 style={{fontSize:24,fontWeight:700,marginBottom:16}}>Content Library</h2>
      <table style={{width:'100%',borderCollapse:'collapse'}}>
        <thead><tr>{['Title','Type','Author','Date'].map(h=><th key={h} style={{textAlign:'left',padding:'8px 12px',borderBottom:'2px solid #e5e7eb',fontSize:14,fontWeight:600}}>{h}</th>)}</tr></thead>
        <tbody>{items.map(i=>{const c=colors[i.ty]||{bg:'#f3f4f6',fg:'#374151'};return(
          <tr key={i.t}><td style={{padding:'8px 12px',borderBottom:'1px solid #f3f4f6'}}>{i.t}</td><td style={{padding:'8px 12px',borderBottom:'1px solid #f3f4f6'}}><span style={{background:c.bg,color:c.fg,padding:'2px 10px',borderRadius:12,fontSize:12,fontWeight:500}}>{i.ty}</span></td><td style={{padding:'8px 12px',borderBottom:'1px solid #f3f4f6'}}>{i.a}</td><td style={{padding:'8px 12px',borderBottom:'1px solid #f3f4f6'}}>{i.d}</td></tr>
        )})}</tbody>
      </table>
    </div>
  );
}
