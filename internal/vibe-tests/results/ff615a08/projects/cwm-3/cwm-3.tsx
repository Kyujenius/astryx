import {useState} from 'react';
import {Card} from '../components/ui/card';
import {Button} from '../components/ui/button';

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
    <Card className="overflow-hidden">
      <div className="relative h-48 flex items-start justify-end p-3" style={{background: covers[coverIndex]}}>
        <Button variant="ghost" size="sm" onClick={() => setCoverIndex((i) => (i + 1) % covers.length)}>
          Change cover
        </Button>
      </div>
      <div className="relative px-6 pb-6">
        <div className="-mt-6 text-5xl cursor-pointer" onClick={() => setShowIconPicker(!showIconPicker)}>
          {icon}
        </div>
        {showIconPicker && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {icons.map((emoji) => (
              <Button key={emoji} variant="ghost" size="sm" onClick={() => { setIcon(emoji); setShowIconPicker(false); }}>
                {emoji}
              </Button>
            ))}
          </div>
        )}
        <h1 className="text-3xl font-bold mt-4">Untitled</h1>
      </div>
    </Card>
  );
}
