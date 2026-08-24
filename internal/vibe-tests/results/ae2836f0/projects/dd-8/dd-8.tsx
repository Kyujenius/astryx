import {Table} from '@astryxdesign/core/Table';
import {Badge} from '@astryxdesign/core/Badge';

type Content = {
  id: string;
  title: string;
  type: 'Article' | 'Video' | 'Podcast' | 'Infographic';
  author: string;
  published: string;
  views: number;
};

const typeColors = {Article: 'info', Video: 'positive', Podcast: 'warning', Infographic: 'accent'} as const;

const data: Content[] = [
  {id: '1', title: 'Getting Started with React', type: 'Article', author: 'Jane', published: '2024-03-01', views: 1520},
  {id: '2', title: 'Advanced CSS Techniques', type: 'Video', author: 'Mike', published: '2024-03-05', views: 890},
  {id: '3', title: 'Design Systems in Practice', type: 'Podcast', author: 'Sarah', published: '2024-03-10', views: 2100},
  {id: '4', title: 'Data Visualization Guide', type: 'Infographic', author: 'Tom', published: '2024-03-15', views: 650},
  {id: '5', title: 'TypeScript Best Practices', type: 'Article', author: 'Jane', published: '2024-03-20', views: 3200},
];

export default function ContentLibrary() {
  return (
    <div className="p-4">
      <Table
        data={data}
        columns={[
          {key: 'title', header: 'Title', sortable: true},
          {key: 'type', header: 'Type', render: (row) => <Badge size="sm" color={typeColors[row.type]}>{row.type}</Badge>},
          {key: 'author', header: 'Author'},
          {key: 'published', header: 'Published', sortable: true},
          {key: 'views', header: 'Views', sortable: true},
        ]}
        sortable
      />
    </div>
  );
}
