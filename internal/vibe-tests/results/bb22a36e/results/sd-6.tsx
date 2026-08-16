export default function ProjectList({projects = []}: {projects?: {id: string; name: string}[]}) {
  if (projects.length === 0) {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 24px', gap: 16}}>
        <svg width={48} height={48} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke="#999" strokeWidth={1.5} />
        </svg>
        <h3 style={{margin: 0}}>No projects yet</h3>
        <p style={{fontSize: 14, color: '#666', textAlign: 'center', maxWidth: 300}}>Create your first project to get started.</p>
        <button style={{padding: '10px 20px', borderRadius: 6, border: 'none', background: '#0066cc', color: '#fff', cursor: 'pointer'}}>Create project</button>
      </div>
    );
  }
  return <div>{projects.map((p) => <div key={p.id} style={{padding: 12, borderBottom: '1px solid #eee'}}>{p.name}</div>)}</div>;
}
