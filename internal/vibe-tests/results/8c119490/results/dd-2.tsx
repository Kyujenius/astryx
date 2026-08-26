import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Separator} from '@/components/ui/separator';

const transactions = [
  {id: 1, desc: 'Coffee Shop', amount: -4.50, date: '2024-01-15', status: 'completed'},
  {id: 2, desc: 'Salary', amount: 3500, date: '2024-01-14', status: 'completed'},
  {id: 3, desc: 'Electric Bill', amount: -89.20, date: '2024-01-13', status: 'pending'},
  {id: 4, desc: 'Freelance', amount: 450, date: '2024-01-12', status: 'completed'},
  {id: 5, desc: 'Groceries', amount: -67.30, date: '2024-01-11', status: 'failed'},
];

export default function TransactionList() {
  return (
    <Card>
      <CardHeader><CardTitle>Transactions</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {transactions.map((tx, i) => (
          <div key={tx.id}>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{tx.desc}</p>
                <p className="text-sm text-muted-foreground">{tx.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-bold ${tx.amount > 0 ? 'text-green-600' : ''}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                </span>
                <Badge variant={tx.status === 'completed' ? 'default' : tx.status === 'pending' ? 'secondary' : 'destructive'}>
                  {tx.status}
                </Badge>
              </div>
            </div>
            {i < transactions.length - 1 && <Separator className="mt-3" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
