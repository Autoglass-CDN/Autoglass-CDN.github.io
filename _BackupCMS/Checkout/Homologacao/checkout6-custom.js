// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE. THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.

/*<!-- Facebook Pixel Code -->*/
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '674711539752032');
fbq('track', 'PageView');

/**
* Configurações de instalação
*/

const CONFIG = {
    GA: {
        ID: 'UA-133498560-1',
        URL: 'autoglassonline.com',
        FREIGHT: {
            EVENT_NAME: 'busca-ceps',
            VALUES: {
                FOUND: 'encontrado',
                NOT_FOUND: 'nao-encontrado'
            }
        }
    },
    EVENTS: {
        ORDER_FORM_UPDATE: 'orderFormUpdated.vtex',
        HASH_CHANGE: 'hashchange'
    },
    CONTROLS: {
        ID_SELLER: 1,
        BRAND_ID: ""
    },
    CSS: {
        INSTALACAO: 'instalacao',
    },
    STORAGE: {
        CHANNEL: 'AG_SeletedChannel',
        DAY_SM: 'AG_SelectedDaySM',
        APPOINTMENT: 'AG_SelectedHour'
    }
}

$(window).on('load', () => {
    const Controller = ControllerAPI();
    const Service = ServiceAPI();
    const View = ViewAPI();

    View._init();

    Controller._init();
    Controller.loadScripts();

    function ControllerAPI() {
        return {
            _init,
            loadScripts,
            recuperarInfoAcessorio
        }

        async function _init() {
            $(window).on(CONFIG.EVENTS.HASH_CHANGE, _watchHashChange);

            const orderForm = vtexjs.checkout.orderForm || await Service.getOrderForm();

            CONFIG.CONTROLS.BRAND_ID = await recuperarInfoAcessorio(orderForm, 'brandId');

  			await recuperarInfoAcessorio(orderForm, 'brandId');

  			await recuperarInfoAcessorio(orderForm, 'items[0].itemId');

            await _createInstallButtonObserver(orderForm);

            View.windshieldVerification(orderForm);

            View.formatItemList(orderForm);

            _removePaymentPickupIfIsDelivery(orderForm);

            ga('create', CONFIG.GA.ID, CONFIG.GA.URL);

            $(window).on(
                CONFIG.EVENTS.ORDER_FORM_UPDATE + ' ' + CONFIG.EVENTS.HASH_CHANGE,
                _watchHashChangeAndOrderForm
            )
        }

            async function recuperarInfoAcessorio(orderForm, property) {
                for (const item of orderForm.items) {
                    const accessories = await Service.getAccessories(item);
                    const accessory = accessories.find(accessory => !!accessory);

                    if (accessory) {
                        return accessory[property];
                    }
                }
        }


        async function _createInstallButtonObserver(orderForm) {
            const instalationSku = await recuperarInfoAcessorio(orderForm, 'items[0].itemId');
            const itemsObserver = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if(mutation.removedNodes[0] instanceof HTMLElement) {
                        if (!!mutation.removedNodes[0].querySelector('.product-name')?.querySelector('.btn-add-instalacao') || (mutation.removedNodes[0].dataset.sku == instalationSku)) {
                            const orderForm = vtexjs.checkout.orderForm;
                            View.formatItemList(orderForm);
                        }
                    }
                })
            });

            const tabelCartItemsObserver = document.querySelectorAll(".table.cart-items");

            tabelCartItemsObserver.forEach((element) => {
                itemsObserver.observe(element, {
                    subtree: true,
                    childList: true,
                });
            });
        }


        function _watchHashChangeAndOrderForm(_, orderForm) {
            orderForm && Service.sendGAEvent(orderForm);

            setTimeout(function tryToFormat() {
                if ($(".srp-toggle__pickup").length !== 0) {
                    const seletedChannel = Service.getSelectedChannel();
                    if (seletedChannel) {
                        localStorage.removeItem(CONFIG.STORAGE.CHANNEL);
                    }

                    if (orderForm) {
                        View.formatItemList(orderForm);
                        View.createCepInfo(orderForm);
                    }
                } else {
                    setTimeout(tryToFormat, 500);
                }
            }, 500);
        }

        async function _watchHashChange() {
            const orderForm = vtexjs.checkout.orderForm;

            _removePaymentPickupIfIsDelivery(orderForm);

            if (window.location.hash.includes('payment')) {
                 _formatLabelOnPayment(orderForm)
            }

            if (window.location.hash.includes('profile') && $('#opt-in-adulthood').length === 0) {

                function removePropNewsletter() {
                    $('#opt-in-newsletter').removeProp('disabled');
                }

              	$('.newsletter').show();
                removePropNewsletter();

                $('#opt-in-newsletter').on('click', function () {
                    removePropNewsletter();
                });

                $('.newsletter').append(`
                  <label class="checkbox adulthood-label">
                      <input type="checkbox" id="opt-in-adulthood">
                      <span class="adulthood-text">Sou maior de 18 anos.</span>
                  </label>
                `);

                $('#opt-in-adulthood').on('click', () => {
					const cookie = JSON.parse($.cookie('hasAcceptedCookies'));

					cookie.adulthood = $('#opt-in-adulthood').is(':checked');

                  	$.cookie('hasAcceptedCookies', JSON.stringify(cookie), { path: '/' });
				})
            }

            let hasInstall = Service.checkIfHasInstall(orderForm.items);
			let title = $('#shipping-data .accordion-toggle.collapsed');

            if (hasInstall) {
                if (title.is('.accordion-toggle-active')) {
                  	title.html('<i class="icon-home"></i> Instalar');
                }
                $('#shipping-data').addClass('altera-texto-abas-checkout');
                View.addInstallTexts(orderForm);
            } else if (title.is('.accordion-toggle-active')) {
                title.html('<i class="icon-home"></i> Receber ou Retirar');
                $('#shipping-data').removeClass('altera-texto-abas-checkout');
            }

            View.createCepInfo(orderForm, hasInstall);
        }

        function _removePaymentPickupIfIsDelivery(orderForm) {
            var maxLoopInteractions=0;
            if (window.location.hash.includes("payment")
                && orderForm
                    .shippingData
                    .logisticsInfo[0]
                    .selectedDeliveryChannel === "delivery"
            ) {
               var checkPaymentOptionLoop = setInterval(function(){
                  if(document.querySelector("fieldset.payment-group").style.display!='none')
                  {
                    $("#payment-group-creditCardPaymentGroup").click();
                    $(".pg-pagamento-na-loja.payment-group-item").css("display","none");
                    let tipoDePagamento = vtexjs.checkout.orderForm.paymentData.payments[0].paymentSystem;
                    const pagamentoNaLoja = '201';
                    if(tipoDePagamento != pagamentoNaLoja ||
                       ++maxLoopInteractions > 50){
                      clearInterval(checkPaymentOptionLoop);
                    }
                  }
                }, 100, maxLoopInteractions);
            }
        }

		function _formatLabelOnPayment(orderForm){
				let title = $('#shipping-data .accordion-toggle.collapsed');
              	let selectedDeliveryChannel = orderForm.shippingData
                            .logisticsInfo[0]
                            .selectedDeliveryChannel
                let hasInstall = Service.checkIfHasInstall(orderForm.items);

                let titleText = ' Receber';

                if(hasInstall && (selectedDeliveryChannel === 'pickup-in-point')){
                  titleText = 'Instalar na Loja';
                }
                else if(hasInstall && (selectedDeliveryChannel === 'delivery')){
                  titleText = 'Instalar em Casa';
                }
                else if(!hasInstall && (selectedDeliveryChannel === 'pickup-in-point')){
                  titleText = 'Retirar na Loja';
                }
                else if(!hasInstall && (selectedDeliveryChannel === 'delivery')){
                  titleText = 'Receber em Casa';
                }

          		let child1 = title[0].children[0];
                let child2 = title[0].children[1];
                title[0].innerHTML = '';
                title[0].appendChild(child1);
                title[0].append(' ' + titleText);

          		if (!title.is('.accordion-toggle-active')) {
                    title[0].appendChild(child2);
                }


                let secondLabel = document.querySelectorAll('.shp-summary-group-title.vtex-omnishipping-1-x-SummaryItemTitle')
                if(secondLabel.length > 1){
                    secondLabel[0].style.display = "none";
                }

            	return;
        }


        async function loadScripts() {
        const addId = id => script => { script.id = id; };

        const loadScript = (src, callback) => {
            return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.defer = true;
            script.crossOrigin = "anonymous";

            if (script.readyState) {
                script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    resolve();
                } else {
                    reject();
                }
                };
            } else {
                script.onload = () => resolve();
                script.onerror = () => reject();
            }

            script.src = src;
            if (callback) callback(script);
            document.getElementsByTagName("body")[0].appendChild(script);
            });
        };

        try {
            await loadScript('//io.vtex.com.br/vtex.js/2.11.2/catalog.min.js');
        } catch (e) {
            console.warn('[Checkout] Erro ao carregar VTEX Catalog.js (CORS):', e);
        }
        await loadScript("/scripts/jquery.ui.core.js");
        await loadScript("/arquivos/jquery.cookie.js");
        await loadScript('/scripts/jquery.maskedinput-1.2.2.js');
        await loadScript("/arquivos/jquery-ui.datepicker.js");

        await loadScript('https://autoglass-cdn.github.io/hml/js/policies/checkout.js');
        await loadScript('https://autoglass-cdn.github.io/hml/js/cep.component.js');
        await loadScript('https://autoglass-cdn.github.io/hml/js/consulta-agendamento.js');

        loadScript('https://autoglass-cdn.github.io/hml/js/checkout/jornada-do-cliente.js');
        loadScript('https://autoglass-cdn.github.io/hml/js/checkout/automatizar-preenchimento-nota-fiscal.js');
        loadScript('https://autoglass-cdn.github.io/hml/js/checkout/habilitar-input-chassi.js');
        loadScript('https://static.zdassets.com/ekr/snippet.js?key=126e916b-310a-4833-a582-4c72f3d0e32c', addId('ze-snippet'));

        window.addEventListener("load", function () {
            const carregarMarketing = function () {
            loadScript('https://autoglass-cdn.github.io/hml/js/cookie.bot.js');
            loadScript('https://autoglass-cdn.github.io/hml/js/hubspot-cookie.js');
            loadScript('https://js.hs-scripts.com/20753913.js');
            };

            if ('requestIdleCallback' in window) {
            requestIdleCallback(carregarMarketing);
            } else {
            setTimeout(carregarMarketing, 1500);
            }
        });
        }

    }

    function ViewAPI() {
        return {
            _init,
            formatItemList,
            windshieldVerification,
            addInstallTexts,
            createCepInfo,
            _implementsInstallButtom,
            _implementsServicoCalibracaoButton
        }

        function _init() {
            $('.mz-modal-overlay').click(() => {
                $('body').removeClass('mz-bo-on mz-as-on mz-il-on');
                localStorage.setItem('locationChanged', 0);
            });

            $('.mz-modal-advantages .mz-advantages__close span').click(() => {
                $('body').removeClass('mz-bo-on mz-as-on mz-il-on');
                localStorage.setItem('locationChanged', 0);
            });

            $('.mz-modal-installation .mz-install__close span').click(() => {
                $('body').removeClass('mz-bo-on mz-as-on mz-il-on');
                localStorage.setItem('locationChanged', 0);
            });
        }

        function formatItemList(orderForm) {
            let hasInstall = Service.checkIfHasInstall(orderForm.items);
            let hasInstallButtom = _checkIfHasInstallButtom();

            if (hasInstall) {
                $('body').addClass('hasInstall');
                setTimeout(() => _buildDeliveryInfo(orderForm), 500);
                $('#shipping-data').addClass('altera-texto-abas-checkout');
                $('.srp-description.mw5').html("Veja as opções de <b>instalação </b>com prazos e valores").css("opacity", 1);
            }

            if (hasInstall && hasInstallButtom) {
                $('.srp-toggle').addClass(CONFIG.CSS.INSTALACAO);
                $(".srp-toggle__pickup").append(
                    "<span class='instalar'>Instalar na loja</span>"
                );
                $(".srp-toggle__delivery").append(
                    "<span class='instalar'>Instalar em casa</span>"
                );

                $('.srp-main-title.mt0.mb0.f3.black-60.fw4').html('Instalar');
            }

            orderForm.items.forEach(item => {
            Service.getAccessories(item).then(accessories => {
                accessories.forEach(accessory => {
                    if (accessory.brandId == CONFIG.CONTROLS.BRAND_ID && verificaInsumoCarrinho(orderForm, accessory.productReference)){
              			if (accessory.productName.toUpperCase().includes("INSTALAÇÃO")) {
                            _implementsInstallButtom(item, accessory);
                        } else if (accessory.productName.toUpperCase().includes("ADAS")) {
                            _implementsServicoCalibracaoButton(item, accessory);
                        }
                    }
                });
            });
          });

            function verificaInsumoCarrinho(orderForm, refIdProduct) {
              return orderForm.items.find(item => item.refId === refIdProduct) ? false : true;
          }

            if (!hasInstall) {
                $('body').removeClass('hasInstall');
                $("span").remove(".instalar");
                $('.srp-toggle').removeClass(CONFIG.CSS.INSTALACAO);
                $('.accordion-inner').removeClass(CONFIG.CSS.INSTALACAO);
                $('#shipping-data').removeClass('altera-texto-abas-checkout');
                $('.srp-description.mw5').html("Veja as opções de <b>entrega</b>, <b>retirada</b> ou <b>instalação</b> com prazos e valores.").css("opacity", 1);
            }

            View.createCepInfo(orderForm, hasInstall);
        }

        function windshieldVerification(orderForm) {
            const hasWindshild = orderForm.items.reduce(
                (previousValue, item) =>
                    previousValue || item.name.startsWith("Parabrisa"),
                false
            );
            console.log('hasWindshild? '+ hasWindshild);
            if(!hasWindshild) return;
            const hasWindshieldVane = orderForm.items.reduce(
                (previousValue, item) =>
                    previousValue || item.name.startsWith("Palheta"),
                false
            );
            if(hasWindshieldVane) return;
          }

        function addInstallTexts(orderForm) {
            $('.accordion-inner').addClass('instalacao');

            setTimeout(() => {
                $('body').addClass('hasInstall');
                _buildDeliveryInfo(orderForm);
            }, 500);
        }

        async function _implementsInstallButtom(item, accessory) {
            await loadScript('//io.vtex.com.br/vtex.js/2.11.2/catalog.min.js');
            var product = await vtexjs.catalog.getProductWithVariations(accessory.productId);

            let { bestPriceFormated: preco, bestPrice, available } = product.skus
                .find(p => p.sku == accessory.items[0].itemId);

            let precoAcessorio = accessory.items[0].sellers[0].commertialOffer.Price
            let precoAcessorioFormatado = precoAcessorio.toFixed(2).replace('.', ',');

            if(accessory.items[0]) {
              preco = 'R$ '+ precoAcessorioFormatado;
              bestPrice = precoAcessorio + '00';
              available = true;

            }


            if (!available) return;

            let btnInstall = _createInstallButton(
                accessory.items[0].itemId,
                preco,
                bestPrice === 0
            );

            if ($(`[data-sku='${item.id}'].product-item .product-name .btn-add-instalacao`)
                .length === 0) {
                $(`[data-sku='${item.id}'] .product-name`).append(btnInstall);
            }

            function loadScript(src, callback) {
                return new Promise((resolve, reject) => {
                    const script = document.createElement("script");
                    script.type = "text/javascript";
                    script.defer = true;
                    script.crossOrigin = "anonymous";

                    if (script.readyState) {
                    script.onreadystatechange = function () {
                        if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        resolve();
                        } else {
                        reject();
                        }
                    };
                    } else {
                    script.onload = () => resolve();
                    script.onerror = () => reject();
                    }

                    script.src = src;
                    if (callback) callback(script);
                    document.body.appendChild(script);
                });
            }
        }

        function _createInstallButton(sku, preco, free = false) {
            let qty = 1;

            let btn = document.createElement('button');

            btn.innerText = free
                ? "Adicione Instalação na Loja - Grátis"
                : window.location.hash.includes('cart')
                    ? `+ Adicionar instalação por apenas ${preco}`
                    : `Adicionar  instalação por ${preco}`;

            btn.classList.add('btn-add-instalacao');
            $(btn).on('click', () => {
                window.location.assign(
                    `/checkout/cart/add?sc=${vtexjs.checkout.orderForm.salesChannel}&sku=${sku}&qty=${qty}&seller=${CONFIG.CONTROLS.ID_SELLER}`
                );
            });

            return btn;
        }

        function _checkIfHasInstallButtom() {
            return $(".srp-toggle__pickup span.instalar").length === 0;
        }
              
        async function _implementsServicoCalibracaoButton(item, accessory) {
            await loadScript('//io.vtex.com.br/vtex.js/2.11.2/catalog.min.js');
            var product = await vtexjs.catalog.getProductWithVariations(accessory.productId);
        
            let { bestPriceFormated: preco, bestPrice, available } = product.skus
                .find(p => p.sku == accessory.items[0].itemId);
        
            let precoAcessorio = accessory.items[0].sellers[0].commertialOffer.Price;
            let precoAcessorioFormatado = precoAcessorio.toFixed(2).replace('.', ',');
        
            if (accessory.items[0]) {
                preco = 'R$ ' + precoAcessorioFormatado;
                bestPrice = precoAcessorio + '00';
                available = true;
            }
        
            if (!available) return;
        
            const $target = $(`[data-sku='${item.id}'] .product-name`);
        
            // Só adiciona se ainda não existir
            if ($target.find('.btn-add-servico-calibracao-adas').length === 0) {
                const btnCalibracao = _createServicoCalibracaoButton(
                    accessory.items[0].itemId,
                    preco
                );
                $target.append(btnCalibracao);
            }
        
            function loadScript(src, callback) {
                return new Promise((resolve, reject) => {
                    const script = document.createElement("script");
                    script.type = "text/javascript";
                    script.defer = true;
                    script.crossOrigin = "anonymous";

                    if (script.readyState) {
                    script.onreadystatechange = function () {
                        if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        resolve();
                        } else {
                        reject();
                        }
                    };
                    } else {
                    script.onload = () => resolve();
                    script.onerror = () => reject();
                    }

                    script.src = src;
                    if (callback) callback(script);
                    document.body.appendChild(script);
                });
            }
        }

        function _createServicoCalibracaoButton(sku, preco) {
            let qty = 1;

            let btnServicoCalibracao = document.createElement('button');

            btnServicoCalibracao.innerText = `+ Adicionar calibração ADAS por apenas ${preco}`;

            btnServicoCalibracao.classList.add('btn-add-servico-calibracao-adas');
            $(btnServicoCalibracao).on('click', () => {
                window.location.assign(
                    `/checkout/cart/add?sc=${vtexjs.checkout.orderForm.salesChannel}&sku=${sku}&qty=${qty}&seller=${CONFIG.CONTROLS.ID_SELLER}`
                );
            });

            return btnServicoCalibracao;
        }

        function _buildDeliveryInfo(orderForm) {
            const qtd = $('.product-item').length - 1;
            $('.srp-items').html(`<strong>Instalar</strong> ${qtd} ${qtd > 1 ? 'itens' : 'item'} em `);

            if (!$('.srp-delivery-info .instalar-em-casa').length) {
                $('.srp-delivery-info').append('<div class="instalar instalar-em-casa"></div>');
            }

            if (!$('.srp-pickup-info .instalar-na-loja').length) {
                $('.srp-pickup-info').append('<div class="instalar instalar-na-loja"></div>');
            }

            $('.srp-delivery-info .instalar-em-casa').html(() => _createInfoDelivery(orderForm.shippingData.address));
            $('.srp-pickup-info .instalar-na-loja').html(() => _createInfoPickup(orderForm.shippingData.address));

            $('#open-modal-ic').click(() => {
                $('body').addClass('mz-bo-on mz-as-on');
            });

            $('#open-modal-il').click(() => {
                $('body').addClass('mz-bo-on mz-il-on');
            });
        }

        /**
         * Recebe o OrderForm
         * Caso não informe se há instalação ele busca
         */
        function createCepInfo({ shippingData, items }, hasInstall) {
            setTimeout(() => {
                const { formatedAddress, title, logistics, selector } = getParams(shippingData);

                if (hasInstall === undefined) {
                    hasInstall = Service.checkIfHasInstall(items);
                }

                const cepBox = $('.srp-result .cep-info');

                if (cepBox.length !== 0) {
                    $('.srp-result .cep-info').html(`
                            <div class="cep-info">
                                <div class="cep-info__title">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                    </svg>
                                    ${title}
                                </div>
                                <div class="cep-info__location">
                                    <span class="cep-info__location-street">
                                    ${formatedAddress}
                                    </span>
                                </div>
                                <button id="change-button" class="cep-info__location-button">Alterar</button>
                            </div>
                        `);
                } else {
                    $(selector).append(`
                            <div class="cep-info">
                                <div class="cep-info__title">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                    </svg>
                                    ${title}
                                </div>
                                <div class="cep-info__location">
                                    <span class="cep-info__location-street">
                                    ${formatedAddress}
                                    </span>
                                </div>
                                <button id="change-button" class="cep-info__location-button">Alterar</button>
                            </div>
                        `);
                }

                $('.srp-result #change-button').click(() => chooseButtonFunction(logistics, hasInstall));
            }, 1000);

            function getParams(shippingData) {
                let formatedAddress, title, selector;

                const [logistics] = shippingData.logisticsInfo;
                const [selectedAddresses] = shippingData.selectedAddresses;

                const isDelivery = localStorage.getItem('activeDeliveryChannel') === 'delivery';

                if (!selectedAddresses) {
                    console.error('Não há endereço selecionado!');
                    return {};
                }

                if (isDelivery) {
                    const groups = selectedAddresses.postalCode
                        .replace('-', '')
                        .match(/(\d{5})(\d{3})/);

                    title = `CEP <b>${groups[1]}-${groups[2]}</b>`;
                    formatedAddress = formatAddress(selectedAddresses);
                    selector = '.srp-delivery-header';
                } else {
                    const pickups = logistics.slas.filter(x => x.deliveryChannel === 'pickup-in-point');

                    if (pickups && !!pickups.length) {
                        const pickup = pickups.find(x => x.id === logistics.selectedSla)

                        if (pickup) {
                            title = `<b>${pickup.pickupStoreInfo.friendlyName}</b>`;
                            formatedAddress = formatAddress(pickup.pickupStoreInfo.address);
                        } else {
                            title = `<b>${pickups[0].pickupStoreInfo.friendlyName}</b>`;
                            formatedAddress = formatAddress(pickups[0].pickupStoreInfo.address);
                        }
                    } else {
                        const groups = selectedAddresses.postalCode
                            .replace('-', '')
                            .match(/(\d{5})(\d{3})/);

                        title = `CEP <b>${groups[1]}-${groups[2]}</b>`;
                        formatedAddress = 'Não encontramos nenhuma loja próximas a você.';
                    }

                    const cepBox = $('.srp-result  .cep-info');

                    if (cepBox.length === 0) {
                        try {
                            const htmlOriginal = $('.srp-pickup-info label')[0].outerHTML;
                            $('.srp-pickup-info label')[0].outerHTML = '<div class="cep-info"></div>' + htmlOriginal;
                        } catch {console.log('Falha ao renderizar o Cep');}
                    }

                    selector = '.srp-pickup-info';
                }

                return {
                    formatedAddress,
                    title,
                    logistics,
                    selector
                }
            }

            function formatAddress(address) {
                const { city, neighborhood, state, street } = address;
                let addressFormatted = '';

                if (street)
                    addressFormatted += street;
                if (neighborhood) {
                    if (street)
                        addressFormatted += ' - ';
                    addressFormatted += neighborhood;
                }
                if (city) {
                    if (neighborhood)
                        addressFormatted += ', ';
                    addressFormatted += city;
                }
                if (state) {
                    if (city)
                        addressFormatted += ' - ';

                    addressFormatted += state;
                }

                return addressFormatted;
            }

            function chooseButtonFunction(logistics, hasInstall) {
                const selectedChannel = localStorage.getItem('activeDeliveryChannel');

                if (!hasInstall || logistics.slas.length === 0) {
                    $('.srp-address-title.link')[0].click();
                    return;
                }

                selectedChannel === 'delivery'
                    ? $('body').addClass('mz-bo-on mz-as-on')
                    : $('#open-modal-il')[0].click();
            }
        }

        function _createInfoDelivery(address) {
            const day = Service.getSelectedDaySM();
            const botaoVerDiasDisponiveisExiste = !!$('#open-modal-ic').length;

            $('.vtex-omnishipping-1-x-shippingSectionTitle').html('Data de Instalação');
            $('.vtex-omnishipping-1-x-shippingSectionTitle.delivery-address-title').html('Endereço de Instalação');

            if (!day && !botaoVerDiasDisponiveisExiste) {
                $('.srp-delivery-info .instalar-em-casa').html(`
                        <a id="open-modal-ic">
                            <div class="instalar_calendar"><i class="fa fa-calendar"></i></div>
                            <div class="instalar_content">
                                <span>Veja os dias disponíveis</span>
                            </div>
                        </a>
                    `);

                $('.shp-option-text-label-single span').html('<a id="alterar-shipping-btn">Veja os dias disponíveis</a>');
                $('.shp-option-text-price').html('');
            } else {
                try {
                    $('#mostrar-datas-datepicker').datepicker('setDate', day.selectedDay);

                    if (window.location.hash.includes('shipping')) {
                        $('.shp-option-text-label-single span').html(day.selectedDay);
                    }

                    $('.shp-option-text-price').html('<a id="alterar-shipping-btn">Alterar</a>');

                    $('.srp-delivery-info .instalar-em-casa').html(`
                        <a id="open-modal-ic">
                            <div class="instalar_calendar"><i class="fa fa-calendar"></i></div>
                            <div class="instalar_content">
                                <span>Data selecionada:</span>
                                <b>${day.selectedDay}</b>
                                <span>${address.street}, ${address.neighborhood} - ${address.city}</span>
                            </div>
                        </a>
                    `);
                }
                catch (e) {
                    console.log('Não foi possível encontrar day.selectedDay (' + e.message + ')');
                }
            }

              try {

                setTimeout(() => {
                   $('#mostrar-datas-datepicker').datepicker('option', 'onSelect',
                    (selectedDate, details) => {
                      _createConfirmButtonSM(selectedDate, details);
                    });

                }, 500);

              } catch {
                   console.error('Falha ao criar onSelect no datepicker')
              }


            $('#alterar-shipping-btn').click(() => {
                $('body').addClass('mz-bo-on mz-as-on');
            });
        }

        function _createInfoPickup(address) {
            const selectedAppointment = Service.getSelectedAppointment();

            $('.pickup-packages.vtex-omnishipping-1-x-packages .vtex-omnishipping-1-x-shippingSectionTitle').html('Data de Agendamento');

            if (!selectedAppointment) {
                $('.srp-pickup-info .instalar-na-loja').html(`
                        <a id="open-modal-il">
                            <div class="instalar_calendar"><i class="fa fa-calendar"></i></div>
                            <div class="instalar_content">
                                <span>Veja os horários disponíveis</span>
                            </div>
                        </a>
                    `);

                $('.shp-option-text-label-single span').html('<a id="alterar-pickup-btn">Veja os horários disponíveis</a>');
                $('.shp-option-text-price').html('');
            } else {
                let [year, month, day] = selectedAppointment.date.split('-');

                if (window.location.hash.includes('shipping')) {
                    $('.shp-option-text-label-single span').html(`
                        ${day}/${month}/${year} às ${selectedAppointment.horario}<br>
                        ${selectedAppointment.lojaBeauty}<br>
                        ${selectedAppointment.enderecoLoja}
                        ${selectedAppointment.cidadeLoja}
                    `);

                    $('.shp-option-text-price').html('<a id="alterar-pickup-btn">Alterar</a>');

                    $('#alterar-pickup-btn').click(() => {
                        $('body').removeClass('mz-bo-on mz-il-on');
                        $('.shp-option-text-label-single span').html('Aguarde...');
                    });
                }

                $('.srp-pickup-info .instalar-na-loja').html(`
                        <a id="open-modal-il">
                            <div class="instalar_calendar"><i class="fa fa-calendar"></i></div>
                            <div class="instalar_content">
                                <span>Informações do agendamento:</span>
                                <b>${day}/${month}/${year} às ${selectedAppointment.horario}</b>
                                <b>${selectedAppointment.lojaBeauty}</b>
                                <b>${selectedAppointment.enderecoLoja}
                                ${selectedAppointment.cidadeLoja}</b>
                            </div>
                        </a>
                    `);
            }

            $('#alterar-pickup-btn').click(() => {
                $('body').addClass('mz-bo-on mz-il-on');
            });
        }

        function _createConfirmButtonSM(selectedDate, details) {
            $('#confirmacao-sm').html(`
                    <p><i class="fa fa-check"></i>Data escolhida:
                        <span class="agendamento">
                            <b id="agendamento-data">${selectedDate}</b>
                        </span>.
                        <br>
                        <p><i class="fa fa-check"></i>Horário de atendimento: <b>08:00 às 18:00</b></p>
                        <strong>Deseja confirmar o agendamento da instalação para esse dia?</strong>
                    </p>
                    <button id="confirm-sm-btn">Confirmar</button>
                `);

            $('#confirm-sm-btn').click(() => {
                localStorage.setItem(CONFIG.STORAGE.DAY_SM, JSON.stringify({
                    infos: details,
                    selectedDay: selectedDate,
                    _createAt: Date.now()
                }));

                if (window.location.hash.includes('shipping')) {
                    $('.shp-option-text-label-single span').html('Aguarde...');
                }

                checkout.update();
                $('.mz-modal-overlay').click();
            })
        }
    }

    function ajustaBotaoFinalizarCompra() {
        const larguraTela      = window.screen.width;
        const container        = "body#checkoutMainContainer.body-order-form";
        const botaoFinalizar   = document.querySelectorAll(container + " #payment-data-submit");
        const dispositivoMovel = larguraTela < 490;
        const paginaPagamento  = document.body.contains(botaoFinalizar[0]);
        const tamanhoBlocoPgto = 826;

        if(dispositivoMovel && paginaPagamento) {
            $(window).scroll(function() {
                if(window.scrollY > tamanhoBlocoPgto) {
                    $(botaoFinalizar).removeClass('cta-posicao-padrao');
                } else {
                    $(botaoFinalizar).addClass('cta-posicao-padrao');
                }
            });
        }
    }

    ajustaBotaoFinalizarCompra();

    function ServiceAPI() {
        return {
            sendGAEvent,
            checkIfHasInstall,
            getAccessories,
            getOrderForm,
            getSelectedChannel,
            getSelectedDaySM,
            getSelectedAppointment,
        }

        function checkIfHasInstall(items) {
            return items.filter(
                item => item.additionalInfo.brandId == CONFIG.CONTROLS.BRAND_ID
            ).length > 0;
        }

        async function getAccessories(item) {
          let salesChannel = vtexjs.checkout.orderForm.salesChannel;
          let response = await fetch(
              `/api/catalog_system/pub/products/crossselling/accessories/${item.productId}?sc=${salesChannel}`
          );

          let data = await response.json();

          data.forEach(product => {
              product.refIdProduct = item.refId;
          });

          return data;
        }

        async function sendGAEvent(orderForm) {
            const { logisticsInfo, address } = orderForm.shippingData;
            const { slas } = logisticsInfo[0];

            const GaFreight = [];

            slas.forEach(({ name }) => {
                if (name.startsWith('Retirada') && !GaFreight.includes('Retirada em Loja'))
                    GaFreight.push('Retirada em Loja');

                if (name.startsWith('Autoglass Express'))
                    GaFreight.push('Autoglass Express');

                if (name.startsWith('PAC'))
                    GaFreight.push('PAC');

                if (name.startsWith('Sedex'))
                    GaFreight.push('Sedex');

                if (name.startsWith('Transportadora'))
                    GaFreight.push('Transportadora');

                if (name.startsWith('Normal'))
                    GaFreight.push('Normal');
            });

            GaFreight.length > 0
                ? ga(
                    'send',
                    'event',
                    CONFIG.GA.FREIGHT.EVENT_NAME,
                    CONFIG.GA.FREIGHT.VALUES.FOUND,
                    address?.postalCode + ',' + GaFreight.join(',')
                )
                : ga(
                    'send',
                    'event',
                    CONFIG.GA.FREIGHT.EVENT_NAME,
                    CONFIG.GA.FREIGHT.VALUES.NOT_FOUND, address?.postalCode
                );
        }

        async function getOrderForm() {
            return await vtexjs.checkout.getOrderForm();
        }

        function getSelectedChannel() {
            return localStorage.getItem(CONFIG.STORAGE.CHANNEL);
        }

        function getSelectedDaySM() {
            return JSON.parse(localStorage.getItem(CONFIG.STORAGE.DAY_SM));
        }

        function getSelectedAppointment() {
            return JSON.parse(localStorage.getItem(CONFIG.STORAGE.APPOINTMENT));
        }
    }
});
                  
