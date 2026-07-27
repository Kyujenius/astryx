import {EmptyState} from '@astryxdesign/core/EmptyState';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Card} from '@astryxdesign/core/Card';
import {useState} from 'react';

interface Project { id: string; name: string; description: string; }

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  if (projects.length === 0) {
    return (<EmptyState title="No projects yet" description="Create your first project to get started." action={<Button variant="filled" onPress={() => setProjects([{id: '1', name: 'My First Project', description: 'A starter project'}])}>Create Project</Button>} />);
  }
  return (<Stack gap="md"><Heading level={2}>Your Projects</Heading>{projects.map(p => (<Card key={p.id}><Stack gap="xs"><Heading level={3}>{p.name}</Heading><p>{p.description}</p></Stack></Card>))}</Stack>);
}
