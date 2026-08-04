// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState, useEffect, useCallback} from 'react';

const images = [
  {src: 'https://picsum.photos/seed/prod1/800/600', alt: 'Product front view'},
  {src: 'https://picsum.photos/seed/prod2/800/600', alt: 'Product side view'},
  {src: 'https://picsum.photos/seed/prod3/800/600', alt: 'Product detail'},
  {src: 'https://picsum.photos/seed/prod4/800/600', alt: 'Product in use'},
];

export default function ProductGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const handlePrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const handleNext = () => setIndex((i) => (i + 1) % images.length);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) {return;}
    if (e.key === 'ArrowLeft') {handlePrev();}
    if (e.key === 'ArrowRight') {handleNext();}
    if (e.key === 'Escape') {setIsOpen(false);}
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div style={{padding: 32}}>
      <h2 style={{fontSize: 24, fontWeight: 700, marginBottom: 16}}>Product Photos</h2>
      <div style={{display: 'flex', gap: 12}}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => { setIndex(i); setIsOpen(true); }}
            style={{border: 'none', padding: 0, cursor: 'pointer', borderRadius: 8, overflow: 'hidden'}}
          >
            <img src={img.src} alt={img.alt} style={{width: 150, height: 112, objectFit: 'cover'}} />
          </button>
        ))}
      </div>
      {isOpen && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
          <button onClick={handlePrev} style={{position: 'absolute', left: 16, background: 'none', border: 'none', color: '#fff', fontSize: 32, cursor: 'pointer'}} aria-label="Previous image">&#8592;</button>
          <img src={images[index].src} alt={images[index].alt} style={{maxHeight: '80vh', maxWidth: '90vw', objectFit: 'contain'}} />
          <button onClick={handleNext} style={{position: 'absolute', right: 16, background: 'none', border: 'none', color: '#fff', fontSize: 32, cursor: 'pointer'}} aria-label="Next image">&#8594;</button>
          <div style={{position: 'absolute', bottom: 24, color: '#fff'}}>{index + 1} of {images.length}</div>
          <button onClick={() => setIsOpen(false)} style={{position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer'}} aria-label="Close">&#10005;</button>
        </div>
      )}
    </div>
  );
}
