import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function insertUser(email, plainPassword) {
  try {
    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // データを挿入
    const { data, error } = await supabase
      .from('users') // テーブル名
      .insert([
        { email: email, password: hashedPassword } // 必要なカラムに合わせて修正
      ]);

    if (error) {
      console.error('Error inserting user:', error.message);
      return;
    }

    console.log('User inserted successfully:', data);
  } catch (err) {
    console.error('Unexpected error:', err.message);
  }
}

// 使用例
const email = 'gudenagi.hamukav6@gmail.com';
const plainPassword = 'your-password-here'; // ここに生パスワードを入力
insertUser(email, plainPassword);
