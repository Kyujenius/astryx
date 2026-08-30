import React from 'react';
import {Card, CardContent, CardHeader} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';

const plans = [{name:'Starter',price:'$9',period:'/month',highlight:false},{name:'Pro',price:'$29',period:'/month',highlight:false},{name:'Enterprise',price:'Custom',period:'',highlight:true}];

export default function PricingHeader() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {plans.map(p => (
        <Card key={p.name} className={`flex-1 min-w-[200px] text-center ${p.highlight ? 'border-blue-500 border-2 shadow-md' : ''}`}>
          <CardHeader>{p.highlight && <Badge className="mx-auto mb-2">Most Popular</Badge>}<h3 className="text-xl font-semibold">{p.name}</h3></CardHeader>
          <CardContent><div className="flex items-end justify-center gap-1"><span className="text-3xl font-bold">{p.price}</span>{p.period && <span className="text-muted-foreground">{p.period}</span>}</div>{p.name==='Enterprise' && <p className="text-sm text-muted-foreground mt-2">Contact sales</p>}</CardContent>
        </Card>
      ))}
    </div>
  );
}
