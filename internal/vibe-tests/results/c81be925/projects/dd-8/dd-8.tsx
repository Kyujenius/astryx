import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';

type ContentType = 'Article' | 'Video' | 'Podcast' | 'Newsletter' | 'Course';
const typeStyles: Record<ContentType, string> = {
  Article: 'bg-blue-100 text-blue-800',
  Video: 'bg-purple-100 text-purple-800',
  Podcast: 'bg-teal-100 text-teal-800',
  Newsletter: 'bg-orange-100 text-orange-800',
  Course: 'bg-green-100 text-green-800',
};
const items = [
  {title: 'Getting Started with React', type: 'Article' as ContentType, author: 'Jane Doe', date: '2024-01-15'},
  {title: 'Advanced TypeScript Patterns', type: 'Video' as ContentType, author: 'John Smith', date: '2024-02-01'},
  {title: 'Design Systems Deep Dive', type: 'Podcast' as ContentType, author: 'Alice Wang', date: '2024-02-10'},
  {title: 'Weekly Frontend Digest', type: 'Newsletter' as ContentType, author: 'Bob Lee', date: '2024-03-01'},
  {title: 'Full-Stack Bootcamp', type: 'Course' as ContentType, author: 'Carol Davis', date: '2024-03-15'},
  {title: 'CSS Grid Mastery', type: 'Article' as ContentType, author: 'Dan Brown', date: '2024-04-01'},
  {title: 'Node.js Performance', type: 'Video' as ContentType, author: 'Eve Garcia', date: '2024-04-10'},
];

export default function ContentLibrary() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Content Library</h2>
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
          {items.map((item) => (
            <TableRow key={item.title}>
              <TableCell>{item.title}</TableCell>
              <TableCell><span className={`px-2 py-1 rounded-full text-xs font-medium ${typeStyles[item.type]}`}>{item.type}</span></TableCell>
              <TableCell>{item.author}</TableCell>
              <TableCell>{item.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
