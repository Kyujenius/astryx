export default function ProductDetailPage() {
  return (
    <div style={{padding: '24px', maxWidth: '700px', fontFamily: 'system-ui'}}>
      <nav aria-label="Breadcrumb" style={{marginBottom: '16px'}}>
        <ol style={{display: 'flex', gap: '4px', listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#666'}}>
          <li><a href="/" style={{color: '#0066cc', textDecoration: 'none'}}>Home</a></li>
          <li>/</li>
          <li><a href="/electronics" style={{color: '#0066cc', textDecoration: 'none'}}>Electronics</a></li>
          <li>/</li>
          <li><a href="/electronics/audio" style={{color: '#0066cc', textDecoration: 'none'}}>Audio</a></li>
          <li>/</li>
          <li aria-current="page" style={{color: '#333', fontWeight: 500}}>Premium Headphones</li>
        </ol>
      </nav>
      <h1 style={{marginBottom: '16px'}}>Premium Headphones</h1>
      <div style={{border: '1px solid #e0e0e0', borderRadius: '8px', padding: '24px'}}>
        <h2 style={{marginTop: 0}}>Product Details</h2>
        <p>High-quality noise-canceling headphones with 30-hour battery life, premium drivers, and comfortable over-ear design.</p>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0'}}>
          <span style={{fontSize: '24px', fontWeight: 700}}>$299.99</span>
          <span style={{fontSize: '14px', color: '#666'}}>Free shipping</span>
        </div>
        <div style={{display: 'flex', gap: '8px'}}>
          <button style={{padding: '10px 20px', background: '#0066cc', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer'}}>Add to Cart</button>
          <button onClick={() => history.back()} style={{padding: '10px 20px', background: 'transparent', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer'}}>Back</button>
        </div>
      </div>
    </div>
  );
}
