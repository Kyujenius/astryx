// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';

const ICONS = ['\u{1F4C4}', '\u{1F3AF}', '\u{1F4A1}', '\u{1F680}', '\u{1F4CA}', '\u{1F3A8}', '\u{1F527}', '\u{1F4DD}', '\u{1F31F}', '\u{1F3B5}'];

export default function NotionPageHeader() {
  const [icon, setIcon] = useState('\u{1F4C4}');
  const [showPicker, setShowPicker] = useState(false);
  const [coverUrl, setCoverUrl] = useState('');

  return (
    <div className="w-full">
      {coverUrl && (
        <div className="w-full h-48 overflow-hidden rounded-lg">
          <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowPicker(!showPicker)} className="text-5xl bg-transparent border-none cursor-pointer" aria-label="Change page icon">{icon}</button>
          {!coverUrl && <Button variant="ghost" size="sm" onClick={() => setCoverUrl('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop')}>Add cover</Button>}
        </div>
        {showPicker && (
          <Card><CardContent className="flex flex-wrap gap-1 p-3">
            {ICONS.map(emoji => (
              <button key={emoji} onClick={() => { setIcon(emoji); setShowPicker(false); }} className="text-2xl bg-transparent border-none cursor-pointer p-1 hover:bg-gray-100 rounded" aria-label={`Select icon`}>{emoji}</button>
            ))}
          </CardContent></Card>
        )}
        <h1 className="text-4xl font-bold">Untitled</h1>
        <p className="text-muted-foreground">Start writing or press / for commands</p>
      </div>
    </div>
  );
}
