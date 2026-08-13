interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const PRODUCTS: Product[] = [
  {id: 1, title: 'Wireless Headphones', price: 79.99, image: 'https://placehold.co/200x150'},
  {id: 2, title: 'Mechanical Keyboard', price: 129.99, image: 'https://placehold.co/200x150'},
  {id: 3, title: 'USB-C Hub', price: 49.99, image: 'https://placehold.co/200x150'},
  {id: 4, title: 'Monitor Stand', price: 39.99, image: 'https://placehold.co/200x150'},
  {id: 5, title: 'Webcam HD', price: 59.99, image: 'https://placehold.co/200x150'},
  {id: 6, title: 'Mouse Pad XL', price: 24.99, image: 'https://placehold.co/200x150'},
];

export default function ProductGrid() {
  return (
    <div style={{padding: 24}}>
      <h2 style={{fontSize: 24, fontWeight: 700, marginBottom: 16}}>Products</h2>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16}}>
        {PRODUCTS.map((product) => (
          <div key={product.id} style={{border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 8}}>
            <img src={product.image} alt={product.title} style={{width: '100%', borderRadius: 4}} />
            <h3 style={{fontSize: 16, fontWeight: 600, margin: 0}}>{product.title}</h3>
            <p style={{fontSize: 18, fontWeight: 700, margin: 0}}>${product.price.toFixed(2)}</p>
            <button type="button" style={{padding: '8px 12px', background: '#333', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer'}}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
