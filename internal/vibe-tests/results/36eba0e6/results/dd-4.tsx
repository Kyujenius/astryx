import {TabList} from '@astryxdesign/core/TabList';
import {Tab} from '@astryxdesign/core/Tab';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';

export default function UserProfile() {
  const [tab, setTab] = useState('overview');
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6"><Avatar name="Jane Doe" size="lg" /><div><Heading level={1}>Jane Doe</Heading><Text color="secondary">Software Engineer</Text></div></div>
      <TabList selectedKey={tab} onSelectionChange={k => setTab(k as string)}><Tab id="overview">Overview</Tab><Tab id="activity">Activity</Tab><Tab id="settings">Settings</Tab></TabList>
      <div className="mt-6 bg-white rounded-lg border p-6">
        {tab === 'overview' && (<div className="space-y-4"><Heading level={3}>About</Heading><Text>Full-stack engineer focused on design systems.</Text></div>)}
        {tab === 'activity' && (<ul className="space-y-2"><li><Text>Pushed 3 commits</Text></li><li><Text>Opened PR #142</Text></li></ul>)}
        {tab === 'settings' && (<div><Heading level={3}>Settings</Heading><Text className="mt-2">Manage preferences.</Text></div>)}
      </div>
    </div>
  );
}
