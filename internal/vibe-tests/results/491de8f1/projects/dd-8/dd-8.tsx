import {Table} from '@astryxdesign/core/Table';
import {Badge} from '@astryxdesign/core/Badge';

interface ContentItem {
  id: string;
  title: string;
  type: 'Article' | 'Video' | 'Podcast' | 'Newsletter' | 'Course';
  author: string;
  date: string;
  [key: string]: unknown;
}

const typeVariants: Record<string, 'blue' | 'purple' | 'orange' | 'green' | 'teal'> = {
  Article: 'blue',
  Video: 'purple',
  Podcast: 'orange',
  Newsletter: 'green',
  Course: 'teal',
};

const data: ContentItem[] = [
  {id: '1', title: 'Getting Started with React', type: 'Article', author: 'Jane', date: '2024-03-01'},
  {id: '2', title: 'Advanced TypeScript Patterns', type: 'Video', author: 'Alex', date: '2024-03-05'},
  {id: '3', title: 'Design Systems Weekly', type: 'Podcast', author: 'Sam', date: '2024-03-10'},
  {id: '4', title: 'March Updates', type: 'Newsletter', author: 'Team', date: '2024-03-15'},
  {id: '5', title: 'Build a Component Library', type: 'Course', author: 'Chris', date: '2024-03-20'},
];

const columns = [
  {key: 'title' as const, header: 'Title'},
  {key: 'type' as const, header: 'Type', renderCell: (row: ContentItem) => (
    <Badge label={row.type} variant={typeVariants[row.type]} />
  )},
  {key: 'author' as const, header: 'Author'},
  {key: 'date' as const, header: 'Date'},
];

export default function ContentLibrary() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">Content Library</h2>
      <Table data={data} columns={columns} idKey="id" hasHover />
    </div>
  );
}
