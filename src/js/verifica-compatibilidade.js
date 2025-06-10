window.addEventListener("load", () => {
  function updatePageNumbers() {
    const pageNumbers = document.querySelectorAll(".pages li.page-number");
    pageNumbers.forEach((li) => {
      li.setAttribute("href", `?${li.textContent.trim()}`);
    });
    console.log("Atributo href atualizado nos elementos de paginação.");
  }

  function observePaginationChanges() {
    const paginationContainer = document.querySelector(".pager.bottom");

    if (paginationContainer) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            updatePageNumbers();
          }
        });
      });

      observer.observe(paginationContainer, { childList: true, subtree: true });

      updatePageNumbers();
    } else {
      console.log("Container de paginação não encontrado.");
    }
  }
  observePaginationChanges();

  let expanded = false;
  const verificarCompatibilidadeDiv = document.querySelector('.compat-header');
  verificarCompatibilidadeDiv.addEventListener('click', toggleCompat);

  function toggleCompat() {
    const content = document.getElementById("compatContent");
    const iconArrowDown = document.querySelector('.icon-arrow-down');
    const iconArrowUp = document.querySelector('.icon-arrow-up');

    expanded = !expanded;
    if(expanded) {
      content.style.display = "block";
      verificarCompatibilidadeDiv.style.paddingBottom = "15px";
      iconArrowDown.style.display = "none";
      iconArrowUp.style.display = "block";
    }else{
      content.style.display = "none";
      verificarCompatibilidadeDiv.style.paddingBottom = "";
      iconArrowDown.style.display = "block";
      iconArrowUp.style.display = "none";
    }

  }
});

const CONFIG = {
  ORIGIN: "https://dev2autoglass.myvtex.com",
}
const regexPlaca = /^[A-Z]{3}[\-_]?[0-9][0-9A-Z][0-9]{2}$/i;
const questionIcon = document.getElementById("icon-question");
const tooltip = document.getElementById("tooltip-question");


window.addEventListener('DOMContentLoaded', function () {
  const botaoVerificarCompatibilidade = document.querySelector('#botaoVerificarCompatibilidade');
  if (botaoVerificarCompatibilidade) {
    botaoVerificarCompatibilidade.addEventListener('click', function () {
      verificarProdutoComPlaca(document.getElementById('placaInput').value);
    });
  }
})

questionIcon.addEventListener("mouseenter", () => {
  tooltip.classList.remove("hidden");
});

questionIcon.addEventListener("mouseleave", () => {
  tooltip.classList.add("hidden");
});


function verificaPlacaValida(placa) {
  if (placa === "" || !placa.trim().match(regexPlaca)) {
    EstilizarCardCompatibilidade();
    return false;
  }
  return true;
}

async function verificarProdutoComPlaca(placa) {
  if (!verificaPlacaValida(placa)) return;

  const spinner = document.getElementById('overlayCompat');
  spinner.classList.remove('hidden');

  try {
    const FILTROS_VTEX = {
      MONTADORA: 36,
      VEICULO: 50,
      ANO: 48,
      FIPE: 76,
    };

    const placaSanitizada = placa.trim().replace(/[\W_]+/g, "").toUpperCase();
    const { montadora, modelo, anoModelo, fipe } = await obterDadosDoVeiculoViaOlhoNoCarro(placaSanitizada);

    const [montadoras, modelos, anos, fipes] = await Promise.all([
      encontrarDadosNoCadastroVtex({ filtro: FILTROS_VTEX.MONTADORA, regex: obterRegexMontadoras(montadora) }),
      encontrarDadosNoCadastroVtex({ filtro: FILTROS_VTEX.VEICULO, regex: obterRegexModelos(montadora, modelo) }),
      encontrarDadosNoCadastroVtex({ filtro: FILTROS_VTEX.ANO, regex: obterRegexAnos(anoModelo) }),
      fipe ? encontrarDadosNoCadastroVtex({ filtro: FILTROS_VTEX.FIPE, regex: obterRegexFipes(fipe) }) : [],
    ]);

    const filtros = [];
    const map = [];

    if (fipes.length) {
      filtros.push(fipes[0].Value);
      map.push(`specificationFilter_${FILTROS_VTEX.FIPE}`);
    }
    if (anos.length) {
      filtros.push(anos[0].Value);
      map.push(`specificationFilter_${FILTROS_VTEX.ANO}`);
    }
    if (modelos.length) {
      filtros.push(modelos[0].Value);
      map.push(`specificationFilter_${FILTROS_VTEX.VEICULO}`);
    }
    if (montadoras.length) {
      filtros.push(montadoras[0].Value);
      map.push(`specificationFilter_${FILTROS_VTEX.MONTADORA}`);
    }

    const rota = `/${[...filtros].reverse().join("/")}`;
    const url = `${rota}?map=${map.reverse().join(",")}`;

    const produtos = await buscarTodosProdutosCompatíveis(url);
    const produtoAtualId = skuJson?.productId || window.vtex?.product?.id;

    const encontrado = produtos.some(p => p.productId == produtoAtualId);

    if (encontrado) {
      EstilizarCardCompatibilidade(true, "sucesso");
    } else {
      EstilizarCardCompatibilidade(false, "erro");
    }
  } catch (error) {
    console.error("Erro ao verificar compatibilidade:", error);

    if (error.message.includes("Placa não encontrada")) {
      EstilizarCardCompatibilidade();
    } else {
      alert("Erro ao verificar compatibilidade. Tente novamente.");
    }
  } finally {
    spinner.classList.add('hidden');
  }
}

