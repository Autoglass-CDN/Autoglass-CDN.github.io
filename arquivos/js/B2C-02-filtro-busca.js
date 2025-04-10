$(function () {
  $.QD_scrollToggle("570, 770"),
    [
      "veiculo",
      "ano",
      "marca",
      "compatibilidade-modelo",
      "compatibilidade-montadora",
      "posicao-da-peca",
      "cor",
      "faixa",
    ].forEach(function (e) {
      $(`fieldset[data-qd-class="${e}"] > div`).prepend(`<div class="filtro">
		  <input
			class="filtro-busca"
			type="search"
			autocomplete="off"
			autocorrect="off"
			autocapitalize="none"
			spellcheck="false"
			role="textbox"
			placeholder="Digite para filtrar..." />
		</div>`),
        $(
          `fieldset[data-qd-class="${e}"] > div > div.filtro > input.filtro-busca`
        ).on("input", function () {
          let t = this.value.toLowerCase();
          $(`fieldset[data-qd-class="${e}"] > div > label`).each(function (e) {
            $(this).text().toLowerCase().includes(t)
              ? $(this).show()
              : $(this).hide();
          });
        });
    });
  let e = document.querySelector(
    ".search-qd-v1-navigator fieldset.filtro_compatibilidade-montadora h5"
  );
  null !== e && (e.innerHTML = e.textContent.replace("Compatibilidade ", ""));
}),
  $(document).ready(() => {
    function e() {
      var e, t, o, a;
      (e = 27),
        (o = function () {
          var e, t;
          return (
            (t =
              '<div class="boxPopUp2-overlay boxPopUp2-clickActive" style="display: none;"></div>'),
            (e = $(".boxPopUp2-overlay")).length > 0 ? e : $(t)
          );
        }),
        (a = function (t) {
          var a, n, i, l, d, r;
          return (
            (r = $(this).data("template")),
            (i =
              '<div class="boxPopUp2 vtexsm-popupContent freeContentMain popupOpened sku-selector" style="position: fixed;">\n	<div class="boxPopUp2-wrap">\n		<div class="boxPopUp2-content vtexsm-popupContent freeContentPopup" style="position: fixed;">\n			<div class="skuWrap_ freeContent vtexsc-selectSku">\n				Carregando...\n			</div>\n		</div>\n	</div>\n</div>'),
            (n = o()),
            (a = $(i)),
            n.appendTo($("body")).fadeIn(),
            a.appendTo($("body")).fadeIn(),
            (l = function () {
              return n.fadeOut(), a.remove(), $(document).off("click", l);
            }),
            (d = function (t) {
              return t.keyCode === e
                ? (l(), $(document).off("keyup", d))
                : void 0;
            }),
            n.on("click", l),
            $(document).on("keyup", d),
            $(window).on("vtex.modal.hide", l),
            $(window).on("modalHide.vtex", l),
            $.get(r).done(function (e) {
              return a.find(".skuWrap_").html($(e.trim()));
            })
          );
        }),
        (t = function () {
          return $(".to-bind-modal").each(function () {
            return $(this).removeClass("to-bind-modal").on("click", a);
          });
        }),
        $(document).ready(t),
        $(document).on("ajaxComplete", t);
    }
    let t = window.localStorage.getItem("buttonBuscarSelected");
    if (
      (null !== t && (window.buttonBuscarSelected = JSON.parse(t)),
      window.buttonBuscarSelected)
    ) {
      var o = document.getElementById("div-busca");
      window.innerWidth <= 1e3 && (o.style.display = "none");
    }
    let a = document.querySelector(".prateleira.row.qd-xs"),
      n = new MutationObserver((t) => {
        e();
      });
    n.observe(a, { childList: !0, subtree: !0 });
  });
