import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Text';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  cover: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    borderRadius: 8,
  },
  iconBtn: {
    fontSize: 32,
    cursor: 'pointer',
    userSelect: 'none',
  },
});

const icons = ['📄', '🎯', '🚀', '💡', '📊', '🎨', '🔧', '📝'];
const covers = [
  'https://picsum.photos/800/200?1',
  'https://picsum.photos/800/200?2',
  'https://picsum.photos/800/200?3',
];

export default function NotionPageHeader() {
  const [icon, setIcon] = useState('📄');
  const [coverUrl, setCoverUrl] = useState(covers[0]);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [title, setTitle] = useState('Untitled');

  return (
    <Card padding={0}>
      <VStack gap={0}>
        <img {...stylex.props(styles.cover)} src={coverUrl} alt="Page cover" />
        <VStack gap={2} padding={3}>
          <HStack gap={2} align="center">
            <span
              {...stylex.props(styles.iconBtn)}
              role="button"
              tabIndex={0}
              aria-label="Change icon"
              onClick={() => setShowIconPicker(!showIconPicker)}
              onKeyDown={(e) => e.key === 'Enter' && setShowIconPicker(!showIconPicker)}
            >
              {icon}
            </span>
            <Heading level={1}>{title}</Heading>
          </HStack>
          {showIconPicker && (
            <HStack gap={1} wrap="wrap">
              {icons.map((ic) => (
                <Button
                  key={ic}
                  variant="ghost"
                  size="sm"
                  onPress={() => {
                    setIcon(ic);
                    setShowIconPicker(false);
                  }}
                >
                  {ic}
                </Button>
              ))}
            </HStack>
          )}
          <HStack gap={1}>
            {covers.map((url, i) => (
              <Button
                key={i}
                variant={coverUrl === url ? 'filled' : 'outlined'}
                size="sm"
                onPress={() => setCoverUrl(url)}
              >
                Cover {i + 1}
              </Button>
            ))}
          </HStack>
        </VStack>
      </VStack>
    </Card>
  );
}
