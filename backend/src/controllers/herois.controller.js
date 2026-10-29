const db = require("../config/database");

// GET /herois
exports.listar = (req, res) => {
  const herois = db.prepare("SELECT * FROM herois ORDER BY id").all();
  res.json(herois);
};

// GET /herois/:id
exports.buscar = (req, res) => {
  const heroi = db.prepare("SELECT * FROM herois WHERE id = ?").get(req.params.id);
  if (!heroi) return res.status(404).json({ erro: "Herói não encontrado" });
  res.json(heroi);
};

// POST /herois
exports.criar = (req, res) => {
  const { nome, classe, nivel = 1 } = req.body;

  if (!nome || !classe) {
    return res.status(400).json({ erro: "nome e classe são obrigatórios" });
  }
  if (!Number.isInteger(nivel) || nivel < 1) {
    return res.status(400).json({ erro: "nivel deve ser um inteiro maior que 0" });
  }

  const resultado = db
    .prepare("INSERT INTO herois (nome, classe, nivel) VALUES (?, ?, ?)")
    .run(nome, classe, nivel);

  // lastInsertRowid é o id que o banco acabou de gerar
  res.status(201).json({ id: resultado.lastInsertRowid, nome, classe, nivel });
};

// PUT /herois/:id
exports.atualizar = (req, res) => {
  const heroi = db.prepare("SELECT * FROM herois WHERE id = ?").get(req.params.id);
  if (!heroi) return res.status(404).json({ erro: "Herói não encontrado" });

  // o que não foi enviado mantém o valor antigo
  const nome = req.body.nome ?? heroi.nome;
  const classe = req.body.classe ?? heroi.classe;
  const nivel = req.body.nivel ?? heroi.nivel;

  if (!nome || !classe || !Number.isInteger(nivel) || nivel < 1) {
    return res.status(400).json({ erro: "Dados inválidos" });
  }

  db.prepare("UPDATE herois SET nome = ?, classe = ?, nivel = ? WHERE id = ?").run(
    nome,
    classe,
    nivel,
    req.params.id
  );
  res.json({ id: heroi.id, nome, classe, nivel });
};

// DELETE /herois/:id
exports.remover = (req, res) => {
  const resultado = db.prepare("DELETE FROM herois WHERE id = ?").run(req.params.id);
  if (resultado.changes === 0) {
    return res.status(404).json({ erro: "Herói não encontrado" });
  }
  res.status(204).send();
};

// GET /herois/:id/itens
exports.listarItens = (req, res) => {
  const heroi = db.prepare("SELECT id FROM herois WHERE id = ?").get(req.params.id);
  if (!heroi) return res.status(404).json({ erro: "Herói não encontrado" });

  const itens = db
    .prepare("SELECT * FROM itens WHERE heroi_id = ? ORDER BY id")
    .all(req.params.id);
  res.json(itens);
};
