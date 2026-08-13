import {Breadcrumbs, BreadcrumbItem} from '@astryxdesign/core/Breadcrumbs';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';

export default function ProductDetailPage() {
  return (
    <VStack gap={4}>
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/electronics">Electronics</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Wireless Headphones</BreadcrumbItem>
      </Breadcrumbs>
      <HStack gap={4} wrap="wrap">
        <img
          src="https://placehold.co/400x300"
          alt="Wireless Headphones"
          style={{borderRadius: 8, maxWidth: 400}}
        />
        <Card padding={4} width={360}>
          <VStack gap={3}>
            <Heading level={1}>Wireless Headphones</Heading>
            <Text type="large" weight="bold">$79.99</Text>
            <Text color="secondary">
              Premium over-ear headphones with active noise cancellation,
              40-hour battery life, and multipoint Bluetooth connectivity.
            </Text>
            <HStack gap={2}>
              <Button label="Add to cart" variant="primary" />
              <Button label="Save for later" variant="secondary" />
            </HStack>
          </VStack>
        </Card>
      </HStack>
    </VStack>
  );
}
