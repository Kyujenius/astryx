export default function ProductDetail() {
  return (
    <div style={{maxWidth:640,fontFamily:'system-ui'}}>
      <nav aria-label="Breadcrumb" style={{fontSize:14,color:'#666',marginBottom:16}}>
        <a href="/" style={{color:'#0066cc'}}>Home</a>{' > '}<a href="/electronics" style={{color:'#0066cc'}}>Electronics</a>{' > '}<a href="/electronics/audio" style={{color:'#0066cc'}}>Audio</a>{' > '}<span aria-current="page" style={{color:'#333'}}>Wireless Headphones Pro</span>
      </nav>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}><h1 style={{fontSize:28,fontWeight:700,margin:0}}>Wireless Headphones Pro</h1><span style={{background:'#dcfce7',color:'#16a34a',padding:'2px 10px',borderRadius:10,fontSize:12,fontWeight:500}}>In Stock</span></div>
      <p style={{fontSize:20,fontWeight:600,marginBottom:16}}>$299.99</p>
      <hr style={{border:'none',borderTop:'1px solid #e5e7eb',marginBottom:16}}/>
      <h3 style={{fontSize:18,fontWeight:600,marginBottom:8}}>Product Details</h3>
      <p style={{color:'#666',lineHeight:1.6,marginBottom:16}}>Premium wireless headphones with active noise cancellation, 30-hour battery life, and spatial audio support.</p>
      <div style={{display:'flex',gap:12}}>
        <button style={{padding:'10px 20px',borderRadius:6,background:'#0066cc',color:'white',border:'none',cursor:'pointer',fontSize:14}}>Add to Cart</button>
        <button onClick={()=>window.history.back()} style={{padding:'10px 20px',borderRadius:6,background:'white',border:'1px solid #ccc',cursor:'pointer',fontSize:14}}>Back</button>
      </div>
    </div>
  );
}
