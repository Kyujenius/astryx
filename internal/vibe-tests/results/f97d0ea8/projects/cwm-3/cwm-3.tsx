// Copyright (c) Meta Platforms, Inc. and affiliates.

import {VStack, HStack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Thumbnail} from '@astryxdesign/core/Thumbnail';
import {Popover} from '@astryxdesign/core/Popover';
import {Grid} from '@astryxdesign/core/Grid';
import {useState} from 'react';

const ICONS = ['📄', '🎯', '🚀', '💡', '📊', '🎨', '📝', '🔧'];

export default function NotionPageHeader() {
  const [icon, setIcon] = useState('📄');
  const [coverUrl, setCoverUrl] = useState<string | undefined>(undefined);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <VStack gap={3}>
      {coverUrl && (
        <Thumbnail src={coverUrl} alt="Cover image" />
      )}
      <HStack gap={2} vAlign="center" padding={4}>
        <Popover
          isOpen={showPicker}
          onOpenChange={setShowPicker}
          content={
            <Grid columns={4} gap={2}>
              {ICONS.map((e) => (
                <Button
                  key={e}
                  label={e}
                  variant="ghost"
                  onClick={() => { setIcon(e); setShowPicker(false); }}
                />
              ))}
            </Grid>
          }
        >
          <Button label={icon} variant="ghost" onClick={() => setShowPicker(true)} />
        </Popover>
        <VStack gap={1}>
          <Heading level={1}>Untitled Page</Heading>
          <Text type="supporting" color="secondary">Start writing or press / for commands</Text>
        </VStack>
      </HStack>
      {!coverUrl && (
        <Button
          label="Add cover"
          variant="ghost"
          onClick={() => setCoverUrl('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200')}
        />
      )}
    </VStack>
  );
}
