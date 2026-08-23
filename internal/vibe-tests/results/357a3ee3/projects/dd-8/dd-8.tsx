import {Badge} from '@astryxdesign/core/Badge';
import {Table} from '@astryxdesign/core/Table';

interface ContentItem extends Record<string, unknown> {
  id: string;
  title: string;
  type: string;
  author: string;
  lastModified: string;
}

const data: ContentItem[] = [
  {id: '1', title: 'Getting Started Guide', type: 'Article', author: 'Alice', lastModified: '2024-01-15'},
  {id: '2', title: 'Product Launch Video', type: 'Video', author: 'Bob', lastModified: '2024-01-14'},
  {id: '3', title: 'Brand Guidelines PDF', type: 'Document', author: 'Carol', lastModified: '2024-01-13'},
  {id: '4', title: 'Q4 Results Podcast', type: 'Audio', author: 'Dan', lastModified: '2024-01-12'},
  {id: '5', title: 'Hero Banner', type: 'Image', author: 'Eve', lastModified: '2024-01-11'},
  {id: '6', title: 'API Documentation', type: 'Article', author: 'Frank', lastModified: '2024-01-10'},
];

const typeVariant: Record<string, 'blue' | 'green' | 'purple' | 'orange' | 'teal'> = {
  Article: 'blue',
  Video: 'green',
  Document: 'purple',
  Audio: 'orange',
  Image: 'teal',
};

const columns = [
  {key: 'title' as const, header: 'Title'},
  {
    key: 'type' as const,
    header: 'Type',
    renderCell: (item: ContentItem) => (
      <Badge variant={typeVariant[item.type] || 'neutral'} label={item.type} />
    ),
  },
  {key: 'author' as const, header: 'Author'},
  {key: 'lastModified' as const, header: 'Last Modified'},
];

export default function ContentLibrary() {
  return (
    <Table
      data={data}
      columns={columns}
      idKey="id"
      hasHover
    />
  );
}
