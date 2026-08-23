import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';

const data = [
  {title: 'Getting Started Guide', type: 'Article', author: 'Alice', date: '2024-01-15'},
  {title: 'Product Launch Video', type: 'Video', author: 'Bob', date: '2024-01-14'},
  {title: 'Brand Guidelines PDF', type: 'Document', author: 'Carol', date: '2024-01-13'},
  {title: 'Q4 Results Podcast', type: 'Audio', author: 'Dan', date: '2024-01-12'},
  {title: 'Hero Banner', type: 'Image', author: 'Eve', date: '2024-01-11'},
  {title: 'API Documentation', type: 'Article', author: 'Frank', date: '2024-01-10'},
];

const typeColors: Record<string, string> = {
  Article: 'bg-blue-100 text-blue-800',
  Video: 'bg-green-100 text-green-800',
  Document: 'bg-purple-100 text-purple-800',
  Audio: 'bg-orange-100 text-orange-800',
  Image: 'bg-teal-100 text-teal-800',
};

export default function ContentLibrary() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Last Modified</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, i) => (
          <TableRow key={i}>
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
