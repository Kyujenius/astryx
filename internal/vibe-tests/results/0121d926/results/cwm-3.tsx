// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

const ICONS = ['\u{1F4DD}', '\u{1F680}', '\u{1F4A1}', '\u{1F3AF}', '\u{2728}', '\u{1F30D}', '\u{1F4DA}', '\u{1F3A8}'];

export default function PageHeader() {
  const [icon, setIcon] = useState('\u{1F4DD}');
  const [coverUrl, setCoverUrl] = useState('');

  return (
    <div className="flex flex-col w-full">
      {coverUrl ? (
        <div className="relative w-full h-48 rounded-lg overflow-hidden group">
          <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
          <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-black/50 text-white px-3 py-1 rounded text-sm" onClick={() => setCoverUrl('')}>
            Remove
          </button>
        </div>
      ) : (
        <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
          <Button variant="ghost" onClick={() => setCoverUrl('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800')}>Add cover</Button>
        </div>
      )}
      <div className="flex items-center gap-3 mt-4">
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-5xl hover:bg-muted rounded-lg p-1" aria-label="Change icon">{icon}</button>
          </PopoverTrigger>
          <PopoverContent className="w-auto">
            <div className="grid grid-cols-4 gap-1">
              {ICONS.map(i => (
                <button key={i} className="text-2xl p-2 hover:bg-muted rounded" onClick={() => setIcon(i)}>{i}</button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <h1 className="text-4xl font-bold">Untitled</h1>
      </div>
    </div>
  );
}
