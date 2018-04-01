const mysql = require('mysql2/promise');
let _db;

async function setupDatabase() {
  // create the connection
  _db = await mysql.createPool({
      host     : "localhost",
      port     : 3306,
      user     : "cpsc471",
      password : "q4x79YN6bit0sE6oJuI8",
      database : "project_rift"
  });
}

async function getDatabase() {
  return _db;
}

module.exports = {
  setupDatabase,
  getDatabase
}
