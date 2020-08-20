$(function () {//
	let acessorio = document.querySelector(".mz-accesories__button--buy");

	if (acessorio) {
		$(".product-qd-v1-standard .buy-button").addClass("secondary");
	}

	let skuList = Product.captureSkuSelectors();
	var urlCart =
		"/checkout/cart/add?sku=" +
		skuList[0] +
		"&qty=1&seller=1&redirect=true&sc=1";
	$(".mz-pickup__button--buy").attr("href", urlCart);
	$(".mz-pickup__button--buy").removeClass("lock-button"); //lock-button

	$(".link.lojas").click(function (e) {
		e.preventDefault();
		$(document.body).addClass("mz-pu-on");
		$(document.body).addClass("mz-bo-on");
	});
	$(".mz-pickup__close--button,.mz-modal-overlay").click(function () {
		$(document.body).removeClass("mz-in-on mz-as-on mz-bo-on mz-pu-on");
	});

	ga('create', 'UA-133498560-1', 'autoglassonline.com');
	if ($(".product-qd-v1-price").is(":empty")) {
		/*
		  Se o produto está indisponível, oculta boxes de preço e entrega
		*/
		$(
			".product-qd-v1-standard.row .header, .product-qd-v1-sku-selection, .product-qd-v1-price, .product-qd-v1-shipping"
		).hide();

		//Exibe o botão para o cliente conversar com o vendedor pelo Chat
		$('.product-unavailable')
			.on('click', (e) => {
				e.preventDefault();

				const today = new Date();
				const hour = today.getHours();
				const day = today.getDay();

				if ((day === 0 || day === 6) //É Domingo ou Sábado?
					|| (hour < 8 || hour >= 18) //Esta fora do horario de trabalho?
				) {
					zE('webWidget', 'chat:addTags', 'fora-expediente');
					zE('webWidget', 'chat:send', `Olá, nosso horário de atendimento é de Seg-Sex de 08-18h, no momento estamos sem consultor disponível. Por favor, informe seu Nome e Celular que entraremos em contato o mais breve possível. Produto para consulta: ${window.location.href}`);
				} else {
					zE('webWidget', 'chat:send', `Olá, tenho interesse neste produto, mas está indisponível no site: ${window.location.href}`);
				}

				zE('webWidget', 'open');
			});

		$('.talk-to-seller').show();

		if (!$("#similars").is(":empty")) {
			$(".other-brands").show();
			$(".other-brands button").click(e => {
				e.preventDefault();
				if ($(window).width() > 900) {
					$("html, body").stop().animate({
						scrollTop: $("#similars").offset().top - 300
					}, 900, "swing")
				} else {
					$("html, body").stop().animate({
						scrollTop: $("#similars").offset().top - 170
					}, 900, "swing")
				}
			});

			$(".product-unavailable").addClass("buy-button other-brands secondary");
		}

		ga("send", "event", "estoque", "detalhe-produto", "indisponivel");
	} else {
		ga("send", "event", "estoque", "detalhe-produto", "disponivel");
	}

	setTimeout(function () {
		$("#txtCep").after('<span class="ttp"></span>');

		$(".link.cep").click(function (e) {
			e.preventDefault();
			let pixelsToScroll = $(window).width() > 900 ? 300 : 170;

			$("html, body")
				.stop()
				.animate(
					{
						scrollTop: $("#txtCep").offset().top - pixelsToScroll,
					},
					900,
					"swing"
				);

			$("#txtCep").focus();
		});
	}, 500);

	$('#similars h2').after(`<p class="descricao-rollout">Confira opções de <strong>${
		vtxctx.categoryName.toLowerCase()
		}</strong> para este mesmo veículo ${$('.value-field.Compatibilidade-Modelo').length ? `(<strong>${
			$('.value-field.Compatibilidade-Modelo').html()
			}</strong>)` : $('.value-field.Veiculo').length ? `(<strong>${
				$('.value-field.Veiculo').html()
				}</strong>)` : ``}</p>`);

	$('#sugestoes h2').after(
		`<p class="descricao-rollout">
			Aproveite e confira outros produtos
			${
		$('.value-field.Compatibilidade-Modelo').length
			? ` para <strong>${$('.value-field.Compatibilidade-Modelo').html()}</strong>`
			: $('.value-field.Veiculo').length
				? ` para <strong>${$('.value-field.Veiculo').html()}</strong>`
				: ``
		}
		</p>`
	);

	$(window).load(() => {
		const shippingsDiv = document.querySelector('.freight-values');
		const observerShippingsDiv = new MutationObserver(() => {
			const textCepInput = document.querySelector('#txtCep');

			const gaFreight = [];

			const freights = [...shippingsDiv.querySelectorAll('td')]
				.filter(x => !(x.innerText.includes('Frete Grátis') || x.innerText == "" || x.innerText.startsWith('R$')))
				.map(x => x.innerText);

			freights.forEach(x => {
				const freight = x.split(',')[0];

				if (freight.startsWith('Frete Retirada') && !gaFreight.includes('Retirada em Loja'))
					gaFreight.push('Retirada em Loja');

				if (freight.startsWith('Frete Autoglass Express'))
					gaFreight.push('Autoglass Express');

				if (freight.startsWith('Frete PAC'))
					gaFreight.push('PAC');

				if (freight.startsWith('Frete Sedex'))
					gaFreight.push('Sedex');

				if (freight.startsWith('Frete Transportadora'))
					gaFreight.push('Transportadora');

				if (freight.startsWith('Frete Normal'))
					gaFreight.push('Normal');
			});

			gaFreight.length > 0
				? ga('send', 'event', 'busca-ceps', 'encontrado', textCepInput.value + ',' + gaFreight.join(','))
				: ga('send', 'event', 'busca-ceps', 'nao-encontrado', textCepInput.value);

		});

		shippingsDiv && observerShippingsDiv.observe(shippingsDiv, { attributes: true, childList: true, subtree: true });
	});
});

function consulteFrete() {
	let txtCep = document.getElementById("txtCep");
	txtCep.scrollIntoView({ behavior: "smooth", block: "center" });
	txtCep.focus();
	console.log(txtCep);
}