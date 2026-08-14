import {useState} from 'react';

const team = [
  {name: 'Alice Chen', role: 'Engineering Lead', email: 'alice@co.com', initials: 'AC'},
  {name: 'Bob Martinez', role: 'Product Designer', email: 'bob@co.com', initials: 'BM'},
  {name: 'Carol Wu', role: 'Frontend Engineer', email: 'carol@co.com', initials: 'CW'},
  {name: 'David Park', role: 'Backend Engineer', email: 'david@co.com', initials: 'DP'},
];

export default function TeamMembersList() {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  return (
    <div style={{fontFamily: 'system-ui, sans-serif', padding: 24, maxWidth: 400}}>
      <h3 style={{margin: '0 0 16px', fontSize: 18, fontWeight: 600}}>Team Members</h3>
      <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
        {team.map((m) => (
          <div key={m.name} style={{position: 'relative'}} onMouseEnter={() => setHoveredMember(m.name)} onMouseLeave={() => setHoveredMember(null)}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', borderRadius: 8, cursor: 'pointer', background: hoveredMember === m.name ? '#f5f5f5' : 'transparent'}}>
              <div style={{width: 32, height: 32, borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#4338ca'}}>{m.initials}</div>
              <span style={{fontSize: 14}}>{m.name}</span>
            </div>
            {hoveredMember === m.name && (
              <div style={{position: 'absolute', left: '100%', top: 0, marginLeft: 8, background: '#fff', border: '1px solid #e0e0e0', borderRadius: 12, padding: 16, width: 240, boxShadow: '0 4px 16px rgba(0,0,0,0.12)', zIndex: 10}}>
                <div style={{display: 'flex', gap: 12, marginBottom: 12}}>
                  <div style={{width: 48, height: 48, borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#4338ca'}}>{m.initials}</div>
                  <div>
                    <p style={{margin: 0, fontWeight: 600, fontSize: 14}}>{m.name}</p>
                    <p style={{margin: '2px 0 0', color: '#666', fontSize: 12}}>{m.role}</p>
                    <p style={{margin: '2px 0 0', color: '#666', fontSize: 12}}>{m.email}</p>
                  </div>
                </div>
                <button style={{width: '100%', padding: '6px 12px', border: '1px solid #ccc', borderRadius: 6, background: '#fff', cursor: 'pointer', fontSize: 13}}>Message</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
