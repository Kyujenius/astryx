export default function Hero() {
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:24,padding:'80px 20px',textAlign:'center',fontFamily:'system-ui'}}>
      <h1 style={{fontSize:48,fontWeight:700,letterSpacing:'-0.02em',margin:0}}>Build faster with Astryx</h1>
      <p style={{fontSize:20,color:'#666',maxWidth:500,lineHeight:1.6,margin:0}}>A design system built for speed, accessibility, and consistency. Ship beautiful interfaces without starting from scratch.</p>
      <button style={{padding:'14px 28px',borderRadius:8,background:'#0066cc',color:'white',border:'none',cursor:'pointer',fontSize:16,fontWeight:600}}>Get Started</button>
    </div>
  );
}
