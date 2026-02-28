const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'consultation.db'));

// 상담 이력 테이블 생성
db.exec(`
  CREATE TABLE IF NOT EXISTS consultations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
