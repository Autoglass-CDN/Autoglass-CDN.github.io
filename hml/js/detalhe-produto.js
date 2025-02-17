const baseUrlApi =
    window.location.href.includes("dev") ||
    window.location.href.includes("mvp") ||
    window.location.href.includes("hml")
      ? "https://api-hml.autoglass.com.br/integracao-b2c/api/web-app"
      : "https://api.autoglass.com.br/integracao-b2c/api/web-app",
  sections = [...document.querySelectorAll("section.tab-content")],
  getLinkById = (a) => document.querySelector(`a[href='#${a}'].tab-link`);
function handleSocialClick(a, e) {
  dataLayer.push({
    event: "share",
    method: e,
    content_type: skuJson.skus[0].image,
    item_id: skuJson.skus[0].sku,
  });
}
$(".product-qd-v1-buy-button .buy-button.buy-button-ref").addClass(
  "add-to-cart-ga"
);
const socialMediaElements = {
  whatsapp: ".product-qd-v1-social-share.desktop .whatsapp",
  twitter: ".product-qd-v1-social-share.desktop .twitter",
  mail: ".product-qd-v1-social-share.desktop .mail",
  facebook: ".product-qd-v1-social-share.desktop .facebook",
};
function ButtoWhatsappClick(a, e) {
  dataLayer.push({ event: "whatsapp", position: e });
}
Object.entries(socialMediaElements).forEach(([a, e]) => {
  let t = document.querySelector(e);
  t.addEventListener("click", (e) => handleSocialClick(e, a));
});
const whatsappElements = {
  ".link-whatsapp-texto.link-whatsapp-conteudo-sem-numero": "topo",
  ".link-whatsapp-texto.gtm-whatsapp-botao-rodape": "widget",
  ".link-whatsapp-texto.botao-compre-whatsapp": "compre-whatsapp",
  ".link-whatsapp-texto.link-whatsapp": "footer",
};
Object.entries(whatsappElements).forEach(([a, e]) => {
  let t = document.querySelector(a);
  t && t.addEventListener("click", (a) => ButtoWhatsappClick(a, e));
});
let veiculosBuscaveis = [];
const sugestoesContainer = $(
  ".veiculos-compativeis-search__search-suggestions"
);
$(".veiculos-compativeis-search").hide();
const inView = (a, e) => {
  let t = a.offsetTop,
    o = a.offsetHeight;
  for (; a.offsetParent; ) t += (a = a.offsetParent).offsetTop;
  return (
    e && (t -= e > 1200 ? 250 : 130),
    t < window.pageYOffset + window.innerHeight && t + o > window.pageYOffset
  );
};
window.onscroll = () => {
  let a = !1;
  sections.forEach((e) => {
    let t = getLinkById(e.id);
    inView(e, window.innerWidth) && !a
      ? (t.classList.add("tab--current"), (a = !0))
      : t && t.classList.remove("tab--current");
  });
};
const toggleSectionCollapse = (a) => {
    a.classList.toggle("ativo");
  },
  sectionCollapseInit = () => {
    document.querySelectorAll(".contents .tab-content h2").forEach((a) => {
      (a.onclick = () => {
        toggleSectionCollapse(a.closest(".tab-content"));
      }),
        ("Compre Junto" === a.textContent ||
          "Outras Marcas" === a.textContent) &&
          setTimeout(
            () => toggleSectionCollapse(a.closest(".tab-content")),
            5e3
          );
    });
  };
