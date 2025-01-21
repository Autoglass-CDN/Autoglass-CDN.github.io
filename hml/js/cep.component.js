$(function () {
	const t = '.cep:not(".link")',
	  e = "data-render-cep",
	  n = { FINISH_LOAD: "cep-finish-load", CEP_UPDATED: "cep-updated" },
	  o = "AG_AddressSelected",
	  a = (function () {
		return {
		  init: async function () {
			const c = await i.getOrderForm();
			c.shippingData && i.saveAddressOnLocalStorage(c.shippingData);
			let r = o(c);
			$(t).each(function (t, o) {
			  $(o).html("").addClass("ghost-loading");
			  const a = $(o).attr(e);
			  (o.id = "cep" + t),
				$(a).css("overflow", "hidden"),
				$(a).css("min-height", "150px"),
				s.renderCepInfo(o, a, r),
				$(window).on(n.CEP_UPDATED, async (t) => {
				  const e = t.originalEvent.detail;
				  i.saveAddressOnLocalStorage(e.shippingData),
					$(o).html("").addClass("ghost-loading"),
					s.renderCepInfo(o, a, e.shippingData.address);
				}),
				$(window).on("orderFormUpdated.vtex", (t, e) => {
				  i.saveAddressOnLocalStorage(e.shippingData);
				});
			}),
			  (function (t) {
				const e = {
					"mz-pu-on": { rendered: !1, container: ".mz-content" },
					"mz-in-on": { rendered: !1, container: ".secao-agendamento" },
					"mz-as-on": {
					  rendered: !1,
					  container: ".mz-advantages__content",
					},
					"mz-sf-on": {
					  rendered: !1,
					  container: ".mz-shipping-cep-content",
					},
				  },
				  n = new MutationObserver((n) => {
					const a = o(t);
					a ||
					  n.forEach((t) => {
						if ("class" === t.attributeName) {
						  const n = t.target.classList;
						  for (let t in e)
							n.contains(t) &&
							  !e[t].rendered &&
							  ((e[t].rendered = !0),
							  s.renderNewCep(e[t].container, a));
						}
					  });
				  });
				n.observe(document.getElementsByTagName("body")[0], {
				  attributes: !0,
				}),
				  $(window).on("orderFormUpdated.vtex", (e, n) => {
					t = n;
				  });
			  })(c),
			  window.dispatchEvent(new CustomEvent(n.FINISH_LOAD, { detail: c })),
			  $("#shipping-preview-container").on(
				"click",
				".srp-delivery-info div",
				function (t) {
				  const e =
					"none" !=
					document.querySelector(".datas-disponiveis").style.display;
				  vtexjs?.checkout?.orderForm &&
					vtexjs.checkout.orderForm.shippingData.address.postalCode &&
					!e &&
					a.submitEvent(
					  t,
					  vtexjs.checkout.orderForm.shippingData.address.postalCode
					);
				}
			  );
		  },
		  formatAddress: function (t) {
			const {
			  city: e,
			  neighborhood: n,
			  state: o,
			  street: a,
			  postalCode: s,
			} = t;
			let i = "";
			a && (i += a);
			n && (a && (i += " - "), (i += n));
			e && (n && (i += ", "), (i += e));
			o && (e && (i += " - "), (i += o));
			return i || s;
		  },
		  submitEvent: async function (t, e) {
			if ((t.preventDefault(), !e))
			  return void $(this).addClass("cep-new__content-form--error");
			$(".cep-new__content--loading").show().css("right", "-1px");
			try {
			  const [t] = await i.calculateShipping(e);
			  $(".cep-new").css("transform", "translateX(105%)"),
				localStorage.setItem("ufDefinedByTop", 0),
				window.dispatchEvent(
				  new CustomEvent(n.CEP_UPDATED, { detail: t })
				),
				setTimeout(() => $(".cep-new").remove(), 1e3);
			} catch (t) {
			  $(".cep-new__content--loading").hide().css("right", "unset"),
				console.error(t);
			}
		  },
		};
		function o(t) {
		  let e;
		  const n = window.location.href.includes("/checkout"),
			o = +localStorage.getItem("ufDefinedByTop");
		  return (
			!n && o ? (e = null) : t.shippingData && (e = t.shippingData.address),
			e
		  );
		}
	  })(),
	  s = (function () {
		return {
		  renderCepInfo: function (n, o, s) {
			if (s) {
			  const t = a.formatAddress(s);
			  $(n)
				.removeClass("ghost-loading")
				.html(
				  `\n\t\t\t\t\t\t<div class="cep-info">\n\t\t\t\t\t\t\t<div class="cep-info__location">\n\t\t\t\t\t\t\t\t<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo-alt" fill="currentColor"\n\t\t\t\t\t\t\t\t\txmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t\t\t\t<path fill-rule="evenodd"\n\t\t\t\t\t\t\t\t\t\td="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />\n\t\t\t\t\t\t\t\t\t<path fill-rule="evenodd" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t<span class="cep-info__location-street">${t}</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<button id="change-cep-button" class="cep-info__location-button">Alterar</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t`
				);
			} else
			  $(n)
				.removeClass("ghost-loading")
				.html(
				  '\n\t\t\t\t\t\t<div class="cep-info">\n\t\t\t\t\t\t\t<div class="cep-info__location">\n\t\t\t\t\t\t\t\t<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo-alt" fill="currentColor"\n\t\t\t\t\t\t\t\t\txmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t\t\t\t<path fill-rule="evenodd"\n\t\t\t\t\t\t\t\t\t\td="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />\n\t\t\t\t\t\t\t\t\t<path fill-rule="evenodd" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<button id="change-cep-button" class="cep-info__location-button">Informe seu cep aqui</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t'
				);
			if (+localStorage.getItem("locationChanged")) {
			  const t = $(`#${n.id}`);
			  let e = t.html();
			  (e +=
				'<span class="cep-info__location-changed">Região alterada conforme novo CEP informado.</span>'),
				t.html(e);
			}
			$(`#${n.id} .cep-info__location-button`).click(() => {
			  o ? t(o, s) : console.error(e + " não encontrado. Id: " + n.id);
			});
		  },
		  renderNewCep: t,
		};
		function t(t, e) {
		  $(t).append(
			`\n\t\t\t\t<div class="cep-new">\n\t\t\t\t\t<div class="cep-new__content">\n\t\t\t\t\t\t<div class="cep-new__content--loading">\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo-alt" fill="currentColor"\n\t\t\t\t\t\t\t\t\txmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t\t\t\t<path fill-rule="evenodd"\n\t\t\t\t\t\t\t\t\t\td="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />\n\t\t\t\t\t\t\t\t\t<path fill-rule="evenodd" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo-alt-fill" fill="currentColor"\n\t\t\t\t\t\t\t\t\txmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t\t\t\t<path fill-rule="evenodd"\n\t\t\t\t\t\t\t\t\t\td="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<span class="cep-new__content-title">Informe seu CEP</span>\n\t\t\t\t\t\t<form class="cep-new__content-form">\n\t\t\t\t\t\t\t<input type="text" inputmode="numeric" autocomplete="off" id="cep-input" placeholder="00000-000" class="cep-new__content-input" />\n\t\t\t\t\t\t\t<button id="cep-new-button" type="submit" class="cep-new__content-button">\n\t\t\t\t\t\t\t\t<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right-circle-fill" fill="currentColor"\n\t\t\t\t\t\t\t\t\txmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t\t\t\t<path fill-rule="evenodd"\n\t\t\t\t\t\t\t\t\t\td="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-11.5.5a.5.5 0 0 1 0-1h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5z" />\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>\n\t\t\t\t\t${
			  e
				? '<div class="cep-new__footer">\t\t\t\t\t\t    <button id="cep-back-button" type="button" class="cep-new__footer-back-button">Voltar</button>\t\t\t\t\t    </div>'
				: ""
			}\n\t\t\t\t</div>\n\t\t\t`
		  ),
			setTimeout(
			  () => $(`${t} .cep-new`).css("transform", "translateX(0)"),
			  100
			);
		  const n = `${t} .cep-new__content-input`,
			o = (function (t) {
			  const e = window.innerWidth < 1200;
			  e
				? ($(t).attr("placeholder", "00000000"),
				  $(t).attr("max-length", "8"))
				: ($(t).attr("placeholder", "00000-000"),
				  $(t).attr("max-length", "9"),
				  $(t).mask("99999-999"));
			  return e;
			})(n),
			s = o ? 8 : 9;
		  $(`${t} .cep-new__footer-back-button`).click((e) => {
			$(`${t} .cep-new`).css("transform", "translateX(-105%)"),
			  setTimeout(() => $(`${t} .cep-new`).remove(), 1e3);
		  }),
			$(n).focus(),
			$(n).click(function () {
			  o || $(this)[0].setSelectionRange(0, 0);
			}),
			$(n).keyup((t) => {
			  if (
				(t.preventDefault(), t.target.value.replace("_", "").length === s)
			  ) {
				const e = $(n).val();
				a.submitEvent(t, e);
			  }
			}),
			$(`${t} .cep-new__content-form`).on("submit", (t) => {
			  if (
				(t.preventDefault(), $(n).val().replace("-", "").length === s)
			  ) {
				const e = $(n).val();
				a.submitEvent(t, e);
			  }
			});
		}
	  })(),
	  i = {
		calculateShipping: async function (t) {
		  const e = await vtexjs.checkout.calculateShipping({
			  postalCode: t,
			  country: "BRA",
			  addressType: "search",
			}),
			n = await vtexjs.checkout.calculateShipping({
			  postalCode: t,
			  country: "BRA",
			  addressType: "residential",
			});
		  return [e, n];
		},
		getOrderForm: async function () {
		  return await vtexjs.checkout.getOrderForm();
		},
		saveAddressOnLocalStorage: function (t) {
		  localStorage.setItem(
			o,
			JSON.stringify({ ...t.address, logisticsInfo: t.logisticsInfo })
		  );
		},
	  };
	a.init();
  });
  