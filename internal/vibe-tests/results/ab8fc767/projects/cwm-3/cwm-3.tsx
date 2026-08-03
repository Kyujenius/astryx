// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/Stack';
import {HStack} from '@astryxdesign/core/Stack';

const ICONS = ['📄', '🎯', '💡', '🚀', '📊', '🎨', '🔧', '📝', '🌟', '🎵'];

export default function NotionPageHeader() {
  const [icon, setIcon] = useState('📄');
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [coverUrl, setCoverUrl] = useState('');
  const [title, setTitle] = useState('Untitled');

  return (
    <VStack gap={0}>
      {coverUrl && (
        <div style={{width: '100%', height: 200, overflow: 'hidden', borderRadius: 8}}>
          <img src={coverUrl} alt="Cover" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </div>
      )}
      <VStack gap={2} padding={4}>
        <HStack gap={2} vAlign="center">
          <button
            onClick={() => setShowIconPicker(!showIconPicker)}
            style={{fontSize: 48, background: 'none', border: 'none', cursor: 'pointer', padding: 0}}
            aria-label="Change page icon"
          >
            {icon}
          </button>
          {!coverUrl && (
            <Button
              label="Add cover"
              variant="ghost"
              size="sm"
              onClick={() => setCoverUrl('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop')}
            />
          )}
        </HStack>

        {showIconPicker && (
          <Card padding={2}>
            <HStack gap={1} wrap="wrap">
              {ICONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => { setIcon(emoji); setShowIconPicker(false); }}
                  style={{fontSize: 24, background: 'none', border: 'none', cursor: 'pointer', padding: 4}}
                  aria-label={`Select ${emoji} icon`}
                >
                  {emoji}
                </button>
              ))}
            </HStack>
          </Card>
        )}

        <Heading level={1}>{title}</Heading>
        <Text color="secondary">Start writing or press / for commands</Text>
      </VStack>
    </VStack>
  );
}
