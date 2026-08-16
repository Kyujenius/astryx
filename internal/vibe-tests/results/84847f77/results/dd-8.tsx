import {Badge} from '@/components/ui/badge';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';

interface ContentItem {
  id: string;
  title: string;
  type: 'Article' | 'Video' | 'Podcast' | 'Newsletter' | 'Webinar';
  author: string;
  date: string;
}

const data: ContentItem[] = [
  {id: '1', title: 'Getting Started with React 19', type: 'Article', author: 'Jane Chen', date: '2026-08-10'},
  {id: '2', title: 'Design Systems at Scale', type: 'Video', author: 'Alex Rivera', date: '2026-08-08'},
  {id: '3', title: 'Weekly Frontend Digest', type: 'Newsletter', author: 'Sam Patel', date: '2026-08-07'},
  {id: '4', title: 'A11y Deep Dive', type: 'Podcast', author: 'Kim Lau', date: '2026-08-05'},
  {id: '5', title: 'Component Architecture Workshop', type: 'Webinar', author: 'Chris Moreau', date: '2026-08-01'},
];

const typeColors: Record<ContentItem['type'], string> = {
  Article: 'bg-blue-100 text-blue-800',
  Video: 'bg-purple-100 text-purple-800',
  Podcast: 'bg-orange-100 text-orange-800',
  Newsletter: 'bg-green-100 text-green-800',
  Webinar: 'bg-teal-100 text-teal-800',
};

export default function ContentLibrary() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.title}</TableCell>
            <TableCell><Badge className={typeColors[item.type]}>{item.type}</Badge></TableCell>
            <TableCell>{item.author}</TableCell>
            <TableCell>{item.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
