// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

const ICONS = ['📄', '📝', '🎯', '🚀', '💡', '📊', '🎨', '🔧', '📚', '⭐', '🏠', '🌟'];
const COVERS = [
  'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=200&fit=crop',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=200&fit=crop',
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=200&fit=crop',
];

export default function NotionPageHeader() {
  const [icon, setIcon] = useState('📄');
  const [cover, setCover] = useState(COVERS[0]);

  return (
    <div className="max-w-3xl mx-auto">
      <img src={cover} alt="Cover" className="w-full h-48 object-cover rounded-lg" />
      <div className="mt-2">
        <Button variant="ghost" size="sm" onClick={() => setCover(COVERS[(COVERS.indexOf(cover) + 1) % COVERS.length])}>
          Change cover
        </Button>
      </div>
      <div className="flex items-end gap-3 mt-4">
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-5xl cursor-pointer hover:bg-accent rounded-lg p-2">{icon}</button>
          </PopoverTrigger>
          <PopoverContent className="w-auto">
            <div className="grid grid-cols-6 gap-1">
              {ICONS.map((emoji) => (
                <button key={emoji} onClick={() => setIcon(emoji)} className="text-2xl p-2 hover:bg-accent rounded cursor-pointer">
                  {emoji}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <h1 className="text-4xl font-bold">Untitled</h1>
      </div>
      <p className="text-sm text-muted-foreground mt-2">Click the icon to change it.</p>
    </div>
  );
}
