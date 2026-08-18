import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const fruits = ['Apple', 'Banana', 'Mango', 'Strawberry'];
const ripenessLevels = ['Unripe', 'Ripe', 'Overripe'];

type Selection = { fruit: string; ripeness: string };

export default function FruitPicker() {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<Selection>({ fruit: 'Apple', ripeness: 'Ripe' });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[240px] justify-between">
          {`${selection.fruit} — ${selection.ripeness}`}
          <span className="ml-2 opacity-50">▼</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Select fruit and ripeness</p>
          <div role="grid" aria-label="Fruit ripeness grid" className="grid gap-1" style={{ gridTemplateColumns: `auto repeat(${ripenessLevels.length}, 1fr)` }}>
            <div role="columnheader" />
            {ripenessLevels.map((r) => (
              <div key={r} role="columnheader" className="text-xs text-center text-muted-foreground">{r}</div>
            ))}
            {fruits.map((fruit) => (
              <div key={fruit} role="row" className="contents">
                <div role="rowheader" className="text-sm font-medium py-1">{fruit}</div>
                {ripenessLevels.map((ripeness) => {
                  const isSelected = selection.fruit === fruit && selection.ripeness === ripeness;
                  return (
                    <button
                      key={ripeness}
                      role="gridcell"
                      aria-selected={isSelected}
                      className={cn(
                        "p-2 rounded border text-xs text-center cursor-pointer transition-colors",
                        isSelected ? "border-primary bg-primary/10 font-medium" : "border-border hover:bg-accent"
                      )}
                      onClick={() => { setSelection({ fruit, ripeness }); setOpen(false); }}
                    >
                      {isSelected ? '✓' : ''}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
