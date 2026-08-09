// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {TabList} from '@astryxdesign/core/TabList';
import {Tab} from '@astryxdesign/core/TabList';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {Avatar} from '@astryxdesign/core/Avatar';

export default function UserProfile() {
  const [tab, setTab] = useState('overview');

  return (
    <Stack gap={4} padding={4} maxWidth={600}>
      <div className="flex items-center gap-4">
        <Avatar name="Jane Doe" size="lg" />
        <div>
          <Heading level={2}>Jane Doe</Heading>
          <Text type="supporting" color="secondary">Software Engineer</Text>
        </div>
      </div>
      <TabList value={tab} onChange={setTab} hasDivider>
        <Tab value="overview" label="Overview" />
        <Tab value="activity" label="Activity" />
        <Tab value="settings" label="Settings" />
      </TabList>
      <Card padding={4}>
        {tab === 'overview' && (
          <Stack gap={2}>
            <Heading level={4}>About</Heading>
            <Text>Full-stack developer with 5 years of experience.</Text>
            <Text type="supporting" color="secondary">Joined January 2022</Text>
          </Stack>
        )}
        {tab === 'activity' && (
          <Stack gap={2}>
            <Heading level={4}>Recent Activity</Heading>
            <Text>Pushed 3 commits to main</Text>
            <Text>Reviewed PR #142</Text>
          </Stack>
        )}
        {tab === 'settings' && (
          <Stack gap={2}>
            <Heading level={4}>Settings</Heading>
            <Text>Notification preferences and account settings.</Text>
          </Stack>
        )}
      </Card>
    </Stack>
  );
}
