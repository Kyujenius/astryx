import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useState} from "react";

interface Project { id: string; name: string; description: string; }
export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  if (projects.length === 0) return (<div className="max-w-lg mx-auto mt-16 text-center"><div className="mb-4"><svg className="mx-auto h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg></div><h3 className="text-lg font-semibold">No projects yet</h3><p className="text-muted-foreground mt-1">Create your first project.</p><Button className="mt-4" onClick={() => setProjects([{id: "1", name: "My Project", description: "New project"}])}>Create Project</Button></div>);
  return (<div className="max-w-2xl mx-auto p-6 space-y-4"><h2 className="text-2xl font-bold">Your Projects</h2>{projects.map(p => (<Card key={p.id}><CardHeader><CardTitle>{p.name}</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">{p.description}</p></CardContent></Card>))}</div>);
}
