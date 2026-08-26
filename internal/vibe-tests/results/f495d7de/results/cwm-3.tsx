import {useState} from 'react';

const icons = ['📄','🎯','🚀','💡','📊','🎨','🔧','📝'];
const covers = ['https://picsum.photos/800/200?1','https://picsum.photos/800/200?2','https://picsum.photos/800/200?3'];

export default function NotionHeader() {
  const [icon, setIcon] = useState('📄');
  const [cover, setCover] = useState(covers[0]);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div style={{border:'1px solid #e0e0e0',borderRadius:8,overflow:'hidden'}}>
      <img src={cover} alt="Cover" style={{width:'100%',height:180,objectFit:'cover'}} />
      <div style={{padding:24}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <button onClick={()=>setShowPicker(!showPicker)} style={{fontSize:36,border:'none',background:'none',cursor:'pointer'}} aria-label="Pick icon">{icon}</button>
          <h1 style={{margin:0}}>Untitled</h1>
        </div>
        {showPicker && (
          <div style={{display:'flex',gap:4,flexWrap:'wrap',marginTop:8}}>
            {icons.map(ic=><button key={ic} onClick={()=>{setIcon(ic);setShowPicker(false);}} style={{fontSize:20,border:'1px solid #ddd',borderRadius:4,padding:'4px 8px',background:'#fff',cursor:'pointer'}}>{ic}</button>)}
          </div>
        )}
        <div style={{display:'flex',gap:4,marginTop:12}}>
          {covers.map((url,i)=><button key={i} onClick={()=>setCover(url)} style={{padding:'4px 12px',borderRadius:4,border:'1px solid #ccc',background:cover===url?'#0066cc':'#fff',color:cover===url?'#fff':'#333',cursor:'pointer'}}>Cover {i+1}</button>)}
        </div>
      </div>
    </div>
  );
}
