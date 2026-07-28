// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Heading} from '@astryxdesign/core/Heading';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Button} from '@astryxdesign/core/Button';

const ICONS = ['\u{1F4DD}', '\u{1F680}', '\u{1F4A1}', '\u{1F3AF}', '\u{2728}', '\u{1F30D}', '\u{1F4DA}', '\u{1F3A8}'];

export default function PageHeader() {
  const [icon, setIcon] = useState('\u{1F4DD}');
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [coverUrl, setCoverUrl] = useState('');

  return (
    <div className="flex flex-col w-full">
      {coverUrl ? (
        <div className="relative w-full h-48 rounded-lg overflow-hidden group">
          <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
          <button
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-black/50 text-white px-3 py-1 rounded text-sm transition-opacity"
            onClick={() => setCoverUrl('')}
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
          <Button
            label="Add cover"
            variant="ghost"
            onClick={() => setCoverUrl('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800')}
          />
        </div>
      )}
      <div className="flex items-center gap-3 mt-4">
        <button
          className="text-5xl hover:bg-gray-100 rounded-lg p-1 transition-colors"
          onClick={() => setShowIconPicker(!showIconPicker)}
          aria-label="Change icon"
        >
          {icon}
        </button>
        <Heading level={1}>Untitled</Heading>
      </div>
      {showIconPicker && (
        <div className="flex gap-1 flex-wrap mt-2 p-2 bg-white border rounded-lg shadow-sm">
          {ICONS.map(i => (
            <button
              key={i}
              className="text-2xl p-2 hover:bg-gray-100 rounded"
              onClick={() => { setIcon(i); setShowIconPicker(false); }}
            >
              {i}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
