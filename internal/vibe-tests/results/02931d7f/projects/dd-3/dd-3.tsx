const products = [
  {id: 1, title: 'Wireless Headphones', price: 79.99, image: 'https://picsum.photos/seed/headphones/300/200'},
  {id: 2, title: 'Mechanical Keyboard', price: 149.99, image: 'https://picsum.photos/seed/keyboard/300/200'},
  {id: 3, title: 'USB-C Hub', price: 49.99, image: 'https://picsum.photos/seed/hub/300/200'},
  {id: 4, title: 'Monitor Stand', price: 34.99, image: 'https://picsum.photos/seed/stand/300/200'},
  {id: 5, title: 'Webcam HD', price: 89.99, image: 'https://picsum.photos/seed/webcam/300/200'},
  {id: 6, title: 'Mouse Pad XL', price: 24.99, image: 'https://picsum.photos/seed/mousepad/300/200'},
];

export default function ProductGrid() {
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', padding: '16px'}}>
      {products.map((product) => (
        <div key={product.id} style={{border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden'}}>
          <img src={product.image} alt={product.title} style={{width: '100%', height: '200px', objectFit: 'cover'}} />
          <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <h3 style={{fontSize: '18px', fontWeight: 600, margin: 0}}>{product.title}</h3>
            <p style={{fontSize: '20px', fontWeight: 700, margin: 0}}>${product.price.toFixed(2)}</p>
            <button style={{marginTop: '8px', padding: '10px', borderRadius: '8px', backgroundColor: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 500}}>
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
