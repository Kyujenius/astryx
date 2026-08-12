import {useState} from 'react';
import {TabList} from '@astryxdesign/core/TabList';
import {Tab} from '@astryxdesign/core/Tab';
import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';

export default function UserProfile() {
  const [tab, setTab] = useState('overview');

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="mb-6">
        <Heading level={1}>Jane Doe</Heading>
        <Text type="supporting" color="secondary" as="p" display="block">Software Engineer</Text>
      </div>

      <TabList value={tab} onChange={setTab} hasDivider>
        <Tab value="overview" label="Overview" />
        <Tab value="activity" label="Activity" />
        <Tab value="settings" label="Settings" />
      </TabList>

      <div className="mt-4">
        {tab === 'overview' && (
          <Card padding={4}>
            <div className="flex flex-col gap-4">
              <Heading level={3}>About</Heading>
              <Text as="p" display="block">Full-stack developer with 5 years of experience.</Text>
              <Heading level={3}>Contact</Heading>
              <Text as="p" display="block">jane.doe@example.com</Text>
            </div>
          </Card>
        )}
        {tab === 'activity' && (
          <Card padding={4}>
            <div className="flex flex-col gap-3">
              <Heading level={3}>Recent Activity</Heading>
              <div className="border-l-2 border-gray-200 pl-4">
                <Text as="p" display="block">Pushed 3 commits to main</Text>
                <Text type="supporting" as="p" display="block">2 hours ago</Text>
              </div>
              <div className="border-l-2 border-gray-200 pl-4">
                <Text as="p" display="block">Opened PR #142</Text>
                <Text type="supporting" as="p" display="block">5 hours ago</Text>
              </div>
            </div>
          </Card>
        )}
        {tab === 'settings' && (
          <Card padding={4}>
            <div className="flex flex-col gap-3">
              <Heading level={3}>Preferences</Heading>
              <Text as="p" display="block">Email notifications: On</Text>
              <Text as="p" display="block">Theme: System default</Text>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
