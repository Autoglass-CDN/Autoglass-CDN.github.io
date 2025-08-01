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
					zE('webWidget', 'chat:send', `Olá, nosso horário de atendimento é de Seg-Sex de 08-18h, no momento estamos sem consultor disponível. Clique aqui e fale conosco pelo whatsapp: https://bit.ly/3hZB6js \nProduto de interesse: ${window.location.href}`);
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

			let modal = document.querySelector('#myModal');

			modal.style.display = 'block';

			vtexjs.catalog.getCurrentProductWithVariations().done(function (product) {
				window.dataLayer.push({
					'event': 'sem_estoque_redirecionamento'
				  });

				window
					.location
					.replace(
						$("#similars .qd-product-is-in-stock-true a.shelf-qd-v1-stamps")[0]
							.href
						+ '#redirecionamento=produtoindisponivel&produto='
						+ product.productId);
			});


		}


		ga("send", "event", "estoque", "detalhe-produto", "indisponivel");
	} else {
		ga("send", "event", "estoque", "detalhe-produto", "disponivel");
	}

	$('#instalar-na-loja-btn').click(e => localStorage.setItem('AG_SeletedChannel', 'pickup-in-point'));
	$('#retire-na-loja-btn').click(e => localStorage.setItem('AG_SeletedChannel', 'pickup-in-point'));

	$('#instalar-em-casa-btn').click(e => localStorage.setItem('AG_SeletedChannel', 'delivery'));
	$('#receba-em-casa-btn').click(e => localStorage.setItem('AG_SeletedChannel', 'delivery'));

	setTimeout(function () {
		$("#txtCep").after('<span class="ttp"></span>');
	}, 500);

	$('#similars h2').after(`<p class="descricao-rollout">Confira opções de <strong>${vtxctx.categoryName.toLowerCase()
		}</strong> para este mesmo veículo ${$('.value-field.Compatibilidade-Modelo').length ? `(<strong>${$('.value-field.Compatibilidade-Modelo').html()
			}</strong>)` : $('.value-field.Veiculo').length ? `(<strong>${$('.value-field.Veiculo').html()
				}</strong>)` : ``}</p>`);

	$('#sugestoes h2').after(
		`<p class="descricao-rollout">
			Aproveite e confira outros produtos
			${$('.value-field.Compatibilidade-Modelo').length
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
  exibirComponenteEstoque();
});

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }

  console.error("Não foi possível recuprar cookie VTEXSC'\n");
  return null;
}

const dockMap = {
  "2": "MG74", "3": "PG07", "4": "MG24", "5": "MG50", "6": "MG48",
  "7": "MG25", "8": "MG03", "9": "MG36", "10": "MG60", "11": "MG21",
  "12": "MG72", "13": "MG59", "14": "MG43", "15": "MG40", "16": "MG40",
  "17": "MG40", "18": "MG33", "19": "MG63", "20": "MG63", "21": "MG42",
  "22": "MG29", "23": "MG82", "24": "MG64", "25": "MG07", "26": "SP04",
  "27": "SP04", "28": "SP04", "29": "SP04", "30": "SP04", "31": "SP04",
  "32": "SP04", "33": "SP04", "34": "SP04", "35": "SP04", "36": "SP04",
  "37": "SP04", "38": "SP04", "39": "MG56"
};

const urlEstoquesApi = window.location.href.includes("hml") || window.location.href.includes("dev")
        ? "https://api-hml.autoglass.com.br/integracao-b2c/api/web-app/estoques/"
        : "https://api.autoglass.com.br/integracao-b2c/api/web-app/estoques/";


function getSkuId() {
  return window.skuJson?.skus?.[0]?.sku || null;
}

function getSalesChannel() {
  return readCookie("VTEXSC").replace("sc=", "");
}

function getDockId(salesChannel) {
  return dockMap[salesChannel] || null;
}

async function fetchEstoque(skuId, dockId) {
  const url = `${urlEstoquesApi}docas?skuId=${skuId}&dockId=${dockId}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Erro ao consultar estoque.");
  const quantidade = await response.json();
  return Number(quantidade);
}

function mostrarAviso() {
  const divAviso = document.querySelector(".alerta-container");
  divAviso.style.display = "inline-flex";
}

async function exibirComponenteEstoque(){
  try {
    const skuId = getSkuId();
    const salesChannel = getSalesChannel();
    const dockId = getDockId(salesChannel);

    if (!skuId || !dockId) {
      console.warn("SKU ID ou Dock ID ausente.");
      return;
    }

    const quantidade = await fetchEstoque(skuId, dockId);

    if (quantidade > 0 && quantidade <= 5) {
      mostrarAviso();
    }
  } catch (error) {
    console.error("Erro na verificação de estoque:", error);
  }
}

