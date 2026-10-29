const db = require("../config/database");

// POST /itens
exports.criar = (req, res) => {
  const { nome, tipo, poder = 0, heroi_id } = req.body;

  if (!nome || !tipo || !heroi_id) {
    return res.status(400).json({ erro: "nome, tipo e heroi_id são obrigatórios" });
  }
  if (!Number.isInteger(poder) || poder < 0) {
    return res.status(400).json({ erro: "poder deve ser um inteiro maior ou igual a 0" });
  }

  // a chave estrangeira também protegeria, mas assim damos um erro claro
  const heroi = db.prepare("SELECT id FROM herois WHERE id = ?").get(heroi_id);
  if (!heroi) return res.status(404).json({ erro: "Herói não encontrado" });

  const resultado = db
    .prepare("INSERT INTO itens (nome, tipo, poder, heroi_id) VALUES (?, ?, ?, ?)")
    .run(nome, tipo, poder, heroi_id);

  res.status(201).json({ id: resultado.lastInsertRowid, nome, tipo, poder, heroi_id });
};

// PUT /itens/:id
exports.atualizar = (req, res) => {
  const item = db.prepare("SELECT * FROM itens WHERE id = ?").get(req.params.id);
  if (!item) return res.status(404).json({ erro: "Item não encontrado" });

  const nome = req.body.nome ?? item.nome;
  const tipo = req.body.tipo ?? item.tipo;
  const poder = req.body.poder ?? item.poder;
  const heroi_id = req.body.heroi_id ?? item.heroi_id;

  if (!nome || !tipo || !Number.isInteger(poder) || poder < 0) {
    return res.status(400).json({ erro: "Dados inválidos" });
  }
  // permite passar o item para outro herói, mas só se ele existir
  if (!db.prepare("SELECT id FROM herois WHERE id = ?").get(heroi_id)) {
    return res.status(404).json({ erro: "Herói não encontrado" });
  }

  db.prepare("UPDATE itens SET nome = ?, tipo = ?, poder = ?, heroi_id = ? WHERE id = ?").run(
    nome,
    tipo,
    poder,
    heroi_id,
    req.params.id
  );
  res.json({ id: item.id, nome, tipo, poder, heroi_id });
};

// DELETE /itens/:id
exports.remover = (req, res) => {
  const resultado = db.prepare("DELETE FROM itens WHERE id = ?").run(req.params.id);
  if (resultado.changes === 0) {
    return res.status(404).json({ erro: "Item não encontrado" });
  }
  res.status(204).send();
};
