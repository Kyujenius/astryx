// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Card, CardContent} from '@/components/ui/card';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';

export default function ProfileCard() {
  return (
    <Card className="max-w-sm">
      <CardContent className="flex flex-col items-center gap-3 pt-6">
        <Avatar className="h-20 w-20">
          <AvatarFallback className="text-xl">AJ</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-semibold">Alex Johnson</h3>
        <p className="text-sm font-medium text-primary">Senior Product Designer</p>
        <p className="text-center text-muted-foreground">
          Passionate about creating intuitive and accessible digital experiences.
        </p>
        <p className="text-xs text-muted-foreground">Joined March 2021</p>
      </CardContent>
    </Card>
  );
}
