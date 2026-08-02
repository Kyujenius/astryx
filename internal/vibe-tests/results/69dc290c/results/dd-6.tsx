import React, {useState} from 'react';

const members = [
  {name: 'Alice Chen', role: 'Engineering Manager', email: 'alice@example.com'},
  {name: 'Bob Smith', role: 'Senior Developer', email: 'bob@example.com'},
  {name: 'Carol Davis', role: 'Designer', email: 'carol@example.com'},
  {name: 'Dan Wilson', role: 'Product Manager', email: 'dan@example.com'},
];

export default function TeamMembersList() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{maxWidth: '400px', margin: '0 auto', padding: '24px'}}>
      <h2>Team Members</h2>
      <ul style={{listStyle: 'none', padding: 0}}>
        {members.map((member) => (
          <li
            key={member.name}
            style={{position: 'relative', padding: '8px 0'}}
            onMouseEnter={() => setHovered(member.name)}
            onMouseLeave={() => setHovered(null)}
          >
            <span style={{cursor: 'pointer', textDecoration: 'underline'}}>{member.name}</span>
            {hovered === member.name && (
              <div style={{position: 'absolute', left: '100%', top: 0, marginLeft: '8px', padding: '12px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '200px', zIndex: 10}}>
                <p style={{fontWeight: 'bold', margin: '0 0 4px'}}>{member.name}</p>
                <p style={{color: '#666', margin: '0 0 4px', fontSize: '14px'}}>{member.role}</p>
                <p style={{fontSize: '14px', margin: 0}}>{member.email}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
