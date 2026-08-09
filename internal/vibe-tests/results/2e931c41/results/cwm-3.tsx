// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Popover} from '@astryxdesign/core/Popover';
import {Grid} from '@astryxdesign/core/Grid';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  cover: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    borderRadius: 8,
  },
  iconButton: {
    fontSize: 48,
    cursor: 'pointer',
    padding: 4,
  },
  container: {
    maxWidth: 720,
  },
});

const ICONS = ['📄', '📝', '🎯', '🚀', '💡', '📊', '🎨', '🔧', '📚', '⭐', '🏠', '🌟'];
const COVERS = [
  'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=200&fit=crop',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=200&fit=crop',
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=200&fit=crop',
];

export default function NotionPageHeader() {
  const [icon, setIcon] = useState('📄');
  const [cover, setCover] = useState(COVERS[0]);
  const [title, setTitle] = useState('Untitled');
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

  return (
    <Stack gap={3} xstyle={styles.container}>
      <img src={cover} alt="Cover" {...stylex.props(styles.cover)} />
      <Stack direction="horizontal" gap={2} vAlign="end">
        <Button label="Change cover" variant="ghost" size="sm" onClick={() => {
          const idx = (COVERS.indexOf(cover) + 1) % COVERS.length;
          setCover(COVERS[idx]);
        }} />
      </Stack>
      <Stack direction="horizontal" gap={3} vAlign="center">
        <Popover
          isOpen={isIconPickerOpen}
          onOpenChange={setIsIconPickerOpen}
          trigger={
            <button onClick={() => setIsIconPickerOpen(true)} {...stylex.props(styles.iconButton)}>
              {icon}
            </button>
          }
          content={
            <Grid columns={6} gap={1} padding={2}>
              {ICONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => { setIcon(emoji); setIsIconPickerOpen(false); }}
                  {...stylex.props(styles.iconButton)}
                >
                  {emoji}
                </button>
              ))}
            </Grid>
          }
        />
        <Heading level={1}>{title}</Heading>
      </Stack>
      <Text type="supporting" color="secondary">Click the icon to change it. Click "Change cover" to cycle through cover images.</Text>
    </Stack>
  );
}
