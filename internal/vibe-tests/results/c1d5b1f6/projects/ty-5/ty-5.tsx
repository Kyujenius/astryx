export default function HeroSection() {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: 32}}>
      <div style={{textAlign: 'center', maxWidth: 640}}>
        <h1 style={{fontSize: 48, fontWeight: 'bold', letterSpacing: '-0.02em', marginBottom: 16}}>Build faster with Astryx</h1>
        <p style={{fontSize: 20, color: '#666', marginBottom: 32}}>
          A modern design system for building consistent, accessible, and beautiful user interfaces at scale.
        </p>
        <button style={{padding: '12px 32px', fontSize: 16, borderRadius: 6, border: 'none', backgroundColor: '#1976d2', color: '#fff', cursor: 'pointer'}}>
          Get Started
        </button>
      </div>
    </div>
  );
}
