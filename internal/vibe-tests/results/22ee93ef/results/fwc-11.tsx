// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const iconStyle = {background: 'none', border: '1px solid #ddd', borderRadius: 4, padding: 8, cursor: 'pointer', position: 'relative' as const};

function TooltipButton({label, shortcut, children}: {label: string; shortcut: string; children: React.ReactNode}) {
  const [show, setShow] = useState(false);
  return (
    <div style={{position: 'relative', display: 'inline-block'}} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <button style={iconStyle} aria-label={label}>{children}</button>
      {show && (
        <div style={{position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)', background: '#333', color: '#fff', padding: '4px 8px', borderRadius: 4, fontSize: 12, whiteSpace: 'nowrap', zIndex: 10}}>
          {label} ({shortcut})
        </div>
      )}
    </div>
  );
}

export default function FormattingToolbar() {
  return (
    <div style={{display: 'flex', gap: 4, padding: 8, border: '1px solid #e0e0e0', borderRadius: 8, width: 'fit-content'}}>
      <TooltipButton label="Bold" shortcut="Ctrl+B"><strong>B</strong></TooltipButton>
      <TooltipButton label="Italic" shortcut="Ctrl+I"><em>I</em></TooltipButton>
      <TooltipButton label="Underline" shortcut="Ctrl+U"><u>U</u></TooltipButton>
      <TooltipButton label="Link" shortcut="Ctrl+K">🔗</TooltipButton>
    </div>
  );
}
