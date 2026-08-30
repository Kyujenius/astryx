import React from 'react';

const plans = [{name:'Starter',price:'$9',period:'/month',highlight:false},{name:'Pro',price:'$29',period:'/month',highlight:false},{name:'Enterprise',price:'Custom',period:'',highlight:true}];

export default function PricingHeader() {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center'}}>
      {plans.map(p => (
        <div key={p.name} style={{flex: 1, minWidth: 200, padding: 24, border: p.highlight ? '2px solid #3b82f6' : '1px solid #ddd', borderRadius: 8, textAlign: 'center', boxShadow: p.highlight ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'}}>
          {p.highlight && <span style={{fontSize: 12, padding: '2px 8px', borderRadius: 12, background: '#dbeafe', color: '#2563eb', marginBottom: 8, display: 'inline-block'}}>Most Popular</span>}
          <h3 style={{fontSize: 20, fontWeight: 600, margin: '8px 0'}}>{p.name}</h3>
          <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 4}}>
            <span style={{fontSize: 32, fontWeight: 700}}>{p.price}</span>
            {p.period && <span style={{color: '#888'}}>{p.period}</span>}
          </div>
          {p.name === 'Enterprise' && <p style={{color: '#888', fontSize: 14, marginTop: 8}}>Contact sales for pricing</p>}
        </div>
      ))}
    </div>
  );
}
