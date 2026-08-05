// Copyright (c) Meta Platforms, Inc. and affiliates.

"use client";
import {Card, CardContent} from '@/components/ui/card';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

export default function ProfileCard() {
  return (
    <Card className="max-w-md">
      <CardContent className="flex gap-4 p-6 items-center">
        <Avatar className="h-16 w-16"><AvatarImage src="https://i.pravatar.cc/80?u=profile" /><AvatarFallback>JD</AvatarFallback></Avatar>
        <div>
          <h3 className="text-lg font-semibold">Jane Doe</h3>
          <p className="text-sm text-muted-foreground">Senior Software Engineer</p>
          <p className="text-sm mt-1">Passionate about building accessible, performant web applications.</p>
          <p className="text-xs text-muted-foreground mt-1">Joined March 2022</p>
        </div>
      </CardContent>
    </Card>
  );
}