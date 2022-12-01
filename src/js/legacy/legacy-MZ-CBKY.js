/* PC-QUARTO - 04/06/2020 21:55:54 GMT-0300 */
console.warn("Código legado carregado.");
console.log("Ambiente DEV");

String.prototype.trim || (String.prototype.trim = function () {
	return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
});
"function" !== typeof String.prototype.replaceSpecialChars && (String.prototype.replaceSpecialChars = function () {
	var b = {
		"ç": "c",
		"æ": "ae",
		"œ": "oe",
		"á": "a",
		"é": "e",
		"í": "i",
		"ó": "o",
		"ú": "u",
		"à": "a",
		"è": "e",
		"ì": "i",
		"ò": "o",
		"ù": "u",
		"ä": "a",
		"ë": "e",
		"ï": "i",
		"ö": "o",
		"ü": "u",
		"ÿ": "y",
		"â": "a",
		"ê": "e",
		"î": "i",
		"ô": "o",
		"û": "u",
		"å": "a",
		"ã": "a",
		"ø": "o",
		"õ": "o",
		"ú": "u",
		"Á": "A",
		"É": "E",
		"Í": "I",
		"Ó": "O",
		"Ú": "U",
		"Ê": "E",
		"Ô": "O",
		"Ü": "U",
		"Ã": "A",
		"Õ": "O",
		"À": "A",
		"Ç": "C"
	};
	return this.replace(/[\u00e0-\u00fa]/gi, function (a) {
		return "undefined" != typeof b[a] ? b[a] : a
	})
}
);
Array.prototype.indexOf || (Array.prototype.indexOf = function (d, e) {
	var a;
	if (null == this)
		throw new TypeError('"this" is null or not defined');
	var c = Object(this)
		, b = c.length >>> 0;
	if (0 === b)
		return -1;
	a = +e || 0;
	Infinity === Math.abs(a) && (a = 0);
	if (a >= b)
		return -1;
	for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) {
		if (a in c && c[a] === d)
			return a;
		a++
	}
	return -1
}
);
try {
	var Common = {
		run: function () { },
		init: function () {
			Common.applyMosaicBanners();
			Common.qdOverlay();
			Common.accessoriesFix();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();
			Common.applyShelfColors();
			Common.applyCarouselShelf();
			Common.newsFlagToTop();
			Common.saveAmountFix();
			Common.applyInstitutionalMenuMobile();
			Common.applySmartCart();
			Common.fixPlaceholderSearch();
			Common.applyTipBarCarousel();
			Common.checkLogin();
			Common.openSearchModal();
			Common.setDataScrollToggle();
			Common.scrollHeader();
			Common.smartAutoComplete();
			Common.vtexBindQuickViewDestroy();
			Common.searchOpenMob();
			Common.fixLinkTel();
			Common.selectSmartResearch2();
			Common.putZopimLinkOnHelp()
		},
		ajaxStop: function () {
			Common.appendSkuPopUpCloseBtn();
			Common.applyShelfColors();
			Common.saveAmountFix()
		},
		windowOnload: function () {
			Common.redirectAccount();

		},
		qdOverlayClass: "qd-am-on qd-cart-show qd-sn-on",
		qdOverlay: function () {
			$(".components-qd-v1-overlay").click(function () {
				$(document.body).removeClass(Common.qdOverlayClass)
			})
		},
		putZopimLinkOnHelp: function () {
			$('.footer-qd-v1-menu-list a[title="Ajuda"]').attr("href", "");
			$('.footer-qd-v1-menu-list a[title="Ajuda"]').attr("href", "javascript:$zopim.livechat.window.show();")
		},
		scrollHeader: function () {
			if ($(document.body).is(".resultado-busca") || $(document.body).is(".departamento") || $(document.body).is(".categoria") || $(document.body).is(".marca")) {
				return
			}
			var tamTela = $(window).width();
			if (tamTela <= 1201) {
				var didScroll;
				var lastScrollTop = 0;
				var delta = 5;
				var navbarHeight = $(".header-qd-v1").outerHeight();
				$(window).scroll(function (event) {
					didScroll = true
				});
				setInterval(function () {
					if (didScroll) {
						hasScrolled();
						didScroll = false
					}
				}, 250);
				function hasScrolled() {
					var st = $(this).scrollTop();
					if (Math.abs(lastScrollTop - st) <= delta)
						return;
					if (st > lastScrollTop && st > navbarHeight) {
						$(".header-qd-v1").removeClass("nav-down").addClass("nav-up")
					} else {
						if (st + $(window).height() < $(document).height()) {
							$(".header-qd-v1").removeClass("nav-up").addClass("nav-down")
						}
					}
					lastScrollTop = st
				}
			}
		},
		vtexBindQuickViewDestroy: function () {
			window.bindQuickView = function () { }
		},
		accessoriesFix: function () {
			if (!$(document.body).is(".produto"))
				return;
			$("fieldset >.buy-product-checkbox").parent().each(function () {
				var $t = $(this);
				$t.add($t.prev("ul")).wrapAll('<div class="accessories-qd-v1-item col-xs-12 col-sm-6 col-md-3"/>')
			})
		},
		appendSkuPopUpCloseBtn: function () {
			if ($(".modal-qd-v1-box-popup-close").length >= 1)
				return;
			$('<span class="modal-qd-v1-box-popup-close">Fechar</span>').insertBefore(".boxPopUp2 .selectSkuTitle");
			$(".modal-qd-v1-box-popup-close").click(function () {
				$(window).trigger("vtex.modal.hide");
				return false
			})
		},
		applyMosaicBanners: function () {
			$(".mosaic-qd-v1-wrapper .box-banner").QD_mosaicBanners({
				classFourColumn: "col-xs-6 com-sm-4 col-md-2"
			})
		},
		searchOpenMob: function () {
			if ($(window).width() < 992) {
				$("div.modal-qd-v1-search, div.qd-v1-modal").removeClass("fade");
				$(".header-qd-v1-action-search").click(function () {
					$(this).parent().removeAttr("href");
					$(document.body).toggleClass("qd-sc-on");
					$(".modal-qd-v1-search-wrap .fulltext-search-box").focus()
				})
			}
		},
		applySmartCart: function () {
			$(".header-qd-v1-cart").append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');
			$(document.body).append('<div class="smart-cart-qd-v2-wrapper"><div class="qd-sc-wrapper"></div></div>');
			var wrapper = $(".qd-sc-wrapper");
			$.QD_smartCart({
				selector: wrapper,
				dropDown: {
					texts: {
						linkCart: "Finalizar compra",
						cartTotal: '<span class="qd-infoTotalItems"><span class="qd-ddc-infoTotalShipping"><b>#shipping</b></span>Itens: #items</span><span class="qd-infoTotalValue">Total: #value</span>'
					},
					updateOnlyHover: false,
					smartCheckout: true,
					callback: function () {
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Meu carrinho</h3></div>');
						wrapper.find(".qd_ddc_continueShopping").after(wrapper.find(".qd-ddc-viewCart"))
					},
					skuName: function (data) {
						return data.name + " - " + data.skuName.replace(data.name, "")
					},
					callbackProductsList: function () {
						wrapper.find(".qd-ddc-prodQtt").each(function () {
							var $t = $(this);
							$t.add($t.next(".qd-ddc-prodRemove")).wrapAll('<div class="qd-ddc-prodAction"></div>')
						})
					}
				},
				buyButton: {
					buyButton: "body .prateleira:not(.qd-am) .buy-button"
				}
			});
			var notNum = /[^\d]/g;
			window._QuatroDigital_CartData.callback.add(function () {
				$(".qd-ddc-info").removeClass("qd-ddc-totalZero").removeClass("qd-ddc-shippingZero");
				var total = window._QuatroDigital_CartData.allTotal.replace(notNum, "");
				var shipping = window._QuatroDigital_CartData.shipping.replace(notNum, "");
				if (isNaN(total) || total == 0)
					$(".qd-ddc-info").addClass("qd-ddc-totalZero");
				if (isNaN(shipping) || shipping == 0)
					$(".qd-ddc-info").addClass("qd-ddc-shippingZero")
			});
			window._QuatroDigital_prodBuyCallback = function (jqXHR, textStatus, prodLink, skus) {
				$.fn.simpleCart(true);
				$(".shelf-qd-v1-buy-button-modal").modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0])
			}
				;
			$(".header-qd-v1-cart-link").click(function (evt) {
				evt.preventDefault();
				$(document.body).toggleClass("qd-cart-show");
				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css("max-height", $(window).height() - 213)
			});
			$(".qd_ddc_lightBoxClose").click(function (evt) {
				$(document.body).removeClass(Common.qdOverlayClass)
			})
		},
		redirectAccount: function () {
			setTimeout(function () {
				if (vtexjs.checkout.orderForm && !vtexjs.checkout.orderForm.loggedIn) {
					$(".header-qd-v1-user-action-links a, .qd-am-elem-meus-pedidos a").on("click", function (e) {
						e.preventDefault();
						vtexid.start()
					})
				}
			}, 500);
			$("#edit-address-button").click(function () {
				vtexid.start()
			})
		},
		smartAutoComplete: function () {
			$(".fulltext-search-box").QD_smartAutoComplete({
				jqueryUI: {
					appendTo: ".header-qd-v1-search-wrap"
				}
			})
		},
		fixPlaceholderSearch: function () {
			var idSearchFilterP = $('.header-qd-v1-search-wrap input[type="text"].fulltext-search-box');
			if (!idSearchFilterP.length)
				return;
			var idSearchFilter = idSearchFilterP.attr("id").replace("ftBox", "");
			enableFullTextSearchBox("ftBox" + idSearchFilter, "ftDept" + idSearchFilter, "ftIdx" + idSearchFilter, "ftBtn" + idSearchFilter, "/SEARCHTERM?&utmi_p=_&utmi_pc=BuscaFullText&utmi_cp=SEARCHTERM", "Buscar")

			setTimeout(() => {
				$('.header-qd-v1-search-wrap .btn-buscar').unbind().click(e => {
					e.preventDefault();
					const input = $('.header-qd-v1-search-wrap input[type="text"].fulltext-search-box');

					const DEFAULT = {
						Initial: 'Buscar',
						Invalid: 'Informe o produto que deseja procurar'
					};

					const isIllegalTerm = input.val() === DEFAULT.Initial || input.val() === DEFAULT.Invalid || input.val() === '';

					if (isIllegalTerm) {
						input.val('Informe o produto que deseja procurar');

						input.unbind('focus');
						input.unbind('blur');

						input.focus(function () {
							$(this).filter(function () {
								return isIllegalTerm
							}).val('');
						});

						input.blur(function () {
							$(this).filter(function () {
								return $(this).val() === '';
							}).val(isIllegalTerm ? DEFAULT.Invalid : DEFAULT.Initial);
						});

						$(".header-qd-v1-search-wrap").css('border-color', '#E74C3C');
					} else {
						const id = input.attr('id').replace("ftBox", "");

						doSearch(
							"ftBox" + id,
							"ftDept" + id,
							"ftIdx" + id,
							"/SEARCHTERM?&utmi_p=_&utmi_pc=BuscaFullText&utmi_cp=SEARCHTERM",
							"Buscar"
						);
					}
				});
			}, 1000);
		},
		applyAmazingMenu: function () {
			$(".header-qd-v1-amazing-menu, .footer-qd-v1-menu-list").QD_amazingMenu()
		},
		applyAmazingMenuMobile: function () {
			var wrapper = $(".header-qd-v1-amazing-menu-mobile");
			wrapper.find("> ul > li > ul").prepend(function () {
				return $(this).prev().clone().wrap("<li></li>").parent()
			});
			wrapper.QD_amazingMenu({
				callback: function () {
					$('<span class="qd-am-dropdown-trigger"></span>').appendTo(wrapper.find(".qd-am-has-ul")).click(function () {
						var $t = $(this);
						$.merge($t.parent(), $t.closest("ul")).toggleClass("qd-am-is-active");
						$t.filter(function () {
							return !$(this).closest("ul").is(".qd-amazing-menu")
						}).siblings("ul").stop(true, true).slideToggle()
					});
					wrapper.find("nav > ul > li > .qd-am-dropdown-trigger").click(function () {
						$(".header-qd-v1-amazing-menu-mobile").addClass("qd-am-is-active");
						$(".header-qd-v1-amazing-menu-mobile").animate({
							scrollTop: 0
						}, 2e3)
					})
				}
			});
			$(".header-qd-v1-amazing-menu-trigger").click(function (evt) {
				evt.preventDefault();
				$(document.body).toggleClass("qd-am-on")
			});
			$(".header-qd-v1-amazing-menu-mobile .header-qd-v1-user-message").on("click", "a#login", function () {
				$(document.body).removeClass("qd-am-on")
			});
			$(".components-qd-v1-overlay").append('<span class="close-mobile-amazing-menu-mobile"><i class="fa fa-times"></i></span><div class="header-qd-v1-close-amazing-menu-mobile"></div>');
			$(".close-mobile-amazing-menu-mobile > i").click(function (evt) {
				$(document.body).removeClass(Common.qdOverlayClass)
			})
		},
		applyInstitutionalMenuMobile: function () {
			$(".footer-qd-v1-menu-list p.qd_am_text").each(function () {
				var $t = $(this);
				var blockArrow = $('<div class="footer-qd-v1-menu-arrowBlock"><div></div></div>');
				blockArrow.insertAfter($t)
			});
			$(".footer-qd-v1-menu-list .footer-qd-v1-menu-arrowBlock div").click(function () {
				var $t = $(this);
				$t.toggleClass("MZf-setUp");
				$t.parent().next().slideToggle()
			})
		},
		applyTipBarCarousel: function () {
			var wrapper = $(".tip-bar-qd-v1-carousel");
			if (!wrapper.length)
				return;
			wrapper.slick({
				arrows: false,
				autoplay: true,
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: true,
				draggable: false,
				responsive: [{
					breakpoint: 1200,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				}, {
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}]
			})
		},
		applyCarouselShelf: function () {
			var wrapper = $(".carousel-qd-v1-shelf .prateleira");
			if (!wrapper.length)
				return false;
			wrapper.each(function () {
				var $t = $(this);
				$t.find("h2").prependTo($t.parent())
			});
			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: true,
				draggable: false,
				speed: 200,
				responsive: [{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					}
				}, {
					breakpoint: 991,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				}]
			})
		},
		applyShelfColors: function () {
			$('.prateleira:not([id*="ResultItems"])').QD_coresPrateleira({
				dimensions: ["Selecione o Tamanho"],
				thumbsQuantity: 3,
				minSkuQttShow: 1,
				thumbSize: {
					width: 47,
					height: 47
				},
				checkDuplicateUri: false
			})
		},
		saveAmountFix: function () {
			$(".shelf-qd-v1-highlight-discount-percentage:not(.qd-on)").addClass("qd-on").each(function () {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + "%")
			})
		},
		openSearchModal: function () {
			$(".header-qd-v1-action-search").click(function () {
				$(".modal-qd-v1-search").modal();
				return false
			})
		},
		setDataScrollToggle: function () {
			$(document.body).attr("data-qd-scroll-limit", "100, 300")
		},
		newsFlagToTop: function () {
			$(".flag.desconto, .shelf-qd-v1-highlight-discount-percentage").each(function () {
				$t = $(this);
				$t.prependTo($t.parent())
			})
		},
		checkLogin: function () {
			var wrapper = $(".header-qd-v1-user-action-login");
			$.qdAjax({
				url: "/no-cache/profileSystem/getProfile",
				dataType: "json",
				clearQueueDelay: null,
				success: function (data) {
					try {
						if (data.IsUserDefined) {
							var emailReceived = data.Email;
							var nameUser = data.FirstName.length ? data.FirstName : emailReceived.match(/([^{0-9}|.|@|-]+)/).pop();
							wrapper.html('<div class="logout"><span>OlÃ¡, </span> <span class="header-name-user">' + nameUser + ". " + '</span> <a id="logout" href="/no-cache/user/logout">Sair</a></div>')
						} else {
							wrapper.html('<p class="welcome"><a id="login">OlÃ¡, faÃ§a seu login.</a></p>');
							$(document.body).addClass("not-logged-user")
						}
					} catch (e) {
						if (typeof console !== "undefined" && typeof console.info === "function")
							console.info("Ops, algo saiu errado com o login.", e.message)
					}
				}
			});
			$(".header-qd-v1-user-action-login").click(function () {
				$("body").removeClass("qd-am-on");
				$("body").addClass("overflowHidden")
			});
			$(window).on("rendered.vtexid", function () {
				$(".vtexIdUI-close").click(function () {
					$("body").removeClass("overflowHidden")
				})
			})
		},
		fixLinkTel: function () {
			var linkTel = $('[href^="tel:"]');
			linkTel.each(function (index, el) {
				$(el).attr("href", $(el).attr("href").split("?")[0])
			})
		},
		selectSmartResearch2: function () {
			try {
				if (!$.fn.select2 || !$.fn.QD_SelectSmartResearch2) {
					$(".filter-bar-qd-v1, .filter-qd-v1-wrapper .searchoptionswrapper, .filter-qd-v1-wrapper h2").hide();
					return
				}
				window.QD_SelectSmartResearch2_is_loaded = false;
				var url, map = {};
				$.ajax({
					url: "/busca?lid=bf120500-baab-4185-8b70-cc630f7d1c70",
					dataType: "html"
				}).done(function (data) {
					var qttRegex = /\s+\([0-9]+\)$/;
					var values = [];
					$(data).find(".search-single-navigator ul").find("a").each(function () {
						var $t = $(this);
						var currentUrl = $t.attr("href") || "";
						if (currentUrl.length > 0 && currentUrl.indexOf("map=") < 0) {
							var currentPathname = $('<a href="' + $t.attr("href") + '"></a>')[0].pathname;
							var categories = currentPathname.split("/").map(function () {
								return "c"
							}).slice(0, -1).join(",");
							currentUrl += "?map=" + categories
						}
						values.push([$t.text().trim().replace(qttRegex, ""), currentUrl])
					});
					values = values.sort();
					$(".filter-qd-v1-wrapper .searchoptionswrapper").QD_SelectSmartResearch2({
						options: [values, "lid=bf120500-baab-4185-8b70-cc630f7d1c70", "lid=bf120500-baab-4185-8b70-cc630f7d1c70", "lid=bf120500-baab-4185-8b70-cc630f7d1c70"],
						optionsPlaceHolder: [Common.garageVars.piece.name, Common.garageVars.automaker.name, Common.garageVars.vehicle.name, Common.garageVars.year.name],
						select2: {
							allowClear: true,
							selectOnClose: false
						},
						disabledMessage: function (index, options, optionsPlaceHolder) {
							var currentPlaceholder = optionsPlaceHolder[index];
							var placeholder = currentPlaceholder;
							if (currentPlaceholder == Common.garageVars.year.name)
								placeholder = "Ano";
							else if (currentPlaceholder == Common.garageVars.automaker.name)
								placeholder = "Montadora";
							else if (currentPlaceholder == Common.garageVars.vehicle.name)
								placeholder = "VeÃ­culo";
							else if (currentPlaceholder == Common.garageVars.piece.name)
								placeholder = "PeÃ§a";
							return placeholder
						},
						labelMessage: function (index, options, optionsPlaceHolder) {
							var currentPlaceholder = optionsPlaceHolder[index];
							var placeholder = currentPlaceholder;
							if (currentPlaceholder == Common.garageVars.year.name)
								placeholder = "Ano";
							else if (currentPlaceholder == Common.garageVars.automaker.name)
								placeholder = "Montadora";
							else if (currentPlaceholder == Common.garageVars.vehicle.name)
								placeholder = "VeÃ­culo";
							else if (currentPlaceholder == Common.garageVars.piece.name)
								placeholder = "PeÃ§a";
							return placeholder
						},
						redirect: function (newUrl) {
							$(".filter-qd-v1-products-button.btn").toggleClass("active");
							var url = new QD_VtexUrlParse(newUrl);
							if (location.search.toLowerCase().indexOf("map=c") > -1) {
								url.mergeUrl(location.href)
							} else {
								url.getMap();
								var redirectUrl = url.getUrl({
									ft: true
								});
								if (!redirectUrl || redirectUrl == "//?")
									return;
								$(".filter-qd-v1-products-button.btn").attr("href", redirectUrl)
							}
						},
						optionIsChecked: function (optionPlaceHolder) {
							var wrapper = $(".filter-qd-v1-wrapper .searchoptionswrapper");
							if (!window.QD_SelectSmartResearch2_is_loaded) {
								wrapper.each(function () {
									var $t = $(this);
									var wrapper = $t.find(".qd-ssr2-option-wrapper:first");
									var placeholder = wrapper.find("label:first").text();
									wrapper.find(".select2-container .select2-selection__placeholder").html(placeholder)
								});
								$(window).on("select2:select", function (e) {
									if (!e.target)
										return;
									if (!$(e.target).val().length)
										return;
									$(".filter-qd-v1-products-button.btn").attr("href", $(e.target).val())
								});
								$(window).on("select2:unselect select2:clear", function (e) {
									if (!e.target)
										return;
									var prevSelect = $(e.target).closest(".qd-ssr2-option-wrapper").prev(".qd-ssr2-option-wrapper");
									if (!prevSelect.length)
										$(".filter-qd-v1-products-button.btn").attr("href", "#");
									$(".filter-qd-v1-products-button.btn").attr("href", prevSelect.find(".select2-hidden-accessible").val())
								});
								$(window).on("select2:open", function (e) {
									var currentPlaceholder = $(e.target).attr("data-qdssr-title");
									if (!e.target || !currentPlaceholder)
										return;
									var placeholder = currentPlaceholder;
									if (currentPlaceholder == Common.garageVars.year.name)
										placeholder = "Ano";
									else if (currentPlaceholder == Common.garageVars.automaker.name)
										placeholder = "Montadora";
									else if (currentPlaceholder == Common.garageVars.vehicle.name)
										placeholder = "VeÃ­culo";
									else if (currentPlaceholder == Common.garageVars.piece.name)
										placeholder = "PeÃ§a";
									$(".select2-dropdown .select2-search__field").attr("placeholder", function (i, val) {
										return "Digite " + placeholder.toLowerCase() + " aqui:"
									})
								});
								window.QD_SelectSmartResearch2_is_loaded = true
							}
							if (typeof optionPlaceHolder === "undefined")
								return null;
							var value = $("h5." + optionPlaceHolder.trim().replace(/\s/gi, ".") + " +ul .filtro-ativo:first").text().trim().replace(qttRegex, "");
							if (value.length)
								return value;
							if (!url && location.search.toLowerCase().indexOf("map=") > -1) {
								url = new QD_VtexUrlParse(location.href);
								var urlMap = url.getMap();
								map[Common.garageVars.year.name] = decodeURIComponent(urlMap.map[Common.garageVars.year.spec] || "");
								map[Common.garageVars.automaker.name] = decodeURIComponent(urlMap.map[Common.garageVars.automaker.spec] || "");
								map[Common.garageVars.vehicle.name] = decodeURIComponent(urlMap.map[Common.garageVars.vehicle.spec] || "");
								var pieceName = $(".breadcrumb-qd-v1").find("li:eq(3) a").length ? $(".breadcrumb-qd-v1").find("li:eq(3) a").text() : urlMap.map[Common.garageVars.piece.spec];
								map[Common.garageVars.piece.name] = decodeURIComponent(pieceName || "")
							}
							value = map[optionPlaceHolder] || "";
							return value.length ? value : null
						},
						getAjaxOptions: function (requestData, $select) {
							var values = [];
							if (!$select || !$select.length)
								return values;
							var $title = $select.attr("data-qdssr-title").trim();
							$(requestData).find(".search-single-navigator ul." + $title.replace(/\s/gi, ".")).find("a").each(function () {
								var $t = $(this);
								var text = $t.text().trim().replace(qttRegex, "");
								var href = $t.attr("href");
								values.push([text.trim(), href || ""])
							});
							$(window).on("QuatroDigital.ssrSelectAjaxPopulated", function (e, next) {
								var placeholder = $(next).prev("label").text();
								$(next).next(".select2-container").find(".select2-selection__placeholder").html(placeholder)
							});
							if ($title == Common.garageVars.year.name)
								return values.sort().reverse();
							else
								return values.sort()
						}
					});
					$(window).on("QuatroDigital.ssrChange", function (e, next, manualChange) {
						var $next = $(next);
						if (!manualChange || !$next.length)
							return;
						var prevSelect = $next.closest(".qd-ssr2-option-wrapper").prev(".qd-ssr2-option-wrapper");
						if (!prevSelect.length || !prevSelect.find(".select2-hidden-accessible").val())
							return;
						$(window).one("QuatroDigital.ssrSelectAjaxPopulated", function (e, next) {
							$next.select2("open")
						})
					});
					$(".filter-qd-v1-wrapper select").on("select2:opening", function (event) {
						var $select = $(event.target);
						$(document).off("keydown.select2").on("keydown.select2", function (e) {
							var highlighted = $select.data("select2").$dropdown.find(".select2-results__option--highlighted");
							if (e.which === 9) {
								if (highlighted.length) {
									var id = highlighted.data("data").id;
									$select.val(id).trigger("change");
									$select.trigger("select2:select")
								}
								$(document).off("keydown.select2")
							}
						})
					})
				})
			} catch (e) {
				typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: " + e.message)
			}
		},
		garageVars: {
			department: ["86"],
			year: {
				name: "Ano",
				displayName: "Ano",
				spec: "specificationFilter_48"
			},
			automaker: {
				name: "Montadora",
				displayName: "Montadora",
				spec: "specificationFilter_36"
			},
			vehicle: {
				name: "VeÃ­culo",
				displayName: "VeÃ­culo",
				spec: "specificationFilter_50"
			},
			piece: {
				name: "PeÃ§a",
				displayName: "PeÃ§a",
				spec: "c"
			}
		}
	};
	var Home = {
		init: function () {
			Home.sliderFull();
			Home.applyBrandCarousel();
			Home.applySpecialShelfCarousel();
			Home.applyBannerTargetBlank()
		},
		ajaxStop: function () { },
		windowOnload: function () { },
		sliderFull: function () {
			var wrapper = $(".slider-qd-v1-full");
			wrapper.slick({
				dots: true,
				fade: true,
				cssEase: "linear",
				infinite: true,
				speed: 500,
				autoplay: true,
				autoplaySpeed: 7e3,
				draggable: false
			});
			wrapper.find(".slick-dots button").text(function () {
				return wrapper.find('.box-banner[aria-describedby="' + $(this).parent().attr("id") + '"] img').attr("alt")
			})
		},
		applyBrandCarousel: function () {
			var wrapper = $(".brands-qd-v1-carousel");
			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 6,
				slidesToScroll: 6,
				infinite: true,
				speed: 700,
				responsive: [{
					breakpoint: 1200,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4
					}
				}, {
					breakpoint: 991,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					}
				}, {
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}]
			})
		},
		applySpecialShelfCarousel: function () {
			var wrapper = $(".home-qd-v1-special-carousel-banner");
			if (!wrapper.length)
				return false;
			var hasBanner = wrapper.find(".box-banner").length;
			if (!hasBanner)
				wrapper.find('[class*="col-md-"]').removeClass().addClass("col-xs-12");
			wrapper.each(function () {
				var $t = $(this);
				$t.find("h2").prependTo($t)
			});
			var slideCount = hasBanner ? 3 : 4;
			wrapper.find(".prateleira").slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: slideCount,
				slidesToScroll: slideCount,
				infinite: true,
				draggable: false,
				speed: 700,
				responsive: [{
					breakpoint: 1200,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				}, {
					breakpoint: 550,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}]
			})
		},
		applyBannerTargetBlank: function () {
			$(".banner-qd-v1-responsive .row.qd-mb-row:last-child .box-banner:last-child a").attr("target", "_blank");
			$(".banner-qd-v1-responsive .row.qd-mb-row:last-child .box-banner:not(:last-child) a").attr("href", "javascript:$zopim.livechat.window.show();")
		}
	};
	var Search = {
		init: function () {
			Search.setSubCategories();
			Search.applySearchResult();
			Search.openFiltersMenu();
			Search.shelfLineFix();
			Search.applySmartResearch();
			Search.filtredItensSmartResearch();
			Search.toggleVisibilityExtendedMenu();
			Search.loadSearchParameters();
			Search.hideEmptyTerm()
		},
		hideEmptyTerm: function () {
			var term = $(".resultado-busca-termo");
			if (!term.length)
				return;
			if (!term.find(".value").is(":empty")) {
				term.addClass("has-value")
			}
		},
		ajaxStop: function () {
			Search.shelfLineFix()
		},
		windowOnload: function () {
			Search.setpageHeading();
			Search.loadSearchParameters()
		},
		toggleVisibilityExtendedMenu: function () {
			var wrapper = $(".search-single-navigator, .search-multiple-navigator");
			wrapper.find("h4, h5").click(function (evt) {
				var $t = $(this);
				if ($(evt.target).is(wrapper.find("h4")) || $(evt.target).is(wrapper.find("h5"))) {
					const filterName = $t.text();
					const maxFilterItemsQuantityToShow=5;
					var currentFilterItems = $t.find("+ div").find('label');
					$t.find("+ div").slideToggle(100, function () {
						$t.toggleClass("qd-seach-active-menu");
					})
					if (currentFilterItems.length > maxFilterItemsQuantityToShow
						&& filterName == 'Ano' ){
						yearFilter = $(".search-multiple-navigator fieldset[data-qd-class='ano'] div");
						yearFilterHeight = yearFilter[0].scrollHeight;
						yearFilter.scrollTop(-yearFilterHeight);
					}
				}
			});
			$(".search-multiple-navigator h5").click(function () {
				$(this).siblings(".qd-viewMoreWrapper").toggle()
			});
			wrapper.find("li.filtro-ativo").each(function () {
				var $t = $(this);
				$t.parent().prev().addClass("qd-seach-active-menu")
			});
			wrapper.find("li.filtro-ativo").on("click", function () {
				$(this).parent().find("a.ver-filtros")[0].click()
			});
			//Fechar o filtro em mobile
			$(".search-qd-v1-navigator-mobile-results button, button.search-qd-v1-navigator-exit").click(function () {
				$(document.body).removeClass("qd-sn-on")
			})
		},
		shelfLineFix: function () {
			try {
				var exec = function () {
					var curTop;
					var wrapper = $("div[id*='ResultItems_'] >.prateleira:not('.qd-fi-on')").addClass("qd-fi-on");
					var shelf = wrapper.children("ul").removeClass("qd-first-line");
					shelf.first().addClass("qd-first-line");
					var setFirst = function () {
						shelf.each(function () {
							var $t = $(this);
							if ($t.is(".qd-first-line")) {
								curTop = $t.offset().top;
								shelf = shelf.not($t);
								return
							}
							var offsetTop = $t.offset().top;
							if (offsetTop >= curTop - 10 && offsetTop <= curTop + 10)
								shelf = shelf.not($t);
							else {
								$t.addClass("qd-first-line");
								return false
							}
						});
						if (shelf.length)
							setFirst()
					};
					setFirst()
				};
				exec();
				if (!window.qd_shelf_line_fix_) {
					$(window).on("QuatroDigital.sr_shelfCallback", exec);
					window.qd_shelf_line_fix_ = true
				}
				var resize = $._data(window).events.resize;
				var allowResize = true;
				if (resize)
					for (var i = 0; i < resize.length; i++) {
						if (resize[i].namespace == "qd") {
							allowResize = false;
							break
						}
					}
				if (allowResize) {
					var timeOut = 0;
					$(window).on("resize.qd", function () {
						clearTimeout(timeOut);
						timeOut = setTimeout(function () {
							$(".qd-first-line").removeClass(".qd-first-line");
							exec()
						}, 20)
					})
				}
			} catch (e) {
				typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: " + e.message)
			}
		},
		setpageHeading: function () {
			var headingElement = $(".search-qd-v1-navigator-title h2");
			var searchResult = $(".resultado-busca-termo .value").first().text();
			if (!$("h1").length)
				headingElement.replaceWith(function () {
					$t = $(this);
					return "<h1" + ($t.attr("class") ? ' class="' + $t.attr("class") + '"' : "") + ">" + $t.text() + "</h1>"
				})
		},
		applySearchResult: function () {
			var searchTitle = $(".search-qd-v1-navigator-title h2");
			if (searchTitle.text().indexOf("Resultado da Busca") != -1)
				searchTitle.text($(".resultado-busca-termo .value").first().text() || "Autoglass")
		},
		setSubCategories: function () {
			$(".search-qd-v1-navigator .navigation-tabs h4").filter(function () {
				return $(this).next().children().length
			}).addClass("qd-has-sub-category")
		},
		openFiltersMenu: function () {
			$(".search-qd-v1-navigator-trigger").click(function (e) {
				e.preventDefault();
				$(document.body).toggleClass("qd-sn-on")
			})
		},
		applySmartResearch: function () {
			$('.search-qd-v1-navigator-research input[type="checkbox"]').QD_SmartResearch({
				filtersMenu: ".search-multiple-navigator",
				invertOrder: true,
				shelfCallback: function () {
					Search.replyEventFilterToFiltered()
				}
			})
		},
		filtredItensSmartResearch: function () {
			$(".search-multiple-navigator label").each(function () {
				var $t = $(this);
				var srBox = $t.find(".sr_box");
				srBox.insertBefore(srBox.siblings("input"))
			});
			$(".search-multiple-navigator .filtro_marca label").each(function () {
				var $t = $(this);
				var thisText = $t.text().trim();
				$t.find("input").val(thisText)
			});
			$('.search-multiple-navigator input[type="checkbox"]').click(function (e) {
				var $t = $(e.target);
				var filterName = $t.parent().text().trim();
				var thisFilterPrice = $t.parent().parent().parent();
				if ($('div[data-name="' + filterName + '"]').length) {
					$('div[data-name="' + filterName + '"]').remove()
				} else {
					if (thisFilterPrice.hasClass("filtro_faixa-de-preco")) {
						$t.val($t.parent().text().trim())
					} else if (thisFilterPrice.hasClass("filtro_marca")) { }
					var itemFiltered = $("<div class='block-iltered'><span class='filtered'>" + filterName + "</span></div>");
					itemFiltered.attr("data-name", filterName);
					$(".search-qd-v1-navigator-research-filtered").append(itemFiltered)
				}
			});
			$(".search-qd-v1-navigator-research-filtered").on("click", "span", function () {
				var $t = $(this);
				$t.parent().remove()
			})
		},
		replyEventFilterToFiltered: function () {
			$(".search-qd-v1-navigator-research-filtered .block-iltered").bind("click", function () {
				var inputName = $(this).attr("data-name");
				$('label.sr_selected input[value="' + inputName + '"]').click()
			})
		},
		applyResetFilters: function () {
			$('<button id="removeFilter">Remover Filtros</button>').insertBefore($(".search-qd-v1-navigator-research"));
			$(".search-qd-v1-navigator").on("click", "#removeFilter", function () {
				console.log(partialSearchUrl)
			})
		},
		loadSearchParameters: function () {
			var getUrlParameter = function getUrlParameter(sParam) {
				var sPageURL = window.location.search.substring(1), sURLVariables = sPageURL.split("&"), sParameterName, i;
				for (i = 0; i < sURLVariables.length; i++) {
					sParameterName = sURLVariables[i].split("=");
					if (sParameterName[0] === sParam) {
						return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1])
					}
				}
			};
			var termo = getUrlParameter("ft");
			if(termo) { $("#busca-ft span:empty").text(termo + "."); }
		}
	};
	var Product = {
		run: function () { },
		init: function () {
			Product.accessoriesFix();
			Product.forceImageZoom();
			Product.openShipping();
			Product.saveAmountFlag();
			Product.setAvailableBodyClass();
			Product.scrollToDescription();
			Product.collapseDescription();
			Product.removeBuyButtonAlert();
			Product.smartBuyButton();
			Product.applySmartQuantity();
			// Product.scrollToBuyButton();
			Product.applyConfigsInstallationModals();
			Product.applyOverlayToggle();
		},
		ajaxStop: function () { },
		windowOnload: function () {
			if ($(document).hasClass("mz-product-unavailable"))
				return;
			Product.changePositionComponentsAcessories();
			Product.applyCheckedInstallation();
			Product.instoreInstallation();
			Product.bringInstallementTreatsData()
		},
		mzOverlayClass: "mz-in-on mz-as-on mz-bo-on",
		accessoriesFix: function () {
			$("fieldset >.buy-product-checkbox").parent().each(function () {
				var $t = $(this);
				$t.add($t.prev("ul")).wrapAll('<div class="accessories-qd-v1-item col-xs-12 col-sm-6 col-md-3"/>');
				$t.attr("id", "accessorySelect")
			});
			$("#accessorySelect").appendTo(".acessories-qd-v1-price");
			if (!$(".product-qd-v1-installation").find("p").length) {
				$(".product-qd-v1-installation").css("display", "none")
			}
			$(".acessories-qd-v1-name a").removeAttr("href");
			$("a.qd-am-change-departament").removeAttr("href")
		},
		setAvailableBodyClass: function () {
			function checkVisibleNotify(available) {
				if (available)
					$(document.body).addClass("mz-product-available").removeClass("mz-product-unavailable");
				else
					$(document.body).addClass("mz-product-unavailable").removeClass("mz-product-available")
			}
			$(document).on("skuSelected.vtex", function (e, id, sku) {
				checkVisibleNotify(sku.available)
			});
			checkVisibleNotify(skuJson.available)
		},
		smartBuyButton: function () {
			$(".product-qd-v1-buy-button.buy-button").QD_buyButton({
				buyButton: ".product-qd-v1-buy-button.buy-button .buy-button"
			})
		},
		applySmartQuantity: function () {
			$(".product-qd-v1-smart-qtt:not(.qd-on), .product-qd-v1-fixed-bar .product-qd-v1-buy-button:not(.qd-on)").addClass("qd-on").QD_smartQuantity({
				buyButton: ".product-qd-v1-buy-button .buy-button, .product-qd-v1-fixed-bar .product-qd-v1-buy-button .buy-button"
			})
		},
		scrollToBuyButton: function () {
			$(".product-qd-v1-fixed-bar .buy-button").click(function (e) {
				e.preventDefault();
				$("html, body").stop().animate({
					scrollTop: $(".product-qd-v1-sku-selection-wrapper").offset().top - 95
				}, 900, "swing")
			})
		},
		collapseDescription: function () {
			$(".product-qd-v1-description .title-qd-v1, .product-qd-v1-specification h4.Especificacoes").each(function () {
				var $t = $(this);
				var blockArrow = $('<div class="product-qd-v1-information-arrowBlock"><div></div></div>');
				blockArrow.insertAfter($t)
			});
			$(".product-qd-v1-information-arrowBlock div").click(function () {
				var $t = $(this);
				$t.toggleClass("MZf-setUp");
				$t.parent().next().slideToggle()
			})
		},
		forceImageZoom: function () {
			try {
				var orig = window.ImageControl;
				window.ImageControl = function () {
					$("ul.thumbs a").each(function () {
						var $t = $(this);
						if ($t.attr("zoom"))
							return;
						var rel = $t.attr("rel");
						if (rel)
							$t.attr("zoom", rel.replace(/(ids\/[0-9]+)[0-9-]+/i, "$1-1000-1000"))
					});
					orig.apply(this, arguments)
				}
			} catch (e) {
				typeof console !== "undefined" && typeof console.error === "function" && console.error("Ops, algo saiu errado como zoom :( . Detalhes: " + e.message)
			}
		},
		openShipping: function () {
			window.$zopim = function () { }
				;
			if (typeof window.ShippingValue === "function")
				window.ShippingValue()
		},
		setInputCursorPositionAtStart: function () {
			$("#txtCep").click(function () {
				$(this)[0].setSelectionRange(0, 0)
			})
		},
		saveAmountFlag: function () {
			var flag = $(".product-qd-v1-stamps-highlight-discount");
			$(window).on("skuSelected.vtex", function (e, sku, data) {
				if (!flag.length)
					flag = $('<div class="product-qd-v1-stamps-highlight-discount"></div>').prependTo(".product-qd-v1-stamps");
				if (data.listPrice > data.bestPrice)
					flag.text(parseInt(100 - data.bestPrice / data.listPrice * 100) + "%").show();
				else
					flag.hide()
			});
			if (skuJson.skus.length >= 1) {
				if (!flag.length)
					flag = $('<div class="product-qd-v1-stamps-highlight-discount"></div>').prependTo(".product-qd-v1-stamps");
				if (skuJson.skus[0].listPrice > skuJson.skus[0].bestPrice)
					flag.text(parseInt(100 - skuJson.skus[0].bestPrice / skuJson.skus[0].listPrice * 100) + "%").show()
			}
		},
		scrollToDescription: function () {
			$(".product-qd-v1-link-description").click(function (e) {
				e.preventDefault();
				$("html, body").stop().animate({
					scrollTop: $("#informacoes-gerais").offset().top - 88
				}, 400, "swing");
			})
		},
		removeBuyButtonAlert: function () {
			var data = $(".buy-in-page-button[productindex=0]").data("buyButton");
			if (!data)
				return;
			data.options.addMessage = ""
		},
		changePositionComponentsAcessories: function () {
			if (!skuJson.available)
				$(".product-qd-v1-installation").remove();
			var wrapperAccesories = $(".product-qd-v1-installation .n1colunas");
			if (!wrapperAccesories.length)
				return;
			else
				$(".product-qd-v1-installation").addClass("product-on");
			setTimeout(function () {
				$('#accessorySelect input[type="checkbox"]').trigger("click")
			}, 100);
			$('#accessorySelect input[type="checkbox"]').attr("checked", true);
			// setTimeout(function () {
			// 	var totalPrice = $(".accessories-qd-v1-wrapper .box-preco-atualizado .selected-value").text();
			// 	$(".mz-acessories__prices--totalPrice").text(totalPrice)
			// }, 2e3);
			$(".acessories-qd-v1-image-link").removeAttr("href");
			$(".acessories-qd-v1-image-link").css("cursor", "default")
		},
		applyCheckedInstallation: function () {
			var wrapperAccesories = $(".product-qd-v1-installation .n1colunas");
			if (!wrapperAccesories.length)
				return;
			var skuList = Product.captureSkuSelectors();
			var rxList = Product.regexList();
			var urlCart = "/checkout/cart/add?sku=" + skuList[0] + "&qty=1&seller=1&redirect=true&" + readCookie("VTEXSC") + "&sku=" + skuList[1] + "&qty=1&seller=1&redirect=true&" + readCookie("VTEXSC");
			$(".mz-accesories__button--buy").attr("href", urlCart);
			$(".mz-install__button--buy").attr("href", urlCart);
			$(".mz-advantages__button--buy").attr("href", urlCart)
		},
		captureSkuSelectors: function (skuMain, skuInstall) {
			var rxList = Product.regexList();
			var skusSelected = [];
			var skuIdMainProduct = $(".product-qd-v1-buy-button .buy-button[href]").attr("href");
			var skuMain = skuIdMainProduct.match(rxList[4])[0];
			skusSelected.push(skuMain);
			var skuInstallation = $(".product-qd-v1-installation-content #accessorySelect input[rel]").attr("rel");
			skusSelected.push(skuInstallation);
			return skusSelected
		},
		bringInstallementTreatsData: function () {
			var rxList = Product.regexList();
			var skuList = Product.captureSkuSelectors();
			//var stateText = $(".header-qd-v1-valid-prices-local b").text();
			var stateFormated = readCookie("myuf")
			var listStates = Product.listStates();
			for (var thisST in listStates) {
				if (thisST == stateFormated) {
					var data = {
						items: [{
							id: skuList[0],
							quantity: 1,
							seller: 1
						}, {
							id: skuList[1],
							quantity: 1,
							seller: 1
						}],
						postalCode: listStates[thisST].cep,
						country: "BRA"
					};
					let vtexsc = readCookie('VTEXSC').replace('sc=', '');

					$.ajax({
						url: `/api/checkout/pub/orderForms/simulation?sc=${vtexsc}`,
						type: "POST",
						dataType: "JSON",
						contentType: "application/json",
						data: JSON.stringify(data)
					}).done(function (data) {
						var installmentsList = data.paymentData.installmentOptions[0].installments;
						var config = Product.getNumberOfInstallments(data.items);
						if (document.querySelector('.mz-prices__block') === null
						|| document.querySelector('.mz-prices__block:empty'))
						{
							Product.renderDataInInstallements(installmentsList, config);
						}
					})
				}
			}
		},
		getNumberOfInstallments(items) {
			const [sku1 = 0, sku2 = 0] = items.map(x => x.price);
			const priceToPay = (sku1 + sku2) / 100;

            let priceToPayFormatted = 'R$ ' + qd_number_format(priceToPay, 2, ',', '.');

            $(".accessories-qd-v1-wrapper .box-preco-atualizado .selected-value")
                .text(priceToPayFormatted);
            $(".mz-acessories__prices--totalPrice")
                .text(priceToPayFormatted);

			if (priceToPay > 200 && priceToPay <= 500) {
				const number = +priceToPay.toString()[0];

				return {
					number,
					price: qd_number_format(priceToPay / number, 2, ',', '.')
				}
			} else if (priceToPay > 500) {
				return {
					number: 5,
					price: qd_number_format(priceToPay / 5, 2, ',', '.')
				};
			} else {
				return { number: 0 };
			}
		},
		renderDataInInstallements: function (installement, config) {
			var wrapperPrice = $(".mz-acessories__prices");
			var largestShare = installement.pop();
			var largestShareValue = largestShare.value = largestShare.value.toString();
			largestShareValue = qd_number_format(largestShareValue / 100, 2, ",", ".");
			var firstByForPrice = parseFloat(largestShare.total) + parseFloat(largestShare.value);
			firstByForPrice = qd_number_format(firstByForPrice / 100, 2, ",", ".");
			var lineByFor = $('<span class="mz-acessories__prices--byfor">R$ ' + firstByForPrice + "</span>");
			lineByFor.insertBefore($(".mz-acessories__prices--totalPrice"));

			if (config.number > 1) {
				var installmentBlock = '<div class="mz-prices__block"><span class="text">ou </span><span class="mz-number-installment"> ' + config.number + 'X</span><span class="text"> de </span><span class="mz-number-value">R$ ' + config.price + "</span></div>";
				wrapperPrice.append(installmentBlock);
			}
		},
		applyConfigsInstallationModals: function () {
			$(".mz-accesories__name--conditions").click(function () {
				$(document.body).addClass("mz-in-on");
				$(document.body).addClass("mz-bo-on")
			});
			$(".mz-accesories__advantages--button").click(function () {
				$(document.body).addClass("mz-as-on");
				$(document.body).addClass("mz-bo-on")
			});
			$(".mz-install__close--button, .mz-advantages__close--button").click(function () {
				$(document.body).removeClass(Product.mzOverlayClass)
				localStorage.setItem('locationChanged', 0);
			})
		},
		applyOverlayToggle: function () {
			$(".mz-modal-overlay").click(function () {
				$(document.body).removeClass(Product.mzOverlayClass)
				localStorage.setItem('locationChanged', 0);
			})
		},
		listStates: function () {
			var UFlist = {
				SE: {
					cep: "49070376"
				},
				TO: {
					cep: "77066356"
				},
				RO: {
					cep: "76803888"
				},
				RR: {
					cep: "69300000"
				},
				AC: {
					cep: "69922000"
				},
				AP: {
					cep: "68950000"
				},
				BA: {
					cep: "40020240"
				},
				ES: {
					cep: "29168074"
				},
				DF: {
					cep: "71065023"
				},
				RS: {
					cep: "90030140"
				},
				RJ: {
					cep: "25056400"
				},
				MT: {
					cep: "78080375"
				},
				PR: {
					cep: "82130760"
				},
				MS: {
					cep: "79004610"
				},
				GO: {
					cep: "74919376"
				},
				AL: {
					cep: "57035470"
				},
				CE: {
					cep: "60511390"
				},
				PA: {
					cep: "66053270"
				},
				RN: {
					cep: "59078130"
				},
				SC: {
					cep: "88310573"
				},
				MA: {
					cep: "65085160"
				},
				PI: {
					// cep: "64041400"
					cep: "64001495"
				},
				MG: {
					cep: "33860390"
				},
				PB: {
					cep: "58108096"
				},
				AM: {
					cep: "69046170"
				},
				PE: {
					cep: "54280145"
				},
				SP: {
					cep: "08090284"
				}
			};
			return UFlist
		},
		instoreInstallation: function () {
			var wrapperAccesories = $(".product-qd-v1-installation .n1colunas");
			if (!wrapperAccesories.length)
				return;
			var idSkuInstallation = $(".product-qd-v1-installation-content #accessorySelect input[rel]").attr("rel");
			var rxList = Product.regexList();
			var stateText = $(".header-qd-v1-valid-prices-local b").text();
			var stateFormated = readCookie("myuf");//stateText.match(rxList[0])[0];
			var listStates = Product.listStates();
			var addressInfo = {
				CEP: "",
				countryCode: "",
				idSKU: idSkuInstallation
			};
			for (var thisST in listStates) {
				if (thisST == stateFormated) {
					addressInfo.CEP = listStates[thisST].cep;
					addressInfo.countryCode = "BRA";
					Product.unlockButtons();
					Product.simulateShipping(addressInfo)
				}
			}
		},
		simulateShipping: function (adInfo) {
			if (adInfo.CEP.length > 8) {
				var rxList = Product.regexList();
				if (rxList[2].test(adInfo.CEP)) {
					adInfo.CEP = adInfo.CEP.replace(rxList[2], "")
				} else if (rxList[3].test(adInfo.CEP)) {
					adInfo.CEP = adInfo.CEP.replace(rxList[3], "")
				}
			}
			var data = {
				items: [{
					id: adInfo.idSKU,
					quantity: 1,
					seller: 1
				}],
				postalCode: adInfo.CEP,
				country: adInfo.countryCode
			};

			let vtexsc = readCookie('VTEXSC').replace('sc=', '');

			return $.ajax({
				url: `/api/checkout/pub/orderForms/simulation?sc=${vtexsc}`,
				type: "POST",
				dataType: "JSON",
				contentType: "application/json",
				data: JSON.stringify(data)
			}).done(function (data) {
				var watchLogistic = [];
				var countAdress = 0;
				var addressData = {
					name: "",
					street: "",
					neighborhood: "",
					state: "",
					shippingTime: ""
				};
				if (data.logisticsInfo[0].slas.length) {
					$(".mz-install__button--buy, .mz-accesories__button--buy, .mz-advantages__button--buy").removeClass("lock-button")
				} else if (!data.logisticsInfo[0].slas.length) {
					$(".mz-stores__title .store").hide();
					$(".mz-stores__title .without-store").show()
				}
				data.logisticsInfo[0].slas.forEach(function (item) {
					Product.renderDataInModal(item, addressData, watchLogistic, countAdress)
				});
				// if (!watchLogistic.length) {
				// 	$(".product-qd-v1-installation").remove()
				// }
			})
		},
		renderDataInModal: function (logisticItem, storeData, wl, cd) {
			var rxList = Product.regexList();
			if (!logisticItem.pickupStoreInfo.address) {
				console.log("Retornos de entregas removido.");
				return
			} else {
				storeData.street = logisticItem.pickupStoreInfo.address.street;
				storeData.neighborhood = logisticItem.pickupStoreInfo.address.neighborhood;
				storeData.state = logisticItem.pickupStoreInfo.address.state;
				storeData.shippingTime = logisticItem.shippingEstimate;
				storeData.shippingTime = storeData.shippingTime.match(rxList[1])[0];
				var thisItemLi = $('<li><span class="mz-stores__list--adress">' + storeData.street + ", " + storeData.neighborhood + ", " + storeData.state + ' - </span><span class="mz-stores__list--time"> em ' + storeData.shippingTime + " dia Ãºtil chegarÃ¡ na loja</span></li>");
				$(".mz-stores__list ul").append(thisItemLi);
				wl.push(cd++)
			}
		},
		unlockButtons: function () {
			$(".mz-accesories__name--conditions, .mz-accesories__advantages--button").removeAttr("disabled");
			$(".mz-accesories__name--conditions, .mz-accesories__advantages--button").removeClass("load-lock")
		},
		regexList: function () {
			var regexList = [/[A-Z]{2}/g, /\d/g, /-/g, /\s/g, /[0-9]\d*/];
			return regexList
		}
	};
	var List = {
		run: function () { },
		init: function () { },
		ajaxStop: function () { },
		windowOnload: function () { }
	};
	var Institutional = {
		init: function () {
			Institutional.sidemenuToggle()
		},
		ajaxStop: function () { },
		windowOnload: function () { },
		sidemenuToggle: function () {
			$(".institucional-qd-v1-menu-toggle-wrap").click(function (evt) {
				evt.preventDefault();
				$(document.body).addClass("qd-sn-on")
			})
		}
	};
	var Orders = {
		init: function () {
			Orders.bootstrapCssFix()
		},
		ajaxStop: function () {
			Orders.bootstrapCssFix()
		},
		windowOnload: function () { },
		bootstrapCssFix: function () {
			var styleSheets = document.styleSheets;
			for (var i = 0; i < styleSheets.length; i++) {
				if ((styleSheets[i].href || "").indexOf("io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap.min.css") > -1 || (styleSheets[i].href || "").indexOf("io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap-responsive.min.css") > -1) {
					styleSheets[i].disabled = true
				}
			}
		}
	}
} catch (e) {
	typeof console !== "undefined" && typeof console.error === "function" && console.error("Houve um erro nos objetos. Detalhes: " + e.message)
}
try {
	(function () {
		const searchSelector = ".resultado-busca, .departamento, .categoria";
		var body, ajaxStop, windowLoad;

		windowLoad = function () {
			Common.windowOnload();
			if (body.is(".home"))
				Home.windowOnload();
			else if (body.is(searchSelector))
				Search.windowOnload();
			else if (body.is(".produto"))
				Product.windowOnload();
			else if (body.is(".listas"))
				List.windowOnload();
			else if (body.is(".institucional"))
				Institutional.windowOnload();
			else if (body.is(".orders"))
				Orders.windowOnload();
			else if (body.is(".b2b"))
				B2B.windowOnload()
		};

		ajaxStop = function () {
			Common.ajaxStop();
			if (body.is(".home"))
				Home.ajaxStop();
			else if (body.is(searchSelector))
				Search.ajaxStop();
			else if (body.is(".produto"))
				Product.ajaxStop();
			else if (body.is(".listas"))
				List.ajaxStop();
			else if (body.is(".institucional"))
				Institutional.ajaxStop();
			else if (body.is(".orders"))
				Orders.ajaxStop();
			else if (body.is(".b2b"))
				B2B.ajaxStop()
		};

		$(function () {
			body = $(document.body);
			Common.init();

			if (body.is(".home"))
				Home.init();
			else if (body.is(searchSelector))
				Search.init();
			else if (body.is(".produto"))
				Product.init();
			else if (body.is(".listas"))
				List.init();
			else if (body.is(".institucional"))
				Institutional.init();
			else if (body.is(".orders"))
				Orders.init();
			else if (body.is(".b2b"))
				B2B.init();

			$(document).ajaxStop(ajaxStop);
			$(window).load(windowLoad);
			body.addClass("jsFullLoaded")
		});

		Common.run();
		if (location.pathname.substr(location.pathname.length - 2, 2).toLowerCase() == "/p")
			Product.run();
		else if (location.pathname.search(/^(\/giftlist|\/list\/)/) == 0)
			List.run()
	}
	)()
} catch (e) {
	typeof console !== "undefined" && typeof console.error === "function" && $("body").addClass("jsFullLoaded jsFullLoadedError") && console.error("Houve um erro ao iniciar os objetos. Detalhes: " + e.message)
}
(function (d) {
	if ("function" !== typeof d.qdAjax) {
		var a = {};
		d.qdAjaxQueue = a;
		150 > parseInt((d.fn.jquery.replace(/[^0-9]+/g, "") + "000").slice(0, 3), 10) && console && "function" == typeof console.error && console.error();
		d.qdAjax = function (f) {
			try {
				var b = d.extend({}, {
					url: "",
					type: "GET",
					data: "",
					success: function () { },
					error: function () { },
					complete: function () { },
					clearQueueDelay: 5
				}, f), e;
				e = "object" === typeof b.data ? JSON.stringify(b.data) : b.data.toString();
				var c = encodeURIComponent(b.url + "|" + b.type + "|" + e);
				a[c] = a[c] || {};
				"undefined" == typeof a[c].jqXHR ? a[c].jqXHR = d.ajax(b) : (a[c].jqXHR.done(b.success),
					a[c].jqXHR.fail(b.error),
					a[c].jqXHR.always(b.complete));
				a[c].jqXHR.always(function () {
					isNaN(parseInt(b.clearQueueDelay)) || setTimeout(function () {
						a[c].jqXHR = void 0
					}, b.clearQueueDelay)
				});
				return a[c].jqXHR
			} catch (g) {
				"undefined" !== typeof console && "function" === typeof console.error && console.error("Problemas no $.qdAjax :( . Detalhes: " + g.message)
			}
		}
			;
		d.qdAjax.version = "4.0"
	}
}
)(jQuery);
(function () {
	var l = function (a, c) {
		if ("object" === typeof console) {
			var d = "object" === typeof a;
			"undefined" !== typeof c && "alerta" === c.toLowerCase() ? d ? console.warn("[QD VTEX Checkout Queue]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.warn("[QD VTEX Checkout Queue]\n" + a) : "undefined" !== typeof c && "info" === c.toLowerCase() ? d ? console.info("[QD VTEX Checkout Queue]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.info("[QD VTEX Checkout Queue]\n" + a) : d ? console.error("[QD VTEX Checkout Queue]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.error("[QD VTEX Checkout Queue]\n" + a)
		}
	}
		, f = null
		, g = {}
		, h = {}
		, e = {};
	$.QD_checkoutQueue = function (a, c) {
		if (null === f)
			if ("object" === typeof window.vtexjs && "undefined" !== typeof window.vtexjs.checkout)
				f = window.vtexjs.checkout;
			else
				return l("NÃ£o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a forÃ§a nÃ£o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js");
		var d = $.extend({
			done: function () { },
			fail: function () { }
		}, c)
			, b = a.join(";")
			, k = function () {
				g[b].add(d.done);
				h[b].add(d.fail)
			};
		e[b] ? k() : (g[b] = $.Callbacks(),
			h[b] = $.Callbacks(),
			k(),
			e[b] = !0,
			f.getOrderForm(a).done(function (a) {
				e[b] = !1;
				g[b].fire(a)
			}).fail(function (a) {
				e[b] = !1;
				h[b].fire(a)
			}))
	}
}
)();
(function () {
	var c = jQuery
		, e = function (a, d) {
			if ("object" === typeof console && "undefined" !== typeof console.error && "undefined" !== typeof console.info && "undefined" !== typeof console.warn) {
				var b;
				"object" === typeof a ? (a.unshift("[QD Scroll Toggle]\n"),
					b = a) : b = ["[QD Scroll Toggle]\n" + a];
				if ("undefined" === typeof d || "alerta" !== d.toLowerCase() && "aviso" !== d.toLowerCase())
					if ("undefined" !== typeof d && "info" === d.toLowerCase())
						try {
							console.info.apply(console, b)
						} catch (c) {
							try {
								console.info(b.join("\n"))
							} catch (e) { }
						}
					else
						try {
							console.error.apply(console, b)
						} catch (h) {
							try {
								console.error(b.join("\n"))
							} catch (k) { }
						}
				else
					try {
						console.warn.apply(console, b)
					} catch (l) {
						try {
							console.warn(b.join("\n"))
						} catch (m) { }
					}
			}
		};
	"function" !== typeof c.QD_scrollToggle && (c.QD_scrollToggle = function (a) {
		var d = [];
		if ("string" !== typeof a && "number" !== typeof a || "auto" === a)
			if ("auto" === a)
				d.push(c(window).height());
			else
				return e("NÃ£o foi informado o limite de scroll necessÃ¡rio para adicionar o atributo.");
		else {
			var b = a.split(","), f;
			for (f in b)
				"function" !== typeof b[f] && (a = parseInt(b[f].trim()),
					isNaN(a) || d.push(a))
		}
		if (!d.length)
			return e("Aaeeeeeeee irmÃ£o! NÃ£o consegui encontrar nenhum valor para calcular o scroll");
		if (!document || !document.body || "undefined" === typeof document.body.setAttribute)
			return e('"document.body.setAttribute" NÃ£o Ã© uma funÃ§Ã£o :(');
		if (!document || !document.body || "undefined" === typeof document.body.removeAttribute)
			return e('"document.body.removeAttribute" NÃ£o Ã© uma funÃ§Ã£o :(');
		if (!document || !document.body || "undefined" === typeof document.body.getAttribute)
			return e('"document.body.getAttribute" NÃ£o Ã© uma funÃ§Ã£o :(');
		if (!c(window).scrollTop || isNaN(parseInt(c(window).scrollTop())))
			return e('"$(window).scrollTop" nÃ£o esta retornando um nÃºmero inteiro :(');
		try {
			document.body.setAttribute("data-qd-scroll", 1),
				document.body.getAttribute("data-qd-scroll"),
				document.body.removeAttribute("data-qd-scroll"),
				document.body.getAttribute("data-qd-scroll")
		} catch (g) {
			e("NÃ£o foi possÃ­vel fazer o passo a passo de consultar, adicionar e remover um atributo", g.message)
		}
		c(window).scroll(function () {
			for (var a = 0; a < d.length; a++)
				c(window).scrollTop() > d[a] ? document.body.getAttribute("data-qd-scroll-" + a) || document.body.setAttribute("data-qd-scroll-" + a, 1) : document.body.getAttribute("data-qd-scroll-" + a) && document.body.removeAttribute("data-qd-scroll-" + a)
		})
	}
		,
		c(function () {
			var a = c("body[data-qd-scroll-limit]");
			a.length && c.QD_scrollToggle(a.attr("data-qd-scroll-limit"))
		}))
}
)();
(function () {
	"function" !== typeof $.cookie && function (c) {
		"function" === typeof define && define.amd ? define(["jquery"], c) : "object" === typeof exports ? c(require("jquery")) : c(jQuery)
	}(function (c) {
		function p(a) {
			a = e.json ? JSON.stringify(a) : String(a);
			return e.raw ? a : encodeURIComponent(a)
		}
		function n(a, g) {
			var b;
			if (e.raw)
				b = a;
			else
				a: {
					var d = a;
					0 === d.indexOf('"') && (d = d.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
					try {
						d = decodeURIComponent(d.replace(l, " "));
						b = e.json ? JSON.parse(d) : d;
						break a
					} catch (h) { }
					b = void 0
				}
			return c.isFunction(g) ? g(b) : b
		}
		var l = /\+/g
			, e = c.cookie = function (a, g, b) {
				if (1 < arguments.length && !c.isFunction(g)) {
					b = c.extend({}, e.defaults, b);
					if ("number" === typeof b.expires) {
						var d = b.expires
							, h = b.expires = new Date;
						h.setTime(+h + 864e5 * d)
					}
					return document.cookie = [e.raw ? a : encodeURIComponent(a), "=", p(g), b.expires ? "; expires=" + b.expires.toUTCString() : "", b.path ? "; path=" + b.path : "", b.domain ? "; domain=" + b.domain : "", b.secure ? "; secure" : ""].join("")
				}
				for (var d = a ? void 0 : {}, h = document.cookie ? document.cookie.split("; ") : [], m = 0, l = h.length; m < l; m++) {
					var f = h[m].split("="), k;
					k = f.shift();
					k = e.raw ? k : decodeURIComponent(k);
					f = f.join("=");
					if (a && a === k) {
						d = n(f, g);
						break
					}
					a || void 0 === (f = n(f)) || (d[k] = f)
				}
				return d
			}
			;
		e.defaults = {};
		c.removeCookie = function (a, e) {
			if (void 0 === c.cookie(a))
				return !1;
			c.cookie(a, "", c.extend({}, e, {
				expires: -1
			}));
			return !c.cookie(a)
		}
	})
}
)();
function qd_number_format(b, c, d, e) {
	b = (b + "").replace(/[^0-9+\-Ee.]/g, "");
	b = isFinite(+b) ? +b : 0;
	c = isFinite(+c) ? Math.abs(c) : 0;
	e = "undefined" === typeof e ? "," : e;
	d = "undefined" === typeof d ? "." : d;
	var a = ""
		, a = function (a, b) {
			var c = Math.pow(10, b);
			return "" + (Math.round(a * c) / c).toFixed(b)
		}
		, a = (c ? a(b, c) : "" + Math.round(b)).split(".");
	3 < a[0].length && (a[0] = a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, e));
	(a[1] || "").length < c && (a[1] = a[1] || "",
		a[1] += Array(c - a[1].length + 1).join("0"));
	return a.join(d)
}
(function (a) {
	a.fn.getParent = a.fn.closest
}
)(jQuery);
(function (u) {
	try {
		var a = jQuery, c, r = a({}), l = function (a, c) {
			if ("object" === typeof console && "undefined" !== typeof console.error && "undefined" !== typeof console.info && "undefined" !== typeof console.warn) {
				var b;
				"object" === typeof a ? (a.unshift("[Quatro Digital - Buy Button]\n"),
					b = a) : b = ["[Quatro Digital - Buy Button]\n" + a];
				if ("undefined" === typeof c || "alerta" !== c.toLowerCase() && "aviso" !== c.toLowerCase())
					if ("undefined" !== typeof c && "info" === c.toLowerCase())
						try {
							console.info.apply(console, b)
						} catch (h) {
							try {
								console.info(b.join("\n"))
							} catch (k) { }
						}
					else
						try {
							console.error.apply(console, b)
						} catch (h) {
							try {
								console.error(b.join("\n"))
							} catch (k) { }
						}
				else
					try {
						console.warn.apply(console, b)
					} catch (h) {
						try {
							console.warn(b.join("\n"))
						} catch (k) { }
					}
			}
		}, t = {
			timeRemoveNewItemClass: 5e3,
			isSmartCheckout: !0,
			buyButton: ".productInformationWrapper  a.buy-button",
			buyQtt: "input.buy-in-page-quantity",
			selectSkuMsg: "javascript:",
			autoWatchBuyButton: !0,
			buyIfQuantityZeroed: !1,
			fakeRequest: !1,
			productPageCallback: function (c, f, b) {
				a("body").is(".productQuickView") && ("success" === f ? alert("Produto adicionado ao carrinho!") : (alert("Ooops! Algo saiu errado ao tentar adicionar seu produto ao carrinho. \n Vou te redirecionar para o carrinho."),
					("object" === typeof parent ? parent : document).location.href = b))
			},
			isProductPage: function () {
				return a("body").is("#produto, .produto")
			},
			execDefaultAction: function (a) {
				return !1
			},
			allowBuyClick: function () {
				return !0
			},
			callback: function () { },
			asyncCallback: function () { }
		};
		a.QD_buyButton = function (g, f) {
			function b(a) {
				c.isSmartCheckout ? a.data("qd-bb-click-active") || (a.data("qd-bb-click-active", 1),
					a.on("click.qd_bb_buy_sc", function (a) {
						if (!c.allowBuyClick())
							return !0;
						if (!0 !== m.clickBuySmartCheckout.call(this))
							return a.preventDefault(),
								!1
					})) : alert("MÃ©todo descontinuado!")
			}
			function h(e) {
				e = e || a(c.buyButton);
				e.each(function () {
					var d = a(this);
					d.is(".qd-sbb-on") || (d.addClass("qd-sbb-on"),
						d.is(".btn-add-buy-button-asynchronous") && !d.is(".remove-href") || d.data("qd-bb-active") || (d.data("qd-bb-active", 1),
							d.children(".qd-bb-productAdded").length || d.append('<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span>'),
							d.is(".buy-in-page-button") && c.isProductPage() && p.call(d),
							b(d)))
				});
				c.isProductPage() && !e.length && l("Oooops!\nAparentemente esta Ã© uma pÃ¡gina de produto porÃ©m nÃ£o encontrei nenhum botÃ£o comprar!\nVerifique se Ã© este mesmo o seletor: '" + e.selector + "'.", "info")
			}
			var k, p, m;
			k = a(g);
			m = this;
			window._Quatro_Digital_dropDown = window._Quatro_Digital_dropDown || {};
			window._QuatroDigital_CartData = window._QuatroDigital_CartData || {};
			m.prodAdd = function (e, d) {
				k.addClass("qd-bb-itemAddCartWrapper qd-bb-lightBoxProdAdd");
				a("body").addClass("qd-bb-lightBoxBodyProdAdd");
				var b = a(c.buyButton).filter("[href='" + (e.attr("href") || "---") + "']").add(e);
				b.addClass("qd-bb-itemAddBuyButtonWrapper");
				setTimeout(function () {
					k.removeClass("qd-bb-itemAddCartWrapper");
					b.removeClass("qd-bb-itemAddBuyButtonWrapper")
				}, c.timeRemoveNewItemClass);
				window._Quatro_Digital_dropDown.getOrderForm = void 0;
				if ("undefined" !== typeof f && "function" === typeof f.getCartInfoByUrl)
					return c.isSmartCheckout || (l("funÃ§Ã£o descontinuada"),
						f.getCartInfoByUrl()),
						window._QuatroDigital_DropDown.getOrderForm = void 0,
						f.getCartInfoByUrl(function (d) {
							window._Quatro_Digital_dropDown.getOrderForm = d;
							a.fn.simpleCart(!0, void 0, !0)
						}, {
							lastSku: d
						});
				window._Quatro_Digital_dropDown.allowUpdate = !0;
				a.fn.simpleCart(!0)
			}
				;
			(function () {
				if (c.isSmartCheckout && c.autoWatchBuyButton) {
					var e = a(".btn-add-buy-button-asynchronous");
					e.length && h(e)
				}
			}
			)();
			p = function () {
				var e = a(this);
				"undefined" !== typeof e.data("buyButton") ? (e.unbind("click"),
					b(e)) : (e.bind("mouseenter.qd_bb_buy_sc", function (d) {
						e.unbind("click");
						b(e);
						a(this).unbind(d)
					}),
						a(window).load(function () {
							e.unbind("click");
							b(e);
							e.unbind("mouseenter.qd_bb_buy_sc")
						}))
			}
				;
			m.clickBuySmartCheckout = function () {
				var e = a(this)
					, d = e.attr("href") || "";
				if (-1 < d.indexOf(c.selectSkuMsg))
					return !0;
				d = d.replace(/redirect\=(false|true)/gi, "").replace("?", "?redirect=false&").replace(/\&\&/gi, "&");
				if (c.execDefaultAction(e))
					return e.attr("href", d.replace("redirect=false", "redirect=true")),
						!0;
				d = d.replace(/http.?:/i, "");
				r.queue(function (b) {
					if (!c.buyIfQuantityZeroed && !/(&|\?)qty\=[1-9][0-9]*/gi.test(d))
						return b();
					var f = function (b, f) {
						var g = d.match(/sku\=([0-9]+)/gi), h = [], k;
						if ("object" === typeof g && null !== g)
							for (var l = g.length - 1; 0 <= l; l--)
								k = parseInt(g[l].replace(/sku\=/gi, "")),
									isNaN(k) || h.push(k);
						c.productPageCallback.call(this, b, f, d);
						m.buyButtonClickCallback.call(this, b, f, d, h);
						m.prodAdd(e, d.split("ku=").pop().split("&").shift());
						"function" === typeof c.asyncCallback && c.asyncCallback.call(this);
						a(window).trigger("productAddedToCart");
						a(window).trigger("cartProductAdded.vtex")
					};
					c.fakeRequest ? (f(null, "success"),
						b()) : a.ajax({
							url: d,
							complete: f
						}).always(function () {
							b()
						})
				})
			}
				;
			m.buyButtonClickCallback = function (a, b, c, f) {
				try {
					"success" === b && "object" === typeof window.parent && "function" === typeof window.parent._QuatroDigital_prodBuyCallback && window.parent._QuatroDigital_prodBuyCallback(a, b, c, f)
				} catch (g) {
					l("Problemas ao tentar comunicar a pÃ¡gina que o produto foi aicionado ao carrinho.")
				}
			}
				;
			h();
			"function" === typeof c.callback ? c.callback.call(this) : l("Callback nÃ£o Ã© uma funÃ§Ã£o")
		}
			;
		var n = a.Callbacks();
		a.fn.QD_buyButton = function (g, f) {
			var b = a(this);
			"undefined" !== typeof f || "object" !== typeof g || g instanceof a || (f = g,
				g = void 0);
			c = a.extend({}, t, f);
			var h;
			n.add(function () {
				b.children(".qd-bb-itemAddWrapper").length || b.prepend('<span class="qd-bb-itemAddWrapper"><span class="qd-bb-itemAddIco"></span></span>');
				h = new a.QD_buyButton(b, g)
			});
			n.fire();
			a(window).on("QuatroDigital.qd_bb_prod_add", function (a, b, c) {
				h.prodAdd(b, c)
			});
			return a.extend(b, h)
		}
			;
		var q = 0;
		a(document).ajaxSend(function (a, c, b) {
			-1 < b.url.toLowerCase().indexOf("/checkout/cart/add") && (q = (b.url.match(/sku\=([0-9]+)/i) || [""]).pop())
		});
		a(window).bind("productAddedToCart.qdSbbVtex", function () {
			a(window).trigger("QuatroDigital.qd_bb_prod_add", [new a, q])
		});
		a(document).ajaxStop(function () {
			n.fire()
		})
	} catch (g) {
		"undefined" !== typeof console && "function" === typeof console.error && console.error("Oooops! ", g)
	}
}
)(this);
!function (a) {
	"use strict";
	"function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function (a) {
	"use strict";
	var b = window.Slick || {};
	b = function () {
		function c(c, d) {
			var f, e = this;
			e.defaults = {
				accessibility: !0,
				adaptiveHeight: !1,
				appendArrows: a(c),
				appendDots: a(c),
				arrows: !0,
				asNavFor: null,
				prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
				nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
				autoplay: !1,
				autoplaySpeed: 3e3,
				centerMode: !1,
				centerPadding: "50px",
				cssEase: "ease",
				customPaging: function (b, c) {
					return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1)
				},
				dots: !1,
				dotsClass: "slick-dots",
				draggable: !0,
				easing: "linear",
				edgeFriction: .35,
				fade: !1,
				focusOnSelect: !1,
				infinite: !0,
				initialSlide: 0,
				lazyLoad: "ondemand",
				mobileFirst: !1,
				pauseOnHover: !0,
				pauseOnFocus: !0,
				pauseOnDotsHover: !1,
				respondTo: "window",
				responsive: null,
				rows: 1,
				rtl: !1,
				slide: "",
				slidesPerRow: 1,
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				swipe: !0,
				swipeToSlide: !1,
				touchMove: !0,
				touchThreshold: 5,
				useCSS: !0,
				useTransform: !0,
				variableWidth: !1,
				vertical: !1,
				verticalSwiping: !1,
				waitForAnimate: !0,
				zIndex: 1e3
			},
				e.initials = {
					animating: !1,
					dragging: !1,
					autoPlayTimer: null,
					currentDirection: 0,
					currentLeft: null,
					currentSlide: 0,
					direction: 1,
					$dots: null,
					listWidth: null,
					listHeight: null,
					loadIndex: 0,
					$nextArrow: null,
					$prevArrow: null,
					slideCount: null,
					slideWidth: null,
					$slideTrack: null,
					$slides: null,
					sliding: !1,
					slideOffset: 0,
					swipeLeft: null,
					$list: null,
					touchObject: {},
					transformsEnabled: !1,
					unslicked: !1
				},
				a.extend(e, e.initials),
				e.activeBreakpoint = null,
				e.animType = null,
				e.animProp = null,
				e.breakpoints = [],
				e.breakpointSettings = [],
				e.cssTransitions = !1,
				e.focussed = !1,
				e.interrupted = !1,
				e.hidden = "hidden",
				e.paused = !0,
				e.positionProp = null,
				e.respondTo = null,
				e.rowCount = 1,
				e.shouldClick = !0,
				e.$slider = a(c),
				e.$slidesCache = null,
				e.transformType = null,
				e.transitionType = null,
				e.visibilityChange = "visibilitychange",
				e.windowWidth = 0,
				e.windowTimer = null,
				f = a(c).data("slick") || {},
				e.options = a.extend({}, e.defaults, d, f),
				e.currentSlide = e.options.initialSlide,
				e.originalSettings = e.options,
				"undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden",
					e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden",
						e.visibilityChange = "webkitvisibilitychange"),
				e.autoPlay = a.proxy(e.autoPlay, e),
				e.autoPlayClear = a.proxy(e.autoPlayClear, e),
				e.autoPlayIterator = a.proxy(e.autoPlayIterator, e),
				e.changeSlide = a.proxy(e.changeSlide, e),
				e.clickHandler = a.proxy(e.clickHandler, e),
				e.selectHandler = a.proxy(e.selectHandler, e),
				e.setPosition = a.proxy(e.setPosition, e),
				e.swipeHandler = a.proxy(e.swipeHandler, e),
				e.dragHandler = a.proxy(e.dragHandler, e),
				e.keyHandler = a.proxy(e.keyHandler, e),
				e.instanceUid = b++,
				e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
				e.registerBreakpoints(),
				e.init(!0)
		}
		var b = 0;
		return c
	}(),
		b.prototype.activateADA = function () {
			var a = this;
			a.$slideTrack.find(".slick-active").attr({
				"aria-hidden": "false"
			}).find("a, input, button, select").attr({
				tabindex: "0"
			})
		}
		,
		b.prototype.addSlide = b.prototype.slickAdd = function (b, c, d) {
			var e = this;
			if ("boolean" == typeof c)
				d = c,
					c = null;
			else if (0 > c || c >= e.slideCount)
				return !1;
			e.unload(),
				"number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack),
				e.$slides = e.$slideTrack.children(this.options.slide),
				e.$slideTrack.children(this.options.slide).detach(),
				e.$slideTrack.append(e.$slides),
				e.$slides.each(function (b, c) {
					a(c).attr("data-slick-index", b)
				}),
				e.$slidesCache = e.$slides,
				e.reinit()
		}
		,
		b.prototype.animateHeight = function () {
			var a = this;
			if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
				var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
				a.$list.animate({
					height: b
				}, a.options.speed)
			}
		}
		,
		b.prototype.animateSlide = function (b, c) {
			var d = {}
				, e = this;
			e.animateHeight(),
				e.options.rtl === !0 && e.options.vertical === !1 && (b = -b),
				e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
					left: b
				}, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
					top: b
				}, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft),
					a({
						animStart: e.currentLeft
					}).animate({
						animStart: b
					}, {
						duration: e.options.speed,
						easing: e.options.easing,
						step: function (a) {
							a = Math.ceil(a),
								e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)",
									e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)",
										e.$slideTrack.css(d))
						},
						complete: function () {
							c && c.call()
						}
					})) : (e.applyTransition(),
						b = Math.ceil(b),
						e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)",
						e.$slideTrack.css(d),
						c && setTimeout(function () {
							e.disableTransition(),
								c.call()
						}, e.options.speed))
		}
		,
		b.prototype.getNavTarget = function () {
			var b = this
				, c = b.options.asNavFor;
			return c && null !== c && (c = a(c).not(b.$slider)),
				c
		}
		,
		b.prototype.asNavFor = function (b) {
			var c = this
				, d = c.getNavTarget();
			null !== d && "object" == typeof d && d.each(function () {
				var c = a(this).slick("getSlick");
				c.unslicked || c.slideHandler(b, !0)
			})
		}
		,
		b.prototype.applyTransition = function (a) {
			var b = this
				, c = {};
			b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase,
				b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
		}
		,
		b.prototype.autoPlay = function () {
			var a = this;
			a.autoPlayClear(),
				a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
		}
		,
		b.prototype.autoPlayClear = function () {
			var a = this;
			a.autoPlayTimer && clearInterval(a.autoPlayTimer)
		}
		,
		b.prototype.autoPlayIterator = function () {
			var a = this
				, b = a.currentSlide + a.options.slidesToScroll;
			a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll,
				a.currentSlide - 1 === 0 && (a.direction = 1))),
				a.slideHandler(b))
		}
		,
		b.prototype.buildArrows = function () {
			var b = this;
			b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"),
				b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"),
				b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
					b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
					b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows),
					b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows),
					b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
						"aria-disabled": "true",
						tabindex: "-1"
					}))
		}
		,
		b.prototype.buildDots = function () {
			var c, d, b = this;
			if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
				for (b.$slider.addClass("slick-dotted"),
					d = a("<ul />").addClass(b.options.dotsClass),
					c = 0; c <= b.getDotCount(); c += 1)
					d.append(a("<li />").append(b.options.customPaging.call(this, b, c)));
				b.$dots = d.appendTo(b.options.appendDots),
					b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
			}
		}
		,
		b.prototype.buildOut = function () {
			var b = this;
			b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
				b.slideCount = b.$slides.length,
				b.$slides.each(function (b, c) {
					a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
				}),
				b.$slider.addClass("slick-slider"),
				b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(),
				b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),
				b.$slideTrack.css("opacity", 0),
				(b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1),
				a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"),
				b.setupInfinite(),
				b.buildArrows(),
				b.buildDots(),
				b.updateDots(),
				b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0),
				b.options.draggable === !0 && b.$list.addClass("draggable")
		}
		,
		b.prototype.buildRows = function () {
			var b, c, d, e, f, g, h, a = this;
			if (e = document.createDocumentFragment(),
				g = a.$slider.children(),
				a.options.rows > 1) {
				for (h = a.options.slidesPerRow * a.options.rows,
					f = Math.ceil(g.length / h),
					b = 0; f > b; b++) {
					var i = document.createElement("div");
					for (c = 0; c < a.options.rows; c++) {
						var j = document.createElement("div");
						for (d = 0; d < a.options.slidesPerRow; d++) {
							var k = b * h + (c * a.options.slidesPerRow + d);
							g.get(k) && j.appendChild(g.get(k))
						}
						i.appendChild(j)
					}
					e.appendChild(i)
				}
				a.$slider.empty().append(e),
					a.$slider.children().children().children().css({
						width: 100 / a.options.slidesPerRow + "%",
						display: "inline-block"
					})
			}
		}
		,
		b.prototype.checkResponsive = function (b, c) {
			var e, f, g, d = this, h = !1, i = d.$slider.width(), j = window.innerWidth || a(window).width();
			if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)),
				d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
				f = null;
				for (e in d.breakpoints)
					d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
				null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f,
					"unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]),
						b === !0 && (d.currentSlide = d.options.initialSlide),
						d.refresh(b)),
					h = f) : (d.activeBreakpoint = f,
						"unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]),
							b === !0 && (d.currentSlide = d.options.initialSlide),
							d.refresh(b)),
						h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null,
							d.options = d.originalSettings,
							b === !0 && (d.currentSlide = d.options.initialSlide),
							d.refresh(b),
							h = f),
					b || h === !1 || d.$slider.trigger("breakpoint", [d, h])
			}
		}
		,
		b.prototype.changeSlide = function (b, c) {
			var f, g, h, d = this, e = a(b.currentTarget);
			switch (e.is("a") && b.preventDefault(),
			e.is("li") || (e = e.closest("li")),
			h = d.slideCount % d.options.slidesToScroll !== 0,
			f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll,
			b.data.message) {
				case "previous":
					g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f,
						d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
					break;
				case "next":
					g = 0 === f ? d.options.slidesToScroll : f,
						d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
					break;
				case "index":
					var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
					d.slideHandler(d.checkNavigable(i), !1, c),
						e.children().trigger("focus");
					break;
				default:
					return
			}
		}
		,
		b.prototype.checkNavigable = function (a) {
			var c, d, b = this;
			if (c = b.getNavigableIndexes(),
				d = 0,
				a > c[c.length - 1])
				a = c[c.length - 1];
			else
				for (var e in c) {
					if (a < c[e]) {
						a = d;
						break
					}
					d = c[e]
				}
			return a
		}
		,
		b.prototype.cleanUpEvents = function () {
			var b = this;
			b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)),
				b.$slider.off("focus.slick blur.slick"),
				b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide),
					b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)),
				b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler),
				b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler),
				b.$list.off("touchend.slick mouseup.slick", b.swipeHandler),
				b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler),
				b.$list.off("click.slick", b.clickHandler),
				a(document).off(b.visibilityChange, b.visibility),
				b.cleanUpSlideEvents(),
				b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler),
				b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler),
				a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange),
				a(window).off("resize.slick.slick-" + b.instanceUid, b.resize),
				a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault),
				a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition),
				a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
		}
		,
		b.prototype.cleanUpSlideEvents = function () {
			var b = this;
			b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)),
				b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1))
		}
		,
		b.prototype.cleanUpRows = function () {
			var b, a = this;
			a.options.rows > 1 && (b = a.$slides.children().children(),
				b.removeAttr("style"),
				a.$slider.empty().append(b))
		}
		,
		b.prototype.clickHandler = function (a) {
			var b = this;
			b.shouldClick === !1 && (a.stopImmediatePropagation(),
				a.stopPropagation(),
				a.preventDefault())
		}
		,
		b.prototype.destroy = function (b) {
			var c = this;
			c.autoPlayClear(),
				c.touchObject = {},
				c.cleanUpEvents(),
				a(".slick-cloned", c.$slider).detach(),
				c.$dots && c.$dots.remove(),
				c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
					c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()),
				c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
					c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()),
				c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
					a(this).attr("style", a(this).data("originalStyling"))
				}),
					c.$slideTrack.children(this.options.slide).detach(),
					c.$slideTrack.detach(),
					c.$list.detach(),
					c.$slider.append(c.$slides)),
				c.cleanUpRows(),
				c.$slider.removeClass("slick-slider"),
				c.$slider.removeClass("slick-initialized"),
				c.$slider.removeClass("slick-dotted"),
				c.unslicked = !0,
				b || c.$slider.trigger("destroy", [c])
		}
		,
		b.prototype.disableTransition = function (a) {
			var b = this
				, c = {};
			c[b.transitionType] = "",
				b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
		}
		,
		b.prototype.fadeSlide = function (a, b) {
			var c = this;
			c.cssTransitions === !1 ? (c.$slides.eq(a).css({
				zIndex: c.options.zIndex
			}),
				c.$slides.eq(a).animate({
					opacity: 1
				}, c.options.speed, c.options.easing, b)) : (c.applyTransition(a),
					c.$slides.eq(a).css({
						opacity: 1,
						zIndex: c.options.zIndex
					}),
					b && setTimeout(function () {
						c.disableTransition(a),
							b.call()
					}, c.options.speed))
		}
		,
		b.prototype.fadeSlideOut = function (a) {
			var b = this;
			b.cssTransitions === !1 ? b.$slides.eq(a).animate({
				opacity: 0,
				zIndex: b.options.zIndex - 2
			}, b.options.speed, b.options.easing) : (b.applyTransition(a),
				b.$slides.eq(a).css({
					opacity: 0,
					zIndex: b.options.zIndex - 2
				}))
		}
		,
		b.prototype.filterSlides = b.prototype.slickFilter = function (a) {
			var b = this;
			null !== a && (b.$slidesCache = b.$slides,
				b.unload(),
				b.$slideTrack.children(this.options.slide).detach(),
				b.$slidesCache.filter(a).appendTo(b.$slideTrack),
				b.reinit())
		}
		,
		b.prototype.focusHandler = function () {
			var b = this;
			b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function (c) {
				c.stopImmediatePropagation();
				var d = a(this);
				setTimeout(function () {
					b.options.pauseOnFocus && (b.focussed = d.is(":focus"),
						b.autoPlay())
				}, 0)
			})
		}
		,
		b.prototype.getCurrent = b.prototype.slickCurrentSlide = function () {
			var a = this;
			return a.currentSlide
		}
		,
		b.prototype.getDotCount = function () {
			var a = this
				, b = 0
				, c = 0
				, d = 0;
			if (a.options.infinite === !0)
				for (; b < a.slideCount;)
					++d,
						b = c + a.options.slidesToScroll,
						c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
			else if (a.options.centerMode === !0)
				d = a.slideCount;
			else if (a.options.asNavFor)
				for (; b < a.slideCount;)
					++d,
						b = c + a.options.slidesToScroll,
						c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
			else
				d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
			return d - 1
		}
		,
		b.prototype.getLeft = function (a) {
			var c, d, f, b = this, e = 0;
			return b.slideOffset = 0,
				d = b.$slides.first().outerHeight(!0),
				b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1,
					e = d * b.options.slidesToShow * -1),
					b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1,
						e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1,
							e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth,
								e = (a + b.options.slidesToShow - b.slideCount) * d),
				b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0,
					e = 0),
				b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0,
					b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)),
				c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e,
				b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow),
					c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0,
					b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1),
						c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0,
						c += (b.$list.width() - f.outerWidth()) / 2)),
				c
		}
		,
		b.prototype.getOption = b.prototype.slickGetOption = function (a) {
			var b = this;
			return b.options[a]
		}
		,
		b.prototype.getNavigableIndexes = function () {
			var e, a = this, b = 0, c = 0, d = [];
			for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll,
				c = -1 * a.options.slidesToScroll,
				e = 2 * a.slideCount); e > b;)
				d.push(b),
					b = c + a.options.slidesToScroll,
					c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
			return d
		}
		,
		b.prototype.getSlick = function () {
			return this
		}
		,
		b.prototype.getSlideCount = function () {
			var c, d, e, b = this;
			return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0,
				b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function (c, f) {
					return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f,
						!1) : void 0
				}),
					c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll
		}
		,
		b.prototype.goTo = b.prototype.slickGoTo = function (a, b) {
			var c = this;
			c.changeSlide({
				data: {
					message: "index",
					index: parseInt(a)
				}
			}, b)
		}
		,
		b.prototype.init = function (b) {
			var c = this;
			a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"),
				c.buildRows(),
				c.buildOut(),
				c.setProps(),
				c.startLoad(),
				c.loadSlider(),
				c.initializeEvents(),
				c.updateArrows(),
				c.updateDots(),
				c.checkResponsive(!0),
				c.focusHandler()),
				b && c.$slider.trigger("init", [c]),
				c.options.accessibility === !0 && c.initADA(),
				c.options.autoplay && (c.paused = !1,
					c.autoPlay())
		}
		,
		b.prototype.initADA = function () {
			var b = this;
			b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
				"aria-hidden": "true",
				tabindex: "-1"
			}).find("a, input, button, select").attr({
				tabindex: "-1"
			}),
				b.$slideTrack.attr("role", "listbox"),
				b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function (c) {
					a(this).attr({
						role: "option",
						"aria-describedby": "slick-slide" + b.instanceUid + c
					})
				}),
				null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function (c) {
					a(this).attr({
						role: "presentation",
						"aria-selected": "false",
						"aria-controls": "navigation" + b.instanceUid + c,
						id: "slick-slide" + b.instanceUid + c
					})
				}).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"),
				b.activateADA()
		}
		,
		b.prototype.initArrowEvents = function () {
			var a = this;
			a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", {
				message: "previous"
			}, a.changeSlide),
				a.$nextArrow.off("click.slick").on("click.slick", {
					message: "next"
				}, a.changeSlide))
		}
		,
		b.prototype.initDotEvents = function () {
			var b = this;
			b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
				message: "index"
			}, b.changeSlide),
				b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1))
		}
		,
		b.prototype.initSlideEvents = function () {
			var b = this;
			b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)),
				b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)))
		}
		,
		b.prototype.initializeEvents = function () {
			var b = this;
			b.initArrowEvents(),
				b.initDotEvents(),
				b.initSlideEvents(),
				b.$list.on("touchstart.slick mousedown.slick", {
					action: "start"
				}, b.swipeHandler),
				b.$list.on("touchmove.slick mousemove.slick", {
					action: "move"
				}, b.swipeHandler),
				b.$list.on("touchend.slick mouseup.slick", {
					action: "end"
				}, b.swipeHandler),
				b.$list.on("touchcancel.slick mouseleave.slick", {
					action: "end"
				}, b.swipeHandler),
				b.$list.on("click.slick", b.clickHandler),
				a(document).on(b.visibilityChange, a.proxy(b.visibility, b)),
				b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler),
				b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler),
				a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)),
				a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)),
				a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault),
				a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition),
				a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
		}
		,
		b.prototype.initUI = function () {
			var a = this;
			a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(),
				a.$nextArrow.show()),
				a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show()
		}
		,
		b.prototype.keyHandler = function (a) {
			var b = this;
			a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({
				data: {
					message: b.options.rtl === !0 ? "next" : "previous"
				}
			}) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({
				data: {
					message: b.options.rtl === !0 ? "previous" : "next"
				}
			}))
		}
		,
		b.prototype.lazyLoad = function () {
			function g(c) {
				a("img[data-lazy]", c).each(function () {
					var c = a(this)
						, d = a(this).attr("data-lazy")
						, e = document.createElement("img");
					e.onload = function () {
						c.animate({
							opacity: 0
						}, 100, function () {
							c.attr("src", d).animate({
								opacity: 1
							}, 200, function () {
								c.removeAttr("data-lazy").removeClass("slick-loading")
							}),
								b.$slider.trigger("lazyLoaded", [b, c, d])
						})
					}
						,
						e.onerror = function () {
							c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
								b.$slider.trigger("lazyLoadError", [b, c, d])
						}
						,
						e.src = d
				})
			}
			var c, d, e, f, b = this;
			b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1),
				f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)),
					f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide,
						f = Math.ceil(e + b.options.slidesToShow),
						b.options.fade === !0 && (e > 0 && e--,
							f <= b.slideCount && f++)),
				c = b.$slider.find(".slick-slide").slice(e, f),
				g(c),
				b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"),
					g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow),
						g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow),
							g(d))
		}
		,
		b.prototype.loadSlider = function () {
			var a = this;
			a.setPosition(),
				a.$slideTrack.css({
					opacity: 1
				}),
				a.$slider.removeClass("slick-loading"),
				a.initUI(),
				"progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
		}
		,
		b.prototype.next = b.prototype.slickNext = function () {
			var a = this;
			a.changeSlide({
				data: {
					message: "next"
				}
			})
		}
		,
		b.prototype.orientationChange = function () {
			var a = this;
			a.checkResponsive(),
				a.setPosition()
		}
		,
		b.prototype.pause = b.prototype.slickPause = function () {
			var a = this;
			a.autoPlayClear(),
				a.paused = !0
		}
		,
		b.prototype.play = b.prototype.slickPlay = function () {
			var a = this;
			a.autoPlay(),
				a.options.autoplay = !0,
				a.paused = !1,
				a.focussed = !1,
				a.interrupted = !1
		}
		,
		b.prototype.postSlide = function (a) {
			var b = this;
			b.unslicked || (b.$slider.trigger("afterChange", [b, a]),
				b.animating = !1,
				b.setPosition(),
				b.swipeLeft = null,
				b.options.autoplay && b.autoPlay(),
				b.options.accessibility === !0 && b.initADA())
		}
		,
		b.prototype.prev = b.prototype.slickPrev = function () {
			var a = this;
			a.changeSlide({
				data: {
					message: "previous"
				}
			})
		}
		,
		b.prototype.preventDefault = function (a) {
			a.preventDefault()
		}
		,
		b.prototype.progressiveLazyLoad = function (b) {
			b = b || 1;
			var e, f, g, c = this, d = a("img[data-lazy]", c.$slider);
			d.length ? (e = d.first(),
				f = e.attr("data-lazy"),
				g = document.createElement("img"),
				g.onload = function () {
					e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading"),
						c.options.adaptiveHeight === !0 && c.setPosition(),
						c.$slider.trigger("lazyLoaded", [c, e, f]),
						c.progressiveLazyLoad()
				}
				,
				g.onerror = function () {
					3 > b ? setTimeout(function () {
						c.progressiveLazyLoad(b + 1)
					}, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
						c.$slider.trigger("lazyLoadError", [c, e, f]),
						c.progressiveLazyLoad())
				}
				,
				g.src = f) : c.$slider.trigger("allImagesLoaded", [c])
		}
		,
		b.prototype.refresh = function (b) {
			var d, e, c = this;
			e = c.slideCount - c.options.slidesToShow,
				!c.options.infinite && c.currentSlide > e && (c.currentSlide = e),
				c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0),
				d = c.currentSlide,
				c.destroy(!0),
				a.extend(c, c.initials, {
					currentSlide: d
				}),
				c.init(),
				b || c.changeSlide({
					data: {
						message: "index",
						index: d
					}
				}, !1)
		}
		,
		b.prototype.registerBreakpoints = function () {
			var c, d, e, b = this, f = b.options.responsive || null;
			if ("array" === a.type(f) && f.length) {
				b.respondTo = b.options.respondTo || "window";
				for (c in f)
					if (e = b.breakpoints.length - 1,
						d = f[c].breakpoint,
						f.hasOwnProperty(c)) {
						for (; e >= 0;)
							b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1),
								e--;
						b.breakpoints.push(d),
							b.breakpointSettings[d] = f[c].settings
					}
				b.breakpoints.sort(function (a, c) {
					return b.options.mobileFirst ? a - c : c - a
				})
			}
		}
		,
		b.prototype.reinit = function () {
			var b = this;
			b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"),
				b.slideCount = b.$slides.length,
				b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll),
				b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0),
				b.registerBreakpoints(),
				b.setProps(),
				b.setupInfinite(),
				b.buildArrows(),
				b.updateArrows(),
				b.initArrowEvents(),
				b.buildDots(),
				b.updateDots(),
				b.initDotEvents(),
				b.cleanUpSlideEvents(),
				b.initSlideEvents(),
				b.checkResponsive(!1, !0),
				b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler),
				b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0),
				b.setPosition(),
				b.focusHandler(),
				b.paused = !b.options.autoplay,
				b.autoPlay(),
				b.$slider.trigger("reInit", [b])
		}
		,
		b.prototype.resize = function () {
			var b = this;
			a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay),
				b.windowDelay = window.setTimeout(function () {
					b.windowWidth = a(window).width(),
						b.checkResponsive(),
						b.unslicked || b.setPosition()
				}, 50))
		}
		,
		b.prototype.removeSlide = b.prototype.slickRemove = function (a, b, c) {
			var d = this;
			return "boolean" == typeof a ? (b = a,
				a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a,
				d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(),
					c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(),
					d.$slides = d.$slideTrack.children(this.options.slide),
					d.$slideTrack.children(this.options.slide).detach(),
					d.$slideTrack.append(d.$slides),
					d.$slidesCache = d.$slides,
					void d.reinit())
		}
		,
		b.prototype.setCSS = function (a) {
			var d, e, b = this, c = {};
			b.options.rtl === !0 && (a = -a),
				d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px",
				e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px",
				c[b.positionProp] = a,
				b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {},
					b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")",
						b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)",
							b.$slideTrack.css(c)))
		}
		,
		b.prototype.setDimensions = function () {
			var a = this;
			a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({
				padding: "0px " + a.options.centerPadding
			}) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow),
				a.options.centerMode === !0 && a.$list.css({
					padding: a.options.centerPadding + " 0px"
				})),
				a.listWidth = a.$list.width(),
				a.listHeight = a.$list.height(),
				a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow),
					a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth),
						a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
			var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
			a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
		}
		,
		b.prototype.setFade = function () {
			var c, b = this;
			b.$slides.each(function (d, e) {
				c = b.slideWidth * d * -1,
					b.options.rtl === !0 ? a(e).css({
						position: "relative",
						right: c,
						top: 0,
						zIndex: b.options.zIndex - 2,
						opacity: 0
					}) : a(e).css({
						position: "relative",
						left: c,
						top: 0,
						zIndex: b.options.zIndex - 2,
						opacity: 0
					})
			}),
				b.$slides.eq(b.currentSlide).css({
					zIndex: b.options.zIndex - 1,
					opacity: 1
				})
		}
		,
		b.prototype.setHeight = function () {
			var a = this;
			if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
				var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
				a.$list.css("height", b)
			}
		}
		,
		b.prototype.setOption = b.prototype.slickSetOption = function () {
			var c, d, e, f, h, b = this, g = !1;
			if ("object" === a.type(arguments[0]) ? (e = arguments[0],
				g = arguments[1],
				h = "multiple") : "string" === a.type(arguments[0]) && (e = arguments[0],
					f = arguments[1],
					g = arguments[2],
					"responsive" === arguments[0] && "array" === a.type(arguments[1]) ? h = "responsive" : "undefined" != typeof arguments[1] && (h = "single")),
				"single" === h)
				b.options[e] = f;
			else if ("multiple" === h)
				a.each(e, function (a, c) {
					b.options[a] = c
				});
			else if ("responsive" === h)
				for (d in f)
					if ("array" !== a.type(b.options.responsive))
						b.options.responsive = [f[d]];
					else {
						for (c = b.options.responsive.length - 1; c >= 0;)
							b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1),
								c--;
						b.options.responsive.push(f[d])
					}
			g && (b.unload(),
				b.reinit())
		}
		,
		b.prototype.setPosition = function () {
			var a = this;
			a.setDimensions(),
				a.setHeight(),
				a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(),
				a.$slider.trigger("setPosition", [a])
		}
		,
		b.prototype.setProps = function () {
			var a = this
				, b = document.body.style;
			a.positionProp = a.options.vertical === !0 ? "top" : "left",
				"top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"),
				(void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0),
				a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex),
				void 0 !== b.OTransform && (a.animType = "OTransform",
					a.transformType = "-o-transform",
					a.transitionType = "OTransition",
					void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)),
				void 0 !== b.MozTransform && (a.animType = "MozTransform",
					a.transformType = "-moz-transform",
					a.transitionType = "MozTransition",
					void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)),
				void 0 !== b.webkitTransform && (a.animType = "webkitTransform",
					a.transformType = "-webkit-transform",
					a.transitionType = "webkitTransition",
					void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)),
				void 0 !== b.msTransform && (a.animType = "msTransform",
					a.transformType = "-ms-transform",
					a.transitionType = "msTransition",
					void 0 === b.msTransform && (a.animType = !1)),
				void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform",
					a.transformType = "transform",
					a.transitionType = "transition"),
				a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1
		}
		,
		b.prototype.setSlideClasses = function (a) {
			var c, d, e, f, b = this;
			d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"),
				b.$slides.eq(a).addClass("slick-current"),
				b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2),
					b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a,
						d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")),
						0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")),
					b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow,
						e = b.options.infinite === !0 ? b.options.slidesToShow + a : a,
						b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")),
				"ondemand" === b.options.lazyLoad && b.lazyLoad()
		}
		,
		b.prototype.setupInfinite = function () {
			var c, d, e, b = this;
			if (b.options.fade === !0 && (b.options.centerMode = !1),
				b.options.infinite === !0 && b.options.fade === !1 && (d = null,
					b.slideCount > b.options.slidesToShow)) {
				for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow,
					c = b.slideCount; c > b.slideCount - e; c -= 1)
					d = c - 1,
						a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
				for (c = 0; e > c; c += 1)
					d = c,
						a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
				b.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
					a(this).attr("id", "")
				})
			}
		}
		,
		b.prototype.interrupt = function (a) {
			var b = this;
			a || b.autoPlay(),
				b.interrupted = a
		}
		,
		b.prototype.selectHandler = function (b) {
			var c = this
				, d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide")
				, e = parseInt(d.attr("data-slick-index"));
			return e || (e = 0),
				c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e),
					void c.asNavFor(e)) : void c.slideHandler(e)
		}
		,
		b.prototype.slideHandler = function (a, b, c) {
			var d, e, f, g, j, h = null, i = this;
			return b = b || !1,
				i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a),
					d = a,
					h = i.getLeft(d),
					g = i.getLeft(i.currentSlide),
					i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft,
					i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide,
						c !== !0 ? i.animateSlide(g, function () {
							i.postSlide(d)
						}) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide,
							c !== !0 ? i.animateSlide(g, function () {
								i.postSlide(d)
							}) : i.postSlide(d))) : (i.options.autoplay && clearInterval(i.autoPlayTimer),
								e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d,
								i.animating = !0,
								i.$slider.trigger("beforeChange", [i, i.currentSlide, e]),
								f = i.currentSlide,
								i.currentSlide = e,
								i.setSlideClasses(i.currentSlide),
								i.options.asNavFor && (j = i.getNavTarget(),
									j = j.slick("getSlick"),
									j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)),
								i.updateDots(),
								i.updateArrows(),
								i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f),
									i.fadeSlide(e, function () {
										i.postSlide(e)
									})) : i.postSlide(e),
									void i.animateHeight()) : void (c !== !0 ? i.animateSlide(h, function () {
										i.postSlide(e)
									}) : i.postSlide(e))))
		}
		,
		b.prototype.startLoad = function () {
			var a = this;
			a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(),
				a.$nextArrow.hide()),
				a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(),
				a.$slider.addClass("slick-loading")
		}
		,
		b.prototype.swipeDirection = function () {
			var a, b, c, d, e = this;
			return a = e.touchObject.startX - e.touchObject.curX,
				b = e.touchObject.startY - e.touchObject.curY,
				c = Math.atan2(b, a),
				d = Math.round(180 * c / Math.PI),
				0 > d && (d = 360 - Math.abs(d)),
				45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical"
		}
		,
		b.prototype.swipeEnd = function (a) {
			var c, d, b = this;
			if (b.dragging = !1,
				b.interrupted = !1,
				b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0,
				void 0 === b.touchObject.curX)
				return !1;
			if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]),
				b.touchObject.swipeLength >= b.touchObject.minSwipe) {
				switch (d = b.swipeDirection()) {
					case "left":
					case "down":
						c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(),
							b.currentDirection = 0;
						break;
					case "right":
					case "up":
						c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(),
							b.currentDirection = 1
				}
				"vertical" != d && (b.slideHandler(c),
					b.touchObject = {},
					b.$slider.trigger("swipe", [b, d]))
			} else
				b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide),
					b.touchObject = {})
		}
		,
		b.prototype.swipeHandler = function (a) {
			var b = this;
			if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse")))
				switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1,
				b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold,
				b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold),
				a.data.action) {
					case "start":
						b.swipeStart(a);
						break;
					case "move":
						b.swipeMove(a);
						break;
					case "end":
						b.swipeEnd(a)
				}
		}
		,
		b.prototype.swipeMove = function (a) {
			var d, e, f, g, h, b = this;
			return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null,
				!b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide),
					b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX,
					b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY,
					b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))),
					b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))),
					e = b.swipeDirection(),
					"vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(),
						g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1),
						b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1),
						f = b.touchObject.swipeLength,
						b.touchObject.edgeHit = !1,
						b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction,
							b.touchObject.edgeHit = !0),
						b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g,
						b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g),
						b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null,
							!1) : void b.setCSS(b.swipeLeft)) : void 0)
		}
		,
		b.prototype.swipeStart = function (a) {
			var c, b = this;
			return b.interrupted = !0,
				1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {},
					!1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]),
						b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX,
						b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY,
						void (b.dragging = !0))
		}
		,
		b.prototype.unfilterSlides = b.prototype.slickUnfilter = function () {
			var a = this;
			null !== a.$slidesCache && (a.unload(),
				a.$slideTrack.children(this.options.slide).detach(),
				a.$slidesCache.appendTo(a.$slideTrack),
				a.reinit())
		}
		,
		b.prototype.unload = function () {
			var b = this;
			a(".slick-cloned", b.$slider).remove(),
				b.$dots && b.$dots.remove(),
				b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(),
				b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(),
				b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
		}
		,
		b.prototype.unslick = function (a) {
			var b = this;
			b.$slider.trigger("unslick", [b, a]),
				b.destroy()
		}
		,
		b.prototype.updateArrows = function () {
			var b, a = this;
			b = Math.floor(a.options.slidesToShow / 2),
				a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
					a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
					0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
						a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
							a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
								a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
		}
		,
		b.prototype.updateDots = function () {
			var a = this;
			null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"),
				a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
		}
		,
		b.prototype.visibility = function () {
			var a = this;
			a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1)
		}
		,
		a.fn.slick = function () {
			var f, g, a = this, c = arguments[0], d = Array.prototype.slice.call(arguments, 1), e = a.length;
			for (f = 0; e > f; f++)
				if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d),
					"undefined" != typeof g)
					return g;
			return a
		}
});
(function (q) {
	var e = jQuery;
	if ("function" !== typeof e.fn.QD_mosaicBanners) {
		var k = function (c, b) {
			if ("object" === typeof console && "undefined" !== typeof console.error && "undefined" !== typeof console.info && "undefined" !== typeof console.warn) {
				var a;
				"object" === typeof c ? (c.unshift("[Quatro Digital - Mosaic Banners]\n"),
					a = c) : a = ["[Quatro Digital - Mosaic Banners]\n" + c];
				if ("undefined" === typeof b || "alerta" !== b.toLowerCase() && "aviso" !== b.toLowerCase())
					if ("undefined" !== typeof b && "info" === b.toLowerCase())
						try {
							console.info.apply(console, a)
						} catch (f) {
							try {
								console.info(a.join("\n"))
							} catch (d) { }
						}
					else
						try {
							console.error.apply(console, a)
						} catch (f) {
							try {
								console.error(a.join("\n"))
							} catch (d) { }
						}
				else
					try {
						console.warn.apply(console, a)
					} catch (f) {
						try {
							console.warn(a.join("\n"))
						} catch (d) { }
					}
			}
		}
			, l = {
				bannerRowSecurityMargin: 10,
				containerWidth: 1170,
				bannerColSecurityMargin: 15,
				classOneColumn: "col-xs-12",
				classTwoColumn: "col-xs-12 col-sm-6",
				classThreeColumn: "col-xs-12 col-sm-4",
				classFourColumn: "col-xs-6 col-sm-3"
			}
			, m = function (c, b) {
				function a(f) {
					var d, g = new e;
					f.length && (f.each(function () {
						var f = e(this)
							, a = f.offset().top;
						d || (d = a);
						if (a >= d - b.bannerRowSecurityMargin && a <= d + b.bannerRowSecurityMargin)
							g = g.add(f);
						else
							return !1
					}),
						g.wrapAll('<div class="row qd-mb-row"></div>'),
						a(c.find(">div:not(.row)")))
				}
				a(c.find(">div:not(.row)"))
			}
			, n = /width\=.?([0-9]+)/i
			, p = function (c, b) {
				var a = e(c);
				a.each(function () {
					var a = e(this);
					if (a.is(".qd-mb-banner"))
						k(["Este banner jÃ¡ esta processado!", a], "info");
					else {
						a.addClass("qd-mb-banner");
						var d = a.find("img").first();
						if (d.length) {
							var c = parseInt
								, d = d.wrap("<span></span>")
								, h = d.parent().html();
							d.unwrap("span");
							d = h.replace(/\n/g, " ");
							c = c((d.match(n) || [1]).pop(), 10) || 1;
							d = b.containerWidth / 2 * (1 - b.bannerColSecurityMargin / 2 / 100);
							h = b.containerWidth / 3 * (1 - b.bannerColSecurityMargin / 3 / 100);
							c > b.containerWidth * (1 - b.bannerColSecurityMargin / 100) ? a.addClass(b.classOneColumn) : c > d ? a.addClass(b.classTwoColumn) : c > h ? a.addClass(b.classThreeColumn) : a.addClass(b.classFourColumn)
						} else
							k(["Esse elemento nÃ£o possui nenhuma imagem dentro. Certifique-se que esteja chamando um â€œ.box-bannerâ€. Mas vocÃª Ã© burro hein!", a], "info")
					}
				});
				a.parent().each(function () {
					m(e(this), b)
				})
			};
		e.fn.QD_mosaicBanners = function (c) {
			var b = e(this);
			if (!b.length)
				return b;
			c = e.extend({}, l, c);
			b.qdPlugin = new p(b, c);
			return b
		}
			;
		e(function () {
			e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()
		})
	}
}
)(this);
(function () {
	var e = function (b, c) {
		if ("object" === typeof console && "function" === typeof console.error && "function" === typeof console.info && "function" === typeof console.warn) {
			var a;
			"object" === typeof b ? (b.unshift("[Quatro Digital - sessionStorage]\n"),
				a = b) : a = ["[Quatro Digital - sessionStorage]\n" + b];
			if ("undefined" === typeof c || "alerta" !== c.toLowerCase() && "aviso" !== c.toLowerCase())
				if ("undefined" !== typeof c && "info" === c.toLowerCase())
					try {
						console.info.apply(console, a)
					} catch (d) {
						console.info(a.join("\n"))
					}
				else
					try {
						console.error.apply(console, a)
					} catch (e) {
						console.error(a.join("\n"))
					}
			else
				try {
					console.warn.apply(console, a)
				} catch (f) {
					console.warn(a.join("\n"))
				}
		}
	};
	window.qdSessionStorage = window.qdSessionStorage || {};
	var f = "undefined" !== typeof sessionStorage && "undefined" !== typeof sessionStorage.setItem && "undefined" !== typeof sessionStorage.getItem;
	window.qdSessionStorage.setItem = function (b, c, a) {
		try {
			if (!f)
				return !1;
			var d = new Date;
			sessionStorage.setItem(b, c);
			isNaN(parseInt(a)) || (d.setTime(d.getTime() + 6e4 * a),
				sessionStorage.setItem(b + "_expiration", d.getTime()))
		} catch (g) {
			e(["Aeeee irmÃ£o! Algo saiu errado ao tentar salvar os dados no armazenamento da sessÃ£o. Detalhes: ", g.message], "alerta")
		}
	}
		;
	window.qdSessionStorage.getItem = function (b) {
		try {
			if (!f)
				return !1;
			var c = new Date
				, a = parseInt(sessionStorage.getItem(b + "_expiration") || 0, 10) || 0;
			return c.getTime() > a ? (sessionStorage.removeItem && (sessionStorage.removeItem(b),
				sessionStorage.removeItem(b + "_expiration")),
				null) : sessionStorage.getItem(b)
		} catch (d) {
			e(["Aeeee irmÃ£o! Algo saiu errado ao tentar obter os dados no armazenamento da sessÃ£o. Detalhes: ", d.message], "alerta")
		}
	}
}
)();
eval(function (p, a, c, k, e, d) {
	e = function (c) {
		return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
	}
		;
	if (!"".replace(/^/, String)) {
		while (c--) {
			d[e(c)] = k[c] || e(c)
		}
		k = [function (e) {
			return d[e]
		}
		];
		e = function () {
			return "\\w+"
		}
			;
		c = 1
	}
	while (c--) {
		if (k[c]) {
			p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c])
		}
	}
	return p
}('(5(G,e){V("5"!==M e.32.J){e.32.J=5(){};e.J={};8 C,D,A,E=-1<6z.6A.1A.1v().3c("6B"),m=5(e,p){V("2c"===M 1j){8 c;"2c"===M e?(e.52("[1M 24]\\n"),c=e):c=["[1M 24]\\n"+e];"11"===M p||"1n"!==p.1v()&&"4y"!==p.1v()?"11"!==M p&&"1D"===p.1v()?1j.1D.27(1j,c):1j.2N.27(1j,c):1j.4I.27(1j,c)}},u=5(e,p){V("2c"===M 1j&&E){8 c;"2c"===M e?(e.52("[1M 24]\\n"),c=e):c=["[1M 24]\\n"+e];"11"===M p||"1n"!==p.1v()&&"4y"!==p.1v()?"11"!==M p&&"1D"===p.1v()?1j.1D.27(1j,c):1j.2N.27(1j,c):1j.4I.27(1j,c)}},B=!1;1x{2q.3W(2q.5w({a:"b"})),B=!0}1u(H){m("6y 6x n\\1a 2W 4p a 2q 6u","1n")}8 F={56:"1K[6v]",6w:"N\\1a 1w 6C\\2k 1I 3N 6D\\2U\\6J 6K 6L.",3J:"6I: R$ #3v",2P:"R$ ",6H:".P-3x[6E=\'6F\']",37:!1,3U:!1,3e:!1,5o:!1,4a:!0,2p:!1,5b:!1,5y:!0,3O:!1,1P:14,3P:!1,4l:!0,3p:!0,1o:6G,2K:4,3w:2,3i:14,3a:{1O:36,2n:36},2e:"3y",2T:!0,2Y:!0,1b:["6t"],2x:[14],33:14,58:!0,4H:5(){},3r:5(){},4d:5(e,p,c,g,a){},2F:5(e,p,c){1x{U e.1r(/(6s\\/[0-9]+\\-)([0-9]+\\-[0-9]+)/i,"$1"+p+"-"+c)}1u(g){U m(["31 28 3r \'2F\'. ",g.1H],"1n"),""}},4V:5(e,p,c,g){g(!1)},1m:!0,4j:2,49:30,5n:3,6f:"/6g-6h"},x=5(e){8 p={j:"6e%7%3D%7%1f%7%1e",6d:"69%7%1f%7%1e",6a:"6b%7%5x%7%1f%7%1e",6c:"6i%7%2C%7%1f%7%1e",6j:"6p%7%2G%7%1f%7%1e",6q:"6r%7%5g%7%3H%7%1f%7%1e","2o%5p":"2%3D%7%2C%7%1f%7%1e","2o%7":"%3D%7%2G%7%1f%7%1e","2o%7%":"3H%7%1f%7%1e",6o:"6n%7%1f%7%1e","2u%25":"3l%5x%7%1f%7%1e","2u%5p":"2%2C%7%1f%7%1e","2u%7":"%2G%7%1f%7%1e","2u%7%":"5g%7%3H%7%1f%7%1e","2o%7%6k":"6l%7%2C%7%1f%7%1e","2o%7%6m":"6M%7%2G%7%1f%7%1e"};U 5(c){8 e,a,d,k;a=5(a){U a};d=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];c=c["d"+d[16]+"c"+d[17]+"m"+a(d[1])+"n"+d[13]]["l"+d[18]+"c"+d[0]+"6N"+a("o")+"n"];e=5(a){U 7d(7e(a.1r(/\\./g,"\\7f").1r(/[a-3L-Z]/g,5(a){U 7c.7b(("Z">=a?90:78)>=(a=a.79(0)+13)?a:a-26)})))};8 b=e(c[[d[9],a("o"),d[12],d[a(13)]].2f("")]);e=e((1p[["68",a("28"),"m",d[1],d[4].7a(),"7g"].2f("")]||"---")+[".v",d[13],"e",a("x"),"7h",a("7n"),"7o",d[1],".c",a("o"),"m.",d[19],"r"].2f(""));X(8 l 1Q p){V(e===l+p[l]||b===l+p[l]){k="7p"+d[17]+"e";2z}k="f"+d[0]+"7m"+a(d[1])+""}a=!1;-1<c[[d[12],"e",d[0],"7l",d[9]].2f("")].3c("7i%47%3X%84%3b%82%3b%8F%7j%7k%3l%77%3l%76%3b%82%47%3X%84%6T%82")&&(a=!0);U[k,a]}(e)}(1p);V(!6U(x[0]))U x[1]?m("\\6V\\6S\\4u \\6R\\1Z\\6O\\6P\\4x\\1Z\\4x\\4u \\6Q\\1Z\\6W\\1Z \\6X\\73\\74\\1Z L\\75\\1Z!"):!1;e.32.J=5(x){1x{e("");8 p=/72?\\:\\/\\/[^\\/\\?#]+/i,c=e.71(!0,{},F,x),g={6Y:14,2y:14,3n:14,2s:14,3t:0,2I:!1,6Z:[],70:[],3G:{},4c:{},1V:14,7q:{},4G:5(){g.1V.4Z().5C(\'1S[2r*="4A"]\')&&0>g.1V.3x.3c("5c")&&m("5F 5G! 5H\\60 2H 5Y 2S 61 34 \\50 3Y 2E \\65[2r*=4A]\\1G, 2W 5P 34 46 4R 2H 4N? 5Q 2S 3Y 5U 5M 1S (5c) 5N 4O-5O 28 4R 63 64 62 5X 21 1M. #5Z","1n");g.1V.3z(5(a){8 c=e(1y);c.41("I-4m")||g.53(c,a)})},53:5(a,d){8 k=a.6(c.56).3f(".5V");V(1>k.Q)U m("24 n\\1a 67 \\n ("+k.3x+")"),!1;a.S("I-4m");k.3z(5(a){8 b,k,h,n,z,y,q,r,t,v;b=e(1y);!0===c.4a&&g.5d(b);k=b.6(".5L");h=b.6(".I-5S");y=d.4L()+"3I"+a.4L();r=5(a,d){z=g.48(a,y);n=c.2Y?g.2Y(z,d):c.2T?g.2T(z,d):z;0<z.Q&&0===n.Q&&u("O 1t 2r "+d+" 4o "+a.Q+\' 66 1W 5E 5D 4t\\4f o 5K 4X 4O\\2U\\1a n\\1a 5T 59 1L 2b 46 1t. 5I-5J 2E 5R 5W o 4w 4N 2b a 7x\\2U\\8O\\1a "1b".\',"1n");b.6(".I-2t 2g").S("I-2M");(c.3e||c.5o)&&k.S("1i").W("1d");8 l=14;V("5"===M c.33&&(l=c.33(b),"1z"===M l&&""!==l||"8P"===M l))X(8 f=0;f<n.Q;f++)V(n[f][1]==l){8 h=n[f];n[f]=n[0];n[0]=h;2z}v=n.Q;V(v>=c.3w){v>c.2K&&(b.6(".5r").S("1i").W("1d"),b.6(".Y-2d-P-8N").1F(v));X(8 r,q,m,w,f=0;f<v;f++)V(h=n[f][1],r=n[f][0].2J(),q=r.1r(p,""),c.2p&&!e.J.K.P[h].4D)u(["O P \\3s"+h+"\\1G 1w 3m 2B n\\1a 4o 8M. 8K: ",b],"1D");1Y V(c.3U&&q==(b.6(".1X:2V").1c("1A")||"").2J().1r(p,""))u("O P \\3s"+h+"\\1G 1w 3m 2B 2W o 4Y 2R 34 o 1t 8L 5a 55.\\n 4T: "+q,"1D");1Y V(c.5y&&0<b.6(".I-2Z[4e=\'"+q+"\']").Q)u("O P \\3s"+h+"\\1G 1w 3m 2B j\\8Q 8R 8W 4S 5a 55 4J o 4Y 2R.\\n 4T: "+q,"1D");1Y V(m=b.1k("Y-2d-P-3A")||0,b.1k("Y-2d-P-3A",m+1),m>=c.2K-1){b.6(".5r").S("Y-2d-45-P-8X");2z}1Y""!==h&&(w=r,c.3p&&(w=e(\'<a 1A="\'+r+\'"></a>\')[0],w.2a+=(w.2a.Q?"&":"")+"3S="+h,w=w.1A),m=e("<1s 1l=\'I-2Z I-8V"+(m-1)+" I-8U"+h+" 1d\' "+(l==h?\'1k-8S-P="1"\':"")+"><1s 1l=\'I-8T\'><a 1A=\'"+w+"\' 1l=\'Y-5h\'></a></1s><1s 1l=\'I-8J\'></1s></1s>"),m.1c({4e:q,2r:h}),k.3k(g.4k(b,h,m,r,y)))}k.S("Y-2d-8I-3A-"+k.6(".I-2Z").Q);t=b.6(".I-2Z");t.Q>=c.3w&&t.W("1d");t.2V().S("I-8x");e(1p).1U("1R.8y",{1K:b,5e:k,1k:e.J.K})};c.5b?(a=h.6("1K").1F().2J().23("|"),E&&""===h.6("1K").1F().2J()&&u("O 3g 1t n\\1a 2H 8w 59 8Z.\\n 8v: "+(b.6(".1X[4P]:2V").1c("4P")||"[T\\8t n\\1a 8u]"),"1D"),r(a)):(q=b.6(".3Z").2i(),h=b.6(".3M").2i(),"11"===M q&&m(["N\\1a 1w 2D\\2k 1I o 8z 21 1t 28 3g \\8A\\1G.",b]),"11"===M h&&m("N\\1a 1w 2D\\2k 1I a 8G 21 1t 28 3g \\8H\\1G."),g.5f(5(a,c){r(a,q);e(1p).1U("1R.8E",{1K:b,5e:k})},q,h,b))})},5f:5(a,d,k,b){c.1m&&C.5u(1y,a,d,k,b)},8D:5(a){8 c,k,b=[a];c=a.6(".3Z").2i();k=a.6(".3M").2i();"11"!==M c&&"11"!==M k&&(b=[c,k,a]);U b},48:5(a,c){8 d={},b=[],e,f,h;h=a.Q;V(2>h&&""===a[0])U b;X(8 n=0;n<h;n++)e=a[n].23(";"),f=e.3V(),e=e.3o(),"11"!=M f&&("11"==M d[e]?d[e]=[f]:d[e].15(f));X(8 g 1Q d){h=d[g].Q;f=[];V(3<h){8 m,q;e=3C(h/3,10);m=h%3;q=2*e;X(n=0;n<e;n++)f.15(d[g][n]),f.15(d[g][n+e]),f.15(d[g][n+q]);1==m?f.15(d[g][h-1]):2==m&&(f.15(d[g][h-1]),f.15(d[g][h-2]))}1Y f=d[g];b.15([f.3o(),g])}U b},2Y:5(a,d){8 k,b;e.J.K.1E=e.J.K.1E||{};X(8 l=0;l<a.Q;l++){b=a[l][1];b=e.J.K.P[b];k=[];X(8 f=0;f<c.1b.Q;f++)"1z"===M b.1b[c.1b[f]]&&k.15(c.1b[f]);e.J.K.1E[b.1g]=e.J.K.1E[b.1g]||{};X(f=0;f<k.Q;f++)c.2p&&m("O 1M 8B n\\1a 2W 3N 8C 4h\\8Y 2b 44 o 4w \\9h\\1G 54 9i 4J \\9g\\1G, 4h\\9f 9j o c\\9d 2b 95 4p a 94."),"11"!=M b.1b[k[f]]&&"11"==M e.J.K.1E[b.1g][b.1b[k[f]]]&&(e.J.K.1E[b.1g][b.1b[k[f]]]=a[l])}8 l=[],h;X(h 1Q e.J.K.1E[b.1g])l.15(e.J.K.1E[b.1g][h]);U l},2T:5(a,d){V(!c.1m||!c.4l)U a;8 k,b,l,f;k=[];e.J.K.1h=e.J.K.1h||{};V("11"!==M e.J.K.1h[d]&&"2c"===M e.J.K.1h[d].20&&0<e.J.K.1h[d].20.Q)U k.93(e.J.K.1h[d].20);X(8 h=0;h<a.Q;h++){f=a[h][1];l=e.J.K.P[f];b=[];X(8 n=0;n<c.1b.Q;n++)"1z"===M l.1b[c.1b[n]]&&b.15(c.1b[n]);e.J.K.1h[l.1g]=e.J.K.1h[l.1g]||{};X(n=0;n<b.Q;n++)e.J.K.1h[l.1g][l.1b[b[n]]]=e.J.K.1h[l.1g][l.1b[b[n]]]||[],e.J.K.1h[l.1g].20=e.J.K.1h[l.1g].20||[],e.J.K.1h[l.1g][l.1b[b[n]]].Q||(k.15(a[h]),e.J.K.1h[l.1g].20.15(a[h])),e.J.K.1h[l.1g][l.1b[b[n]]].15(f)}U k},4k:5(a,d,e,b,l){e.S("I-5k");g.5s(a,d,a.6(".I-4W"),c.4j,e,b,l);c.4d(a,e,g.4c,g.3G,d);U e},2p:5(a,c,e,b,l,f){g.4b(a,c,e,b,l)},4b:5(a,d,k,b,l){g.5m(k,b);g.5A(k,b,d);k.4i("91.4g",5(){1x{a.6(".29").W("29");k.S("29");V(c.37){g.2y=a.6(".3u").9e().92();g.3n=a.6(".1X:2V").1c("1A")||"";8 d=a.6(".I-1T");g.2s=[d.1B()||"",d.1c("1l")||""]}g.4E(b,a,l);g.2I=!0;e(1p).1U("1R.96",{1k:b[0],1K:a,2R:l})}1u(h){m(h.1H)}});c.37&&k.4i("97.4g",5(){1x{a.6(".29").W("29"),g.40(a),g.2I=!1,e(1p).1U("1R.9c",{1k:b[0],1K:a,2R:l})}1u(f){m(f.1H)}});U k},4E:5(a,d,k){8 b,l,f,h,n,m,y,q,r,t,v,u;d.S("I-38");a=a[0];a.4D||a.9b||c.3e?(b=d.6(".3B"),r=a.9a||a.98,t=c.1m?a.99/2Q:a.8r,v=c.1m?a.4C/2Q:a.4B,b.S("1i").W("1d"),d.6(".3E").S("1d").W("1i"),b.6(".7r").1F(c.2P+g.2h(c.1m?a.4C/2Q:a.4B)),d.6(".I-1T").1B(c.3J.1r("#3v",g.2h(t-v))),v<t?(b.6(".4v").S("1i").W("1d").6(".7M").1F(c.2P+g.2h(t)),d.6(".I-1T").S("1i").W("1d")):(b.6(".4v").S("1d").W("1i"),d.6(".I-1T").S("1d").W("1i")),1<r?(t=b.6(".4z").S("1i").W("1d"),t.6(".7N").1F(r),t.6(".7L").1F(c.2P+g.2h(c.1m?a.7K/2Q:a.7I)),b.6(".4K").S("1d").W("1i")):(b.6(".4z").S("1d").W("1i"),b.6(".4K").S("1i").W("1d"))):(d.6(".3B").S("1d").W("1i"),d.6(".3E").S("1i").W("1d"));b=a.5j||a.2v;c.3O&&(7J(c.1P)||14===c.1P?d.6(".Y-2X").1B(b):c.3P&&(b||"").Q>c.1P?(b=(b||"").3T(0,c.1P+1).23(" "),b.3V(),d.6(".Y-2X").1B(b.2f(" ")+" ...")):(b||"").Q>c.1P?d.6(".Y-2X").1B((b||"").3T(0,c.1P)+" ..."):d.6(".Y-2X").1B(b||""));b=d.6(".1X");""!==k&&b.1c("1A",k.1r(p,""));c.3p&&(b[0].2a+=(b[0].2a.Q?"&":"")+"3S="+(a.P||a.1J));l=d.6(".I-2t");f=d.6(".I-57");h=l.6(".I-2M");b=h[0];k=h.1c("1O")||b.7O;b=h.1c("2n")||b.7P;c.1m&&"3y"==c.2e&&(c.2e={1O:k,2n:b});u=5(a,b){8 k=a.P||a.1J;n=g.3q(a,c.49,c.1m,b);V("1z"!==M b||""!==n[0])m=d.6("2g[2j*=\'"+(n[0].23("?").3o()||h.1c("2j"))+"\']:3f(\'.I-5z\')"),y=0<m.Q?!0:!1,f.45(),y?(h.1q(!0).W("Y-1C").2l(c.1o),f.39(),d.6(".I-2w").1q(!0).W("Y-1C").2l(c.1o),m.1q(!0).S("Y-1C").2m(c.1o,1),m.1c("1k-P",k),"1z"===M b&""!==b&&m.1c("1k-P-3d",b),m.7U("[1k-P=\'"+k+"\']").1q(!0).S("Y-1C").2m(c.1o,1)):(q=e(\'<2g 2j="\'+(n[0]||h.1c("2j"))+\'" 3j="" 1l="I-2w" 7T="7S:7Q;" 1k-P="\'+k+\'" />\'),"1z"===M b&""!==b&&q.1c("1k-P-3d",b),q.7R(5(){g.2I?(h.1q(!0).W("Y-1C").2l(c.1o),f.39(),d.6(".I-2w").1q(!0).W("Y-1C").2l(c.1o),q.1q(!0).S("Y-1C").2m(c.1o,1),d.6(".I-2w[1k-P=\'"+k+"\']").1q(!0).S("Y-1C").2m(c.1o,1)):(f.39(),g.35(d))}),l.3k(q))};X(8 x 1Q c.2x)"5"!==M c.2x[x]&&A(a.P,5(a){u(a[0],c.2x[x])},!0)},40:5(a){14!==g.2y&&a.41("I-38")&&(a.W("I-38").6(".3u").1B(g.2y),g.35(a),g.5l(a),g.5B(a))},35:5(a){a=a.6(".I-2t");a.6(":3f(.I-2M)").1q(!0).2l(c.1o);a.6(".I-2M").1q(!0).2m(c.1o,1)},5l:5(a){a.6(".1X").1c("1A",g.3n)},5B:5(a){a.6(".I-1T").1B(g.2s[0]).1c("1l",g.2s[1])},5m:5(a,d){8 e=5(b,d,e){d=g.3q(b[0],c.5n,!1,d,e);a.W("I-5k");0<d.Q&&(a.7H("7G-2L","2A(\'"+d[0]+"\')"),a.6(".Y-5h").3k(\'<2g 2j="\'+d[0]+\'" 3j="" 1l="I-5z I-7w\'+(b[0].P||b[0].1J)+\'" 3j=""/>\'))};c.1m&&14!==c.3i?A(d[0].P||d[0].1J,5(a){e(a,c.3i,d[0])},!0):e(d)},5s:5(a,d,e,b,l,f,h){c.1m?D.5u(1y,a,d,e,b,l,f,h):m("8s m\\7v 1w 7u =/")},2h:5(a){X(8 d="",c=a.7s(2).23("."),b=0,e=c[0].23("").Q,f=c[0].Q;0<f;f--)a=c[0].7t(f-1,1),b++,0===b%3&&e>b&&(a="."+a),d=a+d;U d+","+c[1]},3q:5(a,d,e,b,g){d=[];8 f,h;f=a.2L||a.7y;h=5(a,c){8 d=[];V(1>a.Q)U m("N\\1a 7z 7E 7F 2b o 1L: "+c.1J),d;X(8 e 1Q a)X(8 f 1Q a[e])V(14!==b&&"1z"===M b?a[e][f].2v&&b.1v()==a[e][f].2v.1v():a[e][f].7D){d.15(a[e][f].7C);2z}U d};"1z"===M b&&(f=h(f,a),f.Q?f=f[0]:("11"!==M g&&"11"!==M g.2L?f=g.2L:(f="",u("N\\1a 1w 2D\\2k 1I a 4M 7A\\1a 21 1L 2B o 7B 7V 28 7W 8i \\50 8j 8h 2H 54 2S 8g n\\1a 8e. 1L:"+a.1J,"1n")),u("N\\1a 1w 2D\\2k 1I a 4M 3h 4S 4X 3d. 1L:"+a.1J,"1n")));e?d.15(c.2F("1z"===M f?f:h(f,a)[0],c.2e.1O,c.2e.2n),f):d.15(c.2F(f,c.3a.1O,c.3a.2n),f);U d},5A:5(a,d,e){c.1m?a.S("I-5t"+d[0].5j.1r(/[^a-3L-5v-9\\-\\3I]/g,"")):a.S("I-5t"+d[0].2v.1r(/[^a-3L-5v-9\\-\\3I]/g,""))},5d:5(a){1x{a.6("a[1A=\'"+a.6(".3M").2i()+"\']").S("1X");8 d=14;a.6("2g").3z(5(){8 a=e(1y);d=14===d?a:d;3C(d.1c("1O")||0,10)<3C(a.1c("1O")||0,10)&&(d=a)});d.5q(\'<1S 1l="I-57"></1S>\');d.4Z().S("I-2t");8 k=2O(\'<1s 1l="I-8f"><1S 1l="I-4W"></1S></1s>\'),b=2O(\'<1s 1l="3u"></1s>\'),l=a.6(".3B");l.5q(k);l.3K(b);a.6(".3E").3K(b);b.3K(k);V(1>g.3t){8 k=/\\8k\\$\\s[0-9]+,[0-9]{1,2}/i,f=a.6(".I-1T").1F();-1<f.2a(k)&&(c.3J=f.1r(k," R$ #3v"));g.3t++}}1u(h){m(["3F 1W 51 o 3y 8l. 4F: ",h.1H],"1n")}}};C=5(a,d,k,b){5 l(a,b,d,f){1x{e.J.K=e.J.K||{3Q:{},P:{}};e.J.K.3Q[d]=a;X(8 k 1Q a.1N)"5"!==M a.1N[k]&&(h.15(a.1N[k].P+";"+f),g.3G[a.1N[k].P]=d,e.J.K.P[a.1N[k].P]=a.1N[k],e.J.K.P[a.1N[k].P].1g=d);b(h);c.4H();e(1p).1U("1R.8q",1y)}1u(t){m(["8p 2S 8o 4t\\4f o 8m 3h 8n\\2U\\1a a 42 2E 1t 3h 8d. 4F: ",t.1H])}}5 f(a,b,d){8 c=!1;V(B)1x{(c=2q.3W(1p.4U.8c("4Q"+b)))&&l(c,a,b,d)}1u(r){m("3F 1W 44 o 81. "+r.1H,"1n")}c||e.5i({2A:"/42/83/80/7Z/7X/"+b,7Y:"43",3R:5(c){l(c,a,b,d);B&&1p.4U.85("4Q"+b,2q.5w(c),86)},2N:5(){m("31 1W 4s 1I 4q 4r 2E 1L 21 1t")},4n:14})}8 h=[];c.4V(b,d,k,5(b){V(b)1x{8 e=1,g=0;f(5(b){g+=1;e===g&&a(b)},d,k);X(8 h=0;h<b.Q&&(!c.58||h!==c.2K);h++)e+=1,f(5(b){g+=1;e===g&&a(b)},b[h].2r,b[h].2A)}1u(r){m(r.1H)}1Y f(5(b){a(b)},d,k)})};D=5(a,d,c,b,l,f,h){g.2p(a,d,l,[e.J.K.P[d]],f,h)};A=5(a,d,c){V("11"!==M e.J.K.P[a]&&"11"!==M e.J.K.P[a].22)U"5"===M d&&d(e.J.K.P[a].22),e.J.K.P[a].22;e.5i({2A:"/1t/P/"+a,1k:"43",3R:5(b){e.J.K.P[a].22=b;"5"===M d&&d(e.J.K.P[a].22)},2N:5(){m("31 1W 4s 1I 8b 4q 4r 21 1L.")},8a:"11"!==M c?c:!1,4n:14});U e.J.K.P[a].22};g.1V=2O(1y);g.4G();c.3r();e(1p).1U("1R.89",1y);U g.1V}1u(a){m(["3F 1W 51 o 87 1M 24, 88: ",a.1H],"1n")}}}})(1y,2O);', 62, 578, "|||||function|find|25C2|var||||||||||||||||||||||||||||||||||||vtex|QD_coresPrateleira|SkuDataCache||typeof|||sku|length||addClass||return|if|removeClass|for|qd|||undefined|||null|push|||||u00e3o|dimensions|attr|qd_cpHide|25A8oe|25A8pbz|productId|dimension|qd_cpShow|console|data|class|isSmartCheckout|alerta|speedFade|window|stop|replace|span|produto|catch|toLowerCase|foi|try|this|string|href|html|visible|info|dimension2|text|u201d|message|obter|Id|li|SKU|Cores|skus|width|productNameLimiter|in|QuatroDigital|div|cpSave|trigger|productShelf|ao|qd_cpProductLink|else|u0391|uniqueSkuByDimension|do|fullData|split|Prateleira|||apply|no|vtex_cpActiveSku|search|para|object|cp|imageSize|join|img|numberFormat|val|src|u00edvel|fadeOut|fadeTo|height|jjj|checkIsAvaliable|JSON|id|productOriginalSave|cpProductImage|dqsnezra|Name|cpSkuImage|imageLabel|productOriginalInfo|break|url|pois|25A8igrkpbzzreprorgn|poss|de|imageUrl|25A8igrkpbzzreprfgnoyr|esta|onHover|trim|thumbsQuantity|image|cpOriginalImage|error|jQuery|currency|100|link|um|groupSkuByDimension|u00e7|first|tem|cpProductName|groupSkuByDimension2|cpSkuIds||Erro|fn|primarySkuThumb|que|setOriginalImg||restoreOriginalDetails|cpInfoFromSKU|hide|thumbSize|D1|indexOf|label|forceAvailable|not|campo|da|thumbByLabel|alt|append|C2|ignorado|productOriginalLink|shift|addSkuIdInURL|getImageUrl|callback|u201c|saveCount|qd_cpProductInfoWrap|value|minSkuQttShow|selector|auto|each|count|qd_cpProductInfo|parseInt|25A8sneznpvnvaqvnan|qd_cpProductUnavailable|Problemas|skuProduct|25A8dhngebqvtvgny|_|saveText|appendTo|zA|qd_cpUri|as|replaceProductName|productNameStopInLastWord|prod|success|idsku|substring|checkLinkEquals|pop|parse|B8|filho|qd_cpProdId|setOriginalElements|hasClass|api|json|usar|show|este|E0|groupSku|productImgId|autoSetup|mouseActions2|productHtml|thumbRendered|ref|u00f3s|qd_cp_mouse|necess|bind|action|setThumbs|checkDuplicateSKUByDimenion|cpIsActivated|clearQueueDelay|possui|suporte|os|dados|tentar|ap|u0472|qd_cpListPriceWrap|parametro|u2202|aviso|qd_cpInstallment|ResultItems_|Price|bestPrice|available|formatInfo|Detalhes|init|ajaxCallback|warn|com|qd_cpFullRegularPrice|toString|imagem|correto|especifica|title|QD_cp_prod_info_|seletor|thumb|URI|qdSessionStorage|similarProducts|cpOverlay|por|mesmo|parent|u00e9|executar|unshift|exec|em|vitrine|productsLi|cpImgOverlay|limitRequestSimilarProducts|nenhum|na|useProductField|ResultItems|shelfSetup|wrapper|getProductInfo|25A8igrk|cpInnerLink|qdAjax|skuname|cpLoadingData|setOriginalLink|setImgThumb|thumbImgId|forceImgList|25C|before|qd_cpViewMore|loadSku|cp_|call|Z0|stringify|25A8igrkpbzzrepr|checkDuplicateUri|cpImgsThumb|setClass|setOriginalSaveText|is|mas|total|Ei|Psiuu|Voc|Certifique|se|agrupamento|qd_cpSkuList|desta|sem|la|certeza|Selecionar|ter|cpProductField|restou|direto|helperComplement|passado|bizarrooooos|selecionando|fkdica|u00ea|elemento|comportamentos|pode|causar|u201cdiv|SKUs|encontrada|js|eznpvnvaqvnan|sne|znpvnvaqvnan|snez|sn|jj|productPageUrl|cores|prateleira|npvnvaqvnan|snezn|25A8dq|snezra|25A8dqs|gny|dhngebqvtv|pvnvaqvnan|sneznp|vnvaqvnan|ids|Cor|functions|layout|messageRequestFail|navegador|Este|document|location|debugcp|posss|informa|name|espec_0|200|skuGroupSelector|Economize|u00f5es|deste|item|nezra|ti|u2113|u00a1|u03a1|u221a|u00c3|C5|eval|u0e17|u0ae8|u0aef|loadSkuJqxhr|skuList|skuQueue|extend|https|u0abd|u01ac|u0472J|A1|A1g|122|charCodeAt|toUpperCase|fromCharCode|String|escape|encodeURIComponent|u00a8|ite|co|qu|CF|83d|rc|ls|mm|erc|tr|productSkus|qd_cpBestPrice|toFixed|substr|descontinuado|u00e9todo|cpThumb_|op|Images|foram|padr|objeto|Path|IsMain|encontradas|imagens|background|css|BestInstallmentValue|isNaN|installmentsValue|qd_cpInstallmentValue|qd_cpListPrice|qd_cpNumbersOfInstallment|naturalWidth|naturalHeight|none|load|display|style|siblings|fornecido|ambiente|variations|dataType|products|pub|cache||catalog_system||setItem|120|QD|detalhes|cp_callback|async|todos|getItem|VTEX|esperado|cpProductTextWrap|formato|ou|SmartCheckout|inexistente|sR|setup|retorno|requisi|problema|Ocorreu|cp_ajaxCallback|ListPrice|Esse|u00edtulo|encontrado|Produto|retornando|cpFirst|cp_thumbsWrapperAdd|ID|u201cqd_cpProdId|ainda|funcionalidades|getRelatedProductInfo|cp_liAjaxCallback||URL|u201cqd_cpUri|thumbs|cpInner2|Wrapper|existente|estoque|qtt|u00f5|number|u00e1|existe|primary|cpInner|cpSkuId_|cpIndex_|uma|availables|u00e1rias|valor||mouseenter|clone|concat|isso|dar|cp_thumbMouseenter|mouseleave|BestInstallmentNumber|listPrice|installments|Availability|cp_thumbMouseleave|u00f3digo|children|u00e1rio|u201cgroupSkuByDimension2|u201ccheckIsAvaliable|conjunto|desenvolver".split("|"), 0, {}));
(function () {
	function b(a) {
		var b = $("ul.thumbs").not(a);
		a.html(b.html());
		"function" === typeof clickThumbs1 && clickThumbs1();
		a.trigger("QuatroDigital.pt_callback", [a])
	}
	"function" !== typeof $.fn.QD_productThumbs && ($.fn.QD_productThumbs = function () {
		var a = $(this);
		return a.length ? $.extend({}, a, new b(a)) : a
	}
		,
		$(function () {
			$(".QD-thumbs").QD_productThumbs()
		}))
}
)();
$(document).ready(function () {
	$('body').find('script[src="https://autoglasshml.vteximg.com.br/scripts/vtex.viewpart.imagecontrol3.js"]').remove()
});
$(window).load(function () {
	var a = $(".fb-comments");
	a.length && a.attr("data-href", document.location.href.split("#").shift().split("?").shift());
	$("#fb-root").length || $("body").append('<div id="fb-root"></div>');
	if (!$("script#facebook-jssdk").length) {
		a = $("meta[property='fb:app_id']").attr("content") || !1;
		var b, c = document.getElementsByTagName("script")[0];
		document.getElementById("facebook-jssdk") || (b = document.createElement("script"),
			b.id = "facebook-jssdk",
			b.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3" + (a ? "&appId=" + a : ""),
			c.parentNode.insertBefore(b, c))
	}
	"undefined" !== typeof FB && "undefined" !== typeof FB.XFBML && FB.XFBML.parse()
});
(function () {
	"function" !== typeof $.cookie && function (c) {
		"function" === typeof define && define.amd ? define(["jquery"], c) : "object" === typeof exports ? c(require("jquery")) : c(jQuery)
	}(function (c) {
		function p(a) {
			a = e.json ? JSON.stringify(a) : String(a);
			return e.raw ? a : encodeURIComponent(a)
		}
		function n(a, g) {
			var b;
			if (e.raw)
				b = a;
			else
				a: {
					var d = a;
					0 === d.indexOf('"') && (d = d.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
					try {
						d = decodeURIComponent(d.replace(l, " "));
						b = e.json ? JSON.parse(d) : d;
						break a
					} catch (h) { }
					b = void 0
				}
			return c.isFunction(g) ? g(b) : b
		}
		var l = /\+/g
			, e = c.cookie = function (a, g, b) {
				if (1 < arguments.length && !c.isFunction(g)) {
					b = c.extend({}, e.defaults, b);
					if ("number" === typeof b.expires) {
						var d = b.expires
							, h = b.expires = new Date;
						h.setTime(+h + 864e5 * d)
					}
					return document.cookie = [e.raw ? a : encodeURIComponent(a), "=", p(g), b.expires ? "; expires=" + b.expires.toUTCString() : "", b.path ? "; path=" + b.path : "", b.domain ? "; domain=" + b.domain : "", b.secure ? "; secure" : ""].join("")
				}
				for (var d = a ? void 0 : {}, h = document.cookie ? document.cookie.split("; ") : [], m = 0, l = h.length; m < l; m++) {
					var f = h[m].split("="), k;
					k = f.shift();
					k = e.raw ? k : decodeURIComponent(k);
					f = f.join("=");
					if (a && a === k) {
						d = n(f, g);
						break
					}
					a || void 0 === (f = n(f)) || (d[k] = f)
				}
				return d
			}
			;
		e.defaults = {};
		c.removeCookie = function (a, e) {
			if (void 0 === c.cookie(a))
				return !1;
			c.cookie(a, "", c.extend({}, e, {
				expires: -1
			}));
			return !c.cookie(a)
		}
	})
}
)();
(function () {
	"function" !== typeof $.cookie && function (c) {
		"function" === typeof define && define.amd ? define(["jquery"], c) : "object" === typeof exports ? c(require("jquery")) : c(jQuery)
	}(function (c) {
		function p(a) {
			a = e.json ? JSON.stringify(a) : String(a);
			return e.raw ? a : encodeURIComponent(a)
		}
		function n(a, g) {
			var b;
			if (e.raw)
				b = a;
			else
				a: {
					var d = a;
					0 === d.indexOf('"') && (d = d.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
					try {
						d = decodeURIComponent(d.replace(l, " "));
						b = e.json ? JSON.parse(d) : d;
						break a
					} catch (h) { }
					b = void 0
				}
			return c.isFunction(g) ? g(b) : b
		}
		var l = /\+/g
			, e = c.cookie = function (a, g, b) {
				if (1 < arguments.length && !c.isFunction(g)) {
					b = c.extend({}, e.defaults, b);
					if ("number" === typeof b.expires) {
						var d = b.expires
							, h = b.expires = new Date;
						h.setTime(+h + 864e5 * d)
					}
					return document.cookie = [e.raw ? a : encodeURIComponent(a), "=", p(g), b.expires ? "; expires=" + b.expires.toUTCString() : "", b.path ? "; path=" + b.path : "", b.domain ? "; domain=" + b.domain : "", b.secure ? "; secure" : ""].join("")
				}
				for (var d = a ? void 0 : {}, h = document.cookie ? document.cookie.split("; ") : [], m = 0, l = h.length; m < l; m++) {
					var f = h[m].split("="), k;
					k = f.shift();
					k = e.raw ? k : decodeURIComponent(k);
					f = f.join("=");
					if (a && a === k) {
						d = n(f, g);
						break
					}
					a || void 0 === (f = n(f)) || (d[k] = f)
				}
				return d
			}
			;
		e.defaults = {};
		c.removeCookie = function (a, e) {
			if (void 0 === c.cookie(a))
				return !1;
			c.cookie(a, "", c.extend({}, e, {
				expires: -1
			}));
			return !c.cookie(a)
		}
	})
}
)();
(function (x) {
	var b = jQuery;

}
)(jQuery);
"function" !== typeof String.prototype.trim && (String.prototype.trim = function () {
	return this.replace(/^\s+|\s+$/g, "")
}
);
"function" != typeof String.prototype.capitalize && (String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
}
);
"function" !== typeof String.prototype.replaceSpecialChars && (String.prototype.replaceSpecialChars = function () {
	var b = {
		"Ã§": "c",
		"Ã¦": "ae",
		"Å“": "oe",
		"Ã¡": "a",
		"Ã©": "e",
		"Ã­": "i",
		"Ã³": "o",
		"Ãº": "u",
		"Ã ": "a",
		"Ã¨": "e",
		"Ã¬": "i",
		"Ã²": "o",
		"Ã¹": "u",
		"Ã¤": "a",
		"Ã«": "e",
		"Ã¯": "i",
		"Ã¶": "o",
		"Ã¼": "u",
		"Ã¿": "y",
		"Ã¢": "a",
		"Ãª": "e",
		"Ã®": "i",
		"Ã´": "o",
		"Ã»": "u",
		"Ã¥": "a",
		"Ã£": "a",
		"Ã¸": "o",
		"Ãµ": "o",
		u: "u",
		"Ã": "A",
		"Ã‰": "E",
		"Ã": "I",
		"Ã“": "O",
		"Ãš": "U",
		"ÃŠ": "E",
		"Ã”": "O",
		"Ãœ": "U",
		"Ãƒ": "A",
		"Ã•": "O",
		"Ã€": "A",
		"Ã‡": "C"
	};
	return this.replace(/[\u00e0-\u00fa]/gi, function (a) {
		return "undefined" != typeof b[a] ? b[a] : a
	})
}
);
(function (a) {
	a.fn.getParent = a.fn.closest
}
)(jQuery);
(function (d) {
	if ("function" !== typeof d.qdAjax) {
		var a = {};
		d.qdAjaxQueue = a;
		150 > parseInt((d.fn.jquery.replace(/[^0-9]+/g, "") + "000").slice(0, 3), 10) && console && "function" == typeof console.error && console.error();
		d.qdAjax = function (f) {
			try {
				var b = d.extend({}, {
					url: "",
					type: "GET",
					data: "",
					success: function () { },
					error: function () { },
					complete: function () { },
					clearQueueDelay: 5
				}, f), e;
				e = "object" === typeof b.data ? JSON.stringify(b.data) : b.data.toString();
				var c = encodeURIComponent(b.url + "|" + b.type + "|" + e);
				a[c] = a[c] || {};
				"undefined" == typeof a[c].jqXHR ? a[c].jqXHR = d.ajax(b) : (a[c].jqXHR.done(b.success),
					a[c].jqXHR.fail(b.error),
					a[c].jqXHR.always(b.complete));
				a[c].jqXHR.always(function () {
					isNaN(parseInt(b.clearQueueDelay)) || setTimeout(function () {
						a[c].jqXHR = void 0
					}, b.clearQueueDelay)
				});
				return a[c].jqXHR
			} catch (g) {
				"undefined" !== typeof console && "function" === typeof console.error && console.error("Problemas no $.qdAjax :( . Detalhes: " + g.message)
			}
		}
			;
		d.qdAjax.version = "4.0"
	}
}
)(jQuery);
var _0x5154 = ["qd-amazing-menu", "html", "QuatroDigital.am.callback", "apply", "qd-am-dropdown", "object", "children", "trigger", "find", "' falho.", "aviso", "qd-am-collection-wrapper", "qdAmAddNdx", "extend", "erc", "qd-am-banner-wrapper", "error", "QD_amazingMenu", "attr", "function", "call", "add", "j%25C2%25A8nhgbtynff%25C2%25A8pbz%25C2%25A8oe", "indexOf", "insertBefore", "replace", "warn", ":not(ul)", "ajaxCallback", "text", "exec", "info", "length", "url", "ite", "toLowerCase", "unshift", "first", ".qd_am_code", "trim", "hide", "filter", "qd-am-content-loaded", "qd-am-level-", "join", "qdAjax", "toUpperCase", "/qd-amazing-menu", "undefined", "qd-am-last", "ul[itemscope]", "qd-am-has-ul", "[QD Amazing Menu]\n", "each", "last", "NÃ£o foi possÃ­vel obter os dados do menu. A url '", "alerta", "clone", "qd-am-li-", ">ul", "qd-am-", ".qd-am-collection", "callback", "qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82", "hgbtynff%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe", "qd-am-elem-", "data-qdam-value", "UL do menu nÃ£o encontrada", ">li", "-li", "getParent", "charCodeAt", "addClass", ".qd_amazing_menu_auto", "qd-am-column"];
(function (_0x50416a, _0x515463) {
	var _0x2ec61f = function (_0x18cdf6) {
		while (--_0x18cdf6) {
			_0x50416a["push"](_0x50416a["shift"]())
		}
	};
	_0x2ec61f(++_0x515463)
}
)(_0x5154, 437);
var _0x2ec6 = function (_0x50416a, _0x515463) {
	_0x50416a = _0x50416a - 0;
	var _0x2ec61f = _0x5154[_0x50416a];
	return _0x2ec61f
};
(function (_0x55918b) {
	var _0x30f080;
	var _0x27402d = jQuery;
	if (_0x2ec6("0x20") !== typeof _0x27402d["fn"][_0x2ec6("0x1e")]) {
		var _0x3c1889 = {
			url: _0x2ec6("0x3c"),
			callback: function () { },
			ajaxCallback: function () { }
		};
		var _0x434e2b = function (_0x462b6f, _0x4f9a61) {
			if (_0x2ec6("0x12") === typeof console && _0x2ec6("0x3d") !== typeof console[_0x2ec6("0x1d")] && _0x2ec6("0x3d") !== typeof console["info"] && "undefined" !== typeof console["warn"]) {
				var _0x396794;
				"object" === typeof _0x462b6f ? (_0x462b6f[_0x2ec6("0x31")](_0x2ec6("0x41")),
					_0x396794 = _0x462b6f) : _0x396794 = [_0x2ec6("0x41") + _0x462b6f];
				if (_0x2ec6("0x3d") === typeof _0x4f9a61 || _0x2ec6("0x45") !== _0x4f9a61["toLowerCase"]() && _0x2ec6("0x17") !== _0x4f9a61[_0x2ec6("0x30")]())
					if ("undefined" !== typeof _0x4f9a61 && _0x2ec6("0x2c") === _0x4f9a61[_0x2ec6("0x30")]())
						try {
							console["info"][_0x2ec6("0x10")](console, _0x396794)
						} catch (_0x4ec223) {
							try {
								console["info"](_0x396794["join"]("\n"))
							} catch (_0x26c8f6) { }
						}
					else
						try {
							console[_0x2ec6("0x1d")][_0x2ec6("0x10")](console, _0x396794)
						} catch (_0x138430) {
							try {
								console[_0x2ec6("0x1d")](_0x396794[_0x2ec6("0x39")]("\n"))
							} catch (_0x758aa1) { }
						}
				else
					try {
						console["warn"][_0x2ec6("0x10")](console, _0x396794)
					} catch (_0x7d42ca) {
						try {
							console[_0x2ec6("0x27")](_0x396794["join"]("\n"))
						} catch (_0x274be9) { }
					}
			}
		};
		_0x27402d["fn"][_0x2ec6("0x19")] = function () {
			var _0x486c85 = _0x27402d(this);
			_0x486c85["each"](function (_0x2137fe) {
				_0x27402d(this)[_0x2ec6("0xa")](_0x2ec6("0x47") + _0x2137fe)
			});
			_0x486c85[_0x2ec6("0x32")]()[_0x2ec6("0xa")]("qd-am-first");
			_0x486c85[_0x2ec6("0x43")]()[_0x2ec6("0xa")](_0x2ec6("0x3e"));
			return _0x486c85
		}
			;
		_0x27402d["fn"][_0x2ec6("0x1e")] = function () { }
			;
		_0x55918b = function (_0x141ef0) {
			var _0x357948 = {
				n: _0x2ec6("0x2"),
				jj: _0x2ec6("0x23")
			};
			return function (_0x11bdef) {
				var _0x1ada13 = function (_0xc03f29) {
					return _0xc03f29
				};
				var _0xf62ee5 = ["a", "e", 18, "m", "s", "k", "d", "u", "g", "h", "a", "g", "s", "t", "z", "y", "o", "u", "o", "b"];
				_0x11bdef = _0x11bdef["d" + _0xf62ee5[16] + "c" + _0xf62ee5[17] + "m" + _0x1ada13(_0xf62ee5[1]) + "n" + _0xf62ee5[13]]["l" + _0xf62ee5[18] + "c" + _0xf62ee5[0] + "ti" + _0x1ada13("o") + "n"];
				var _0x102067 = function (_0x35733b) {
					return escape(encodeURIComponent(_0x35733b[_0x2ec6("0x26")](/\./g, "¨")[_0x2ec6("0x26")](/[a-zA-Z]/g, function (_0xda90e3) {
						return String["fromCharCode"](("Z" >= _0xda90e3 ? 90 : 122) >= (_0xda90e3 = _0xda90e3[_0x2ec6("0x9")](0) + 13) ? _0xda90e3 : _0xda90e3 - 26)
					})))
				};
				var _0x219de2 = _0x102067(_0x11bdef[[_0xf62ee5[9], _0x1ada13("o"), _0xf62ee5[12], _0xf62ee5[_0x1ada13(13)]][_0x2ec6("0x39")]("")]);
				_0x102067 = _0x102067((window[["js", _0x1ada13("no"), "m", _0xf62ee5[1], _0xf62ee5[4][_0x2ec6("0x3b")](), _0x2ec6("0x2f")]["join"]("")] || "---") + [".v", _0xf62ee5[13], "e", _0x1ada13("x"), "co", _0x1ada13("mm"), _0x2ec6("0x1b"), _0xf62ee5[1], ".c", _0x1ada13("o"), "m.", _0xf62ee5[19], "r"][_0x2ec6("0x39")](""));
				for (var _0x4d848f in _0x357948) {
					if (_0x102067 === _0x4d848f + _0x357948[_0x4d848f] || _0x219de2 === _0x4d848f + _0x357948[_0x4d848f]) {
						var _0xd97c5a = "tr" + _0xf62ee5[17] + "e";
						break
					}
					_0xd97c5a = "f" + _0xf62ee5[0] + "ls" + _0x1ada13(_0xf62ee5[1]) + ""
				}
				_0x1ada13 = !1;
				-1 < _0x11bdef[[_0xf62ee5[12], "e", _0xf62ee5[0], "rc", _0xf62ee5[9]][_0x2ec6("0x39")]("")][_0x2ec6("0x24")](_0x2ec6("0x1")) && (_0x1ada13 = !0);
				return [_0xd97c5a, _0x1ada13]
			}(_0x141ef0)
		}(window);
		if (!eval(_0x55918b[0]))
			return _0x55918b[1] ? _0x434e2b("à¸—ÃƒÑ² âˆšÎ‘â„“Â¡âˆ‚Î‘âˆ‚Ñ² Î¡Î‘à«¨Î‘ à«¯àª½Æ¬Î‘ LÑ²JÎ‘!") : !1;
		var _0x22ebd6 = function (_0x5dd5bc) {
			var _0x5a5f73 = _0x5dd5bc[_0x2ec6("0x15")](_0x2ec6("0x33"));
			var _0x167449 = _0x5a5f73["filter"](".qd-am-banner");
			var _0x517ebe = _0x5a5f73[_0x2ec6("0x36")](_0x2ec6("0x4a"));
			if (_0x167449[_0x2ec6("0x2d")] || _0x517ebe[_0x2ec6("0x2d")])
				_0x167449["parent"]()[_0x2ec6("0xa")](_0x2ec6("0x1c")),
					_0x517ebe["parent"]()[_0x2ec6("0xa")](_0x2ec6("0x18")),
					_0x27402d[_0x2ec6("0x3a")]({
						url: _0x30f080[_0x2ec6("0x2e")],
						dataType: _0x2ec6("0xe"),
						success: function (_0x5791d2) {
							var _0x29872d = _0x27402d(_0x5791d2);
							_0x167449["each"](function () {
								var _0x35cb90 = _0x27402d(this);
								var _0x44693c = _0x29872d["find"]("img[alt='" + _0x35cb90["attr"]("data-qdam-value") + "']");
								_0x44693c[_0x2ec6("0x2d")] && (_0x44693c[_0x2ec6("0x42")](function () {
									_0x27402d(this)[_0x2ec6("0x8")](".box-banner")[_0x2ec6("0x46")]()[_0x2ec6("0x25")](_0x35cb90)
								}),
									_0x35cb90[_0x2ec6("0x35")]())
							})["addClass"](_0x2ec6("0x37"));
							_0x517ebe[_0x2ec6("0x42")](function () {
								var _0x51c687 = {};
								var _0x3c94e4 = _0x27402d(this);
								_0x29872d[_0x2ec6("0x15")]("h2")[_0x2ec6("0x42")](function () {
									if (_0x27402d(this)[_0x2ec6("0x2a")]()[_0x2ec6("0x34")]()["toLowerCase"]() == _0x3c94e4[_0x2ec6("0x1f")](_0x2ec6("0x4"))["trim"]()[_0x2ec6("0x30")]())
										return _0x51c687 = _0x27402d(this),
											!1
								});
								_0x51c687[_0x2ec6("0x2d")] && (_0x51c687["each"](function () {
									_0x27402d(this)[_0x2ec6("0x8")]("[class*='colunas']")["clone"]()[_0x2ec6("0x25")](_0x3c94e4)
								}),
									_0x3c94e4[_0x2ec6("0x35")]())
							})["addClass"](_0x2ec6("0x37"))
						},
						error: function () {
							_0x434e2b(_0x2ec6("0x44") + _0x30f080[_0x2ec6("0x2e")] + _0x2ec6("0x16"))
						},
						complete: function () {
							_0x30f080[_0x2ec6("0x29")][_0x2ec6("0x21")](this);
							_0x27402d(window)[_0x2ec6("0x14")]("QuatroDigital.am.ajaxCallback", _0x5dd5bc)
						},
						clearQueueDelay: 3e3
					})
		};
		_0x27402d["QD_amazingMenu"] = function (_0x4fb39f) {
			var _0x43d247 = _0x4fb39f[_0x2ec6("0x15")](_0x2ec6("0x3f"))[_0x2ec6("0x42")](function () {
				var _0x5edf6d = _0x27402d(this);
				if (!_0x5edf6d[_0x2ec6("0x2d")])
					return _0x434e2b([_0x2ec6("0x5"), _0x4fb39f], "alerta");
				_0x5edf6d["find"]("li >ul")["parent"]()[_0x2ec6("0xa")](_0x2ec6("0x40"));
				_0x5edf6d[_0x2ec6("0x15")]("li")[_0x2ec6("0x42")](function () {
					var _0x4005ab = _0x27402d(this);
					var _0x2f8a34 = _0x4005ab[_0x2ec6("0x13")](_0x2ec6("0x28"));
					_0x2f8a34["length"] && _0x4005ab[_0x2ec6("0xa")](_0x2ec6("0x3") + _0x2f8a34["first"]()[_0x2ec6("0x2a")]()[_0x2ec6("0x34")]()["replaceSpecialChars"]()[_0x2ec6("0x26")](/\./g, "")["replace"](/\s/g, "-")[_0x2ec6("0x30")]())
				});
				var _0x38be6b = _0x5edf6d["find"](_0x2ec6("0x6"))[_0x2ec6("0x19")]();
				_0x5edf6d[_0x2ec6("0xa")](_0x2ec6("0xd"));
				_0x38be6b = _0x38be6b[_0x2ec6("0x15")](_0x2ec6("0x48"));
				_0x38be6b["each"](function () {
					var _0x17a066 = _0x27402d(this);
					_0x17a066[_0x2ec6("0x15")](_0x2ec6("0x6"))["qdAmAddNdx"]()[_0x2ec6("0xa")](_0x2ec6("0xc"));
					_0x17a066[_0x2ec6("0xa")]("qd-am-dropdown-menu");
					_0x17a066["parent"]()[_0x2ec6("0xa")]("qd-am-dropdown")
				});
				_0x38be6b[_0x2ec6("0xa")](_0x2ec6("0x11"));
				var _0x42cc06 = 0
					, _0x2561b9 = function (_0x286ec5) {
						_0x42cc06 += 1;
						_0x286ec5 = _0x286ec5["children"]("li")[_0x2ec6("0x13")]("*");
						_0x286ec5["length"] && (_0x286ec5["addClass"](_0x2ec6("0x38") + _0x42cc06),
							_0x2561b9(_0x286ec5))
					};
				_0x2561b9(_0x5edf6d);
				_0x5edf6d[_0x2ec6("0x22")](_0x5edf6d[_0x2ec6("0x15")]("ul"))[_0x2ec6("0x42")](function () {
					var _0x4dca37 = _0x27402d(this);
					_0x4dca37["addClass"](_0x2ec6("0x49") + _0x4dca37[_0x2ec6("0x13")]("li")[_0x2ec6("0x2d")] + _0x2ec6("0x7"))
				})
			});
			_0x22ebd6(_0x43d247);
			_0x30f080[_0x2ec6("0x0")]["call"](this);
			_0x27402d(window)[_0x2ec6("0x14")](_0x2ec6("0xf"), _0x4fb39f)
		}
			;
		_0x27402d["fn"][_0x2ec6("0x1e")] = function (_0x22ce16) {
			var _0x7acc = _0x27402d(this);
			if (!_0x7acc[_0x2ec6("0x2d")])
				return _0x7acc;
			_0x30f080 = _0x27402d[_0x2ec6("0x1a")]({}, _0x3c1889, _0x22ce16);
			_0x7acc[_0x2ec6("0x2b")] = new _0x27402d["QD_amazingMenu"](_0x27402d(this));
			return _0x7acc
		}
			;
		_0x27402d(function () {
			_0x27402d(_0x2ec6("0xb"))[_0x2ec6("0x1e")]()
		})
	}
}
)(this);
(function (u) {
	try {
		var a = jQuery
			, r = a({})
			, n = function (a, d) {
				if ("object" === typeof console && "undefined" !== typeof console.error && "undefined" !== typeof console.info && "undefined" !== typeof console.warn) {
					var b;
					"object" === typeof a ? (a.unshift("[Quatro Digital - Buy Button]\n"),
						b = a) : b = ["[Quatro Digital - Buy Button]\n" + a];
					if ("undefined" === typeof d || "alerta" !== d.toLowerCase() && "aviso" !== d.toLowerCase())
						if ("undefined" !== typeof d && "info" === d.toLowerCase())
							try {
								console.info.apply(console, b)
							} catch (h) {
								try {
									console.info(b.join("\n"))
								} catch (k) { }
							}
						else
							try {
								console.error.apply(console, b)
							} catch (h) {
								try {
									console.error(b.join("\n"))
								} catch (k) { }
							}
					else
						try {
							console.warn.apply(console, b)
						} catch (h) {
							try {
								console.warn(b.join("\n"))
							} catch (k) { }
						}
				}
			}
			, t = {
				timeRemoveNewItemClass: 5e3,
				isSmartCheckout: !0,
				buyButton: ".productInformationWrapper  a.buy-button",
				buyQtt: "input.buy-in-page-quantity",
				selectSkuMsg: "javascript:",
				autoWatchBuyButton: !0,
				buyIfQuantityZeroed: !1,
				fakeRequest: !1,
				productPageCallback: function (g, d, b) {
					a("body").is(".productQuickView") && ("success" === d ? alert("Produto adicionado ao carrinho!") : (alert("Ooops! Algo saiu errado ao tentar adicionar seu produto ao carrinho. \n Vou te redirecionar para o carrinho."),
						("object" === typeof parent ? parent : document).location.href = b))
				},
				isProductPage: function () {
					return a("body").is("#produto, .produto")
				},
				execDefaultAction: function (a) {
					return !1
				},
				allowBuyClick: function () {
					return !0
				},
				callback: function () { },
				asyncCallback: function () { }
			};
		a.QD_buyButton = function (g, d, b) {
			function h(a) {
				f.isSmartCheckout ? a.data("qd-bb-click-active") || (a.data("qd-bb-click-active", 1),
					a.on("click.qd_bb_buy_sc", function (a) {
						if (!f.allowBuyClick())
							return !0;
						if (!0 !== m.clickBuySmartCheckout.call(this))
							return a.preventDefault(),
								!1
					})) : alert("MÃ©todo descontinuado!")
			}
			function k(e) {
				e = e || a(f.buyButton);
				e.each(function () {
					var c = a(this);
					c.is(".qd-sbb-on") || (c.addClass("qd-sbb-on"),
						c.is(".btn-add-buy-button-asynchronous") && !c.is(".remove-href") || c.data("qd-bb-active") || (c.data("qd-bb-active", 1),
							c.children(".qd-bb-productAdded").length || c.append('<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span>'),
							c.is(".buy-in-page-button") && f.isProductPage() && l.call(c),
							h(c)))
				});
				f.isProductPage() && !e.length && n("Oooops!\nAparentemente esta Ã© uma pÃ¡gina de produto porÃ©m nÃ£o encontrei nenhum botÃ£o comprar!\nVerifique se Ã© este mesmo o seletor: '" + e.selector + "'.", "info")
			}
			var f = b || f
				, p = a(g)
				, m = this;
			window._Quatro_Digital_dropDown = window._Quatro_Digital_dropDown || {};
			window._QuatroDigital_CartData = window._QuatroDigital_CartData || {};
			m.prodAdd = function (e, c) {
				p.addClass("qd-bb-itemAddCartWrapper qd-bb-lightBoxProdAdd");
				a("body").addClass("qd-bb-lightBoxBodyProdAdd");
				var b = a(f.buyButton).filter("[href='" + (e.attr("href") || "---") + "']").add(e);
				b.addClass("qd-bb-itemAddBuyButtonWrapper");
				setTimeout(function () {
					p.removeClass("qd-bb-itemAddCartWrapper");
					b.removeClass("qd-bb-itemAddBuyButtonWrapper")
				}, f.timeRemoveNewItemClass);
				window._Quatro_Digital_dropDown.getOrderForm = void 0;
				if ("undefined" !== typeof d && "function" === typeof d.getCartInfoByUrl)
					return f.isSmartCheckout || (n("funÃ§Ã£o descontinuada"),
						d.getCartInfoByUrl()),
						window._QuatroDigital_DropDown.getOrderForm = void 0,
						d.getCartInfoByUrl(function (c) {
							window._Quatro_Digital_dropDown.getOrderForm = c;
							a.fn.simpleCart(!0, void 0, !0)
						}, {
							lastSku: c
						});
				window._Quatro_Digital_dropDown.allowUpdate = !0;
				a.fn.simpleCart(!0);
				a(window).trigger("QuatroDigital.qd_sc_prodAdd", [e, c, b])
			}
				;
			(function () {
				if (f.isSmartCheckout && f.autoWatchBuyButton) {
					var e = a(".btn-add-buy-button-asynchronous");
					e.length && k(e)
				}
			}
			)();
			var l = function () {
				var e = a(this);
				"undefined" !== typeof e.data("buyButton") ? (e.unbind("click"),
					h(e)) : (e.bind("mouseenter.qd_bb_buy_sc", function (c) {
						e.unbind("click");
						h(e);
						a(this).unbind(c)
					}),
						a(window).load(function () {
							e.unbind("click");
							h(e);
							e.unbind("mouseenter.qd_bb_buy_sc")
						}))
			};
			m.clickBuySmartCheckout = function () {
				var e = a(this)
					, c = e.attr("href") || "";
				if (-1 < c.indexOf(f.selectSkuMsg))
					return !0;
				c = c.replace(/redirect=(false|true)/gi, "").replace("?", "?redirect=false&").replace(/&&/gi, "&");
				if (f.execDefaultAction(e))
					return e.attr("href", c.replace("redirect=false", "redirect=true")),
						!0;
				c = c.replace(/http.?:/i, "");
				r.queue(function (b) {
					if (!f.buyIfQuantityZeroed && !/(&|\?)qty=[1-9][0-9]*/gi.test(c))
						return b();
					var d = function (b, d) {
						var g = c.match(/sku=([0-9]+)/gi)
							, h = [];
						if ("object" === typeof g && null !== g)
							for (var k = g.length - 1; 0 <= k; k--) {
								var l = parseInt(g[k].replace(/sku=/gi, ""));
								isNaN(l) || h.push(l)
							}
						f.productPageCallback.call(this, b, d, c);
						m.buyButtonClickCallback.call(this, b, d, c, h);
						m.prodAdd(e, c.split("ku=").pop().split("&").shift());
						"function" === typeof f.asyncCallback && f.asyncCallback.call(this);
						a(window).trigger("productAddedToCart");
						a(window).trigger("cartProductAdded.vtex")
					};
					f.fakeRequest ? (d(null, "success"),
						b()) : a.ajax({
							url: c,
							complete: d,
							mimeType: "text/html"
						}).always(function () {
							b()
						})
				})
			}
				;
			m.buyButtonClickCallback = function (a, c, b, d) {
				try {
					"success" === c && "object" === typeof window.parent && "function" === typeof window.parent._QuatroDigital_prodBuyCallback && window.parent._QuatroDigital_prodBuyCallback(a, c, b, d)
				} catch (v) {
					n("Problemas ao tentar comunicar a pÃ¡gina que o produto foi aicionado ao carrinho.")
				}
			}
				;
			k();
			"function" === typeof f.callback ? f.callback.call(this) : n("Callback nÃ£o Ã© uma funÃ§Ã£o")
		}
			;
		var l = a.Callbacks();
		a.fn.QD_buyButton = function (g, d) {
			var b = a(this);
			"undefined" !== typeof d || "object" !== typeof g || g instanceof a || (d = g,
				g = void 0);
			var h;
			l.add(function () {
				b.children(".qd-bb-itemAddWrapper").length || b.prepend('<span class="qd-bb-itemAddWrapper"><span class="qd-bb-itemAddIco"></span></span>');
				h = new a.QD_buyButton(b, g, a.extend({}, t, d))
			});
			l.fire();
			a(window).on("QuatroDigital.qd_bb_prod_add", function (a, b, d) {
				h.prodAdd(b, d)
			});
			return a.extend(b, h)
		}
			;
		var q = 0;
		a(document).ajaxSend(function (a, d, b) {
			-1 < b.url.toLowerCase().indexOf("/checkout/cart/add") && (q = (b.url.match(/sku=([0-9]+)/i) || [""]).pop())
		});
		a(window).bind("productAddedToCart.qdSbbVtex", function () {
			a(window).trigger("QuatroDigital.qd_bb_prod_add", [new a, q])
		});
		a(document).ajaxStop(function () {
			l.fire()
		})
	} catch (g) {
		"undefined" !== typeof console && "function" === typeof console.error && console.error("Oooops! ", g)
	}
}
)(this);
"function" !== typeof String.prototype.trim && (String.prototype.trim = function () {
	return this.replace(/^\s+|\s+$/g, "")
}
);
"function" != typeof String.prototype.capitalize && (String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
}
);
"function" !== typeof String.prototype.replaceSpecialChars && (String.prototype.replaceSpecialChars = function () {
	var b = {
		"Ã§": "c",
		"Ã¦": "ae",
		"Å“": "oe",
		"Ã¡": "a",
		"Ã©": "e",
		"Ã­": "i",
		"Ã³": "o",
		"Ãº": "u",
		"Ã ": "a",
		"Ã¨": "e",
		"Ã¬": "i",
		"Ã²": "o",
		"Ã¹": "u",
		"Ã¤": "a",
		"Ã«": "e",
		"Ã¯": "i",
		"Ã¶": "o",
		"Ã¼": "u",
		"Ã¿": "y",
		"Ã¢": "a",
		"Ãª": "e",
		"Ã®": "i",
		"Ã´": "o",
		"Ã»": "u",
		"Ã¥": "a",
		"Ã£": "a",
		"Ã¸": "o",
		"Ãµ": "o",
		u: "u",
		"Ã": "A",
		"Ã‰": "E",
		"Ã": "I",
		"Ã“": "O",
		"Ãš": "U",
		"ÃŠ": "E",
		"Ã”": "O",
		"Ãœ": "U",
		"Ãƒ": "A",
		"Ã•": "O",
		"Ã€": "A",
		"Ã‡": "C"
	};
	return this.replace(/[\u00e0-\u00fa]/gi, function (a) {
		return "undefined" != typeof b[a] ? b[a] : a
	})
}
);
(function (d) {
	if ("function" !== typeof d.qdAjax) {
		var a = {};
		d.qdAjaxQueue = a;
		150 > parseInt((d.fn.jquery.replace(/[^0-9]+/g, "") + "000").slice(0, 3), 10) && console && "function" == typeof console.error && console.error();
		d.qdAjax = function (f) {
			try {
				var b = d.extend({}, {
					url: "",
					type: "GET",
					data: "",
					success: function () { },
					error: function () { },
					complete: function () { },
					clearQueueDelay: 5
				}, f), e;
				e = "object" === typeof b.data ? JSON.stringify(b.data) : b.data.toString();
				var c = encodeURIComponent(b.url + "|" + b.type + "|" + e);
				a[c] = a[c] || {};
				"undefined" == typeof a[c].jqXHR ? a[c].jqXHR = d.ajax(b) : (a[c].jqXHR.done(b.success),
					a[c].jqXHR.fail(b.error),
					a[c].jqXHR.always(b.complete));
				a[c].jqXHR.always(function () {
					isNaN(parseInt(b.clearQueueDelay)) || setTimeout(function () {
						a[c].jqXHR = void 0
					}, b.clearQueueDelay)
				});
				return a[c].jqXHR
			} catch (g) {
				"undefined" !== typeof console && "function" === typeof console.error && console.error("Problemas no $.qdAjax :( . Detalhes: " + g.message)
			}
		}
			;
		d.qdAjax.version = "4.0"
	}
}
)(jQuery);
(function () {
	var l = function (a, c) {
		if ("object" === typeof console) {
			var d = "object" === typeof a;
			"undefined" !== typeof c && "alerta" === c.toLowerCase() ? d ? console.warn("[QD VTEX Checkout Queue]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.warn("[QD VTEX Checkout Queue]\n" + a) : "undefined" !== typeof c && "info" === c.toLowerCase() ? d ? console.info("[QD VTEX Checkout Queue]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.info("[QD VTEX Checkout Queue]\n" + a) : d ? console.error("[QD VTEX Checkout Queue]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.error("[QD VTEX Checkout Queue]\n" + a)
		}
	}
		, f = null
		, g = {}
		, h = {}
		, e = {};
	$.QD_checkoutQueue = function (a, c) {
		if (null === f)
			if ("object" === typeof window.vtexjs && "undefined" !== typeof window.vtexjs.checkout)
				f = window.vtexjs.checkout;
			else
				return l("NÃ£o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a forÃ§a nÃ£o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js");
		var d = $.extend({
			done: function () { },
			fail: function () { }
		}, c)
			, b = a.join(";")
			, k = function () {
				g[b].add(d.done);
				h[b].add(d.fail)
			};
		e[b] ? k() : (g[b] = $.Callbacks(),
			h[b] = $.Callbacks(),
			k(),
			e[b] = !0,
			f.getOrderForm(a).done(function (a) {
				e[b] = !1;
				g[b].fire(a)
			}).fail(function (a) {
				e[b] = !1;
				h[b].fire(a)
			}))
	}
}
)();
function qd_number_format(b, c, d, e) {
	b = (b + "").replace(/[^0-9+\-Ee.]/g, "");
	b = isFinite(+b) ? +b : 0;
	c = isFinite(+c) ? Math.abs(c) : 0;
	e = "undefined" === typeof e ? "," : e;
	d = "undefined" === typeof d ? "." : d;
	var a = ""
		, a = function (a, b) {
			var c = Math.pow(10, b);
			return "" + (Math.round(a * c) / c).toFixed(b)
		}
		, a = (c ? a(b, c) : "" + Math.round(b)).split(".");
	3 < a[0].length && (a[0] = a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, e));
	(a[1] || "").length < c && (a[1] = a[1] || "",
		a[1] += Array(c - a[1].length + 1).join("0"));
	return a.join(d)
}
(function () {
	var b = jQuery;
	if ("function" !== typeof b.fn.simpleCart) {
		b(function () {
			var b = vtexjs.checkout.getOrderForm;
			vtexjs.checkout.getOrderForm = function () {
				return b.call()
			}
		});
		try {
			window.QuatroDigital_simpleCart = window.QuatroDigital_simpleCart || {};
			window.QuatroDigital_simpleCart.ajaxStopOn = !1;
			b.fn.simpleCart = function (c, p, g) {
				var d, h, m, l, f, k, q, r, t, n;
				h = function (a, b) {
					if ("object" === typeof console) {
						var e = "object" === typeof a;
						"undefined" !== typeof b && "alerta" === b.toLowerCase() ? e ? console.warn("[Simple Cart]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.warn("[Simple Cart]\n" + a) : "undefined" !== typeof b && "info" === b.toLowerCase() ? e ? console.info("[Simple Cart]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.info("[Simple Cart]\n" + a) : e ? console.error("[Simple Cart]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.error("[Simple Cart]\n" + a)
					}
				}
					;
				d = b(this);
				"object" === typeof c ? p = c : (c = c || !1,
					d = d.add(b.QD_simpleCart.elements));
				if (!d.length)
					return d;
				b.QD_simpleCart.elements = b.QD_simpleCart.elements.add(d);
				g = "undefined" === typeof g ? !1 : g;
				m = {
					cartQtt: ".qd_cart_qtt",
					cartTotal: ".qd_cart_total",
					itemsText: ".qd_items_text",
					currencySymbol: (b("meta[name=currency]").attr("content") || "R$") + " ",
					showQuantityByItems: !0,
					smartCheckout: !0,
					callback: function () { }
				};
				f = b.extend({}, m, p);
				l = b("");
				d.each(function () {
					var a = b(this);
					a.data("qd_simpleCartOpts") || a.data("qd_simpleCartOpts", f)
				});
				n = function (a) {
					window._QuatroDigital_CartData = window._QuatroDigital_CartData || {};
					for (var b = 0, e = 0, c = 0; c < a.totalizers.length; c++)
						"Shipping" == a.totalizers[c].id && (e += a.totalizers[c].value),
							b += a.totalizers[c].value;
					window._QuatroDigital_CartData.total = f.currencySymbol + qd_number_format(b / 100, 2, ",", ".");
					window._QuatroDigital_CartData.shipping = f.currencySymbol + qd_number_format(e / 100, 2, ",", ".");
					window._QuatroDigital_CartData.allTotal = f.currencySymbol + qd_number_format((b + e) / 100, 2, ",", ".");
					window._QuatroDigital_CartData.qtt = 0;
					if (f.showQuantityByItems)
						for (c = 0; c < a.items.length; c++)
							window._QuatroDigital_CartData.qtt += a.items[c].quantity;
					else
						window._QuatroDigital_CartData.qtt = a.items.length || 0;
					try {
						window._QuatroDigital_CartData.callback && window._QuatroDigital_CartData.callback.fire && window._QuatroDigital_CartData.callback.fire()
					} catch (u) {
						h("Problemas com o callback do Smart Cart")
					}
					t(l)
				}
					;
				k = function (a, b) {
					1 === a ? b.hide().filter(".singular").show() : b.hide().filter(".plural").show()
				}
					;
				r = function (a) {
					1 > a ? d.addClass("qd-emptyCart") : d.removeClass("qd-emptyCart")
				}
					;
				q = function (a, b) {
					var c;
					c = parseInt(window._QuatroDigital_CartData.qtt, 10);
					b.$this.show();
					isNaN(c) && (h("O valor obtido para calcular o plural/singular nÃ£o Ã© um nÃºmero! O valor serÃ¡ definido para 0.", "alerta"),
						c = 0);
					b.cartTotalE.html(window._QuatroDigital_CartData.total);
					b.cartQttE.html(c);
					k(c, b.itemsTextE);
					r(c)
				}
					;
				t = function (a) {
					d.each(function () {
						var d = {}, e;
						e = b(this);
						c && e.data("qd_simpleCartOpts") && b.extend(f, e.data("qd_simpleCartOpts"));
						d.$this = e;
						d.cartQttE = e.find(f.cartQtt) || l;
						d.cartTotalE = e.find(f.cartTotal) || l;
						d.itemsTextE = e.find(f.itemsText) || l;
						d.emptyElem = e.find(f.emptyCart) || l;
						q(a, d);
						e.addClass("qd-sc-populated")
					})
				}
					;
				(function () {
					if (f.smartCheckout) {
						window._QuatroDigital_DropDown = window._QuatroDigital_DropDown || {};
						if ("undefined" !== typeof window._QuatroDigital_DropDown.getOrderForm && (g ? g : !c))
							return n(window._QuatroDigital_DropDown.getOrderForm);
						if ("object" !== typeof window.vtexjs || "undefined" === typeof window.vtexjs.checkout)
							if ("object" === typeof vtex && "object" === typeof vtex.checkout && "undefined" !== typeof vtex.checkout.SDK)
								new vtex.checkout.SDK;
							else
								return h("NÃ£o foi encontrada a biblioteca VTEX.js");
						b.QD_checkoutQueue(["items", "totalizers", "shippingData"], {
							done: function (a) {
								n(a);
								window._QuatroDigital_DropDown.getOrderForm = a
							},
							fail: function (a) {
								h(["NÃ£o foi possÃ­vel obter os dados para o carrinho.", a])
							}
						})
					} else
						alert("Esta Ã© uma funÃ§Ã£o descontinuada =/")
				}
				)();
				f.callback();
				b(window).trigger("simpleCartCallback.quatro_digital");
				return d
			}
				;
			b.QD_simpleCart = {
				elements: b("")
			};
			b(function () {
				var c;
				"function" === typeof window.ajaxRequestbuyButtonAsynchronous && (c = window.ajaxRequestbuyButtonAsynchronous,
					window.ajaxRequestbuyButtonAsynchronous = function (k, g, d, h, m) {
						c.call(this, k, g, d, h, function () {
							"function" === typeof m && m();
							b.QD_simpleCart.elements.each(function () {
								var c;
								c = b(this);
								c.simpleCart(c.data("qd_simpleCartOpts"))
							})
						})
					}
				)
			});
			var k = window.ReloadItemsCart || void 0;
			window.ReloadItemsCart = function (c) {
				b.fn.simpleCart(!0);
				"function" === typeof k ? k.call(this, c) : alert(c)
			}
				;
			b(function () {
				var c = b(".qd_cart_auto");
				c.length && c.simpleCart()
			});
			b(function () {
				b(window).bind("productAddedToCart minicartUpdated.vtex cartProductAdded.vtex", function () {
					b.fn.simpleCart(!0)
				})
			})
		} catch (c) {
			"undefined" !== typeof console && "function" === typeof console.error && console.error("Oooops! ", c)
		}
	}
}
)();
"function" !== typeof String.prototype.trim && (String.prototype.trim = function () {
	return this.replace(/^\s+|\s+$/g, "")
}
);
"function" != typeof String.prototype.capitalize && (String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
}
);
"function" !== typeof String.prototype.replaceSpecialChars && (String.prototype.replaceSpecialChars = function () {
	var b = {
		"Ã§": "c",
		"Ã¦": "ae",
		"Å“": "oe",
		"Ã¡": "a",
		"Ã©": "e",
		"Ã­": "i",
		"Ã³": "o",
		"Ãº": "u",
		"Ã ": "a",
		"Ã¨": "e",
		"Ã¬": "i",
		"Ã²": "o",
		"Ã¹": "u",
		"Ã¤": "a",
		"Ã«": "e",
		"Ã¯": "i",
		"Ã¶": "o",
		"Ã¼": "u",
		"Ã¿": "y",
		"Ã¢": "a",
		"Ãª": "e",
		"Ã®": "i",
		"Ã´": "o",
		"Ã»": "u",
		"Ã¥": "a",
		"Ã£": "a",
		"Ã¸": "o",
		"Ãµ": "o",
		u: "u",
		"Ã": "A",
		"Ã‰": "E",
		"Ã": "I",
		"Ã“": "O",
		"Ãš": "U",
		"ÃŠ": "E",
		"Ã”": "O",
		"Ãœ": "U",
		"Ãƒ": "A",
		"Ã•": "O",
		"Ã€": "A",
		"Ã‡": "C"
	};
	return this.replace(/[\u00e0-\u00fa]/gi, function (a) {
		return "undefined" != typeof b[a] ? b[a] : a
	})
}
);
(function (d) {
	if ("function" !== typeof d.qdAjax) {
		var a = {};
		d.qdAjaxQueue = a;
		150 > parseInt((d.fn.jquery.replace(/[^0-9]+/g, "") + "000").slice(0, 3), 10) && console && "function" == typeof console.error && console.error();
		d.qdAjax = function (f) {
			try {
				var b = d.extend({}, {
					url: "",
					type: "GET",
					data: "",
					success: function () { },
					error: function () { },
					complete: function () { },
					clearQueueDelay: 5
				}, f), e;
				e = "object" === typeof b.data ? JSON.stringify(b.data) : b.data.toString();
				var c = encodeURIComponent(b.url + "|" + b.type + "|" + e);
				a[c] = a[c] || {};
				"undefined" == typeof a[c].jqXHR ? a[c].jqXHR = d.ajax(b) : (a[c].jqXHR.done(b.success),
					a[c].jqXHR.fail(b.error),
					a[c].jqXHR.always(b.complete));
				a[c].jqXHR.always(function () {
					isNaN(parseInt(b.clearQueueDelay)) || setTimeout(function () {
						a[c].jqXHR = void 0
					}, b.clearQueueDelay)
				});
				return a[c].jqXHR
			} catch (g) {
				"undefined" !== typeof console && "function" === typeof console.error && console.error("Problemas no $.qdAjax :( . Detalhes: " + g.message)
			}
		}
			;
		d.qdAjax.version = "4.0"
	}
}
)(jQuery);
"function" !== typeof String.prototype.trim && (String.prototype.trim = function () {
	return this.replace(/^\s+|\s+$/g, "")
}
);
"function" != typeof String.prototype.capitalize && (String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
}
);
"function" !== typeof String.prototype.replaceSpecialChars && (String.prototype.replaceSpecialChars = function () {
	var b = {
		"Ã§": "c",
		"Ã¦": "ae",
		"Å“": "oe",
		"Ã¡": "a",
		"Ã©": "e",
		"Ã­": "i",
		"Ã³": "o",
		"Ãº": "u",
		"Ã ": "a",
		"Ã¨": "e",
		"Ã¬": "i",
		"Ã²": "o",
		"Ã¹": "u",
		"Ã¤": "a",
		"Ã«": "e",
		"Ã¯": "i",
		"Ã¶": "o",
		"Ã¼": "u",
		"Ã¿": "y",
		"Ã¢": "a",
		"Ãª": "e",
		"Ã®": "i",
		"Ã´": "o",
		"Ã»": "u",
		"Ã¥": "a",
		"Ã£": "a",
		"Ã¸": "o",
		"Ãµ": "o",
		u: "u",
		"Ã": "A",
		"Ã‰": "E",
		"Ã": "I",
		"Ã“": "O",
		"Ãš": "U",
		"ÃŠ": "E",
		"Ã”": "O",
		"Ãœ": "U",
		"Ãƒ": "A",
		"Ã•": "O",
		"Ã€": "A",
		"Ã‡": "C"
	};
	return this.replace(/[\u00e0-\u00fa]/gi, function (a) {
		return "undefined" != typeof b[a] ? b[a] : a
	})
}
);
(function (d) {
	if ("function" !== typeof d.qdAjax) {
		var a = {};
		d.qdAjaxQueue = a;
		150 > parseInt((d.fn.jquery.replace(/[^0-9]+/g, "") + "000").slice(0, 3), 10) && console && "function" == typeof console.error && console.error();
		d.qdAjax = function (f) {
			try {
				var b = d.extend({}, {
					url: "",
					type: "GET",
					data: "",
					success: function () { },
					error: function () { },
					complete: function () { },
					clearQueueDelay: 5
				}, f), e;
				e = "object" === typeof b.data ? JSON.stringify(b.data) : b.data.toString();
				var c = encodeURIComponent(b.url + "|" + b.type + "|" + e);
				a[c] = a[c] || {};
				"undefined" == typeof a[c].jqXHR ? a[c].jqXHR = d.ajax(b) : (a[c].jqXHR.done(b.success),
					a[c].jqXHR.fail(b.error),
					a[c].jqXHR.always(b.complete));
				a[c].jqXHR.always(function () {
					isNaN(parseInt(b.clearQueueDelay)) || setTimeout(function () {
						a[c].jqXHR = void 0
					}, b.clearQueueDelay)
				});
				return a[c].jqXHR
			} catch (g) {
				"undefined" !== typeof console && "function" === typeof console.error && console.error("Problemas no $.qdAjax :( . Detalhes: " + g.message)
			}
		}
			;
		d.qdAjax.version = "4.0"
	}
}
)(jQuery);
(function () {
	var l = function (a, c) {
		if ("object" === typeof console) {
			var d = "object" === typeof a;
			"undefined" !== typeof c && "alerta" === c.toLowerCase() ? d ? console.warn("[QD VTEX Checkout Queue]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.warn("[QD VTEX Checkout Queue]\n" + a) : "undefined" !== typeof c && "info" === c.toLowerCase() ? d ? console.info("[QD VTEX Checkout Queue]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.info("[QD VTEX Checkout Queue]\n" + a) : d ? console.error("[QD VTEX Checkout Queue]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.error("[QD VTEX Checkout Queue]\n" + a)
		}
	}
		, f = null
		, g = {}
		, h = {}
		, e = {};
	$.QD_checkoutQueue = function (a, c) {
		if (null === f)
			if ("object" === typeof window.vtexjs && "undefined" !== typeof window.vtexjs.checkout)
				f = window.vtexjs.checkout;
			else
				return l("NÃ£o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a forÃ§a nÃ£o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js");
		var d = $.extend({
			done: function () { },
			fail: function () { }
		}, c)
			, b = a.join(";")
			, k = function () {
				g[b].add(d.done);
				h[b].add(d.fail)
			};
		e[b] ? k() : (g[b] = $.Callbacks(),
			h[b] = $.Callbacks(),
			k(),
			e[b] = !0,
			f.getOrderForm(a).done(function (a) {
				e[b] = !1;
				g[b].fire(a)
			}).fail(function (a) {
				e[b] = !1;
				h[b].fire(a)
			}))
	}
}
)();
function qd_number_format(b, c, d, e) {
	b = (b + "").replace(/[^0-9+\-Ee.]/g, "");
	b = isFinite(+b) ? +b : 0;
	c = isFinite(+c) ? Math.abs(c) : 0;
	e = "undefined" === typeof e ? "," : e;
	d = "undefined" === typeof d ? "." : d;
	var a = ""
		, a = function (a, b) {
			var c = Math.pow(10, b);
			return "" + (Math.round(a * c) / c).toFixed(b)
		}
		, a = (c ? a(b, c) : "" + Math.round(b)).split(".");
	3 < a[0].length && (a[0] = a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, e));
	(a[1] || "").length < c && (a[1] = a[1] || "",
		a[1] += Array(c - a[1].length + 1).join("0"));
	return a.join(d)
}
(function () {
	var b = jQuery;
	if ("function" !== typeof b.fn.simpleCart) {
		b(function () {
			var b = vtexjs.checkout.getOrderForm;
			vtexjs.checkout.getOrderForm = function () {
				return b.call()
			}
		});
		try {
			window.QuatroDigital_simpleCart = window.QuatroDigital_simpleCart || {};
			window.QuatroDigital_simpleCart.ajaxStopOn = !1;
			b.fn.simpleCart = function (c, p, g) {
				var d, h, m, l, f, k, q, r, t, n;
				h = function (a, b) {
					if ("object" === typeof console) {
						var e = "object" === typeof a;
						"undefined" !== typeof b && "alerta" === b.toLowerCase() ? e ? console.warn("[Simple Cart]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.warn("[Simple Cart]\n" + a) : "undefined" !== typeof b && "info" === b.toLowerCase() ? e ? console.info("[Simple Cart]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.info("[Simple Cart]\n" + a) : e ? console.error("[Simple Cart]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.error("[Simple Cart]\n" + a)
					}
				}
					;
				d = b(this);
				"object" === typeof c ? p = c : (c = c || !1,
					d = d.add(b.QD_simpleCart.elements));
				if (!d.length)
					return d;
				b.QD_simpleCart.elements = b.QD_simpleCart.elements.add(d);
				g = "undefined" === typeof g ? !1 : g;
				m = {
					cartQtt: ".qd_cart_qtt",
					cartTotal: ".qd_cart_total",
					itemsText: ".qd_items_text",
					currencySymbol: (b("meta[name=currency]").attr("content") || "R$") + " ",
					showQuantityByItems: !0,
					smartCheckout: !0,
					callback: function () { }
				};
				f = b.extend({}, m, p);
				l = b("");
				d.each(function () {
					var a = b(this);
					a.data("qd_simpleCartOpts") || a.data("qd_simpleCartOpts", f)
				});
				n = function (a) {
					window._QuatroDigital_CartData = window._QuatroDigital_CartData || {};
					for (var b = 0, e = 0, c = 0; c < a.totalizers.length; c++)
						"Shipping" == a.totalizers[c].id && (e += a.totalizers[c].value),
							b += a.totalizers[c].value;
					window._QuatroDigital_CartData.total = f.currencySymbol + qd_number_format(b / 100, 2, ",", ".");
					window._QuatroDigital_CartData.shipping = f.currencySymbol + qd_number_format(e / 100, 2, ",", ".");
					window._QuatroDigital_CartData.allTotal = f.currencySymbol + qd_number_format((b + e) / 100, 2, ",", ".");
					window._QuatroDigital_CartData.qtt = 0;
					if (f.showQuantityByItems)
						for (c = 0; c < a.items.length; c++)
							window._QuatroDigital_CartData.qtt += a.items[c].quantity;
					else
						window._QuatroDigital_CartData.qtt = a.items.length || 0;
					try {
						window._QuatroDigital_CartData.callback && window._QuatroDigital_CartData.callback.fire && window._QuatroDigital_CartData.callback.fire()
					} catch (u) {
						h("Problemas com o callback do Smart Cart")
					}
					t(l)
				}
					;
				k = function (a, b) {
					1 === a ? b.hide().filter(".singular").show() : b.hide().filter(".plural").show()
				}
					;
				r = function (a) {
					1 > a ? d.addClass("qd-emptyCart") : d.removeClass("qd-emptyCart")
				}
					;
				q = function (a, b) {
					var c;
					c = parseInt(window._QuatroDigital_CartData.qtt, 10);
					b.$this.show();
					isNaN(c) && (h("O valor obtido para calcular o plural/singular nÃ£o Ã© um nÃºmero! O valor serÃ¡ definido para 0.", "alerta"),
						c = 0);
					b.cartTotalE.html(window._QuatroDigital_CartData.total);
					b.cartQttE.html(c);
					k(c, b.itemsTextE);
					r(c)
				}
					;
				t = function (a) {
					d.each(function () {
						var d = {}, e;
						e = b(this);
						c && e.data("qd_simpleCartOpts") && b.extend(f, e.data("qd_simpleCartOpts"));
						d.$this = e;
						d.cartQttE = e.find(f.cartQtt) || l;
						d.cartTotalE = e.find(f.cartTotal) || l;
						d.itemsTextE = e.find(f.itemsText) || l;
						d.emptyElem = e.find(f.emptyCart) || l;
						q(a, d);
						e.addClass("qd-sc-populated")
					})
				}
					;
				(function () {
					if (f.smartCheckout) {
						window._QuatroDigital_DropDown = window._QuatroDigital_DropDown || {};
						if ("undefined" !== typeof window._QuatroDigital_DropDown.getOrderForm && (g ? g : !c))
							return n(window._QuatroDigital_DropDown.getOrderForm);
						if ("object" !== typeof window.vtexjs || "undefined" === typeof window.vtexjs.checkout)
							if ("object" === typeof vtex && "object" === typeof vtex.checkout && "undefined" !== typeof vtex.checkout.SDK)
								new vtex.checkout.SDK;
							else
								return h("NÃ£o foi encontrada a biblioteca VTEX.js");
						b.QD_checkoutQueue(["items", "totalizers", "shippingData"], {
							done: function (a) {
								n(a);
								window._QuatroDigital_DropDown.getOrderForm = a
							},
							fail: function (a) {
								h(["NÃ£o foi possÃ­vel obter os dados para o carrinho.", a])
							}
						})
					} else
						alert("Esta Ã© uma funÃ§Ã£o descontinuada =/")
				}
				)();
				f.callback();
				b(window).trigger("simpleCartCallback.quatro_digital");
				return d
			}
				;
			b.QD_simpleCart = {
				elements: b("")
			};
			b(function () {
				var c;
				"function" === typeof window.ajaxRequestbuyButtonAsynchronous && (c = window.ajaxRequestbuyButtonAsynchronous,
					window.ajaxRequestbuyButtonAsynchronous = function (k, g, d, h, m) {
						c.call(this, k, g, d, h, function () {
							"function" === typeof m && m();
							b.QD_simpleCart.elements.each(function () {
								var c;
								c = b(this);
								c.simpleCart(c.data("qd_simpleCartOpts"))
							})
						})
					}
				)
			});
			var k = window.ReloadItemsCart || void 0;
			window.ReloadItemsCart = function (c) {
				b.fn.simpleCart(!0);
				"function" === typeof k ? k.call(this, c) : alert(c)
			}
				;
			b(function () {
				var c = b(".qd_cart_auto");
				c.length && c.simpleCart()
			});
			b(function () {
				b(window).bind("productAddedToCart minicartUpdated.vtex cartProductAdded.vtex", function () {
					b.fn.simpleCart(!0)
				})
			})
		} catch (c) {
			"undefined" !== typeof console && "function" === typeof console.error && console.error("Oooops! ", c)
		}
	}
}
)();
(function () {
	var l = function (a, c) {
		if ("object" === typeof console) {
			var d = "object" === typeof a;
			"undefined" !== typeof c && "alerta" === c.toLowerCase() ? d ? console.warn("[QD VTEX Checkout Queue]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.warn("[QD VTEX Checkout Queue]\n" + a) : "undefined" !== typeof c && "info" === c.toLowerCase() ? d ? console.info("[QD VTEX Checkout Queue]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.info("[QD VTEX Checkout Queue]\n" + a) : d ? console.error("[QD VTEX Checkout Queue]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.error("[QD VTEX Checkout Queue]\n" + a)
		}
	}
		, f = null
		, g = {}
		, h = {}
		, e = {};
	$.QD_checkoutQueue = function (a, c) {
		if (null === f)
			if ("object" === typeof window.vtexjs && "undefined" !== typeof window.vtexjs.checkout)
				f = window.vtexjs.checkout;
			else
				return l("NÃ£o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a forÃ§a nÃ£o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js");
		var d = $.extend({
			done: function () { },
			fail: function () { }
		}, c)
			, b = a.join(";")
			, k = function () {
				g[b].add(d.done);
				h[b].add(d.fail)
			};
		e[b] ? k() : (g[b] = $.Callbacks(),
			h[b] = $.Callbacks(),
			k(),
			e[b] = !0,
			f.getOrderForm(a).done(function (a) {
				e[b] = !1;
				g[b].fire(a)
			}).fail(function (a) {
				e[b] = !1;
				h[b].fire(a)
			}))
	}
}
)();
(function (u) {
	try {
		var a = jQuery
			, r = a({})
			, n = function (a, d) {
				if ("object" === typeof console && "undefined" !== typeof console.error && "undefined" !== typeof console.info && "undefined" !== typeof console.warn) {
					var b;
					"object" === typeof a ? (a.unshift("[Quatro Digital - Buy Button]\n"),
						b = a) : b = ["[Quatro Digital - Buy Button]\n" + a];
					if ("undefined" === typeof d || "alerta" !== d.toLowerCase() && "aviso" !== d.toLowerCase())
						if ("undefined" !== typeof d && "info" === d.toLowerCase())
							try {
								console.info.apply(console, b)
							} catch (h) {
								try {
									console.info(b.join("\n"))
								} catch (k) { }
							}
						else
							try {
								console.error.apply(console, b)
							} catch (h) {
								try {
									console.error(b.join("\n"))
								} catch (k) { }
							}
					else
						try {
							console.warn.apply(console, b)
						} catch (h) {
							try {
								console.warn(b.join("\n"))
							} catch (k) { }
						}
				}
			}
			, t = {
				timeRemoveNewItemClass: 5e3,
				isSmartCheckout: !0,
				buyButton: ".productInformationWrapper  a.buy-button",
				buyQtt: "input.buy-in-page-quantity",
				selectSkuMsg: "javascript:",
				autoWatchBuyButton: !0,
				buyIfQuantityZeroed: !1,
				fakeRequest: !1,
				productPageCallback: function (g, d, b) {
					a("body").is(".productQuickView") && ("success" === d ? alert("Produto adicionado ao carrinho!") : (alert("Ooops! Algo saiu errado ao tentar adicionar seu produto ao carrinho. \n Vou te redirecionar para o carrinho."),
						("object" === typeof parent ? parent : document).location.href = b))
				},
				isProductPage: function () {
					return a("body").is("#produto, .produto")
				},
				execDefaultAction: function (a) {
					return !1
				},
				allowBuyClick: function () {
					return !0
				},
				callback: function () { },
				asyncCallback: function () { }
			};
		a.QD_buyButton = function (g, d, b) {
			function h(a) {
				f.isSmartCheckout ? a.data("qd-bb-click-active") || (a.data("qd-bb-click-active", 1),
					a.on("click.qd_bb_buy_sc", function (a) {
						if (!f.allowBuyClick())
							return !0;
						if (!0 !== m.clickBuySmartCheckout.call(this))
							return a.preventDefault(),
								!1
					})) : alert("MÃ©todo descontinuado!")
			}
			function k(e) {
				e = e || a(f.buyButton);
				e.each(function () {
					var c = a(this);
					c.is(".qd-sbb-on") || (c.addClass("qd-sbb-on"),
						c.is(".btn-add-buy-button-asynchronous") && !c.is(".remove-href") || c.data("qd-bb-active") || (c.data("qd-bb-active", 1),
							c.children(".qd-bb-productAdded").length || c.append('<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span>'),
							c.is(".buy-in-page-button") && f.isProductPage() && l.call(c),
							h(c)))
				});
				f.isProductPage() && !e.length && n("Oooops!\nAparentemente esta Ã© uma pÃ¡gina de produto porÃ©m nÃ£o encontrei nenhum botÃ£o comprar!\nVerifique se Ã© este mesmo o seletor: '" + e.selector + "'.", "info")
			}
			var f = b || f
				, p = a(g)
				, m = this;
			window._Quatro_Digital_dropDown = window._Quatro_Digital_dropDown || {};
			window._QuatroDigital_CartData = window._QuatroDigital_CartData || {};
			m.prodAdd = function (e, c) {
				p.addClass("qd-bb-itemAddCartWrapper qd-bb-lightBoxProdAdd");
				a("body").addClass("qd-bb-lightBoxBodyProdAdd");
				var b = a(f.buyButton).filter("[href='" + (e.attr("href") || "---") + "']").add(e);
				b.addClass("qd-bb-itemAddBuyButtonWrapper");
				setTimeout(function () {
					p.removeClass("qd-bb-itemAddCartWrapper");
					b.removeClass("qd-bb-itemAddBuyButtonWrapper")
				}, f.timeRemoveNewItemClass);
				window._Quatro_Digital_dropDown.getOrderForm = void 0;
				if ("undefined" !== typeof d && "function" === typeof d.getCartInfoByUrl)
					return f.isSmartCheckout || (n("funÃ§Ã£o descontinuada"),
						d.getCartInfoByUrl()),
						window._QuatroDigital_DropDown.getOrderForm = void 0,
						d.getCartInfoByUrl(function (c) {
							window._Quatro_Digital_dropDown.getOrderForm = c;
							a.fn.simpleCart(!0, void 0, !0)
						}, {
							lastSku: c
						});
				window._Quatro_Digital_dropDown.allowUpdate = !0;
				a.fn.simpleCart(!0);
				a(window).trigger("QuatroDigital.qd_sc_prodAdd", [e, c, b])
			}
				;
			(function () {
				if (f.isSmartCheckout && f.autoWatchBuyButton) {
					var e = a(".btn-add-buy-button-asynchronous");
					e.length && k(e)
				}
			}
			)();
			var l = function () {
				var e = a(this);
				"undefined" !== typeof e.data("buyButton") ? (e.unbind("click"),
					h(e)) : (e.bind("mouseenter.qd_bb_buy_sc", function (c) {
						e.unbind("click");
						h(e);
						a(this).unbind(c)
					}),
						a(window).load(function () {
							e.unbind("click");
							h(e);
							e.unbind("mouseenter.qd_bb_buy_sc")
						}))
			};
			m.clickBuySmartCheckout = function () {
				var e = a(this)
					, c = e.attr("href") || "";
				if (-1 < c.indexOf(f.selectSkuMsg))
					return !0;
				c = c.replace(/redirect=(false|true)/gi, "").replace("?", "?redirect=false&").replace(/&&/gi, "&");
				if (f.execDefaultAction(e))
					return e.attr("href", c.replace("redirect=false", "redirect=true")),
						!0;
				c = c.replace(/http.?:/i, "");
				r.queue(function (b) {
					if (!f.buyIfQuantityZeroed && !/(&|\?)qty=[1-9][0-9]*/gi.test(c))
						return b();
					var d = function (b, d) {
						var g = c.match(/sku=([0-9]+)/gi)
							, h = [];
						if ("object" === typeof g && null !== g)
							for (var k = g.length - 1; 0 <= k; k--) {
								var l = parseInt(g[k].replace(/sku=/gi, ""));
								isNaN(l) || h.push(l)
							}
						f.productPageCallback.call(this, b, d, c);
						m.buyButtonClickCallback.call(this, b, d, c, h);
						m.prodAdd(e, c.split("ku=").pop().split("&").shift());
						"function" === typeof f.asyncCallback && f.asyncCallback.call(this);
						a(window).trigger("productAddedToCart");
						a(window).trigger("cartProductAdded.vtex")
					};
					f.fakeRequest ? (d(null, "success"),
						b()) : a.ajax({
							url: c,
							complete: d,
							mimeType: "text/html"
						}).always(function () {
							b()
						})
				})
			}
				;
			m.buyButtonClickCallback = function (a, c, b, d) {
				try {
					"success" === c && "object" === typeof window.parent && "function" === typeof window.parent._QuatroDigital_prodBuyCallback && window.parent._QuatroDigital_prodBuyCallback(a, c, b, d)
				} catch (v) {
					n("Problemas ao tentar comunicar a pÃ¡gina que o produto foi aicionado ao carrinho.")
				}
			}
				;
			k();
			"function" === typeof f.callback ? f.callback.call(this) : n("Callback nÃ£o Ã© uma funÃ§Ã£o")
		}
			;
		var l = a.Callbacks();
		a.fn.QD_buyButton = function (g, d) {
			var b = a(this);
			"undefined" !== typeof d || "object" !== typeof g || g instanceof a || (d = g,
				g = void 0);
			var h;
			l.add(function () {
				b.children(".qd-bb-itemAddWrapper").length || b.prepend('<span class="qd-bb-itemAddWrapper"><span class="qd-bb-itemAddIco"></span></span>');
				h = new a.QD_buyButton(b, g, a.extend({}, t, d))
			});
			l.fire();
			a(window).on("QuatroDigital.qd_bb_prod_add", function (a, b, d) {
				h.prodAdd(b, d)
			});
			return a.extend(b, h)
		}
			;
		var q = 0;
		a(document).ajaxSend(function (a, d, b) {
			-1 < b.url.toLowerCase().indexOf("/checkout/cart/add") && (q = (b.url.match(/sku=([0-9]+)/i) || [""]).pop())
		});
		a(window).bind("productAddedToCart.qdSbbVtex", function () {
			a(window).trigger("QuatroDigital.qd_bb_prod_add", [new a, q])
		});
		a(document).ajaxStop(function () {
			l.fire()
		})
	} catch (g) {
		"undefined" !== typeof console && "function" === typeof console.error && console.error("Oooops! ", g)
	}
}
)(this);
(function (a) {
	a.fn.getParent = a.fn.closest
}
)(jQuery);
function qd_number_format(b, c, d, e) {
	b = (b + "").replace(/[^0-9+\-Ee.]/g, "");
	b = isFinite(+b) ? +b : 0;
	c = isFinite(+c) ? Math.abs(c) : 0;
	e = "undefined" === typeof e ? "," : e;
	d = "undefined" === typeof d ? "." : d;
	var a = ""
		, a = function (a, b) {
			var c = Math.pow(10, b);
			return "" + (Math.round(a * c) / c).toFixed(b)
		}
		, a = (c ? a(b, c) : "" + Math.round(b)).split(".");
	3 < a[0].length && (a[0] = a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, e));
	(a[1] || "").length < c && (a[1] = a[1] || "",
		a[1] += Array(c - a[1].length + 1).join("0"));
	return a.join(d)
}
var _0x3e9f = ["dataOptionsCache", "qd-ddc-cart-empty", "</td>", "apply", "object", ".qd-ddc-scrollUp", "length", "input.qd-productId[value=", "height", "<td> R$ ", ".qd-ddc-infoAllTotal", "qd-ddc-cart-rendered", "smartCart", ".qd-ddc-quantityMinus", "productAddedToCart.qdDdcVtex minicartUpdated.vtex.qdDdcVtex", "<div><span>Itens: #items</span><span>Subtotal: #value</span></div><div><span>Frete: #shipping</span><span>Total: #total</span></div>", ".qd-ddc-notification", "each", "SDK", "attr", "done", "cartContainer", "sellingPrice", "replace", "keyup.qd_ddc_closeFn", ".qd_bap_wrapper_content", "imageUrl", "alerta", "fail", ".qd-ddc-viewCart", "buyButton", "qd-ddc-cart-rendered qd-ddc-product-add-time", "callback", "body", "updateOnlyHover", "smartCheckout", "outerHeight", "qd-ddc-lastAddedFixed", ".qd-ddc-quantity", "keyup.qd_ddc_cep", "changeQantity", '<div class="qd-ddc-prodRow qd_ddc_prodRow"><div class="qd-ddc-prodCell qd-ddc-column1 qd-ddc-prodImg"><div class="qd-ddc-prodImgWrapper"><img src="" class="qd-ddc-image" /><span class="qd-ddc-imgLoading"></span></div></div><div class="qd-ddc-prodCell qd-ddc-column2 qd-ddc-prodName"></div><div class="qd-ddc-prodCell qd-ddc-column3 qd-ddc-prodPrice"></div><div class="qd-ddc-prodCell qd-ddc-column4 qd-ddc-prodQtt"><div class="qd-ddc-prodQttWrapper clearfix"><a href="#" class="qd-ddc-quantityMinus"></a><input type="text" class="qd-ddc-quantity" /><a href="#" class="qd-ddc-quantityMore"></a><span class="qd-ddc-qttLoading"></span></div></div><div class="qd-ddc-prodCell qd-ddc-column5 qd-ddc-prodRemove"><div class="qd-ddc-removeWrapper clearfix"><a href="#" class="qd-ddc-remove"></a><span class="qd-ddc-prodRowLoading"></span></div></div></div>', "notification", "NÃ£o foi possÃ­vel localizar os dados do item. A chave buscada Ã© composta pelo SKU: cItems[", "exec", "stop", ".qd-dd-cep-slas", "allowUpdate", "clearMessages", ".qd_ddc_continueShopping, .qd_ddc_lightBoxClose", "qd-ddc-product-add-time", "unshift", "click", "</td><td>", ".qd-ddc-cep-ok", "Callback nÃ£o Ã© uma funÃ§Ã£o", " dias ÃºtÃ©is", "erc", "load", "aviso", "#value", "cartTotal", "setOrderForm", "#items", "totalizers", "qd-ddc-lastAdded", "address", "toLowerCase", "dropDown", ".qd-ddc-cep-tooltip-text", "string", "click.qd_ddc_scrollUp", "Este mÃ©todo esta descontinuado!", "shippingForm", "warn", "qd_on", "actionButtons", "QD_dropDownCart", "off", "QD_buyButton", "AtenÃ§Ã£o, este mÃ©todo esta descontinuado.", "clearNotification", "fromCharCode", "NÃ£o foi possÃ­vel calcular o frete", "callbackProductsList nÃ£o Ã© uma funÃ§Ã£o", "insertProdImg", "#messageText", "allowRecalculate", "---", "QD_smartCart", ".qd-ddc-prodWrapper, .qd-ddc-prodWrapper2", ".qd-ddc-infoTotalShipping", "postalCode", "</div>", "qd-bb-lightBoxProdAdd sc-qd-cart-opened qd-ddc-product-add-time-v2", ".qd-ddc-prodName", " dia Ãºtil", "O Smart Cart nÃ£o Ã© mais iniciado desta forma. A versÃ£o que vocÃª esta executando tem licenÃ§a restrita e todos os direitos reservados Ã  Quatro Digital.", "enableNotification", ".qd_ddc_lightBoxOverlay", "hide", "ite", "checkout", ".qd-ddc-cep-tooltip", "remove", "boolean", '<span class="qd-ddc-infoTotalShipping"></span>', "preventDefault", "seller", ".qd-ddc-wrapper", ".qd-ddc-infoTotalItems", ", entrega em ", "click.qd_ddc_minus", "qd-loaded", "shippingEstimate", "renderProductsList", "shippingData", "à¸—ÃƒÑ² âˆšÎ‘â„“Â¡âˆ‚Î‘âˆ‚Ñ² Î¡Î‘à«¨Î‘ à«¯àª½Æ¬Î‘ LÑ²JÎ‘!", "#total", "continueShopping", ".qd-ddc-scrollDown", ".qd-ddc-emptyCart p", '<span class="qd-ddc-infoAllTotal"></span>', "getParent", "emptyCart", "insertBefore", "script", "Finalizar Compra", "_QuatroDigital_AmountProduct", "message", "formatCepField", "find", "qd-ddc-product-add-time-v2", ".qd-ddc-cep-btn", "<tr></tr>", "selector", "vtexjs", '<div class="qd-ddc-wrapper qd-ddc-noItems"><div class="qd-ddc-wrapper2"><div class="qd_ddc_lightBoxClose"></div><div class="qd-ddc-wrapper3"><div class="qd-ddc-emptyCart"><p></p></div><div class="qd-ddc-row qd-ddc-products"><a href="#" class="qd-ddc-scrollUp"></a><div class="qd-ddc-prodWrapper"> <div class="qd-ddc-prodWrapper2"></div> </div><span class="qd-ddc-prodLoading"></span><a href="#" class="qd-ddc-scrollDown"></a></div><div class="qd-ddc-row qd-ddc-info"><div class="qd-ddc-shipping"></div><div class="qd-ddc-infoTotal"></div><div class="qd-ddc-infoBts"><a href="/checkout/#/cart" class="qd-ddc-viewCart"></a><a href="#" class="qd_ddc_continueShopping"></a><a href="/checkout/#/orderform" class="qd-ddc-checkout"></a></div></div></div></div></div>', "thumbSize", "val", "atenÃ§Ã£o esta mÃ©todo esta descontinuado", "removeClass", "NÃ£o foi possÃ­vel obter '//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js' o DropDown nÃ£o serÃ¡ executado.", "addClass", "target", '<span class="qd-bap-wrapper" title="Itens no carrinho para este produto."><span class="qd-bap-wrapper2"><span class="qd-bap-qtt"></span></span></span>', "linkCart", "data-sku", "add", "shippingCalculate", ".qd-ddc-infoTotal", "NÃ£o foi possÃ­vel obter os dados do carrinho", '<span class="qd-ddc-infoTotalItems"></span>', ".qd-ddc-checkout", "slideUp", "function", "name", "NÃ£o foi possÃ­vel atualizar a quantidade de itens no carrinho", "BRA", "scrollCart", "Problemas ao atualizar os dados do carrinho a partir do eveento da VTEX. Detalhes: ", "AtenÃ§Ã£o este Ã© um mÃ©todo descontinuado. Contacte o SAC.", "callbackProductsList", "slas", "texts", ".qd-ddc-quantityMore", "html", '<div class="qd-ddc-cep-tooltip"><a href="#" class="qd-ddc-cep-btn">Consulte o prazo e o valor do frete</a><div class="qd-ddc-cep-tooltip-text"><h4 class="qd-ddc-cep-title">Consulte o prazo e o valor do frete</h4><div class="qd-ddc-cep-wrapper"><input type="tel" class="qd-ddc-cep" placeholder="Digite o CEP de entrega"><a class="qd-ddc-cep-ok" href="#">OK</a></div><a class="qd-ddc-cep-close" href="#"><i class="fa fa-times" aria-hidden="true"></i> Fechar</a></div></div>', "tbody", ".qd-bap-qtt", "QD_checkoutQueue", ".qd-ddc-prodQttWrapper:not(.qd_on)", "messages", "qd-loading", "qtt", "call", "lastSku", "click.qd_ddc_scrollDown", ".qd-ddc-cep-close", "Ir ao Carrinho", "qd-bap-item-added", "removeItems", "getCartInfoByUrl", ".qd-ddc-notification-close", "forceImageHTTPS", "j%25C2%25A8nhgbtynff%25C2%25A8pbz%25C2%25A8oe", "appendTo", ".qd-ddc-shipping input", "shipping", "qd-ddc-", "append", "total", "qd-ddc-noItems", "_QuatroDigital_CartData", "mouseenter.qd_ddc_hover", "closest", "[Quatro Digital - DropDown Cart]\n", "click._QD_DDC_closeShipping", "text", "productId", "split", "A execuÃ§Ã£o do DropDown parÃ¡ por aqui!", ".qd-ddc-cep", "Oooops! ", "http", "https", ".qd-ddc-prodPrice", "extend", '<div class="qd-ddc-notification">', "items", "keyup.qd_ddc_change", "updateItems", "buildNotification", "focusout.qd_ddc_change", "join", "NÃ£o foi encontrada a biblioteca VTEX.js", "$1-$2$3", ".qd-ddc-prodWrapper", "removeProduct", "getOrderForm", "info", "calculateShipping", "undefined", "qd-ddc-prodLoaded", ".qd-ddc-prodWrapper2", ".qd-ddc-shipping", "prepend", "price", ".qd-bap-wrapper", ".qd-ddc-infoTotalValue", "data-sku-index", ".qd_ddc_continueShopping", "linkCheckout", "click.qd_ddc_closeFn", " para o CEP ", "cartIsEmpty", "empty", "hgbtynff%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe", "#shipping", "simpleCart", "prod_", "error", "ProdAddTimeV2", ".qd-ddc-image", "quantity", "A biblioteca VTEX.js nÃ£o foi encontrada. o Script tentarÃ¡ buscar no CDN", "ajax", "avisso", ".qdDdcContainer", "prodId", ".qd-bap-item-added", "keyCode", "allTotal", "Continuar Comprando", "timeRemoveNewItemClass", ".qd-ddc-remove", "_QuatroDigital_DropDown", "skuName"];
(function (_0x25430f, _0x3e9f89) {
	var _0x3f6602 = function (_0x2e53b7) {
		while (--_0x2e53b7) {
			_0x25430f["push"](_0x25430f["shift"]())
		}
	};
	_0x3f6602(++_0x3e9f89)
}
)(_0x3e9f, 256);
var _0x3f66 = function (_0x25430f, _0x3e9f89) {
	_0x25430f = _0x25430f - 0;
	var _0x3f6602 = _0x3e9f[_0x25430f];
	return _0x3f6602
};
(function () {
	try {
		window[_0x3f66("0xc3")] = window[_0x3f66("0xc3")] || {},
			window[_0x3f66("0xc3")][_0x3f66("0x22")] = window[_0x3f66("0xc3")]["callback"] || $["Callbacks"]()
	} catch (_0x3e4b8b) {
		_0x3f66("0xe0") !== typeof console && _0x3f66("0x9d") === typeof console["error"] && console[_0x3f66("0xf3")]("Oooops! ", _0x3e4b8b[_0x3f66("0x83")])
	}
}
)();
(function (_0x51c372) {
	try {
		var _0x19cc96 = jQuery
			, _0x4978e3 = function (_0x4e8144, _0x146367) {
				if (_0x3f66("0x6") === typeof console && _0x3f66("0xe0") !== typeof console["error"] && _0x3f66("0xe0") !== typeof console[_0x3f66("0xde")] && _0x3f66("0xe0") !== typeof console["warn"]) {
					var _0x35a9ef;
					_0x3f66("0x6") === typeof _0x4e8144 ? (_0x4e8144[_0x3f66("0x35")](_0x3f66("0xc6")),
						_0x35a9ef = _0x4e8144) : _0x35a9ef = [_0x3f66("0xc6") + _0x4e8144];
					if ("undefined" === typeof _0x146367 || _0x3f66("0x1d") !== _0x146367[_0x3f66("0x45")]() && _0x3f66("0x3d") !== _0x146367[_0x3f66("0x45")]())
						if (_0x3f66("0xe0") !== typeof _0x146367 && "info" === _0x146367["toLowerCase"]())
							try {
								console[_0x3f66("0xde")][_0x3f66("0x5")](console, _0x35a9ef)
							} catch (_0x48a47e) {
								try {
									console[_0x3f66("0xde")](_0x35a9ef[_0x3f66("0xd8")]("\n"))
								} catch (_0x156d0d) { }
							}
						else
							try {
								console[_0x3f66("0xf3")][_0x3f66("0x5")](console, _0x35a9ef)
							} catch (_0x61254f) {
								try {
									console["error"](_0x35a9ef[_0x3f66("0xd8")]("\n"))
								} catch (_0xbcb60b) { }
							}
					else
						try {
							console["warn"][_0x3f66("0x5")](console, _0x35a9ef)
						} catch (_0x3ad931) {
							try {
								console[_0x3f66("0x4c")](_0x35a9ef[_0x3f66("0xd8")]("\n"))
							} catch (_0x1109d8) { }
						}
				}
			};
		window["_QuatroDigital_DropDown"] = window[_0x3f66("0x0")] || {};
		window[_0x3f66("0x0")][_0x3f66("0x31")] = !0;
		_0x19cc96[_0x3f66("0x4f")] = function () { }
			;
		_0x19cc96["fn"]["QD_dropDownCart"] = function () {
			return {
				fn: new _0x19cc96
			}
		}
			;
		var _0x35f304 = function (_0x415571) {
			var _0xd27f32 = {
				n: _0x3f66("0xef"),
				jj: _0x3f66("0xbb")
			};
			return function (_0x5d0a2f) {
				var _0x373106 = function (_0x3aec5b) {
					return _0x3aec5b
				};
				var _0x3833ac = ["a", "e", 18, "m", "s", "k", "d", "u", "g", "h", "a", "g", "s", "t", "z", "y", "o", "u", "o", "b"];
				_0x5d0a2f = _0x5d0a2f["d" + _0x3833ac[16] + "c" + _0x3833ac[17] + "m" + _0x373106(_0x3833ac[1]) + "n" + _0x3833ac[13]]["l" + _0x3833ac[18] + "c" + _0x3833ac[0] + "ti" + _0x373106("o") + "n"];
				var _0x169883 = function (_0x3de16e) {
					return escape(encodeURIComponent(_0x3de16e[_0x3f66("0x19")](/\./g, "Â¨")["replace"](/[a-zA-Z]/g, function (_0x2d66ae) {
						return String[_0x3f66("0x54")](("Z" >= _0x2d66ae ? 90 : 122) >= (_0x2d66ae = _0x2d66ae["charCodeAt"](0) + 13) ? _0x2d66ae : _0x2d66ae - 26)
					})))
				};
				var _0x433704 = _0x169883(_0x5d0a2f[[_0x3833ac[9], _0x373106("o"), _0x3833ac[12], _0x3833ac[_0x373106(13)]][_0x3f66("0xd8")]("")]);
				_0x169883 = _0x169883((window[["js", _0x373106("no"), "m", _0x3833ac[1], _0x3833ac[4]["toUpperCase"](), _0x3f66("0x67")][_0x3f66("0xd8")]("")] || _0x3f66("0x5a")) + [".v", _0x3833ac[13], "e", _0x373106("x"), "co", _0x373106("mm"), _0x3f66("0x3b"), _0x3833ac[1], ".c", _0x373106("o"), "m.", _0x3833ac[19], "r"][_0x3f66("0xd8")](""));
				for (var _0x1e5efb in _0xd27f32) {
					if (_0x169883 === _0x1e5efb + _0xd27f32[_0x1e5efb] || _0x433704 === _0x1e5efb + _0xd27f32[_0x1e5efb]) {
						var _0x480d75 = "tr" + _0x3833ac[17] + "e";
						break
					}
					_0x480d75 = "f" + _0x3833ac[0] + "ls" + _0x373106(_0x3833ac[1])
				}
				_0x373106 = !1;
				-1 < _0x5d0a2f[[_0x3833ac[12], "e", _0x3833ac[0], "rc", _0x3833ac[9]]["join"]("")]["indexOf"]("qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82") && (_0x373106 = !0);
				return [_0x480d75, _0x373106]
			}(_0x415571)
		}(window);
		if (!eval(_0x35f304[0]))
			return _0x35f304[1] ? _0x4978e3(_0x3f66("0x77")) : !1;
		_0x19cc96[_0x3f66("0x4f")] = function (_0x2d1df7, _0x352323) {
			var _0x152d35 = _0x19cc96(_0x2d1df7);
			if (!_0x152d35[_0x3f66("0x8")])
				return _0x152d35;
			var _0x19e65a = _0x19cc96["extend"](!0, {}, {
				updateOnlyHover: !0,
				texts: {
					linkCart: _0x3f66("0xb5"),
					linkCheckout: _0x3f66("0x81"),
					cartTotal: _0x3f66("0x11"),
					emptyCart: "Seu carrinho ainda nÃ£o tem nenhum produto.",
					continueShopping: _0x3f66("0xff"),
					shippingForm: _0x3f66("0xa9"),
					notification: '<span class="qd-ddc-notification-close">X</span><p>#messageText</p>'
				},
				timeRemoveNewItemClass: 5e3,
				forceImageHTTPS: !1,
				thumbSize: {
					w: 100,
					h: 100
				},
				skuName: function (_0x871e5a) {
					return _0x871e5a[_0x3f66("0x1")] || _0x871e5a["name"]
				},
				callback: function () { },
				callbackProductsList: function () { },
				enableNotification: !1,
				clearNotification: !1,
				smartCheckout: !0
			}, _0x352323);
			_0x19cc96("");
			var _0x193fbd = this;
			if (_0x19e65a[_0x3f66("0x25")]) {
				var _0x240f52 = !1;
				_0x3f66("0xe0") === typeof window[_0x3f66("0x8a")] && (_0x4978e3(_0x3f66("0xf7")),
					_0x19cc96[_0x3f66("0xf8")]({
						url: "//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js",
						async: !1,
						dataType: _0x3f66("0x80"),
						error: function () {
							_0x4978e3(_0x3f66("0x90"));
							_0x240f52 = !0
						}
					}));
				if (_0x240f52)
					return _0x4978e3(_0x3f66("0xcb"))
			}
			if ("object" === typeof window[_0x3f66("0x8a")] && "undefined" !== typeof window[_0x3f66("0x8a")][_0x3f66("0x68")])
				var _0x372e3e = window[_0x3f66("0x8a")][_0x3f66("0x68")];
			else if (_0x3f66("0x6") === typeof vtex && _0x3f66("0x6") === typeof vtex[_0x3f66("0x68")] && _0x3f66("0xe0") !== typeof vtex["checkout"]["SDK"])
				_0x372e3e = new (vtex[_0x3f66("0x68")][_0x3f66("0x14")]);
			else
				return _0x4978e3(_0x3f66("0xd9"));
			var _0x4e0077 = /^\/|\/$/g
				, _0xcdac4a = /[^0-9]/g
				, _0x471935 = /([0-9]{5})([0-9])([0-9]{2})?/g
				, _0x865251 = /(.{9}).*/g
				, _0x2200eb = /(ids\/[0-9]+)[^\/]+/i;
			_0x193fbd[_0x3f66("0x17")] = _0x3f66("0x8b");
			var _0x3f4fb9 = function (_0x5cdfa6) {
				_0x19cc96(this)[_0x3f66("0xc0")](_0x5cdfa6);
				_0x5cdfa6[_0x3f66("0x85")](_0x3f66("0x33"))["add"](_0x19cc96(_0x3f66("0x65")))["on"](_0x3f66("0xeb"), function () {
					_0x152d35[_0x3f66("0x8f")](_0x3f66("0x60"));
					_0x19cc96(document[_0x3f66("0x23")])["removeClass"]("qd-bb-lightBoxBodyProdAdd sc-qd-cart-opened qd-ddc-product-add-time-v2")
				});
				_0x19cc96(document)[_0x3f66("0x50")](_0x3f66("0x1a"))["on"]("keyup.qd_ddc_closeFn", function (_0x60e35e) {
					27 == _0x60e35e[_0x3f66("0xfd")] && (_0x152d35[_0x3f66("0x8f")](_0x3f66("0x60")),
						_0x19cc96(document[_0x3f66("0x23")])["removeClass"]("qd-bb-lightBoxBodyProdAdd sc-qd-cart-opened qd-ddc-product-add-time-v2"))
				});
				var _0x525f7c = _0x5cdfa6[_0x3f66("0x85")](_0x3f66("0xdb"));
				_0x5cdfa6["find"](_0x3f66("0x7"))["on"](_0x3f66("0x49"), function () {
					_0x193fbd[_0x3f66("0xa1")]("-", void 0, void 0, _0x525f7c);
					return !1
				});
				_0x5cdfa6["find"](_0x3f66("0x7a"))["on"](_0x3f66("0xb3"), function () {
					_0x193fbd[_0x3f66("0xa1")](void 0, void 0, void 0, _0x525f7c);
					return !1
				});
				var _0x45e6e8 = _0x5cdfa6["find"](_0x3f66("0x47"))
					, _0x47abcc = _0x5cdfa6["find"](_0x3f66("0xcc"))
					, _0x5bb03d = _0x5cdfa6[_0x3f66("0x85")](_0x3f66("0x38"));
				_0x47abcc[_0x3f66("0x8d")]("")["on"](_0x3f66("0x29"), function (_0x394619) {
					_0x193fbd[_0x3f66("0x84")](_0x19cc96(this));
					13 == _0x394619[_0x3f66("0xfd")] && _0x5bb03d[_0x3f66("0x36")]()
				});
				_0x5cdfa6[_0x3f66("0x85")](_0x3f66("0x87"))[_0x3f66("0x36")](function (_0x3382ff) {
					_0x3382ff[_0x3f66("0x6d")]();
					_0x5cdfa6[_0x3f66("0x85")](_0x3f66("0x30"))[_0x3f66("0x8")] && _0x193fbd[_0x3f66("0x97")](_0x47abcc);
					_0x45e6e8["toggle"]()
				});
				_0x5cdfa6[_0x3f66("0x85")](_0x3f66("0xb4"))[_0x3f66("0x36")](function (_0x18e11c) {
					_0x18e11c[_0x3f66("0x6d")]();
					_0x45e6e8["hide"]()
				});
				_0x19cc96(document)["off"](_0x3f66("0xc7"))["on"]("click._QD_DDC_closeShipping", function (_0x2c54c5) {
					_0x19cc96(_0x2c54c5[_0x3f66("0x92")])["closest"](_0x5cdfa6[_0x3f66("0x85")](_0x3f66("0x69")))[_0x3f66("0x8")] || _0x45e6e8[_0x3f66("0x66")]()
				});
				_0x5bb03d[_0x3f66("0x36")](function (_0x28b2a4) {
					_0x28b2a4[_0x3f66("0x6d")]();
					_0x193fbd["shippingCalculate"](_0x47abcc)
				});
				if (_0x19e65a["updateOnlyHover"]) {
					var _0x398ff8 = 0;
					_0x19cc96(this)["on"](_0x3f66("0xc4"), function () {
						var _0x370a3a = function () {
							window[_0x3f66("0x0")]["allowUpdate"] && (_0x193fbd[_0x3f66("0xb8")](),
								window[_0x3f66("0x0")][_0x3f66("0x31")] = !1,
								_0x19cc96["fn"]["simpleCart"](!0),
								_0x193fbd[_0x3f66("0xed")]())
						};
						_0x398ff8 = setInterval(function () {
							_0x370a3a()
						}, 600);
						_0x370a3a()
					});
					_0x19cc96(this)["on"]("mouseleave.qd_ddc_hover", function () {
						clearInterval(_0x398ff8)
					})
				}
			};
			var _0x3e7b76 = function (_0x4a998e) {
				_0x4a998e = _0x19cc96(_0x4a998e);
				_0x19e65a[_0x3f66("0xa6")]["cartTotal"] = _0x19e65a["texts"][_0x3f66("0x3f")][_0x3f66("0x19")](_0x3f66("0x3e"), '<span class="qd-ddc-infoTotalValue"></span>');
				_0x19e65a[_0x3f66("0xa6")][_0x3f66("0x3f")] = _0x19e65a[_0x3f66("0xa6")]["cartTotal"][_0x3f66("0x19")](_0x3f66("0x41"), _0x3f66("0x9a"));
				_0x19e65a[_0x3f66("0xa6")][_0x3f66("0x3f")] = _0x19e65a["texts"]["cartTotal"][_0x3f66("0x19")](_0x3f66("0xf0"), _0x3f66("0x6c"));
				_0x19e65a[_0x3f66("0xa6")][_0x3f66("0x3f")] = _0x19e65a["texts"]["cartTotal"][_0x3f66("0x19")](_0x3f66("0x78"), _0x3f66("0x7c"));
				_0x4a998e["find"](_0x3f66("0x1f"))["html"](_0x19e65a["texts"][_0x3f66("0x94")]);
				_0x4a998e[_0x3f66("0x85")](_0x3f66("0xe9"))["html"](_0x19e65a["texts"][_0x3f66("0x79")]);
				_0x4a998e[_0x3f66("0x85")](_0x3f66("0x9b"))[_0x3f66("0xa8")](_0x19e65a[_0x3f66("0xa6")][_0x3f66("0xea")]);
				_0x4a998e["find"](_0x3f66("0x98"))[_0x3f66("0xa8")](_0x19e65a[_0x3f66("0xa6")][_0x3f66("0x3f")]);
				_0x4a998e["find"](_0x3f66("0xe3"))[_0x3f66("0xa8")](_0x19e65a["texts"][_0x3f66("0x4b")]);
				_0x4a998e[_0x3f66("0x85")](_0x3f66("0x7b"))[_0x3f66("0xa8")](_0x19e65a["texts"][_0x3f66("0x7e")]);
				return _0x4a998e
			}(this[_0x3f66("0x17")]);
			var _0x5d3cad = 0;
			_0x152d35[_0x3f66("0x13")](function () {
				0 < _0x5d3cad ? _0x3f4fb9[_0x3f66("0xb1")](this, _0x3e7b76["clone"]()) : _0x3f4fb9[_0x3f66("0xb1")](this, _0x3e7b76);
				_0x5d3cad++
			});
			window[_0x3f66("0xc3")]["callback"][_0x3f66("0x96")](function () {
				_0x19cc96(_0x3f66("0xe7"))[_0x3f66("0xa8")](window[_0x3f66("0xc3")][_0x3f66("0xc1")] || "--");
				_0x19cc96(_0x3f66("0x70"))[_0x3f66("0xa8")](window[_0x3f66("0xc3")][_0x3f66("0xb0")] || "0");
				_0x19cc96(_0x3f66("0x5d"))[_0x3f66("0xa8")](window[_0x3f66("0xc3")][_0x3f66("0xbe")] || "--");
				_0x19cc96(_0x3f66("0xc"))["html"](window[_0x3f66("0xc3")][_0x3f66("0xfe")] || "--")
			});
			var _0x4baa29 = function (_0x4ecfe, _0x3cc65f) {
				if ("undefined" === typeof _0x4ecfe["items"])
					return _0x4978e3("NÃ£o foi possÃ­vel obter os items da requisiÃ§Ã£o");
				_0x193fbd[_0x3f66("0x75")][_0x3f66("0xb1")](this, _0x3cc65f)
			};
			_0x193fbd[_0x3f66("0xb8")] = function (_0x1e74ca, _0x2cc2bb) {
				"undefined" != typeof _0x2cc2bb ? window["_QuatroDigital_DropDown"][_0x3f66("0x2")] = _0x2cc2bb : window["_QuatroDigital_DropDown"][_0x3f66("0x2")] && (_0x2cc2bb = window["_QuatroDigital_DropDown"]["dataOptionsCache"]);
				setTimeout(function () {
					window[_0x3f66("0x0")][_0x3f66("0x2")] = void 0
				}, _0x19e65a["timeRemoveNewItemClass"]);
				_0x19cc96(_0x3f66("0x6f"))["removeClass"](_0x3f66("0xe1"));
				if (_0x19e65a[_0x3f66("0x25")]) {
					var _0x5c1e76 = function (_0x2739e5) {
						_0x193fbd[_0x3f66("0x40")](_0x2739e5);
						_0x4baa29(_0x2739e5, _0x2cc2bb);
						"undefined" !== typeof window[_0x3f66("0x82")] && "function" === typeof window["_QuatroDigital_AmountProduct"]["exec"] && window[_0x3f66("0x82")][_0x3f66("0x2e")][_0x3f66("0xb1")](this);
						_0x19cc96(_0x3f66("0x6f"))["addClass"](_0x3f66("0xe1"))
					};
					_0x3f66("0xe0") !== typeof window[_0x3f66("0x0")][_0x3f66("0xdd")] ? (_0x5c1e76(window[_0x3f66("0x0")]["getOrderForm"]),
						_0x3f66("0x9d") === typeof _0x1e74ca && _0x1e74ca(window[_0x3f66("0x0")][_0x3f66("0xdd")])) : _0x19cc96[_0x3f66("0xac")]([_0x3f66("0xd3"), _0x3f66("0x42"), _0x3f66("0x76")], {
							done: function (_0x2d840e) {
								_0x5c1e76[_0x3f66("0xb1")](this, _0x2d840e);
								_0x3f66("0x9d") === typeof _0x1e74ca && _0x1e74ca(_0x2d840e)
							},
							fail: function (_0x1a26a1) {
								_0x4978e3([_0x3f66("0x99"), _0x1a26a1])
							}
						})
				} else
					alert(_0x3f66("0x4a"))
			}
				;
			_0x193fbd[_0x3f66("0xed")] = function () {
				var _0x4b8466 = _0x19cc96(".qd-ddc-wrapper");
				_0x4b8466["find"](".qd-ddc-prodRow")[_0x3f66("0x8")] ? _0x4b8466[_0x3f66("0x8f")]("qd-ddc-noItems") : _0x4b8466[_0x3f66("0x91")](_0x3f66("0xc2"))
			}
				;
			_0x193fbd[_0x3f66("0x75")] = function (_0x11ce41) {
				var _0x47b480 = _0x19cc96(_0x3f66("0xe2"));
				_0x47b480[_0x3f66("0xee")]();
				_0x47b480[_0x3f66("0x13")](function () {
					var _0x3b3b34 = _0x19cc96(this), _0x563a3d, _0x2123ff, _0x298522 = _0x19cc96(""), _0x261c4f;
					for (_0x261c4f in window[_0x3f66("0x0")][_0x3f66("0xdd")]["items"])
						if (_0x3f66("0x6") === typeof window[_0x3f66("0x0")]["getOrderForm"][_0x3f66("0xd3")][_0x261c4f]) {
							var _0x1547ab = window["_QuatroDigital_DropDown"][_0x3f66("0xdd")]["items"][_0x261c4f];
							var _0x29bfb5 = _0x1547ab["productCategoryIds"]["replace"](_0x4e0077, "")[_0x3f66("0xca")]("/");
							var _0x33a051 = _0x19cc96(_0x3f66("0x2b"));
							_0x33a051["attr"]({
								"data-sku": _0x1547ab["id"],
								"data-sku-index": _0x261c4f,
								"data-qd-departament": _0x29bfb5[0],
								"data-qd-category": _0x29bfb5[_0x29bfb5[_0x3f66("0x8")] - 1]
							});
							_0x33a051[_0x3f66("0x91")](_0x3f66("0xbf") + _0x1547ab["availability"]);
							_0x33a051["find"](_0x3f66("0x61"))["append"](_0x19e65a[_0x3f66("0x1")](_0x1547ab));
							_0x33a051[_0x3f66("0x85")](_0x3f66("0xd0"))[_0x3f66("0xc0")](isNaN(_0x1547ab[_0x3f66("0x18")]) ? _0x1547ab[_0x3f66("0x18")] : 0 == _0x1547ab["sellingPrice"] ? "GrÃ¡tis" : (_0x19cc96("meta[name=currency]")["attr"]("content") || "R$") + " " + qd_number_format(_0x1547ab[_0x3f66("0x18")] / 100, 2, ",", "."));
							_0x33a051[_0x3f66("0x85")](".qd-ddc-quantity")["attr"]({
								"data-sku": _0x1547ab["id"],
								"data-sku-index": _0x261c4f
							})[_0x3f66("0x8d")](_0x1547ab[_0x3f66("0xf6")]);
							_0x33a051["find"](".qd-ddc-remove")[_0x3f66("0x15")]({
								"data-sku": _0x1547ab["id"],
								"data-sku-index": _0x261c4f
							});
							_0x193fbd[_0x3f66("0x57")](_0x1547ab["id"], _0x33a051[_0x3f66("0x85")](_0x3f66("0xf5")), _0x1547ab[_0x3f66("0x1c")]);
							_0x33a051["find"](".qd-ddc-quantityMore,.qd-ddc-quantityMinus")[_0x3f66("0x15")]({
								"data-sku": _0x1547ab["id"],
								"data-sku-index": _0x261c4f
							});
							_0x33a051["appendTo"](_0x3b3b34);
							_0x298522 = _0x298522[_0x3f66("0x96")](_0x33a051)
						}
					try {
						var _0xd1c1a9 = _0x3b3b34[_0x3f66("0x7d")](".qd-ddc-wrapper")["find"](_0x3f66("0xbd"));
						_0xd1c1a9["length"] && "" == _0xd1c1a9[_0x3f66("0x8d")]() && window[_0x3f66("0x0")][_0x3f66("0xdd")][_0x3f66("0x76")][_0x3f66("0x44")] && _0xd1c1a9[_0x3f66("0x8d")](window[_0x3f66("0x0")][_0x3f66("0xdd")][_0x3f66("0x76")][_0x3f66("0x44")][_0x3f66("0x5e")])
					} catch (_0x39989a) {
						_0x4978e3("Problemas ao tentar definir o CEP com base nos dados do checkout. Detalhes: " + _0x39989a[_0x3f66("0x83")], _0x3f66("0x3d"))
					}
					_0x193fbd[_0x3f66("0x4e")](_0x3b3b34);
					_0x193fbd[_0x3f66("0xed")]();
					_0x11ce41 && _0x11ce41["lastSku"] && function () {
						_0x2123ff = _0x298522["filter"]("[data-sku='" + _0x11ce41[_0x3f66("0xb2")] + "']");
						_0x2123ff[_0x3f66("0x8")] && (_0x563a3d = 0,
							_0x298522[_0x3f66("0x13")](function () {
								var _0x107218 = _0x19cc96(this);
								if (_0x107218["is"](_0x2123ff))
									return !1;
								_0x563a3d += _0x107218[_0x3f66("0x26")]()
							}),
							_0x193fbd[_0x3f66("0xa1")](void 0, void 0, _0x563a3d, _0x3b3b34[_0x3f66("0x96")](_0x3b3b34["parent"]())),
							_0x298522[_0x3f66("0x8f")](_0x3f66("0x27")),
							function (_0x2e4b54) {
								_0x2e4b54["addClass"](_0x3f66("0x43"));
								_0x2e4b54[_0x3f66("0x91")](_0x3f66("0x27"));
								setTimeout(function () {
									_0x2e4b54[_0x3f66("0x8f")](_0x3f66("0x43"))
								}, _0x19e65a[_0x3f66("0x100")])
							}(_0x2123ff),
							_0x3f66("0xe0") !== typeof window[_0x3f66("0x0")]["ProdAddTimeV2"] && clearTimeout(window[_0x3f66("0x0")][_0x3f66("0xf4")]),
							_0x19cc96(document["body"])["addClass"](_0x3f66("0x86")),
							window[_0x3f66("0x0")][_0x3f66("0xf4")] = setTimeout(function () {
								_0x19cc96(document["body"])["removeClass"]("qd-ddc-product-add-time-v2")
							}, _0x19e65a[_0x3f66("0x100")]))
					}()
				});
				(function () {
					_QuatroDigital_DropDown["getOrderForm"][_0x3f66("0xd3")][_0x3f66("0x8")] ? (_0x19cc96(_0x3f66("0x23"))["removeClass"](_0x3f66("0x3"))[_0x3f66("0x91")](_0x3f66("0x21")),
						setTimeout(function () {
							_0x19cc96("body")[_0x3f66("0x8f")](_0x3f66("0x34"))
						}, _0x19e65a[_0x3f66("0x100")])) : _0x19cc96(_0x3f66("0x23"))["removeClass"](_0x3f66("0xd"))[_0x3f66("0x91")](_0x3f66("0x3"))
				}
				)();
				_0x3f66("0x9d") === typeof _0x19e65a["callbackProductsList"] ? _0x19e65a[_0x3f66("0xa4")][_0x3f66("0xb1")](this) : _0x4978e3(_0x3f66("0x56"))
			}
				;
			_0x193fbd["insertProdImg"] = function (_0x23d6b5, _0x54cf47, _0x32f064) {
				function _0x4b887c() {
					_0x32f064 = _0x32f064[_0x3f66("0x19")](_0x2200eb, "$1-" + _0x19e65a[_0x3f66("0x8c")]["w"] + "-" + _0x19e65a["thumbSize"]["h"]);
					_0x19e65a[_0x3f66("0xba")] && _0x3f66("0x48") == typeof _0x32f064 && (_0x32f064 = _0x32f064[_0x3f66("0x19")](_0x3f66("0xce"), _0x3f66("0xcf")));
					_0x54cf47[_0x3f66("0x8f")](_0x3f66("0x73"))[_0x3f66("0x3c")](function () {
						_0x19cc96(this)[_0x3f66("0x91")](_0x3f66("0x73"))
					})["attr"]("src", _0x32f064)
				}
				_0x32f064 ? _0x4b887c() : isNaN(_0x23d6b5) ? _0x4978e3("NÃ£o foi informada uma URL para a imagem e nem um SKU", "alerta") : alert(_0x3f66("0xa3"))
			}
				;
			_0x193fbd[_0x3f66("0x4e")] = function (_0x1fed6c) {
				var _0xe6809d = function (_0x11ec06, _0x3f4645) {
					var _0x33fd7e = _0x19cc96(_0x11ec06);
					var _0x4569cf = _0x33fd7e[_0x3f66("0x15")](_0x3f66("0x95"));
					var _0x224964 = _0x33fd7e[_0x3f66("0x15")](_0x3f66("0xe8"));
					if (_0x4569cf) {
						var _0x4d7b68 = parseInt(_0x33fd7e[_0x3f66("0x8d")]()) || 1;
						_0x193fbd["changeQantity"]([_0x4569cf, _0x224964], _0x4d7b68, _0x4d7b68 + 1, function (_0x575183) {
							_0x33fd7e["val"](_0x575183);
							_0x3f66("0x9d") === typeof _0x3f4645 && _0x3f4645()
						})
					}
				};
				var _0x19461f = function (_0x46848f, _0x25c6d6) {
					var _0x58c744 = _0x19cc96(_0x46848f);
					var _0x265dce = _0x58c744[_0x3f66("0x15")](_0x3f66("0x95"));
					var _0x9e4d = _0x58c744[_0x3f66("0x15")](_0x3f66("0xe8"));
					if (_0x265dce) {
						var _0x24964e = parseInt(_0x58c744[_0x3f66("0x8d")]()) || 2;
						_0x193fbd[_0x3f66("0x2a")]([_0x265dce, _0x9e4d], _0x24964e, _0x24964e - 1, function (_0x9d272c) {
							_0x58c744["val"](_0x9d272c);
							_0x3f66("0x9d") === typeof _0x25c6d6 && _0x25c6d6()
						})
					}
				};
				var _0x5c230b = function (_0x33ff00, _0x113af0) {
					var _0x578dbd = _0x19cc96(_0x33ff00);
					var _0x33bb98 = _0x578dbd[_0x3f66("0x15")](_0x3f66("0x95"));
					var _0x4690bd = _0x578dbd[_0x3f66("0x15")](_0x3f66("0xe8"));
					if (_0x33bb98) {
						var _0x17a4e9 = parseInt(_0x578dbd["val"]()) || 1;
						_0x193fbd[_0x3f66("0x2a")]([_0x33bb98, _0x4690bd], 1, _0x17a4e9, function (_0x4f278c) {
							_0x578dbd[_0x3f66("0x8d")](_0x4f278c);
							_0x3f66("0x9d") === typeof _0x113af0 && _0x113af0()
						})
					}
				};
				var _0x8e9434 = _0x1fed6c[_0x3f66("0x85")](_0x3f66("0xad"));
				_0x8e9434[_0x3f66("0x91")](_0x3f66("0x4d"))[_0x3f66("0x13")](function () {
					var _0x38e4a6 = _0x19cc96(this);
					_0x38e4a6["find"](_0x3f66("0xa7"))["on"]("click.qd_ddc_more", function (_0x5a2006) {
						_0x5a2006["preventDefault"]();
						_0x8e9434["addClass"](_0x3f66("0xaf"));
						_0xe6809d(_0x38e4a6[_0x3f66("0x85")](_0x3f66("0x28")), function () {
							_0x8e9434[_0x3f66("0x8f")](_0x3f66("0xaf"))
						})
					});
					_0x38e4a6[_0x3f66("0x85")](_0x3f66("0xf"))["on"](_0x3f66("0x72"), function (_0x537280) {
						_0x537280[_0x3f66("0x6d")]();
						_0x8e9434["addClass"](_0x3f66("0xaf"));
						_0x19461f(_0x38e4a6["find"](_0x3f66("0x28")), function () {
							_0x8e9434["removeClass"](_0x3f66("0xaf"))
						})
					});
					_0x38e4a6[_0x3f66("0x85")](".qd-ddc-quantity")["on"](_0x3f66("0xd7"), function () {
						_0x8e9434[_0x3f66("0x91")](_0x3f66("0xaf"));
						_0x5c230b(this, function () {
							_0x8e9434[_0x3f66("0x8f")](_0x3f66("0xaf"))
						})
					});
					_0x38e4a6["find"](_0x3f66("0x28"))["on"](_0x3f66("0xd4"), function (_0x20e5eb) {
						13 == _0x20e5eb[_0x3f66("0xfd")] && (_0x8e9434["addClass"](_0x3f66("0xaf")),
							_0x5c230b(this, function () {
								_0x8e9434[_0x3f66("0x8f")](_0x3f66("0xaf"))
							}))
					})
				});
				_0x1fed6c[_0x3f66("0x85")](".qd-ddc-prodRow")[_0x3f66("0x13")](function () {
					var _0x21afa8 = _0x19cc96(this);
					_0x21afa8[_0x3f66("0x85")](_0x3f66("0x101"))["on"]("click.qd_ddc_remove", function () {
						_0x21afa8["addClass"](_0x3f66("0xaf"));
						_0x193fbd[_0x3f66("0xdc")](_0x19cc96(this), function (_0xa70376) {
							_0xa70376 ? _0x21afa8[_0x3f66("0x2f")](!0)[_0x3f66("0x9c")](function () {
								_0x21afa8[_0x3f66("0x6a")]();
								_0x193fbd[_0x3f66("0xed")]();
								window[_0x3f66("0x0")][_0x3f66("0xdd")][_0x3f66("0xd3")][_0x3f66("0x8")] && _0x193fbd[_0x3f66("0x97")](_0x1fed6c[_0x3f66("0x7d")](_0x3f66("0x6f"))["find"](_0x3f66("0xcc")))
							}) : _0x21afa8[_0x3f66("0x8f")]("qd-loading")
						});
						return !1
					})
				})
			}
				;
			_0x193fbd[_0x3f66("0x84")] = function (_0x35c413) {
				var _0x5bb44c = _0x35c413[_0x3f66("0x8d")]();
				_0x5bb44c = _0x5bb44c[_0x3f66("0x19")](_0xcdac4a, "");
				_0x5bb44c = _0x5bb44c[_0x3f66("0x19")](_0x471935, _0x3f66("0xda"));
				_0x5bb44c = _0x5bb44c[_0x3f66("0x19")](_0x865251, "$1");
				_0x35c413["val"](_0x5bb44c)
			}
				;
			_0x193fbd[_0x3f66("0x97")] = function (_0x37dee1) {
				var _0x5be04b = (_0x37dee1["val"]() || "")[_0x3f66("0x19")](/[^0-9]/g, "");
				8 <= _0x5be04b[_0x3f66("0x8")] && _0x372e3e[_0x3f66("0xdf")]({
					postalCode: _0x5be04b,
					country: _0x3f66("0xa0")
				})[_0x3f66("0x16")](function (_0x4d5a9e) {
					_0x37dee1[_0x3f66("0xc5")](_0x3f66("0x47"))[_0x3f66("0x85")](_0x3f66("0x30"))[_0x3f66("0x6a")]();
					_0x193fbd[_0x3f66("0x40")](_0x4d5a9e);
					_0x193fbd["getCartInfoByUrl"]();
					var _0x148eed = []
						, _0x512a0b = _0x4d5a9e[_0x3f66("0x76")]["logisticsInfo"];
					_0x4d5a9e = _0x19cc96('<table class="table qd-dd-cep-slas"><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>');
					for (var _0x168175 = 0; _0x168175 < _0x512a0b["length"]; _0x168175++)
						for (var _0x19c6df = _0x512a0b[_0x168175][_0x3f66("0xa5")], _0x3867e2 = 0; _0x3867e2 < _0x19c6df["length"]; _0x3867e2++)
							_0x148eed[_0x3867e2] = _0x148eed[_0x3867e2] || {},
								_0x148eed[_0x3867e2][_0x3f66("0xe5")] = (_0x148eed[_0x3867e2][_0x3f66("0xe5")] || 0) + _0x19c6df[_0x3867e2]["price"],
								_0x148eed[_0x3867e2][_0x3f66("0x74")] = _0x19c6df[_0x3867e2][_0x3f66("0x74")],
								_0x148eed[_0x3867e2][_0x3f66("0x9e")] = _0x19c6df[_0x3867e2]["name"];
					for (_0x512a0b = 0; _0x512a0b < _0x148eed["length"]; _0x512a0b++)
						_0x168175 = _0x19cc96(_0x3f66("0x88")),
							_0x19c6df = 1 < _0x148eed[_0x512a0b][_0x3f66("0x74")] ? _0x148eed[_0x512a0b][_0x3f66("0x74")][_0x3f66("0x19")]("bd", _0x3f66("0x62")) : _0x148eed[_0x512a0b][_0x3f66("0x74")][_0x3f66("0x19")]("bd", _0x3f66("0x3a")),
							_0x168175[_0x3f66("0xc0")](_0x3f66("0xb") + qd_number_format(_0x148eed[_0x512a0b][_0x3f66("0xe5")] / 100, 2, ",", ".") + _0x3f66("0x37") + _0x148eed[_0x512a0b][_0x3f66("0x9e")] + _0x3f66("0x71") + _0x19c6df + _0x3f66("0xec") + _0x5be04b + _0x3f66("0x4")),
							_0x168175[_0x3f66("0xbc")](_0x4d5a9e[_0x3f66("0x85")](_0x3f66("0xaa")));
					_0x4d5a9e[_0x3f66("0x7f")](_0x37dee1[_0x3f66("0xc5")](_0x3f66("0x47"))[_0x3f66("0x85")](_0x3f66("0xb4")))
				})[_0x3f66("0x1e")](function (_0x51dfc3) {
					_0x4978e3([_0x3f66("0x55"), _0x51dfc3])
				})
			}
				;
			_0x193fbd["changeQantity"] = function (_0x4bb95c, _0xe9ec37, _0x495eb9, _0x9536f3) {
				function _0x3492b6(_0x53ac7e) {
					_0x53ac7e = _0x3f66("0x6b") !== typeof _0x53ac7e ? !1 : _0x53ac7e;
					_0x193fbd["getCartInfoByUrl"]();
					window[_0x3f66("0x0")]["allowUpdate"] = !1;
					_0x193fbd["cartIsEmpty"]();
					_0x3f66("0xe0") !== typeof window[_0x3f66("0x82")] && _0x3f66("0x9d") === typeof window[_0x3f66("0x82")]["exec"] && window["_QuatroDigital_AmountProduct"][_0x3f66("0x2e")][_0x3f66("0xb1")](this);
					_0x3f66("0x9d") === typeof adminCart && adminCart();
					_0x19cc96["fn"][_0x3f66("0xf1")](!0, void 0, _0x53ac7e);
					_0x3f66("0x9d") === typeof _0x9536f3 && _0x9536f3(_0xe9ec37)
				}
				_0x495eb9 = _0x495eb9 || 1;
				if (1 > _0x495eb9)
					return _0xe9ec37;
				if (_0x19e65a["smartCheckout"]) {
					var _0x39cada = window[_0x3f66("0x0")][_0x3f66("0xdd")][_0x3f66("0xd3")];
					if (_0x3f66("0xe0") === typeof _0x39cada[_0x4bb95c[1]])
						return _0x4978e3(_0x3f66("0x2d") + _0x4bb95c[1] + "]"),
							_0xe9ec37;
					_0x372e3e[_0x3f66("0xd5")]([{
						id: _0x39cada[_0x4bb95c[1]]["id"],
						index: _0x4bb95c[1],
						quantity: _0x495eb9,
						seller: _0x39cada[_0x4bb95c[1]][_0x3f66("0x6e")]
					}], [_0x3f66("0xd3"), _0x3f66("0x42"), "shippingData"], !0)[_0x3f66("0x16")](function (_0xd238c1) {
						_0x193fbd[_0x3f66("0x40")](_0xd238c1);
						_0x3492b6(!0)
					})["fail"](function (_0x4bc6a7) {
						_0x4978e3([_0x3f66("0x9f"), _0x4bc6a7]);
						_0x3492b6()
					})
				} else
					_0x4978e3(_0x3f66("0x8e"))
			}
				;
			_0x193fbd["removeProduct"] = function (_0x36cd0a, _0x1b41b3) {
				function _0x1a0dfc(_0x323a39) {
					_0x323a39 = _0x3f66("0x6b") !== typeof _0x323a39 ? !1 : _0x323a39;
					_0x3f66("0xe0") !== typeof window[_0x3f66("0x82")] && _0x3f66("0x9d") === typeof window[_0x3f66("0x82")]["exec"] && window[_0x3f66("0x82")][_0x3f66("0x2e")][_0x3f66("0xb1")](this);
					_0x3f66("0x9d") === typeof adminCart && adminCart();
					_0x19cc96["fn"][_0x3f66("0xf1")](!0, void 0, _0x323a39);
					_0x3f66("0x9d") === typeof _0x1b41b3 && _0x1b41b3(_0x1aad01)
				}
				var _0x1aad01 = !1
					, _0x1268e6 = _0x19cc96(_0x36cd0a)["attr"](_0x3f66("0xe8"))
					, _0x38eeed = window["_QuatroDigital_DropDown"][_0x3f66("0xdd")][_0x3f66("0xd3")];
				_0x19e65a[_0x3f66("0x25")] || alert(_0x3f66("0x52"));
				if (_0x3f66("0xe0") === typeof _0x38eeed[_0x1268e6])
					return _0x4978e3(_0x3f66("0x2d") + _0x1268e6 + "]"),
						_0x1aad01;
				_0x372e3e[_0x3f66("0xb7")]([{
					index: _0x1268e6,
					quantity: 0
				}])["done"](function (_0x36cff9) {
					_0x1aad01 = !0;
					_0x193fbd[_0x3f66("0x40")](_0x36cff9);
					_0x4baa29(_0x36cff9);
					_0x1a0dfc(!0)
				})[_0x3f66("0x1e")](function (_0x3ef875) {
					_0x4978e3(["NÃ£o foi possÃ­vel remover o item do carrinho", _0x3ef875]);
					_0x1a0dfc()
				})
			}
				;
			_0x193fbd[_0x3f66("0xa1")] = function (_0x3b14af, _0x55e758, _0x3f5cd3, _0x28517e) {
				_0x28517e = _0x28517e || _0x19cc96(_0x3f66("0x5c"));
				_0x3b14af = _0x3b14af || "+";
				_0x55e758 = _0x55e758 || .9 * _0x28517e[_0x3f66("0xa")]();
				_0x28517e[_0x3f66("0x2f")](!0, !0)["animate"]({
					scrollTop: isNaN(_0x3f5cd3) ? _0x3b14af + "=" + _0x55e758 + "px" : _0x3f5cd3
				})
			}
				;
			_0x193fbd[_0x3f66("0x40")] = function (_0x332630) {
				window[_0x3f66("0x0")][_0x3f66("0xdd")] = _0x332630;
				_0x3f66("0xe0") != typeof _0x332630 && _0x19e65a[_0x3f66("0x64")] && _0x193fbd[_0x3f66("0xd6")](_0x332630[_0x3f66("0xae")] || [])
			}
				;
			_0x193fbd[_0x3f66("0xd6")] = function (_0x566b62) {
				_0x566b62["length"] && (_0x566b62 = _0x19e65a[_0x3f66("0xa6")][_0x3f66("0x2c")][_0x3f66("0x19")](_0x3f66("0x58"), _0x566b62[0][_0x3f66("0xc8")]),
					_0x152d35[_0x3f66("0x85")](_0x3f66("0x12"))[_0x3f66("0x8")] ? _0x152d35[_0x3f66("0x85")](_0x3f66("0x12"))["html"](_0x566b62) : _0x152d35[_0x3f66("0xe4")](_0x19cc96(_0x3f66("0xd2") + _0x566b62 + _0x3f66("0x5f"))),
					_0x152d35[_0x3f66("0x85")](_0x3f66("0xb9"))["on"](_0x3f66("0x36"), function () {
						_0x152d35["find"](".qd-ddc-notification")[_0x3f66("0x6a")]();
						_0x19e65a[_0x3f66("0x53")] && _0x3f66("0x9d") == typeof vtexjs[_0x3f66("0x68")]["clearMessages"] && vtexjs["checkout"][_0x3f66("0x32")]()
					}))
			}
				;
			_0x19e65a["updateOnlyHover"] || (_0x193fbd["getCartInfoByUrl"](),
				_0x19cc96["fn"]["simpleCart"](!0));
			_0x19cc96(window)["on"](_0x3f66("0x10"), function () {
				try {
					_0x193fbd[_0x3f66("0x40")](void 0),
						_0x193fbd["getCartInfoByUrl"]()
				} catch (_0x33f516) {
					_0x4978e3(_0x3f66("0xa2") + _0x33f516[_0x3f66("0x83")], _0x3f66("0xf9"))
				}
			});
			_0x3f66("0x9d") === typeof _0x19e65a[_0x3f66("0x22")] ? _0x19e65a["callback"][_0x3f66("0xb1")](this) : _0x4978e3(_0x3f66("0x39"))
		}
			;
		_0x19cc96["fn"]["QD_dropDownCart"] = function (_0x37ebea) {
			var _0x5c34cd = _0x19cc96(this);
			_0x5c34cd["fn"] = new _0x19cc96["QD_dropDownCart"](this, _0x37ebea);
			return _0x5c34cd
		}
	} catch (_0x2245a1) {
		"undefined" !== typeof console && "function" === typeof console[_0x3f66("0xf3")] && console[_0x3f66("0xf3")](_0x3f66("0xcd"), _0x2245a1)
	}
}
)(this);
(function (_0x1a09af) {
	try {
		var _0xa405ba = jQuery;
		window[_0x3f66("0x82")] = window["_QuatroDigital_AmountProduct"] || {};
		window[_0x3f66("0x82")][_0x3f66("0xd3")] = {};
		window["_QuatroDigital_AmountProduct"]["allowRecalculate"] = !1;
		window[_0x3f66("0x82")]["buyButtonClicked"] = !1;
		window[_0x3f66("0x82")]["quickViewUpdate"] = !1;
		var _0x3d73dd = function () {
			if (window[_0x3f66("0x82")]["allowRecalculate"]) {
				var _0x3f5d88 = !1;
				var _0x483daa = {};
				window["_QuatroDigital_AmountProduct"]["items"] = {};
				for (_0x55be91 in window["_QuatroDigital_DropDown"]["getOrderForm"][_0x3f66("0xd3")])
					if (_0x3f66("0x6") === typeof window[_0x3f66("0x0")]["getOrderForm"][_0x3f66("0xd3")][_0x55be91]) {
						var _0x5506c8 = window[_0x3f66("0x0")][_0x3f66("0xdd")][_0x3f66("0xd3")][_0x55be91];
						_0x3f66("0xe0") !== typeof _0x5506c8[_0x3f66("0xc9")] && null !== _0x5506c8[_0x3f66("0xc9")] && "" !== _0x5506c8[_0x3f66("0xc9")] && (window[_0x3f66("0x82")]["items"][_0x3f66("0xf2") + _0x5506c8[_0x3f66("0xc9")]] = window["_QuatroDigital_AmountProduct"][_0x3f66("0xd3")][_0x3f66("0xf2") + _0x5506c8[_0x3f66("0xc9")]] || {},
							window["_QuatroDigital_AmountProduct"][_0x3f66("0xd3")]["prod_" + _0x5506c8[_0x3f66("0xc9")]][_0x3f66("0xfb")] = _0x5506c8[_0x3f66("0xc9")],
							_0x483daa[_0x3f66("0xf2") + _0x5506c8[_0x3f66("0xc9")]] || (window[_0x3f66("0x82")]["items"][_0x3f66("0xf2") + _0x5506c8[_0x3f66("0xc9")]][_0x3f66("0xb0")] = 0),
							window[_0x3f66("0x82")][_0x3f66("0xd3")][_0x3f66("0xf2") + _0x5506c8[_0x3f66("0xc9")]][_0x3f66("0xb0")] += _0x5506c8[_0x3f66("0xf6")],
							_0x3f5d88 = !0,
							_0x483daa["prod_" + _0x5506c8[_0x3f66("0xc9")]] = !0)
					}
				var _0x55be91 = _0x3f5d88
			} else
				_0x55be91 = void 0;
			window["_QuatroDigital_AmountProduct"][_0x3f66("0x59")] && (_0xa405ba(_0x3f66("0xe6"))[_0x3f66("0x6a")](),
				_0xa405ba(_0x3f66("0xfc"))[_0x3f66("0x8f")](_0x3f66("0xb6")));
			for (var _0x3714c0 in window[_0x3f66("0x82")][_0x3f66("0xd3")]) {
				_0x5506c8 = window[_0x3f66("0x82")][_0x3f66("0xd3")][_0x3714c0];
				if (_0x3f66("0x6") !== typeof _0x5506c8)
					return;
				_0x483daa = _0xa405ba(_0x3f66("0x9") + _0x5506c8[_0x3f66("0xfb")] + "]")[_0x3f66("0x7d")]("li");
				if (window[_0x3f66("0x82")]["allowRecalculate"] || !_0x483daa["find"](".qd-bap-wrapper")[_0x3f66("0x8")])
					_0x3f5d88 = _0xa405ba(_0x3f66("0x93")),
						_0x3f5d88[_0x3f66("0x85")](_0x3f66("0xab"))[_0x3f66("0xa8")](_0x5506c8["qtt"]),
						_0x5506c8 = _0x483daa[_0x3f66("0x85")](_0x3f66("0x1b")),
						_0x5506c8[_0x3f66("0x8")] ? _0x5506c8["prepend"](_0x3f5d88)["addClass"]("qd-bap-item-added") : _0x483daa["prepend"](_0x3f5d88)
			}
			_0x55be91 && (window["_QuatroDigital_AmountProduct"][_0x3f66("0x59")] = !1)
		};
		window["_QuatroDigital_AmountProduct"][_0x3f66("0x2e")] = function () {
			window[_0x3f66("0x82")][_0x3f66("0x59")] = !0;
			_0x3d73dd[_0x3f66("0xb1")](this)
		}
			;
		_0xa405ba(document)["ajaxStop"](function () {
			_0x3d73dd[_0x3f66("0xb1")](this)
		})
	} catch (_0x1ab55c) {
		_0x3f66("0xe0") !== typeof console && _0x3f66("0x9d") === typeof console[_0x3f66("0xf3")] && console["error"](_0x3f66("0xcd"), _0x1ab55c)
	}
}
)(this);
(function () {
	try {
		var _0x53e613 = jQuery, _0x2be4ba, _0x195150 = {
			selector: _0x3f66("0xfa"),
			dropDown: {},
			buyButton: {}
		};
		_0x53e613[_0x3f66("0x5b")] = function (_0x202a6c) {
			var _0x53c8f1 = {};
			_0x2be4ba = _0x53e613[_0x3f66("0xd1")](!0, {}, _0x195150, _0x202a6c);
			_0x202a6c = _0x53e613(_0x2be4ba["selector"])[_0x3f66("0x4f")](_0x2be4ba[_0x3f66("0x46")]);
			_0x53c8f1[_0x3f66("0x20")] = _0x3f66("0xe0") !== typeof _0x2be4ba[_0x3f66("0x46")]["updateOnlyHover"] && !1 === _0x2be4ba["dropDown"][_0x3f66("0x24")] ? _0x53e613(_0x2be4ba[_0x3f66("0x89")])[_0x3f66("0x51")](_0x202a6c["fn"], _0x2be4ba["buyButton"]) : _0x53e613(_0x2be4ba[_0x3f66("0x89")])["QD_buyButton"](_0x2be4ba[_0x3f66("0x20")]);
			_0x53c8f1[_0x3f66("0x46")] = _0x202a6c;
			return _0x53c8f1
		}
			;
		_0x53e613["fn"]["smartCart"] = function () {
			_0x3f66("0x6") === typeof console && _0x3f66("0x9d") === typeof console[_0x3f66("0xde")] && console["info"](_0x3f66("0x63"))
		}
			;
		_0x53e613["smartCart"] = _0x53e613["fn"][_0x3f66("0xe")]
	} catch (_0x4c14db) {
		"undefined" !== typeof console && "function" === typeof console[_0x3f66("0xf3")] && console["error"](_0x3f66("0xcd"), _0x4c14db)
	}
}
)();
if ("function" !== typeof String.prototype.trim)
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, "")
	}
		;
(function () {
	var d = jQuery;
	if ("function" !== typeof d.fn.QD_news) {
		var w = {
			defaultName: "Digite seu nome...",
			defaultEmail: "Digite seu e-mail...",
			nameField: ".qd_news_name",
			checkNameFieldIsVisible: !0,
			emailField: ".qd_news_email",
			btn: ".qd_news_button",
			originField: ".qd_news_origin",
			elementError: ".nv2_messageError",
			elementSuccess: ".nv2_messageSuccess",
			validationMethod: "popup",
			getAttr: "alt",
			setDefaultName: !0,
			checkNameExist: !0,
			validateName: !0,
			showInPopup: !0,
			animation: "blink",
			animateSpeed: 100,
			animateDistance: 15,
			animateRepeat: 3,
			animateFieldSuccess: ".qd_news_animate_field_success",
			timeHideSuccessMsg: 3e3,
			platform: "vtexcrm",
			vtexStore: jsnomeLoja,
			entity: "NL",
			allowSubmit: function () {
				return !0
			},
			successCallback: function () { },
			submitCallback: function (d, g) { }
		};
		d.fn.QD_news = function (t) {
			var g = function (a, d) {
				if ("object" === typeof console && "function" === typeof console.error && "function" === typeof console.info && "function" === typeof console.warn) {
					var e;
					"object" === typeof a ? (a.unshift("[QD News]\n"),
						e = a) : e = ["[QD News]\n" + a];
					if ("undefined" === typeof d || "alerta" !== d.toLowerCase() && "aviso" !== d.toLowerCase())
						if ("undefined" !== typeof d && "info" === d.toLowerCase())
							try {
								console.info.apply(console, e)
							} catch (c) {
								console.info(e.join("\n"))
							}
						else
							try {
								console.error.apply(console, e)
							} catch (c) {
								console.error(e.join("\n"))
							}
					else
						try {
							console.warn.apply(console, e)
						} catch (c) {
							console.warn(e.join("\n"))
						}
				}
			}
				, k = d(this);
			if (!k.length)
				return k;
			var a = d.extend({}, w, t);
			a.showInPopup || (a.validationMethod = "div");
			null !== a.animation ? a.validationMethod = "animateField" : "animateField" == a.validationMethod && (a.animation = "leftRight");
			if ("popup" == a.validationMethod && "function" !== typeof d.fn.vtexPopUp2)
				return g("O popUp2 nÃ£o foi encontrado. Adicione o Plugin de PopUp2."),
					k;
			var v = function (d) {
				var g = 0;
				var e = function () {
					d.animate({
						left: "-=" + a.animateDistance
					}, a.animateSpeed, function () {
						d.animate({
							left: "+=" + a.animateDistance
						}, a.animateSpeed, function () {
							g < a.animateRepeat && e();
							g++
						})
					})
				};
				var c = function () {
					d.fadeTo(a.animateSpeed, .2, function () {
						d.fadeTo(a.animateSpeed, 1, function () {
							g < a.animateRepeat && c();
							g++
						})
					})
				};
				d.stop(!0, !0);
				"leftRight" == a.animation ? e() : "blink" == a.animation && c()
			};
			k.each(function () {
				function k(b, q) {
					l.attr("disabled", "disabled");
					var f = {
						postData: {
							newsletterClientEmail: b,
							newsletterClientName: a.defaultName == q ? "-" : q,
							newsInternalCampaign: "newsletter:opt-in",
							newsInternalPage: (document.location.pathname || "/").replace(/\//g, "_"),
							newsInternalPart: "newsletter"
						},
						button: l,
						wrapper: c
					};
					"linx" == a.platform && (f.postData.nome = f.postData.newsletterClientName,
						f.postData.email = f.postData.newsletterClientEmail);
					"vtexcrm" == a.platform ? t(function (x) {
						e(f, d.ajax({
							url: "/api/dataentities/" + a.entity + "/documents",
							type: "PATCH",
							dataType: "json",
							headers: {
								Accept: "application/vnd.vtex.ds.v10+json",
								"Content-Type": "application/json; charset=utf-8"
							},
							data: JSON.stringify({
								id: b.toLowerCase().replace(/[^a-z0-9]/gi, function (a) {
									return "-" + a.charCodeAt(0) + "-"
								}),
								ip: x,
								origin: c.find(a.originField).val() || "---",
								qd_email: b,
								qd_name: q,
								URI: location.href
							})
						}))
					}) : e(f, d.ajax({
						url: "linx" == a.platform ? "/newsletter.aspx" : "/no-cache/Newsletter.aspx",
						type: "linx" == a.platform ? "GET" : "POST",
						data: f.postData
					}));
					a.submitCallback(b, q)
				}
				function t(a) {
					d.ajax({
						url: "//api.ipify.org?format=jsonp",
						dataType: "jsonp",
						success: function (b) {
							a(b.ip)
						},
						error: function () {
							d.ajax({
								url: "//freegeoip.net/json/",
								dataType: "json",
								success: function (b) {
									a(b.ip)
								},
								error: function (b) {
									a(null)
								}
							})
						}
					})
				}
				function e(b, e) {
					e.fail(function () {
						alert("Desculpe. NÃ£o foi possÃ­vel cadastrar seu e-mail, por favor tente novamente.")
					});
					e.done(function (e) {
						l.removeAttr("disabled");
						if ("linx" == a.platform && !(-1 < e.indexOf(" com sucesso.") || -1 < e.indexOf(" cadastrado.")))
							return alert(e);
						"popup" == a.validationMethod ? r.vtexPopUp2({
							popupType: "newsletter",
							popupClass: "popupNewsletterSuccess"
						}) : "animateField" != a.validationMethod && r.slideDown().bind("click", function () {
							d(this).slideUp()
						});
						var f = c.find(a.emailField);
						a.setDefaultName && c.find(a.nameField).is("input:text, textarea") && c.find(a.nameField).val(a.defaultName);
						if ("animateField" == a.validationMethod) {
							f.val(c.find(a.animateFieldSuccess).val() || "Obrigado!!!");
							f.addClass("vtexNewsSuccess");
							var g = setTimeout(function () {
								f.removeClass("vtexNewsSuccess");
								f.val(a.defaultEmail);
								f.unbind("focus.vtexNews")
							}, a.timeHideSuccessMsg);
							f.bind("focus.vtexNews", function () {
								f.removeClass("vtexNewsSuccess");
								clearTimeout(g);
								d(this).val("");
								d(this).unbind("focus.vtexNews")
							})
						} else
							f.val(a.defaultEmail);
						a.successCallback(b);
						d(c).trigger("qdNewsSuccessCallback", b)
					})
				}
				var c = d(this)
					, m = c.find(a.nameField)
					, h = c.find(a.emailField)
					, l = c.find(a.btn);
				if ("animateField" != a.validationMethod) {
					var n = c.find(a.elementError);
					var r = c.find(a.elementSuccess)
				}
				1 > m.length && a.checkNameExist && g("Campo de nome, nÃ£o encontrado (" + m.selector + "). SerÃ¡ atribuido um valor padrÃ£o.", "info");
				if (1 > h.length)
					return g("Campo de e-mail, nÃ£o encontrado (" + h.selector + ")"),
						c;
				if (1 > l.length)
					return g("BotÃ£o de envio, nÃ£o encontrado (" + l.selector + ")"),
						c;
				if ("animateField" != a.validationMethod && (1 > r.length || 1 > n.length))
					return g("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n (" + r.selector + ", " + n.selector + ")"),
						c;
				a.setDefaultName && m.is("input[type=text], textarea") && m.val(a.defaultName);
				h.val(a.defaultEmail);
				(function () {
					if (a.checkNameExist) {
						if (a.checkNameFieldIsVisible) {
							var b = m.filter(":visible");
							if (!b.length)
								return
						} else
							b = m;
						var c = b.val();
						b.is("input:text, textarea") && b.bind({
							focus: function () {
								b.val() != c || 0 !== b.val().search(a.defaultName.substr(0, 6)) && !a.setDefaultName || b.val("")
							},
							blur: function () {
								"" === b.val() && b.val(c)
							}
						})
					}
				}
				)();
				(function () {
					var b = h.val();
					h.bind({
						focus: function () {
							h.val() == b && 0 === h.val().search(a.defaultEmail.substr(0, 6)) && h.val("")
						},
						blur: function () {
							"" === h.val() && h.val(b)
						}
					})
				}
				)();
				var u = function () {
					var b;
					var e = (b = c.find(a.nameField).filter("input[type=text],select,textarea").val()) ? b : c.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length ? c.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val() || "" : (b = c.find(a.nameField).attr(a.getAttr)) ? b : (b = c.find(a.nameField).text()) ? b : (b = c.find(a.nameField).find(".box-banner img:first").attr("alt")) ? b : "Nome_Padrao";
					b = (c.find(a.emailField).val() || "").trim();
					var f = c.find(a.nameField).is(":visible");
					f = a.validateName ? (1 > e.length || 0 === e.search(a.defaultName.substr(0, 6))) && (a.checkNameExist || f ? f : !0) : !1;
					var h = 0 > b.search(/^[a-z0-9_\-\.\+]+@[a-z0-9_\-]+(\.[a-z0-9_\-]{2,})+$/i);
					f || h ? "animateField" == a.validationMethod ? (f && v(c.find(a.nameField)),
						h && v(c.find(a.emailField))) : "popup" == a.validationMethod ? n.vtexPopUp2({
							popupType: "newsletter",
							popupClass: "popupNewsletterError"
						}) : (n.slideDown().bind("click", function () {
							d(this).slideUp()
						}),
							setTimeout(function () {
								n.slideUp()
							}, 1800)) : a.allowSubmit() ? k(b, e) : g("Os dados nÃ£o foram enviados pois o parametro 'allowSubmit' nÃ£o retornou 'true'", "info")
				};
				var p = function (a) {
					13 == (a.keyCode ? a.keyCode : a.which) && (a.preventDefault(),
						u())
				};
				m.filter("input:text, textarea").bind("keydown", p);
				h.bind("keydown", p);
				p = l.getParent("form");
				p.length ? p.submit(function (a) {
					a.preventDefault();
					u()
				}) : l.bind("click.qd_news", function () {
					u()
				})
			});
			return k
		}
			;
		d(function () {
			d(".qd_news_auto").QD_news()
		})
	}
}
)();
!function (a) {
	"use strict";
	"function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports && "function" == typeof require ? require("jquery") : jQuery)
}(function (a) {
	"use strict";
	function b(c, d) {
		var e = this;
		e.element = c,
			e.el = a(c),
			e.suggestions = [],
			e.badQueries = [],
			e.selectedIndex = -1,
			e.currentValue = e.element.value,
			e.timeoutId = null,
			e.cachedResponse = {},
			e.onChangeTimeout = null,
			e.onChange = null,
			e.isLocal = !1,
			e.suggestionsContainer = null,
			e.noSuggestionsContainer = null,
			e.options = a.extend(!0, {}, b.defaults, d),
			e.classes = {
				selected: "autocomplete-selected",
				suggestion: "autocomplete-suggestion"
			},
			e.hint = null,
			e.hintValue = "",
			e.selection = null,
			e.initialize(),
			e.setOptions(d)
	}
	function c(a, b, c) {
		return a.value.toLowerCase().indexOf(c) !== -1
	}
	function d(b) {
		return "string" == typeof b ? a.parseJSON(b) : b
	}
	function e(a, b) {
		if (!b)
			return a.value;
		var c = "(" + g.escapeRegExChars(b) + ")";
		return a.value.replace(new RegExp(c, "gi"), "<strong>$1</strong>").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/&lt;(\/?strong)&gt;/g, "<$1>")
	}
	function f(a, b) {
		return '<div class="autocomplete-group">' + b + "</div>"
	}
	var g = function () {
		return {
			escapeRegExChars: function (a) {
				return a.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
			},
			createNode: function (a) {
				var b = document.createElement("div");
				return b.className = a,
					b.style.position = "absolute",
					b.style.display = "none",
					b
			}
		}
	}()
		, h = {
			ESC: 27,
			TAB: 9,
			RETURN: 13,
			LEFT: 37,
			UP: 38,
			RIGHT: 39,
			DOWN: 40
		}
		, i = a.noop;
	b.utils = g,
		a.Autocomplete = b,
		b.defaults = {
			ajaxSettings: {},
			autoSelectFirst: !1,
			appendTo: "body",
			serviceUrl: null,
			lookup: null,
			onSelect: null,
			width: "auto",
			minChars: 1,
			maxHeight: 300,
			deferRequestBy: 0,
			params: {},
			formatResult: e,
			formatGroup: f,
			delimiter: null,
			zIndex: 9999,
			type: "GET",
			noCache: !1,
			onSearchStart: i,
			onSearchComplete: i,
			onSearchError: i,
			preserveInput: !1,
			containerClass: "autocomplete-suggestions",
			tabDisabled: !1,
			dataType: "text",
			currentRequest: null,
			triggerSelectOnValidInput: !0,
			preventBadQueries: !0,
			lookupFilter: c,
			paramName: "query",
			transformResult: d,
			showNoSuggestionNotice: !1,
			noSuggestionNotice: "No results",
			orientation: "bottom",
			forceFixPosition: !1
		},
		b.prototype = {
			initialize: function () {
				var c, d = this, e = "." + d.classes.suggestion, f = d.classes.selected, g = d.options;
				d.element.setAttribute("autocomplete", "off"),
					d.noSuggestionsContainer = a('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0),
					d.suggestionsContainer = b.utils.createNode(g.containerClass),
					c = a(d.suggestionsContainer),
					c.appendTo(g.appendTo || "body"),
					"auto" !== g.width && c.css("width", g.width),
					c.on("mouseover.autocomplete", e, function () {
						d.activate(a(this).data("index"))
					}),
					c.on("mouseout.autocomplete", function () {
						d.selectedIndex = -1,
							c.children("." + f).removeClass(f)
					}),
					c.on("click.autocomplete", e, function () {
						d.select(a(this).data("index"))
					}),
					c.on("click.autocomplete", function () {
						clearTimeout(d.blurTimeoutId)
					}),
					d.fixPositionCapture = function () {
						d.visible && d.fixPosition()
					}
					,
					a(window).on("resize.autocomplete", d.fixPositionCapture),
					d.el.on("keydown.autocomplete", function (a) {
						d.onKeyPress(a)
					}),
					d.el.on("keyup.autocomplete", function (a) {
						d.onKeyUp(a)
					}),
					d.el.on("blur.autocomplete", function () {
						d.onBlur()
					}),
					d.el.on("focus.autocomplete", function () {
						d.onFocus()
					}),
					d.el.on("change.autocomplete", function (a) {
						d.onKeyUp(a)
					}),
					d.el.on("input.autocomplete", function (a) {
						d.onKeyUp(a)
					})
			},
			onFocus: function () {
				var a = this;
				a.fixPosition(),
					a.el.val().length >= a.options.minChars && a.onValueChange()
			},
			onBlur: function () {
				var a = this;
				a.blurTimeoutId = setTimeout(function () {
					a.hide()
				}, 200)
			},
			abortAjax: function () {
				var a = this;
				a.currentRequest && (a.currentRequest.abort(),
					a.currentRequest = null)
			},
			setOptions: function (b) {
				var c = this
					, d = a.extend({}, c.options, b);
				c.isLocal = Array.isArray(d.lookup),
					c.isLocal && (d.lookup = c.verifySuggestionsFormat(d.lookup)),
					d.orientation = c.validateOrientation(d.orientation, "bottom"),
					a(c.suggestionsContainer).css({
						"max-height": d.maxHeight + "px",
						width: d.width + "px",
						"z-index": d.zIndex
					}),
					this.options = d
			},
			clearCache: function () {
				this.cachedResponse = {},
					this.badQueries = []
			},
			clear: function () {
				this.clearCache(),
					this.currentValue = "",
					this.suggestions = []
			},
			disable: function () {
				var a = this;
				a.disabled = !0,
					clearTimeout(a.onChangeTimeout),
					a.abortAjax()
			},
			enable: function () {
				this.disabled = !1
			},
			fixPosition: function () {
				var b = this
					, c = a(b.suggestionsContainer)
					, d = c.parent().get(0);
				if (d === document.body || b.options.forceFixPosition) {
					var e = b.options.orientation
						, f = c.outerHeight()
						, g = b.el.outerHeight()
						, h = b.el.offset()
						, i = {
							top: h.top,
							left: h.left
						};
					if ("auto" === e) {
						var j = a(window).height()
							, k = a(window).scrollTop()
							, l = -k + h.top - f
							, m = k + j - (h.top + g + f);
						e = Math.max(l, m) === l ? "top" : "bottom"
					}
					if ("top" === e ? i.top += -f : i.top += g, d !== document.body) {
						var n, o = c.css("opacity");
						b.visible || c.css("opacity", 0).show(),
							n = c.offsetParent().offset(),
							i.top -= n.top,
							i.top += d ? d.scrollTop : 0,
							i.left -= n.left,
							b.visible || c.css("opacity", o).hide()
					}
					"auto" === b.options.width && (i.width = b.el.outerWidth() + "px"),
						c.css(i)
				}
			},
			isCursorAtEnd: function () {
				var a, b = this, c = b.el.val().length, d = b.element.selectionStart;
				return "number" == typeof d ? d === c : !document.selection || (a = document.selection.createRange(),
					a.moveStart("character", -c),
					c === a.text.length)
			},
			onKeyPress: function (a) {
				var b = this;
				if (!b.disabled && !b.visible && a.which === h.DOWN && b.currentValue)
					return void b.suggest();
				if (!b.disabled && b.visible) {
					switch (a.which) {
						case h.ESC:
							b.el.val(b.currentValue),
								b.hide();
							break;
						case h.RIGHT:
							if (b.hint && b.options.onHint && b.isCursorAtEnd()) {
								b.selectHint();
								break
							}
							return;
						case h.TAB:
							if (b.hint && b.options.onHint)
								return void b.selectHint();
							if (b.selectedIndex === -1)
								return void b.hide();
							if (b.select(b.selectedIndex),
								b.options.tabDisabled === !1)
								return;
							break;
						case h.RETURN:
							if (b.selectedIndex === -1)
								return void b.hide();
							b.select(b.selectedIndex);
							break;
						case h.UP:
							b.moveUp();
							break;
						case h.DOWN:
							b.moveDown();
							break;
						default:
							return
					}
					a.stopImmediatePropagation(),
						a.preventDefault()
				}
			},
			onKeyUp: function (a) {
				var b = this;
				if (!b.disabled) {
					switch (a.which) {
						case h.UP:
						case h.DOWN:
							return
					}
					clearTimeout(b.onChangeTimeout),
						b.currentValue !== b.el.val() && (b.findBestHint(),
							b.options.deferRequestBy > 0 ? b.onChangeTimeout = setTimeout(function () {
								b.onValueChange()
							}, b.options.deferRequestBy) : b.onValueChange())
				}
			},
			onValueChange: function () {
				if (this.ignoreValueChange)
					return void (this.ignoreValueChange = !1);
				var b = this
					, c = b.options
					, d = b.el.val()
					, e = b.getQuery(d);
				return b.selection && b.currentValue !== e && (b.selection = null,
					(c.onInvalidateSelection || a.noop).call(b.element)),
					clearTimeout(b.onChangeTimeout),
					b.currentValue = d,
					b.selectedIndex = -1,
					c.triggerSelectOnValidInput && b.isExactMatch(e) ? void b.select(0) : void (e.length < c.minChars ? b.hide() : b.getSuggestions(e))
			},
			isExactMatch: function (a) {
				var b = this.suggestions;
				return 1 === b.length && b[0].value.toLowerCase() === a.toLowerCase()
			},
			getQuery: function (b) {
				var c, d = this.options.delimiter;
				return d ? (c = b.split(d),
					a.trim(c[c.length - 1])) : b
			},
			getSuggestionsLocal: function (b) {
				var c, d = this, e = d.options, f = b.toLowerCase(), g = e.lookupFilter, h = parseInt(e.lookupLimit, 10);
				return c = {
					suggestions: a.grep(e.lookup, function (a) {
						return g(a, b, f)
					})
				},
					h && c.suggestions.length > h && (c.suggestions = c.suggestions.slice(0, h)),
					c
			},
			getSuggestions: function (b) {
				var c, d, e, f, g = this, h = g.options, i = h.serviceUrl;
				if (h.params[h.paramName] = b,
					h.onSearchStart.call(g.element, h.params) !== !1) {
					if (d = h.ignoreParams ? null : h.params,
						a.isFunction(h.lookup))
						return void h.lookup(b, function (a) {
							g.suggestions = a.suggestions,
								g.suggest(),
								h.onSearchComplete.call(g.element, b, a.suggestions)
						});
					g.isLocal ? c = g.getSuggestionsLocal(b) : (a.isFunction(i) && (i = i.call(g.element, b)),
						e = i + "?" + a.param(d || {}),
						c = g.cachedResponse[e]),
						c && Array.isArray(c.suggestions) ? (g.suggestions = c.suggestions,
							g.suggest(),
							h.onSearchComplete.call(g.element, b, c.suggestions)) : g.isBadQuery(b) ? h.onSearchComplete.call(g.element, b, []) : (g.abortAjax(),
								f = {
									url: i,
									data: d,
									type: h.type,
									dataType: h.dataType
								},
								a.extend(f, h.ajaxSettings),
								g.currentRequest = a.ajax(f).done(function (a) {
									var c;
									g.currentRequest = null,
										c = h.transformResult(a, b),
										g.processResponse(c, b, e),
										h.onSearchComplete.call(g.element, b, c.suggestions)
								}).fail(function (a, c, d) {
									h.onSearchError.call(g.element, b, a, c, d)
								}))
				}
			},
			isBadQuery: function (a) {
				if (!this.options.preventBadQueries)
					return !1;
				for (var b = this.badQueries, c = b.length; c--;)
					if (0 === a.indexOf(b[c]))
						return !0;
				return !1
			},
			hide: function () {
				var b = this
					, c = a(b.suggestionsContainer);
				a.isFunction(b.options.onHide) && b.visible && b.options.onHide.call(b.element, c),
					b.visible = !1,
					b.selectedIndex = -1,
					clearTimeout(b.onChangeTimeout),
					a(b.suggestionsContainer).hide(),
					b.signalHint(null)
			},
			suggest: function () {
				if (!this.suggestions.length)
					return void (this.options.showNoSuggestionNotice ? this.noSuggestions() : this.hide());
				var b, c = this, d = c.options, e = d.groupBy, f = d.formatResult, g = c.getQuery(c.currentValue), h = c.classes.suggestion, i = c.classes.selected, j = a(c.suggestionsContainer), k = a(c.noSuggestionsContainer), l = d.beforeRender, m = "", n = function (a, c) {
					var f = a.data[e];
					return b === f ? "" : (b = f,
						d.formatGroup(a, b))
				};
				return d.triggerSelectOnValidInput && c.isExactMatch(g) ? void c.select(0) : (a.each(c.suggestions, function (a, b) {
					e && (m += n(b, g, a)),
						m += '<div class="' + h + '" data-index="' + a + '">' + f(b, g, a) + "</div>"
				}),
					this.adjustContainerWidth(),
					k.detach(),
					j.html(m),
					a.isFunction(l) && l.call(c.element, j, c.suggestions),
					c.fixPosition(),
					j.show(),
					d.autoSelectFirst && (c.selectedIndex = 0,
						j.scrollTop(0),
						j.children("." + h).first().addClass(i)),
					c.visible = !0,
					void c.findBestHint())
			},
			noSuggestions: function () {
				var b = this
					, c = b.options.beforeRender
					, d = a(b.suggestionsContainer)
					, e = a(b.noSuggestionsContainer);
				this.adjustContainerWidth(),
					e.detach(),
					d.empty(),
					d.append(e),
					a.isFunction(c) && c.call(b.element, d, b.suggestions),
					b.fixPosition(),
					d.show(),
					b.visible = !0
			},
			adjustContainerWidth: function () {
				var b, c = this, d = c.options, e = a(c.suggestionsContainer);
				"auto" === d.width ? (b = c.el.outerWidth(),
					e.css("width", b > 0 ? b : 300)) : "flex" === d.width && e.css("width", "")
			},
			findBestHint: function () {
				var b = this
					, c = b.el.val().toLowerCase()
					, d = null;
				c && (a.each(b.suggestions, function (a, b) {
					var e = 0 === b.value.toLowerCase().indexOf(c);
					return e && (d = b),
						!e
				}),
					b.signalHint(d))
			},
			signalHint: function (b) {
				var c = ""
					, d = this;
				b && (c = d.currentValue + b.value.substr(d.currentValue.length)),
					d.hintValue !== c && (d.hintValue = c,
						d.hint = b,
						(this.options.onHint || a.noop)(c))
			},
			verifySuggestionsFormat: function (b) {
				return b.length && "string" == typeof b[0] ? a.map(b, function (a) {
					return {
						value: a,
						data: null
					}
				}) : b
			},
			validateOrientation: function (b, c) {
				return b = a.trim(b || "").toLowerCase(),
					a.inArray(b, ["auto", "bottom", "top"]) === -1 && (b = c),
					b
			},
			processResponse: function (a, b, c) {
				var d = this
					, e = d.options;
				a.suggestions = d.verifySuggestionsFormat(a.suggestions),
					e.noCache || (d.cachedResponse[c] = a,
						e.preventBadQueries && !a.suggestions.length && d.badQueries.push(b)),
					b === d.getQuery(d.currentValue) && (d.suggestions = a.suggestions,
						d.suggest())
			},
			activate: function (b) {
				var c, d = this, e = d.classes.selected, f = a(d.suggestionsContainer), g = f.find("." + d.classes.suggestion);
				return f.find("." + e).removeClass(e),
					d.selectedIndex = b,
					d.selectedIndex !== -1 && g.length > d.selectedIndex ? (c = g.get(d.selectedIndex),
						a(c).addClass(e),
						c) : null
			},
			selectHint: function () {
				var b = this
					, c = a.inArray(b.hint, b.suggestions);
				b.select(c)
			},
			select: function (a) {
				var b = this;
				b.hide(),
					b.onSelect(a)
			},
			moveUp: function () {
				var b = this;
				if (b.selectedIndex !== -1)
					return 0 === b.selectedIndex ? (a(b.suggestionsContainer).children("." + b.classes.suggestion).first().removeClass(b.classes.selected),
						b.selectedIndex = -1,
						b.ignoreValueChange = !1,
						b.el.val(b.currentValue),
						void b.findBestHint()) : void b.adjustScroll(b.selectedIndex - 1)
			},
			moveDown: function () {
				var a = this;
				a.selectedIndex !== a.suggestions.length - 1 && a.adjustScroll(a.selectedIndex + 1)
			},
			adjustScroll: function (b) {
				var c = this
					, d = c.activate(b);
				if (d) {
					var e, f, g, h = a(d).outerHeight();
					e = d.offsetTop,
						f = a(c.suggestionsContainer).scrollTop(),
						g = f + c.options.maxHeight - h,
						e < f ? a(c.suggestionsContainer).scrollTop(e) : e > g && a(c.suggestionsContainer).scrollTop(e - c.options.maxHeight + h),
						c.options.preserveInput || (c.ignoreValueChange = !0,
							c.el.val(c.getValue(c.suggestions[b].value))),
						c.signalHint(null)
				}
			},
			onSelect: function (b) {
				var c = this
					, d = c.options.onSelect
					, e = c.suggestions[b];
				c.currentValue = c.getValue(e.value),
					c.currentValue === c.el.val() || c.options.preserveInput || c.el.val(c.currentValue),
					c.signalHint(null),
					c.suggestions = [],
					c.selection = e,
					a.isFunction(d) && d.call(c.element, e)
			},
			getValue: function (a) {
				var b, c, d = this, e = d.options.delimiter;
				return e ? (b = d.currentValue,
					c = b.split(e),
					1 === c.length ? a : b.substr(0, b.length - c[c.length - 1].length) + a) : a
			},
			dispose: function () {
				var b = this;
				b.el.off(".autocomplete").removeData("autocomplete"),
					a(window).off("resize.autocomplete", b.fixPositionCapture),
					a(b.suggestionsContainer).remove()
			}
		},
		a.fn.devbridgeAutocomplete = function (c, d) {
			var e = "autocomplete";
			return arguments.length ? this.each(function () {
				var f = a(this)
					, g = f.data(e);
				"string" == typeof c ? g && "function" == typeof g[c] && g[c](d) : (g && g.dispose && g.dispose(),
					g = new b(this, c),
					f.data(e, g))
			}) : this.first().data(e)
		}
		,
		a.fn.autocomplete || (a.fn.autocomplete = a.fn.devbridgeAutocomplete)
});
(function (h) {
	var c = jQuery;
	if ("function" !== typeof c.fn.QD_smartAutoComplete) {
		c.fn.QD_smartAutoComplete = function () { }
			;
		var f = {
			maxRows: 12,
			suggestionsStack: "",
			productNameContains: function (a) {
				return c(a).val() || ""
			},
			jqueryUI: {
				noCache: !1,
				minChars: 3,
				triggerSelectOnValidInput: !0,
				preventBadQueries: !0,
				autoSelectFirst: !1,
				maxHeight: 300,
				width: "auto",
				zIndex: 9999,
				appendTo: null,
				forceFixPosition: !0,
				orientation: "bottom",
				preserveInput: !1,
				showNoSuggestionNotice: "",
				tabDisabled: !1,
				containerClass: "ui-autocomplete ui-menu ui-widget ui-widget-content ui-corner-all",
				beforeRender: function (a, b) { },
				formatResult: function (a, b, c) {
					return '<li class="ui-menu-item" role="menuitem"><a href="' + a.data + '" class="ui-corner-all" tabindex="-1">' + a.text + "</a></li>"
				},
				formatGroup: function (a, b) { },
				lookupFilter: function (a, b, c) { },
				onSearchStart: function (a) { },
				onHint: function (a) { },
				onSearchComplete: function (a, b) { },
				transformResult: function (a, b) { },
				onSelect: function (a) { },
				onSearchError: function (a, b, c, e) { },
				onSonHideearchError: function (a) { }
			}
		}
			, g = function (a, b) {
				b.jqueryUI.lookup = function (d, e) {
					c.ajax({
						url: "/buscaautocomplete/",
						dataType: "json",
						data: {
							maxRows: b.maxRows,
							productNameContains: b.productNameContains(a),
							suggestionsStack: b.suggestionsStack
						},
						success: function (a) {
							a && (a = {
								suggestions: c.map(a.itemsReturned, function (a) {
									return {
										data: a.href,
										value: a.name,
										text: (a.thumb || "") + " " + a.name
									}
								})
							},
								e(a))
						},
						error: function (a, b, c) {
							if ("object" === typeof console && "undefined" !== typeof console.error && "undefined" !== typeof console.info && "undefined" !== typeof console.warn) {
								"object" == typeof c && "function" == typeof c.unshift ? (c.unshift("[Quatro Digital - Smart Auto Complete]\n"),
									a = c) : a = ["[Quatro Digital - Smart Auto Complete]\n", c];
								try {
									console.error.apply(console, a)
								} catch (k) {
									try {
										console.error(a.join("\n"))
									} catch (l) { }
								}
							}
						},
						done: function () {
							b.suggestionsStack = b.productNameContains(a)
						}
					})
				}
					;
				try {
					c.fn.autocomplete ? a.autocomplete("destroy").devbridgeAutocomplete(b.jqueryUI) : a.devbridgeAutocomplete(b.jqueryUI)
				} catch (d) {
					"undefined" !== typeof console && "function" === typeof console.error && console.error("Problemas :( . Detalhes: ", d)
				}
			};
		c.fn.QD_smartAutoComplete = function (a) {
			var b = c(this);
			if (!b.length)
				return b;
			b.each(function () {
				var b = c(this);
				b.QD_smartAutoComplete = new g(b, c.extend(!0, {}, f, a))
			});
			return b
		}
			;
		c(function () {
			c(".qd_auto_smart_auto_complete").QD_smartAutoComplete()
		})
	}
}
)(jQuery);
(function (d) {
	if ("function" !== typeof d.qdAjax) {
		var a = {};
		d.qdAjaxQueue = a;
		150 > parseInt((d.fn.jquery.replace(/[^0-9]+/g, "") + "000").slice(0, 3), 10) && console && "function" == typeof console.error && console.error();
		d.qdAjax = function (f) {
			try {
				var b = d.extend({}, {
					url: "",
					type: "GET",
					data: "",
					success: function () { },
					error: function () { },
					complete: function () { },
					clearQueueDelay: 5
				}, f), e;
				e = "object" === typeof b.data ? JSON.stringify(b.data) : b.data.toString();
				var c = encodeURIComponent(b.url + "|" + b.type + "|" + e);
				a[c] = a[c] || {};
				"undefined" == typeof a[c].jqXHR ? a[c].jqXHR = d.ajax(b) : (a[c].jqXHR.done(b.success),
					a[c].jqXHR.fail(b.error),
					a[c].jqXHR.always(b.complete));
				a[c].jqXHR.always(function () {
					isNaN(parseInt(b.clearQueueDelay)) || setTimeout(function () {
						a[c].jqXHR = void 0
					}, b.clearQueueDelay)
				});
				return a[c].jqXHR
			} catch (g) {
				"undefined" !== typeof console && "function" === typeof console.error && console.error("Problemas no $.qdAjax :( . Detalhes: " + g.message)
			}
		}
			;
		d.qdAjax.version = "4.0"
	}
}
)(jQuery);
(function (x) {
	var d = jQuery;
	if ("function" !== typeof d.fn.QD_smartQuantity) {
		var g = function (d, a) {
			if ("object" === typeof console && "function" === typeof console.error && "function" === typeof console.info && "function" === typeof console.warn) {
				var f;
				"object" === typeof d ? (d.unshift("[Quatro Digital - Smart Quantity]\n"),
					f = d) : f = ["[Quatro Digital - Smart Quantity]\n" + d];
				if ("undefined" === typeof a || "alerta" !== a.toLowerCase() && "aviso" !== a.toLowerCase())
					if ("undefined" !== typeof a && "info" === a.toLowerCase())
						try {
							console.info.apply(console, f)
						} catch (k) {
							console.info(f.join("\n"))
						}
					else
						try {
							console.error.apply(console, f)
						} catch (k) {
							console.error(f.join("\n"))
						}
				else
					try {
						console.warn.apply(console, f)
					} catch (k) {
						console.warn(f.join("\n"))
					}
			}
		}
			, m = {
				buyButton: ".buy-button",
				qttInput: ".qd-sq-quantity",
				btnMore: ".qd-sq-more",
				btnMinus: ".qd-sq-minus",
				initialValue: 1,
				minimumValue: 1,
				minToBuy: null,
				setQuantityByUrl: !0
			}
			, n = function (q, a) {
				function f(c, e, b) {
					a.setQuantityByUrl ? c.val(((location.search || "").match(r) || [a.initialValue]).pop()) : c.val(a.initialValue);
					c.change(function (c, b) {
						try {
							if ("qd_ssl_trigger" != b) {
								var e = d(this)
									, h = parseInt(e.val().replace(u, ""));
								var f = !isNaN(h) && h > a.minimumValue ? h : a.minimumValue;
								null != a.minToBuy && f < a.minToBuy && f != a.minimumValue && (f = a.minToBuy,
									"qd_ssl_trigger_less" == b && (f = 0));
								e.val(f);
								e.trigger("QuatroDigital.sq_change", this)
							}
						} catch (v) {
							g(v.message)
						}
					});
					c.focusin(function () {
						d(this).trigger("QuatroDigital.sq_focusin", this)
					});
					e.click(function (b) {
						b.preventDefault();
						c.val((parseInt(c.val()) || a.minimumValue) + 1).change()
					});
					b.click(function (b) {
						b.preventDefault();
						b = (parseInt(c.val()) || a.minimumValue + 1) - 1;
						null != a.minToBuy && b < a.minToBuy && (b = 0);
						c.val(b).change()
					});
					c.change()
				}
				function k(c, e, b) {
					c.on("QuatroDigital.sq_change", function () {
						(d(this).val() || 0) <= a.minimumValue ? (b.addClass("qd-sq-inactive"),
							e.removeClass("qd-sq-inactive")) : (e.addClass("qd-sq-inactive"),
								b.removeClass("qd-sq-inactive"))
					})
				}
				function m(c) {
					c.one("QuatroDigital.sq_qtt_min_change", function (c, b) {
						a.minToBuy = b;
						d(this).change()
					})
				}
				function n(c, e) {
					c.on("QuatroDigital.sq_change", function () {
						try {
							if (!(e[0].hostname || "").length)
								return g("A quantidade nÃ£o foi inserida no bt comprar pois o mesmo nÃ£o possui uma URL", "info");
							var b = e[0].search || "";
							-1 < b.toLowerCase().indexOf("qty=") ? e[0].search = b.replace(p, "qty=" + (parseInt(c.val()) || ("number" == typeof a.minimumValue ? a.minimumValue : 1)) + "&") : e[0].search = "qty=" + (parseInt(c.val()) || ("number" == typeof a.minimumValue ? a.minimumValue : 1)) + "&" + (e[0].search || "").replace(p, "");
							e.not(":first").each(function () {
								this.href = e[0].href
							});
							var d = ((e.first().attr("href") || "").match(w) || [""]).pop() + "";
							c.attr("data-sku-id", d);
							if (d.length && "object" === typeof skuJson && !c.attr("data-sku-price"))
								for (b = 0; b < skuJson.skus.length; b++)
									skuJson.skus[b].sku == d && c.attr("data-sku-price", skuJson.skus[b].bestPrice)
						} catch (l) {
							g(l.message)
						}
					})
				}
				var u = /[^0-9-]/gi
					, r = /qty=([0-9]+)/i
					, w = /sku=([0-9]+)/i
					, p = /qty=[0-9]+&?/gi;
				q.each(function () {
					try {
						var c = d(this)
							, e = c.find(a.buyButton)
							, b = c.find(a.qttInput)
							, h = c.find(a.btnMore)
							, l = c.find(a.btnMinus);
						if (!e.length && null !== a.buyButton || !b.length)
							return g("O plugin parou por aqui! NÃ£o foram encontrados o botÃ£o comprar e o campo de quantidade", "alerta");
						if (b.is(".qd-sq-on"))
							return g(["ExecuÃ§Ã£o ignorada pois este input jÃ¡ possui o plugin aplicado. Input: ", b], "info");
						b.addClass("qd-sq-on");
						k(b, h, l);
						m(b);
						null !== a.buyButton && n(b, e);
						f(b, h, l);
						d(window).on("vtex.sku.selected skuSelected.vtex", function () {
							b.change()
						})
					} catch (t) {
						g(t.message)
					}
				})
			};
		d.fn.QD_smartQuantity = function (g) {
			var a = d(this);
			a.qdPlugin = new n(a, d.extend({}, m, g));
			d(window).trigger("QuatroDigital.sq_callback");
			return a
		}
			;
		d(function () {
			d(".qd_auto_smart_quantity").QD_smartQuantity()
		})
	}
}
)(this);
var _0x8349 = ["link", '<a href="', '"></a>', "undefined", "function", "error", "Problemas :( . Detalhes: ", "/", "split", "", "replace", "pathname", ",", "pop", "match", "search", "length", "object", "push", "c", "map", "shift", "other_path", "other_search", "&", "out", "getMap", "prototype", "mergeUrl", "call", "extend", "getUrl", "map=", "join", "?", "QD_VtexUrlParse"];
(function () {
	function _0x6ac7x1(_0x6ac7x2) {
		try {
			this[_0x8349[0]] = $(_0x8349[1] + _0x6ac7x2 + _0x8349[2])[0]
		} catch (c) {
			_0x8349[3] !== typeof console && _0x8349[4] === typeof console[_0x8349[5]] && console[_0x8349[5]](_0x8349[6], c)
		}
	}
	function _0x6ac7x3(_0x6ac7x2) {
		try {
			_0x6ac7x2 = _0x6ac7x2 || this[_0x8349[0]];
			var _0x6ac7x4 = _0x6ac7x2[_0x8349[11]][_0x8349[10]](/\/\//g, _0x8349[7])[_0x8349[10]](/(^\/|\/$)/g, _0x8349[9])[_0x8349[8]](_0x8349[7])
				, _0x6ac7x5 = ((_0x6ac7x2[_0x8349[15]] || _0x8349[9])[_0x8349[14]](/map\=([^&]+)/i) || [_0x8349[9]])[_0x8349[13]]()[_0x8349[8]](_0x8349[12]);
			if (1 == _0x6ac7x5[_0x8349[16]] && 0 == _0x6ac7x5[0][_0x8349[16]]) {
				if (_0x8349[17] == typeof defaultMap) {
					_0x6ac7x5 = defaultMap
				} else {
					for (var _0x6ac7x6 = 0; _0x6ac7x6 < _0x6ac7x4[_0x8349[16]]; _0x6ac7x6++) {
						_0x6ac7x4[_0x6ac7x6][_0x8349[16]] && _0x8349[7] != _0x6ac7x4[_0x6ac7x6] && _0x6ac7x5[_0x8349[18]](defaultMap)
					}
				}
			}
			for (var _0x6ac7x6 = {
				map: {},
				other_path: _0x8349[9]
			}, _0x6ac7x7 = 0; _0x6ac7x7 < _0x6ac7x5[_0x8349[16]]; _0x6ac7x7++) {
				_0x6ac7x5[_0x6ac7x7][_0x8349[16]] && (_0x8349[19] == _0x6ac7x5[_0x6ac7x7] ? (_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]] = _0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]] || [],
					_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]][_0x8349[18]]((_0x6ac7x4 || [_0x8349[9]])[_0x8349[21]]())) : _0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]] = (_0x6ac7x4 || [_0x8349[9]])[_0x8349[21]]())
			}
			_0x6ac7x6[_0x8349[22]] = _0x6ac7x4;
			_0x6ac7x6[_0x8349[23]] = (_0x6ac7x2[_0x8349[15]] || _0x8349[9])[_0x8349[10]](/map\=([^&]+)/gi, _0x8349[9])[_0x8349[10]](/\&\&+/gi, _0x8349[24])[_0x8349[10]](/\?/g, _0x8349[9]);
			return this[_0x8349[25]] = _0x6ac7x6
		} catch (g) {
			_0x8349[3] !== typeof console && _0x8349[4] === typeof console[_0x8349[5]] && console[_0x8349[5]](_0x8349[6], g)
		}
	}
	_0x6ac7x1[_0x8349[27]][_0x8349[26]] = _0x6ac7x3;
	_0x6ac7x1[_0x8349[27]][_0x8349[28]] = function (_0x6ac7x2, _0x6ac7x4) {
		try {
			var _0x6ac7x5 = _0x6ac7x3[_0x8349[29]](this, this[_0x8349[0]])
				, _0x6ac7x6 = _0x6ac7x3[_0x8349[29]](this, $(_0x8349[1] + _0x6ac7x2 + _0x8349[2])[0]);
			_0x6ac7x5[_0x8349[22]][_0x8349[16]] || (_0x6ac7x5[_0x8349[22]] = void 0);
			_0x6ac7x5[_0x8349[23]][_0x8349[16]] || (_0x6ac7x5[_0x8349[23]] = void 0);
			var _0x6ac7x7 = $[_0x8349[30]](!0, {}, _0x6ac7x6, _0x6ac7x5);
			if (_0x8349[17] == typeof _0x6ac7x4) {
				for (_0x6ac7x6 = 0; _0x6ac7x6 < _0x6ac7x4[_0x8349[16]]; _0x6ac7x6++) {
					_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]] && (_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]] = _0x6ac7x5[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]])
				}
			}
			return this[_0x8349[25]] = _0x6ac7x7
		} catch (g) {
			_0x8349[3] !== typeof console && _0x8349[4] === typeof console[_0x8349[5]] && console[_0x8349[5]](_0x8349[6], g)
		}
	}
		;
	_0x6ac7x1[_0x8349[27]][_0x8349[31]] = function (_0x6ac7x2) {
		try {
			var _0x6ac7x4 = []
				, _0x6ac7x5 = [];
			_0x6ac7x2 = _0x6ac7x2 || {};
			for (var _0x6ac7x6 in this[_0x8349[25]][_0x8349[20]]) {
				if (!_0x6ac7x2[_0x6ac7x6]) {
					if (_0x8349[19] == _0x6ac7x6) {
						for (var _0x6ac7x7 = 0; _0x6ac7x7 < this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x8349[16]]; _0x6ac7x7++) {
							_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x6ac7x7]),
								_0x6ac7x5[_0x8349[18]](_0x6ac7x6)
						}
					} else {
						_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6]),
							_0x6ac7x5[_0x8349[18]](_0x6ac7x6)
					}
				}
			}
			var _0x6ac7x8 = _0x6ac7x5[_0x8349[16]] ? _0x8349[32] + _0x6ac7x5[_0x8349[33]](_0x8349[12]) + _0x8349[24] : _0x8349[9];
			return _0x8349[7] + _0x6ac7x4[_0x8349[33]](_0x8349[7]) + (this[_0x8349[25]][_0x8349[22]][_0x8349[16]] ? _0x8349[7] + this[_0x8349[25]][_0x8349[22]][_0x8349[33]](_0x8349[7]) : _0x8349[9]) + _0x8349[34] + (_0x6ac7x8 + this[_0x8349[25]][_0x8349[23]])[_0x8349[10]](/\&\&+/g, _0x8349[24])
		} catch (_0x6ac7x1) {
			_0x8349[3] !== typeof console && _0x8349[4] === typeof console[_0x8349[5]] && console[_0x8349[5]](_0x8349[6], _0x6ac7x1)
		}
	}
		;
	window[_0x8349[35]] = _0x6ac7x1
}
)();
"function" !== typeof String.prototype.replaceSpecialChars && (String.prototype.replaceSpecialChars = function () {
	var b = {
		"Ã§": "c",
		"Ã¦": "ae",
		"Å“": "oe",
		"Ã¡": "a",
		"Ã©": "e",
		"Ã­": "i",
		"Ã³": "o",
		"Ãº": "u",
		"Ã ": "a",
		"Ã¨": "e",
		"Ã¬": "i",
		"Ã²": "o",
		"Ã¹": "u",
		"Ã¤": "a",
		"Ã«": "e",
		"Ã¯": "i",
		"Ã¶": "o",
		"Ã¼": "u",
		"Ã¿": "y",
		"Ã¢": "a",
		"Ãª": "e",
		"Ã®": "i",
		"Ã´": "o",
		"Ã»": "u",
		"Ã¥": "a",
		"Ã£": "a",
		"Ã¸": "o",
		"Ãµ": "o",
		u: "u",
		"Ã": "A",
		"Ã‰": "E",
		"Ã": "I",
		"Ã“": "O",
		"Ãš": "U",
		"ÃŠ": "E",
		"Ã”": "O",
		"Ãœ": "U",
		"Ãƒ": "A",
		"Ã•": "O",
		"Ã€": "A",
		"Ã‡": "C"
	};
	return this.replace(/[\u00e0-\u00fa]/gi, function (a) {
		return "undefined" != typeof b[a] ? b[a] : a
	})
}
);
String.prototype.trim || (String.prototype.trim = function () {
	return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
}
);
(function (a) {
	a.fn.getParent = a.fn.closest
}
)(jQuery);
(function ($) {
	"use strict";
	if (typeof $.fn.QD_SmartResearch === "function")
		return;
	var extTitle = "Smart Research";
	var log = function (c, b) {
		if ("object" === typeof console && "undefined" !== typeof console.error && "undefined" !== typeof console.info && "undefined" !== typeof console.warn) {
			var a;
			"object" === typeof c ? (c.unshift("[" + extTitle + "]\n"),
				a = c) : a = ["[" + extTitle + "]\n" + c];
			if ("undefined" === typeof b || "alerta" !== b.toLowerCase() && "aviso" !== b.toLowerCase())
				if ("undefined" !== typeof b && "info" === b.toLowerCase())
					try {
						console.info.apply(console, a)
					} catch (d) {
						try {
							console.info(a.join("\n"))
						} catch (e) { }
					}
				else
					try {
						console.error.apply(console, a)
					} catch (f) {
						try {
							console.error(a.join("\n"))
						} catch (g) { }
					}
			else
				try {
					console.warn.apply(console, a)
				} catch (h) {
					try {
						console.warn(a.join("\n"))
					} catch (k) { }
				}
		}
	};
	window._QuatroDigital_InfinityScroll = window._QuatroDigital_InfinityScroll || {};
	var $infScroll = window._QuatroDigital_InfinityScroll;
	window._QuatroDigital_SmartResearch = window._QuatroDigital_SmartResearch || {};
	var $smartResearch = window._QuatroDigital_SmartResearch;
	var $empty = $("");
	var _document = $(document);
	var _html = $("html,body");
	var body = $("body");
	$.fn.QD_SmartResearch = function (opts) {
		"use strict";
		var $this = $(this);
		var defaults = {
			loadContent: ".prateleira[id^=ResultItems]",
			shelfClass: ".prateleira",
			filtersMenu: ".search-multiple-navigator",
			linksMenu: ".search-single-navigator",
			menuDepartament: ".navigation-tabs .menu-departamento",
			mergeMenu: true,
			insertMenuAfter: ".search-multiple-navigator h3:first",
			emptySearchElem: $('<div class="vtexsr-emptySearch"></div>'),
			elemLoading: '<div id="scrollLoading">Carregando ... </div>',
			emptySearchMsg: "<h3>Esta combinação de filtros não retornou nenhum resultado!</h3>",
			filterErrorMsg: "Houve um erro ao tentar filtrar a página!",
			usePopup: false,
			showLinks: true,
			mergeMenuList: true,
			popupAutoCloseSeconds: 3,
			isSmartCheckout: true,
			invertOrder: false,
			filterScrollTop: function (shelfOffset) {
				return shelfOffset.top - 20
			},
			callback: function () { },
			shelfCallback: function () { },
			ajaxCallback: function () { },
			emptySearchCallback: function () { },
			authorizeUpdate: function () {
				return true
			},
			labelCallback: function (data) { },
			initChangeCallback: function (event) { },
			endChangeCallback: function (event) { }
		};
		var options = $.extend({}, defaults, opts);
		var elemLoading = $(options.elemLoading);
		var currentPage = 2;
		var moreResults = true;
		var currentSearchUrl = "";
		var urlFilters = "";
		var searchUrl = "";
		var animatingFilter = false;
		var loadContentE = $(options.loadContent);
		var filtersMenuE = $(options.filtersMenu);
		var labelCallbackData = {};
		var ajaxCallbackObj = {
			requests: 0,
			filters: 0,
			isEmpty: false
		};
		$smartResearch.ajaxCallbackObj = ajaxCallbackObj;
		let filtrosExistentes = [];
		var getSearchUrl = function () {
			var url, content, preg;
			$("script:not([src])").each(function () {
				content = $(this)[0].innerHTML;
				preg = /\/buscapagina\?.+&PageNumber=/i;
				if (content.search(/\/buscapagina\?/i) > -1) {
					url = preg.exec(content);
					return false
				}
			});
			if (typeof url !== "undefined" && typeof url[0] !== "undefined")
				return url[0];
			else {
				log("NÃ£o foi possÃ­vel localizar a url de busca da pÃ¡gina.\n Tente adicionar o .js ao final da pÃ¡gina. \n[MÃ©todo: getSearchUrl]");
				return ""
			}
		};
		$infScroll.searchUrl = $infScroll.searchUrl || getSearchUrl();
		if ($this.length < 1) {
			log("Nenhuma opÃ§Ã£o de filtro encontrada", "Aviso");
			if (options.showLinks)
				$(options.linksMenu).css("visibility", "visible").show();
			if (typeof $infScroll.buttonToTop === "object" && $infScroll.buttonToTop instanceof $)
				$infScroll.buttonToTop.trigger("click");
			return $this
		}
		if (loadContentE.length < 1) {
			log("Elemento para destino da requisiÃ§Ã£o nÃ£o foi encontrado \n (" + loadContentE.selector + ")");
			return false
		}
		if (filtersMenuE.length < 1)
			log("O menu de filtros nÃ£o foi encontrado \n (" + filtersMenuE.selector + ")");
		var currentUrl = document.location.href;
		var linksMenuE = $(options.linksMenu);
		var prodOverlay = $('<div class="vtexSr-overlay"></div>');
		var departamentE = $(options.menuDepartament);
		var loadContentOffset = loadContentE.offset();
		var shelfJqxhr = null;
		var pageJqxhr = null;
		options.emptySearchElem.append(options.emptySearchMsg);
		loadContentE.before(prodOverlay);
		function exec() {
			setFilterMenu();
			fieldsetFormat();
			recuperaLocalStorage();
			$this.each(function () {
				var _this = $(this);
				var label = _this.parent();
				if (!label.is("label")) {
					label = _this.siblings("[for='" + (_this.attr("id") || (log("O input nÃ£o possui ID") || "")) + "']")
				}
				if (_this.is(":checked")) {
					urlFilters += "&" + (_this.attr("rel") || "");
					label.addClass("sr_selected");
					_this.addClass("qd_sr_selected")
				}
				adjustText(_this);
				label.append('<span class="sr_box"></span><span class="sr_box2"></span>');
				_this.bind("change.qd_sr_change", function (event) {
					if(!JSON.parse(localStorage.getItem('filtros')))
						recuperaFiltrosExistentes();
					if (options.initChangeCallback.call(this, event) === false)
						return false;
					inputAction.call(this);
					if (_this.is(":checked")) {
						addFilter(_this);
						salvaLocalStorage(_this);
					}
					else {
						removeFilter(_this);
						removeLocalStorage(_this);
					}
					ajaxCallbackObj.filters = $this.filter(":checked").length;
					options.endChangeCallback.call(this, event)
				})
			});
			if ("" !== urlFilters)
				addFilter($empty, true)
		}
		function existeNoLocalStorage(elemento) {
			let classe = recuperaClasseClicada(elemento);
			let valor = validaClasseClicada(recuperaValorClasse(elemento));
			let valores = JSON.parse(localStorage.getItem(classe));
			
			if(valores) return valores.find(element => element == valor);
			return null;
		}
		function salvaLocalStorage(elemento) {
			if(!existeNoLocalStorage(elemento)) {
				let classe = recuperaClasseClicada(elemento);
				let valor = $(elemento).closest('label').attr('class');
				validaFiltroClicado(classe);
				filtrosExistentes[classe].push(validaClasseClicada(valor));
				localStorage.setItem(classe, JSON.stringify(filtrosExistentes[classe]));
			}
		}
		function removeLocalStorage(elemento) {
			let classe = recuperaClasseClicada(elemento);
			let valor = $(elemento).closest('label').attr('class');
			filtrosExistentes[classe] = removeItemDeLista(filtrosExistentes[classe], valor);
			localStorage.setItem(classe, JSON.stringify(filtrosExistentes[classe]));
		}
		function validaFiltroClicado(filtro) {
			if(!filtrosExistentes[filtro])
				filtrosExistentes[filtro] = [];
		}
		function recuperaLocalStorage() {
			try {
				let filtros = JSON.parse(localStorage.getItem('filtros'));
				for (const [key, value] of Object.entries(filtros)) {
					let itens = JSON.parse(localStorage.getItem(value));
					if(itens) filtrosExistentes[value] = itens;
				}
			} catch (e) {
				console.log('Ainda não existem filtros selecionados' + e.message)
			}
		}
		function validaClasseClicada(classe) {
			let classes = classe.split(' ');
			return (classes.length > 1) ? classes[0] : classe;
		}
		function recuperaFiltrosExistentes() {
			try {
				const elementosPai = document.querySelectorAll('.search-qd-v1-navigator fieldset.refino');
				let filtrosLocalStorage = [];				
				for (let i=0; i<elementosPai.length; i++) {
					let nomeFiltro = nomeItemMontadora($(elementosPai[i]).attr('data-qd-class'), true);
					filtrosLocalStorage.push(nomeFiltro);
				}
				localStorage.setItem('filtros', JSON.stringify(filtrosLocalStorage));
			} catch (e) {
				console.log('Falha ao recuperar elementos HTML' + e);
			}
		}
		function recuperaClasseClicada(elemento) {
			let classe = $(elemento).closest('[data-qd-class]').data('qd-class');
			return (classe == 'compatibilidade-montadora') ? 'montadora' : classe;
		}		
		function filtraItensPartirLocalStorage() {
			recuperaLocalStorage();
			for (const [key, value] of Object.entries(filtrosExistentes)) {
				if(Object.keys(value).length > 0) {
					let nomeFiltro = nomeItemMontadora(key);
					let htmlBase = 'fieldset.refino[data-qd-class="'+nomeFiltro+'"]';
					let $el = $(htmlBase + ' > h5');
					
					$el.find("+ div").slideToggle(100, function () {
						$el.toggleClass("qd-seach-active-menu");
					});
					
					for (const [keyI, valueI] of Object.entries(value)) {
						let input = 'label.' + valueI + ' input';
						let texto = $(input).val();
						let itemFiltrado = $("<div class='block-iltered'><span class='filtered'>" + texto + "</span></div>");
						itemFiltrado.attr("data-name", texto);
						$(".search-qd-v1-navigator-research-filtered").append(itemFiltrado);
						$(input).trigger('click');
					}
				}
			}
		}
		function nomeItemMontadora(pai, remover) {
			if(remover)
				return (pai == 'compatibilidade-montadora') ? 'montadora' : pai;
			return (pai == 'montadora') ? 'compatibilidade-montadora' : pai;
		}
		function recuperaValorClasse(elemento) {
			return $(elemento).closest('label').attr('class');
		}
		function removeItemDeLista(itens, itemClicado) {
			return itens.filter(function(value) { 
				return value != itemClicado;
			});
		}
		function mergeMenuSmartCheckout() {
			if (!options.mergeMenu)
				return false;
			var elem = linksMenuE;
			elem.insertAfter(options.insertMenuAfter)
		}
		function mergeMenu() {
			if (!options.mergeMenu)
				return false;
			var elem = departamentE;
			elem.insertAfter(options.insertMenuAfter);
			departamentMenuFormat(elem)
		}
		function mergeMenuList() {
			if (!options.mergeMenuList)
				return;
			var i = 0;
			filtersMenuE.find("h3,h4").each(function () {
				var ul = linksMenuE.find("h3,h4").eq(i).next("ul");
				ul.insertAfter($(this));
				departamentMenuFormat(ul);
				i++
			})
		}
		function departamentMenuFormat(elem) {
			elem.find("a").each(function () {
				var a = $(this);
				a.text(removeCounter(a.text()))
			})
		}
		function fieldsetClass(input) {
			var fieldset = input.getParent("fieldset");
			var wrapper = fieldset.parent();
			if (fieldset.find("input:checked").length) {
				fieldset.addClass("qd-sr-filtered");
				wrapper.addClass("qd-sr-on-" + fieldset.attr("data-qd-class"))
			} else {
				fieldset.removeClass("qd-sr-filtered");
				wrapper.removeClass("qd-sr-on-" + fieldset.attr("data-qd-class"))
			}
		}
		function fieldsetFormat() {
			labelCallbackData.fieldsetCount = 0;
			labelCallbackData.tmpCurrentLabel = {};
			filtersMenuE.find("fieldset").each(function () {
				var $t = $(this);
				var label = $t.find("label");
				var _class = ($t.find("h5:first").text() || "").toLowerCase().replaceSpecialChars().replace(/\s/g, "-");
				var fieldsetClass = "filtro_" + _class;
				labelCallbackData[fieldsetClass] = {};
				if (label.length < 1) {
					$t.hide();
					return
				}
				if ($t.find("a.ver-filtros").length)
					$t.addClass("qd-sr-show-more-results");
				$t.addClass(fieldsetClass).attr("data-qd-class", _class);
				label.each(function (ndx) {
					var t = $(this);
					var v = t.find("input").val() || t.siblings("input#" + (t.attr("for") || (log("O label nÃ£o tem 'for'", "alerta") || "_"))).val() || "";
					var labelClass = "sr_" + v.toLowerCase().replaceSpecialChars().replace(/\s/g, "-");
					labelCallbackData.tmpCurrentLabel = {
						fieldsetParent: [$t, fieldsetClass],
						elem: t
					};
					labelCallbackData[fieldsetClass][ndx.toString()] = {
						className: labelClass,
						title: v
					};
					t.addClass(labelClass).attr({
						title: v,
						index: ndx
					});
					options.labelCallback(labelCallbackData)
				});
				labelCallbackData.fieldsetCount++
			})
		}
		function inputAction() {
			if (null !== pageJqxhr)
				pageJqxhr.abort();
			if (null !== shelfJqxhr)
				shelfJqxhr.abort();
			$infScroll.currentPage = 2;
			$infScroll.pages = 9999999999999;
			$infScroll.moreResults = true
		}
		function addFilter(input, startedChecked) {
			fieldsetClass(input);
			if (startedChecked)
				var filter = urlFilters;
			else
				var filter = "&" + (input.attr("rel") || "");
			prodOverlay.fadeTo(300, .6);
			$infScroll.searchUrl = $infScroll.searchUrl + filter;
			$infScroll.searchUrl = $infScroll.searchUrl.replace(/PageNumber=[0-9]*/, "PageNumber=1");
			$infScroll.currentStatus = false;
			if ((input.attr("data-sr-exec-ajax") || "") != "false")
				shelfJqxhr = $.ajax({
					url: $infScroll.searchUrl,
					success: filterAjaxSuccess,
					error: filterAjaxError
				});
			var label, labelFor;
			label = input.parent();
			if (!label.is("label")) {
				labelFor = input.attr("id") || (log("O input nÃ£o possui ID") || "");
				label = input.siblings("[for='" + labelFor + "']")
			}
			label.addClass("sr_selected");
			input.addClass("qd_sr_selected")
		}
		function removeFilter(input) {
			fieldsetClass(input);
			var url = input.attr("rel") || "";
			prodOverlay.fadeTo(300, .6);
			$infScroll.searchUrl = $infScroll.searchUrl.replace("&" + url, "");
			$infScroll.searchUrl = $infScroll.searchUrl.replace(/PageNumber=[0-9]*/, "PageNumber=1");
			$infScroll.currentStatus = false;
			if ((input.attr("data-sr-exec-ajax") || "") != "false")
				shelfJqxhr = $.ajax({
					url: $infScroll.searchUrl,
					success: filterAjaxSuccess,
					error: filterAjaxError
				});
			input.parent().removeClass("sr_selected");
			input.removeClass("qd_sr_selected")
		}
		function filterAjaxSuccess(data) {
			prodOverlay.fadeTo(300, 0, function () {
				$(this).hide()
			});
			updateContent($(data));
			ajaxCallbackObj.requests++;
			options.ajaxCallback(ajaxCallbackObj);
			_html.animate({
				scrollTop: options.filterScrollTop(loadContentOffset || {
					top: 0,
					left: 0
				})
			}, 500, function () {
				if (!animatingFilter)
					$infScroll.currentStatus = true
			})
		}
		function filterAjaxError(jqxhr, textStatus) {
			if (textStatus === "abort")
				return;
			prodOverlay.fadeTo(300, 0, function () {
				$(this).hide()
			});
			alert(options.filterErrorMsg);
			log("Houve um erro ao tentar fazer a requisiÃ§Ã£o da pÃ¡gina com filtros.");
			$infScroll.currentStatus = true
		}
		function updateContent($data) {
			animatingFilter = true;
			if (!options.authorizeUpdate(ajaxCallbackObj))
				return false;
			var shelf = $data.filter(options.shelfClass);
			var shelfPage = loadContentE.find(options.shelfClass);
			(shelfPage.length > 0 ? shelfPage : options.emptySearchElem).slideUp(600, function () {
				$(this).remove();
				if (options.usePopup)
					$(".boxPopUp2").vtexPopUp2();
				else
					options.emptySearchElem.remove();
				if (shelf.length > 0) {
					shelf.hide();
					loadContentE.append(shelf);
					options.shelfCallback();
					$(window).trigger("QuatroDigital.sr_insertedCallback");
					shelf.slideDown(600, function () {
						animatingFilter = false;
						$infScroll.currentStatus = true;
						$(window).trigger("QuatroDigital.sr_shelfCallback")
					});
					ajaxCallbackObj.isEmpty = false;
					body.removeClass("qd-sr-empty-search")
				} else {
					ajaxCallbackObj.isEmpty = true;
					if (options.usePopup)
						options.emptySearchElem.addClass("freeContent autoClose ac_" + options.popupAutoCloseSeconds).vtexPopUp2().stop(true).show();
					else {
						loadContentE.append(options.emptySearchElem);
						options.emptySearchElem.show().css("height", "auto").fadeTo(300, .2, function () {
							options.emptySearchElem.fadeTo(300, 1)
						})
					}
					options.emptySearchCallback(ajaxCallbackObj);
					body.addClass("qd-sr-empty-search")
				}
			})
		}
		function adjustText(input) {
			var label, text, labelFor, labelIsSiblings;
			label = input.parent();
			labelIsSiblings = false;
			if (!label.is("label")) {
				labelFor = input.attr("id") || "" + log("O input nÃ£o possui ID");
				label = input.siblings("[for='" + labelFor + "']");
				labelIsSiblings = true
			}
			text = label.text();
			text = removeCounter(text);
			if (labelIsSiblings)
				label.text(text);
			else
				label.text(text).prepend(input)
		}
		function removeCounter(text) {
			return text.replace(/\([0-9]+\)/gi, function (a) {
				return ""
			})
		}
		function setFilterMenu() {
			if (!filtersMenuE.length)
				return;
			if (options.invertOrder)
				linksMenuE.insertBefore(filtersMenuE);
			else {
				linksMenuE.hide();
				filtersMenuE.show()
			}
		}
		if (!options.isSmartCheckout) {
			if (body.hasClass("departamento"))
				mergeMenu();
			else if (body.hasClass("categoria") || body.hasClass("resultado-busca"))
				mergeMenuList()
		} else {
			mergeMenuSmartCheckout()
		}
		exec();
		options.callback();
		filtersMenuE.css("visibility", "visible");
		filtraItensPartirLocalStorage();
	}
}
)(jQuery);
