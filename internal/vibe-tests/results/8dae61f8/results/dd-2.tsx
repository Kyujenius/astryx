import {Table} from '@astryxdesign/core/Table';
import {StatusDot} from '@astryxdesign/core/StatusDot';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {pixel, proportional} from '@astryxdesign/core/Table';

interface Transaction extends Record<string, unknown> {
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

const statusVariant = {completed: 'success', pending: 'warning', failed: 'error'} as const;

export default function TransactionList() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Heading level={2}>Transactions</Heading>
      <Table<Transaction>
        data={transactions}
        idKey="id"
        hasHover
        columns={[
          {key: 'description', header: 'Description', width: proportional(2)},
          {key: 'amount', header: 'Amount', width: pixel(120), align: 'end', renderCell: (row) => (
            <Text color={row.amount >= 0 ? 'accent' : 'primary'}>
              {row.amount >= 0 ? '+' : ''}{row.amount.toFixed(2)}
            </Text>
          )},
          {key: 'date', header: 'Date', width: pixel(120)},
          {key: 'status', header: 'Status', width: pixel(100), renderCell: (row) => (
            <StatusDot variant={statusVariant[row.status]} label={row.status} />
          )},
        ]}
      />
    </div>
  );
}
