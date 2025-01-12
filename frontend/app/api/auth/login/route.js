import bcrypt from 'bcrypt';        
import jwt from 'jsonwebtoken';
import supabase from '../../../../lib/supabaseClient'; // Supabaseクライアント

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    // Supabaseでユーザーを検索
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    // ユーザーが見つからない場合、新規登録
    if (error || !data) {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // 新規ユーザーを登録
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([{ email, password: hashedPassword }])
        .select(); // データが挿入された後に選択

      if (insertError) {
        // ユーザー登録エラー
        return new Response(JSON.stringify({ message: 'ユーザー登録に失敗しました。' }), { status: 500 });
      }

      // 新規ユーザー作成後、JWTトークンを発行
      const token = jwt.sign({ userId: newUser[0].id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

      return new Response(JSON.stringify({ token }), {
        headers: { 'Content-Type': 'application/json' },  
      });
    }

    // ユーザーが見つかった場合、パスワード照合
    const isPasswordValid = await bcrypt.compare(password, data.password);
    if (!isPasswordValid) {
      // パスワードが無効な場合
      return new Response(JSON.stringify({ message: '無効な認証情報です' }), { status: 401 });
    }

    // パスワードが正しい場合、JWTトークンを発行
    const token = jwt.sign({ userId: data.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    // 成功した場合、トークンを返す
    return new Response(JSON.stringify({ token }), {      
      headers: { 'Content-Type': 'application/json' },    
    });

  } catch (error) {
    // サーバーエラー
    return new Response(JSON.stringify({ message: 'サーバー内部エラーが発生しました。' }), { status: 500 });
  }
}
