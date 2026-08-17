import {useState} from 'react';

const allTags = ['Frontend', 'Backend', 'Design', 'DevOps', 'Mobile'];
const data = [
  {id: '1', name: 'Auth Service', tags: ['Backend', 'DevOps']},
  {id: '2', name: 'Dashboard UI', tags: ['Frontend', 'Design']},
  {id: '3', name: 'Mobile App', tags: ['Mobile', 'Frontend']},
  {id: '4', name: 'API Gateway', tags: ['Backend']},
  {id: '5', name: 'Design System', tags: ['Frontend', 'Design']},
];

export default function FilterableResults() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filtered = selectedTags.length === 0
    ? data
    : data.filter(item => item.tags.some(t => selectedTags.includes(t)));

  return (
    <div>
      <div style={{display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap'}} role="group" aria-label="Filter by tags">
        {allTags.map(tag => (
          <label key={tag} style={{display: 'flex', alignItems: 'center', gap: 4, fontSize: 14}}>
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => toggleTag(tag)}
            />
            {tag}
          </label>
        ))}
      </div>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{borderBottom: '2px solid #e5e5e5'}}>
            <th style={{textAlign: 'left', padding: '8px 12px'}}>Name</th>
            <th style={{textAlign: 'left', padding: '8px 12px'}}>Tags</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(item => (
            <tr key={item.id} style={{borderBottom: '1px solid #e5e5e5'}}>
              <td style={{padding: '8px 12px'}}>{item.name}</td>
              <td style={{padding: '8px 12px'}}>{item.tags.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
