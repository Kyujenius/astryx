// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Button} from '@/components/ui/button';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';

function BoldIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2h5a3 3 0 0 1 2.1 5.15A3.5 3.5 0 0 1 9.5 14H4V2zm2 5h3a1 1 0 0 0 0-2H6v2zm0 2v3h3.5a1.5 1.5 0 0 0 0-3H6z"/></svg>;
}
function ItalicIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M6 2h6v2h-2.2l-2.6 8H9v2H3v-2h2.2l2.6-8H6V2z"/></svg>;
}
function UnderlineIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2v6a4 4 0 0 0 8 0V2h-2v6a2 2 0 0 1-4 0V2H4zm-1 12h10v-1.5H3V14z"/></svg>;
}
function LinkIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M6.354 5.354l1.414-1.414a3 3 0 0 1 4.243 4.243l-1.414 1.414-1.414-1.414 1.414-1.414a1 1 0 0 0-1.414-1.414L8.768 6.768 6.354 5.354zm3.292 5.292l-1.414 1.414a3 3 0 0 1-4.243-4.243l1.414-1.414 1.414 1.414-1.414 1.414a1 1 0 0 0 1.414 1.414l1.414-1.414 1.414 1.414z"/></svg>;
}

export default function FormattingToolbar() {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 p-1 border rounded-lg">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Bold"><BoldIcon /></Button>
          </TooltipTrigger>
          <TooltipContent>Bold (Ctrl+B)</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Italic"><ItalicIcon /></Button>
          </TooltipTrigger>
          <TooltipContent>Italic (Ctrl+I)</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Underline"><UnderlineIcon /></Button>
          </TooltipTrigger>
          <TooltipContent>Underline (Ctrl+U)</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Link"><LinkIcon /></Button>
          </TooltipTrigger>
          <TooltipContent>Link (Ctrl+K)</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
