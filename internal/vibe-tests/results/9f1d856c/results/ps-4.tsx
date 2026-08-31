import {Breadcrumbs, BreadcrumbItem} from '@astryxdesign/core/Breadcrumbs';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';

export default function ProductDetail() {
  return (
    <VStack gap={4} padding={4}>
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/electronics">Electronics</BreadcrumbItem>
        <BreadcrumbItem href="/electronics/audio">Audio</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Wireless Headphones Pro</BreadcrumbItem>
      </Breadcrumbs>
      <HStack gap={4} wrap="wrap">
        <Card width={400} height={400} padding={4}>
          <VStack gap={2} hAlign="center" vAlign="center" height="100%">
            <Text color="secondary">Product Image</Text>
          </VStack>
        </Card>
        <VStack gap={3} width={400}>
          <VStack gap={1}>
            <HStack gap={2} vAlign="center">
              <Badge color="green">In Stock</Badge>
              <Badge>New</Badge>
            </HStack>
            <Heading level={1}>Wireless Headphones Pro</Heading>
            <Text color="secondary">Premium noise-canceling wireless headphones with 40-hour battery life.</Text>
          </VStack>
          <Heading level={2}>$299.99</Heading>
          <HStack gap={2}>
            <Button label="Add to cart" variant="primary" />
            <Button label="Add to wishlist" variant="secondary" />
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
}
