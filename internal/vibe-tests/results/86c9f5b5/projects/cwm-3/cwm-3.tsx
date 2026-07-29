import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Heading} from '@astryxdesign/core/Heading';
import {useState} from 'react';

const ICONS = ['📄', '🎯', '📋', '🚀', '💡', '📊', '🎨', '⚡'];

interface PageHeaderProps {
  initialTitle?: string;
  initialIcon?: string;
  coverUrl?: string;
  onTitleChange?: (title: string) => void;
  onIconChange?: (icon: string) => void;
  onCoverChange?: (url: string) => void;
}

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
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Card>
      {coverUrl ? (
        <img src={coverUrl} alt="" className="w-full h-48 object-cover rounded-lg" />
      ) : (
        <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
          <Button variant="outlined" onPress={() => onCoverChange?.('/placeholder.jpg')}>
            Add Cover
          </Button>
        </div>
      )}
      <div className="flex items-center gap-3 mt-4">
        <span
          className="text-5xl cursor-pointer"
          onClick={() => setShowPicker(!showPicker)}
          role="button"
          aria-label="Change icon"
        >
          {icon}
        </span>
        {showPicker && (
          <div className="flex gap-1 flex-wrap">
            {ICONS.map((emoji) => (
              <IconButton
                key={emoji}
                label={`Select ${emoji}`}
                onPress={() => {
                  setIcon(emoji);
                  onIconChange?.(emoji);
                  setShowPicker(false);
                }}
              >
                <span>{emoji}</span>
              </IconButton>
            ))}
          </div>
        )}
      </div>
      <input
        className="w-full text-3xl font-bold border-none outline-none mt-2 p-0 bg-transparent"
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
