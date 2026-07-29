import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';

type ContentType = 'Article' | 'Video' | 'Podcast' | 'Infographic';

interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  author: string;
  date: string;
  status: 'published' | 'draft' | 'review';
}

const TYPE_VARIANTS: Record<ContentType, string> = {
  Article: 'bg-blue-100 text-blue-800',
  Video: 'bg-purple-100 text-purple-800',
  Podcast: 'bg-orange-100 text-orange-800',
  Infographic: 'bg-green-100 text-green-800',
};

export default function ContentLibrary({items}: {items: ContentItem[]}) {
  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${TYPE_VARIANTS[item.type]}`}>
                  {item.type}
                </span>
              </TableCell>
              <TableCell>{item.author}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>
                <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
