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
    <div role="toolbar" aria-label="Text formatting" style={{ display: 'flex', gap: 4, padding: 4, border: '1px solid #ddd', borderRadius: 6, width: 'fit-content' }}>
      {tools.map((tool) => (
        <div key={tool.id} style={{ position: 'relative' }} className="toolbar-btn-wrap">
          <button
            aria-label={tool.label}
            aria-pressed={active.has(tool.id)}
            title={`${tool.label} (${tool.shortcut})`}
            onClick={() => toggle(tool.id)}
            style={{
              width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold', fontSize: 14,
              background: active.has(tool.id) ? '#0066cc' : 'transparent',
              color: active.has(tool.id) ? 'white' : '#333',
            }}
          >
            {tool.icon}
          </button>
        </div>
      ))}
    </div>
  );
}
