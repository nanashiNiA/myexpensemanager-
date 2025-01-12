// app/api/expenses/route.js
import supabase from '../../../lib/supabaseClient'; // Supabaseクライアント

export async function POST(req) {
  const { amount, category, date } = await req.json();

  try {
    // 支出データをSupabaseに保存
    const { data, error } = await supabase
      .from('expenses')  // 'expenses'テーブルに保存
      .insert([{ amount, category, date }]);

    if (error) {
      // エラーがあれば、500ステータスコードを返す
      return new Response(JSON.stringify({ error: '支出データの保存に失敗しました。' }), { status: 500 });
    }

    // 成功した場合は、保存したデータを返す
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // サーバーエラーが発生した場合
    return new Response(JSON.stringify({ error: 'サーバーエラーが発生しました。' }), { status: 500 });
  }
}
