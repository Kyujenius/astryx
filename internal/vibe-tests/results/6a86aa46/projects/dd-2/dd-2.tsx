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

const statusColors: Record<string, { bg: string; color: string }> = {
  completed: { bg: '#d4edda', color: '#155724' },
  pending: { bg: '#fff3cd', color: '#856404' },
  failed: { bg: '#f8d7da', color: '#721c24' },
};

export default function TransactionList() {
  return (
    <div style={{ maxWidth: 560, padding: 16 }}>
      {transactions.map((tx) => (
        <div key={tx.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, marginBottom: 8, border: '1px solid #eee', borderRadius: 8, background: 'white' }}>
          <div>
            <p style={{ fontWeight: 500, margin: 0 }}>{tx.description}</p>
            <p style={{ fontSize: 13, color: '#666', margin: '4px 0 0' }}>{tx.date}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontWeight: 600, color: tx.amount >= 0 ? '#16a34a' : undefined }}>
              {tx.amount >= 0 ? '+' : ''}{tx.amount.toFixed(2)}
            </span>
            <span style={{ padding: '2px 8px', borderRadius: 12, fontSize: 12, ...statusColors[tx.status] }}>
              {tx.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
