import {Lightbox} from '@astryxdesign/core/Lightbox';
import {useState} from 'react';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '12px',
    padding: '16px',
  },
  item: {
    cursor: 'pointer',
    borderRadius: '8px',
    overflow: 'hidden',
    aspectRatio: '16/9',
    objectFit: 'cover',
    width: '100%',
  },
});

type MediaItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
  alt: string;
};

const mediaItems: MediaItem[] = [
  {id: '1', type: 'image', src: '/photos/landscape.jpg', thumbnail: '/photos/landscape-thumb.jpg', alt: 'Landscape'},
  {id: '2', type: 'video', src: '/videos/demo.mp4', thumbnail: '/videos/demo-thumb.jpg', alt: 'Demo video'},
  {id: '3', type: 'image', src: '/photos/portrait.jpg', thumbnail: '/photos/portrait-thumb.jpg', alt: 'Portrait'},
  {id: '4', type: 'image', src: '/photos/city.jpg', thumbnail: '/photos/city-thumb.jpg', alt: 'City skyline'},
  {id: '5', type: 'video', src: '/videos/tutorial.mp4', thumbnail: '/videos/tutorial-thumb.jpg', alt: 'Tutorial'},
  {id: '6', type: 'image', src: '/photos/nature.jpg', thumbnail: '/photos/nature-thumb.jpg', alt: 'Nature scene'},
];

export default function MediaGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div {...stylex.props(styles.grid)}>
        {mediaItems.map((item, index) => (
          <img
            key={item.id}
            src={item.thumbnail}
            alt={item.alt}
            onClick={() => setLightboxIndex(index)}
            {...stylex.props(styles.item)}
          />
        ))}
      </div>
      {lightboxIndex !== null && (
        <Lightbox
          items={mediaItems.map(item => ({
            src: item.src,
            alt: item.alt,
            type: item.type,
          }))}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
