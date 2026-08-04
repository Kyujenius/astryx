// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

const products = [
  {id: 1, name: 'Wireless Headphones', price: 79.99, image: 'https://picsum.photos/seed/headphones/300/200'},
  {id: 2, name: 'Laptop Stand', price: 49.99, image: 'https://picsum.photos/seed/stand/300/200'},
  {id: 3, name: 'Mechanical Keyboard', price: 129.99, image: 'https://picsum.photos/seed/keyboard/300/200'},
  {id: 4, name: 'USB-C Hub', price: 39.99, image: 'https://picsum.photos/seed/hub/300/200'},
  {id: 5, name: 'Monitor Light', price: 59.99, image: 'https://picsum.photos/seed/light/300/200'},
  {id: 6, name: 'Webcam HD', price: 89.99, image: 'https://picsum.photos/seed/webcam/300/200'},
];

export default function ProductGrid() {
  return (
    <div style={{padding: 32}}>
      <h2 style={{fontSize: 24, fontWeight: 700, marginBottom: 24}}>Products</h2>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24}}>
        {products.map((product) => (
          <div key={product.id} style={{border: '1px solid #e0e0e0', borderRadius: 12, overflow: 'hidden'}}>
            <img src={product.image} alt={product.name} style={{width: '100%', height: 180, objectFit: 'cover'}} />
            <div style={{padding: 16, display: 'flex', flexDirection: 'column', gap: 8}}>
              <h3 style={{fontSize: 16, fontWeight: 600, margin: 0}}>{product.name}</h3>
              <p style={{fontSize: 20, fontWeight: 700, margin: 0}}>${product.price.toFixed(2)}</p>
              <button style={{padding: '10px 20px', borderRadius: 8, border: 'none', background: '#0064e0', color: '#fff', cursor: 'pointer', fontWeight: 500, marginTop: 8}}>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
