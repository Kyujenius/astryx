import {Breadcrumbs, BreadcrumbItem} from '@astryxdesign/core/Breadcrumbs';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

export default function ProductDetailPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/electronics">Electronics</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Wireless Headphones</BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex flex-wrap gap-6">
        <img
          src="https://placehold.co/400x300"
          alt="Wireless Headphones"
          className="rounded-lg max-w-[400px]"
        />
        <Card padding={4} width={360}>
          <div className="flex flex-col gap-3">
            <Heading level={1}>Wireless Headphones</Heading>
            <Text type="large" weight="bold">$79.99</Text>
            <Text color="secondary">
              Premium over-ear headphones with active noise cancellation,
              40-hour battery life, and multipoint Bluetooth connectivity.
            </Text>
            <div className="flex gap-2">
              <Button label="Add to cart" variant="primary" />
              <Button label="Save for later" variant="secondary" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
