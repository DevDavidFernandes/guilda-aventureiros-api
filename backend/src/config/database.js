const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

// caminho absoluto até backend/database/guilda.db
const pastaDb = path.join(__dirname, "../../database");

// o SQLite cria o arquivo .db, mas não cria a pasta
fs.mkdirSync(pastaDb, { recursive: true });

const db = new Database(path.join(pastaDb, "guilda.db"));

// SQLite só respeita chaves estrangeiras se você ligar isso
db.pragma("foreign_keys = ON");

// Cria as tabelas na primeira execução (IF NOT EXISTS evita erro nas próximas)
db.exec(`
  CREATE TABLE IF NOT EXISTS herois (
    id     INTEGER PRIMARY KEY AUTOINCREMENT,
    nome   TEXT NOT NULL,
    classe TEXT NOT NULL,
    nivel  INTEGER NOT NULL DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS itens (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    nome     TEXT NOT NULL,
    tipo     TEXT NOT NULL,
    poder    INTEGER NOT NULL DEFAULT 0,
    heroi_id INTEGER NOT NULL,
    FOREIGN KEY (heroi_id) REFERENCES herois(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS missoes (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    nome     TEXT NOT NULL,
    status   TEXT NOT NULL DEFAULT 'em andamento'
             CHECK (status IN ('em andamento', 'concluída')),
    heroi_id INTEGER NOT NULL,
    FOREIGN KEY (heroi_id) REFERENCES herois(id) ON DELETE CASCADE
  );
`);

module.exports = db;
