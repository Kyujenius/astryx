import {Layout} from '@astryxdesign/core/Layout';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {SideNav, SideNavItem, SideNavSection, SideNavHeading} from '@astryxdesign/core/SideNav';
import {useState} from 'react';

interface AdminPanelProps {
  children?: React.ReactNode;
}

export default function AdminPanel({children}: AdminPanelProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <Layout>
      <header className="flex items-center justify-between px-6 py-3 border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onPress={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
            Menu
          </Button>
          <Heading level={1}>Admin Panel</Heading>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <nav className={`border-r overflow-y-auto transition-all ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
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
        <main className="flex-1 p-6 overflow-y-auto">
          {children ?? <Text>Select a page from the sidebar.</Text>}
        </main>
      </div>
    </Layout>
  );
}
