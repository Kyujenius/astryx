const transactions = [
  {id:1,desc:'Coffee Shop',amount:-4.50,date:'2024-01-15',status:'completed'},
  {id:2,desc:'Salary',amount:3500,date:'2024-01-14',status:'completed'},
  {id:3,desc:'Electric Bill',amount:-89.20,date:'2024-01-13',status:'pending'},
  {id:4,desc:'Freelance',amount:450,date:'2024-01-12',status:'completed'},
  {id:5,desc:'Groceries',amount:-67.30,date:'2024-01-11',status:'failed'},
];

const statusColors: Record<string,string> = {completed:'#4caf50',pending:'#ff9800',failed:'#f44336'};

export default function TransactionList() {
  return (
    <div style={{padding:20,border:'1px solid #e0e0e0',borderRadius:8,maxWidth:400}}>
      <h3 style={{margin:'0 0 16px'}}>Transactions</h3>
      {transactions.map((tx,i)=>(
        <div key={tx.id}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <p style={{margin:0,fontWeight:500}}>{tx.desc}</p>
              <p style={{margin:0,fontSize:12,color:'#666'}}>{tx.date}</p>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontWeight:'bold',color:tx.amount>0?'#4caf50':undefined}}>{tx.amount>0?'+':''}{tx.amount.toFixed(2)}</span>
              <span style={{fontSize:11,padding:'2px 8px',borderRadius:12,background:statusColors[tx.status]+'22',color:statusColors[tx.status]}}>{tx.status}</span>
            </div>
          </div>
          {i<transactions.length-1 && <hr style={{border:'none',borderTop:'1px solid #eee',margin:'12px 0'}} />}
        </div>
      ))}
    </div>
  );
}
