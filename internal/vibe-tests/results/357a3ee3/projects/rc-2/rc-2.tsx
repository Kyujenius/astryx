import {useState, useEffect} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  layout: {
    display: 'flex',
    minHeight: '100vh',
  },
  sidebar: {
    width: 280,
    borderRight: '1px solid #e0e0e0',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  main: {
    flex: 1,
    padding: 24,
  },
  bottomSheet: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e0e0e0',
    borderRadius: '16px 16px 0 0',
    padding: 16,
    boxShadow: '0 -4px 16px rgba(0,0,0,0.1)',
    maxHeight: '60vh',
    overflowY: 'auto',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  navItem: {
    padding: '8px 12px',
    borderRadius: 6,
    cursor: 'pointer',
  },
  navItemActive: {
    backgroundColor: '#f0f0f0',
  },
  mobileToggle: {
    position: 'fixed',
    bottom: 16,
    right: 16,
  },
});

const NAV_ITEMS = ['Dashboard', 'Projects', 'Tasks', 'Messages', 'Settings'];

export default function ResponsiveSidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [active, setActive] = useState('Dashboard');

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const navContent = (
    <>
      <Heading level={3}>Navigation</Heading>
      {NAV_ITEMS.map((item) => (
        <div
          key={item}
          {...stylex.props(styles.navItem, item === active && styles.navItemActive)}
          onClick={() => {
            setActive(item);
            if (isMobile) setIsSheetOpen(false);
          }}
          role="button"
          tabIndex={0}
          aria-current={item === active ? 'page' : undefined}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setActive(item);
              if (isMobile) setIsSheetOpen(false);
            }
          }}
        >
          <Text weight={item === active ? 'medium' : 'normal'}>{item}</Text>
        </div>
      ))}
    </>
  );

  if (isMobile) {
    return (
      <div>
        <div {...stylex.props(styles.main)}>
          <Heading level={1}>{active}</Heading>
          <Text>Content for {active} page.</Text>
        </div>
        <div {...stylex.props(styles.mobileToggle)}>
          <Button label="Menu" variant="primary" onClick={() => setIsSheetOpen(true)} />
        </div>
        {isSheetOpen && (
          <>
            <div
              {...stylex.props(styles.overlay)}
              onClick={() => setIsSheetOpen(false)}
              role="presentation"
            />
            <Card padding={3}>
              <div {...stylex.props(styles.bottomSheet)}>
                {navContent}
              </div>
            </Card>
          </>
        )}
      </div>
    );
  }

  return (
    <div {...stylex.props(styles.layout)}>
      <nav {...stylex.props(styles.sidebar)}>
        {navContent}
      </nav>
      <main {...stylex.props(styles.main)}>
        <Heading level={1}>{active}</Heading>
        <Text>Content for {active} page.</Text>
      </main>
    </div>
  );
}
