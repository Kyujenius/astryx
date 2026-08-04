// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

export default function ProductDetail() {
  return (
    <div style={{padding: 32, maxWidth: 1100, margin: '0 auto'}}>
      <nav aria-label="Breadcrumb" style={{marginBottom: 16}}>
        <ol style={{display: 'flex', gap: 8, listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: '#666'}}>
          <li><a href="/">Home</a></li>
          <li>/</li>
          <li><a href="/electronics">Electronics</a></li>
          <li>/</li>
          <li><a href="/electronics/audio">Audio</a></li>
          <li>/</li>
          <li style={{color: '#333', fontWeight: 500}}>Wireless Headphones Pro</li>
        </ol>
      </nav>

      <h1 style={{fontSize: 28, fontWeight: 700, marginBottom: 24}}>Wireless Headphones Pro</h1>

      <div style={{display: 'flex', gap: 32}}>
        <img
          src="https://picsum.photos/seed/product/500/500"
          alt="Wireless Headphones Pro"
          style={{width: 400, height: 400, objectFit: 'cover', borderRadius: 12}}
        />
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <p style={{fontSize: 28, fontWeight: 700, margin: 0}}>$299.99</p>
          <p style={{color: '#555', margin: 0, lineHeight: 1.6}}>Premium noise-canceling wireless headphones with 40-hour battery life, custom drivers, and multipoint Bluetooth connection.</p>
          <div style={{background: '#f5f5f5', borderRadius: 8, padding: 12}}>
            <p style={{fontSize: 13, color: '#666', margin: '0 0 4px'}}>Free shipping on orders over $50</p>
            <p style={{fontSize: 13, color: '#666', margin: 0}}>30-day return policy</p>
          </div>
          <div style={{display: 'flex', gap: 12}}>
            <button style={{padding: '12px 24px', borderRadius: 8, border: 'none', background: '#0064e0', color: '#fff', cursor: 'pointer', fontWeight: 500}}>Add to cart</button>
            <button style={{padding: '12px 24px', borderRadius: 8, border: '1px solid #ccc', background: '#fff', color: '#333', cursor: 'pointer', fontWeight: 500}}>Add to wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
}
