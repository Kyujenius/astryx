import {Card, CardContent} from '@/components/ui/card';

export default function ProductDetail() {
  return (
    <div style={{fontFamily: 'system-ui', padding: 16}}>
      <nav style={{display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, color: '#666', marginBottom: 24}}>
        <a href="/" style={{color: '#666', textDecoration: 'none'}}>Home</a><span>/</span>
        <a href="/cat" style={{color: '#666', textDecoration: 'none'}}>Electronics</a><span>/</span>
        <a href="/cat/sub" style={{color: '#666', textDecoration: 'none'}}>Audio</a><span>/</span>
        <span style={{color: '#111'}}>Wireless Headphones Pro</span>
      </nav>
      <div style={{display: 'flex', gap: 24, flexWrap: 'wrap'}}>
        <div style={{width: 400, height: 400, border: '1px solid #e5e7eb', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <span style={{color: '#999'}}>Product Image</span>
        </div>
        <div style={{maxWidth: 400}}>
          <div style={{display: 'flex', gap: 8, marginBottom: 12}}>
            <span style={{backgroundColor: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: 4, fontSize: 12}}>In Stock</span>
            <span style={{backgroundColor: '#e5e7eb', padding: '2px 8px', borderRadius: 4, fontSize: 12}}>New</span>
          </div>
          <h1 style={{fontSize: 28, fontWeight: 700, marginBottom: 8}}>Wireless Headphones Pro</h1>
          <p style={{color: '#666', marginBottom: 16}}>Premium noise-canceling wireless headphones with 40-hour battery life.</p>
          <p style={{fontSize: 24, fontWeight: 700, marginBottom: 16}}>$299.99</p>
          <div style={{display: 'flex', gap: 8}}>
            <button style={{padding: '10px 20px', border: 'none', borderRadius: 4, backgroundColor: '#2563eb', color: 'white', cursor: 'pointer'}}>Add to cart</button>
            <button style={{padding: '10px 20px', border: '1px solid #ccc', borderRadius: 4, backgroundColor: 'white', cursor: 'pointer'}}>Add to wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
}
