// app/dashboard/page.tsx
// app/chat/page.tsx
'use client';
import Chat from '@/components/Chat';

export default function ChatPage() {
  return (
    <div className="max-w-xs mx-auto mt-4">
        <h1>Chat PAGE</h1>
      <Chat />
    </div>
  );
}
