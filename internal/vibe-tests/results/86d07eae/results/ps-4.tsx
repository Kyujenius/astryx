export default function ProductDetailPage() {
  return (
    <div style={{padding: 24, display: 'flex', flexDirection: 'column', gap: 24}}>
      <nav aria-label="Breadcrumb">
        <ol style={{display: 'flex', gap: 8, listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: '#666'}}>
          <li><a href="/" style={{color: '#666', textDecoration: 'none'}}>Home</a></li>
          <li>/</li>
          <li><a href="/electronics" style={{color: '#666', textDecoration: 'none'}}>Electronics</a></li>
          <li>/</li>
          <li aria-current="page" style={{color: '#333', fontWeight: 500}}>Wireless Headphones</li>
        </ol>
      </nav>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
        <img
          src="https://placehold.co/400x300"
          alt="Wireless Headphones"
          style={{borderRadius: 8, maxWidth: 400}}
        />
        <div style={{border: '1px solid #e0e0e0', borderRadius: 8, padding: 24, width: 340, display: 'flex', flexDirection: 'column', gap: 12}}>
          <h1 style={{fontSize: 24, fontWeight: 700, margin: 0}}>Wireless Headphones</h1>
          <p style={{fontSize: 20, fontWeight: 700, margin: 0}}>$79.99</p>
          <p style={{color: '#666', margin: 0}}>
            Premium over-ear headphones with active noise cancellation,
            40-hour battery life, and multipoint Bluetooth connectivity.
          </p>
          <div style={{display: 'flex', gap: 8}}>
            <button type="button" style={{padding: '10px 16px', background: '#333', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer'}}>
              Add to cart
            </button>
            <button type="button" style={{padding: '10px 16px', background: 'transparent', color: '#333', border: '1px solid #ccc', borderRadius: 6, cursor: 'pointer'}}>
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
