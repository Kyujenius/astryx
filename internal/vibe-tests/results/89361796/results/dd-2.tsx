import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';
import {Divider} from '@astryxdesign/core/Divider';

const transactions = [
  {id: 1, description: 'Coffee Shop', amount: -4.50, date: '2024-01-15', status: 'completed'},
  {id: 2, description: 'Salary', amount: 3500.00, date: '2024-01-14', status: 'completed'},
  {id: 3, description: 'Electric Bill', amount: -89.20, date: '2024-01-13', status: 'pending'},
  {id: 4, description: 'Freelance Work', amount: 450.00, date: '2024-01-12', status: 'completed'},
  {id: 5, description: 'Groceries', amount: -67.30, date: '2024-01-11', status: 'failed'},
];

function StatusBadge({status}: {status: string}) {
  const variant = status === 'completed' ? 'success' : status === 'pending' ? 'warning' : 'error';
  return <Badge variant={variant}>{status}</Badge>;
}

export default function TransactionList() {
  return (
    <Card padding={3}>
      <VStack gap={2}>
        <Heading level={3}>Transactions</Heading>
        {transactions.map((tx, i) => (
          <VStack key={tx.id} gap={1}>
            <HStack justify="between" align="center">
              <VStack gap={0}>
                <Text weight="medium">{tx.description}</Text>
                <Text size="sm" color="secondary">{tx.date}</Text>
              </VStack>
              <HStack gap={2} align="center">
                <Text weight="bold" color={tx.amount > 0 ? 'success' : undefined}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                </Text>
                <StatusBadge status={tx.status} />
              </HStack>
            </HStack>
            {i < transactions.length - 1 && <Divider />}
          </VStack>
        ))}
      </VStack>
    </Card>
  );
}
