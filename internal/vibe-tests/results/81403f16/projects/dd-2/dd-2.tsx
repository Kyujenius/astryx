import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Separator} from '@/components/ui/separator';

const transactions = [
  {id: 1, desc: 'Grocery Store', amount: -52.30, date: '2024-03-15', status: 'completed'},
  {id: 2, desc: 'Salary Deposit', amount: 3500.00, date: '2024-03-14', status: 'completed'},
  {id: 3, desc: 'Electric Bill', amount: -128.45, date: '2024-03-13', status: 'pending'},
  {id: 4, desc: 'Restaurant', amount: -45.80, date: '2024-03-12', status: 'completed'},
  {id: 5, desc: 'Refund', amount: 29.99, date: '2024-03-11', status: 'failed'},
];

export default function TransactionList() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader><CardTitle>Recent Transactions</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {transactions.map((tx, i) => (
          <React.Fragment key={tx.id}>
            <div className="flex items-center justify-between">
              <div><p className="font-medium">{tx.desc}</p><p className="text-sm text-muted-foreground">{tx.date}</p></div>
              <div className="text-right">
                <p className={`font-semibold ${tx.amount >= 0 ? 'text-green-600' : ''}`}>{tx.amount >= 0 ? '+' : ''}{tx.amount.toFixed(2)}</p>
                <Badge variant={tx.status === 'failed' ? 'destructive' : tx.status === 'pending' ? 'secondary' : 'default'}>{tx.status}</Badge>
              </div>
            </div>
            {i < transactions.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
