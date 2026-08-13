import {useState} from 'react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
}

const ROLES = ['Admin', 'Editor', 'Viewer', 'Contributor'];

const INITIAL_MEMBERS: TeamMember[] = [
  {id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin'},
  {id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor'},
  {id: '3', name: 'Carol White', email: 'carol@example.com', role: 'Viewer'},
  {id: '4', name: 'Dave Brown', email: 'dave@example.com', role: 'Contributor'},
];

export default function RoleAssignmentForm() {
  const [members, setMembers] = useState(INITIAL_MEMBERS);

  const updateRole = (id: string, role: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? {...m, role} : m))
    );
  };

  return (
    <div style={{maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 12}}>
      <h2 style={{fontSize: 24, fontWeight: 700}}>Team Role Assignment</h2>
      {members.map((member) => (
        <div key={member.id} style={{border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div>
            <p style={{margin: 0, fontWeight: 600}}>{member.name}</p>
            <p style={{margin: 0, fontSize: 13, color: '#666'}}>{member.email}</p>
          </div>
          <label>
            <span className="sr-only">Role for {member.name}</span>
            <select
              value={member.role}
              onChange={(e) => updateRole(member.id, e.target.value)}
              style={{padding: '6px 10px', border: '1px solid #ccc', borderRadius: 4}}
              aria-label={`Role for ${member.name}`}
            >
              {ROLES.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </label>
        </div>
      ))}
    </div>
  );
}
