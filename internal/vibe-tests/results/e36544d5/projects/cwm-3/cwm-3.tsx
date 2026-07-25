// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {useState} from 'react';

const ICONS = ['📄', '🎯', '🚀', '💡', '📊', '🎨', '📝', '🔧'];

export default function NotionPageHeader() {
  const [icon, setIcon] = useState('📄');
  const [hasCover, setHasCover] = useState(false);

  return (
    <div className="max-w-3xl mx-auto">
      {hasCover && (
        <div className="h-48 w-full overflow-hidden rounded-t-lg">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200" alt="Cover" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="text-3xl p-2">{icon}</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto">
              <div className="grid grid-cols-4 gap-2">
                {ICONS.map((e) => (
                  <Button key={e} variant="ghost" className="text-xl" onClick={() => setIcon(e)}>{e}</Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <div>
            <h1 className="text-4xl font-bold">Untitled</h1>
            <p className="text-muted-foreground">Press / for commands</p>
          </div>
        </div>
        {!hasCover && <Button variant="ghost" onClick={() => setHasCover(true)}>Add cover</Button>}
      </div>
    </div>
  );
}
