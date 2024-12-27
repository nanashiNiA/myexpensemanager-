import client from '../../../lib/dbClient';

export async function POST(request) {
  const { amount, category, date } = await request.json();

  try {
    // データベース接続
    await client.connect();

    // データ挿入
    const result = await client.query(
      'INSERT INTO expenses (amount, category, date) VALUES ($1, $2, $3) RETURNING *',
      [amount, category, date]
    );

    // 成功レスポンス
    return new Response(JSON.stringify({ success: true, data: result.rows[0] }), { status: 200 });
  } catch (error) {
    console.error('Error inserting expense:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  } finally {
    await client.end(); // 接続を閉じる
  }
}

