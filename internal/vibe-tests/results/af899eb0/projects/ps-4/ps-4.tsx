export default function ProductDetailPage() {
  return (
    <div style={{maxWidth: 800, margin: '0 auto', padding: 24}}>
      <nav aria-label="Breadcrumb" style={{fontSize: 14, color: '#666', marginBottom: 24}}>
        <a href="/" style={{color: '#0066cc'}}>Home</a>{' > '}
        <a href="/category" style={{color: '#0066cc'}}>Electronics</a>{' > '}
        <span style={{color: '#333'}}>Wireless Headphones Pro</span>
      </nav>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
        <div style={{aspectRatio: '1', backgroundColor: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48}}>🎧</div>
        <div style={{border: '1px solid #e0e0e0', borderRadius: 8, padding: 24}}>
          <span style={{padding: '2px 8px', borderRadius: 12, fontSize: 12, backgroundColor: '#dcfce7', color: '#166534'}}>In Stock</span>
          <h1 style={{fontSize: 28, fontWeight: 'bold', marginTop: 8}}>Wireless Headphones Pro</h1>
          <p style={{fontSize: 24, fontWeight: 'bold', marginTop: 8}}>$299.99</p>
          <p style={{color: '#666', marginTop: 8}}>Premium noise-cancelling headphones with 40-hour battery life, spatial audio, and adaptive EQ.</p>
          <div style={{display: 'flex', gap: 8, marginTop: 16}}>
            <button style={{padding: '10px 20px', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Add to Cart</button>
            <button style={{padding: '10px 20px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer'}}>Save for Later</button>
          </div>
        </div>
      </div>
    </div>
  );
}
