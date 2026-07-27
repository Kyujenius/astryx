import {EmptyState} from '@astryxdesign/core/EmptyState';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';

interface Project { id: string; name: string; description: string; }
export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  if (projects.length === 0) return (<div className="max-w-lg mx-auto mt-16"><EmptyState title="No projects yet" description="Create your first project." action={<Button variant="filled" onPress={() => setProjects([{id: '1', name: 'My Project', description: 'New project'}])}>Create Project</Button>} /></div>);
  return (<div className="max-w-2xl mx-auto p-6"><Heading level={2}>Your Projects</Heading><div className="mt-4 grid gap-4">{projects.map(p => (<div key={p.id} className="bg-white border rounded-lg p-4 shadow-sm"><Heading level={3}>{p.name}</Heading><Text className="mt-1" color="secondary">{p.description}</Text></div>))}</div></div>);
}
