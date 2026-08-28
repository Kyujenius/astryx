import React from 'react';

export default function ProfileCard() {
  return (
    <div style={{width: 360, border: '1px solid #e5e5e5', borderRadius: 12, padding: 24, fontFamily: 'system-ui'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
        <div style={{width: 48, height: 48, borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#4338ca'}}>
          SC
        </div>
        <div>
          <h2 style={{margin: 0, fontSize: 18, fontWeight: 600}}>Sarah Chen</h2>
          <p style={{margin: '2px 0 0', fontSize: 14, color: '#2563eb', fontWeight: 500}}>Senior Engineer</p>
        </div>
      </div>
      <hr style={{border: 'none', borderTop: '1px solid #eee', margin: '0 0 16px'}} />
      <p style={{color: '#666', fontSize: 14, margin: '0 0 12px', lineHeight: 1.5}}>
        Passionate about accessible, performant UI. Previously at Stripe and Vercel. Loves hiking and baking.
      </p>
      <p style={{fontSize: 12, color: '#999', margin: 0}}>Joined March 2024</p>
    </div>
  );
}
