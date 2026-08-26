import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';
import {Divider} from '@astryxdesign/core/Divider';

const transactions = [
  {id: 1, desc: 'Coffee Shop', amount: -4.50, date: '2024-01-15', status: 'completed'},
  {id: 2, desc: 'Salary', amount: 3500, date: '2024-01-14', status: 'completed'},
  {id: 3, desc: 'Electric Bill', amount: -89.20, date: '2024-01-13', status: 'pending'},
  {id: 4, desc: 'Freelance', amount: 450, date: '2024-01-12', status: 'completed'},
  {id: 5, desc: 'Groceries', amount: -67.30, date: '2024-01-11', status: 'failed'},
];

export default function TransactionList() {
  return (
    <Card padding={3}>
      <div className="flex flex-col gap-3">
        <Heading level={3}>Transactions</Heading>
        {transactions.map((tx, i) => (
          <div key={tx.id}>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <Text weight="medium">{tx.desc}</Text>
                <Text size="sm" color="secondary">{tx.date}</Text>
              </div>
              <div className="flex items-center gap-2">
                <Text weight="bold" color={tx.amount > 0 ? 'success' : undefined}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                </Text>
                <Badge variant={tx.status === 'completed' ? 'success' : tx.status === 'pending' ? 'warning' : 'error'}>
                  {tx.status}
                </Badge>
              </div>
            </div>
            {i < transactions.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    </Card>
  );
}
