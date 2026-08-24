import {Dialog, DialogContent} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
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

export default function MediaGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? media[activeIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4">
        {media.map((item, idx) => (
          <button key={item.id} className="relative aspect-video rounded-lg overflow-hidden hover:ring-2 ring-primary" onClick={() => setActiveIndex(idx)}>
            <img src={item.thumbnail} alt={item.alt} className="w-full h-full object-cover" />
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <span className="text-white text-2xl">&#9654;</span>
              </div>
            )}
          </button>
        ))}
      </div>
      <Dialog open={activeIndex !== null} onOpenChange={() => setActiveIndex(null)}>
        <DialogContent className="max-w-4xl">
          {active && (
            <div className="flex flex-col items-center gap-4">
              {active.type === 'image' ? (
                <img src={active.src} alt={active.alt} className="max-h-[70vh] object-contain" />
              ) : (
                <video src={active.src} controls className="max-h-[70vh]" />
              )}
              <div className="flex gap-2">
                <Button variant="outline" disabled={activeIndex === 0} onClick={() => setActiveIndex(i => i !== null ? i - 1 : null)}>Previous</Button>
                <Button variant="outline" disabled={activeIndex === media.length - 1} onClick={() => setActiveIndex(i => i !== null ? i + 1 : null)}>Next</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
