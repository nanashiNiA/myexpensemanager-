"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link"; // ページ間リンクを追加

// 環境変数から Supabase の URL とキーを取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// Supabase クライアントの作成
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ExpenseForm() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [statusMessage, setStatusMessage] = useState(""); // 成功・エラーメッセージを表示
  const [submittedData, setSubmittedData] = useState([]); // 送信済みデータを表示するための状態

  const handleSubmit = async (e) => {
    e.preventDefault(); // ページリロードを防ぐ

    // 入力チェック
    if (!amount || !category || !date) {
      setStatusMessage("全てのフィールドを入力してください。");
      return;
    }

    try {
      // Supabase にデータを送信
      const { data, error } = await supabase.from("expenses").insert([
        {
          amount: parseFloat(amount), // 数値型に変換
          category: category,
          date: date,
        },
      ]);

      if (error) {
        console.error("Supabase Error:", error.message);
        setStatusMessage("データ送信中にエラーが発生しました。");
        return;
      }

      // 成功時の処理
      setStatusMessage("データが記録されました！");
      setSubmittedData((prevData) => [
        ...prevData,
        { amount, category, date }, // 新しいデータを追加
      ]);

      // 入力フィールドをリセット
      setAmount("");
      setCategory("");
      setDate("");
    } catch (err) {
      console.error("Unexpected Error:", err);
      setStatusMessage("予期しないエラーが発生しました。");
    }
  };

  return (
    <div>
      {/* リボンメニュー */}
      <nav
        style={{
          backgroundColor: "#4CAF50", // 緑色
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
        }}
      >
        <h1>経費管理システム</h1>
        <div>
          <Link href="/expense-form">
            <button
              style={{
                backgroundColor: "white",
                color: "#4CAF50",
                border: "none",
                padding: "8px 12px",
                marginRight: "10px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              経費記録
            </button>
          </Link>
          <Link href="/calendar">
            <button
              style={{
                backgroundColor: "white",
                color: "#4CAF50",
                border: "none",
                padding: "8px 12px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              カレンダー
            </button>
          </Link>
        </div>
      </nav>

      {/* 経費記録フォーム */}
      <div style={{ padding: "20px" }}>
        <h1>経費記録フォーム</h1>
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
              <option value="">選択してください</option>
              <option value="food">食費</option>
              <option value="transport">交通費</option>
              <option value="entertainment">娯楽費</option>
              <option value="others">その他</option>
            </select>
          </div>
          <div>
            <label>日付:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button type="submit">送信</button>
        </form>

        {/* ステータスメッセージ */}
        {statusMessage && <p>{statusMessage}</p>}

        {/* 送信されたデータの表示 */}
        <h2>記録されたデータ:</h2>
        <ul>
          {submittedData.map((data, index) => (
            <li key={index}>
              {`金額: ${data.amount}, カテゴリ: ${data.category}, 日付: ${data.date}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
