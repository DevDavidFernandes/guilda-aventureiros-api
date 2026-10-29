function missoesHtml(lista) {
  if (!lista.length) return '<p class="vazio">Sem missões. Registre a primeira abaixo.</p>';

  return `<ul class="linhas">${lista
    .map((m) => {
      const feita = m.status === "concluída";
      return `
    <li>
      <span class="linha-texto"><b>${esc(m.nome)}</b>
        <span class="selo ${feita ? "feita" : "ativa"}">${m.status}</span></span>
      <span class="linha-botoes">
        <button class="sec peq" data-acao="alternarMissao" data-id="${m.id}">${feita ? "Reabrir" : "Concluir"}</button>
        <button class="perigo peq" data-acao="removerMissao" data-id="${m.id}" data-confirmar="Confirmar">Remover</button>
      </span>
    </li>`;
    })
    .join("")}</ul>`;
}

function formMissaoHtml(heroiId) {
  return `
    <form data-acao="criarMissao" data-heroi="${heroiId}" class="form-linha">
      <input name="nome" placeholder="Nome da missão" aria-label="Nome da missão" required autocomplete="off" />
      <button class="sec">Aceitar missão</button>
    </form>`;
}

acoes.criarMissao = async (form) => {
  const dados = lerFormulario(form);
  dados.heroi_id = Number(form.dataset.heroi);
  await requisicao("POST", "/missoes", dados);
  avisar("Missão registrada.");
  await atualizarTudo();
};

acoes.alternarMissao = async (botao) => {
  const m = await requisicao("PUT", `/missoes/${botao.dataset.id}/status`);
  avisar(m.status === "concluída" ? "Missão concluída." : "Missão reaberta.");
  await atualizarTudo();
};

acoes.removerMissao = async (botao) => {
  await requisicao("DELETE", `/missoes/${botao.dataset.id}`);
  avisar("Missão removida.");
  await atualizarTudo();
};
