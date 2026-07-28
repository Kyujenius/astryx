// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    objectFit: 'cover',
  },
  coverPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 48,
    cursor: 'pointer',
  },
});

const ICONS = ['\u{1F4DD}', '\u{1F680}', '\u{1F4A1}', '\u{1F3AF}', '\u{2728}', '\u{1F30D}', '\u{1F4DA}', '\u{1F3A8}'];

export default function PageHeader() {
  const [icon, setIcon] = useState('\u{1F4DD}');
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [coverUrl, setCoverUrl] = useState('');
  const [title, setTitle] = useState('Untitled');

  return (
    <VStack gap={3}>
      {coverUrl ? (
        <img src={coverUrl} alt="Cover" {...stylex.props(styles.cover)} />
      ) : (
        <div {...stylex.props(styles.coverPlaceholder)}>
          <Button
            label="Add cover"
            variant="ghost"
            onClick={() => setCoverUrl('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800')}
          />
        </div>
      )}
      <HStack gap={2} vAlign="center">
        <span
          {...stylex.props(styles.icon)}
          role="button"
          aria-label="Change icon"
          onClick={() => setShowIconPicker(!showIconPicker)}
        >
          {icon}
        </span>
        <Heading level={1}>{title}</Heading>
      </HStack>
      {showIconPicker && (
        <HStack gap={1} wrap="wrap">
          {ICONS.map((i) => (
            <IconButton
              key={i}
              label={`Select icon ${i}`}
              onClick={() => { setIcon(i); setShowIconPicker(false); }}
              variant="ghost"
            >
              <Text>{i}</Text>
            </IconButton>
          ))}
        </HStack>
      )}
    </VStack>
  );
}
