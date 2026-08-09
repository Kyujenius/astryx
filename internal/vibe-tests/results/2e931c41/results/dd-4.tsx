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
      <Stack direction="horizontal" gap={3} vAlign="center">
        <Avatar name="Jane Doe" size="lg" />
        <Stack gap={0.5}>
          <Heading level={2}>Jane Doe</Heading>
          <Text type="supporting" color="secondary">Software Engineer</Text>
        </Stack>
      </Stack>
      <TabList value={tab} onChange={setTab} hasDivider>
        <Tab value="overview" label="Overview" />
        <Tab value="activity" label="Activity" />
        <Tab value="settings" label="Settings" />
      </TabList>
      {tab === 'overview' && (
        <Card padding={4}>
          <Stack gap={2}>
            <Heading level={4}>About</Heading>
            <Text>Full-stack developer with 5 years of experience building web applications. Passionate about UI/UX and accessibility.</Text>
            <Text type="supporting" color="secondary">Joined January 2022</Text>
          </Stack>
        </Card>
      )}
      {tab === 'activity' && (
        <Card padding={4}>
          <Stack gap={2}>
            <Heading level={4}>Recent Activity</Heading>
            <Text>Pushed 3 commits to main branch</Text>
            <Text>Reviewed PR #142: Fix accessibility issues</Text>
            <Text>Commented on Issue #89</Text>
          </Stack>
        </Card>
      )}
      {tab === 'settings' && (
        <Card padding={4}>
          <Stack gap={2}>
            <Heading level={4}>Settings</Heading>
            <Text>Notification preferences, account settings, and more would go here.</Text>
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
