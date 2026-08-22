import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Popover} from '@astryxdesign/core/Popover';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';

const icons = ['📄', '🎯', '💡', '🚀', '📊', '🎨', '📝', '🔧', '⚡', '🌟', '📚', '🎵'];

export default function NotionPageHeader() {
  const [selectedIcon, setSelectedIcon] = useState('📄');
  const [coverUrl, setCoverUrl] = useState('');

  return (
    <div className="flex flex-col gap-2">
      {coverUrl && (
        <div className="w-full h-48 rounded-lg overflow-hidden">
          <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex items-center gap-3">
        <Popover
          trigger={
            <Button label={selectedIcon} variant="ghost" size="lg" />
          }
        >
          <div className="p-3 flex flex-col gap-2">
            <Text type="label">Pick an icon</Text>
            <div className="grid grid-cols-6 gap-1">
              {icons.map((icon) => (
                <Button
                  key={icon}
                  label={icon}
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedIcon(icon)}
                />
              ))}
            </div>
          </div>
        </Popover>
        <Heading level={1}>Untitled</Heading>
      </div>
      <div className="flex gap-2">
        <Button
          label="Add cover"
          variant="ghost"
          size="sm"
          onClick={() => setCoverUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=400&fit=crop')}
        />
      </div>
    </div>
  );
}
