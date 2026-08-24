import {Table} from '@astryxdesign/core/Table';
import {Badge} from '@astryxdesign/core/Badge';

type ContentItem = {
  id: string;
  title: string;
  type: 'Article' | 'Video' | 'Podcast' | 'Infographic';
  author: string;
  publishedAt: string;
  views: number;
};

const typeColors = {
  Article: 'info',
  Video: 'positive',
  Podcast: 'warning',
  Infographic: 'accent',
} as const;

const data: ContentItem[] = [
  {id: '1', title: 'Getting Started with React', type: 'Article', author: 'Jane', publishedAt: '2024-03-01', views: 1520},
  {id: '2', title: 'Advanced CSS Techniques', type: 'Video', author: 'Mike', publishedAt: '2024-03-05', views: 890},
  {id: '3', title: 'Design Systems in Practice', type: 'Podcast', author: 'Sarah', publishedAt: '2024-03-10', views: 2100},
  {id: '4', title: 'Data Visualization Guide', type: 'Infographic', author: 'Tom', publishedAt: '2024-03-15', views: 650},
  {id: '5', title: 'TypeScript Best Practices', type: 'Article', author: 'Jane', publishedAt: '2024-03-20', views: 3200},
  {id: '6', title: 'Component Architecture', type: 'Video', author: 'Mike', publishedAt: '2024-03-25', views: 1100},
];

export default function ContentLibrary() {
  return (
    <Table
      data={data}
      columns={[
        {key: 'title', header: 'Title', sortable: true},
        {key: 'type', header: 'Type', render: (row) => (
          <Badge size="sm" color={typeColors[row.type]}>{row.type}</Badge>
        )},
        {key: 'author', header: 'Author', sortable: true},
        {key: 'publishedAt', header: 'Published', sortable: true},
        {key: 'views', header: 'Views', sortable: true},
      ]}
      sortable
    />
  );
}
