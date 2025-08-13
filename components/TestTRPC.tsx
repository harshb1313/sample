'use client';
import { trpc } from '@/lib/trpc';

export default function TestTRPC() {
  // ✅ useQuery is available on trpc now
  const { data, isLoading,error } = trpc.hello.useQuery({ name: 'Vox' });

  if (isLoading) return <div>Loading...</div>;
   if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return <div>{data.greeting}</div>;
}