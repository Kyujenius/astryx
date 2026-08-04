// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState} from 'react';
import {Dialog, DialogContent} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';

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

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold">Product Photos</h2>
      <div className="flex gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => { setIndex(i); setIsOpen(true); }}
            className="rounded-lg overflow-hidden border-2 border-transparent hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <img src={img.src} alt={img.alt} className="w-36 h-28 object-cover" />
          </button>
        ))}
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black">
          <div className="relative flex items-center justify-center min-h-[60vh]">
            <Button variant="ghost" className="absolute left-2 text-white" onClick={handlePrev} aria-label="Previous image">&#8592;</Button>
            <img src={images[index].src} alt={images[index].alt} className="max-h-[80vh] max-w-full object-contain" />
            <Button variant="ghost" className="absolute right-2 text-white" onClick={handleNext} aria-label="Next image">&#8594;</Button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {index + 1} of {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
