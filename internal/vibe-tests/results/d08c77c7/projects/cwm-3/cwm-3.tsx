import {useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Thumbnail} from '@astryxdesign/core/Thumbnail';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    objectFit: 'cover' as const,
    backgroundColor: '#f0f0f0',
  },
  iconPicker: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: 8,
    padding: 8,
  },
  iconBtn: {
    fontSize: 24,
    cursor: 'pointer',
    padding: 8,
    borderRadius: 4,
    border: 'none',
    backgroundColor: 'transparent',
  },
});

const icons = ['\ud83d\udcdd', '\ud83d\ude80', '\ud83c\udf1f', '\ud83d\udca1', '\ud83c\udfaf', '\ud83d\udce6', '\ud83c\udf3f', '\ud83d\udd25', '\ud83c\udfa8', '\u2728', '\ud83d\udcda', '\ud83d\udd10'];

export default function PageHeader() {
  const [icon, setIcon] = useState('\ud83d\udcdd');
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [coverUrl, setCoverUrl] = useState('');
  const [title, setTitle] = useState('Untitled');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  return (
    <VStack gap={3}>
      {coverUrl ? (
        <img src={coverUrl} alt="Page cover" {...stylex.props(styles.cover)} />
      ) : (
        <div {...stylex.props(styles.cover)}>
          <HStack gap={2} padding={2}>
            <Button
              label="Add cover"
              variant="ghost"
              size="sm"
              onClick={() => setCoverUrl('https://picsum.photos/800/200')}
            />
          </HStack>
        </div>
      )}
      <HStack gap={2} vAlign="center" padding={3}>
        <button
          {...stylex.props(styles.iconBtn)}
          onClick={() => setShowIconPicker(!showIconPicker)}
          aria-label="Change page icon"
        >
          {icon}
        </button>
        {isEditingTitle ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setIsEditingTitle(false)}
            onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
            autoFocus
            style={{fontSize: 32, fontWeight: 'bold', border: 'none', outline: 'none', width: '100%'}}
          />
        ) : (
          <div onClick={() => setIsEditingTitle(true)} style={{cursor: 'pointer'}}>
            <Heading level={1}>{title}</Heading>
          </div>
        )}
      </HStack>
      {showIconPicker && (
        <div {...stylex.props(styles.iconPicker)}>
          {icons.map((emoji) => (
            <button
              key={emoji}
              {...stylex.props(styles.iconBtn)}
              onClick={() => {
                setIcon(emoji);
                setShowIconPicker(false);
              }}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </VStack>
  );
}
