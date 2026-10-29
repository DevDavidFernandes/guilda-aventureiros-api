// Endereço da API. Como o back-end serve o front, basta usar o mesmo endereço.
const API = "";

// Estado da tela: o que veio do servidor e quais dossiês estão abertos
let herois = [];
let missoes = [];
let itensPorHeroi = {};
const abertos = new Set();

// Cada arquivo registra aqui as ações que os botões e formulários disparam (data-acao)
const acoes = {};

// Função única que fala com a API: monta a requisição, envia JSON e trata erros.
async function requisicao(metodo, caminho, corpo) {
  const resposta = await fetch(API + caminho, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: corpo ? JSON.stringify(corpo) : undefined,
  });

  // DELETE responde 204 (sem corpo)
  const dados = resposta.status === 204 ? null : await resposta.json();

  if (!resposta.ok) {
    avisar(dados?.erro || "Não foi possível concluir a ação.", true);
    throw new Error(dados?.erro);
  }
  return dados;
}

// Lê um formulário e devolve um objeto; campos number viram número de verdade
function lerFormulario(form) {
  const dados = {};
  for (const campo of form.elements) {
    if (!campo.name) continue;
    dados[campo.name] = campo.type === "number" ? Number(campo.value) : campo.value.trim();
  }
  return dados;
}

// Evita que um nome como "<script>" seja interpretado como HTML
function esc(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

// Mensagem curta no canto da tela
let tempoAviso;
function avisar(texto, erro = false) {
  const el = document.getElementById("aviso");
  el.textContent = texto;
  el.className = "visivel" + (erro ? " erro" : "");
  clearTimeout(tempoAviso);
  tempoAviso = setTimeout(() => (el.className = ""), 4000);
}

// Recarrega os dados do servidor e redesenha a tela
async function atualizarTudo() {
  herois = await requisicao("GET", "/herois");

  const [listaMissoes, grupos, resumo] = await Promise.all([
    requisicao("GET", "/missoes"),
    Promise.all(herois.map((h) => requisicao("GET", `/herois/${h.id}/itens`))),
    requisicao("GET", "/painel"),
  ]);

  missoes = listaMissoes;
  itensPorHeroi = {};
  herois.forEach((h, i) => (itensPorHeroi[h.id] = grupos[i]));

  renderizarPainel(resumo);
  renderizarLivro();
}

// Diálogo de edição genérico: recebe os campos e uma função que salva
function editar(titulo, campos, salvar) {
  const dialogo = document.getElementById("editor");
  const form = dialogo.querySelector("form");
  dialogo.querySelector("h2").textContent = titulo;

  const area = form.querySelector(".campos");
  area.replaceChildren();
  for (const c of campos) {
    const rotulo = document.createElement("label");
    rotulo.append(c.rotulo + " ");
    const input = document.createElement("input");
    input.name = c.nome;
    input.type = c.tipo || "text";
    input.value = c.valor;
    input.required = true;
    if (c.tipo === "number") input.min = c.min ?? 0;
    rotulo.append(input);
    area.append(rotulo);
  }

  form.onsubmit = async (e) => {
    e.preventDefault();
    try {
      await salvar(lerFormulario(form));
      dialogo.close();
    } catch {
      /* o aviso de erro já foi mostrado por requisicao() */
    }
  };
  dialogo.showModal();
}
document.getElementById("cancelar").addEventListener("click", () => document.getElementById("editor").close());

// Remover pede dois cliques: o primeiro "arma" o botão, o segundo confirma
function armar(botao) {
  const original = botao.textContent;
  botao.dataset.armado = "1";
  botao.textContent = botao.dataset.confirmar;
  setTimeout(() => {
    if (!botao.isConnected) return;
    delete botao.dataset.armado;
    botao.textContent = original;
  }, 4000);
}

// Um único ouvinte para todos os botões e formulários da página (delegação de eventos)
document.addEventListener("click", async (e) => {
  const botao = e.target.closest("[data-acao]");
  if (!botao || botao.tagName === "FORM") return;

  if (botao.dataset.confirmar && !botao.dataset.armado) return armar(botao);

  try {
    await acoes[botao.dataset.acao](botao);
  } catch {
    /* erro já avisado */
  }
});

document.addEventListener("submit", async (e) => {
  const form = e.target.closest("form[data-acao]");
  if (!form) return;
  e.preventDefault(); // não deixa o form recarregar a página
  try {
    await acoes[form.dataset.acao](form);
  } catch {
    /* erro já avisado */
  }
});

// Lembra quais dossiês o usuário abriu, para não fecharem ao redesenhar
document.addEventListener(
  "toggle",
  (e) => {
    const d = e.target;
    if (!d.classList?.contains("heroi")) return;
    const id = Number(d.dataset.id);
    d.open ? abertos.add(id) : abertos.delete(id);
  },
  true
);
