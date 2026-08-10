// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Dialog, DialogContent} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {X, ChevronLeft, ChevronRight} from 'lucide-react';

const images = [
  {src: 'https://picsum.photos/seed/1/800/600', alt: 'Mountain landscape', caption: 'A beautiful mountain landscape'},
  {src: 'https://picsum.photos/seed/2/800/600', alt: 'Ocean sunset', caption: 'Sunset over the ocean'},
  {src: 'https://picsum.photos/seed/3/800/600', alt: 'Forest path', caption: 'A winding forest path'},
  {src: 'https://picsum.photos/seed/4/800/600', alt: 'City skyline', caption: 'Downtown city skyline'},
  {src: 'https://picsum.photos/seed/5/800/600', alt: 'Desert dunes', caption: 'Sand dunes at golden hour'},
  {src: 'https://picsum.photos/seed/6/800/600', alt: 'Snowy peaks', caption: 'Snow-covered mountain peaks'},
];

export default function ImageGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className="grid grid-cols-3 gap-2 p-4">
        {images.map((img, i) => (
          <button
            key={i}
            className="overflow-hidden rounded-lg aspect-square"
            onClick={() => { setActiveIndex(i); setIsOpen(true); }}
          >
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black/95">
          <div className="relative flex flex-col items-center justify-center min-h-[80vh]">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            <img
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              className="max-h-[70vh] object-contain"
            />
            <p className="text-white mt-4 text-sm">{images[activeIndex].caption}</p>
            <div className="absolute inset-y-0 left-4 flex items-center">
              <Button variant="ghost" size="icon" className="text-white" onClick={() => setActiveIndex(i => (i - 1 + images.length) % images.length)}>
                <ChevronLeft className="h-8 w-8" />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center">
              <Button variant="ghost" size="icon" className="text-white" onClick={() => setActiveIndex(i => (i + 1) % images.length)}>
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
