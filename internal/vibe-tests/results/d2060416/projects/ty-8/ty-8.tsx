import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Stack} from '@astryxdesign/core/Stack';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Badge} from '@astryxdesign/core/Badge';

export default function ProfileCard() {
  return (
    <Card><Stack gap="md" align="center"><Avatar name="Alex Johnson" size="xl" /><Stack gap="xs" align="center"><Heading level={2}>Alex Johnson</Heading><Badge variant="accent">Senior Engineer</Badge><Text color="secondary" size="sm">Passionate about accessible, performant design systems. Enjoys hiking and open source.</Text></Stack></Stack></Card>
  );
}
