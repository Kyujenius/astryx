export default function ProductDetailPage() {
  const crumbs = [
    {label: 'Home', href: '/'},
    {label: 'Electronics', href: '/electronics'},
    {label: 'Audio', href: '/electronics/audio'},
    {label: 'Premium Headphones', href: ''},
  ];

  return (
    <div style={{padding: 24}}>
      <nav aria-label="Breadcrumb" style={{marginBottom: 16}}>
        <ol style={{display: 'flex', gap: 8, listStyle: 'none', padding: 0, margin: 0}}>
          {crumbs.map((crumb, i) => (
            <li key={crumb.label} style={{display: 'flex', alignItems: 'center', gap: 8}}>
              {crumb.href ? (
                <a href={crumb.href} style={{color: '#1976d2', textDecoration: 'none'}}>{crumb.label}</a>
              ) : (
                <span aria-current="page">{crumb.label}</span>
              )}
              {i < crumbs.length - 1 && <span style={{color: '#999'}}>/</span>}
            </li>
          ))}
        </ol>
      </nav>
      <button onClick={() => history.back()} style={{background: 'none', border: '1px solid #ccc', borderRadius: 4, padding: '6px 12px', cursor: 'pointer', marginBottom: 16}}>Back</button>
      <h1 style={{fontSize: 32, marginBottom: 8}}>Premium Headphones</h1>
      <p style={{color: '#666', marginBottom: 4}}>By AudioTech Co.</p>
      <p style={{fontSize: 24, fontWeight: 'bold', marginBottom: 16}}>$299.99</p>
      <p style={{marginBottom: 16}}>Experience crystal-clear audio with premium over-ear headphones.</p>
      <div style={{display: 'flex', gap: 8}}>
        <button style={{padding: '10px 20px', borderRadius: 4, border: 'none', backgroundColor: '#1976d2', color: '#fff', cursor: 'pointer'}}>Add to Cart</button>
        <button style={{padding: '10px 20px', borderRadius: 4, border: '1px solid #ccc', backgroundColor: '#fff', cursor: 'pointer'}}>Save for Later</button>
      </div>
    </div>
  );
}
