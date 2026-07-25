// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function MeetingScheduler() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('30');

  return (
    <div style={{maxWidth: 480, margin: '0 auto', padding: 24, fontFamily: 'system-ui'}}>
      <h2 style={{marginBottom: 16}}>Schedule a Meeting</h2>
      <p style={{color: '#666', marginBottom: 24}}>Pick a date, start time, and duration.</p>
      <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          Date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{padding: 8, border: '1px solid #ccc', borderRadius: 4}} />
        </label>
        <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          Start Time
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} style={{padding: 8, border: '1px solid #ccc', borderRadius: 4}} />
        </label>
        <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          Duration (minutes)
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} min={5} style={{padding: 8, border: '1px solid #ccc', borderRadius: 4}} />
        </label>
        <button disabled={!date || !startTime} style={{padding: '10px 16px', background: !date || !startTime ? '#ccc' : '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}>
          Schedule Meeting
        </button>
      </div>
    </div>
  );
}
