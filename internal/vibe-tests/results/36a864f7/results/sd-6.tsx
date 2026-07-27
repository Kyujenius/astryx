import {useState} from 'react';
interface Project { id: string; name: string; description: string; }
export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  if (projects.length === 0) return (<div style={{maxWidth: 400, margin: '64px auto', textAlign: 'center'}}><div style={{fontSize: 48, marginBottom: 16}}>📁</div><h3 style={{fontSize: 18, fontWeight: 600}}>No projects yet</h3><p style={{color: '#666', marginTop: 4}}>Create your first project.</p><button onClick={() => setProjects([{id: '1', name: 'My Project', description: 'New project'}])} style={{marginTop: 16, padding: '8px 16px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Create Project</button></div>);
  return (<div style={{maxWidth: 600, margin: '0 auto', padding: 24}}><h2 style={{fontSize: 24, fontWeight: 700}}>Your Projects</h2><div style={{marginTop: 16, display: 'grid', gap: 16}}>{projects.map(p => (<div key={p.id} style={{border: '1px solid #ddd', borderRadius: 8, padding: 16}}><h3 style={{fontSize: 16, fontWeight: 600}}>{p.name}</h3><p style={{color: '#666', marginTop: 4}}>{p.description}</p></div>))}</div></div>);
}
