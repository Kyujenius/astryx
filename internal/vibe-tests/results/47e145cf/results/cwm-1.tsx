import {useState} from 'react';

const plans = [{name: 'Starter', monthly: 12, annual: 10, features: ['5 projects', '10 GB', 'Email support']}, {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100 GB', 'Priority support', 'API'], popular: true}, {name: 'Enterprise', monthly: 79, annual: 66, features: ['Unlimited', 'Dedicated support', 'Custom integrations']}];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  return (
    <div style={{textAlign: 'center', fontFamily: 'system-ui'}}>
      <div style={{display: 'inline-flex', border: '1px solid #ccc', borderRadius: 6, overflow: 'hidden', marginBottom: 24}}>
        <button style={{padding: '8px 16px', backgroundColor: billing === 'monthly' ? '#0066cc' : '#fff', color: billing === 'monthly' ? '#fff' : '#333', border: 'none'}} onClick={() => setBilling('monthly')}>Monthly</button>
        <button style={{padding: '8px 16px', backgroundColor: billing === 'annual' ? '#0066cc' : '#fff', color: billing === 'annual' ? '#fff' : '#333', border: 'none'}} onClick={() => setBilling('annual')}>Annual</button>
      </div>
      <div style={{display: 'flex', gap: 16, justifyContent: 'center'}}>
        {plans.map(plan => <div key={plan.name} style={{border: plan.popular ? '2px solid #0066cc' : '1px solid #eee', borderRadius: 8, padding: 24, width: 240}}>
          <h3>{plan.name}</h3><p style={{fontSize: 32, fontWeight: 700}}>${billing === 'monthly' ? plan.monthly : plan.annual}<span style={{fontSize: 14, fontWeight: 400}}>/mo</span></p>
          <ul style={{listStyle: 'none', padding: 0, textAlign: 'left'}}>{plan.features.map(f => <li key={f} style={{padding: '4px 0', fontSize: 14}}>{f}</li>)}</ul>
          <button style={{width: '100%', marginTop: 16, padding: 10, backgroundColor: plan.popular ? '#0066cc' : '#fff', color: plan.popular ? '#fff' : '#333', border: '1px solid #ccc', borderRadius: 4}}>Choose {plan.name}</button>
        </div>)}
      </div>
    </div>
  );
}