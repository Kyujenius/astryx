import {useState} from 'react';
import {Selector} from '@astryxdesign/core/Selector';
import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';
import {Avatar} from '@astryxdesign/core/Avatar';

type Role = 'Viewer' | 'Editor' | 'Admin';
interface TeamMember { id: string; name: string; role: Role; }

const initialMembers: TeamMember[] = [
  {id: '1', name: 'Alice Johnson', role: 'Editor'},
  {id: '2', name: 'Bob Smith', role: 'Viewer'},
  {id: '3', name: 'Carol Davis', role: 'Admin'},
  {id: '4', name: 'Dave Wilson', role: 'Viewer'},
  {id: '5', name: 'Eve Martinez', role: 'Editor'},
];

const roleOptions = [{value: 'Viewer', label: 'Viewer'}, {value: 'Editor', label: 'Editor'}, {value: 'Admin', label: 'Admin'}];

export default function RoleAssignmentForm() {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);

  const handleRoleChange = (memberId: string, newRole: string) => {
    setMembers((prev) => prev.map((m) => m.id === memberId ? {...m, role: newRole as Role} : m));
  };

  return (
    <VStack gap={4} padding={4}>
      <Text size="lg" weight="bold">Team Role Assignment</Text>
      <div className="space-y-3">
        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-3">
            <Avatar name={member.name} size="sm" />
            <span className="flex-1 text-sm">{member.name}</span>
            <Selector
              label={`Role for ${member.name}`}
              isLabelHidden
              options={roleOptions}
              value={member.role}
              onChange={(val) => handleRoleChange(member.id, val)}
              size="sm"
            />
          </div>
        ))}
      </div>
    </VStack>
  );
}
