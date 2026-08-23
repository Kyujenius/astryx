import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {TextInput} from '@astryxdesign/core/TextInput';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  page: {
    maxWidth: 900,
    margin: '0 auto',
  },
  cover: {
    height: 200,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: 8,
    position: 'relative',
  },
  coverPlaceholder: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginTop: -32,
    marginLeft: 24,
    position: 'relative',
  },
  iconDisplay: {
    fontSize: 48,
    width: 64,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  content: {
    padding: 24,
  },
  title: {
    marginTop: 16,
  },
  pickerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: 8,
    padding: 8,
  },
  pickerItem: {
    fontSize: 24,
    cursor: 'pointer',
    textAlign: 'center',
    padding: 8,
    borderRadius: 4,
  },
});

const ICONS = ['📄', '🎯', '📚', '💡', '🚀', '🎨', '📝', '🔧', '⭐', '🌈', '🎵', '🌿'];

export default function NotionPageHeader() {
  const [icon, setIcon] = useState('📄');
  const [coverUrl, setCoverUrl] = useState('');
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [showCoverInput, setShowCoverInput] = useState(false);
  const [title, setTitle] = useState('Untitled');

  return (
    <div {...stylex.props(styles.page)}>
      {coverUrl ? (
        <div {...stylex.props(styles.cover)} style={{backgroundImage: `url(${coverUrl})`}}>
          <Button label="Change cover" variant="ghost" onClick={() => setShowCoverInput(true)} />
        </div>
      ) : (
        <div {...stylex.props(styles.coverPlaceholder)}>
          <Button label="Add cover" variant="ghost" onClick={() => setShowCoverInput(true)} />
        </div>
      )}

      {showCoverInput && (
        <Card padding={2}>
          <TextInput
            label="Cover image URL"
            value={coverUrl}
            onChange={setCoverUrl}
            placeholder="https://example.com/image.jpg"
          />
          <Button label="Done" variant="primary" onClick={() => setShowCoverInput(false)} />
        </Card>
      )}

      <div {...stylex.props(styles.iconSection)}>
        <div
          {...stylex.props(styles.iconDisplay)}
          onClick={() => setShowIconPicker(!showIconPicker)}
          role="button"
          tabIndex={0}
          aria-label="Change page icon"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setShowIconPicker(!showIconPicker);
          }}
        >
          {icon}
        </div>
      </div>

      {showIconPicker && (
        <Card padding={2}>
          <div {...stylex.props(styles.pickerGrid)}>
            {ICONS.map((emoji) => (
              <div
                key={emoji}
                {...stylex.props(styles.pickerItem)}
                onClick={() => {
                  setIcon(emoji);
                  setShowIconPicker(false);
                }}
                role="button"
                tabIndex={0}
                aria-label={`Select ${emoji}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setIcon(emoji);
                    setShowIconPicker(false);
                  }
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </Card>
      )}

      <div {...stylex.props(styles.content)}>
        <Heading level={1}>{title}</Heading>
      </div>
    </div>
  );
}
