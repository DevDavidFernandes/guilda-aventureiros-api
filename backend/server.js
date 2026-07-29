// Importando o Express para o node poder usar
const express = require("express");

//  inicializa o framework, A execução retorna um objeto de aplicação completo. Esse objeto contém todas as funcionalidades necessárias para gerenciar requisições HTTP, middlewares e rotas.
const app = express();

// Define uma constante que armazena o número da porta na qual o servidor irá "escutar" por conexões.
const PORT = 3000;

// Está dizendo que essa rota responde a requisições do tipo GET (consulta, ler algo)
// '/' → o caminho da URL
// (req, res) => {...} → uma função que roda toda vez que alguém acessa essa rota.
// req (request) é a requisição que chegou (o que o navegador está pedindo), res (response) é o que você vai usar pra responder
app.get("/", (req, res) => {
  // Aqui dentro podemos definir o que queremos que aconteça quando alguém acessar a rota raiz do servidor
  res.send("Servidor Express rodando!");
});

// é o comando final que inicia o servidor e o coloca em estado de espera para receber conexões.
app.listen(PORT, () => {
  //Feedback Visual confirmando que o processo está ativo e pronto para receber requisições.
  console.log(`Servidor rodando na porta ${PORT}`);
});
