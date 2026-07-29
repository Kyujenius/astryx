import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import stylex from '@stylexjs/stylex';
import {useState} from 'react';

const styles = stylex.create({
  header: {
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    borderRadius: 8,
  },
  coverPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
  },
  iconPicker: {
    fontSize: 48,
    cursor: 'pointer',
  },
  titleInput: {
    border: 'none',
    outline: 'none',
    fontSize: 32,
    fontWeight: 700,
    width: '100%',
    padding: 0,
  },
});

interface PageHeaderProps {
  initialTitle?: string;
  initialIcon?: string;
  coverUrl?: string;
  onTitleChange?: (title: string) => void;
  onIconChange?: (icon: string) => void;
  onCoverChange?: (url: string) => void;
}

const ICONS = ['📄', '🎯', '📋', '🚀', '💡', '📊', '🎨', '⚡'];

export default function NotionPageHeader({
  initialTitle = 'Untitled',
  initialIcon = '📄',
  coverUrl,
  onTitleChange,
  onIconChange,
  onCoverChange,
}: PageHeaderProps) {
  const [title, setTitle] = useState(initialTitle);
  const [icon, setIcon] = useState(initialIcon);
  const [showIconPicker, setShowIconPicker] = useState(false);

  return (
    <Card>
      <div {...stylex.props(styles.header)}>
        {coverUrl ? (
          <img src={coverUrl} alt="" {...stylex.props(styles.coverImage)} />
        ) : (
          <div {...stylex.props(styles.coverPlaceholder)}>
            <Button variant="outlined" onPress={() => onCoverChange?.('/placeholder.jpg')}>
              Add Cover
            </Button>
          </div>
        )}
      </div>
      <div {...stylex.props(styles.iconRow)}>
        <span
          {...stylex.props(styles.iconPicker)}
          onClick={() => setShowIconPicker(!showIconPicker)}
          role="button"
          aria-label="Change icon"
        >
          {icon}
        </span>
        {showIconPicker && (
          <div>
            {ICONS.map((emoji) => (
              <IconButton
                key={emoji}
                label={`Select ${emoji}`}
                onPress={() => {
                  setIcon(emoji);
                  onIconChange?.(emoji);
                  setShowIconPicker(false);
                }}
              >
                <span>{emoji}</span>
              </IconButton>
            ))}
          </div>
        )}
      </div>
      <input
        {...stylex.props(styles.titleInput)}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          onTitleChange?.(e.target.value);
        }}
        placeholder="Untitled"
        aria-label="Page title"
      />
    </Card>
  );
}
