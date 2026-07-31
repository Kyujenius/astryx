export default function PageHeader() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 8, padding: 24}}>
      <h1 style={{margin: 0, fontSize: 36, fontWeight: 'bold'}}>Welcome to Our Platform</h1>
      <p style={{margin: 0, fontSize: 18, color: '#666'}}>
        Build beautiful, accessible interfaces with a comprehensive design system
        that scales from small projects to enterprise applications.
      </p>
    </div>
  );
}
