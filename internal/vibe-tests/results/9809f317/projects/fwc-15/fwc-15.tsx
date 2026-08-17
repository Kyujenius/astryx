import {useState} from 'react';
import {MultiSelector} from '@astryxdesign/core/MultiSelector';
import {Table} from '@astryxdesign/core/Table';
import {HStack} from '@astryxdesign/core/HStack';

interface Result {
  id: string;
  name: string;
  tags: string[];
  [key: string]: unknown;
}

const allTags = ['Frontend', 'Backend', 'Design', 'DevOps', 'Mobile'];

const data: Result[] = [
  {id: '1', name: 'Auth Service', tags: ['Backend', 'DevOps']},
  {id: '2', name: 'Dashboard UI', tags: ['Frontend', 'Design']},
  {id: '3', name: 'Mobile App', tags: ['Mobile', 'Frontend']},
  {id: '4', name: 'API Gateway', tags: ['Backend']},
  {id: '5', name: 'Design System', tags: ['Frontend', 'Design']},
];

export default function FilterableResults() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filtered = selectedTags.length === 0
    ? data
    : data.filter(item => item.tags.some(t => selectedTags.includes(t)));

  return (
    <div>
      <HStack gap={2} align="center" style={{marginBottom: 16}}>
        <MultiSelector
          label="Filter by tags"
          isLabelHidden
          options={allTags}
          value={selectedTags}
          onChange={setSelectedTags}
          placeholder="Filter by tags"
          hasSearch
          triggerDisplay="badges"
        />
      </HStack>
      <Table
        data={filtered}
        columns={[
          {key: 'name', header: 'Name'},
          {key: 'tags', header: 'Tags', renderCell: (row) => (row as Result).tags.join(', ')},
        ]}
        idKey="id"
      />
    </div>
  );
}
