import React from 'react';

const transactions = [
  {id: 1, desc: 'Grocery Store', amount: -52.30, date: '2024-03-15', status: 'completed'},
  {id: 2, desc: 'Salary Deposit', amount: 3500.00, date: '2024-03-14', status: 'completed'},
  {id: 3, desc: 'Electric Bill', amount: -128.45, date: '2024-03-13', status: 'pending'},
  {id: 4, desc: 'Restaurant', amount: -45.80, date: '2024-03-12', status: 'completed'},
  {id: 5, desc: 'Refund', amount: 29.99, date: '2024-03-11', status: 'failed'},
];

const statusColors: Record<string,string> = {completed: '#22c55e', pending: '#f59e0b', failed: '#ef4444'};

export default function TransactionList() {
  return (
    <div style={{maxWidth: 560, padding: 24, border: '1px solid #ddd', borderRadius: 8}}>
      <h2 style={{margin: '0 0 16px', fontSize: 20, fontWeight: 600}}>Recent Transactions</h2>
      {transactions.map((tx, i) => (
        <React.Fragment key={tx.id}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0'}}>
            <div><p style={{fontWeight: 500, margin: 0}}>{tx.desc}</p><p style={{color: '#888', fontSize: 14, margin: 0}}>{tx.date}</p></div>
            <div style={{textAlign: 'right'}}>
              <p style={{fontWeight: 600, margin: 0, color: tx.amount >= 0 ? '#22c55e' : 'inherit'}}>{tx.amount >= 0 ? '+' : ''}{tx.amount.toFixed(2)}</p>
              <span style={{fontSize: 12, padding: '2px 8px', borderRadius: 12, background: statusColors[tx.status] + '20', color: statusColors[tx.status]}}>{tx.status}</span>
            </div>
          </div>
          {i < transactions.length - 1 && <hr style={{border: 'none', borderTop: '1px solid #eee', margin: 0}} />}
        </React.Fragment>
      ))}
    </div>
  );
}
