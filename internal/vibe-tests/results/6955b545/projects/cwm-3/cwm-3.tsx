import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';

const icons = ['📄', '🎯', '🚀', '📊', '💡', '🔥', '✨', '📝'];
const covers = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
];

export default function PageHeader() {
  const [icon, setIcon] = useState('📄');
  const [coverIndex, setCoverIndex] = useState(0);
  const [showIconPicker, setShowIconPicker] = useState(false);

  return (
    <Card width="100%" padding={0}>
      <div className="relative h-48 flex items-start justify-end p-3" style={{background: covers[coverIndex]}}>
        <Button label="Change cover" variant="ghost" size="sm" onClick={() => setCoverIndex((i) => (i + 1) % covers.length)} />
      </div>
      <div className="relative px-6 pb-6">
        <div className="-mt-6 text-5xl cursor-pointer" onClick={() => setShowIconPicker(!showIconPicker)}>
          {icon}
        </div>
        {showIconPicker && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {icons.map((emoji) => (
              <Button key={emoji} label={emoji} variant="ghost" size="sm" onClick={() => { setIcon(emoji); setShowIconPicker(false); }} />
            ))}
          </div>
        )}
        <Heading level={1}>Untitled</Heading>
      </div>
    </Card>
  );
}
