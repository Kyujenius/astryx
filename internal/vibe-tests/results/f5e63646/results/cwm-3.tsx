// Copyright (c) Meta Platforms, Inc. and affiliates.

import {VStack, HStack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Thumbnail} from '@astryxdesign/core/Thumbnail';
import {Popover} from '@astryxdesign/core/Popover';
import {useState} from 'react';

const ICONS = ['📄', '🎯', '🚀', '💡', '📊', '🎨'];

export default function NotionPageHeader() {
  const [icon, setIcon] = useState('📄');
  const [hasCover, setHasCover] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <VStack gap={0}>
      {hasCover && (
        <div className="h-48 w-full overflow-hidden rounded-t-lg">
          <Thumbnail src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200" alt="Cover" />
        </div>
      )}
      <div className="p-6">
        <HStack gap={3} vAlign="center">
          <Popover
            isOpen={showPicker}
            onOpenChange={setShowPicker}
            content={
              <div className="grid grid-cols-3 gap-2 p-3">
                {ICONS.map((e) => (
                  <Button key={e} label={e} variant="ghost" onClick={() => { setIcon(e); setShowPicker(false); }} />
                ))}
              </div>
            }
          >
            <Button label={icon} variant="ghost" onClick={() => setShowPicker(true)} />
          </Popover>
          <VStack gap={1}>
            <Heading level={1}>Untitled</Heading>
            <Text type="supporting" color="secondary">Press / for commands</Text>
          </VStack>
        </HStack>
        {!hasCover && <Button label="Add cover" variant="ghost" onClick={() => setHasCover(true)} />}
      </div>
    </VStack>
  );
}
