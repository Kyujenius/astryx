import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';

const typeColors: Record<string, string> = {
  Article: 'bg-blue-100 text-blue-800',
  Video: 'bg-purple-100 text-purple-800',
  Podcast: 'bg-orange-100 text-orange-800',
  Newsletter: 'bg-green-100 text-green-800',
  Course: 'bg-teal-100 text-teal-800',
};

const data = [
  {id: '1', title: 'Getting Started with React', type: 'Article', author: 'Jane', date: '2024-03-01'},
  {id: '2', title: 'Advanced TypeScript Patterns', type: 'Video', author: 'Alex', date: '2024-03-05'},
  {id: '3', title: 'Design Systems Weekly', type: 'Podcast', author: 'Sam', date: '2024-03-10'},
  {id: '4', title: 'March Updates', type: 'Newsletter', author: 'Team', date: '2024-03-15'},
  {id: '5', title: 'Build a Component Library', type: 'Course', author: 'Chris', date: '2024-03-20'},
];

export default function ContentLibrary() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Content Library</h2>
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
          {data.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell><Badge className={typeColors[item.type]}>{item.type}</Badge></TableCell>
              <TableCell>{item.author}</TableCell>
              <TableCell>{item.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
