export default function BlogPostHeader({
  title = 'The Future of Design Systems',
  date = '2026-08-16',
  author = 'Jane Doe',
}: {title?: string; date?: string; author?: string}) {
  const formatted = new Date(date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
  return (
    <header style={{maxWidth: 720, margin: '0 auto', padding: '48px 24px'}}>
      <h1 style={{fontSize: 48, fontWeight: 700, lineHeight: 1.1, margin: 0}}>{title}</h1>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 16}}>
        <span style={{fontSize: 14, color: '#666'}}>{formatted}</span>
        <span style={{fontSize: 14, color: '#666'}}>by {author}</span>
      </div>
    </header>
  );
}
