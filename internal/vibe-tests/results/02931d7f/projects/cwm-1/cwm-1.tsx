import {useState} from 'react';

const plans = [
  {name: 'Starter', monthly: 12, annual: 10, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access'], popular: true},
  {name: 'Enterprise', monthly: 79, annual: 66, features: ['Unlimited everything', '1TB storage', 'Dedicated support', 'Custom integrations', 'SLA guarantee']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', padding: '24px'}}>
      <div style={{textAlign: 'center'}}>
        <h2 style={{fontSize: '28px', fontWeight: 700, marginBottom: '16px'}}>Choose your plan</h2>
        <div style={{display: 'inline-flex', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden'}}>
          <button
            onClick={() => setBilling('monthly')}
            style={{padding: '8px 20px', backgroundColor: billing === 'monthly' ? '#3b82f6' : 'white', color: billing === 'monthly' ? 'white' : '#374151', border: 'none', cursor: 'pointer'}}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('annual')}
            style={{padding: '8px 20px', backgroundColor: billing === 'annual' ? '#3b82f6' : 'white', color: billing === 'annual' ? 'white' : '#374151', border: 'none', cursor: 'pointer'}}
          >
            Annual
          </button>
        </div>
        {billing === 'annual' && (
          <span style={{display: 'inline-block', marginLeft: '12px', padding: '2px 8px', borderRadius: '12px', backgroundColor: '#dcfce7', color: '#166534', fontSize: '12px', fontWeight: 500}}>
            Save 20%
          </span>
        )}
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', width: '100%', maxWidth: '900px'}}>
        {plans.map((plan) => (
          <div key={plan.name} style={{border: plan.popular ? '2px solid #3b82f6' : '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <h3 style={{fontSize: '20px', fontWeight: 600}}>{plan.name}</h3>
            <div>
              <span style={{fontSize: '36px', fontWeight: 700}}>
                ${billing === 'monthly' ? plan.monthly : plan.annual}
              </span>
              <span style={{color: '#6b7280'}}>/month</span>
            </div>
            <hr style={{border: 'none', borderTop: '1px solid #e5e7eb'}} />
            <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px'}}>
              {plan.features.map((feature) => (
                <li key={feature} style={{fontSize: '14px', color: '#374151'}}>&#10003; {feature}</li>
              ))}
            </ul>
            <button style={{marginTop: 'auto', padding: '10px', borderRadius: '8px', border: plan.popular ? 'none' : '1px solid #d1d5db', backgroundColor: plan.popular ? '#3b82f6' : 'white', color: plan.popular ? 'white' : '#374151', cursor: 'pointer', fontWeight: 500}}>
              Get {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
