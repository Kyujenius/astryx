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
    <header className="max-w-3xl mx-auto px-6 py-12">
      <Heading level={1} type="display-1">{title}</Heading>
      <div className="flex items-center gap-3 mt-4">
        <Text type="supporting" color="secondary">{formatted}</Text>
        <Text type="supporting" color="secondary">by {author}</Text>
      </div>
    </header>
  );
}
