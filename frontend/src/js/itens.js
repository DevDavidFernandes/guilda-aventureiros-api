function itensHtml(itens) {
  if (!itens.length) return '<p class="vazio">Sem itens. Adicione o primeiro abaixo.</p>';

  return `<ul class="linhas">${itens
    .map(
      (i) => `
    <li>
      <span class="linha-texto"><b>${esc(i.nome)}</b> <span class="detalhe">${esc(i.tipo)}, poder ${i.poder}</span></span>
      <span class="linha-botoes">
        <button class="sec peq" data-acao="editarItem" data-id="${i.id}">Editar</button>
        <button class="perigo peq" data-acao="removerItem" data-id="${i.id}" data-confirmar="Confirmar">Remover</button>
      </span>
    </li>`
    )
    .join("")}</ul>`;
}

function formItemHtml(heroiId) {
  return `
    <form data-acao="criarItem" data-heroi="${heroiId}" class="form-linha">
      <input name="nome" placeholder="Nome do item" aria-label="Nome do item" required autocomplete="off" />
      <input name="tipo" placeholder="Tipo" aria-label="Tipo do item" required autocomplete="off" />
      <input name="poder" type="number" min="0" value="0" aria-label="Poder" required />
      <button class="sec">Adicionar item</button>
    </form>`;
}

function acharItem(id) {
  return Object.values(itensPorHeroi).flat().find((i) => i.id === id);
}

acoes.criarItem = async (form) => {
  const dados = lerFormulario(form);
  dados.heroi_id = Number(form.dataset.heroi);
  await requisicao("POST", "/itens", dados);
  avisar("Item adicionado.");
  await atualizarTudo();
};

acoes.editarItem = (botao) => {
  const id = Number(botao.dataset.id);
  const i = acharItem(id);
  editar(
    "Editar item",
    [
      { nome: "nome", rotulo: "Nome", valor: i.nome },
      { nome: "tipo", rotulo: "Tipo", valor: i.tipo },
      { nome: "poder", rotulo: "Poder", valor: i.poder, tipo: "number" },
    ],
    async (dados) => {
      await requisicao("PUT", `/itens/${id}`, dados);
      avisar("Item salvo.");
      await atualizarTudo();
    }
  );
};

acoes.removerItem = async (botao) => {
  await requisicao("DELETE", `/itens/${botao.dataset.id}`);
  avisar("Item removido.");
  await atualizarTudo();
};
