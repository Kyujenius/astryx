// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const images = [
  {src: 'https://picsum.photos/seed/1/800/600', alt: 'Mountain landscape', caption: 'A beautiful mountain landscape'},
  {src: 'https://picsum.photos/seed/2/800/600', alt: 'Ocean sunset', caption: 'Sunset over the ocean'},
  {src: 'https://picsum.photos/seed/3/800/600', alt: 'Forest path', caption: 'A winding forest path'},
  {src: 'https://picsum.photos/seed/4/800/600', alt: 'City skyline', caption: 'Downtown city skyline'},
  {src: 'https://picsum.photos/seed/5/800/600', alt: 'Desert dunes', caption: 'Sand dunes at golden hour'},
  {src: 'https://picsum.photos/seed/6/800/600', alt: 'Snowy peaks', caption: 'Snow-covered mountain peaks'},
];

export default function ImageGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: 16}}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            style={{border: 'none', padding: 0, cursor: 'pointer', borderRadius: 8, overflow: 'hidden', aspectRatio: '1'}}
          >
            <img src={img.src} alt={img.alt} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </button>
        ))}
      </div>
      {lightboxIndex !== null && (
        <div
          style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            style={{position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: 'white', fontSize: 24, cursor: 'pointer'}}
            aria-label="Close"
          >
            ✕
          </button>
          <img
            src={images[lightboxIndex].src}
            alt={images[lightboxIndex].alt}
            style={{maxHeight: '70vh', maxWidth: '90vw', objectFit: 'contain'}}
            onClick={e => e.stopPropagation()}
          />
          <p style={{color: 'white', marginTop: 16, fontSize: 14}}>{images[lightboxIndex].caption}</p>
        </div>
      )}
    </>
  );
}
