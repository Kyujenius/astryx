// Copyright (c) Meta Platforms, Inc. and affiliates.

const PRODUCTS = [
  {id: '1', title: 'Wireless Headphones', price: 79.99, image: 'https://picsum.photos/seed/1/300/200'},
  {id: '2', title: 'Smart Watch', price: 199.99, image: 'https://picsum.photos/seed/2/300/200'},
  {id: '3', title: 'Portable Speaker', price: 49.99, image: 'https://picsum.photos/seed/3/300/200'},
  {id: '4', title: 'USB-C Hub', price: 34.99, image: 'https://picsum.photos/seed/4/300/200'},
];

export default function ProductGrid() {
  return (
    <div style={{padding: 24, fontFamily: 'system-ui'}}>
      <h2>Products</h2>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginTop: 16}}>
        {PRODUCTS.map((p) => (
          <div key={p.id} style={{border: '1px solid #eee', borderRadius: 8, overflow: 'hidden'}}>
            <img src={p.image} alt={p.title} style={{width: '100%', height: 160, objectFit: 'cover'}} />
            <div style={{padding: 12}}>
              <p style={{fontWeight: 600, margin: '0 0 4px'}}>{p.title}</p>
              <p style={{fontWeight: 700, margin: '0 0 8px'}}>${p.price.toFixed(2)}</p>
              <button style={{width: '100%', padding: '8px 16px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
