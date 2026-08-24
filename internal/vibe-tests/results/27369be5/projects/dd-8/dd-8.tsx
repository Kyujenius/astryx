import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';

type Content = {title: string; type: string; author: string; published: string; views: number};

const typeVariants: Record<string, string> = {
  Article: 'bg-blue-100 text-blue-800',
  Video: 'bg-green-100 text-green-800',
  Podcast: 'bg-yellow-100 text-yellow-800',
  Infographic: 'bg-purple-100 text-purple-800',
};

const data: Content[] = [
  {title: 'Getting Started with React', type: 'Article', author: 'Jane', published: '2024-03-01', views: 1520},
  {title: 'Advanced CSS Techniques', type: 'Video', author: 'Mike', published: '2024-03-05', views: 890},
  {title: 'Design Systems in Practice', type: 'Podcast', author: 'Sarah', published: '2024-03-10', views: 2100},
  {title: 'Data Visualization Guide', type: 'Infographic', author: 'Tom', published: '2024-03-15', views: 650},
  {title: 'TypeScript Best Practices', type: 'Article', author: 'Jane', published: '2024-03-20', views: 3200},
];

export default function ContentLibrary() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Published</TableHead>
          <TableHead>Views</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(item => (
          <TableRow key={item.title}>
            <TableCell>{item.title}</TableCell>
            <TableCell><span className={`px-2 py-1 rounded-full text-xs font-medium ${typeVariants[item.type]}`}>{item.type}</span></TableCell>
            <TableCell>{item.author}</TableCell>
            <TableCell>{item.published}</TableCell>
            <TableCell>{item.views.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