async function insertBrandDescription() {
  return fetch("/api/catalog_system/pub/brand/list")
    .then((a) => a.json())
    .then((a) => {
      let e = document
          .querySelector(".brandName")
          .classList.value.replace("brandName", "")
          .trim()
          .replace("-", " ")
          .split(" ")[0],
        t = a.find((a) => a.name.includes(e));
      if (t && "" !== t.metaTagDescription) {
        let o = t.metaTagDescription,
          i = document.querySelector("#descricao-marca");
        (i.textContent = o),
          (i.parentElement.parentElement.style.display = "block");
      }
    });
}
async function getProductRefIdByProductName() {
  let a = await vtexjs.catalog.getCurrentProductWithVariations(),
    [e, t] = a.name.match(/(\d+)(\s?\-?\s?[0-9]+)?$/);
  return t;
}
async function loadOptionals() {
  let a = $("#opcionais"),
    e = await getProductRefIdByProductName(),
    t = $(".teste-opcionais");
  try {
    let { Opcionais: o } = await $.get(`${baseUrlApi}/produtos/${e}/opcionais`);
    o &&
      o.length > 0 &&
      (a.html(`
        <h3>Caracter\xedsticas</h3>
        <div class="caracteristicas__box">
         ${o
           .map(
             (a) => `<span class="caracteristicas__caracteristica">${a}</span>`
           )
           .join("")}
        </div>
      `),
      t.html(`
        ${o.map((a) => `<h4 class="lista-opcionais">${a}</h4>`).join("")}
        <div class="container-mais-especificacoes">
          <a class="mais-especificacoes">Mais informa\xe7\xf5es</a>
        </div>
      `));
  } catch (i) {
    console.error("Falha ao renderizar opcionais. \n", i);
  }
  $(".container-mais-especificacoes .mais-especificacoes").click(function () {
    document
      .querySelector(".container-descricao #informacoes-gerais")
      .scrollIntoView();
  });
}
async function loadSimilars() {
  var a, e;
  let t = (a) =>
      (document.querySelector(`a[href="#${a}"]`).parentElement.style.display =
        "none"),
    o = (a) => {
      (document.querySelector(`#${a}`).style.display = "block"),
        (document.querySelector(`a[href="#${a}"]`).parentElement.style.display =
          "unset");
    };
  t("outras-marcas"),
    t("compre-junto"),
    (a = "similars"),
    "" != document.querySelector(`#${a}`).innerHTML && o("outras-marcas"),
    (e = "sugestoes"),
    "" != document.querySelector(`#${e}`).innerHTML && o("compre-junto");
}
async function buscaPorPlaca(a) {
  var e;
  let t =
    ((e = a),
    e
      .trim()
      .replace(/[\W_]+/g, "")
      .toUpperCase());
  try {
    window.innerWidth < 700 &&
      (document.querySelector("#side-menu .loading-overlay").style.display =
        "block");
    let { montadora: o, modelo: i, anoModelo: s, fipe: c } = await l(t);
    return { montadora: o, modelo: i, anoModelo: s, fipe: c };
  } catch (n) {}
  async function l(a) {
    let e = await fetch(`${baseUrlApi}/veiculos/${a}/placas`),
      t = await e.json();
    return (
      (montadora = t.Body.Data.Marca),
      (modelo = t.Body.Data.Modelo),
      (anoModelo = t.Body.Data.DadosBasicosDoVeiculo.AnoModelo),
      (fipe = t.Body.Data.DadosBasicosDoVeiculo.InformacoesFipe[0].FipeId),
      { montadora, modelo, anoModelo, fipe }
    );
  }
}
async function buscarPromocoes() {
  try {
    let a = await fetch(`${baseUrlApi}/promocoes?nome=pix`),
      e = await a.json(),
      t = e.find((a) => a.isActive);
    if (t) aplicarDesconto(t.percentualDiscountValue);
    else {
      let o = document.querySelectorAll(".skuBestPrice");
      o.forEach((a) => {
        a.style.display = "inline-block";
      });
    }
  } catch (i) {
    let s = document.querySelectorAll(".skuBestPrice");
    s.forEach((a) => {
      a.style.display = "inline-block";
    });
  }
}
function aplicarDesconto(a) {
  let e = document.querySelectorAll(".skuListPrice")[1],
    t = parseFloat(
      e.innerHTML
        .trim()
        .replace("R$", "")
        .trim()
        .replace(".", "")
        .replace(",", ".")
    ),
    o = document.querySelectorAll(".skuBestPrice");
  o.forEach((e, i) => {
    let s = e.textContent.trim();
    s = (s = s.replace("R$", "").trim()).replace(".", "").replace(",", ".");
    let c = parseFloat(s);
    if (!isNaN(c)) {
      let n =
        Math.round(100 * (Math.round(c * (1 - a / 100) * 1e3) / 1e3)) / 100;
      if (
        ((e.textContent = n.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })),
        (e.style.fontSize = "18px"),
        i !== o.length - 1)
      ) {
        let l = document.createElement("div");
        l.classList.add("pix-discount"), (l.textContent = "no Pix");
        let r = document.createElement("div");
        r.classList.add("percent-box"),
          (r.textContent = `-${Math.round(((t - n) / t) * 100)}%`),
          e.parentElement.appendChild(l),
          e.parentElement.appendChild(r);
      } else e.classList.add(".preco-bottom-mobile");
      (e.style.display = "inline-block"), ajustarTextoValorParcelado(c);
    }
  });
}
function ajustarTextoValorParcelado(a) {
  let e = document.querySelectorAll(".valor-dividido.price-installments");
  e.forEach(function (t, o) {
    if (!t.classList.contains("modificada")) {
      t.classList.add("modificada");
      let i = t.querySelector(".skuBestInstallmentNumber"),
        s = document.createElement("label");
      if (
        ((s.textContent = a.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })),
        s.classList.add("skuBestInstallmentNumber"),
        i)
      ) {
        i.parentNode.insertBefore(s, i);
        let c = document.createElement("span");
        (c.textContent = " em "),
          c.classList.add("palavras-conectivas"),
          s.parentNode.insertBefore(c, i);
        let n = document.createElement("span");
        (n.textContent = " sem juros"), n.classList.add("span-sem-juros");
        let l = t.querySelector("strong");
        if (
          (l && l.appendChild(n),
          o !== e.length - 1 &&
            ("none" === t.style.display ||
              "none" === getComputedStyle(t).display))
        ) {
          let r = t.closest(".descricao-preco");
          if (r) {
            let d = document.createElement("div");
            d.classList.add(
              "valor-dividido",
              "price-installments",
              "modificada"
            );
            let p = document.createElement("span");
            (p.textContent = "ou "),
              d.appendChild(p),
              (tipoTag = 0 == o ? "label" : "span");
            let u = document.createElement(tipoTag);
            (u.textContent = s.textContent),
              u.classList.add("skuBestInstallmentNumber"),
              d.appendChild(u),
              r.appendChild(d);
          }
        }
      }
    }
  });
}
sectionCollapseInit(),
  window.addEventListener("load", insertBrandDescription),
  window.addEventListener("load", loadOptionals),
  loadSimilars(),
  $(window).on("load", async () => {
    function a() {
      $(".product-qd-v1-image div#image").css(
        "min-height",
        $(".product-qd-v1-image #image-main").width()
      );
    }
    window.addEventListener("resize", a), a(), f();
    let e = $("#veiculos-compativeis"),
      t = await getProductRefIdByProductName(),
      o = await $.get(`${baseUrlApi}/produtos/${t}/veiculos-compativeis`);
    veiculosBuscaveis = o;
    let i = !!o && o.length > 0;
    if (i) {
      e.html(`
      <h2>Ve\xedculos Compat\xedveis</h2>
      <div class="veiculos-compativeis__box">
        <div class="veiculos-compativeis__box-header">
          <button id="group-prev" data-type="prev" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" alt="\xcdcone de seta para a esquerda">
              <path id="Icon_ionic-ios-arrow-dropleft-circle" data-name="Icon ionic-ios-arrow-dropleft-circle" d="M19.375,3.375a16,16,0,1,0,16,16A16,16,0,0,0,19.375,3.375Zm3.338,22.238a1.49,1.49,0,0,1,0,2.1,1.467,1.467,0,0,1-1.046.431,1.492,1.492,0,0,1-1.054-.438l-7.231-7.254a1.483,1.483,0,0,1,.046-2.046l7.338-7.362a1.485,1.485,0,0,1,2.1,2.1l-6.3,6.231Z" transform="translate(35.375 35.375) rotate(180)" opacity="0.42"/>
            </svg>
          </button>
          ${o.map(d).join("")}
          <button id="group-next" data-type="next" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" alt="\xcdcone de seta para a direita">
              <path id="Icon_ionic-ios-arrow-dropleft-circle" data-name="Icon ionic-ios-arrow-dropleft-circle" d="M19.375,3.375a16,16,0,1,0,16,16A16,16,0,0,0,19.375,3.375Zm3.338,22.238a1.49,1.49,0,0,1,0,2.1,1.467,1.467,0,0,1-1.046.431,1.492,1.492,0,0,1-1.054-.438l-7.231-7.254a1.483,1.483,0,0,1,.046-2.046l7.338-7.362a1.485,1.485,0,0,1,2.1,2.1l-6.3,6.231Z" transform="translate(35.375 35.375) rotate(180)" opacity="0.42"/>
            </svg>
          </button>
        </div>
        <div class="veiculos-compativeis__box-content">
          ${o.map(u).join("")}
        </div>
      </div>
    `),
        $(".veiculos-compativeis__header-option").first().addClass("active"),
        $(".veiculos-compativeis__box-content div").first().addClass("active"),
        $(".veiculos-compativeis__header-option").click(function () {
          $(".veiculos-compativeis__header-option").removeClass("active"),
            $(this).addClass("active"),
            $(".veiculos-compativeis__box-content div").removeClass("active"),
            $(
              `.veiculos-compativeis__box-content div[data-for="${$(this).attr(
                "id"
              )}"]`
            ).addClass("active");
        }),
        $(
          "#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header button"
        ).click(function () {
          let a = $(this).attr("data-type"),
            e = $(
              "#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header"
            );
          "next" === a ? e[0].scrollBy(200, 0) : e[0].scrollBy(-200, 0);
        });
      let s = $(
        "#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header"
      );
      $("#veiculos-compativeis h2").click(() => toggleSectionCollapse(e[0])),
        m(s),
        s.on("scroll", function () {
          m($(this));
        }),
        $(window).on("resize", function () {
          m(s);
        }),
        $(".veiculos-compativeis-search").show();
    } else $('a[href="#veiculos-compativeis"]').parent().hide(), e.hide();
    let c = Product.captureSkuSelectors(),
      n =
        "/checkout/cart/add?sku=" +
        c[0] +
        "&qty=1&seller=1&redirect=true&" +
        readCookie("VTEXSC");
    async function l(a) {
      let e;
      if (a.trim().match(/^[A-Z]{3}[\-_]?[0-9][0-9A-Z][0-9]{2}$/i)) {
        sugestoesContainer.html(`
        <div class="spinner-compatibilidade"></div>
      `);
        let { modelo: t, anoModelo: o } = await buscaPorPlaca(a.trim());
        (a = t), (e = parseInt(o, 10)), sugestoesContainer.empty();
      }
      if (veiculosBuscaveis && veiculosBuscaveis.length > 0 && a.length > 0) {
        let i = veiculosBuscaveis
          .map((t) =>
            t.Veiculos.filter(
              (t) =>
                RegExp(
                  a
                    .split(" ")
                    .map((a) => `(?=.*${a})`)
                    .join(""),
                  "i"
                ).test(t.Veiculo) &&
                (void 0 == e || t.Anos.includes(e))
            )
          )
          .filter((a) => a.length > 0);
        i.length
          ? (sugestoesContainer.html(
              i.flat().slice(0, 3).map(r).join("") +
                `<div class="veiculos-compativeis-search__link">
            <a href="#veiculos-compativeis">Ver todos</a>
          </div>`
            ),
            document
              .querySelectorAll(
                "a.veiculos-compativeis__content-compativel-link"
              )
              .forEach((a) => a.addEventListener("click", p)))
          : sugestoesContainer.html(`
          <div class="veiculos-compativeis-search__disclaimer">
           Modelo de carro n\xe3o compat\xedvel :(
          </div>
          <div class="veiculos-compativeis-search__link">
            <a href="#veiculos-compativeis">Ver todos</a>
          </div>
        `);
      } else sugestoesContainer.empty();
    }
    function r(a, e) {
      return `<a href="${n}" class="veiculos-compativeis__content-compativel-link">
              <p>${a.Veiculo}</p>
              <div>${a.Anos.map((a) => "<span>" + a + "</span>").join(
                ",&nbsp"
              )}.</div>
            </a>`;
    }
    function d(a, e) {
      return `
         <div id="${a.Grupo + e}" class="veiculos-compativeis__header-option">
        <span>${a.Grupo}</span>
      </div>
    `;
    }
    function p() {
      ga("set", "transport", "beacon"),
        ga("send", "event", "Link SelectCar", "Clique", "Add ao Carrinho");
    }
    function u(a, e) {
      return `
        <div data-for="${a.Grupo + e}">
        ${a.Veiculos.map(
          (a) => `
          <div class="veiculos-compativeis__content-compativel">
           <p>${a.Veiculo}</p>
            <div>${a.Anos.map((a) => "<span>" + a + "</span>").join(
              ",&nbsp"
            )}.</div>
          </div>
        `
        ).join("")}
      </div>
    `;
    }
    function m(a) {
      let e = $(
        "#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header button"
      );
      if (v()) {
        let t = h(a[0]);
        0 === t
          ? (e.last().css("display", "flex"), e.first().css("display", "none"))
          : 100 === t
          ? (e.first().css("display", "flex"), e.last().css("display", "none"))
          : e.css("display", "flex");
      } else e.css("display", "none");
    }
    function v() {
      return (
        document.querySelector(".veiculos-compativeis__box-header")
          .scrollWidth > window.innerWidth
      );
    }
    function h(a) {
      return (100 * a.scrollLeft) / (a.scrollWidth - a.clientWidth);
    }
    function f() {
      let a = encodeURIComponent(location.href);
      $(".product-qd-v1-social-share a.whatsapp").attr(
        "href",
        `https://api.whatsapp.com/send?text=${a}`
      ),
        $(".product-qd-v1-social-share a.twitter").attr(
          "href",
          `https://twitter.com/intent/tweet?text=${a}`
        ),
        $(".product-qd-v1-social-share a.mail").attr(
          "href",
          `mailto:?subject=Quero%20compartilhar%20um%20produto%20da%20Autoglass&body=Veja%20este%20produto%20na%20Autoglass:%0D%0A${a}`
        ),
        $(".product-qd-v1-social-share a.messenger").attr(
          "href",
          `fb-messenger://share?link=${a}`
        ),
        $(".product-qd-v1-social-share a.facebook").attr(
          "href",
          `https://www.facebook.com/sharer.php?u=${a}`
        ),
        $(".product-qd-v1-social-share a.popup-trigger").click((a) => {
          a.preventDefault(),
            $("div.product-qd-v1-social-share-options-popup").fadeToggle(
              400,
              "swing",
              () => {
                $(".product-qd-v1-social-share a.copy")
                  .children("i.fas.fa-check")
                  .attr("class", "far fa-copy");
              }
            );
        }),
        $(".product-qd-v1-social-share a.copy").click((a) => {
          a.preventDefault(),
            navigator.clipboard.writeText(location.href),
            $(".product-qd-v1-social-share a.copy")
              .children("i.far.fa-copy")
              .fadeOut("fast")
              .attr("class", "fas fa-check")
              .fadeIn("fast");
        }),
        $(".product-qd-v1-social-share a:not(.popup-trigger)").click((a) => {
          let e = $(a.target).closest("a").attr("class"),
            t = e.replace("_", "").split(" ");
          for (let o = 0; o < t.length; o++)
            t[o] = t[o].charAt(0).toUpperCase() + t[o].slice(1);
          let i = t.join(" ");
          ga("create", "UA-133498560-1", "autoglassonline.com", "gaSSTracker"),
            ga("gaSSTracker.set", "transport", "beacon"),
            ga(
              "gaSSTracker.send",
              "event",
              "Social Share",
              `Compartilhar ${i}`,
              `Bot\xe3o ${i}`
            );
        });
    }
    $(
      ".veiculos-compativeis-search__search-box .veiculos-compativeis-search__search-input input"
    ).on("input", async function () {
      await l($(this).val());
    });
    let b = $("#codigo-sku-acessorio-ag").text().trim(),
      y = $("#preco-acessorios-ag").text().replace("R$ ", "").trim();
    $(".product-qd-v1-buy-button .buy-button").attr("href", "#");
    let _ =
      "/checkout/cart/add?sku=" +
      c[0] +
      "&qty=1&seller=1&redirect=true&" +
      readCookie("VTEXSC");
      let urlComInstalacao =
        _ +
        "&sku=" +
        b +
        "&qty=1&seller=1&redirect=true&" +
        readCookie("VTEXSC");
        if(y && b){
          if(y < "0,01"){
            $(".valorComInstalacao").hide();
            document.getElementById("install-option").checked = true;
            $(".titulo-instalacao-gratis").show();
            $(".titulo-valor-instalacao").hide();
          }else{
            document.getElementById("valorComInstalacao").innerHTML = y
            document.getElementById("install-option").checked = true;
          }
        }else{
          $(".card-instalacao").hide();
          document.getElementById("install-option").checked == false;
        }
        function toggleInstallOption() {
          const installOption = document.getElementById("install-option");
          const buyButton = $(".product-qd-v1-buy-button .buy-button");

          installOption.checked = !installOption.checked;

          const hrefValue = installOption.checked ? urlComInstalacao : _;
          buyButton.attr("href", hrefValue);
        }

        $(".card-right-instalacao, .card-content-instalacao").click(toggleInstallOption);
          $(".product-qd-v1-buy-button .buy-button").click(function () {
            if(document.getElementById("install-option").checked == true)
              window.location.href = urlComInstalacao;
            else
              window.location.href = _;
          }),
      $(document).ready(function () {
        $(".botao-compre-whatsapp").click(function () {
          let a = `Ol\xe1, estou na p\xe1gina desse produto e gostaria de compr\xe1-lo: ${window.location.href}`;
          window
            .open(urlWhatsAppApi + numeroWhatsAppAG + "?text=" + a, "_blank")
            .focus();
        });
      });
  }),
  buscarPromocoes();
