import "../bootstrap";

module.exports = {
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_bin"
  },
  dialect: process.env.DB_DIALECT || "mysql",
  timezone: '-03:00',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'matchplayer',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  logging: false
};
