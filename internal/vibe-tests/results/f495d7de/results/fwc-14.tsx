import {useState} from 'react';

const media = [
  {type: 'image', src: 'https://picsum.photos/800/600?1', alt: 'Photo 1'},
  {type: 'image', src: 'https://picsum.photos/800/600?2', alt: 'Photo 2'},
  {type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', alt: 'Video 1'},
  {type: 'image', src: 'https://picsum.photos/800/600?3', alt: 'Photo 3'},
  {type: 'video', src: 'https://www.w3schools.com/html/movie.mp4', alt: 'Video 2'},
  {type: 'image', src: 'https://picsum.photos/800/600?4', alt: 'Photo 4'},
];

export default function MediaGallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8}}>
        {media.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{border: 'none', padding: 0, cursor: 'pointer', aspectRatio: '4/3', overflow: 'hidden', borderRadius: 8}}
          >
            {item.type === 'image' ? (
              <img src={item.src} alt={item.alt} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            ) : (
              <video src={item.src} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            )}
          </button>
        ))}
      </div>
      {active !== null && (
        <div
          style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}
          onClick={() => setActive(null)}
        >
          <button onClick={() => setActive((active - 1 + media.length) % media.length)} style={{color: '#fff', fontSize: 24, background: 'none', border: 'none', cursor: 'pointer', padding: 20}}>&#9664;</button>
          <div onClick={(e) => e.stopPropagation()} style={{maxWidth: '80%', maxHeight: '80%'}}>
            {media[active].type === 'image' ? (
              <img src={media[active].src} alt={media[active].alt} style={{maxWidth: '100%', maxHeight: '80vh'}} />
            ) : (
              <video src={media[active].src} controls autoPlay style={{maxWidth: '100%', maxHeight: '80vh'}} />
            )}
          </div>
          <button onClick={() => setActive((active + 1) % media.length)} style={{color: '#fff', fontSize: 24, background: 'none', border: 'none', cursor: 'pointer', padding: 20}}>&#9654;</button>
        </div>
      )}
    </>
  );
}
