import {useState} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Label} from '@/components/ui/label';

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
    <div className="flex flex-col gap-4 max-w-lg">
      <h2 className="text-2xl font-bold">Team Role Assignment</h2>
      {members.map((member) => (
        <Card key={member.id}>
          <CardContent className="p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold">{member.name}</p>
              <p className="text-sm text-muted-foreground">{member.email}</p>
            </div>
            <div className="w-[140px]">
              <Label htmlFor={`role-${member.id}`} className="sr-only">
                Role for {member.name}
              </Label>
              <Select value={member.role} onValueChange={(val) => updateRole(member.id, val)}>
                <SelectTrigger id={`role-${member.id}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((role) => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
