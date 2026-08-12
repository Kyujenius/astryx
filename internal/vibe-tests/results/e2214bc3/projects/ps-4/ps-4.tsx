export default function ProductDetailPage() {
  return (
    <div style={{padding: 24, fontFamily: 'system-ui'}}>
      <nav aria-label="Breadcrumb" style={{fontSize: 14, color: '#6b7280', marginBottom: 24}}>
        <a href="/" style={{color: '#6b7280'}}>Home</a> / <a href="/electronics" style={{color: '#6b7280'}}>Electronics</a> / <a href="/electronics/audio" style={{color: '#6b7280'}}>Audio</a> / <span style={{color: '#111'}}>Wireless Headphones Pro</span>
      </nav>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32}}>
        <div style={{backgroundColor: '#f3f4f6', borderRadius: 12, height: 300}} />
        <div>
          <h1 style={{margin: '0 0 8px'}}>Wireless Headphones Pro</h1>
          <p style={{fontSize: 24, fontWeight: 'bold', margin: '0 0 12px'}}>$299.99</p>
          <p style={{color: '#6b7280'}}>Premium noise-canceling wireless headphones with 30-hour battery life.</p>
          <div style={{display: 'flex', gap: 12, marginTop: 20}}>
            <button style={{padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600}}>Add to Cart</button>
            <button style={{padding: '10px 20px', backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: 6, cursor: 'pointer'}}>Save for Later</button>
          </div>
        </div>
      </div>
    </div>
  );
}
