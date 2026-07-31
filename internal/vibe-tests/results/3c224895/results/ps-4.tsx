import {Breadcrumbs, BreadcrumbItem} from '@astryxdesign/core/Breadcrumbs';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    padding: '24px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  image: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
});

export default function ProductDetailPage() {
  return (
    <div {...stylex.props(styles.container)}>
      <VStack gap={4}>
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/electronics">Electronics</BreadcrumbItem>
          <BreadcrumbItem href="/electronics/headphones">Headphones</BreadcrumbItem>
          <BreadcrumbItem>Studio Pro Max</BreadcrumbItem>
        </Breadcrumbs>

        <HStack gap={6}>
          <img
            {...stylex.props(styles.image)}
            src="https://picsum.photos/600/400"
            alt="Studio Pro Max Headphones"
          />
          <VStack gap={3}>
            <Heading level={1}>Studio Pro Max</Heading>
            <Text color="secondary">Premium wireless headphones with active noise cancellation</Text>
            <Heading level={2}>$349.99</Heading>
            <Card padding={3} variant="muted">
              <VStack gap={2}>
                <Text weight="semibold">Key Features</Text>
                <Text>Active Noise Cancellation</Text>
                <Text>40-hour battery life</Text>
                <Text>Spatial Audio support</Text>
                <Text>Premium memory foam cushions</Text>
              </VStack>
            </Card>
            <HStack gap={2}>
              <Button label="Add to Cart" variant="primary" />
              <Button label="Save for Later" variant="secondary" />
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </div>
  );
}
