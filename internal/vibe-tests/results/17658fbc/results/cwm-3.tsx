import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

const ICONS = ['📄', '🎯', '🚀', '💡', '🎨', '📊', '🔧', '⭐', '📝', '🌟', '🎉', '🏆'];

export default function NotionPageHeader() {
  const [pageIcon, setPageIcon] = useState('📄');
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  return (
    <div className="w-full">
      {coverUrl ? (
        <div className="w-full h-[200px] rounded-lg overflow-hidden">
          <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-full h-[200px] rounded-lg bg-muted flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => setCoverUrl('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200')}
          >
            Add cover
          </Button>
        </div>
      )}

      <div className="relative -mt-10 px-6">
        <div className="space-y-3">
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-5xl cursor-pointer hover:opacity-80">
                {pageIcon}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto">
              <div className="grid grid-cols-6 gap-2 p-2">
                {ICONS.map((icon) => (
                  <Button
                    key={icon}
                    variant="ghost"
                    size="sm"
                    onClick={() => setPageIcon(icon)}
                  >
                    {icon}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Untitled</h1>
            <p className="text-muted-foreground text-sm">Add a description...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
