import {useState} from 'react';

interface Plan { name: string; monthlyPrice: number; annualPrice: number; features: string[]; isPopular?: boolean; }

const plans: Plan[] = [
  {name: 'Starter', monthlyPrice: 12, annualPrice: 10, features: ['5 projects', '1GB storage', 'Email support']},
  {name: 'Pro', monthlyPrice: 24, annualPrice: 20, features: ['Unlimited projects', '10GB storage', 'Priority support', 'API access'], isPopular: true},
  {name: 'Enterprise', monthlyPrice: 48, annualPrice: 40, features: ['Unlimited everything', '100GB storage', 'Dedicated support', 'SSO', 'Custom integrations']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div style={{padding: '32px', fontFamily: 'system-ui', textAlign: 'center'}}>
      <h1 style={{fontSize: '32px', fontWeight: 700}}>Pricing</h1>
      <p style={{color: '#666', marginBottom: '24px'}}>Choose the plan that works for you</p>
      <div style={{display: 'inline-flex', background: '#f1f1f1', borderRadius: '8px', padding: '4px', marginBottom: '32px'}}>
        <button onClick={() => setBilling('monthly')} style={{padding: '8px 16px', border: 'none', borderRadius: '6px', background: billing === 'monthly' ? 'white' : 'transparent', cursor: 'pointer', fontWeight: billing === 'monthly' ? 600 : 400}}>Monthly</button>
        <button onClick={() => setBilling('annual')} style={{padding: '8px 16px', border: 'none', borderRadius: '6px', background: billing === 'annual' ? 'white' : 'transparent', cursor: 'pointer', fontWeight: billing === 'annual' ? 600 : 400}}>Annual</button>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', maxWidth: '900px', margin: '0 auto'}}>
        {plans.map(plan => {
          const price = billing === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
          return (
            <div key={plan.name} style={{border: plan.isPopular ? '2px solid #0066cc' : '1px solid #e0e0e0', borderRadius: '12px', padding: '24px', textAlign: 'left'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <h3 style={{margin: 0}}>{plan.name}</h3>
                {plan.isPopular && <span style={{background: '#0066cc', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '12px'}}>Popular</span>}
              </div>
              <div style={{margin: '12px 0'}}>
                <span style={{fontSize: '32px', fontWeight: 700}}>${price}</span>
                <span style={{color: '#666'}}>/mo</span>
              </div>
              {billing === 'annual' && <p style={{color: '#16a34a', fontSize: '14px'}}>Save ${(plan.monthlyPrice - plan.annualPrice) * 12}/year</p>}
              <ul style={{listStyle: 'none', padding: 0, margin: '16px 0'}}>
                {plan.features.map(f => <li key={f} style={{padding: '4px 0', fontSize: '14px'}}>{f}</li>)}
              </ul>
              <button style={{width: '100%', padding: '10px', border: 'none', borderRadius: '6px', background: plan.isPopular ? '#0066cc' : '#f1f1f1', color: plan.isPopular ? 'white' : '#333', cursor: 'pointer', fontWeight: 500}}>Get Started</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
