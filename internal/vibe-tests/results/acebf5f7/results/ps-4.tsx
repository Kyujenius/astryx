import React from 'react';

export default function ProductDetailPage() {
  return (
    <div style={{maxWidth: 960, margin: '0 auto', padding: 24}}>
      <nav style={{fontSize: 14, color: '#888', marginBottom: 16}}><a href="/">Home</a> / <a href="/electronics">Electronics</a> / <a href="/electronics/headphones">Headphones</a> / <span>Pro Wireless Headphones</span></nav>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 32}}>
        <div style={{flex: 1, minWidth: 300, height: 300, background: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999'}}>Product Image</div>
        <div style={{flex: 1, minWidth: 300}}>
          <div style={{display: 'flex', gap: 8, marginBottom: 8}}>
            <span style={{fontSize: 12, padding: '2px 8px', borderRadius: 12, background: '#dcfce7', color: '#16a34a'}}>In Stock</span>
            <span style={{fontSize: 12, padding: '2px 8px', borderRadius: 12, background: '#dbeafe', color: '#2563eb'}}>Best Seller</span>
          </div>
          <h1 style={{fontSize: 28, fontWeight: 700, margin: '0 0 8px'}}>Pro Wireless Headphones</h1>
          <p style={{fontSize: 24, fontWeight: 700, margin: '0 0 16px'}}>$299.99</p>
          <p style={{color: '#666', marginBottom: 16}}>Premium noise-canceling wireless headphones with 30-hour battery life, adaptive EQ, and spatial audio support.</p>
          <div style={{padding: 12, background: '#f9fafb', borderRadius: 6, marginBottom: 16}}>
            <p style={{fontSize: 14, color: '#888', margin: '0 0 4px'}}>Free shipping on orders over $50</p>
            <p style={{fontSize: 14, color: '#888', margin: 0}}>30-day return policy</p>
          </div>
          <div style={{display: 'flex', gap: 8}}>
            <button style={{padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500}}>Add to Cart</button>
            <button style={{padding: '10px 20px', background: 'white', border: '1px solid #ddd', borderRadius: 6, cursor: 'pointer'}}>Save for Later</button>
          </div>
        </div>
      </div>
    </div>
  );
}
