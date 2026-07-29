import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import stylex from '@stylexjs/stylex';
import {useState} from 'react';

const MOBILE_BREAKPOINT = '@media (max-width: 768px)';

const styles = stylex.create({
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 40,
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#fff',
    zIndex: 50,
    padding: 24,
    overflowY: 'auto',
    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
    [MOBILE_BREAKPOINT]: {
      top: 'auto',
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '60vh',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.15)',
    },
  },
  handle: {
    display: 'none',
    [MOBILE_BREAKPOINT]: {
      display: 'block',
      width: 40,
      height: 4,
      backgroundColor: '#ccc',
      borderRadius: 2,
      margin: '0 auto 16px',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
});

interface ResponsiveSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ResponsiveSidebar({isOpen, onClose, children}: ResponsiveSidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      <div {...stylex.props(styles.overlay)} onClick={onClose} aria-hidden="true" />
      <aside {...stylex.props(styles.sidebar)} role="complementary" aria-label="Sidebar">
        <div {...stylex.props(styles.handle)} />
        <div {...stylex.props(styles.content)}>
          <Button variant="ghost" onPress={onClose} aria-label="Close sidebar">
            Close
          </Button>
          {children}
        </div>
      </aside>
    </>
  );
}
