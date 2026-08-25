import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Breadcrumbs, BreadcrumbItem} from '@astryxdesign/core/Breadcrumbs';

export default function ProductDetailPage() {
  return (
    <VStack gap={4} padding={4}>
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/electronics">Electronics</BreadcrumbItem>
        <BreadcrumbItem href="/electronics/audio">Audio</BreadcrumbItem>
        <BreadcrumbItem>Premium Headphones</BreadcrumbItem>
      </Breadcrumbs>

      <Button label="Back" variant="ghost" onClick={() => history.back()} />

      <VStack gap={3}>
        <Heading level={1}>Premium Headphones</Heading>
        <Text color="secondary">By AudioTech Co.</Text>
        <Text size="lg">$299.99</Text>
        <Text>
          Experience crystal-clear audio with our premium over-ear headphones.
          Featuring active noise cancellation, 30-hour battery life, and
          ultra-comfortable memory foam ear cushions.
        </Text>
        <HStack gap={2}>
          <Button label="Add to Cart" variant="primary" onClick={() => {}} />
          <Button label="Save for Later" variant="secondary" onClick={() => {}} />
        </HStack>
      </VStack>
    </VStack>
  );
}
