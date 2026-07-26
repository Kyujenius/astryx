// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState, useMemo} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';

export default function ValidatedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = useMemo(() => ({
    name: !name.trim() ? 'Name is required' : null,
    email: !email ? 'Email is required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Invalid email' : null,
    password: !password ? 'Password is required' : password.length < 8 ? 'Min 8 characters' : null,
  }), [name, email, password]);

  const isValid = !errors.name && !errors.email && !errors.password;

  return (
    <form onSubmit={e => { e.preventDefault(); if (isValid) {console.log('submitted');} }} className="flex flex-col gap-4 max-w-sm p-6">
      <h2 className="text-xl font-semibold">Create account</h2>
      <div className="space-y-2">
        <Label>Full name *</Label>
        <Input value={name} onChange={e => setName(e.target.value)} onBlur={() => setTouched(p => ({...p, name: true}))} />
        {touched.name && errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>
      <div className="space-y-2">
        <Label>Email *</Label>
        <Input type="email" value={email} onChange={e => setEmail(e.target.value)} onBlur={() => setTouched(p => ({...p, email: true}))} />
        {touched.email && errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>
      <div className="space-y-2">
        <Label>Password *</Label>
        <Input type="password" value={password} onChange={e => setPassword(e.target.value)} onBlur={() => setTouched(p => ({...p, password: true}))} />
        {touched.password && errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
      </div>
      <Button type="submit" disabled={!isValid}>Create account</Button>
    </form>
  );
}
