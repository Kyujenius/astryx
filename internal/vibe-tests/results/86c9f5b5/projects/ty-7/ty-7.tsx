import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Blockquote} from '@astryxdesign/core/Blockquote';
import {Divider} from '@astryxdesign/core/Divider';

interface ChangelogEntry {
  version: string;
  date: string;
  changes: {type: string; items: string[]}[];
  note?: string;
}

interface ChangelogProps {
  entries: ChangelogEntry[];
}

export default function Changelog({entries}: ChangelogProps) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Heading level={1}>Changelog</Heading>
      <Text>All notable changes to this project.</Text>
      <Divider />

      {entries.map((entry) => (
        <div key={entry.version} className="mb-8">
          <Heading level={2}>
            {entry.version} <Text as="span">- {entry.date}</Text>
          </Heading>
          {entry.changes.map((group) => (
            <div key={group.type}>
              <Heading level={3}>{group.type}</Heading>
              <ul className="pl-6 my-2">
                {group.items.map((item, i) => (
                  <li key={i} className="mb-1"><Text>{item}</Text></li>
                ))}
              </ul>
            </div>
          ))}
          {entry.note && <Blockquote>{entry.note}</Blockquote>}
          <Divider />
        </div>
      ))}
    </div>
  );
}
