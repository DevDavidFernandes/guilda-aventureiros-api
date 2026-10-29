const db = require("../config/database");

// GET /missoes  (traz também o nome do herói, usando JOIN)
exports.listar = (req, res) => {
  const missoes = db
    .prepare(
      `SELECT m.id, m.nome, m.status, m.heroi_id, h.nome AS heroi_nome
       FROM missoes m
       JOIN herois h ON h.id = m.heroi_id
       ORDER BY m.id`
    )
    .all();
  res.json(missoes);
};

// POST /missoes  (cria a missão já "em andamento")
exports.criar = (req, res) => {
  const { nome, heroi_id } = req.body;

  if (!nome || !heroi_id) {
    return res.status(400).json({ erro: "nome e heroi_id são obrigatórios" });
  }
  if (!db.prepare("SELECT id FROM herois WHERE id = ?").get(heroi_id)) {
    return res.status(404).json({ erro: "Herói não encontrado" });
  }

  const resultado = db
    .prepare("INSERT INTO missoes (nome, heroi_id) VALUES (?, ?)")
    .run(nome, heroi_id);

  res
    .status(201)
    .json({ id: resultado.lastInsertRowid, nome, status: "em andamento", heroi_id });
};

// PUT /missoes/:id/status  (alterna entre "em andamento" e "concluída")
exports.alternarStatus = (req, res) => {
  const missao = db.prepare("SELECT * FROM missoes WHERE id = ?").get(req.params.id);
  if (!missao) return res.status(404).json({ erro: "Missão não encontrada" });

  const novoStatus = missao.status === "em andamento" ? "concluída" : "em andamento";
  db.prepare("UPDATE missoes SET status = ? WHERE id = ?").run(novoStatus, missao.id);

  res.json({ ...missao, status: novoStatus });
};

// DELETE /missoes/:id
exports.remover = (req, res) => {
  const resultado = db.prepare("DELETE FROM missoes WHERE id = ?").run(req.params.id);
  if (resultado.changes === 0) {
    return res.status(404).json({ erro: "Missão não encontrada" });
  }
  res.status(204).send();
};
