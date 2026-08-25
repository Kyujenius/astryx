import {useState} from 'react';
import {Heading} from '@astryxdesign/core/Heading';
import {Button} from '@astryxdesign/core/Button';

const icons = ['\ud83d\udcdd', '\ud83d\ude80', '\ud83c\udf1f', '\ud83d\udca1', '\ud83c\udfaf', '\ud83d\udce6', '\ud83c\udf3f', '\ud83d\udd25', '\ud83c\udfa8', '\u2728', '\ud83d\udcda', '\ud83d\udd10'];

export default function PageHeader() {
  const [icon, setIcon] = useState('\ud83d\udcdd');
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [coverUrl, setCoverUrl] = useState('');
  const [title, setTitle] = useState('Untitled');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      {coverUrl ? (
        <img src={coverUrl} alt="Cover" className="w-full h-48 object-cover rounded-lg" />
      ) : (
        <div className="w-full h-48 bg-gray-100 rounded-lg flex items-start p-2">
          <Button label="Add cover" variant="ghost" size="sm" onClick={() => setCoverUrl('https://picsum.photos/800/200')} />
        </div>
      )}
      <div className="flex items-center gap-2 px-4">
        <button
          className="text-3xl bg-transparent border-none cursor-pointer p-1 rounded hover:bg-gray-100"
          onClick={() => setShowIconPicker(!showIconPicker)}
          aria-label="Change page icon"
        >
          {icon}
        </button>
        {isEditing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
            autoFocus
            className="text-3xl font-bold border-none outline-none flex-1"
          />
        ) : (
          <div onClick={() => setIsEditing(true)} className="cursor-pointer">
            <Heading level={1}>{title}</Heading>
          </div>
        )}
      </div>
      {showIconPicker && (
        <div className="grid grid-cols-6 gap-2 p-3 border rounded-lg mx-4">
          {icons.map((emoji) => (
            <button key={emoji} className="text-2xl p-2 rounded cursor-pointer border-none bg-transparent hover:bg-gray-100" onClick={() => { setIcon(emoji); setShowIconPicker(false); }}>
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
