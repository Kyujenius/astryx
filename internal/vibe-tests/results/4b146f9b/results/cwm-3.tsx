import {useState} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {HStack} from '@astryxdesign/core/HStack';
import {Button} from '@astryxdesign/core/Button';
import {Dialog} from '@astryxdesign/core/Dialog';
import {Heading} from '@astryxdesign/core/Heading';
import {Grid} from '@astryxdesign/core/Grid';
import {Text} from '@astryxdesign/core/Text';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  cover: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    borderRadius: 8,
  },
  iconButton: {
    fontSize: 40,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 4,
    borderRadius: 8,
  },
  iconGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: 8,
  },
});

const ICONS = ['📄', '🎯', '📊', '💡', '🚀', '📝', '🎨', '📋', '⚡', '🌟', '🔧', '📦'];

export default function PageHeader() {
  const [icon, setIcon] = useState('📄');
  const [coverUrl, setCoverUrl] = useState('');
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [title, setTitle] = useState('Untitled');

  return (
    <Stack gap={2}>
      {coverUrl ? (
        <img src={coverUrl} alt="Page cover" {...stylex.props(styles.cover)} />
      ) : (
        <HStack gap={2}>
          <Button
            label="Add cover"
            variant="ghost"
            size="sm"
            onClick={() => setCoverUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200')}
          />
        </HStack>
      )}

      <HStack gap={2} vAlign="center">
        <button
          {...stylex.props(styles.iconButton)}
          onClick={() => setShowIconPicker(true)}
          aria-label="Change page icon"
        >
          {icon}
        </button>
        <Heading level={1}>{title}</Heading>
      </HStack>

      <Dialog isOpen={showIconPicker} onOpenChange={setShowIconPicker} width={320}>
        <Stack gap={3} padding={3}>
          <Text>Choose an icon</Text>
          <div {...stylex.props(styles.iconGrid)}>
            {ICONS.map((emoji) => (
              <button
                key={emoji}
                {...stylex.props(styles.iconButton)}
                onClick={() => {
                  setIcon(emoji);
                  setShowIconPicker(false);
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </Stack>
      </Dialog>
    </Stack>
  );
}
