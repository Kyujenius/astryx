import React from 'react';

export default function ProductDetailPage() {
  return (
    <div style={{maxWidth: '900px', margin: '0 auto', padding: '24px'}}>
      <nav style={{fontSize: '14px', color: '#666', marginBottom: '24px'}}>
        <a href="/" style={{color: '#3b82f6', textDecoration: 'none'}}>Home</a>
        <span style={{margin: '0 8px'}}>/</span>
        <a href="/electronics" style={{color: '#3b82f6', textDecoration: 'none'}}>Electronics</a>
        <span style={{margin: '0 8px'}}>/</span>
        <span>Wireless Headphones Pro</span>
      </nav>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px'}}>
        <div style={{backgroundColor: '#f5f5f5', borderRadius: '12px', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999'}}>
          Product Image
        </div>
        <div>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <h1 style={{margin: 0}}>Wireless Headphones Pro</h1>
            <span style={{backgroundColor: '#dbeafe', color: '#1d4ed8', padding: '2px 8px', borderRadius: '4px', fontSize: '12px'}}>New</span>
          </div>
          <p style={{fontSize: '24px', fontWeight: 'bold'}}>$299.99</p>
          <div style={{border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', marginBottom: '16px'}}>
            <h3 style={{margin: '0 0 8px'}}>Description</h3>
            <p style={{margin: 0, color: '#4b5563'}}>Premium wireless headphones with active noise cancellation, 40-hour battery life, and spatial audio support.</p>
          </div>
          <div style={{display: 'flex', gap: '12px'}}>
            <button style={{padding: '10px 20px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer'}}>Add to Cart</button>
            <button style={{padding: '10px 20px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer'}}>Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
}
