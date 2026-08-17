import {Table, type TableColumn, proportional, pixel} from '@astryxdesign/core/Table';
import {Badge} from '@astryxdesign/core/Badge';

interface ContentItem extends Record<string, unknown> {
  id: string;
  title: string;
  type: 'Article' | 'Video' | 'Podcast' | 'Newsletter' | 'Webinar';
  author: string;
  date: string;
}

const typeVariant: Record<ContentItem['type'], 'blue' | 'purple' | 'orange' | 'green' | 'teal'> = {
  Article: 'blue',
  Video: 'purple',
  Podcast: 'orange',
  Newsletter: 'green',
  Webinar: 'teal',
};

const data: ContentItem[] = [
  {id: '1', title: 'Getting Started with React 19', type: 'Article', author: 'Jane Chen', date: '2026-08-10'},
  {id: '2', title: 'Design Systems at Scale', type: 'Video', author: 'Alex Rivera', date: '2026-08-08'},
  {id: '3', title: 'Weekly Frontend Digest', type: 'Newsletter', author: 'Sam Patel', date: '2026-08-07'},
  {id: '4', title: 'A11y Deep Dive', type: 'Podcast', author: 'Kim Lau', date: '2026-08-05'},
  {id: '5', title: 'Component Architecture Workshop', type: 'Webinar', author: 'Chris Moreau', date: '2026-08-01'},
];

const columns: TableColumn<ContentItem>[] = [
  {key: 'title', header: 'Title', width: proportional(2)},
  {
    key: 'type',
    header: 'Type',
    width: pixel(130),
    renderCell: (item) => <Badge variant={typeVariant[item.type]} label={item.type} />,
  },
  {key: 'author', header: 'Author', width: proportional(1)},
  {key: 'date', header: 'Date', width: pixel(120)},
];

export default function ContentLibrary() {
  return (
    <Table<ContentItem>
      data={data}
      columns={columns}
      idKey="id"
      hasHover
    />
  );
}
