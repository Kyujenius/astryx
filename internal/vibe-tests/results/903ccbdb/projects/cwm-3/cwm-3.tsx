import {useState} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Button} from '@astryxdesign/core/Button';
import {Popover} from '@astryxdesign/core/Popover';
import {Grid} from '@astryxdesign/core/Grid';
import {Text} from '@astryxdesign/core/Text';

const icons = ['📄', '🎯', '🚀', '💡', '📊', '🔧', '🎨', '📝', '🏗️', '⚡', '🌟', '🔥'];
const covers = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
];

export default function PageHeader() {
  const [icon, setIcon] = useState('📄');
  const [cover, setCover] = useState(covers[0]);
  const [title, setTitle] = useState('Untitled');

  const iconGrid = (
    <Grid columns={6} gap={1}>
      {icons.map(emoji => (
        <Button
          key={emoji}
          label={emoji}
          variant="ghost"
          onClick={() => setIcon(emoji)}
        />
      ))}
    </Grid>
  );

  return (
    <Stack direction="vertical" gap={0}>
      <div style={{height: 200, background: cover, borderRadius: '8px 8px 0 0'}} />
      <Stack direction="vertical" gap={2} padding={4}>
        <Stack direction="horizontal" gap={2} vAlign="center">
          <Popover content={iconGrid} label="Pick an icon" width={240}>
            <Button label={icon} variant="ghost" />
          </Popover>
          <Button
            label="Change cover"
            variant="ghost"
            onClick={() => {
              const idx = (covers.indexOf(cover) + 1) % covers.length;
              setCover(covers[idx]);
            }}
          />
        </Stack>
        <Heading level={1}>{title}</Heading>
        <Text color="secondary">Start typing to add content...</Text>
      </Stack>
    </Stack>
  );
}
