import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient'; // Supabaseクライアントのパスに合わせて修正

export default function ExpenseForm({ onSubmit }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [categories, setCategories] = useState([
    '食費', '交通費', '趣味', '外食', '光熱費', // 初期カテゴリ
  ]);
  const [errorMessage, setErrorMessage] = useState('');
  
  // フォーム送信処理
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !category || !date) {
      setErrorMessage('すべてのフィールドを入力してください');
      return;
    }

    try {
      // Supabaseへデータ送信
      const { data, error } = await supabase
        .from('expenses') // 'expenses' テーブルにデータを送信
        .insert([
          { amount, category: customCategory || category, date },
        ]);
      
      if (error) {
        setErrorMessage('データ送信に失敗しました。再試行してください。');
        console.error(error);
        return;
      }

      console.log('データ送信成功:', data);
      // 親コンポーネントにデータ送信
      onSubmit({ amount, category: customCategory || category, date });

      // フォームリセット
      setAmount('');
      setCategory('');
      setDate('');
      setCustomCategory('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('予期しないエラーが発生しました。');
      console.error(error);
    }
  };

  // 新しいカテゴリ追加
  const handleAddCategory = () => {
    if (customCategory && !categories.includes(customCategory)) {
      setCategories([...categories, customCategory]);
      setCategory(customCategory); // 新しいカテゴリを選択状態に
      setCustomCategory(''); // 入力フィールドをクリア
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>金額:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="金額"
        />
      </div>

      <div>
        <label>カテゴリ:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>カテゴリーを選択</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        <div>
          <input
            type="text"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            placeholder="新しいカテゴリを追加"
          />
          <button type="button" onClick={handleAddCategory}>
            カテゴリを追加
          </button>
        </div>
      </div>

      <div>
        <label>日付:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <button type="submit">支出を追加</button>
    </form>
  );
}
