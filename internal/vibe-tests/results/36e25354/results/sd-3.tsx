// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

export default function ValidatedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isNameValid = name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 8;
  const isFormValid = isNameValid && isEmailValid && isPasswordValid;

  if (submitted) {
    return (
      <div className="p-8 space-y-2">
        <h2 className="text-2xl font-bold">Success</h2>
        <p>Your account has been created.</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-4 max-w-md">
      <h2 className="text-2xl font-bold">Create Account</h2>
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        {name.length > 0 && !isNameValid && <p className="text-sm text-destructive">Name must be at least 2 characters</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        {email.length > 0 && !isEmailValid && <p className="text-sm text-destructive">Enter a valid email address</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" />
        {password.length > 0 && !isPasswordValid && <p className="text-sm text-destructive">Password must be at least 8 characters</p>}
      </div>
      <Button onClick={() => setSubmitted(true)} disabled={!isFormValid} className="w-full">
        Create account
      </Button>
    </div>
  );
}
