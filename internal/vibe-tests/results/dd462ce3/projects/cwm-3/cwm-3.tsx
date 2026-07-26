// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState} from 'react';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Popover} from '@astryxdesign/core/Popover';

const ICONS = ['\u{1F4C4}', '\u{1F3AF}', '\u{1F4CA}', '\u{1F680}', '\u{1F4A1}', '\u{1F527}'];

export default function NotionPageHeader() {
  const [icon, setIcon] = useState('\u{1F4C4}');
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  return (
    <div>
      <div className="h-48 bg-gray-100 rounded-lg relative overflow-hidden">
        {coverUrl && <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />}
        <div className="absolute top-3 right-3">
          <Button variant="ghost" size="small" onPress={() => setCoverUrl('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200')}>Change cover</Button>
        </div>
      </div>
      <div className="flex items-start gap-4 p-6">
        <Popover content={<div className="grid grid-cols-3 gap-2 p-2">{ICONS.map(e => <Button key={e} variant="ghost" onPress={() => setIcon(e)}><span className="text-2xl">{e}</span></Button>)}</div>} placement="below" label="Pick icon">
          <button className="text-5xl bg-transparent border-none cursor-pointer">{icon}</button>
        </Popover>
        <div><Heading level={1}>Untitled</Heading><Text type="supporting" color="secondary">Start writing...</Text></div>
      </div>
    </div>
  );
}
