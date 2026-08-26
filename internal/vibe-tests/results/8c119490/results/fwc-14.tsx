import {useState} from 'react';
import {Dialog, DialogContent} from '@/components/ui/dialog';

const media = [
  {type: 'image', src: 'https://picsum.photos/800/600?1', alt: 'Photo 1'},
  {type: 'image', src: 'https://picsum.photos/800/600?2', alt: 'Photo 2'},
  {type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', alt: 'Video 1'},
  {type: 'image', src: 'https://picsum.photos/800/600?3', alt: 'Photo 3'},
  {type: 'video', src: 'https://www.w3schools.com/html/movie.mp4', alt: 'Video 2'},
  {type: 'image', src: 'https://picsum.photos/800/600?4', alt: 'Photo 4'},
];

export default function MediaGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? media[activeIndex] : null;

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {media.map((item, i) => (
          <button
            key={i}
            className="aspect-[4/3] overflow-hidden rounded-lg hover:opacity-80 transition-opacity"
            onClick={() => setActiveIndex(i)}
          >
            {item.type === 'image' ? (
              <img className="w-full h-full object-cover" src={item.src} alt={item.alt} />
            ) : (
              <video className="w-full h-full object-cover" src={item.src} muted />
            )}
          </button>
        ))}
      </div>
      <Dialog open={activeIndex !== null} onOpenChange={() => setActiveIndex(null)}>
        <DialogContent className="max-w-4xl">
          {active?.type === 'image' ? (
            <img className="w-full rounded" src={active.src} alt={active.alt} />
          ) : active ? (
            <video className="w-full rounded" src={active.src} controls autoPlay />
          ) : null}
          <div className="flex justify-between mt-2">
            <button
              className="px-3 py-1 rounded bg-secondary"
              onClick={() => setActiveIndex((activeIndex! - 1 + media.length) % media.length)}
            >
              Prev
            </button>
            <button
              className="px-3 py-1 rounded bg-secondary"
              onClick={() => setActiveIndex((activeIndex! + 1) % media.length)}
            >
              Next
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
