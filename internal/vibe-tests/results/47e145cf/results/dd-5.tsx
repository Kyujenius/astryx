import {useState} from 'react';
const emails = [{id: '1', sender: 'Alice', subject: 'Q4 Planning', date: '2024-03-15', preview: 'Hi team...'}, {id: '2', sender: 'Bob', subject: 'Deploy v2.1', date: '2024-03-14', preview: 'Deployment...'}, {id: '3', sender: 'Carol', subject: 'Design Review', date: '2024-03-13', preview: 'Review...'}];

export default function EmailInbox() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const toggle = (id: string) => setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div style={{fontFamily: 'system-ui'}}>
      {selected.size > 0 && <div style={{padding: 8, backgroundColor: '#f0f0f0', borderRadius: 4, marginBottom: 8, display: 'flex', gap: 8}}><span>{selected.size} selected</span><button>Archive</button><button style={{color: 'red'}}>Delete</button></div>}
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead><tr style={{borderBottom: '2px solid #eee'}}><th></th><th style={{textAlign: 'left', padding: 8}}>Sender</th><th style={{textAlign: 'left', padding: 8}}>Subject</th><th style={{padding: 8}}>Date</th><th style={{textAlign: 'left', padding: 8}}>Preview</th></tr></thead>
        <tbody>{emails.map(e => <tr key={e.id} style={{borderBottom: '1px solid #eee'}}><td style={{padding: 8}}><input type="checkbox" checked={selected.has(e.id)} onChange={() => toggle(e.id)} /></td><td style={{padding: 8}}>{e.sender}</td><td style={{padding: 8}}>{e.subject}</td><td style={{padding: 8}}>{e.date}</td><td style={{padding: 8, color: '#666'}}>{e.preview}</td></tr>)}</tbody>
      </table>
    </div>
  );
}