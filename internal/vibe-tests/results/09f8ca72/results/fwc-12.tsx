import {useState} from 'react';
import {Lightbox} from '@astryxdesign/core/Lightbox';

const images = [
  {src: 'https://picsum.photos/800/600?1', alt: 'Mountain landscape', caption: 'Mountain landscape at sunset'},
  {src: 'https://picsum.photos/800/600?2', alt: 'Ocean waves', caption: 'Ocean waves crashing on shore'},
  {src: 'https://picsum.photos/800/600?3', alt: 'Forest path', caption: 'A winding path through the forest'},
  {src: 'https://picsum.photos/800/600?4', alt: 'City skyline', caption: 'City skyline at dusk'},
  {src: 'https://picsum.photos/800/600?5', alt: 'Desert dunes', caption: 'Rolling sand dunes'},
  {src: 'https://picsum.photos/800/600?6', alt: 'Snowy peaks', caption: 'Snow-covered mountain peaks'},
];

export default function ImageGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const media = images.map((img) => ({
    src: img.src,
    alt: img.alt,
    caption: img.caption,
  }));

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3 p-4">
        {images.map((img, i) => (
          <div
            key={i}
            className="cursor-pointer rounded-lg overflow-hidden aspect-square"
            onClick={() => { setIndex(i); setIsOpen(true); }}
            role="button"
            tabIndex={0}
            aria-label={`View ${img.alt}`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setIndex(i); setIsOpen(true); }}}
          >
            <img className="w-full h-full object-cover" src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>
      <Lightbox
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        media={media}
        index={index}
        onIndexChange={setIndex}
      />
    </>
  );
}
