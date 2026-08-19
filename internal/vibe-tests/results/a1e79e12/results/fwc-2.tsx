import {useState} from 'react';
import {Button} from './components/ui/button';
import {Badge} from './components/ui/badge';

export default function NotificationBell() {
  const [count, setCount] = useState(3);

  if (count === 0) {
    return (
      <Button variant="ghost" size="icon" onClick={() => setCount(5)} aria-label="Notifications">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      </Button>
    );
  }

  return (
    <div className="relative inline-flex">
      <Button variant="ghost" size="icon" onClick={() => setCount(0)} aria-label={`${count} unread notifications`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      </Button>
      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0" variant="destructive">
        {count}
      </Badge>
    </div>
  );
}
