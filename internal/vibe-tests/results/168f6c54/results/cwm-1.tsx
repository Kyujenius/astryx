// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const plans = [
  {name: 'Starter', monthly: 12, annual: 10, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100GB storage', 'Priority support', 'Analytics'], popular: true},
  {name: 'Enterprise', monthly: 79, annual: 66, features: ['Everything in Pro', '1TB storage', 'Dedicated support', 'Custom integrations', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, padding: 32}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
        <h2 style={{margin: 0, fontSize: 28, fontWeight: 700}}>Simple, transparent pricing</h2>
        <div style={{display: 'flex', background: '#f3f4f6', borderRadius: 8, padding: 4}}>
          <button onClick={() => setBilling('monthly')} style={{padding: '8px 16px', borderRadius: 6, border: 'none', background: billing === 'monthly' ? 'white' : 'transparent', fontWeight: 500, cursor: 'pointer', boxShadow: billing === 'monthly' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'}}>Monthly</button>
          <button onClick={() => setBilling('annual')} style={{padding: '8px 16px', borderRadius: 6, border: 'none', background: billing === 'annual' ? 'white' : 'transparent', fontWeight: 500, cursor: 'pointer', boxShadow: billing === 'annual' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'}}>Annual</button>
        </div>
        {billing === 'annual' && <span style={{background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: 12, fontSize: 12, fontWeight: 500}}>Save up to 20%</span>}
      </div>
      <div style={{display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center'}}>
        {plans.map(plan => (
          <div key={plan.name} style={{border: plan.popular ? '2px solid #2563eb' : '1px solid #e5e7eb', borderRadius: 12, padding: 24, width: 260, boxShadow: plan.popular ? '0 4px 12px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}>
              <h3 style={{margin: 0, fontSize: 18}}>{plan.name}</h3>
              {plan.popular && <span style={{background: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 500}}>Popular</span>}
            </div>
            <div style={{marginBottom: 16}}>
              <span style={{fontSize: 36, fontWeight: 700}}>${billing === 'monthly' ? plan.monthly : plan.annual}</span>
              <span style={{color: '#6b7280'}}>/mo</span>
            </div>
            <ul style={{listStyle: 'none', padding: 0, margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: 8}}>
              {plan.features.map(f => <li key={f} style={{fontSize: 14}}>{f}</li>)}
            </ul>
            <button style={{width: '100%', padding: '10px 16px', borderRadius: 6, background: plan.popular ? '#2563eb' : 'white', color: plan.popular ? 'white' : '#374151', border: plan.popular ? 'none' : '1px solid #d1d5db', cursor: 'pointer', fontWeight: 500}}>Get started</button>
          </div>
        ))}
      </div>
    </div>
  );
}
