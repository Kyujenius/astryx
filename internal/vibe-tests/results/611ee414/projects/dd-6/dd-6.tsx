// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const members = [
  {name: 'Alice Chen', role: 'Engineering Lead', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/80?u=alice'},
  {name: 'Bob Martinez', role: 'Designer', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/80?u=bob'},
  {name: 'Carol Williams', role: 'Product Manager', email: 'carol@example.com', avatar: 'https://i.pravatar.cc/80?u=carol'},
];

export default function TeamMembers() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{padding: 16, fontFamily: 'sans-serif', maxWidth: 400}}>
      <h3>Team Members</h3>
      <ul style={{listStyle: 'none', padding: 0}}>
        {members.map((member) => (
          <li key={member.name} style={{padding: '8px 0', position: 'relative'}} onMouseEnter={() => setHovered(member.name)} onMouseLeave={() => setHovered(null)}>
            <span style={{cursor: 'pointer', textDecoration: hovered === member.name ? 'underline' : 'none'}}>{member.name}</span>
            {hovered === member.name && (
              <div style={{position: 'absolute', left: 0, top: '100%', background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, display: 'flex', gap: 12, minWidth: 280}}>
                <img src={member.avatar} alt={member.name} style={{width: 48, height: 48, borderRadius: '50%'}} />
                <div>
                  <p style={{margin: 0, fontWeight: 'bold'}}>{member.name}</p>
                  <p style={{margin: '2px 0', fontSize: 13, color: '#666'}}>{member.role}</p>
                  <p style={{margin: '2px 0', fontSize: 13}}>{member.email}</p>
                  <button style={{marginTop: 8, padding: '4px 12px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12}}>Message</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}