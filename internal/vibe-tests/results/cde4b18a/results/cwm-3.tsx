import {useState} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {HStack} from '@astryxdesign/core/HStack';
import {Button} from '@astryxdesign/core/Button';
import {Dialog} from '@astryxdesign/core/Dialog';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

const ICONS = ['📄', '🎯', '📊', '💡', '🚀', '📝', '🎨', '📋', '⚡', '🌟', '🔧', '📦'];

export default function PageHeader() {
  const [icon, setIcon] = useState('📄');
  const [coverUrl, setCoverUrl] = useState('');
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [title] = useState('Untitled');

  return (
    <Stack gap={2}>
      {coverUrl ? (
        <img
          src={coverUrl}
          alt="Page cover"
          className="w-full h-48 object-cover rounded-lg"
        />
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
          className="text-4xl cursor-pointer bg-transparent border-none p-1 rounded-lg hover:bg-gray-100"
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
          <div className="grid grid-cols-6 gap-2">
            {ICONS.map((emoji) => (
              <button
                key={emoji}
                className="text-3xl cursor-pointer bg-transparent border-none p-1 rounded hover:bg-gray-100"
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
