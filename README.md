<div align="center">

# ⚔️ Guilda de Aventureiros — API

### *"Todo herói precisa de alguém que anote suas conquistas."*

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

</div>

## 🏰 Sobre o Projeto

No reino de **Eldoria**, o Mestre da Guilda **Thorin Barba-de-Ferro** está cansado de controlar tudo em um pergaminho velho. Este projeto nasce para resolver isso: um **Sistema de Registro da Guilda**, com dados persistidos em banco de dados e expostos via **API REST**.

O sistema gerencia três entidades principais:

| Entidade | Descrição |
|---|---|
| 🧙 **Heróis** | Nome, classe (guerreiro, mago, arqueiro, curandeiro...) e nível |
| 🎒 **Itens** | Nome, tipo (arma, armadura, consumível...), poder e herói dono |
| 📯 **Missões** | Nome e status (`em andamento` / `concluída`) por herói |

---

## 🛠️ Stack Utilizada

- **Back-end:** Node.js + Express
- **Banco de Dados:** SQLite (via `better-sqlite3`)
- **Front-end:** HTML, CSS e JavaScript puro
- **Testes de rota:** Thunder Client (VS Code)
- **Versionamento:** Git + GitHub

---

## 📂 Estrutura do Projeto

```
guilda-aventureiros/
├── backend/
│   ├── src/
│   │   ├── config/         → conexão com o banco
│   │   ├── routes/         → definição das rotas
│   │   ├── controllers/    → regras de negócio
│   │   └── app.js
│   ├── database/
│   │   └── guilda.db
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
│
└── README.md
```

---

## 🔌 Rotas da API *(planejadas)*

### Heróis
| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/herois` | Lista todos os heróis |
| `GET` | `/herois/:id` | Busca um herói específico |
| `POST` | `/herois` | Cadastra um novo herói |
| `PUT` | `/herois/:id` | Edita um herói |
| `DELETE` | `/herois/:id` | Remove um herói |

### Itens
| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/herois/:id/itens` | Lista itens de um herói |
| `POST` | `/itens` | Cadastra um novo item |
| `PUT` | `/itens/:id` | Edita um item |
| `DELETE` | `/itens/:id` | Remove um item |

### Missões
| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/missoes` | Lista todas as missões |
| `PUT` | `/missoes/:id/status` | Alterna status da missão |

### Painel
| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/painel` | Resumo geral da guilda |

---

## 🚀 Como Rodar *(em construção)*

```bash
# clonar o repositório
git clone https://github.com/seu-usuario/guilda-aventureiros.git

# entrar na pasta do backend
cd guilda-aventureiros/backend

# instalar dependências
npm install

# subir o servidor
node server.js
```

> Instruções completas serão adicionadas conforme o projeto avança.

---

## 🎯 Status de Desenvolvimento

- [ ] Servidor Express rodando
- [ ] Banco de dados modelado
- [ ] CRUD de Heróis
- [ ] CRUD de Itens
- [ ] Gerenciamento de Missões
- [ ] Rota de Painel
- [ ] Front-end

---

<div align="center">

*Feito com 🍺 na taverna O Grifo Dourado*

</div>
