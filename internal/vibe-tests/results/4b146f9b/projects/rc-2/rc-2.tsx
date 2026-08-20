import {useState, useEffect} from 'react';
import {SideNav} from '@astryxdesign/core/SideNav';
import {SideNavItem} from '@astryxdesign/core/SideNav';
import {SideNavSection} from '@astryxdesign/core/SideNav';
import {BottomSheet} from '@astryxdesign/core/BottomSheet';
import {Stack} from '@astryxdesign/core/Stack';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';

const NAV_ITEMS = [
  {id: 'home', label: 'Home'},
  {id: 'projects', label: 'Projects'},
  {id: 'tasks', label: 'Tasks'},
  {id: 'messages', label: 'Messages'},
  {id: 'settings', label: 'Settings'},
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export default function ResponsiveSidebar() {
  const [selected, setSelected] = useState('home');
  const [sheetOpen, setSheetOpen] = useState(false);
  const isMobile = useIsMobile();

  const navContent = (
    <Stack gap={1}>
      {NAV_ITEMS.map((item) => (
        <SideNavItem
          key={item.id}
          label={item.label}
          isSelected={selected === item.id}
          onClick={() => {
            setSelected(item.id);
            if (isMobile) setSheetOpen(false);
          }}
        />
      ))}
    </Stack>
  );

  if (isMobile) {
    return (
      <>
        <Button label="Menu" variant="ghost" onClick={() => setSheetOpen(true)} />
        <BottomSheet
          isOpen={sheetOpen}
          onOpenChange={setSheetOpen}
          label="Navigation"
        >
          <Stack padding={2}>
            {navContent}
          </Stack>
        </BottomSheet>
      </>
    );
  }

  return (
    <SideNav>
      <SideNavSection label="Navigation">
        {navContent}
      </SideNavSection>
    </SideNav>
  );
}
