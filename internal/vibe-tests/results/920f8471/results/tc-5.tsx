export default function CustomThemedCard() {
  const cardStyle = {
    border: '2px solid transparent',
    borderRadius: 16,
    padding: 24,
    backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(135deg, #667eea, #764ba2)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    marginBottom: 16,
  };

  return (
    <div style={{padding: 32}}>
      <div style={cardStyle}>
        <h2>Gradient Border Card</h2>
        <p>This card uses a gradient border and increased border-radius via CSS background-clip trick.</p>
      </div>
      <div style={cardStyle}>
        <h2>Another Themed Card</h2>
        <p>Both cards share the same custom appearance.</p>
      </div>
    </div>
  );
}
