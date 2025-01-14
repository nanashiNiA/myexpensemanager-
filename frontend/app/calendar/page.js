"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import ja from "date-fns/locale/ja"; // 日本語ロケール

// Supabase クライアント
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// date-fns ローカライズ
const locales = {
  ja: ja,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarPage() {
  const [events, setEvents] = useState([]); // カレンダーイベントデータ

  // Supabase からデータを取得
  useEffect(() => {
    const fetchExpenses = async () => {
      const { data, error } = await supabase.from("expenses").select("*");
      if (error) {
        console.error("Error fetching expenses:", error.message);
        return;
      }

      // Supabase データをカレンダーイベント形式に変換
      const formattedData = data.map((expense) => ({
        title: `¥${expense.amount} (${expense.category})`,
        start: new Date(expense.date), // 日付を Date オブジェクトに変換
        end: new Date(expense.date),   // 同じ日を終了日として設定
        allDay: true,                  // 終日イベント
      }));

      setEvents(formattedData);
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <h1>支出カレンダー</h1>
      <Calendar
        localizer={localizer}
        events={events}          // カレンダーに表示するイベント
        startAccessor="start"    // 開始日
        endAccessor="end"        // 終了日
        style={{ height: 500 }}  // カレンダーの高さ
      />
    </div>
  );
}

