const express = require("express");
const cors = require("cors");
const path = require("path");

// importar o banco aqui garante que as tabelas sejam criadas ao subir a API
require("./config/database");

const heroisRoutes = require("./routes/herois.routes");
const itensRoutes = require("./routes/itens.routes");
const missoesRoutes = require("./routes/missoes.routes");
const painelRoutes = require("./routes/painel.routes");

const app = express();

// permite que o front-end (outra origem) consuma a API
app.use(cors());

// middleware que transforma o corpo JSON da requisição em req.body
app.use(express.json());

// serve o front-end estático (http://localhost:3000/)
app.use(express.static(path.join(__dirname, "../../frontend")));

app.get("/api", (req, res) => {
  res.json({ mensagem: "A guilda está aberta!" });
});

app.use("/herois", heroisRoutes);
app.use("/itens", itensRoutes);
app.use("/missoes", missoesRoutes);
app.use("/painel", painelRoutes);

// rota inexistente
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

// tratador de erros: qualquer erro lançado nos controllers cai aqui
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: "Erro interno do servidor" });
});

module.exports = app;