function EstilizarCardCompatibilidade(compativel, situacao) {
  resetarEstilosCompatibilidade();

  if (compativel && situacao === "sucesso") {
    aplicarEstadoCompatibilidade(estadoCompatSucesso());
  } else if (!compativel && situacao === "erro") {
    aplicarEstadoCompatibilidade(estadoCompatErro());
  } else {
    aplicarEstadoCompatibilidade(estadoCompatDesconhecido());
  }
}

function resetarEstilosCompatibilidade() {
  document.querySelector('#icon-verificar-compatibilidade-check').style.display = "none";
  document.querySelector('#icon-verificar-compatibilidade-xmark').style.display = "none";
  document.querySelector('#icon-question').style.display = "none";

  const botao = document.querySelector('#botaoVerificarCompatibilidade');
  botao.textContent = "Nova Consulta";
}

function aplicarEstadoCompatibilidade(estado) {
  const titulo = document.querySelector('.title-text');
  const descricao = document.querySelector('.compat-description');
  const card = document.querySelector('.compat-box');
  const input = document.querySelector('#placaInput');

  titulo.textContent = estado.titulo;
  titulo.style.color = estado.cor;
  descricao.textContent = estado.descricao;
  card.style.borderColor = estado.cor;
  input.style.borderColor = estado.cor;

  if (estado.icones.includes('check')) {
    const iconCheck = document.querySelector('#icon-verificar-compatibilidade-check');
    iconCheck.style.display = "block";
    iconCheck.style.color = estado.cor;
  }

  if (estado.icones.includes('xmark')) {
    document.querySelector('#icon-verificar-compatibilidade-xmark').style.display = "block";
  }

  if (estado.icones.includes('question')) {
    document.querySelector('#icon-question').style.display = "block";
  }
}

function estadoCompatSucesso() {
  return {
    titulo: "Produto compatível com seu veículo",
    cor: "#44C15D",
    descricao: "Se desejar, você pode verificar outra placa clicando em nova consulta.",
    icones: ['check']
  };
}

function estadoCompatErro() {
  return {
    titulo: "Produto incompatível com seu veículo",
    cor: "#d93025",
    descricao: "Você pode realizar uma nova busca ou verificar outra placa clicando em nova consulta.",
    icones: ['xmark']
  };
}

function estadoCompatDesconhecido() {
  return {
    titulo: "Não sabemos se é compatível",
    cor: "#C89C00",
    descricao: "Por favor, verifique a lista de veículos compatíveis para esse produto ou você pode realizar uma nova consulta.",
    icones: ['check', 'question']
  };
}

