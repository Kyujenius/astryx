import {Button} from '@astryxdesign/core/Button';
import {Tooltip} from '@astryxdesign/core/Tooltip';
import {HStack} from '@astryxdesign/core/HStack';
import {useState} from 'react';

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
    { id: 'bold', label: 'Bold', shortcut: 'Ctrl+B' },
    { id: 'italic', label: 'Italic', shortcut: 'Ctrl+I' },
    { id: 'underline', label: 'Underline', shortcut: 'Ctrl+U' },
    { id: 'link', label: 'Link', shortcut: 'Ctrl+K' },
  ];

  return (
    <HStack gap={1} padding={1}>
      {tools.map((tool) => (
        <Tooltip key={tool.id} content={`${tool.label} (${tool.shortcut})`}>
          <Button
            label={tool.label}
            variant={active.has(tool.id) ? 'primary' : 'ghost'}
            size="sm"
            isIconOnly
            icon={<span aria-hidden>{tool.id[0].toUpperCase()}</span>}
            onClick={() => toggle(tool.id)}
          />
        </Tooltip>
      ))}
    </HStack>
  );
}
