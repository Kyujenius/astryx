import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';

export default function FormattingToolbar() {
  const [active, setActive] = useState<Set<string>>(new Set());

  const toggle = (format: string) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(format)) next.delete(format);
      else next.add(format);
      return next;
    });
  };

  const tools = [
    { id: 'bold', label: 'Bold', shortcut: 'Ctrl+B', icon: 'B' },
    { id: 'italic', label: 'Italic', shortcut: 'Ctrl+I', icon: 'I' },
    { id: 'underline', label: 'Underline', shortcut: 'Ctrl+U', icon: 'U' },
    { id: 'link', label: 'Link', shortcut: 'Ctrl+K', icon: '🔗' },
  ];

  return (
    <TooltipProvider>
      <div className="flex gap-1 p-1 border rounded-md w-fit" role="toolbar" aria-label="Text formatting">
        {tools.map((tool) => (
          <Tooltip key={tool.id}>
            <TooltipTrigger asChild>
              <Button
                variant={active.has(tool.id) ? 'default' : 'ghost'}
                size="icon"
                aria-label={tool.label}
                aria-pressed={active.has(tool.id)}
                onClick={() => toggle(tool.id)}
              >
                <span className="text-sm font-bold">{tool.icon}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tool.label} ({tool.shortcut})</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
