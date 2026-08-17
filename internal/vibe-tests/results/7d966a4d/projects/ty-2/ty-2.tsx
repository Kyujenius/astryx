import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

interface BlogHeaderProps {
  title: string;
  date: string;
  author: string;
}

export default function BlogPostHeader({
  title = 'The Future of Design Systems',
  date = '2026-08-16',
  author = 'Jane Doe',
}: Partial<BlogHeaderProps>) {
  const formatted = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header style={{maxWidth: 720, margin: '0 auto', padding: '48px 24px'}}>
      <Heading level={1} type="display-1">{title}</Heading>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 16}}>
        <Text type="supporting" color="secondary">{formatted}</Text>
        <Text type="supporting" color="secondary">by {author}</Text>
      </div>
    </header>
  );
}
