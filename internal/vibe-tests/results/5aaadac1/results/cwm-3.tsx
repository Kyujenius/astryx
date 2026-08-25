import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

const icons = ['\ud83d\udcdd', '\ud83d\ude80', '\ud83c\udf1f', '\ud83d\udca1', '\ud83c\udfaf', '\ud83d\udce6', '\ud83c\udf3f', '\ud83d\udd25', '\ud83c\udfa8', '\u2728', '\ud83d\udcda', '\ud83d\udd10'];

export default function PageHeader() {
  const [icon, setIcon] = useState('\ud83d\udcdd');
  const [coverUrl, setCoverUrl] = useState('');
  const [title, setTitle] = useState('Untitled');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-3">
      {coverUrl ? (
        <img src={coverUrl} alt="Cover" className="w-full h-48 object-cover rounded-lg" />
      ) : (
        <div className="w-full h-48 bg-muted rounded-lg flex items-start p-3">
          <Button variant="ghost" size="sm" onClick={() => setCoverUrl('https://picsum.photos/800/200')}>Add cover</Button>
        </div>
      )}
      <div className="flex items-center gap-2 px-4">
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-3xl bg-transparent border-none cursor-pointer p-1 rounded hover:bg-muted">{icon}</button>
          </PopoverTrigger>
          <PopoverContent className="w-auto">
            <div className="grid grid-cols-6 gap-2 p-2">
              {icons.map((emoji) => (
                <button key={emoji} className="text-xl p-1 rounded hover:bg-muted cursor-pointer border-none bg-transparent" onClick={() => setIcon(emoji)}>
                  {emoji}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        {isEditing ? (
          <input value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => setIsEditing(false)} onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)} autoFocus className="text-3xl font-bold border-none outline-none flex-1 bg-transparent" />
        ) : (
          <h1 className="text-3xl font-bold cursor-pointer" onClick={() => setIsEditing(true)}>{title}</h1>
        )}
      </div>
    </div>
  );
}
