import {Breadcrumbs, BreadcrumbItem} from '@astryxdesign/core/Breadcrumbs';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  page: {
    maxWidth: 800,
    margin: '0 auto',
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  productLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 24,
  },
  image: {
    width: '100%',
    aspectRatio: '1',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 48,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  actions: {
    display: 'flex',
    gap: 8,
    marginTop: 16,
  },
});

export default function ProductDetailPage() {
  return (
    <div {...stylex.props(styles.page)}>
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/category">Electronics</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Wireless Headphones Pro</BreadcrumbItem>
      </Breadcrumbs>

      <div {...stylex.props(styles.productLayout)}>
        <div {...stylex.props(styles.image)}>🎧</div>

        <Card padding={4}>
          <div {...stylex.props(styles.details)}>
            <div {...stylex.props(styles.price)}>
              <Badge variant="success" label="In Stock" />
            </div>
            <Heading level={1}>Wireless Headphones Pro</Heading>
            <Text type="large" weight="bold">$299.99</Text>
            <Text type="supporting">
              Premium noise-cancelling headphones with 40-hour battery life, spatial audio,
              and adaptive EQ.
            </Text>
            <div {...stylex.props(styles.actions)}>
              <Button label="Add to Cart" variant="primary" />
              <Button label="Save for Later" variant="secondary" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
