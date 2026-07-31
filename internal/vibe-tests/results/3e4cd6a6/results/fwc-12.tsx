import {useState} from 'react';

const images = [
  {src: 'https://picsum.photos/800/600?1', alt: 'Mountain landscape', caption: 'Mountain landscape at sunset'},
  {src: 'https://picsum.photos/800/600?2', alt: 'Ocean waves', caption: 'Ocean waves crashing on shore'},
  {src: 'https://picsum.photos/800/600?3', alt: 'Forest path', caption: 'A winding path through the forest'},
  {src: 'https://picsum.photos/800/600?4', alt: 'City skyline', caption: 'City skyline at dusk'},
  {src: 'https://picsum.photos/800/600?5', alt: 'Desert dunes', caption: 'Rolling sand dunes'},
  {src: 'https://picsum.photos/800/600?6', alt: 'Snowy peaks', caption: 'Snow-covered mountain peaks'},
];

export default function ImageGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12, padding: 16}}>
        {images.map((img, i) => (
          <button key={i} onClick={() => setSelectedIndex(i)} style={{border: 'none', padding: 0, cursor: 'pointer', borderRadius: 8, overflow: 'hidden', aspectRatio: '1/1'}} aria-label={`View ${img.alt}`}>
            <img src={img.src} alt={img.alt} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </button>
        ))}
      </div>
      {selectedIndex !== null && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1000}} onClick={() => setSelectedIndex(null)} role="dialog" aria-label="Image lightbox">
          <button onClick={() => setSelectedIndex(null)} style={{position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: 'white', fontSize: 24, cursor: 'pointer'}} aria-label="Close lightbox">\u2715</button>
          <img src={images[selectedIndex].src} alt={images[selectedIndex].alt} style={{maxWidth: '90%', maxHeight: '80vh', objectFit: 'contain'}} />
          <p style={{color: 'white', marginTop: 16}}>{images[selectedIndex].caption}</p>
        </div>
      )}
    </>
  );
}
