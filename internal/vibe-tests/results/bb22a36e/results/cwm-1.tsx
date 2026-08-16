import {useState} from 'react';

const plans = [
  {name: 'Starter', monthly: 9, annual: 90, features: ['5 projects', '1 GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 290, features: ['Unlimited projects', '100 GB storage', 'Priority support', 'API access'], popular: true},
  {name: 'Enterprise', monthly: 99, annual: 990, features: ['Unlimited everything', 'Dedicated account manager', 'SLA', 'Custom integrations']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: 48}}>
      <h1 style={{fontSize: 32, fontWeight: 700}}>Pricing</h1>
      <div style={{display: 'flex', gap: 4, background: '#f3f4f6', padding: 4, borderRadius: 8}}>
        <button onClick={() => setBilling('monthly')} style={{padding: '8px 16px', borderRadius: 6, border: 'none', background: billing === 'monthly' ? '#fff' : 'transparent', fontWeight: billing === 'monthly' ? 600 : 400, cursor: 'pointer'}}>Monthly</button>
        <button onClick={() => setBilling('annual')} style={{padding: '8px 16px', borderRadius: 6, border: 'none', background: billing === 'annual' ? '#fff' : 'transparent', fontWeight: billing === 'annual' ? 600 : 400, cursor: 'pointer'}}>Annual (save 17%)</button>
      </div>
      <div style={{display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center'}}>
        {plans.map((plan) => (
          <div key={plan.name} style={{width: 260, padding: 24, border: plan.popular ? '2px solid #0066cc' : '1px solid #ddd', borderRadius: 12, boxShadow: plan.popular ? '0 4px 12px rgba(0,0,0,0.1)' : undefined}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
              <h3 style={{margin: 0}}>{plan.name}</h3>
              {plan.popular && <span style={{fontSize: 12, padding: '2px 8px', borderRadius: 12, background: '#e0f2fe', color: '#0284c7'}}>Popular</span>}
            </div>
            <p style={{fontSize: 28, fontWeight: 700, margin: '8px 0 4px'}}>${billing === 'monthly' ? plan.monthly : plan.annual}</p>
            <p style={{fontSize: 14, color: '#666'}}>per {billing === 'monthly' ? 'month' : 'year'}</p>
            {plan.features.map((f) => <p key={f} style={{margin: '4px 0', fontSize: 14}}>{f}</p>)}
            <button style={{width: '100%', marginTop: 16, padding: '10px 0', borderRadius: 6, border: plan.popular ? 'none' : '1px solid #ccc', background: plan.popular ? '#0066cc' : '#fff', color: plan.popular ? '#fff' : '#333', cursor: 'pointer'}}>
              {plan.popular ? 'Get started' : 'Choose plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
