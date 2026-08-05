// Copyright (c) Meta Platforms, Inc. and affiliates.

"use client";
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

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
        <Popover><PopoverTrigger asChild><Button variant="ghost" size="sm" className="absolute bottom-2 right-2">Change cover</Button></PopoverTrigger>
          <PopoverContent><div className="grid grid-cols-2 gap-2">{COVERS.map((c, i) => <img key={i} src={c} alt="" className="w-full h-12 object-cover cursor-pointer rounded" onClick={() => setCover(c)} />)}</div></PopoverContent>
        </Popover>
      </div>
      <div className="px-12 -mt-8">
        <Popover><PopoverTrigger asChild><button className="text-5xl bg-transparent border-none cursor-pointer">{icon}</button></PopoverTrigger>
          <PopoverContent><div className="grid grid-cols-4 gap-2">{EMOJIS.map((e) => <button key={e} onClick={() => setIcon(e)} className="text-2xl">{e}</button>)}</div></PopoverContent>
        </Popover>
        {isEditing ? <input value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => setIsEditing(false)} autoFocus className="text-3xl font-bold border-none outline-none w-full" /> : <h1 onClick={() => setIsEditing(true)} className="text-3xl font-bold cursor-text">{title}</h1>}
      </div>
    </div>
  );
}