import {Breadcrumbs} from '@astryxdesign/core/Breadcrumbs';
import {BreadcrumbItem} from '@astryxdesign/core/Breadcrumbs';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Divider} from '@astryxdesign/core/Divider';
import {Badge} from '@astryxdesign/core/Badge';

export default function ProductDetail() {
  return (
    <VStack gap="lg">
      <Breadcrumbs label="Product navigation">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/electronics">Electronics</BreadcrumbItem>
        <BreadcrumbItem href="/electronics/audio">Audio</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Wireless Headphones Pro</BreadcrumbItem>
      </Breadcrumbs>

      <VStack gap="md">
        <HStack gap="sm" align="center">
          <Heading level={1}>Wireless Headphones Pro</Heading>
          <Badge label="In Stock" variant="success" />
        </HStack>
        <Text type="large">$299.99</Text>
        <Divider />
        <VStack gap="sm">
          <Heading level={3}>Product Details</Heading>
          <Text>Premium wireless headphones with active noise cancellation, 30-hour battery life, and spatial audio support. Comfortable over-ear design with memory foam cushions.</Text>
        </VStack>
        <HStack gap="sm">
          <Button label="Add to Cart" variant="primary" />
          <Button label="Back" variant="secondary" onPress={() => window.history.back()} />
        </HStack>
      </VStack>
    </VStack>
  );
}
