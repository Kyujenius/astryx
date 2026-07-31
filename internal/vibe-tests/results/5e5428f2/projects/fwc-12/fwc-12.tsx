import {useState} from 'react';
import {Dialog, DialogContent} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';

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
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3 p-4">
        {images.map((img, i) => (
          <button
            key={i}
            className="overflow-hidden rounded-lg aspect-square cursor-pointer border-0 p-0"
            onClick={() => setSelectedIndex(i)}
            aria-label={`View ${img.alt}`}
          >
            <img className="w-full h-full object-cover" src={img.src} alt={img.alt} />
          </button>
        ))}
      </div>
      <Dialog open={selectedIndex !== null} onOpenChange={(open) => { if (!open) setSelectedIndex(null); }}>
        <DialogContent className="max-w-4xl p-0">
          {selectedIndex !== null && (
            <div className="flex flex-col items-center">
              <img className="w-full max-h-[80vh] object-contain" src={images[selectedIndex].src} alt={images[selectedIndex].alt} />
              <p className="p-4 text-center text-muted-foreground">{images[selectedIndex].caption}</p>
              <Button variant="ghost" className="absolute top-2 right-2" onClick={() => setSelectedIndex(null)}>
                \u2715
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
