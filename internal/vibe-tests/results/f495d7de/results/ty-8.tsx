export default function ProfileCard() {
  return (
    <div style={{padding:32,border:'1px solid #e0e0e0',borderRadius:12,maxWidth:320,textAlign:'center'}}>
      <img
        src="https://i.pravatar.cc/150"
        alt="Jane Smith"
        style={{width:96,height:96,borderRadius:'50%',objectFit:'cover',marginBottom:16}}
      />
      <h2 style={{margin:'0 0 4px',fontSize:20}}>Jane Smith</h2>
      <p style={{margin:'0 0 12px',color:'#666'}}>Senior Product Designer</p>
      <div style={{display:'flex',justifyContent:'center',gap:6,marginBottom:12}}>
        {['Design','UX','Research'].map(tag=>(
          <span key={tag} style={{padding:'2px 10px',borderRadius:12,background:'#e8f0fe',color:'#1a73e8',fontSize:12}}>{tag}</span>
        ))}
      </div>
      <p style={{color:'#666',fontSize:14,margin:0}}>
        Passionate about creating intuitive interfaces that solve real problems.
      </p>
    </div>
  );
}
