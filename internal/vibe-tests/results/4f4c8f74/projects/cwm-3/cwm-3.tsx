import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

const icons = ['📄', '🎯', '🚀', '💡', '📊', '🔧', '🎨', '📝', '⚡', '🌟', '🔥', '🏗️'];

export default function PageHeader() {
  const [icon, setIcon] = useState('📄');
  const [hasCover, setHasCover] = useState(true);

  return (
    <div className="rounded-lg border overflow-hidden">
      {hasCover && <div className="h-48 bg-gradient-to-br from-violet-500 to-fuchsia-500" />}
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="text-3xl p-2 h-auto">{icon}</Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="grid grid-cols-6 gap-1">
                {icons.map(e => (
                  <Button key={e} variant="ghost" size="sm" onClick={() => setIcon(e)}>{e}</Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="ghost" size="sm" onClick={() => setHasCover(!hasCover)}>
            {hasCover ? 'Remove cover' : 'Add cover'}
          </Button>
        </div>
        <h1 className="text-4xl font-bold">Untitled</h1>
        <p className="text-muted-foreground">Start typing here...</p>
      </div>
    </div>
  );
}
