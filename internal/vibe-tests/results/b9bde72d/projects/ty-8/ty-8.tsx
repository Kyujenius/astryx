// Copyright (c) Meta Platforms, Inc. and affiliates.

export default function ProfileCard() {
  return (
    <div style={{maxWidth: 360, border: '1px solid #e5e7eb', borderRadius: 12, padding: 24, fontFamily: 'system-ui', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'center'}}>
      <div style={{width: 80, height: 80, borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 600, margin: '0 auto 12px'}}>AJ</div>
      <h3 style={{margin: '0 0 4px', fontSize: 20}}>Alex Johnson</h3>
      <p style={{margin: '0 0 8px', fontSize: 14, fontWeight: 500, color: '#0066cc'}}>Senior Product Designer</p>
      <p style={{margin: '0 0 12px', color: '#666', fontSize: 14}}>Passionate about creating intuitive and accessible digital experiences.</p>
      <p style={{margin: 0, fontSize: 12, color: '#999'}}>Joined March 2021</p>
    </div>
  );
}
