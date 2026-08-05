// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Popover} from '@astryxdesign/core/Popover';
import {Heading} from '@astryxdesign/core/Heading';

const EMOJIS = ['\u{1f4dd}', '\u{1f3af}', '\u{1f680}', '\u{1f4a1}', '\u{1f3a8}', '\u{1f4da}'];
const COVERS = ['https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=200&fit=crop', 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=200&fit=crop'];

export default function NotionHeader() {
  const [icon, setIcon] = useState(EMOJIS[0]);
  const [cover, setCover] = useState(COVERS[0]);
  const [title, setTitle] = useState('Untitled');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <div className="h-48 bg-cover bg-center relative" style={{backgroundImage: `url(${cover})`}}>
        <div className="absolute bottom-2 right-2">
          <Popover content={<div className="grid grid-cols-2 gap-2 p-2">{COVERS.map((c, i) => <img key={i} src={c} alt="" className="w-20 h-12 object-cover cursor-pointer rounded" onClick={() => setCover(c)} />)}</div>}>
            <Button label="Change cover" variant="ghost" size="sm" />
          </Popover>
        </div>
      </div>
      <div className="px-12 -mt-8">
        <Popover content={<div className="grid grid-cols-5 gap-2 p-2">{EMOJIS.map((e) => <button key={e} onClick={() => setIcon(e)} className="text-2xl bg-transparent border-none cursor-pointer">{e}</button>)}</div>}>
          <button className="text-5xl bg-transparent border-none cursor-pointer">{icon}</button>
        </Popover>
        {isEditing ? (
          <input value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => setIsEditing(false)} autoFocus className="text-3xl font-bold border-none outline-none w-full" />
        ) : (
          <Heading level={1}><span onClick={() => setIsEditing(true)} className="cursor-text">{title}</span></Heading>
        )}
      </div>
    </div>
  );
}