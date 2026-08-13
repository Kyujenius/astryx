export default function ProfileCard() {
  return (
    <div style={{border: '1px solid #e0e0e0', borderRadius: 8, padding: 20, width: 340, display: 'flex', gap: 12, alignItems: 'flex-start'}}>
      <div style={{width: 48, height: 48, borderRadius: '50%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 16, flexShrink: 0}}>
        JC
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
        <h3 style={{fontSize: 18, fontWeight: 600, margin: 0}}>Jane Cooper</h3>
        <p style={{fontSize: 14, fontWeight: 500, color: '#2563eb', margin: 0}}>Senior Engineer</p>
        <p style={{fontSize: 14, color: '#666', margin: 0}}>
          Building design systems and developer tooling. Passionate about
          accessibility and component architecture.
        </p>
      </div>
    </div>
  );
}
