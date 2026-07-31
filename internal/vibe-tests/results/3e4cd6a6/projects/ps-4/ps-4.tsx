export default function ProductDetailPage() {
  return (
    <div style={{padding: 24, maxWidth: 900, margin: '0 auto'}}>
      <nav style={{display: 'flex', gap: 4, fontSize: 14, color: '#666', marginBottom: 16}}>
        <a href="/">Home</a><span>/</span>
        <a href="/electronics">Electronics</a><span>/</span>
        <a href="/electronics/headphones">Headphones</a><span>/</span>
        <span style={{color: '#333'}}>Studio Pro Max</span>
      </nav>
      <div style={{display: 'flex', gap: 24}}>
        <img src="https://picsum.photos/600/400" alt="Studio Pro Max Headphones" style={{width: '50%', height: 400, objectFit: 'cover', borderRadius: 8}} />
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <h1 style={{margin: 0}}>Studio Pro Max</h1>
          <p style={{color: '#666', margin: 0}}>Premium wireless headphones with active noise cancellation</p>
          <span style={{fontSize: 28, fontWeight: 'bold'}}>$349.99</span>
          <div style={{background: '#f5f5f5', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 8}}>
            <span style={{fontWeight: 600}}>Key Features</span>
            <span>Active Noise Cancellation</span>
            <span>40-hour battery life</span>
            <span>Spatial Audio support</span>
            <span>Premium memory foam cushions</span>
          </div>
          <div style={{display: 'flex', gap: 8}}>
            <button style={{padding: '10px 20px', background: '#0066cc', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}>Add to Cart</button>
            <button style={{padding: '10px 20px', background: 'white', color: '#333', border: '1px solid #ccc', borderRadius: 6, cursor: 'pointer'}}>Save for Later</button>
          </div>
        </div>
      </div>
    </div>
  );
}
