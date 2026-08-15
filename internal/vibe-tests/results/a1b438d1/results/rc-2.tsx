import {useState} from 'react';
import {SideNav} from '@astryxdesign/core/SideNav';
import {SideNavHeading} from '@astryxdesign/core/SideNav';
import {SideNavItem} from '@astryxdesign/core/SideNav';
import {SideNavSection} from '@astryxdesign/core/SideNav';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {IconButton} from '@astryxdesign/core/IconButton';

const navItems = [
  {id: 'dashboard', label: 'Dashboard'},
  {id: 'projects', label: 'Projects'},
  {id: 'tasks', label: 'Tasks'},
  {id: 'settings', label: 'Settings'},
];

export default function ResponsiveSidebar() {
  const [active, setActive] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 border-r">
        <SideNav header={<SideNavHeading heading="My App" />}>
          <SideNavSection title="Navigation">
            {navItems.map(item => (
              <SideNavItem
                key={item.id}
                label={item.label}
                isSelected={active === item.id}
                onClick={() => setActive(item.id)}
              />
            ))}
          </SideNavSection>
        </SideNav>
      </aside>

      {/* Mobile bottom sheet */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[60vh]">
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <nav className="flex flex-col gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActive(item.id); setIsMobileOpen(false); }}
                  className={`text-left px-4 py-3 rounded-lg ${active === item.id ? 'bg-blue-50 font-medium text-blue-700' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="md:hidden mb-4">
          <Button label="Menu" variant="secondary" onClick={() => setIsMobileOpen(true)} />
        </div>
        <Heading level={1}>{navItems.find(i => i.id === active)?.label}</Heading>
        <Text>Content for the {active} section goes here.</Text>
      </main>
    </div>
  );
}
