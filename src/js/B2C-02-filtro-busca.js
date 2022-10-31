$(function () {
	/**
	 * TODO: Remover esses parametro daqui, quando a garantia da Maeztra acabar.
	 * Essa função corrige a aparição do filtro na tela pesquisa.
	 */
	$.QD_scrollToggle('570, 770');

	/**
	 * Atributo 'data-qd-class' é o identificador do filtro.
	 * Para adicionar o componente em outro filtro, é só adicionar o seu atributo neste vetor.
	 */
	const dataQdClasses = [
		"veiculo",
		"ano",
		"marca",
		"compatibilidade-modelo",
		"compatibilidade-montadora",
		"posicao-da-peca",
		"cor",
		"faixa",
	];

	dataQdClasses.forEach(function (dataQdClass) {
		$(`fieldset[data-qd-class="${dataQdClass}"] > div`).prepend(
			`<div class="filtro">
		  <input
			class="filtro-busca"
			type="search"
			autocomplete="off"
			autocorrect="off"
			autocapitalize="none"
			spellcheck="false"
			role="textbox"
			placeholder="Digite para filtrar..." />
		</div>`
		);

		$(
			//aplica filtro ao digitar na caixa de texto
			`fieldset[data-qd-class="${dataQdClass}"] > div > div.filtro > input.filtro-busca`
		).on("input", function () {
			let inputValue = this.value.toLowerCase();

			$(`fieldset[data-qd-class="${dataQdClass}"] > div > label`).each(
				function (index) {
					if (!$(this).text().toLowerCase().includes(inputValue)) {
						$(this).hide();
					} else {
						$(this).show();
					}
				}
			);
		});
	});
	
	const elementoHtml = document.querySelector('.search-qd-v1-navigator fieldset.filtro_compatibilidade-montadora h5');
	if(elementoHtml !== null) elementoHtml.innerHTML = elementoHtml.textContent.replace('Compatibilidade ', '');
	
	const classeElementoPai = '.search-qd-v1-navigator fieldset.refino';
	const labelInputCheck = classeElementoPai + ' label';
	const elementosPai = document.querySelectorAll(classeElementoPai);
	let arrayOpcoesFiltro = [];
	let filtrosExistentes = [];
	
	function nomeItemMontadora(pai, remover) {
		if(remover)
			return (pai == 'compatibilidade-montadora') ? pai.replace('compatibilidade-','') : pai;
		return (pai == 'montadora') ? 'compatibilidade-montadora' : pai;
	}

	// Cria array com os nomes dos filtros existentes
	for (let i=0; i<elementosPai.length; i++) {
		let nomeFiltro = nomeItemMontadora($(elementosPai[i]).attr('data-qd-class'), true);
		arrayOpcoesFiltro[nomeFiltro] = [];
		filtrosExistentes.push(nomeFiltro);
		
		// Existindo ano, necessariamente existe registro dos demais itens do menu
		if(localStorage.getItem('ano')) {
			arrayOpcoesFiltro[nomeFiltro] = JSON.parse(localStorage.getItem(nomeFiltro));
			ativaAba(nomeFiltro);
			adicionaClasseSelected(arrayOpcoesFiltro[nomeFiltro], nomeFiltro);
			// console.log(nomeFiltro + ' valores : ' + JSON.parse(localStorage.getItem(nomeFiltro)));
		}
	}
	
	function ativaAba(elementoPai) {
		elementoPai = nomeItemMontadora(elementoPai, false);
		$(`${classeElementoPai}.filtro_${elementoPai} h5`).addClass('qd-seach-active-menu');
	}
	
	function adicionaClasseSelected(listaDePreSelecionados, elementoPai) {
		elementoPai = nomeItemMontadora(elementoPai, false);
		listaDePreSelecionados.forEach(elemento => {
			// console.log(elementoPai + ' => ' + elemento);
			$(`${classeElementoPai}[data-qd-class="${elementoPai}"]`).addClass('qd-sr-filtered');
			$(`${classeElementoPai}[data-qd-class="${elementoPai}"] h5+div`).css({'overflow' : 'hidden', 'display' : 'block'});
			$(`${classeElementoPai}[data-qd-class="${elementoPai}"] label.${elemento}`).addClass('sr_selected');
			$(`${classeElementoPai}[data-qd-class="${elementoPai}"] label.${elemento}>input`).addClass('qd_sr_selected');
			insereIconeDeFiltro(elemento, elementoPai);
		});
	}
	
	function insereIconeDeFiltro(elemento, elementoPai) {
		elementoPai = nomeItemMontadora(elementoPai, false);
		let conteudo = $(`${classeElementoPai}[data-qd-class="${elementoPai}"] label.${elemento}`).text().trim();
		let itemFiltered = $("<div class='block-iltered'><span class='filtered'>" + conteudo + "</span></div>");
		itemFiltered.attr("data-name", conteudo);
		$(".search-qd-v1-navigator-research-filtered").append(itemFiltered);
	}
	
	salvaLocalStorage(filtrosExistentes, 'filtros');
	
	$(classeElementoPai + ' > div > label input').on('click', function () {
		let paiElementoClicado = nomeItemMontadora($(this).closest('[data-qd-class]').data('qd-class'), true);
		let classeItemClicado = $(this).closest('label').attr('class');
		let classes = classeItemClicado.split(' ');
		
		// Se existir mais de uma classe, pega a primeira
		classeItemClicado = (classes.length > 1) ? classes[0] : classeItemClicado;
		
		if(arrayOpcoesFiltro[paiElementoClicado].includes(classeItemClicado)) {
			arrayOpcoesFiltro[paiElementoClicado] = removeItemClicado(arrayOpcoesFiltro[paiElementoClicado], classeItemClicado);
		}
		else
		{
			arrayOpcoesFiltro[paiElementoClicado] = adicionaItemClicado(arrayOpcoesFiltro[paiElementoClicado], classeItemClicado);
		}
		
		preparaSalvarLocalStorage(arrayOpcoesFiltro);
		// console.log(arrayOpcoesFiltro);
		// console.log('localStorage Ano: ' + JSON.parse(localStorage.getItem('ano')));
		// console.log('localStorage Veículo: ' + JSON.parse(localStorage.getItem('veiculo')));
		// console.log('localStorage Montadora: ' + JSON.parse(localStorage.getItem('montadora')));
	});
	
	function removeItemClicado(itens, itemClicado) {
		return itens.filter(function(value) { 
			return value != itemClicado;
		});
	}
	
	function adicionaItemClicado(itens, itemClicado) {
		itens.push(itemClicado);
		return itens;
	}

	function salvaLocalStorage(dados, nome) {
		localStorage.setItem(nome, JSON.stringify(dados));
	}
	
	function preparaSalvarLocalStorage(dados) {
		for(cont=0; cont<filtrosExistentes.length; cont++) {
			let nomeFiltro = filtrosExistentes[cont];
			salvaLocalStorage(dados[nomeFiltro], nomeFiltro);
		}
	}
});

