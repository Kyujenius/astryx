import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';

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

const statusVariant: Record<string, 'green' | 'yellow' | 'red'> = {
  completed: 'green',
  pending: 'yellow',
  failed: 'red',
};

export default function TransactionList() {
  return (
    <VStack gap={2} padding={4} maxWidth={600}>
      {transactions.map((tx) => (
        <Card key={tx.id} padding={3}>
          <HStack gap={3} hAlign="between" vAlign="center">
            <VStack gap={0.5}>
              <Text weight="medium">{tx.description}</Text>
              <Text type="supporting" color="secondary">{tx.date}</Text>
            </VStack>
            <HStack gap={2} vAlign="center">
              <Text weight="semibold" color={tx.amount >= 0 ? 'primary' : 'secondary'}>
                {tx.amount >= 0 ? '+' : ''}{tx.amount.toFixed(2)}
              </Text>
              <Badge variant={statusVariant[tx.status]} label={tx.status} />
            </VStack>
          </HStack>
        </Card>
      ))}
    </VStack>
  );
}