function aplicarRegraPagamento() {
  vtexjs.checkout.getOrderForm().then(orderForm => {
    const tipoRecebimento = orderForm.shippingData.logisticsInfo[0].selectedDeliveryChannel; 
    const temProdutoADAS = orderForm.items.some(item =>
      item.name && item.name.toUpperCase().includes('ADAS')
    );

    // Pega o <a> da Pagamento na Loja
    const aPagamentoNaLoja = Array.from(document.querySelectorAll('a.payment-group-item')).find(a =>
      a.textContent.toLowerCase().includes('pagamento na loja')
    );

    // Se for delivery, esconde somente o pagamento na loja
    if (tipoRecebimento === 'delivery') {
      console.log('Tipo de recebimento é delivery. Ocultando pagamento na loja.');

      if (aPagamentoNaLoja) {
        aPagamentoNaLoja.style.display = 'none';
      }

      // Mostra as outras opções
      document.querySelectorAll('a.payment-group-item').forEach(el => {
        if (el !== aPagamentoNaLoja) el.style.display = '';
      });

      return; // Importante: não segue para as regras do ADAS
    }

    // Se não tem ADAS, mostrar tudo
    if (!temProdutoADAS) {
      document.querySelectorAll('a.payment-group-item').forEach(el => {
        el.style.display = '';
      });
      return;
    }

    // Se tem ADAS e não é delivery, mostra apenas Pagamento na loja
    if (aPagamentoNaLoja) {
      aPagamentoNaLoja.click();

      setTimeout(() => {
        document.querySelectorAll('a.payment-group-item').forEach(a => {
          if (a !== aPagamentoNaLoja) a.style.display = 'none';
          else a.style.display = '';
        });
      }, 700);
    }
  });
}

// Detecta etapa pagamento e aplica a regra
$(window).on('hashchange', () => {
  if (window.location.hash.includes('/payment')) {
    setTimeout(aplicarRegraPagamento, 500);
  }
});

// Se já está na etapa pagamento ao carregar a página
if (window.location.hash.includes('/payment')) {
  setTimeout(aplicarRegraPagamento, 500);
}