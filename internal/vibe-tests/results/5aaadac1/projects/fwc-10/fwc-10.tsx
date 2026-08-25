import {useState} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';

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

  const handleRoleChange = (memberId: string, newRole: string) => {
    setMembers((prev) => prev.map((m) => m.id === memberId ? {...m, role: newRole as Role} : m));
  };

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-xl font-semibold">Team Role Assignment</h2>
      <div className="space-y-3">
        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <span className="flex-1 text-sm">{member.name}</span>
            <Select value={member.role} onValueChange={(val) => handleRoleChange(member.id, val)}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Viewer">Viewer</SelectItem>
                <SelectItem value="Editor">Editor</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
}
