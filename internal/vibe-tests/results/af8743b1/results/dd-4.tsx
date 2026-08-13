import {useState} from 'react';
import {TabList} from '@astryxdesign/core/TabList';
import {Tab} from '@astryxdesign/core/Tab';
import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';

export default function UserProfile() {
  const [tab, setTab] = useState('overview');

  return (
    <div>
      <Heading level={1}>Jane Doe</Heading>
      <Text type="supporting" color="secondary" as="p" display="block">Software Engineer</Text>

      <TabList value={tab} onChange={setTab} hasDivider>
        <Tab value="overview" label="Overview" />
        <Tab value="activity" label="Activity" />
        <Tab value="settings" label="Settings" />
      </TabList>

      {tab === 'overview' && (
        <Card padding={4}>
          <Heading level={3}>About</Heading>
          <Text as="p" display="block">Full-stack developer with 5 years of experience building web applications.</Text>
          <Heading level={3}>Contact</Heading>
          <Text as="p" display="block">jane.doe@example.com</Text>
        </Card>
      )}

      {tab === 'activity' && (
        <Card padding={4}>
          <Heading level={3}>Recent Activity</Heading>
          <Text as="p" display="block">Pushed 3 commits to main branch</Text>
          <Text type="supporting" as="p" display="block">2 hours ago</Text>
          <Text as="p" display="block">Opened PR #142: Add user profile page</Text>
          <Text type="supporting" as="p" display="block">5 hours ago</Text>
        </Card>
      )}

      {tab === 'settings' && (
        <Card padding={4}>
          <Heading level={3}>Preferences</Heading>
          <Text as="p" display="block">Email notifications: On</Text>
          <Text as="p" display="block">Theme: System default</Text>
        </Card>
      )}
    </div>
  );
}
