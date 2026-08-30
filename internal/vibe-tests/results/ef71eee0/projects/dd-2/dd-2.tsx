import React from 'react';
import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';
import {Heading} from '@astryxdesign/core/Heading';
import {Divider} from '@astryxdesign/core/Divider';
import {StackItem} from '@astryxdesign/core/Stack';

const transactions = [
  {id: 1, description: 'Grocery Store', amount: -52.30, date: '2024-03-15', status: 'completed'},
  {id: 2, description: 'Salary Deposit', amount: 3500.00, date: '2024-03-14', status: 'completed'},
  {id: 3, description: 'Electric Bill', amount: -128.45, date: '2024-03-13', status: 'pending'},
  {id: 4, description: 'Restaurant', amount: -45.80, date: '2024-03-12', status: 'completed'},
  {id: 5, description: 'Refund - Online Order', amount: 29.99, date: '2024-03-11', status: 'failed'},
];

function getStatusVariant(status: string) {
  switch (status) {
    case 'completed': return 'success' as const;
    case 'pending': return 'warning' as const;
    case 'failed': return 'error' as const;
    default: return 'neutral' as const;
  }
}

export default function TransactionList() {
  return (
    <Card padding={3} maxWidth={600}>
      <VStack gap={3}>
        <Heading level={2}>Recent Transactions</Heading>
        <Divider />
        {transactions.map((tx, i) => (
          <React.Fragment key={tx.id}>
            <HStack gap={2} vAlign="center">
              <StackItem size="fill">
                <VStack gap={0.5}>
                  <Text weight="medium">{tx.description}</Text>
                  <Text type="supporting">{tx.date}</Text>
                </VStack>
              </StackItem>
              <VStack gap={0.5} hAlign="end">
                <Text weight="semibold" color={tx.amount >= 0 ? 'accent' : 'primary'}>
                  {tx.amount >= 0 ? '+' : ''}{tx.amount.toFixed(2)}
                </Text>
                <Badge label={tx.status} variant={getStatusVariant(tx.status)} />
              </VStack>
            </HStack>
            {i < transactions.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </VStack>
    </Card>
  );
}
