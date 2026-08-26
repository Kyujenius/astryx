import {useState} from 'react';
import {Card} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

const icons = ['📄', '🎯', '🚀', '💡', '📊', '🎨', '🔧', '📝'];
const covers = ['https://picsum.photos/800/200?1', 'https://picsum.photos/800/200?2', 'https://picsum.photos/800/200?3'];

export default function NotionPageHeader() {
  const [icon, setIcon] = useState('📄');
  const [cover, setCover] = useState(covers[0]);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Card className="overflow-hidden">
      <img className="w-full h-48 object-cover" src={cover} alt="Cover" />
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-3">
          <button className="text-4xl" onClick={() => setShowPicker(!showPicker)} aria-label="Pick icon">{icon}</button>
          <h1 className="text-3xl font-bold">Untitled</h1>
        </div>
        {showPicker && (
          <div className="flex gap-1 flex-wrap">
            {icons.map((ic) => (
              <Button key={ic} variant="ghost" size="sm" onClick={() => { setIcon(ic); setShowPicker(false); }}>{ic}</Button>
            ))}
          </div>
        )}
        <div className="flex gap-1">
          {covers.map((url, i) => (
            <Button key={i} variant={cover === url ? 'default' : 'outline'} size="sm" onClick={() => setCover(url)}>
              Cover {i + 1}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}
