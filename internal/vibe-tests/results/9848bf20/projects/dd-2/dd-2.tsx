interface Transaction { id: string; description: string; amount: number; date: string; status: 'completed' | 'pending' | 'failed'; }

const transactions: Transaction[] = [
  {id: '1', description: 'Payment to Acme Corp', amount: -250.00, date: '2024-03-15', status: 'completed'},
  {id: '2', description: 'Refund from Store', amount: 45.99, date: '2024-03-14', status: 'pending'},
  {id: '3', description: 'Subscription renewal', amount: -9.99, date: '2024-03-13', status: 'completed'},
  {id: '4', description: 'Transfer to savings', amount: -500.00, date: '2024-03-12', status: 'failed'},
  {id: '5', description: 'Freelance payment', amount: 1200.00, date: '2024-03-11', status: 'completed'},
];

const statusColors = {completed: '#16a34a', pending: '#ca8a04', failed: '#dc2626'};

export default function TransactionList() {
  return (
    <div style={{padding: '24px', fontFamily: 'system-ui'}}>
      <h2 style={{marginBottom: '16px'}}>Transactions</h2>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{borderBottom: '2px solid #e0e0e0', textAlign: 'left'}}>
            <th style={{padding: '8px'}}>Description</th>
            <th style={{padding: '8px', textAlign: 'right'}}>Amount</th>
            <th style={{padding: '8px'}}>Date</th>
            <th style={{padding: '8px'}}>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id} style={{borderBottom: '1px solid #e0e0e0'}}>
              <td style={{padding: '8px'}}>{tx.description}</td>
              <td style={{padding: '8px', textAlign: 'right', color: tx.amount >= 0 ? '#16a34a' : 'inherit'}}>{tx.amount >= 0 ? '+' : ''}{tx.amount.toFixed(2)}</td>
              <td style={{padding: '8px'}}>{tx.date}</td>
              <td style={{padding: '8px'}}><span style={{display: 'inline-flex', alignItems: 'center', gap: '6px'}}><span style={{width: '8px', height: '8px', borderRadius: '50%', background: statusColors[tx.status]}} />{tx.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
