const db = require("../config/database");

// GET /painel  (resumo geral da guilda)
exports.resumo = (req, res) => {
  const contar = (sql) => db.prepare(sql).get().total;

  res.json({
    herois: contar("SELECT COUNT(*) AS total FROM herois"),
    missoes_em_andamento: contar(
      "SELECT COUNT(*) AS total FROM missoes WHERE status = 'em andamento'"
    ),
    missoes_concluidas: contar(
      "SELECT COUNT(*) AS total FROM missoes WHERE status = 'concluída'"
    ),
    itens: contar("SELECT COUNT(*) AS total FROM itens"),
  });
};
