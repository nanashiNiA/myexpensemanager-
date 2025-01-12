import supabase from '../../../lib/supabaseClient';

export async function GET() {
  const { data, error } = await supabase
    .from('users') // 存在するテーブル名に置き換える
    .select('*');

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ data }), { status: 200 });
}
