import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Breadcrumbs, BreadcrumbItem} from '@astryxdesign/core/Breadcrumbs';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';

export default function ProductDetailPage() {
  return (
    <VStack gap={4} padding={4}>
      <Breadcrumbs label="Product navigation">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/electronics">Electronics</BreadcrumbItem>
        <BreadcrumbItem href="/electronics/audio">Audio</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Premium Headphones</BreadcrumbItem>
      </Breadcrumbs>
      <Heading level={1}>Premium Headphones</Heading>
      <Card padding={4}>
        <VStack gap={3}>
          <Heading level={2}>Product Details</Heading>
          <Text>High-quality noise-canceling headphones with 30-hour battery life, premium drivers, and comfortable over-ear design.</Text>
          <HStack gap={2}>
            <Text type="large" weight="bold">$299.99</Text>
            <Text color="secondary" type="supporting">Free shipping</Text>
          </HStack>
          <HStack gap={2}>
            <Button label="Add to Cart" variant="primary" />
            <Button label="Back" variant="ghost" onClick={() => history.back()} />
          </HStack>
        </VStack>
      </Card>
    </VStack>
  );
}
