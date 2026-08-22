import {Button} from '@astryxdesign/core/Button';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Heading} from '@astryxdesign/core/Heading';
import {Stack} from '@astryxdesign/core/Stack';
import {Popover} from '@astryxdesign/core/Popover';
import {Grid} from '@astryxdesign/core/Grid';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';

const icons = ['📄', '🎯', '💡', '🚀', '📊', '🎨', '📝', '🔧', '⚡', '🌟', '📚', '🎵'];

export default function NotionPageHeader() {
  const [selectedIcon, setSelectedIcon] = useState('📄');
  const [coverUrl, setCoverUrl] = useState('');

  return (
    <Stack gap={2}>
      {coverUrl && (
        <div style={{width: '100%', height: 200, borderRadius: 8, overflow: 'hidden'}}>
          <img src={coverUrl} alt="Cover" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </div>
      )}
      <Stack direction="horizontal" gap={3} align="center">
        <Popover
          trigger={
            <Button label={selectedIcon} variant="ghost" size="lg" />
          }
        >
          <Stack padding={2} gap={2}>
            <Text type="label">Pick an icon</Text>
            <Grid columns={6} gap={1}>
              {icons.map((icon) => (
                <Button
                  key={icon}
                  label={icon}
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedIcon(icon)}
                />
              ))}
            </Grid>
          </Stack>
        </Popover>
        <Heading level={1}>Untitled</Heading>
      </Stack>
      <Stack direction="horizontal" gap={2}>
        <Button
          label="Add cover"
          variant="ghost"
          size="sm"
          onClick={() => setCoverUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=400&fit=crop')}
        />
      </Stack>
    </Stack>
  );
}
