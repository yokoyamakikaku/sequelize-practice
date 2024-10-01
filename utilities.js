const fs = require('fs');

// ランダムな日付を生成
exports.getRandomDateWithinLastMonth = function getRandomDateWithinLastMonth() {
  const today = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date(today);
  date.setDate(today.getDate() - daysAgo);
  return date;
}

// 現在の日時をフォーマットする関数
exports.getCurrentFormattedDate = function getCurrentFormattedDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}${hour}${minute}${second}`;
}

// ディレクトリを作成する関数
exports.createDirectory = function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}
