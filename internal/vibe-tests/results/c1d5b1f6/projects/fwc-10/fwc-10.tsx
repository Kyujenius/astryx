import {useState} from 'react';

type Role = 'Viewer' | 'Editor' | 'Admin';
interface TeamMember { id: string; name: string; role: Role; }

const initialMembers: TeamMember[] = [
  {id: '1', name: 'Alice Johnson', role: 'Editor'},
  {id: '2', name: 'Bob Smith', role: 'Viewer'},
  {id: '3', name: 'Carol Davis', role: 'Admin'},
  {id: '4', name: 'Dave Wilson', role: 'Viewer'},
  {id: '5', name: 'Eve Martinez', role: 'Editor'},
];

export default function RoleAssignmentForm() {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);

  const handleRoleChange = (id: string, role: string) => {
    setMembers((prev) => prev.map((m) => m.id === id ? {...m, role: role as Role} : m));
  };

  return (
    <div style={{padding: 24}}>
      <h2 style={{fontSize: 20, fontWeight: 'bold', marginBottom: 16}}>Team Role Assignment</h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        {members.map((member) => (
          <div key={member.id} style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <div style={{width: 32, height: 32, borderRadius: '50%', backgroundColor: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12}}>
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span style={{flex: 1}}>{member.name}</span>
            <select value={member.role} onChange={(e) => handleRoleChange(member.id, e.target.value)} aria-label={`Role for ${member.name}`} style={{padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc'}}>
              <option value="Viewer">Viewer</option>
              <option value="Editor">Editor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
