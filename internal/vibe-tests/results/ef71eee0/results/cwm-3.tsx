import React, {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  cover: {
    width: '100%',
    height: 200,
    backgroundColor: '#e8e8e8',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: 8,
  },
  coverWithImage: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800)',
  },
  iconDisplay: {
    fontSize: 48,
    marginTop: -32,
  },
});

const icons = ['\ud83d\udcdd', '\ud83d\ude80', '\ud83c\udf1f', '\ud83d\udca1', '\ud83c\udfaf', '\ud83d\udcda', '\u2728', '\ud83d\udd25'];

export default function NotionHeader() {
  const [selectedIcon, setSelectedIcon] = useState('\ud83d\udcdd');
  const [hasCover, setHasCover] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);

  return (
    <Card padding={0} maxWidth={720}>
      <VStack gap={2}>
        {hasCover && (
          <div {...stylex.props(styles.cover, styles.coverWithImage)} />
        )}
        <VStack gap={2} padding={3}>
          <HStack gap={2} vAlign="center">
            <span {...stylex.props(styles.iconDisplay)}>{selectedIcon}</span>
            <VStack gap={1}>
              <HStack gap={1}>
                <Button
                  label={showIconPicker ? 'Close picker' : 'Change icon'}
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowIconPicker(!showIconPicker)}
                />
                <Button
                  label={hasCover ? 'Remove cover' : 'Add cover'}
                  variant="ghost"
                  size="sm"
                  onClick={() => setHasCover(!hasCover)}
                />
              </HStack>
            </VStack>
          </HStack>
          {showIconPicker && (
            <Card variant="muted" padding={2}>
              <HStack gap={1} wrap="wrap">
                {icons.map(icon => (
                  <Button
                    key={icon}
                    label={icon}
                    variant={icon === selectedIcon ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => {
                      setSelectedIcon(icon);
                      setShowIconPicker(false);
                    }}
                  />
                ))}
              </HStack>
            </Card>
          )}
          <Heading level={1}>Untitled</Heading>
          <Text color="placeholder">Start writing or press / for commands...</Text>
        </VStack>
      </VStack>
    </Card>
  );
}
