export default function ThemedCard() {
  return (
    <div style={{padding: 32, fontFamily: 'system-ui'}}>
      <h2 style={{fontSize: 24, fontWeight: 700, marginBottom: 8}}>Custom Card Theme</h2>
      <p style={{color: '#6b7280', marginBottom: 24}}>Use CSS custom properties or wrapper elements for gradient borders.</p>
      <div style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: 2, borderRadius: 18, marginBottom: 16}}>
        <div style={{background: 'white', borderRadius: 16, padding: 24}}>
          <h3 style={{fontSize: 18, fontWeight: 600, marginBottom: 8}}>Gradient Border Card</h3>
          <p style={{color: '#6b7280'}}>Achieved with gradient wrapper + padding as border width.</p>
        </div>
      </div>
      <div style={{border: '1px solid #e5e7eb', borderRadius: 16, padding: 24}}>
        <h3 style={{fontSize: 18, fontWeight: 600, marginBottom: 8}}>Standard Card</h3>
        <p style={{color: '#6b7280'}}>Increased border radius via inline style.</p>
      </div>
    </div>
  );
}
