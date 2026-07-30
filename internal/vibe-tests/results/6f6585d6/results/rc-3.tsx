const CARDS = [
  {id: 1, title: 'Getting Started', desc: 'Learn the basics.', img: 'https://picsum.photos/seed/1/400/200', cat: 'Tutorial'},
  {id: 2, title: 'Advanced Patterns', desc: 'Component composition.', img: 'https://picsum.photos/seed/2/400/200', cat: 'Guide'},
  {id: 3, title: 'Performance Tips', desc: 'Optimize your app.', img: 'https://picsum.photos/seed/3/400/200', cat: 'Best Practice'},
  {id: 4, title: 'Accessibility', desc: 'Inclusive experiences.', img: 'https://picsum.photos/seed/4/400/200', cat: 'Guide'},
];

export default function ResponsiveCardGrid() {
  return (
    <div style={{fontFamily: 'system-ui'}}>
      <h2 style={{fontSize: 24, fontWeight: 700, marginBottom: 16}}>Resources</h2>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16}}>
        {CARDS.map(c => (
          <div key={c.id} style={{border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden'}}>
            <img src={c.img} alt={c.title} style={{width: '100%', height: 160, objectFit: 'cover'}} />
            <div style={{padding: 16}}>
              <span style={{fontSize: 12, padding: '2px 8px', background: '#eff6ff', borderRadius: 12}}>{c.cat}</span>
              <h3 style={{fontSize: 18, fontWeight: 600, marginTop: 8}}>{c.title}</h3>
              <p style={{color: '#6b7280', fontSize: 14}}>{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
