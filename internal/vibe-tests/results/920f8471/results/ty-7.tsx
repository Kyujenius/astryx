interface ChangelogEntry {
  version: string; date: string; changes: {type: string; items: string[]}[]; note?: string;
}

export default function Changelog({entries}: {entries: ChangelogEntry[]}) {
  return (
    <div style={{maxWidth: 680, margin: '0 auto', padding: 24}}>
      <h1>Changelog</h1>
      <p style={{color: '#666'}}>All notable changes.</p>
      <hr />
      {entries.map((entry) => (
        <div key={entry.version} style={{marginBottom: 32}}>
          <h2>{entry.version} <span style={{fontWeight: 400, color: '#666'}}>- {entry.date}</span></h2>
          {entry.changes.map((group) => (
            <div key={group.type}>
              <h3 style={{textTransform: 'capitalize'}}>{group.type}</h3>
              <ul style={{paddingLeft: 24}}>{group.items.map((item, i) => <li key={i}>{item}</li>)}</ul>
            </div>
          ))}
          {entry.note && <blockquote style={{borderLeft: '4px solid #e0e0e0', paddingLeft: 16, fontStyle: 'italic', color: '#666'}}>{entry.note}</blockquote>}
          <hr />
        </div>
      ))}
    </div>
  );
}
