import {useState} from 'react';
import {Lightbox} from '@astryxdesign/core/Lightbox';

const media = [
  {type: 'image' as const, src: 'https://picsum.photos/800/600?1', alt: 'Photo 1'},
  {type: 'image' as const, src: 'https://picsum.photos/800/600?2', alt: 'Photo 2'},
  {type: 'video' as const, src: 'https://www.w3schools.com/html/mov_bbb.mp4', alt: 'Video 1'},
  {type: 'image' as const, src: 'https://picsum.photos/800/600?3', alt: 'Photo 3'},
  {type: 'video' as const, src: 'https://www.w3schools.com/html/movie.mp4', alt: 'Video 2'},
  {type: 'image' as const, src: 'https://picsum.photos/800/600?4', alt: 'Photo 4'},
];

export default function MediaGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {media.map((item, i) => (
          <button
            key={i}
            className="aspect-[4/3] overflow-hidden rounded-lg focus:ring-2 focus:ring-blue-500"
            onClick={() => setActiveIndex(i)}
            aria-label={`Open ${item.alt}`}
          >
            {item.type === 'image' ? (
              <img className="w-full h-full object-cover" src={item.src} alt={item.alt} />
            ) : (
              <video className="w-full h-full object-cover" src={item.src} muted />
            )}
          </button>
        ))}
      </div>
      {activeIndex !== null && (
        <Lightbox
          items={media.map((m) => ({src: m.src, alt: m.alt, type: m.type}))}
          startIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
}
