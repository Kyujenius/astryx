import {Text} from '@astryxdesign/core/Text';
import {Stack} from '@astryxdesign/core/Stack';

export default function PageTitle() {
  return (
    <Stack gap={1} padding={4}>
      <Text type="display-1">Welcome to Acme</Text>
      <Text type="large" color="secondary">
        Manage your projects, teams, and workflows all in one place.
      </Text>
    </Stack>
  );
}
