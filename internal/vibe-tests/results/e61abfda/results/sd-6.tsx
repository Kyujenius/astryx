import {EmptyState} from '@astryxdesign/core/EmptyState';
import {Button} from '@astryxdesign/core/Button';

export default function ProjectList({projects = []}: {projects?: {id: string; name: string}[]}) {
  if (projects.length === 0) {
    return (
      <EmptyState
        title="No projects yet"
        description="Create your first project to get started with organizing your work."
        icon={
          <svg width={48} height={48} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke="currentColor" strokeWidth={1.5} />
          </svg>
        }
        actions={
          <Button label="Create project" variant="primary" />
        }
      />
    );
  }

  return (
    <div>
      {projects.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
