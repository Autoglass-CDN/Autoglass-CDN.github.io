/**
 * Para funcionar precisa no seletor ter
 * o atributo 'data-render-cep'.
 * É o lugar aonde vai rendereziar
 * o painel de mudança de cep
 */
$(function CepComponent() {
    const CONFIG = {
        SELECTOR: '.cep:not(".link")',
        LOCAL_TO_RENDER_CEP: "data-render-cep",
        EVENTS: {
            FINISH_LOAD: "cep-finish-load",
            CEP_UPDATED: "cep-updated",
        },
        STORAGE: "AG_AddressSelected",
    };

    const Controller = ControllerAPI();
    const View = ViewAPI();
    const Service = ServiceAPI();

    Controller.init();

    function ControllerAPI() {
        return {
            init,
            formatAddress,
            submitEvent,
        };

        async function init() {
            const orderForm = await Service.getOrderForm();

            if (orderForm.shippingData)
                Service.saveAddressOnLocalStorage(orderForm.shippingData);

            $(CONFIG.SELECTOR).each(function (_, cepContainer) {
                $(cepContainer).html("").addClass("ghost-loading");

                const modalContent = $(cepContainer).attr(
                    CONFIG.LOCAL_TO_RENDER_CEP
                );
                cepContainer.id = "cep" + _;

                $(modalContent).css("position", "relative");
                $(modalContent).css("overflow", "hidden");
                $(modalContent).css("min-height", "150px");

                let address;
                let isCheckout = window.location.href.includes("/checkout");
                let ufDefinedByTop = +localStorage.getItem("ufDefinedByTop");

                if (!isCheckout && ufDefinedByTop) {
                    address = null;
                } else {
                    if (orderForm.shippingData) {
                        address = orderForm.shippingData.address;
                    }
                }

                View.renderCepInfo(cepContainer, modalContent, address);

                $(window).on(CONFIG.EVENTS.CEP_UPDATED, async (e) => {
                    const newOrderForm = e.originalEvent.detail;
                    Service.saveAddressOnLocalStorage(
                        newOrderForm.shippingData
                    );

                    $(cepContainer).html("").addClass("ghost-loading");

                    View.renderCepInfo(
                        cepContainer,
                        modalContent,
                        newOrderForm.shippingData.address
                    );
                });

                $(window).on("orderFormUpdated.vtex", (_, order) => {
                    Service.saveAddressOnLocalStorage(order.shippingData);
                });
            });

            window.dispatchEvent(
                new CustomEvent(CONFIG.EVENTS.FINISH_LOAD, {
                    detail: orderForm,
                })
            );
			
            const cepMaxLength = 9;
			$("#btnFreteSimulacao").click((e) => {
                e.preventDefault();
                if ($("#txtCep").val().replace("_", "").length === cepMaxLength) {
                    const cep = $("#txtCep").val();
                    Controller.submitEvent(e, cep);
                }
            });
        }

        function formatAddress(address) {
            const { city, neighborhood, state, street, postalCode } = address;
            let addressFormatted = "";

            if (street) addressFormatted += street;
            if (neighborhood) {
                if (street) addressFormatted += " - ";
                addressFormatted += neighborhood;
            }
            if (city) {
                if (neighborhood) addressFormatted += ", ";
                addressFormatted += city;
            }
            if (state) {
                if (city) addressFormatted += " - ";

                addressFormatted += state;
            }

            return addressFormatted ? addressFormatted : postalCode;
        }

        async function submitEvent(e, cep) {
            e.preventDefault();

            if (!cep) {
                $(this).addClass("cep-new__content-form--error");
                return;
            }

            $(".cep-new__content--loading").show().css("right", "0");

            try {
                const [cepChanged] = await Service.calculateShipping(cep);

                $(".cep-new").css("transform", "translateX(105%)");

                localStorage.setItem("ufDefinedByTop", 0);

                window.dispatchEvent(
                    new CustomEvent(CONFIG.EVENTS.CEP_UPDATED, {
                        detail: cepChanged,
                    })
                );

                setTimeout(() => $(".cep-new").remove(), 1000);
            } catch (ex) {
                $(".cep-new__content--loading").hide().css("right", "unset");

                console.error(ex);
            }
        }
    }

    function ViewAPI() {
        return {
            renderCepInfo,
        };

        function renderCepInfo(cepContainer, modalContent, address) {
            if (address) {
                const addressFormatted = Controller.formatAddress(address);

                $(cepContainer).removeClass("ghost-loading").html(`
						<div class="cep-info">
							<div class="cep-info__location">
								<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo-alt" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd"
										d="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
									<path fill-rule="evenodd" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
								</svg>
								<span class="cep-info__location-street">${addressFormatted}</span>
							</div>
							<button id="change-cep-button" class="cep-info__location-button">Alterar</button>
						</div>
					`);
            } else {
                $(cepContainer).removeClass("ghost-loading").html(`
						<div class="cep-info">
							<div class="cep-info__location">
								<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo-alt" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd"
										d="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
									<path fill-rule="evenodd" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
								</svg>
							</div>
							<button id="change-cep-button" class="cep-info__location-button">Informe seu cep aqui</button>
						</div>
					`);
            }

            if (+localStorage.getItem("locationChanged")) {
                const cepInfo = $(`#${cepContainer.id}`);
                let html = cepInfo.html();
                html =
                    html +
                    `<span class="cep-info__location-changed">Região alterada conforme novo CEP informado.</span>`;
                cepInfo.html(html);
            }

            $(`#${cepContainer.id} .cep-info__location-button`).click(() => {
                modalContent
                    ? _renderNewCep(modalContent)
                    : console.error(
                          CONFIG.LOCAL_TO_RENDER_CEP +
                              " não encontrado. Id: " +
                              cepContainer.id
                      );
            });
        }

        function _renderNewCep(modalContent) {
            $(modalContent).append(`
				<div class="cep-new">
					<div class="cep-new__content">
						<div class="cep-new__content--loading">
							<div>
								<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo-alt" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd"
										d="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
									<path fill-rule="evenodd" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
								</svg>
								<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo-alt-fill" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd"
										d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
								</svg>
							</div>
						</div>
						<span class="cep-new__content-title">Informe seu CEP</span>
						<form class="cep-new__content-form">
							<input type="text" inputmode="numeric" autocomplete="off" id="cep-input" placeholder="00000-000" class="cep-new__content-input" />
							<button id="cep-new-button" type="submit" class="cep-new__content-button">
								<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right-circle-fill" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd"
										d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-11.5.5a.5.5 0 0 1 0-1h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5z" />
								</svg>
							</button>
						</form>
					</div>
					<div class="cep-new__footer">
						<button id="cep-back-button" type="button" class="cep-new__footer-back-button">Voltar</button>
					</div>
				</div>
			`);

            setTimeout(
                () => $(".cep-new").css("transform", "translateX(0)"),
                100
            );

            const isMobile = _defineHowCepInputWillWork();
            const maxLength = !isMobile ? 9 : 8;

            $(`${modalContent} #cep-back-button`).click((e) => {
                $(".cep-new").css("transform", "translateX(-105%)");

                setTimeout(() => $(".cep-new").remove(), 1000);
            });

            $("#cep-input").focus();
            $("#cep-input").click(function () {
                if (!isMobile) {
                    $(this)[0].setSelectionRange(0, 0);
                }
            });

            $("#cep-input").keyup((e) => {
                e.preventDefault();
                if (e.target.value.replace("_", "").length === maxLength) {
                    const cep = $("#cep-input").val();
                    Controller.submitEvent(e, cep);
                }
            });

            $(".cep-new__content-form").on("submit", (e) => {
                e.preventDefault();
                if (
                    $("#cep-input").val().replace("_", "").length === maxLength
                ) {
                    const cep = $("#cep-input").val();
                    Controller.submitEvent(e, cep);
                }
            });

        }

        function _defineHowCepInputWillWork() {
            const isMobile = window.innerWidth < 1200;

            if (!isMobile) {
                $("#cep-input").attr("placeholder", "00000-000");
                $("#cep-input").attr("max-length", "9");
                $("#cep-input").mask("99999-999");
            } else {
                $("#cep-input").attr("placeholder", "00000000");
                $("#cep-input").attr("max-length", "8");
            }

            return isMobile;
        }
    }

    function ServiceAPI() {
        return {
            calculateShipping,
            getOrderForm,
            saveAddressOnLocalStorage,
        };

        async function calculateShipping(cep) {
            const search = await vtexjs.checkout.calculateShipping({
                postalCode: cep,
                country: "BRA",
                addressType: "search",
            });

            const residential = await vtexjs.checkout.calculateShipping({
                postalCode: cep,
                country: "BRA",
                addressType: "residential",
            });

            return [search, residential];
        }

        async function getOrderForm() {
            const orderForm = await vtexjs.checkout.getOrderForm();

            return orderForm;
        }

        function saveAddressOnLocalStorage(shippingData) {
            localStorage.setItem(
                CONFIG.STORAGE,
                JSON.stringify({
                    ...shippingData.address,
                    logisticsInfo: shippingData.logisticsInfo,
                })
            );
        }
    }
});
