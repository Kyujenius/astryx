import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const transactions: Transaction[] = [
  { id: '1', description: 'Payment to Acme Inc', amount: -2500.00, date: '2024-01-20', status: 'completed' },
  { id: '2', description: 'Invoice #1234', amount: 5000.00, date: '2024-01-19', status: 'completed' },
  { id: '3', description: 'Subscription renewal', amount: -49.99, date: '2024-01-18', status: 'pending' },
  { id: '4', description: 'Refund - Order #5678', amount: 129.00, date: '2024-01-17', status: 'failed' },
  { id: '5', description: 'Transfer to savings', amount: -1000.00, date: '2024-01-16', status: 'completed' },
];

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
  completed: 'default',
  pending: 'secondary',
  failed: 'destructive',
};

export default function TransactionList() {
  return (
    <div className="space-y-2 p-4 max-w-xl">
      {transactions.map((tx) => (
        <Card key={tx.id}>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium">{tx.description}</p>
              <p className="text-sm text-muted-foreground">{tx.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`font-semibold ${tx.amount >= 0 ? 'text-green-600' : ''}`}>
                {tx.amount >= 0 ? '+' : ''}{tx.amount.toFixed(2)}
              </span>
              <Badge variant={statusVariant[tx.status]}>{tx.status}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
