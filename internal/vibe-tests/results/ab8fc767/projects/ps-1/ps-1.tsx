// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Layout} from '@astryxdesign/core/Layout';
import {LayoutPanel} from '@astryxdesign/core/Layout';
import {LayoutHeader} from '@astryxdesign/core/Layout';
import {LayoutContent} from '@astryxdesign/core/Layout';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/Stack';
import {HStack} from '@astryxdesign/core/Stack';
import {Button} from '@astryxdesign/core/Button';
import {Section} from '@astryxdesign/core/Section';

const NAV_ITEMS = ['General', 'Notifications', 'Privacy', 'Appearance', 'Integrations'];

export default function SettingsDashboard() {
  const [active, setActive] = useState('General');

  return (
    <Layout height="fill">
      <LayoutHeader hasDivider>
        <HStack padding={2} vAlign="center">
          <Heading level={1}>Settings</Heading>
        </HStack>
      </LayoutHeader>
      <Layout
        start={
          <LayoutPanel width={220} hasDivider padding={2} label="Settings navigation" role="navigation">
            <VStack gap={0.5}>
              {NAV_ITEMS.map(item => (
                <Button
                  key={item}
                  label={item}
                  variant={active === item ? 'primary' : 'ghost'}
                  onClick={() => setActive(item)}
                />
              ))}
            </VStack>
          </LayoutPanel>
        }
        content={
          <LayoutContent padding={4}>
            <VStack gap={4}>
              <Heading level={2}>{active}</Heading>
              <Section>
                <VStack gap={2}>
                  <Heading level={3}>Profile</Heading>
                  <Text color="secondary">Manage your profile information and preferences.</Text>
                </VStack>
              </Section>
              <Section>
                <VStack gap={2}>
                  <Heading level={3}>Account</Heading>
                  <Text color="secondary">Update your account settings and security options.</Text>
                </VStack>
              </Section>
              <Section>
                <VStack gap={2}>
                  <Heading level={3}>Preferences</Heading>
                  <Text color="secondary">Customize your experience with display and behavior options.</Text>
                </VStack>
              </Section>
            </VStack>
          </LayoutContent>
        }
      />
    </Layout>
  );
}
