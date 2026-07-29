import {Table, TableRow, TableCell, TableHeaderCell} from '@astryxdesign/core/Table';
import {Badge} from '@astryxdesign/core/Badge';

type ContentType = 'Article' | 'Video' | 'Podcast' | 'Infographic';

interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  author: string;
  date: string;
  status: 'published' | 'draft' | 'review';
}

const TYPE_COLORS: Record<ContentType, string> = {
  Article: 'blue',
  Video: 'purple',
  Podcast: 'orange',
  Infographic: 'green',
};

interface ContentLibraryProps {
  items: ContentItem[];
}

export default function ContentLibrary({items}: ContentLibraryProps) {
  return (
    <div className="p-6">
      <Table aria-label="Content library">
        <thead>
          <TableRow>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Author</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </thead>
        <tbody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                <Badge color={TYPE_COLORS[item.type]}>{item.type}</Badge>
              </TableCell>
              <TableCell>{item.author}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>
                <Badge variant={item.status === 'published' ? 'filled' : 'outlined'}>
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
