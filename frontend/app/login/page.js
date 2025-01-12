'use client'; // クライアントサイドレンダリングを明示

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  // useRouterのインポートパスを修正

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();  // useRouter を定義

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setToken('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
        alert('ログイン成功');
        // ログイン成功後にページ遷移
        router.push('/expense-form');  // 'next/navigation' に変更
      } else {
        setError(data.message || 'エラーが発生しました');
      }
    } catch (err) {
      setError('サーバーに接続できませんでした');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}       
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}  
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'ログイン中...' : 'ログイン'}
        </button>
      </form>
      {token && (
        <div>
          <p>ログイン成功！JWT トークン: {token}</p>
        </div>
      )}
    </div>
  );
}
