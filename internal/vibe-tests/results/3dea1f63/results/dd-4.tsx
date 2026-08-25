import {useState} from 'react';
import {TabList} from '@astryxdesign/core/TabList';
import {Tab} from '@astryxdesign/core/TabList';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Avatar} from '@astryxdesign/core/Avatar';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <VStack gap={4} padding={4}>
      <div className="flex items-center gap-3">
        <Avatar name="Jane Doe" size="lg" />
        <div>
          <Heading level={2}>Jane Doe</Heading>
          <Text color="secondary">Software Engineer</Text>
        </div>
      </div>

      <TabList value={activeTab} onChange={setActiveTab} hasDivider>
        <Tab value="overview" label="Overview" />
        <Tab value="activity" label="Activity" />
        <Tab value="settings" label="Settings" />
      </TabList>

      <div className="py-2">
        {activeTab === 'overview' && (
          <VStack gap={3}>
            <Heading level={3}>About</Heading>
            <Text>Full-stack engineer focused on design systems.</Text>
            <Heading level={3}>Skills</Heading>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'GraphQL'].map((skill) => (
                <span key={skill} className="px-2 py-1 bg-gray-100 rounded text-sm">{skill}</span>
              ))}
            </div>
          </VStack>
        )}
        {activeTab === 'activity' && (
          <VStack gap={2}>
            <Text>Merged PR: Fix button hover states</Text>
            <Text>Created issue: Dark mode contrast</Text>
          </VStack>
        )}
        {activeTab === 'settings' && (
          <VStack gap={2}>
            <Text>Email: jane.doe@example.com</Text>
            <Text>Timezone: America/Los_Angeles</Text>
          </VStack>
        )}
      </div>
    </VStack>
  );
}