/**
 * Função necessária para adicionar o evento de cliqui de adição no carrinho
 * Executar toda vez que um filtro for aplicado ou página trocada
 */
$(document).ready(() => {
	function AddToMiniCart() {
		var a, b, c, d;
		a = 27,
			c = function () {
				var a, b;
				return b = '<div class="boxPopUp2-overlay boxPopUp2-clickActive" style="display: none;"></div>',
					(a = $(".boxPopUp2-overlay")).length > 0 ? a : $(b)
			}
			,
			d = function (b) {
				var d, e, f, g, h, i;
				return i = $(this).data("template"),
					f = '<div class="boxPopUp2 vtexsm-popupContent freeContentMain popupOpened sku-selector" style="position: fixed;">\n	<div class="boxPopUp2-wrap">\n		<div class="boxPopUp2-content vtexsm-popupContent freeContentPopup" style="position: fixed;">\n			<div class="skuWrap_ freeContent vtexsc-selectSku">\n				Carregando...\n			</div>\n		</div>\n	</div>\n</div>',
					e = c(),
					d = $(f),
					e.appendTo($("body")).fadeIn(),
					d.appendTo($("body")).fadeIn(),
					g = function () {
						return e.fadeOut(),
							d.remove(),
							$(document).off("click", g)
					}
					,
					h = function (b) {
						return b.keyCode === a ? (g(),
							$(document).off("keyup", h)) : void 0
					}
					,
					e.on("click", g),
					$(document).on("keyup", h),
					$(window).on("vtex.modal.hide", g),
					$(window).on("modalHide.vtex", g),
					$.get(i).done(function (a) {
						return d.find(".skuWrap_").html($(a.trim()))
					})
			}
			,
			b = function () {
				return $(".to-bind-modal").each(function () {
					return $(this).removeClass("to-bind-modal").on("click", d)
				})
			}
			,
			$(document).ready(b),
			$(document).on("ajaxComplete", b)
	}


	const resultBlock = document.querySelector('.prateleira.row.qd-xs');

	const mutation = new MutationObserver((m) => {
		AddToMiniCart()
	});

	mutation.observe(resultBlock, { childList: true, subtree: true });
});
