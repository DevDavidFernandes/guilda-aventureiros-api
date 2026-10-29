// Desenha n marcas de contagem: quatro riscos e um traço cortando, em grupos de cinco
function marcas(n) {
  if (n === 0) return '<span class="sem-marcas">nenhum registro</span>';

  const MAX = 40;
  const visiveis = Math.min(n, MAX);
  const grupos = Math.ceil(visiveis / 5);
  let linhas = "";
  let i = 0; // ordem de desenho, usada no atraso da animação

  for (let g = 0; g < grupos; g++) {
    const x0 = g * 34;
    const qtd = Math.min(5, visiveis - g * 5);
    for (let k = 0; k < Math.min(qtd, 4); k++) {
      const x = x0 + 4 + k * 7;
      linhas += `<line pathLength="1" x1="${x}" y1="4" x2="${x}" y2="30" style="--i:${i++}"/>`;
    }
    if (qtd === 5) {
      linhas += `<line pathLength="1" x1="${x0}" y1="25" x2="${x0 + 31}" y2="9" style="--i:${i++}"/>`;
    }
  }

  const largura = grupos * 34;
  return `<svg class="marcas" viewBox="0 0 ${largura} 34" width="${largura}" aria-hidden="true">${linhas}</svg>`;
}

function renderizarPainel(p) {
  const blocos = [
    { classe: "m-heroi", rotulo: "Heróis na guilda", n: p.herois },
    { classe: "m-item", rotulo: "Itens guardados", n: p.itens },
    { classe: "m-ativa", rotulo: "Missões em andamento", n: p.missoes_em_andamento },
    { classe: "m-feita", rotulo: "Missões concluídas", n: p.missoes_concluidas },
  ];

  document.getElementById("painel").innerHTML = blocos
    .map(
      (b) => `
    <div class="contagem ${b.classe}">
      <p class="contagem-rotulo">${b.rotulo} <span class="contagem-n">${b.n}</span></p>
      ${marcas(b.n)}
    </div>`
    )
    .join("");
}
