import {useState} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

const ICONS = ['📄', '🎯', '📚', '💡', '🚀', '🎨', '📝', '🔧', '⭐', '🌈', '🎵', '🌿'];

export default function NotionPageHeader() {
  const [icon, setIcon] = useState('📄');
  const [coverUrl, setCoverUrl] = useState('');
  const [showCoverInput, setShowCoverInput] = useState(false);
  const [title] = useState('Untitled');

  return (
    <div className="max-w-3xl mx-auto">
      {coverUrl ? (
        <div className="h-48 bg-cover bg-center rounded-lg relative" style={{backgroundImage: `url(${coverUrl})`}}>
          <Button variant="ghost" className="absolute bottom-2 right-2" onClick={() => setShowCoverInput(true)}>Change cover</Button>
        </div>
      ) : (
        <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
          <Button variant="ghost" onClick={() => setShowCoverInput(true)}>Add cover</Button>
        </div>
      )}
      {showCoverInput && (
        <Card className="mt-2">
          <CardContent className="flex gap-2 p-3">
            <Input placeholder="Image URL" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} />
            <Button onClick={() => setShowCoverInput(false)}>Done</Button>
          </CardContent>
        </Card>
      )}
      <div className="flex items-center gap-3 -mt-8 ml-6 relative">
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-5xl w-16 h-16 flex items-center justify-center bg-white rounded-lg shadow">{icon}</button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="grid grid-cols-6 gap-2">
              {ICONS.map((emoji) => (
                <button key={emoji} className="text-2xl p-1 rounded hover:bg-muted" onClick={() => setIcon(emoji)}>{emoji}</button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <h1 className="text-4xl font-bold mt-4 px-6">{title}</h1>
    </div>
  );
}
