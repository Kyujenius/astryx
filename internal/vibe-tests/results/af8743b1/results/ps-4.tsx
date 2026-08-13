import {Breadcrumbs, BreadcrumbItem} from '@astryxdesign/core/Breadcrumbs';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  details: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 24,
  },
  actions: {
    display: 'flex',
    gap: 12,
  },
});

export default function ProductDetailPage() {
  return (
    <div {...stylex.props(styles.page)}>
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/electronics">Electronics</BreadcrumbItem>
        <BreadcrumbItem href="/electronics/audio">Audio</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Wireless Headphones Pro</BreadcrumbItem>
      </Breadcrumbs>

      <div {...stylex.props(styles.details)}>
        <Card padding={4}>
          <div style={{width: '100%', height: 300, backgroundColor: '#f0f0f0', borderRadius: 8}} />
        </Card>
        <div>
          <Heading level={1}>Wireless Headphones Pro</Heading>
          <Text type="display-3" weight="bold" as="p" display="block">$299.99</Text>
          <Text type="supporting" color="secondary" as="p" display="block">
            Premium noise-canceling wireless headphones with 30-hour battery life.
          </Text>
          <div {...stylex.props(styles.actions)}>
            <Button label="Add to Cart" variant="primary" />
            <Button label="Save for Later" variant="secondary" />
          </div>
        </div>
      </div>
    </div>
  );
}
