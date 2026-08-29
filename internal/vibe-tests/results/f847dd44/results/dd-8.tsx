import {Table} from '@astryxdesign/core/Table';
import {TableHeader} from '@astryxdesign/core/Table';
import {TableBody} from '@astryxdesign/core/Table';
import {TableRow} from '@astryxdesign/core/Table';
import {TableCell} from '@astryxdesign/core/Table';
import {Badge} from '@astryxdesign/core/Badge';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/VStack';

type ContentType = 'Article' | 'Video' | 'Podcast' | 'Newsletter' | 'Course';

const typeColors: Record<ContentType, 'blue' | 'purple' | 'teal' | 'orange' | 'green'> = {
  Article: 'blue',
  Video: 'purple',
  Podcast: 'teal',
  Newsletter: 'orange',
  Course: 'green',
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
    <VStack gap="md">
      <Heading level={2}>Content Library</Heading>
      <Table density="balanced">
        <TableHeader>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.title}>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                <Badge label={item.type} variant={typeColors[item.type]} />
              </TableCell>
              <TableCell>{item.author}</TableCell>
              <TableCell>{item.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </VStack>
  );
}
