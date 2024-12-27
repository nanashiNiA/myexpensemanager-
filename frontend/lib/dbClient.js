const { Client } = require('pg');

// PostgreSQL接続情報
const client = new Client({
  host: 'localhost',       // ローカルDBホスト
  port: 54322,             // データベースのポート
  user: 'postgres',        // デフォルトユーザー
  password: 'postgres',    // デフォルトパスワード
  database: 'postgres',    // データベース名
});

module.exports = client;

