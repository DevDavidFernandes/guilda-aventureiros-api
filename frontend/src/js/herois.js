// Desenha o livro: um dossiê expansível por herói, com seus itens e missões
function renderizarLivro() {
  const el = document.getElementById("lista-herois");

  if (!herois.length) {
    el.innerHTML = '<p class="vazio">O livro está em branco. Cadastre o primeiro herói ao lado.</p>';
    return;
  }

  el.innerHTML = herois
    .map((h) => {
      const itens = itensPorHeroi[h.id] || [];
      const dele = missoes.filter((m) => m.heroi_id === h.id);
      const ativas = dele.filter((m) => m.status === "em andamento").length;

      return `
    <details class="heroi" data-id="${h.id}" ${abertos.has(h.id) ? "open" : ""}>
      <summary>
        <span class="heroi-nome">${esc(h.nome)}</span>
        <span class="heroi-classe">${esc(h.classe)}</span>
        <span class="nivel">Nível ${h.nivel}</span>
        <span class="heroi-resumo">${itens.length} ${itens.length === 1 ? "item" : "itens"}${
          ativas ? `, <span class="em-campo">${ativas} em andamento</span>` : ""
        }</span>
      </summary>
      <div class="dossie">
        <div class="coluna"><h3>Itens</h3>${itensHtml(itens)}${formItemHtml(h.id)}</div>
        <div class="coluna"><h3>Missões</h3>${missoesHtml(dele)}${formMissaoHtml(h.id)}</div>
        <div class="dossie-rodape">
          <button class="sec peq" data-acao="editarHeroi" data-id="${h.id}">Editar herói</button>
          <button class="perigo peq" data-acao="removerHeroi" data-id="${h.id}" data-confirmar="Confirmar: apaga itens e missões">Remover herói</button>
        </div>
      </div>
    </details>`;
    })
    .join("");
}

acoes.criarHeroi = async (form) => {
  const heroi = await requisicao("POST", "/herois", lerFormulario(form));
  abertos.add(heroi.id); // o novo herói já aparece aberto
  form.reset();
  avisar("Herói cadastrado.");
  await atualizarTudo();
};

acoes.editarHeroi = (botao) => {
  const id = Number(botao.dataset.id);
  const h = herois.find((x) => x.id === id);
  editar(
    "Editar herói",
    [
      { nome: "nome", rotulo: "Nome", valor: h.nome },
      { nome: "classe", rotulo: "Classe", valor: h.classe },
      { nome: "nivel", rotulo: "Nível", valor: h.nivel, tipo: "number", min: 1 },
    ],
    async (dados) => {
      await requisicao("PUT", `/herois/${id}`, dados);
      avisar("Herói salvo.");
      await atualizarTudo();
    }
  );
};

acoes.removerHeroi = async (botao) => {
  const id = Number(botao.dataset.id);
  await requisicao("DELETE", `/herois/${id}`);
  abertos.delete(id);
  avisar("Herói removido.");
  await atualizarTudo();
};
