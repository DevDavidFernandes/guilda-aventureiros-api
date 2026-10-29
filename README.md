<div align="center">

# ⚔️ Guilda de Aventureiros

**API REST e painel web para o registro da guilda de Eldoria.**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=flat-square&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=flat-square&logo=sqlite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

[Sobre](#sobre) · [Como rodar](#como-rodar) · [API](#api) · [Estrutura](#estrutura)

</div>

---

## Sobre

Thorin Barba-de-Ferro, Mestre da Guilda de Eldoria, cansou de anotar tudo em pergaminho. Este projeto é o sistema de registro que ele pediu: heróis, equipamentos e missões guardados em um banco SQLite, expostos por uma API REST e consumidos por um front-end em JavaScript puro.

| Entidade | Campos |
|---|---|
| 🧙 **Herói** | nome, classe, nível |
| 🎒 **Item** | nome, tipo, poder, herói dono |
| 📯 **Missão** | nome, status (`em andamento` ou `concluída`), herói responsável |

Apagar um herói remove também os itens e as missões dele (`ON DELETE CASCADE`).

## Stack

- **Back-end:** Node.js, Express 5 e `better-sqlite3`
- **Front-end:** HTML, CSS e JavaScript sem frameworks, servido pelo próprio Express
- **Banco:** SQLite, criado automaticamente na primeira execução

## Como rodar

Requisitos: Node.js 18 ou superior.

```bash
git clone https://github.com/DevDavidFernandes/guilda-aventureiros-api.git
cd guilda-aventureiros-api/backend
npm install
npm start
```

Abra **http://localhost:3000** para usar o painel. A API responde na mesma porta, por exemplo em `http://localhost:3000/herois`.

O arquivo `backend/database/guilda.db` é gerado na primeira execução e não é versionado.

## API

Todas as respostas são JSON. Erros seguem o formato `{ "erro": "mensagem" }` com status `400`, `404` ou `500`.

### Heróis

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/herois` | Lista todos os heróis |
| `GET` | `/herois/:id` | Busca um herói |
| `POST` | `/herois` | Cadastra um herói |
| `PUT` | `/herois/:id` | Edita um herói |
| `DELETE` | `/herois/:id` | Remove um herói |
| `GET` | `/herois/:id/itens` | Lista os itens de um herói |

### Itens

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/itens` | Cadastra um item |
| `PUT` | `/itens/:id` | Edita um item |
| `DELETE` | `/itens/:id` | Remove um item |

### Missões

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/missoes` | Lista as missões, com o nome do herói |
| `POST` | `/missoes` | Cadastra uma missão (começa `em andamento`) |
| `PUT` | `/missoes/:id/status` | Alterna entre `em andamento` e `concluída` |
| `DELETE` | `/missoes/:id` | Remove uma missão |

### Painel

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/painel` | Totais de heróis, itens e missões |

### Exemplo

```bash
curl -X POST http://localhost:3000/herois \
  -H "Content-Type: application/json" \
  -d '{"nome": "Aragorn", "classe": "guerreiro", "nivel": 5}'
```

```json
{ "id": 1, "nome": "Aragorn", "classe": "guerreiro", "nivel": 5 }
```

## Estrutura

```
.
├── backend/
│   ├── server.js            # sobe o servidor na porta 3000
│   ├── database/            # guilda.db (gerado automaticamente)
│   └── src/
│       ├── app.js           # configuração do Express
│       ├── config/          # conexão e criação das tabelas
│       ├── routes/          # rotas de cada entidade
│       └── controllers/     # lógica e validações
└── frontend/
    ├── index.html
    └── src/
        ├── css/
        └── js/              # um módulo por entidade + api.js
```

---

<div align="center">

<sub>Feito na taverna O Grifo Dourado 🍺</sub>

</div>
