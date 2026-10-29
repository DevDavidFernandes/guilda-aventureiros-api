// O server.js só sobe o servidor; toda a configuração do Express está em src/app.js
const app = require("./src/app");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
