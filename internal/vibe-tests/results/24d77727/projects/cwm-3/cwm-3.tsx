// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Popover} from '@astryxdesign/core/Popover';

const ICONS = ['📄', '📝', '🎯', '🚀', '💡', '📊', '🎨', '🔧', '📚', '⭐', '🏠', '🌟'];
const COVERS = [
  'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=200&fit=crop',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=200&fit=crop',
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=200&fit=crop',
];

export default function NotionPageHeader() {
  const [icon, setIcon] = useState('📄');
  const [cover, setCover] = useState(COVERS[0]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <div className="max-w-3xl mx-auto">
      <img src={cover} alt="Cover" className="w-full h-48 object-cover rounded-lg" />
      <div className="flex gap-2 mt-2">
        <Button label="Change cover" variant="ghost" size="sm" onClick={() => {
          setCover(COVERS[(COVERS.indexOf(cover) + 1) % COVERS.length]);
        }} />
      </div>
      <Stack direction="horizontal" gap={3} vAlign="center" padding={2}>
        <Popover
          isOpen={isPickerOpen}
          onOpenChange={setIsPickerOpen}
          trigger={
            <button onClick={() => setIsPickerOpen(true)} className="text-5xl cursor-pointer hover:bg-gray-100 rounded-lg p-2">
              {icon}
            </button>
          }
          content={
            <div className="grid grid-cols-6 gap-1 p-2">
              {ICONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => { setIcon(emoji); setIsPickerOpen(false); }}
                  className="text-2xl p-2 hover:bg-gray-100 rounded cursor-pointer"
                >
                  {emoji}
                </button>
              ))}
            </div>
          }
        />
        <Heading level={1}>Untitled</Heading>
      </Stack>
      <Text type="supporting" color="secondary">Click the icon to change it.</Text>
    </div>
  );
}