async function obterDadosDoVeiculoViaOlhoNoCarro(placa) {
  const urlApi = window.location.href.includes("hml")
    ? "https://api-hml.autoglass.com.br"
    : "https://api.autoglass.com.br";

  const response = await fetch(
    `${urlApi}/integracao-b2c/api/web-app/veiculos/${placa}/placas`
  );

  const veiculo = await response.json();

  if (veiculo?.Message?.includes("Placa é obrigatório")) {
    EstilizarCardCompatibilidade();
    throw new Error("Placa não encontrada");
  }

  const montadora = veiculo.Body.Data.Marca;
  const modelo = veiculo.Body.Data.Modelo;
  const anoModelo = veiculo.Body.Data.DadosBasicosDoVeiculo.AnoModelo;
  const fipe = veiculo.Body.Data.DadosBasicosDoVeiculo.InformacoesFipe[0]?.FipeId;

  const infoBuscaPlaca = [{
    montadora,
    modelo,
    anoModelo,
    fipe,
    timestamp: new Date().toLocaleString()
  }];

  localStorage.setItem("infoBuscaPLaca", JSON.stringify(infoBuscaPlaca));

  return { montadora, modelo, anoModelo, fipe };
}

async function encontrarDadosNoCadastroVtex({ filtro, regex }) {
  const responseVtex = await fetch(
    `${CONFIG.ORIGIN}/api/catalog_system/pub/specification/fieldValue/${filtro}`
  );

  const dadosVtex = await responseVtex.json();
  const dadosVtexFiltrados = dadosVtex.filter((item) =>
    regex.test(item.Value)
  );

  return dadosVtexFiltrados;
}

function obterRegexMontadoras(montadora) {
  return new RegExp(montadora.split(" ").join("|"), "gi");
}

function obterRegexModelos(montadora, modelo) {
  const montadoraTermos = montadora
    .split(" ")
    .filter((item) => new RegExp(/[^\W_]+/, "gi").test(item));

  const modeloSemMontadora = mapeiaModeloParaNomenclaturaVtex(
    modelo,
    montadoraTermos
  );
  const modeloSemMontadoraSanitizado = modeloSemMontadora.replace(
    /[\W]+/gi,
    ""
  );

  const patternMontadora = `(${montadoraTermos.join("|")})`;
  const patternModelo = `(${modeloSemMontadora}|${modeloSemMontadoraSanitizado})`;

  const pattern = `^${patternModelo}$|${patternMontadora} ${patternModelo}$`;

  return new RegExp(pattern, "gi");
}

function obterRegexAnos(anoModelo) {
  return new RegExp(anoModelo.trim(), "gi");
}

function obterRegexFipes(fipe) {
  const fipeFormatado = fipe.replace(/(\d+)(\d)$/, "0$1-$2");
  return new RegExp(fipeFormatado, "i");
}

function mapeiaModeloParaNomenclaturaVtex(modelo, montadoraTermos) {
  switch (true) {
    case "NEW CLASSIC" === modelo:
      return "CLASSIC";
    case "UP" === modelo:
    case "CROSS UP!" === modelo:
      return "Up!";
    case "FH 520" === modelo:
      return "FH 520";
    case new RegExp(/^FH (12 )?\d{3}$/i).test(modelo):
      return "FH 12 Globetroter";
    case new RegExp(/^FH 16 \d{3}$/i).test(modelo):
      return "FH 16 Globetroter";
    case new RegExp(/^NH 12 \d{3}$/i).test(modelo):
      return "NH 12";
    case new RegExp(/^NH 10 \d{3}$/i).test(modelo):
      return "NH 10";
    case "XC70" === modelo:
      return "S40";
    case "E-DELIVERY" === modelo:
      return "DELIVERY";
    case "POLO CLASSIC" === modelo:
      return "Polo Sedan";
    case "SS10" === modelo:
      return "S10";
    case "TTS" === modelo:
      return "TT";
    case new RegExp(/^[A-Z]-CLASS$/i).test(modelo):
      return "Classe " + modelo.replace(/-CLASS/gi, "");
    default:
      const modeloSemMontadoraTermos = modelo
        .replace(new RegExp(montadoraTermos.join(" "), "gi"), "")
        .trim();
      return modeloSemMontadoraTermos;
  }
}

async function buscarTodosProdutosCompatíveis(url) {
  const produtos = [];
  let from = 0;
  const pageSize = 50;

  while (true) {
    const to = from + pageSize - 1;
    const response = await fetch(`/api/catalog_system/pub/products/search${url}&_from=${from}&_to=${to}`);
    const pagina = await response.json();

    produtos.push(...pagina);

    if (pagina.length < pageSize) break;
    from += pageSize;
    if (from > 1000) break;
  }

  return produtos;
}