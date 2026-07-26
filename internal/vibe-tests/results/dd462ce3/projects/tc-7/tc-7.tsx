// Copyright (c) Meta Platforms, Inc. and affiliates.

import React from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {MediaTheme} from '@astryxdesign/core/theme';

export default function ThemedSection() {
  return (
    <div className="p-8 flex flex-col gap-8">
      <section><Heading level={2}>Regular</Heading><Text>Default theme.</Text></section>
      <section className="bg-gray-900 rounded-xl p-8">
        <MediaTheme mode="dark">
          <Heading level={2}>Featured</Heading>
          <Text color="secondary">Dark themed emphasis.</Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card><div className="p-4"><Heading level={4}>Premium</Heading><Button variant="filled" onPress={() => {}}>Upgrade</Button></div></Card>
            <Card><div className="p-4"><Heading level={4}>Enterprise</Heading><Button variant="outlined" onPress={() => {}}>Contact</Button></div></Card>
          </div>
        </MediaTheme>
      </section>
    </div>
  );
}
