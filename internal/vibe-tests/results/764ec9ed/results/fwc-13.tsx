// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState} from 'react';
import {Lightbox} from '@astryxdesign/core/Lightbox';
import {Thumbnail} from '@astryxdesign/core/Thumbnail';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';

const images = [
  {src: 'https://picsum.photos/seed/prod1/800/600', alt: 'Product front view'},
  {src: 'https://picsum.photos/seed/prod2/800/600', alt: 'Product side view'},
  {src: 'https://picsum.photos/seed/prod3/800/600', alt: 'Product detail'},
  {src: 'https://picsum.photos/seed/prod4/800/600', alt: 'Product in use'},
];

export default function ProductGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <VStack gap={4} padding={4}>
      <Heading level={2}>Product Photos</Heading>
      <HStack gap={2}>
        {images.map((img, i) => (
          <Thumbnail
            key={i}
            src={img.src}
            alt={img.alt}
            width={150}
            height={112}
            shape="rounded"
            onClick={() => {
              setIndex(i);
              setIsOpen(true);
            }}
          />
        ))}
      </HStack>
      <Lightbox
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        media={images.map((img) => ({type: 'image' as const, src: img.src, alt: img.alt}))}
        index={index}
        onIndexChange={setIndex}
      />
    </VStack>
  );
}
