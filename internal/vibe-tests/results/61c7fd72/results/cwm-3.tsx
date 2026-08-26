import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Text';

const icons = ['📄', '🎯', '🚀', '💡', '📊', '🎨', '🔧', '📝'];
const covers = [
  'https://picsum.photos/800/200?1',
  'https://picsum.photos/800/200?2',
  'https://picsum.photos/800/200?3',
];

export default function NotionHeader() {
  const [icon, setIcon] = useState('📄');
  const [cover, setCover] = useState(covers[0]);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Card padding={0}>
      <img className="w-full h-48 object-cover rounded-t-lg" src={cover} alt="Cover" />
      <div className="p-6 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <button
            className="text-4xl cursor-pointer hover:opacity-70"
            onClick={() => setShowPicker(!showPicker)}
            aria-label="Change icon"
          >
            {icon}
          </button>
          <Heading level={1}>Untitled</Heading>
        </div>
        {showPicker && (
          <div className="flex gap-1 flex-wrap">
            {icons.map((ic) => (
              <Button key={ic} variant="ghost" size="sm" onPress={() => { setIcon(ic); setShowPicker(false); }}>
                {ic}
              </Button>
            ))}
          </div>
        )}
        <div className="flex gap-1">
          {covers.map((url, i) => (
            <Button key={i} variant={cover === url ? 'filled' : 'outlined'} size="sm" onPress={() => setCover(url)}>
              Cover {i + 1}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}
