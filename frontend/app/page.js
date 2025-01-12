'use client';

import { useState, useEffect } from 'react';
import LoginPage from './login/page';
import ExpenseForm from './expense-form/page';

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);        

  useEffect(() => {
    const token = localStorage.getItem('token'); // ローカルストレージからトークンを取得
    setIsAuthenticated(!!token); // トークンが存在するか確認
  }, []);

  const handleLogout = () => {      
    localStorage.removeItem('token'); // トークンを削除してログアウト   
    setIsAuthenticated(false);      
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token); // ログイン成功時にトークンをローカルストレージに保存
    setIsAuthenticated(true); // 認証状態を更新
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded mb-4"
          >
            Logout
          </button>
          <ExpenseForm />
        </div>
      ) : (
        <LoginPage onLogin={handleLoginSuccess} />
      )}
    </div>
  );  
}
