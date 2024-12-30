(() => {
  let e = document.querySelector("#whatsapp-icon-link-desktop"),
    t = document.querySelector("#whatsapp-icon-link-mobile"),
    o = document.querySelector("#whatsapp-icon-rodape"),
    r = "Whatsapp: " + numeroWhatsAppFormatadoAG;
  $(".link-whatsapp").attr("href", urlWhatsAppApi + numeroWhatsAppAG),
    $(".link-whatsapp-texto").attr(
      "href",
      urlWhatsAppApi + numeroWhatsAppAG + textoUrlGet
    ),
    $(".link-whatsapp-conteudo").text(r);
  let a = document.querySelector("#whatsapp-icon-link");
  document.querySelector(".product-qd-v1-fixed-bar") &&
    (a.style.marginBottom = "55px");
  let n = "ontouchstart" in window ? "touchstart" : "click";
  function c(e, t) {
    e.addEventListener(
      n,
      (e) => {
        ga("create", "UA-133498560-1", "autoglassonline.com", "gaTracker"),
          ga("gaTracker.set", "transport", "beacon"),
          ga("gaTracker.send", "event", "WhatsApp", "Clique", `${t}`);
      },
      { passive: !0 }
    );
  }
  c(e, "Topo"), c(t, "Topo"), c(a, "Flutuante"), c(o, "Rodap\xe9");
  let l = () => {
    let e = document.querySelector("#launcher");
    (zdFrame = document.querySelector("#launcher").contentDocument) &&
      ((e.style.margin = "5px 20px"),
      (zdFrame.querySelector(".u-userLauncherColor").style =
        "border: 4px solid #FFF !important"));
  };
  function i() {
    let e = "",
      t = {
        textoUm: "Pesquise por pe\xe7a, produto, montadora...",
        textoDois: "O que voc\xea quer encontrar?",
      };
    s() && (e = "-mobile");
    try {
      let o = document.querySelector(`.search-box${e} .search-icon`),
        r = document.querySelector(`.search-box${e} .fulltext-search-box`);
      o.onclick = function () {
        r.value != t.textoUm && r.value != t.textoDois
          ? window.location.assign(
              `https://www.autoglassonline.com.br/${r.value}`
            )
          : r.focus();
      };
    } catch (a) {
      console.log(a.message);
    }
  }
  function s() {
    let e =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    return e < 1200;
  }
  setTimeout(l, 5e3), i();
})();
