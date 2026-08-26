import {useState} from 'react';
import {Lightbox} from '@astryxdesign/core/Lightbox';
import {Grid} from '@astryxdesign/core/Grid';
import {AspectRatio} from '@astryxdesign/core/AspectRatio';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  thumbnail: {
    cursor: 'pointer',
    borderRadius: 8,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const media = [
  {type: 'image', src: 'https://picsum.photos/800/600?1', alt: 'Gallery item 1'},
  {type: 'image', src: 'https://picsum.photos/800/600?2', alt: 'Gallery item 2'},
  {type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', alt: 'Video 1'},
  {type: 'image', src: 'https://picsum.photos/800/600?3', alt: 'Gallery item 3'},
  {type: 'video', src: 'https://www.w3schools.com/html/movie.mp4', alt: 'Video 2'},
  {type: 'image', src: 'https://picsum.photos/800/600?4', alt: 'Gallery item 4'},
];

export default function MediaGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <Grid columns={3} gap={2}>
        {media.map((item, i) => (
          <AspectRatio key={i} ratio={4 / 3}>
            <div
              {...stylex.props(styles.thumbnail)}
              onClick={() => setLightboxIndex(i)}
              role="button"
              tabIndex={0}
              aria-label={`Open ${item.alt}`}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(i)}
            >
              {item.type === 'image' ? (
                <img {...stylex.props(styles.img)} src={item.src} alt={item.alt} />
              ) : (
                <video {...stylex.props(styles.img)} src={item.src} muted />
              )}
            </div>
          </AspectRatio>
        ))}
      </Grid>
      {lightboxIndex !== null && (
        <Lightbox
          items={media.map((m) => ({
            src: m.src,
            alt: m.alt,
            type: m.type === 'video' ? 'video' : 'image',
          }))}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
