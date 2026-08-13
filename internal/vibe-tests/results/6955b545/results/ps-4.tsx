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
        <BreadcrumbItem href="/electronics/audio">Audio</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Wireless Headphones Pro</BreadcrumbItem>
      </Breadcrumbs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card padding={4}>
          <div className="w-full h-72 bg-gray-100 rounded-lg" />
        </Card>
        <div className="flex flex-col gap-4">
          <Heading level={1}>Wireless Headphones Pro</Heading>
          <Text type="display-3" weight="bold" as="p" display="block">$299.99</Text>
          <Text type="supporting" color="secondary" as="p" display="block">
            Premium noise-canceling wireless headphones with 30-hour battery life.
          </Text>
          <div className="flex gap-3">
            <Button label="Add to Cart" variant="primary" />
            <Button label="Save for Later" variant="secondary" />
          </div>
        </div>
      </div>
    </div>
  );
}
