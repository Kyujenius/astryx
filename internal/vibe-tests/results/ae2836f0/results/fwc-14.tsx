import {Lightbox} from '@astryxdesign/core/Lightbox';
import {useState} from 'react';

type MediaItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
  alt: string;
};

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

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4">
        {media.map((item, idx) => (
          <button
            key={item.id}
            className="relative aspect-video rounded-lg overflow-hidden hover:ring-2 ring-blue-500 transition-shadow"
            onClick={() => setActiveIndex(idx)}
          >
            <img src={item.thumbnail} alt={item.alt} className="w-full h-full object-cover" />
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <span className="text-white text-2xl">&#9654;</span>
              </div>
            )}
          </button>
        ))}
      </div>
      {activeIndex !== null && (
        <Lightbox
          items={media.map(m => ({src: m.src, alt: m.alt, type: m.type}))}
          startIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
}
