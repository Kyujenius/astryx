import {TabList} from '@astryxdesign/core/TabList';
import {Tab} from '@astryxdesign/core/Tab';
import {Card} from '@astryxdesign/core/Card';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Avatar} from '@astryxdesign/core/Avatar';
import {useState} from 'react';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('overview');
  return (
    <Stack gap="lg">
      <Stack direction="horizontal" gap="md" align="center">
        <Avatar name="Jane Doe" size="lg" />
        <Stack gap="xs"><Heading level={1}>Jane Doe</Heading><Text color="secondary">Software Engineer</Text></Stack>
      </Stack>
      <TabList selectedKey={activeTab} onSelectionChange={key => setActiveTab(key as string)}>
        <Tab id="overview">Overview</Tab><Tab id="activity">Activity</Tab><Tab id="settings">Settings</Tab>
      </TabList>
      {activeTab === 'overview' && (<Card><Stack gap="md"><Heading level={3}>About</Heading><Text>Full-stack engineer focused on design systems.</Text></Stack></Card>)}
      {activeTab === 'activity' && (<Card><Stack gap="sm"><Text>Pushed 3 commits to main</Text><Text>Opened PR #142</Text></Stack></Card>)}
      {activeTab === 'settings' && (<Card><Stack gap="md"><Heading level={3}>Account Settings</Heading><Text>Manage preferences here.</Text></Stack></Card>)}
    </Stack>
  );
}
