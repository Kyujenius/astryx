import {AppShell} from '@astryxdesign/core/AppShell';
import {TopNav} from '@astryxdesign/core/TopNav';
import {SideNav} from '@astryxdesign/core/SideNav';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {ThemeProvider} from '@astryxdesign/core/ThemeProvider';
import {neutralTheme} from '@astryxdesign/theme-neutral';

export default function AdminPanel() {
  return (
    <ThemeProvider theme={neutralTheme}>
      <AppShell
        height="fill"
        topNav={<TopNav heading={<Text weight="bold">Admin</Text>} />}
        sideNav={<SideNav collapsible><div className="p-3 space-y-2"><Text>Dashboard</Text><Text>Users</Text><Text>Settings</Text></div></SideNav>}
        contentPadding={4}
      >
        <div className="flex gap-4">
          <div className="flex-1"><Heading level={2}>Dashboard</Heading><Text>Main content</Text></div>
          <div className="w-64 border-l pl-4"><Heading level={4}>Details</Heading><Text color="secondary">Panel content</Text></div>
        </div>
      </AppShell>
    </ThemeProvider>
  );
}
