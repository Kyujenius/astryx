import {Button} from '@/components/ui/button';

export default function ProjectList({projects = []}: {projects?: {id: string; name: string}[]}) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <svg width={48} height={48} viewBox="0 0 24 24" fill="none" className="text-muted-foreground" aria-hidden="true">
          <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke="currentColor" strokeWidth={1.5} />
        </svg>
        <h3 className="text-lg font-semibold">No projects yet</h3>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          Create your first project to get started with organizing your work.
        </p>
        <Button>Create project</Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {projects.map((p) => <div key={p.id} className="p-3 border rounded">{p.name}</div>)}
    </div>
  );
}
