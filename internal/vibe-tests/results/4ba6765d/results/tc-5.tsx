import {Card} from '@astryxdesign/core/Card';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {defineTheme} from '@astryxdesign/core/Theme';
import stylex from '@stylexjs/stylex';

const customTheme = defineTheme({
  card: {
    borderRadius: '16px',
    borderWidth: '2px',
  },
});

const styles = stylex.create({
  wrapper: {
    padding: 32,
  },
  gradientCard: {
    backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: 2,
    borderRadius: 18,
  },
  innerCard: {
    borderRadius: 16,
  },
});

export default function ThemedCard() {
  return (
    <div {...stylex.props(styles.wrapper)} className={customTheme}>
      <Stack gap={4}>
        <Heading level={2}>Custom Card Theme</Heading>
        <Text type="body">
          To customize card appearance in Astryx, use defineTheme to override
          component-level tokens. For a gradient border, wrap the Card in a
          container with a gradient background and padding equal to the desired
          border width.
        </Text>

        <div {...stylex.props(styles.gradientCard)}>
          <Card>
            <div {...stylex.props(styles.innerCard)}>
              <Stack gap={2}>
                <Heading level={3}>Gradient Border Card</Heading>
                <Text type="body">
                  This card has a gradient border achieved by nesting the Card
                  inside a gradient container with padding acting as border width.
                  The increased border radius comes from the defineTheme override.
                </Text>
              </Stack>
            </div>
          </Card>
        </div>

        <Card>
          <Stack gap={2}>
            <Heading level={3}>Standard Themed Card</Heading>
            <Text type="body">
              This card inherits the increased border radius from the theme
              without the gradient border wrapper.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </div>
  );
}
