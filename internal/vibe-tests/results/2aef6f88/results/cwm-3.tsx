import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

const ICONS = ['📄', '🎯', '📊', '💡', '🚀', '📝', '🎨', '📋', '⚡', '🌟', '🔧', '📦'];

export default function PageHeader() {
  const [icon, setIcon] = useState('📄');
  const [coverUrl, setCoverUrl] = useState('');
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [title] = useState('Untitled');

  return (
    <div className="space-y-3">
      {coverUrl ? (
        <img src={coverUrl} alt="Page cover" className="w-full h-48 object-cover rounded-lg" />
      ) : (
        <Button variant="ghost" size="sm" onClick={() => setCoverUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200')}>
          Add cover
        </Button>
      )}

      <div className="flex items-center gap-2">
        <Popover open={showIconPicker} onOpenChange={setShowIconPicker}>
          <PopoverTrigger asChild>
            <button className="text-4xl p-1 rounded hover:bg-muted cursor-pointer border-none bg-transparent">
              {icon}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px]">
            <div className="grid grid-cols-6 gap-1">
              {ICONS.map((emoji) => (
                <button key={emoji} className="text-2xl p-1 rounded hover:bg-muted cursor-pointer border-none bg-transparent" onClick={() => { setIcon(emoji); setShowIconPicker(false); }}>
                  {emoji}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
    </div>
  );
}
