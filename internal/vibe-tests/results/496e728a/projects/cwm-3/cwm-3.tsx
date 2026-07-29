import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {useState} from 'react';

const ICONS = ['📄', '🎯', '📋', '🚀', '💡', '📊', '🎨', '⚡'];

interface PageHeaderProps {
  initialTitle?: string;
  initialIcon?: string;
  coverUrl?: string;
}

export default function NotionPageHeader({
  initialTitle = 'Untitled',
  initialIcon = '📄',
  coverUrl,
}: PageHeaderProps) {
  const [title, setTitle] = useState(initialTitle);
  const [icon, setIcon] = useState(initialIcon);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Card>
      <CardContent className="p-0">
        {coverUrl ? (
          <img src={coverUrl} alt="" className="w-full h-48 object-cover rounded-t-lg" />
        ) : (
          <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
            <Button variant="outline">Add Cover</Button>
          </div>
        )}
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <span
              className="text-5xl cursor-pointer"
              onClick={() => setShowPicker(!showPicker)}
              role="button"
            >
              {icon}
            </span>
            {showPicker && (
              <div className="flex gap-1 flex-wrap">
                {ICONS.map((e) => (
                  <Button key={e} variant="ghost" size="sm" onClick={() => { setIcon(e); setShowPicker(false); }}>
                    {e}
                  </Button>
                ))}
              </div>
            )}
          </div>
          <input
            className="w-full text-3xl font-bold border-none outline-none bg-transparent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled"
          />
        </div>
      </CardContent>
    </Card>
  );
}
