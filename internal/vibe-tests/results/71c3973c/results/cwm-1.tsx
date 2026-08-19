import {useState} from 'react';

const plans = [
  {name: 'Starter', monthly: 12, annual: 10, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access'], popular: true},
  {name: 'Enterprise', monthly: 79, annual: 66, features: ['Unlimited everything', '1TB storage', 'Dedicated support', 'Custom integrations', 'SSO']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div style={{maxWidth: 900, margin: '0 auto', textAlign: 'center', padding: 32}}>
      <h2 style={{fontSize: 32, fontWeight: 700, marginBottom: 8}}>Choose your plan</h2>
      <p style={{color: '#666', marginBottom: 24}}>Start free, upgrade when you need to.</p>
      <div style={{display: 'inline-flex', border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden', marginBottom: 32}}>
        <button onClick={() => setBilling('monthly')} style={{padding: '8px 20px', border: 'none', background: billing === 'monthly' ? '#0066ff' : 'white', color: billing === 'monthly' ? 'white' : '#333', cursor: 'pointer'}}>Monthly</button>
        <button onClick={() => setBilling('annual')} style={{padding: '8px 20px', border: 'none', background: billing === 'annual' ? '#0066ff' : 'white', color: billing === 'annual' ? 'white' : '#333', cursor: 'pointer'}}>Annual (save 20%)</button>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24}}>
        {plans.map((plan) => (
          <div key={plan.name} style={{border: plan.popular ? '2px solid #0066ff' : '1px solid #ddd', borderRadius: 12, padding: 24, textAlign: 'left'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}>
              <h3 style={{fontSize: 20, fontWeight: 600, margin: 0}}>{plan.name}</h3>
              {plan.popular && <span style={{background: '#0066ff', color: 'white', padding: '2px 8px', borderRadius: 12, fontSize: 12}}>Popular</span>}
            </div>
            <div style={{marginBottom: 16}}><span style={{fontSize: 36, fontWeight: 700}}>${billing === 'monthly' ? plan.monthly : plan.annual}</span><span style={{color: '#666'}}>/month</span></div>
            <ul style={{listStyle: 'none', padding: 0, marginBottom: 24}}>{plan.features.map((f) => <li key={f} style={{padding: '4px 0', fontSize: 14}}>{f}</li>)}</ul>
            <button style={{width: '100%', padding: '10px 0', border: plan.popular ? 'none' : '1px solid #ddd', borderRadius: 6, background: plan.popular ? '#0066ff' : 'white', color: plan.popular ? 'white' : '#333', cursor: 'pointer'}}>Get started</button>
          </div>
        ))}
      </div>
    </div>
  );
}
