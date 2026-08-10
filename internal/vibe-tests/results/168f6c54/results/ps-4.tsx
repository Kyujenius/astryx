// Copyright (c) Meta Platforms, Inc. and affiliates.

export default function ProductDetailPage() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 24, padding: 24}}>
      <nav aria-label="Breadcrumb">
        <ol style={{display: 'flex', gap: 8, listStyle: 'none', padding: 0, margin: 0, fontSize: 14}}>
          <li><a href="/" style={{color: '#2563eb', textDecoration: 'none'}}>Home</a></li>
          <li style={{color: '#9ca3af'}}>/</li>
          <li><a href="/electronics" style={{color: '#2563eb', textDecoration: 'none'}}>Electronics</a></li>
          <li style={{color: '#9ca3af'}}>/</li>
          <li><a href="/electronics/audio" style={{color: '#2563eb', textDecoration: 'none'}}>Audio</a></li>
          <li style={{color: '#9ca3af'}}>/</li>
          <li aria-current="page" style={{color: '#374151', fontWeight: 500}}>Premium Headphones</li>
        </ol>
      </nav>

      <button onClick={() => history.back()} style={{alignSelf: 'flex-start', padding: '8px 12px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 14, color: '#374151'}}>
        ← Back
      </button>

      <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        <h1 style={{margin: 0, fontSize: 28, fontWeight: 700}}>Premium Headphones</h1>
        <p style={{margin: 0, fontSize: 20, fontWeight: 600}}>$299.99</p>
        <hr style={{border: 'none', borderTop: '1px solid #e5e7eb'}} />
        <div style={{border: '1px solid #e5e7eb', borderRadius: 12, padding: 20}}>
          <h4 style={{margin: '0 0 8px', fontSize: 16, fontWeight: 600}}>Product Details</h4>
          <p style={{color: '#6b7280', margin: '0 0 16px', lineHeight: 1.6}}>
            High-fidelity wireless headphones with active noise cancellation,
            40-hour battery life, and premium comfort for all-day listening.
          </p>
          <div style={{display: 'flex', gap: 12}}>
            <button style={{padding: '10px 20px', borderRadius: 6, background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer'}}>Add to Cart</button>
            <button style={{padding: '10px 20px', borderRadius: 6, background: 'white', color: '#374151', border: '1px solid #d1d5db', cursor: 'pointer'}}>Save for Later</button>
          </div>
        </div>
      </div>
    </div>
  );
}
