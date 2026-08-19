import {useState} from 'react';
import {Badge} from '@astryxdesign/core/Badge';
import {IconButton} from '@astryxdesign/core/IconButton';
import {HStack} from '@astryxdesign/core/HStack';

export default function NotificationBell() {
  const [count, setCount] = useState(3);

  if (count === 0) {
    return (
      <IconButton
        icon="bell"
        label="Notifications"
        variant="ghost"
        onPress={() => setCount(5)}
      />
    );
  }

  return (
    <HStack gap="xs" align="center">
      <IconButton
        icon="bell"
        label={`${count} unread notifications`}
        variant="ghost"
        onPress={() => setCount(0)}
      />
      <Badge variant="filled" color="red">{count}</Badge>
    </HStack>
  );
}
