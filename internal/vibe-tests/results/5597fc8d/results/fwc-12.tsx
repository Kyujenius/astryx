// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Thumbnail} from '@astryxdesign/core/Thumbnail';
import {Lightbox} from '@astryxdesign/core/Lightbox';

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

  const media = images.map(img => ({
    type: 'image' as const,
    src: img.src,
    alt: img.alt,
    caption: img.caption,
  }));

  return (
    <>
      <div className="grid grid-cols-3 gap-2 p-4">
        {images.map((img, i) => (
          <Thumbnail
            key={i}
            src={img.src}
            alt={img.alt}
            onClick={() => {
              setActiveIndex(i);
              setIsOpen(true);
            }}
          />
        ))}
      </div>
      <Lightbox
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        media={media}
        index={activeIndex}
        onIndexChange={setActiveIndex}
      />
    </>
  );
}
