import {useState} from 'react';
import {Dialog, DialogContent} from '@/components/ui/dialog';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
}

const media: MediaItem[] = [
  {type: 'image', src: 'https://picsum.photos/800/600?1', alt: 'Photo 1'},
  {type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', alt: 'Video 1'},
  {type: 'image', src: 'https://picsum.photos/800/600?2', alt: 'Photo 2'},
  {type: 'image', src: 'https://picsum.photos/800/600?3', alt: 'Photo 3'},
  {type: 'video', src: 'https://www.w3schools.com/html/movie.mp4', alt: 'Video 2'},
  {type: 'image', src: 'https://picsum.photos/800/600?4', alt: 'Photo 4'},
];

export default function MediaGallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const current = media[index];

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {media.map((item, i) => (
          <button
            key={i}
            className="aspect-video overflow-hidden rounded-lg"
            onClick={() => { setIndex(i); setOpen(true); }}
          >
            {item.type === 'image' ? (
              <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
            ) : (
              <video src={item.src} className="w-full h-full object-cover" muted />
            )}
          </button>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          {current?.type === 'image' ? (
            <img src={current.src} alt={current.alt} className="w-full rounded" />
          ) : (
            <video src={current?.src} controls className="w-full rounded" />
          )}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setIndex((i) => (i - 1 + media.length) % media.length)}
              className="px-4 py-2 border rounded"
            >Previous</button>
            <button
              onClick={() => setIndex((i) => (i + 1) % media.length)}
              className="px-4 py-2 border rounded"
            >Next</button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
