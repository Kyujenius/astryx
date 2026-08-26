import {useState} from 'react';

const steps = ['Personal', 'Address', 'Review'];

export default function FormWizard() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  return (
    <div style={{padding: 24, maxWidth: 400, border: '1px solid #e0e0e0', borderRadius: 8}}>
      <h2 style={{margin: '0 0 8px'}}>{steps[step]}</h2>
      <div style={{height: 4, background: '#e0e0e0', borderRadius: 2, marginBottom: 16}}>
        <div style={{height: '100%', width: `${((step+1)/steps.length)*100}%`, background: '#0066cc', borderRadius: 2, transition: 'width 0.3s'}} />
      </div>
      {step === 0 && (
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <label>Name<input value={name} onChange={e=>setName(e.target.value)} style={{display:'block',width:'100%',padding:'6px 10px',border:'1px solid #ccc',borderRadius:4}} /></label>
          <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} style={{display:'block',width:'100%',padding:'6px 10px',border:'1px solid #ccc',borderRadius:4}} /></label>
        </div>
      )}
      {step === 1 && (
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <label>Address<input value={address} onChange={e=>setAddress(e.target.value)} style={{display:'block',width:'100%',padding:'6px 10px',border:'1px solid #ccc',borderRadius:4}} /></label>
          <label>City<input value={city} onChange={e=>setCity(e.target.value)} style={{display:'block',width:'100%',padding:'6px 10px',border:'1px solid #ccc',borderRadius:4}} /></label>
        </div>
      )}
      {step === 2 && <div style={{fontSize:14}}><p>Name: {name}</p><p>Email: {email}</p><p>Address: {address}, {city}</p></div>}
      <div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:16}}>
        {step > 0 && <button onClick={()=>setStep(step-1)} style={{padding:'6px 16px',border:'1px solid #ccc',borderRadius:4,background:'#fff',cursor:'pointer'}}>Back</button>}
        {step < 2 ? <button onClick={()=>setStep(step+1)} style={{padding:'6px 16px',background:'#0066cc',color:'#fff',border:'none',borderRadius:4,cursor:'pointer'}}>Next</button>
        : <button onClick={()=>alert('Submitted!')} style={{padding:'6px 16px',background:'#0066cc',color:'#fff',border:'none',borderRadius:4,cursor:'pointer'}}>Submit</button>}
      </div>
    </div>
  );
}
