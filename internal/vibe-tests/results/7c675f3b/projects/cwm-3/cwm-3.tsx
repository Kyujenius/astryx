import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
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
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="lg" className="text-3xl">{selectedIcon}</Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3">
            <p className="text-sm font-medium mb-2">Pick an icon</p>
            <div className="grid grid-cols-6 gap-1">
              {icons.map((icon) => (
                <Button key={icon} variant="ghost" size="sm" onClick={() => setSelectedIcon(icon)}>{icon}</Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <h1 className="text-4xl font-bold">Untitled</h1>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCoverUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=400&fit=crop')}
        >
          Add cover
        </Button>
      </div>
    </div>
  );
}
