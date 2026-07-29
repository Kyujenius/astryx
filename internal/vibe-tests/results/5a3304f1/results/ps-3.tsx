import {Layout} from '@astryxdesign/core/Layout';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {SideNav, SideNavItem, SideNavSection, SideNavHeading} from '@astryxdesign/core/SideNav';
import stylex from '@stylexjs/stylex';
import {useState} from 'react';

const styles = stylex.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    borderBottom: '1px solid #e0e0e0',
  },
  main: {
    padding: 24,
    flex: 1,
    overflowY: 'auto',
  },
  sidebar: {
    width: 260,
    borderRight: '1px solid #e0e0e0',
    overflowY: 'auto',
  },
  sidebarCollapsed: {
    width: 0,
    overflow: 'hidden',
  },
});

interface AdminPanelProps {
  children?: React.ReactNode;
}

export default function AdminPanel({children}: AdminPanelProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <Layout>
      <header {...stylex.props(styles.header)}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <Button variant="ghost" onPress={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
            Menu
          </Button>
          <Heading level={1}>Admin Panel</Heading>
        </div>
      </header>
      <div style={{display: 'flex', flex: 1, overflow: 'hidden'}}>
        <nav {...stylex.props(styles.sidebar, !sidebarOpen && styles.sidebarCollapsed)}>
          <SideNav aria-label="Admin navigation">
            <SideNavSection>
              <SideNavHeading>Main</SideNavHeading>
              <SideNavItem isSelected={activePage === 'dashboard'} onPress={() => setActivePage('dashboard')}>
                Dashboard
              </SideNavItem>
              <SideNavItem isSelected={activePage === 'users'} onPress={() => setActivePage('users')}>
                Users
              </SideNavItem>
              <SideNavItem isSelected={activePage === 'content'} onPress={() => setActivePage('content')}>
                Content
              </SideNavItem>
            </SideNavSection>
            <SideNavSection>
              <SideNavHeading>Settings</SideNavHeading>
              <SideNavItem isSelected={activePage === 'general'} onPress={() => setActivePage('general')}>
                General
              </SideNavItem>
              <SideNavItem isSelected={activePage === 'security'} onPress={() => setActivePage('security')}>
                Security
              </SideNavItem>
            </SideNavSection>
          </SideNav>
        </nav>
        <main {...stylex.props(styles.main)}>
          {children ?? <Text>Select a page from the sidebar.</Text>}
        </main>
      </div>
    </Layout>
  );
}
