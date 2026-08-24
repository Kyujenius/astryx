import {Text} from '@astryxdesign/core/Text';
import {Code} from '@astryxdesign/core/Code';

export default function InstallationExample() {
  return (
    <div className="p-6 space-y-2">
      <Text weight="semibold">Installation</Text>
      <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm">
        <Code>yarn add @astryxdesign/core</Code>
      </div>
      <Text size="sm" color="secondary">Copy this command to install the Astryx design system.</Text>
    </div>
  );
}
