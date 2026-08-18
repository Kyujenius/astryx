import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';

export default function ArticlePage() {
  return (
    <VStack gap={6} padding={4} maxWidth={720} hAlign="center">
      <VStack gap={3} hAlign="center">
        <Heading level={1} type="display-1" justify="center">
          The Future of Design Systems
        </Heading>
        <Text type="large" color="secondary" justify="center">
          How component libraries are evolving to meet the needs of modern product teams
        </Text>
        <HStack gap={2} vAlign="center">
          <Text type="supporting" color="secondary">By Jane Smith</Text>
          <Text type="supporting" color="secondary">·</Text>
          <Text type="supporting" color="secondary">January 20, 2024</Text>
          <Text type="supporting" color="secondary">·</Text>
          <Text type="supporting" color="secondary">8 min read</Text>
        </HStack>
      </VStack>
      <VStack gap={4}>
        <Text as="p">
          Design systems have become the backbone of product development at scale.
          They provide the shared language between designers and engineers, ensuring
          consistency across an organization&apos;s digital products.
        </Text>
        <Heading level={2}>The Component Revolution</Heading>
        <Text as="p">
          Modern design systems go beyond simple style guides. They encode behavior,
          accessibility, and interaction patterns into reusable components that teams
          can compose into complex interfaces without reinventing the wheel.
        </Text>
        <Heading level={2}>Tokens and Theming</Heading>
        <Text as="p">
          Design tokens represent the atomic values of a design system: colors, spacing,
          typography scales, and motion curves. By abstracting these decisions into tokens,
          teams can rebrand or support multiple themes without touching component code.
        </Text>
        <Heading level={2}>Looking Ahead</Heading>
        <Text as="p">
          The next frontier is AI-assisted composition. Tools that understand component
          APIs can generate production-ready code from natural language descriptions,
          accelerating development while maintaining design fidelity.
        </Text>
      </VStack>
    </VStack>
  );
}
