import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {useState} from 'react';

const plans = [
  {name: 'Starter', monthly: 12, annual: 10, features: ['5 projects', '10 GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100 GB', 'Priority support', 'API'], popular: true},
  {name: 'Enterprise', monthly: 79, annual: 66, features: ['Unlimited everything', 'Dedicated support', 'Custom integrations', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Tabs value={billing} onValueChange={setBilling} className="flex justify-center"><TabsList><TabsTrigger value="monthly">Monthly</TabsTrigger><TabsTrigger value="annual">Annual (save 17%)</TabsTrigger></TabsList></Tabs>
      <div className="grid grid-cols-3 gap-4">
        {plans.map(plan => (
          <Card key={plan.name} className={plan.popular ? 'border-primary shadow-lg' : ''}>
            <CardHeader><CardTitle className="flex items-center gap-2">{plan.name}{plan.popular && <Badge>Popular</Badge>}</CardTitle><p className="text-3xl font-bold">${billing === 'monthly' ? plan.monthly : plan.annual}<span className="text-sm font-normal text-muted-foreground">/mo</span></p></CardHeader>
            <CardContent><ul className="space-y-1">{plan.features.map(f => <li key={f} className="text-sm">{f}</li>)}</ul></CardContent>
            <CardFooter><Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>Choose {plan.name}</Button></CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}