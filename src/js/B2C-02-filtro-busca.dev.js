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
	]; ''

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
			var inputValue = this.value.toLowerCase();

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
	// Expõe as opções com filtro logo no carregamento do componente
	$(
		`fieldset[data-qd-class="veiculo"] > h5, fieldset[data-qd-class="ano"] > h5`
	).click();
});
