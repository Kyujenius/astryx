import {Breadcrumbs, BreadcrumbItem} from '@astryxdesign/core/Breadcrumbs';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';

export default function ProductDetailPage() {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-3xl">
      <Breadcrumbs label="Product navigation">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/electronics">Electronics</BreadcrumbItem>
        <BreadcrumbItem href="/electronics/audio">Audio</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Premium Headphones</BreadcrumbItem>
      </Breadcrumbs>
      <Heading level={1}>Premium Headphones</Heading>
      <Card padding={4}>
        <div className="flex flex-col gap-3">
          <Heading level={2}>Product Details</Heading>
          <Text>High-quality noise-canceling headphones with 30-hour battery life, premium drivers, and comfortable over-ear design.</Text>
          <div className="flex items-center gap-2">
            <Text type="large" weight="bold">$299.99</Text>
            <Text color="secondary" type="supporting">Free shipping</Text>
          </div>
          <div className="flex gap-2">
            <Button label="Add to Cart" variant="primary" />
            <Button label="Back" variant="ghost" onClick={() => history.back()} />
          </div>
        </div>
      </Card>
    </div>
  );
}
