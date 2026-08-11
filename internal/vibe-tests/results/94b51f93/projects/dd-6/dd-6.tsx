// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

interface Member {
  name: string;
  role: string;
  email: string;
  avatar: string;
}

const members: Member[] = [
  {name: 'Alice Chen', role: 'Engineering Lead', email: 'alice@company.com', avatar: 'https://i.pravatar.cc/80?u=alice'},
  {name: 'Bob Park', role: 'Designer', email: 'bob@company.com', avatar: 'https://i.pravatar.cc/80?u=bob'},
  {name: 'Carol Davis', role: 'Product Manager', email: 'carol@company.com', avatar: 'https://i.pravatar.cc/80?u=carol'},
];

export default function TeamMembers() {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  return (
    <div style={{padding: 16, fontFamily: 'system-ui'}}>
      <h2 style={{marginBottom: 16}}>Team Members</h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
        {members.map((member) => (
          <div key={member.email} style={{position: 'relative'}}>
            <span
              onMouseEnter={() => setHoveredMember(member.email)}
              onMouseLeave={() => setHoveredMember(null)}
              style={{fontWeight: 500, cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'dashed'}}
            >
              {member.name}
            </span>
            {hoveredMember === member.email && (
              <div style={{position: 'absolute', top: '100%', left: 0, marginTop: 8, padding: 16, backgroundColor: 'white', border: '1px solid #e5e5e5', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, width: 280}}>
                <div style={{display: 'flex', gap: 12}}>
                  <img src={member.avatar} alt={member.name} style={{width: 48, height: 48, borderRadius: '50%'}} />
                  <div>
                    <div style={{fontWeight: 600}}>{member.name}</div>
                    <div style={{fontSize: 13, color: '#666'}}>{member.role}</div>
                    <div style={{fontSize: 13, color: '#666'}}>{member.email}</div>
                    <button style={{marginTop: 8, padding: '4px 12px', backgroundColor: '#0066cc', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13}}>Message</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
