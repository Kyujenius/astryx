// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState} from 'react';

const plans = [
  {name: 'Starter', monthly: 9, annual: 7, features: ['5 projects', '1GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 23, features: ['25 projects', '10GB storage', 'Priority support', 'API access']},
  {name: 'Enterprise', monthly: 99, annual: 79, features: ['Unlimited projects', '100GB storage', '24/7 support', 'Custom integrations', 'SSO']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, padding: 32}}>
      <div style={{textAlign: 'center'}}>
        <h2 style={{fontSize: 24, fontWeight: 700, marginBottom: 16}}>Choose your plan</h2>
        <div style={{display: 'inline-flex', borderRadius: 8, border: '1px solid #ddd', overflow: 'hidden'}}>
          <button
            onClick={() => setBilling('monthly')}
            style={{padding: '8px 16px', background: billing === 'monthly' ? '#0064e0' : '#fff', color: billing === 'monthly' ? '#fff' : '#333', border: 'none', cursor: 'pointer'}}
          >Monthly</button>
          <button
            onClick={() => setBilling('annual')}
            style={{padding: '8px 16px', background: billing === 'annual' ? '#0064e0' : '#fff', color: billing === 'annual' ? '#fff' : '#333', border: 'none', cursor: 'pointer'}}
          >Annual (save 20%)</button>
        </div>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24}}>
        {plans.map((plan) => (
          <div key={plan.name} style={{border: '1px solid #e0e0e0', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16}}>
            <h3 style={{fontSize: 20, fontWeight: 600}}>{plan.name}</h3>
            <div style={{fontSize: 36, fontWeight: 700}}>
              ${billing === 'monthly' ? plan.monthly : plan.annual}
              <span style={{fontSize: 14, fontWeight: 400, color: '#666'}}>/mo</span>
            </div>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8}}>
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <button style={{padding: '12px 24px', borderRadius: 8, border: plan.name === 'Pro' ? 'none' : '1px solid #ccc', background: plan.name === 'Pro' ? '#0064e0' : '#fff', color: plan.name === 'Pro' ? '#fff' : '#333', cursor: 'pointer', fontWeight: 500}}>
              {plan.name === 'Enterprise' ? 'Contact sales' : 'Get started'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
