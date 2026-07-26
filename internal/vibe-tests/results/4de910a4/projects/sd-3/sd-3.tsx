// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState, useMemo} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  form: { display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400, padding: 24 },
});

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
  const mark = (f: string) => setTouched(p => ({...p, [f]: true}));

  return (
    <form onSubmit={e => { e.preventDefault(); if (isValid) {console.log('submitted');} }} {...stylex.props(styles.form)}>
      <Heading level={3}>Create account</Heading>
      <TextInput label="Full name" value={name} onChange={setName} onBlur={() => mark('name')} status={touched.name && errors.name ? {type: 'error', message: errors.name} : undefined} isRequired />
      <TextInput label="Email" type="email" value={email} onChange={setEmail} onBlur={() => mark('email')} status={touched.email && errors.email ? {type: 'error', message: errors.email} : undefined} isRequired />
      <TextInput label="Password" type="password" value={password} onChange={setPassword} onBlur={() => mark('password')} status={touched.password && errors.password ? {type: 'error', message: errors.password} : undefined} isRequired />
      <Button type="submit" variant="filled" isDisabled={!isValid}>Create account</Button>
    </form>
  );
}
