import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // 修正
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY; // 修正

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URLまたはキーが環境変数に設定されていません。');
}

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
