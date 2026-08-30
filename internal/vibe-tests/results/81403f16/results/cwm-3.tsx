import React, {useState} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

const icons = ['\ud83d\udcdd', '\ud83d\ude80', '\ud83c\udf1f', '\ud83d\udca1', '\ud83c\udfaf', '\ud83d\udcda'];

export default function NotionHeader() {
  const [selectedIcon, setSelectedIcon] = useState('\ud83d\udcdd');
  const [hasCover, setHasCover] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  return (
    <Card className="w-full max-w-2xl overflow-hidden">
      {hasCover && <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500" />}
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <span className="text-5xl -mt-8">{selectedIcon}</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setShowPicker(!showPicker)}>{showPicker ? 'Close' : 'Change icon'}</Button>
            <Button variant="ghost" size="sm" onClick={() => setHasCover(!hasCover)}>{hasCover ? 'Remove cover' : 'Add cover'}</Button>
          </div>
        </div>
        {showPicker && (
          <div className="mt-3 p-3 bg-muted rounded-md flex flex-wrap gap-2">
            {icons.map(icon => (
              <Button key={icon} variant={icon === selectedIcon ? 'default' : 'ghost'} size="sm" onClick={() => { setSelectedIcon(icon); setShowPicker(false); }}>{icon}</Button>
            ))}
          </div>
        )}
        <h1 className="text-3xl font-bold mt-4">Untitled</h1>
        <p className="text-muted-foreground mt-2">Start writing or press / for commands...</p>
      </CardContent>
    </Card>
  );
}