function consulteFrete() {
	let txtCep = document.getElementById("txtCep");
	txtCep.scrollIntoView({ behavior: "smooth", block: "center" });
	txtCep.focus();
	console.log(txtCep);
}

$(function LojasMaisProximas() {
	let SLA = [];

	const CONFIG = {
		SERVICE: {
			COUNTRY: 'BRA',
			SKU_ID: vtxctx.skus
		},
		CSS: {
			BASE: '.mz-modal-pickup',
			MODAL_LIST: '.mz-pickup-stores__list ul'
		}
	}

	const View = ViewAPI();
	const Service = ServiceAPI();
	const Controller = ControllerAPI();

	Controller._init();

	function ControllerAPI() {
		return {
			_init,
			simulateShipping
		}

		function _init() {
			const address = JSON.parse(localStorage.getItem('AG_AddressSelected'));

			if (address) {
				simulateShipping(address);
			} else {
				// Evento lançado pelo componente de cep
				$(window).on('cep-finish-load', e => {
					const orderForm = e.originalEvent.detail;
					simulateShipping(orderForm.shippingData.address);
				});
			}

			// Evento lançado pelo componente de cep
			$(window).on('cep-updated', e => {
				const orderForm = e.originalEvent.detail;
				console.log(orderForm.shippingData.address)
				simulateShipping(orderForm.shippingData.address);
			})
		}

		async function simulateShipping(address) {
			if (address) {
				let shippingData = await Service.simulateShipping(address);

				SLA = shippingData
					.logisticsInfo[0]
					.slas
					.filter(x => x.deliveryChannel === 'pickup-in-point');

				View.buildListStore(SLA);
				View.addClicks();
			}
		}
	}

	function ViewAPI() {
		return {
			buildListStore,
			addClicks
		}

		function buildListStore(pickups) {
			let html = '';

			if (pickups.length) {
				$('.without-store').hide();
				pickups.forEach(({ id, shippingEstimate, pickupDistance, pickupStoreInfo }) => {
					html += `
						<li id="${id}" class="pickup">
							<div class="pickup__info">
								<div class="pickup__info-distance">
									<svg class="pkpmodal-pickup-point-best-marker-image" width="25" height="32" viewBox="0 0 25 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.4917 22.3169L19.4918 22.3169L19.4967 22.3096C19.5843 22.1782 19.6709 22.0485 19.7564 21.9204C22.0478 18.4883 23.5645 16.2165 23.5645 12.5323C23.5645 6.16317 18.4013 1 12.0323 1C5.66317 1 0.5 6.16317 0.5 12.5323C0.5 16.5417 3.05396 20.5158 5.20313 23.2599C6.56216 24.9952 9.21424 28.1986 11.703 30.3763L12.0323 30.6644L12.3615 30.3763C14.8402 28.2075 16.7075 26.3386 19.4917 22.3169Z" fill="#2D78F6" stroke="white"></path><path d="M18.6968 9.73418L14.6509 9.14642L12.8407 5.48019C12.5239 4.83994 11.4759 4.83994 11.159 5.48019L9.3498 9.14642L5.30298 9.73418C4.53711 9.84573 4.22682 10.7906 4.78365 11.3344L7.71213 14.1878L7.02126 18.2178C6.89096 18.9808 7.69338 19.5667 8.38145 19.2058L11.9999 17.3038L15.6192 19.2068C16.3017 19.5639 17.1107 18.9874 16.9794 18.2187L16.2885 14.1888L19.217 11.3353C19.7729 10.7906 19.4626 9.84573 18.6968 9.73418Z" fill="white"></path></svg>
									<p>${pickupDistance.toFixed(1)} km</p>
								</div>
								<div class="pickup__info-address">
									<div class="address-title">
										<b>${pickupStoreInfo.friendlyName}</b>
									</div>
									<p class="address-location">
										${pickupStoreInfo.address.street} ${pickupStoreInfo.address.number},
										${pickupStoreInfo.address.complement}
									</p>
									<p class="pickup__info-city">${pickupStoreInfo.address.neighborhood} - ${pickupStoreInfo.address.city} - ${pickupStoreInfo.address.state}</p>
								</div>
							</div>
							<div class="pickup__estimate">
								<span>Grátis</span>
								<span>Pronto em até ${Service.calculateTimeEstimate(shippingEstimate)}</span>
							</div>
						</li>
						`;
				})
			} else {
				$('.without-store').show();
				html += '<span><a onclick="$zopim.livechat.window.show()">Clique aqui</a> e fale com a gente pelo chat!</span>';
			}

			$(CONFIG.CSS.MODAL_LIST).html(html)
		}

		function addClicks() {
			$('.pickup').click(function () {
				$('.pickup').removeClass('selected');
				$(this).addClass('selected');

				Service.saveSelectedPickupPoint($(this).attr('id'));
			});
		}
	}

	function ServiceAPI() {
		return {
			simulateShipping,
			calculateTimeEstimate,
			saveSelectedPickupPoint,
			sendCalculateShipping
		}

		function calculateTimeEstimate(estimate) {
			const match = estimate.match(/\d+/);
			const days =  +match[0];

			return days + (days > 0 ? ' dias úteis' : ' dia útil');
		}

		async function simulateShipping(address) {
			const request = {
				items: [{
					id: CONFIG.SERVICE.SKU_ID,
					quantity: 1,
					seller: 1
				}],
				postalCode: address.postalCode,
				country: CONFIG.SERVICE.COUNTRY
			};

			return $.ajax({
				url: "/api/checkout/pub/orderForms/simulation",
				type: "POST",
				dataType: "JSON",
				contentType: "application/json",
				data: JSON.stringify(request)
			});
		}

		function saveSelectedPickupPoint(id) {
			const sla = SLA.find(x => x.id === id);

			localStorage.setItem('AG_SeletedPickupPoint', JSON.stringify(sla));
			sendCalculateShipping(sla.pickupStoreInfo.address.postalCode, 'search');
		}

		function sendCalculateShipping(cep, type) {
			$('.mz-pickup__button--buy').click(e => e.preventDefault());

			vtexjs.checkout.calculateShipping({
				postalCode: cep,
				country: 'BRA',
				addressType: type
			}).then(order => { forceChangeShipping(order); $('.mz-pickup__button--buy').unbind('click'); });
		}

		function forceChangeShipping(orderForm) {
			const newSelectedAddresses = [orderForm.shippingData.availableAddresses[orderForm.shippingData.availableAddresses.length - 1]];
			const logistic = orderForm.shippingData.logisticsInfo[0];

			if (logistic) {
				const slas = logistic.slas.filter(x => x.deliveryChannel === 'pickup-in-point');
				const logisticsInfo = orderForm.shippingData.logisticsInfo.map(x => {
					return {
						addressId: newSelectedAddresses[0].addressId,
						itemIndex: x.itemIndex,
						selectedDeliveryChannel: 'pickup-in-point',
						selectedSla: slas[0].id
					}
				});

				fetch(`/api/checkout/pub/orderForm/${orderForm.orderFormId}/attachments/shippingData`, {
					method: 'post',
					body: JSON.stringify({
						clearAddressIfPostalCodeNotFound: false,
						expectedOrderFormSections: ['shippingData'],
						selectedAddresses: newSelectedAddresses,
						logisticsInfo
					})
				}).then(res => res.json()).then(x => {
					vtexjs.checkout.sendAttachment('shippingData', {
						selectedAddresses: newSelectedAddresses,
						logisticsInfo
					});
				});
			}
		}
	}
});

