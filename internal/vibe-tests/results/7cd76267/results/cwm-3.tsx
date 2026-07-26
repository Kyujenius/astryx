// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState} from 'react';
import {Card} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

const ICONS = ['\u{1F4C4}', '\u{1F3AF}', '\u{1F4CA}', '\u{1F680}', '\u{1F4A1}', '\u{1F527}', '\u{1F4DD}', '\u{1F3A8}'];

export default function NotionPageHeader() {
  const [icon, setIcon] = useState('\u{1F4C4}');
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  return (
    <div>
      <div className="h-48 bg-muted rounded-lg relative overflow-hidden">
        {coverUrl && <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />}
        <div className="absolute top-3 right-3">
          <Button variant="secondary" size="sm" onClick={() => setCoverUrl('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200')}>Change cover</Button>
        </div>
      </div>
      <div className="flex items-start gap-4 p-6">
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-5xl bg-transparent border-none cursor-pointer">{icon}</button>
          </PopoverTrigger>
          <PopoverContent className="w-auto">
            <div className="grid grid-cols-4 gap-2">
              {ICONS.map(e => <Button key={e} variant="ghost" size="sm" onClick={() => setIcon(e)}><span className="text-xl">{e}</span></Button>)}
            </div>
          </PopoverContent>
        </Popover>
        <div>
          <h1 className="text-3xl font-bold">Untitled</h1>
          <p className="text-muted-foreground text-sm">Start writing or press / for commands</p>
        </div>
      </div>
    </div>
  );
}
