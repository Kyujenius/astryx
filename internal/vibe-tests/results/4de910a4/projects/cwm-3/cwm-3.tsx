// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState} from 'react';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Popover} from '@astryxdesign/core/Popover';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  cover: { height: 200, backgroundColor: 'var(--color-surface-secondary)', borderRadius: 'var(--radius-md)', position: 'relative' },
  header: { padding: 24, display: 'flex', alignItems: 'flex-start', gap: 16 },
  coverActions: { position: 'absolute', top: 12, right: 12 },
});

const ICONS = ['\u{1F4C4}', '\u{1F3AF}', '\u{1F4CA}', '\u{1F680}', '\u{1F4A1}', '\u{1F527}', '\u{1F4DD}', '\u{1F3A8}'];

export default function NotionPageHeader() {
  const [icon, setIcon] = useState('\u{1F4C4}');
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  return (
    <div>
      <div {...stylex.props(styles.cover)}>
        {coverUrl && <img src={coverUrl} alt="Cover" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit'}} />}
        <div {...stylex.props(styles.coverActions)}>
          <Button variant="ghost" size="small" onPress={() => setCoverUrl('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200')}>Change cover</Button>
        </div>
      </div>
      <div {...stylex.props(styles.header)}>
        <Popover
          content={
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, padding: 8}}>
              {ICONS.map((e) => (
                <Button key={e} variant="ghost" onPress={() => setIcon(e)}><span style={{fontSize: 24}}>{e}</span></Button>
              ))}
            </div>
          }
          placement="below"
          label="Pick an icon"
        >
          <button style={{fontSize: 48, background: 'none', border: 'none', cursor: 'pointer'}}>{icon}</button>
        </Popover>
        <div>
          <Heading level={1}>Untitled</Heading>
          <Text type="supporting" color="secondary">Start writing or press / for commands</Text>
        </div>
      </div>
    </div>
  );
}
