import {useState} from 'react';
import {TabList} from '@astryxdesign/core/TabList';
import {Tab} from '@astryxdesign/core/TabList';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Avatar} from '@astryxdesign/core/Avatar';
import {HStack} from '@astryxdesign/core/HStack';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <VStack gap={4} padding={4}>
      <HStack gap={3} vAlign="center">
        <Avatar name="Jane Doe" size="lg" />
        <VStack gap={0.5}>
          <Heading level={2}>Jane Doe</Heading>
          <Text color="secondary">Software Engineer</Text>
        </VStack>
      </HStack>

      <TabList value={activeTab} onChange={setActiveTab} hasDivider>
        <Tab value="overview" label="Overview" />
        <Tab value="activity" label="Activity" />
        <Tab value="settings" label="Settings" />
      </TabList>

      {activeTab === 'overview' && (
        <VStack gap={3}>
          <Heading level={3}>About</Heading>
          <Text>Full-stack engineer focused on design systems and developer tooling. Based in San Francisco.</Text>
          <Heading level={3}>Skills</Heading>
          <Text>React, TypeScript, Node.js, GraphQL, Design Systems</Text>
        </VStack>
      )}

      {activeTab === 'activity' && (
        <VStack gap={3}>
          <Heading level={3}>Recent Activity</Heading>
          <Text>Merged PR: Fix button hover states</Text>
          <Text>Commented on: TabList overflow behavior</Text>
          <Text>Created issue: Dark mode contrast</Text>
        </VStack>
      )}

      {activeTab === 'settings' && (
        <VStack gap={3}>
          <Heading level={3}>Account Settings</Heading>
          <Text>Email: jane.doe@example.com</Text>
          <Text>Timezone: America/Los_Angeles</Text>
          <Text>Language: English</Text>
        </VStack>
      )}
    </VStack>
  );
}
