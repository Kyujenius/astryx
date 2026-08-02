import React from 'react';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

export default function PageTitle() {
  return (
    <div>
      <Heading level={1}>Dashboard</Heading>
      <Text>
        Welcome back. Here is an overview of your account activity and recent updates.
      </Text>
    </div>
  );
}
