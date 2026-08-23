import {useState} from 'react';
import {Lightbox} from '@astryxdesign/core/Lightbox';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  gallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 12,
  },
  item: {
    cursor: 'pointer',
    borderRadius: 8,
    overflow: 'hidden',
    aspectRatio: '16/9',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const media = [
  {type: 'image' as const, src: 'https://picsum.photos/800/600?1', alt: 'Photo 1'},
  {type: 'video' as const, src: 'https://www.w3schools.com/html/mov_bbb.mp4', alt: 'Video 1'},
  {type: 'image' as const, src: 'https://picsum.photos/800/600?2', alt: 'Photo 2'},
  {type: 'image' as const, src: 'https://picsum.photos/800/600?3', alt: 'Photo 3'},
  {type: 'video' as const, src: 'https://www.w3schools.com/html/movie.mp4', alt: 'Video 2'},
  {type: 'image' as const, src: 'https://picsum.photos/800/600?4', alt: 'Photo 4'},
];

export default function MediaGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const lightboxMedia = media.map((m) => ({
    type: m.type,
    src: m.src,
    alt: m.alt,
  }));

  return (
    <>
      <div {...stylex.props(styles.gallery)}>
        {media.map((item, i) => (
          <div
            key={i}
            {...stylex.props(styles.item)}
            onClick={() => {
              setIndex(i);
              setIsOpen(true);
            }}
            role="button"
            tabIndex={0}
            aria-label={`Open ${item.alt}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIndex(i);
                setIsOpen(true);
              }
            }}
          >
            {item.type === 'image' ? (
              <img {...stylex.props(styles.image)} src={item.src} alt={item.alt} />
            ) : (
              <video {...stylex.props(styles.video)} src={item.src} muted />
            )}
          </div>
        ))}
      </div>
      <Lightbox
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        media={lightboxMedia}
        index={index}
        onIndexChange={setIndex}
      />
    </>
  );
}
