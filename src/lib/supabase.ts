import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const supabase = createClient(
  url || 'https://fytzdqhoijvmktpjazrl.supabase.co',
  anonKey || 'sb_publishable_t3ykWygodFDvXWQyj_tHOQ_3ZzWMBg2',
);
