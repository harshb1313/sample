import { supabase } from '@/lib/supabase';

export default async function TestSupabase() {
  const { data, error } = await supabase
    .from('users') // we’ll create this table in Supabase
    .select('*');

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Supabase Test</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}