export default function BlogPostHeader({
  title = 'The Future of Design Systems',
  date = '2026-08-16',
  author = 'Jane Doe',
}: {title?: string; date?: string; author?: string}) {
  const formatted = new Date(date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
  return (
    <header className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold tracking-tight">{title}</h1>
      <div className="flex items-center gap-3 mt-4 text-sm text-muted-foreground">
        <span>{formatted}</span>
        <span>by {author}</span>
      </div>
    </header>
  );
}
