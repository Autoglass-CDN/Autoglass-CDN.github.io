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

  const storedValue = window.localStorage.getItem('buttonBuscarSelected');
  if (storedValue !== null) {
    window.buttonBuscarSelected = JSON.parse(storedValue);
  }

  if(window.buttonBuscarSelected){
    var divBusca = document.getElementById('div-busca');
    if (window.innerWidth <= 1000) {
        divBusca.style.display = "none";
    }
  }



	const resultBlock = document.querySelector('.prateleira.row.qd-xs');

	const mutation = new MutationObserver((m) => {
		AddToMiniCart()
	});

	mutation.observe(resultBlock, { childList: true, subtree: true });
});
