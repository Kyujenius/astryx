import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const transactions: Transaction[] = [
  {id: '1', description: 'Payment to Acme Corp', amount: -250.00, date: '2024-03-15', status: 'completed'},
  {id: '2', description: 'Refund from Store', amount: 45.99, date: '2024-03-14', status: 'pending'},
  {id: '3', description: 'Subscription renewal', amount: -9.99, date: '2024-03-13', status: 'completed'},
  {id: '4', description: 'Transfer to savings', amount: -500.00, date: '2024-03-12', status: 'failed'},
  {id: '5', description: 'Freelance payment', amount: 1200.00, date: '2024-03-11', status: 'completed'},
];

const statusVariant = {completed: 'default', pending: 'secondary', failed: 'destructive'} as const;

export default function TransactionList() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(tx => (
            <TableRow key={tx.id}>
              <TableCell>{tx.description}</TableCell>
              <TableCell className={`text-right ${tx.amount >= 0 ? 'text-green-600' : ''}`}>
                {tx.amount >= 0 ? '+' : ''}{tx.amount.toFixed(2)}
              </TableCell>
              <TableCell>{tx.date}</TableCell>
              <TableCell><Badge variant={statusVariant[tx.status]}>{tx.status}</Badge></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
