import {Layout} from '@astryxdesign/core/Layout';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';

const navItems = ['General', 'Security', 'Notifications', 'Billing', 'API Keys'];

export default function SettingsDashboard() {
  return (
    <Layout
      header={
        <HStack padding={3} gap={2} vAlign="center">
          <Heading level={1}>Settings</Heading>
        </HStack>
      }
      start={
        <VStack gap={1} padding={3}>
          <Text type="label" color="secondary">Navigation</Text>
          {navItems.map((item) => (
            <Button key={item} label={item} variant="ghost" width="100%" />
          ))}
        </VStack>
      }
      content={
        <VStack gap={4} padding={4}>
          <Heading level={2}>General Settings</Heading>
          <Text color="secondary">Manage your account settings and preferences.</Text>
          <VStack gap={3}>
            <HStack gap={3} hAlign="between" vAlign="center">
              <VStack gap={0.5}>
                <Text weight="medium">Display name</Text>
                <Text type="supporting">Your public display name</Text>
              </VStack>
              <Button label="Edit" variant="ghost" />
            </HStack>
            <HStack gap={3} hAlign="between" vAlign="center">
              <VStack gap={0.5}>
                <Text weight="medium">Email</Text>
                <Text type="supporting">user@example.com</Text>
              </VStack>
              <Button label="Change" variant="ghost" />
            </HStack>
            <HStack gap={3} hAlign="between" vAlign="center">
              <VStack gap={0.5}>
                <Text weight="medium">Language</Text>
                <Text type="supporting">English (US)</Text>
              </VStack>
              <Button label="Change" variant="ghost" />
            </HStack>
          </VStack>
        </VStack>
      }
    />
  );
}
