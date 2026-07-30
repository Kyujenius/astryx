import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Button} from '@astryxdesign/core/Button';
import {Thumbnail} from '@astryxdesign/core/Thumbnail';
import {Stack} from '@astryxdesign/core/Stack';
import {Popover} from '@astryxdesign/core/Popover';
import {Grid} from '@astryxdesign/core/Grid';
import {Icon} from '@astryxdesign/core/Icon';
import stylex from '@stylexjs/stylex';
import {useState} from 'react';

const styles = stylex.create({
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    objectFit: 'cover',
    position: 'relative',
  },
  coverPlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGrid: {
    padding: 16,
  },
  pageIcon: {
    fontSize: 48,
    cursor: 'pointer',
  },
  header: {
    position: 'relative',
    marginTop: -40,
    paddingInlineStart: 24,
  },
});

const ICONS = ['📄', '🎯', '🚀', '💡', '🎨', '📊', '🔧', '⭐', '📝', '🌟', '🎉', '🏆'];

export default function NotionPageHeader() {
  const [pageIcon, setPageIcon] = useState('📄');
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

  return (
    <Stack gap={0}>
      {coverUrl ? (
        <div {...stylex.props(styles.cover)}>
          <Thumbnail src={coverUrl} alt="Cover image" size="full" />
        </div>
      ) : (
        <div {...stylex.props(styles.coverPlaceholder)}>
          <Button
            label="Add cover"
            variant="ghost"
            icon={<Icon name="image" />}
            onClick={() => setCoverUrl('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200')}
          />
        </div>
      )}

      <div {...stylex.props(styles.header)}>
        <Stack gap={3}>
          <Popover
            isOpen={isIconPickerOpen}
            onOpenChange={setIsIconPickerOpen}
            placement="below"
          >
            <button onClick={() => setIsIconPickerOpen(!isIconPickerOpen)}>
              <span {...stylex.props(styles.pageIcon)}>{pageIcon}</span>
            </button>
            <div {...stylex.props(styles.iconGrid)}>
              <Grid columns={6} gap={2}>
                {ICONS.map((icon) => (
                  <IconButton
                    key={icon}
                    label={`Select ${icon}`}
                    icon={<span>{icon}</span>}
                    variant="ghost"
                    onClick={() => {
                      setPageIcon(icon);
                      setIsIconPickerOpen(false);
                    }}
                  />
                ))}
              </Grid>
            </div>
          </Popover>

          <Stack gap={1}>
            <Heading level={1}>Untitled</Heading>
            <Text type="supporting">Add a description...</Text>
          </Stack>
        </Stack>
      </div>
    </Stack>
  );
}
