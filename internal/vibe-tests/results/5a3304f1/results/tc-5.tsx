import {Card} from '@astryxdesign/core/Card';
import {Theme} from '@astryxdesign/core/theme';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  card: {
    borderImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) 1',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 16,
    padding: 24,
  },
  wrapper: {
    padding: 32,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
});

const customTheme = stylex.create({
  card: {
    borderRadius: 16,
    padding: 24,
  },
});

export default function CustomThemedCard() {
  return (
    <Theme>
      <div {...stylex.props(styles.wrapper)}>
        <Card xstyle={styles.card}>
          <Heading level={2}>Gradient Border Card</Heading>
          <Text>
            This card uses a custom gradient border and increased border-radius
            via the xstyle prop and StyleX overrides.
          </Text>
        </Card>

        <Card xstyle={styles.card}>
          <Heading level={2}>Another Themed Card</Heading>
          <Text>
            Both cards share the same custom appearance defined in the StyleX
            styles above, applied through the xstyle prop.
          </Text>
        </Card>
      </div>
    </Theme>
  );
}
