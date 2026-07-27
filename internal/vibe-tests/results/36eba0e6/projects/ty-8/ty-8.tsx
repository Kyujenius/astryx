import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Badge} from '@astryxdesign/core/Badge';

export default function ProfileCard() {
  return (<div className="max-w-sm mx-auto bg-white rounded-xl shadow-md p-6 text-center"><Avatar name="Alex Johnson" size="xl" className="mx-auto" /><div className="mt-4 space-y-2"><Heading level={2}>Alex Johnson</Heading><Badge variant="accent">Senior Engineer</Badge><Text size="sm" color="secondary" className="mt-2">Passionate about accessible design systems. Enjoys hiking and open source.</Text></div></div>);
}
