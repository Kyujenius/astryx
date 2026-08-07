import {useState} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Button} from '@astryxdesign/core/Button';
import {Popover} from '@astryxdesign/core/Popover';
import {Grid} from '@astryxdesign/core/Grid';

const icons = ['📄', '🎯', '🚀', '💡', '📊', '🔧', '🎨', '📝', '⚡', '🌟'];

export default function PageHeader() {
  const [icon, setIcon] = useState('📄');
  const [hasCover, setHasCover] = useState(true);

  const picker = (
    <Grid columns={5} gap={1}>
      {icons.map(e => <Button key={e} label={e} variant="ghost" onClick={() => setIcon(e)} />)}
    </Grid>
  );

  return (
    <div className="rounded-lg overflow-hidden border">
      {hasCover && <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600" />}
      <Stack direction="vertical" gap={2} padding={4}>
        <div className="flex gap-2 items-center">
          <Popover content={picker} label="Pick icon" width={200}>
            <Button label={icon} variant="ghost" />
          </Popover>
          <Button label={hasCover ? 'Remove cover' : 'Add cover'} variant="ghost" onClick={() => setHasCover(!hasCover)} />
        </div>
        <Heading level={1}>Untitled</Heading>
      </Stack>
    </div>
  );
}
