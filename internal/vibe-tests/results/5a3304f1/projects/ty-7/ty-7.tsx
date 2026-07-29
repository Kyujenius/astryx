import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Blockquote} from '@astryxdesign/core/Blockquote';
import {Divider} from '@astryxdesign/core/Divider';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  changelog: {
    maxWidth: 680,
    margin: '0 auto',
    padding: 24,
  },
  entry: {
    marginBottom: 32,
  },
  list: {
    paddingLeft: 24,
    margin: '8px 0',
  },
  listItem: {
    marginBottom: 4,
  },
  code: {
    fontFamily: 'monospace',
    backgroundColor: '#f4f4f4',
    padding: '2px 6px',
    borderRadius: 4,
    fontSize: 14,
  },
});

interface ChangelogEntry {
  version: string;
  date: string;
  changes: {
    type: 'added' | 'fixed' | 'changed' | 'removed';
    items: string[];
  }[];
  note?: string;
}

interface ChangelogProps {
  entries: ChangelogEntry[];
}

export default function Changelog({entries}: ChangelogProps) {
  return (
    <div {...stylex.props(styles.changelog)}>
      <Heading level={1}>Changelog</Heading>
      <Text>All notable changes to this project.</Text>
      <Divider />

      {entries.map((entry) => (
        <div key={entry.version} {...stylex.props(styles.entry)}>
          <Heading level={2}>
            {entry.version} <Text as="span">- {entry.date}</Text>
          </Heading>

          {entry.changes.map((group) => (
            <div key={group.type}>
              <Heading level={3}>{group.type.charAt(0).toUpperCase() + group.type.slice(1)}</Heading>
              <ul {...stylex.props(styles.list)}>
                {group.items.map((item, i) => (
                  <li key={i} {...stylex.props(styles.listItem)}>
                    <Text>{item}</Text>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {entry.note && (
            <Blockquote>{entry.note}</Blockquote>
          )}
          <Divider />
        </div>
      ))}
    </div>
  );
}
