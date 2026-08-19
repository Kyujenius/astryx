import {useState} from 'react';

const members = [
  {name: 'Alice Chen', role: 'Engineering Lead', email: 'alice@example.com'},
  {name: 'Bob Martinez', role: 'Product Designer', email: 'bob@example.com'},
  {name: 'Carol Kim', role: 'Frontend Engineer', email: 'carol@example.com'},
  {name: 'David Patel', role: 'Backend Engineer', email: 'david@example.com'},
];

export default function TeamMembersList() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{maxWidth: 400}}>
      <h2 style={{fontSize: 24, fontWeight: 700, marginBottom: 16}}>Team Members</h2>
      {members.map((m) => (
        <div key={m.name} style={{position: 'relative'}}>
          <div onMouseEnter={() => setHovered(m.name)} onMouseLeave={() => setHovered(null)} style={{display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', borderRadius: 6, cursor: 'pointer', background: hovered === m.name ? '#f5f5f5' : 'transparent'}}>
            <div style={{width: 32, height: 32, borderRadius: '50%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600}}>{m.name[0]}</div>
            <span>{m.name}</span>
          </div>
          {hovered === m.name && (
            <div style={{position: 'absolute', left: '100%', top: 0, marginLeft: 8, padding: 16, border: '1px solid #ddd', borderRadius: 8, background: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, width: 220}}>
              <p style={{fontWeight: 600, margin: '0 0 4px'}}>{m.name}</p>
              <p style={{fontSize: 13, color: '#666', margin: '0 0 8px'}}>{m.role}</p>
              <hr style={{border: 'none', borderTop: '1px solid #eee', margin: '8px 0'}} />
              <p style={{fontSize: 13, margin: '8px 0'}}>{m.email}</p>
              <button style={{padding: '6px 12px', background: '#0066ff', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Message</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
