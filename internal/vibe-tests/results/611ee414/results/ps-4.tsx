// Copyright (c) Meta Platforms, Inc. and affiliates.

export default function ProductDetail() {
  return (
    <div style={{padding: 24, maxWidth: 640, fontFamily: 'sans-serif'}}>
      <nav style={{fontSize: 14, marginBottom: 24}}>
        <a href="/" style={{color: '#0066cc'}}>Home</a>{' > '}
        <a href="/electronics" style={{color: '#0066cc'}}>Electronics</a>{' > '}
        <a href="/electronics/audio" style={{color: '#0066cc'}}>Audio</a>{' > '}
        <span>Premium Headphones</span>
      </nav>
      <h1 style={{margin: '0 0 16px'}}>Premium Headphones</h1>
      <div style={{border: '1px solid #e0e0e0', borderRadius: 8, padding: 24}}>
        <h3 style={{margin: '0 0 8px'}}>Product Information</h3>
        <p style={{color: '#444'}}>High-fidelity wireless headphones with active noise cancellation and 30-hour battery life.</p>
        <p style={{margin: '12px 0'}}>Price: $299.99</p>
        <p>In Stock: Yes</p>
      </div>
      <button onClick={() => window.history.back()} style={{marginTop: 16, padding: '8px 16px', background: 'transparent', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer'}}>Back</button>
    </div>
  );
}