import {useState} from 'react';

type MediaItem = {id: string; type: 'image' | 'video'; src: string; thumbnail: string; alt: string};

const media: MediaItem[] = [
  {id: '1', type: 'image', src: '/photos/landscape.jpg', thumbnail: '/photos/landscape-thumb.jpg', alt: 'Landscape'},
  {id: '2', type: 'video', src: '/videos/demo.mp4', thumbnail: '/videos/demo-thumb.jpg', alt: 'Demo'},
  {id: '3', type: 'image', src: '/photos/portrait.jpg', thumbnail: '/photos/portrait-thumb.jpg', alt: 'Portrait'},
  {id: '4', type: 'image', src: '/photos/city.jpg', thumbnail: '/photos/city-thumb.jpg', alt: 'City'},
  {id: '5', type: 'video', src: '/videos/tutorial.mp4', thumbnail: '/videos/tutorial-thumb.jpg', alt: 'Tutorial'},
  {id: '6', type: 'image', src: '/photos/nature.jpg', thumbnail: '/photos/nature-thumb.jpg', alt: 'Nature'},
];

const styles = {
  grid: {display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', padding: '16px'} as const,
  thumb: {width: '100%', aspectRatio: '16/9', objectFit: 'cover' as const, borderRadius: '8px', cursor: 'pointer', border: 'none', padding: 0, background: 'none'},
  overlay: {position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, flexDirection: 'column' as const, gap: '16px'},
  closeBtn: {position: 'absolute' as const, top: '16px', right: '16px', background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer'},
};

export default function MediaGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? media[activeIndex] : null;

  return (
    <>
      <div style={styles.grid}>
        {media.map((item, idx) => (
          <button key={item.id} style={styles.thumb} onClick={() => setActiveIndex(idx)}>
            <img src={item.thumbnail} alt={item.alt} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}} />
          </button>
        ))}
      </div>
      {active && (
        <div style={styles.overlay} onClick={() => setActiveIndex(null)}>
          <button style={styles.closeBtn} onClick={() => setActiveIndex(null)}>&times;</button>
          {active.type === 'image' ? (
            <img src={active.src} alt={active.alt} style={{maxHeight: '80vh', maxWidth: '90vw', objectFit: 'contain'}} onClick={e => e.stopPropagation()} />
          ) : (
            <video src={active.src} controls style={{maxHeight: '80vh', maxWidth: '90vw'}} onClick={e => e.stopPropagation()} />
          )}
          <div style={{display: 'flex', gap: '8px'}}>
            <button disabled={activeIndex === 0} onClick={e => {e.stopPropagation(); setActiveIndex(i => i !== null ? i - 1 : null);}} style={{padding: '8px 16px', background: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Previous</button>
            <button disabled={activeIndex === media.length - 1} onClick={e => {e.stopPropagation(); setActiveIndex(i => i !== null ? i + 1 : null);}} style={{padding: '8px 16px', background: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Next</button>
          </div>
        </div>
      )}
    </>
  );
}
