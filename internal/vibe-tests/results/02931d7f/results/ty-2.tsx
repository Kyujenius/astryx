export default function BlogPostHeader() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px', padding: '32px', maxWidth: '720px'}}>
      <h1 style={{fontSize: '36px', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0}}>
        The Future of Design Systems in a Post-AI World
      </h1>
      <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
        <img
          src="https://i.pravatar.cc/48?u=author"
          alt="Sarah Chen"
          style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover'}}
        />
        <div>
          <p style={{margin: 0, fontWeight: 500, fontSize: '14px'}}>Sarah Chen</p>
          <p style={{margin: 0, fontSize: '12px', color: '#6b7280'}}>August 15, 2026</p>
        </div>
      </div>
      <hr style={{border: 'none', borderTop: '1px solid #e5e7eb'}} />
    </div>
  );
}
