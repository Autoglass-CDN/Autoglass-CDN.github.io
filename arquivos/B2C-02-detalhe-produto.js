$(function () {
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
		$('.product-qd-v1-unavailable').show();

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

	$('#similars h2').after(`<p style="
		text-align: center;
		margin-top: -25px;
		margin-bottom: 10px;
		font-size: 18px;
	">Outras opções de <strong>${
		vtxctx.categoryName.toLowerCase()
	}</strong> para este mesmo veículo (<strong>${
		$('.value-field.Compatibilidade-Modelo').html()
	}</strong>)</p>`);
});

function consulteFrete() {
	let txtCep = document.getElementById("txtCep");
	txtCep.scrollIntoView({ behavior: "smooth", block: "center" });
	txtCep.focus();
	console.log(txtCep);
}
