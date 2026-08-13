import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Selector} from '@astryxdesign/core/Selector';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';

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
      <Heading level={2}>Team Role Assignment</Heading>
      {members.map((member) => (
        <Card key={member.id} padding={3}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <Text weight="semibold">{member.name}</Text>
              <Text type="supporting" color="secondary">{member.email}</Text>
            </div>
            <Selector
              label={`Role for ${member.name}`}
              isLabelHidden
              options={ROLES}
              value={member.role}
              onChange={(val) => updateRole(member.id, val)}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}