$(function CalculeOFrete() {
	let SLA = [];

	const CONFIG = {
		SERVICE: {
			COUNTRY: 'BRA',
			SKU_ID: vtxctx.skus
		},
		CONTROLS: {
			IGNORE_DELIVERY: 'Autoglass Móvel',
			SELECTED: 'selected',
		},
		CSS: {
			OPEN: '.link.cep',
			MODAL: {
				BASE: 'mz-modal-shipping',
				BODY: 'mz-bo-on mz-sf-on',
				OVERLAY: '.mz-modal-overlay',
				CLOSE: '.mz-shipping__close--button',
				BUTTON: '.mz-shipping__button--buy',
				TITLE: {
					ENABLE: '.mz-content__title--enable',
					EMPTY: '.mz-content__title--empty',
				},
				CONTENT: '.mz-shipping__content',
				LIST: '.mz-shipping__list ul',
			}
		}
	}

	const View = ViewAPI();
	const Controller = ControllerAPI();
	const Service = ServiceAPI();

	Controller._init();

	function ControllerAPI() {
		return {
			_init,
			searchDeliverys
		}

		function _init() {
			View._init();

			const address = JSON.parse(localStorage.getItem('AG_AddressSelected'));

			if (address) {
				searchDeliverys(address.postalCode);
			} else {
				// Evento lançado pelo componente de cep
				$(window).on('cep-finish-load', e => {
					const orderForm = e.originalEvent.detail;
					searchDeliverys(orderForm.shippingData.address.postalCode);
				});
			}

			// Evento lançado pelo componente de cep
			$(window).on('cep-updated', e => {
				const orderForm = e.originalEvent.detail;
				searchDeliverys(orderForm.shippingData.address.postalCode);
			})
		}

		async function searchDeliverys(address) {
			const { logisticsInfo } = await Service.simulateShipping({ postalCode: address });

			SLA = logisticsInfo[0].slas
				.filter(x => x.deliveryChannel === 'delivery');

			const [cheapestOption, fastestOption] = SLA;

			let cEstimate, fEstimate;

			if (fastestOption) {
				cEstimate = Service.getEstimateDays(cheapestOption.shippingEstimate);
				fEstimate = Service.getEstimateDays(fastestOption.shippingEstimate);
			}

			if (fastestOption && (fEstimate < cEstimate)) {
				fastestOption.name = 'Mais rápida';
				cheapestOption.name = 'Mais econômica';

				View.buildListDelivery([cheapestOption, fastestOption]);
			} else if (cheapestOption) {
				cheapestOption.name = 'Melhor opção';
				View.buildListDelivery([cheapestOption]);
			} else {
				View.buildListDelivery([]);
			}
		}
	}

	function ViewAPI() {
		return {
			_init,
			buildListDelivery
		}

		function _init() {
			$(CONFIG.CSS.MODAL.CONTENT).hide();
			addClicks();
		}

		function addClicks() {
			$(CONFIG.CSS.OPEN).click(() => {
				$(document.body).addClass(CONFIG.CSS.MODAL.BODY);
			});

			$(CONFIG.CSS.MODAL.CLOSE).click(() => {
				$(document.body).removeClass(CONFIG.CSS.MODAL.BODY);
			});

			$(CONFIG.CSS.MODAL.OVERLAY).click(() => {
				$(document.body).removeClass(CONFIG.CSS.MODAL.BODY);
			});

			$(CONFIG.CSS.MODAL.BUTTON).click(() => {
				var urlCart = "/checkout/cart/add?sku=" + vtxctx.skus + "&qty=1&seller=1&redirect=true&sc=1";
				$(CONFIG.CSS.MODAL.BUTTON).attr("href", urlCart);
			});
		}

		function buildListDelivery(deliverys) {
			let html = '';

			if (deliverys.length) {
				deliverys.forEach(({ id, name, price, shippingEstimate }) => {
					html += `
						<li id="${id}" class="shipping">
							<div class="shipping__name">
								<b>${name}</b>
							</div>
							<div class="shipping__estimate">
								<p>Entregue em até ${Service.formatEstimate(shippingEstimate)}</p>
							</div>
							<div class="shipping__price">
								<p><b>${Service.formatPrice(price)}</b></p>
							</div>
						</li>
					`;
				});

				$(CONFIG.CSS.MODAL.TITLE.ENABLE).show();
				$(CONFIG.CSS.MODAL.TITLE.EMPTY).hide();
			} else {
				$(CONFIG.CSS.MODAL.TITLE.ENABLE).hide();
				$(CONFIG.CSS.MODAL.TITLE.EMPTY).show();
			}

			if (deliverys.length > 1) {
				html += `
					<div style="text-align: center;margin-top: 20px;">
						<b>Selecione a opção desejada no carrinho.</b>
					</div>
				`;
			}

			$(CONFIG.CSS.MODAL.LIST).html(html);
			$(CONFIG.CSS.MODAL.CONTENT).show();
		}
	}

	function ServiceAPI() {
		return {
			simulateShipping,
			formatPrice,
			formatEstimate,
			saveSelectedDelivery,
			getEstimateDays
		}

		function formatPrice(price) {
			let value = 'R$ ';

			if (price === 0) return 'Grátis';

			price = price + "";
			const [decimal] = price.match(/\w{2}$/);

			value += price.slice(0, price.length - 2);
			value += ',';
			value += decimal;

			return value;
		}

		function getEstimateDays(estimate) {
			if (estimate) {
				const match = estimate.match(/\d+/);

				return +match[0];
			}
		}

		function formatEstimate(estimate) {
			const [days] = estimate.match(/\d+/);

			let res = days;

			if (days > 1)
				res += ' dias úteis'
			else
				res += ' dia útil'

			return res;
		}

		function saveSelectedDelivery(id) {
			const selectedSLA = SLA.find(x => x.id === id);

			localStorage.setItem('AG_SeletedDelivery', JSON.stringify(selectedSLA));
		}

		async function simulateShipping(address) {
			const request = {
				items: [{
					id: CONFIG.SERVICE.SKU_ID,
					quantity: 1,
					seller: 1
				}],
				postalCode: address.postalCode,
				country: CONFIG.SERVICE.COUNTRY
			};

			return $.ajax({
				url: "/api/checkout/pub/orderForms/simulation",
				type: "POST",
				dataType: "JSON",
				contentType: "application/json",
				data: JSON.stringify(request)
			});
		}
	}
});
