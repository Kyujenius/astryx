import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  header: {
    maxWidth: 720,
    margin: '0 auto',
    padding: '48px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
});

export default function BlogPostHeader() {
  return (
    <header {...stylex.props(styles.header)}>
      <Heading level={1} type="display-1">
        The Art of Simplicity in Modern Design Systems
      </Heading>
      <Text type="supporting">August 23, 2024</Text>
      <Text type="large">
        How constraints breed creativity, and why the best design systems feel invisible
        to the teams that use them.
      </Text>
    </header>
  );
}
