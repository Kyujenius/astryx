import {useState} from 'react';

const media = [
  {type: 'image' as const, src: 'https://picsum.photos/800/600?1', alt: 'Photo 1'},
  {type: 'video' as const, src: 'https://www.w3schools.com/html/mov_bbb.mp4', alt: 'Video 1'},
  {type: 'image' as const, src: 'https://picsum.photos/800/600?2', alt: 'Photo 2'},
  {type: 'image' as const, src: 'https://picsum.photos/800/600?3', alt: 'Photo 3'},
  {type: 'video' as const, src: 'https://www.w3schools.com/html/movie.mp4', alt: 'Video 2'},
  {type: 'image' as const, src: 'https://picsum.photos/800/600?4', alt: 'Photo 4'},
];

export default function MediaGallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const current = media[index];

  return (
    <>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8}}>
        {media.map((item, i) => (
          <button key={i} onClick={() => {setIndex(i); setOpen(true);}} style={{border: 'none', padding: 0, cursor: 'pointer', aspectRatio: '16/9', overflow: 'hidden', borderRadius: 8}}>
            {item.type === 'image' ? <img src={item.src} alt={item.alt} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : <video src={item.src} style={{width: '100%', height: '100%', objectFit: 'cover'}} muted />}
          </button>
        ))}
      </div>
      {open && (
        <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}} onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{maxWidth: '90vw', maxHeight: '90vh'}}>
            {current.type === 'image' ? <img src={current.src} alt={current.alt} style={{maxWidth: '100%', maxHeight: '80vh'}} /> : <video src={current.src} controls style={{maxWidth: '100%', maxHeight: '80vh'}} />}
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 16}}>
              <button onClick={() => setIndex((i) => (i - 1 + media.length) % media.length)} style={{color: '#fff', padding: '8px 16px', border: '1px solid #fff', borderRadius: 4, background: 'none', cursor: 'pointer'}}>Prev</button>
              <button onClick={() => setIndex((i) => (i + 1) % media.length)} style={{color: '#fff', padding: '8px 16px', border: '1px solid #fff', borderRadius: 4, background: 'none', cursor: 'pointer'}}>Next</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
