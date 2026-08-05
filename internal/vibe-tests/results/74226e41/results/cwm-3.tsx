// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Popover} from '@astryxdesign/core/Popover';
import {Heading} from '@astryxdesign/core/Heading';

const EMOJIS = ['\u{1f4dd}', '\u{1f3af}', '\u{1f680}', '\u{1f4a1}', '\u{1f3a8}', '\u{1f4da}', '\u{1f525}', '\u{2728}', '\u{1f31f}', '\u{1f4bc}'];
const COVERS = [
  'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=200&fit=crop',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=200&fit=crop',
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=200&fit=crop',
];

export default function NotionHeader() {
  const [icon, setIcon] = useState(EMOJIS[0]);
  const [cover, setCover] = useState(COVERS[0]);
  const [title, setTitle] = useState('Untitled');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <div style={{height: 200, backgroundImage: `url(${cover})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative'}}>
        <div style={{position: 'absolute', bottom: 8, right: 8}}>
          <Popover content={
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: 8}}>
              {COVERS.map((c, i) => (
                <img key={i} src={c} alt="" style={{width: 80, height: 40, objectFit: 'cover', cursor: 'pointer', borderRadius: 4}} onClick={() => setCover(c)} />
              ))}
            </div>
          }>
            <Button label="Change cover" variant="ghost" size="sm" />
          </Popover>
        </div>
      </div>
      <div style={{padding: '0 48px', marginTop: -32}}>
        <Popover content={
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, padding: 8}}>
            {EMOJIS.map((e) => (
              <button key={e} onClick={() => setIcon(e)} style={{fontSize: 24, background: 'none', border: 'none', cursor: 'pointer', padding: 4}}>{e}</button>
            ))}
          </div>
        }>
          <button style={{fontSize: 48, background: 'none', border: 'none', cursor: 'pointer'}}>{icon}</button>
        </Popover>
        {isEditing ? (
          <input value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => setIsEditing(false)} autoFocus style={{fontSize: 32, fontWeight: 'bold', border: 'none', outline: 'none', width: '100%'}} />
        ) : (
          <Heading level={1}><span onClick={() => setIsEditing(true)} style={{cursor: 'text'}}>{title}</span></Heading>
        )}
      </div>
    </div>
  );
}