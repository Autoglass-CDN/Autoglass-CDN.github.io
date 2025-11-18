(function($) {
function configureBanners(e, t, n) {
  let r = $(`${e} button[data-type="prev"]`),
    i = $(`${e} button[data-type="next"]`),
    l = $(`${t}`),
    a = l[0],
    o = l.children().length,
    s = $(`${t} .box-banner:first-child`).outerWidth(!0) + 1;
  switch (!0) {
    case 0 == o:
      l.parent()[0] &&
        "H2" == l.parent()[0].previousSibling.tagName &&
        l.parent()[0].previousSibling.remove(),
        l.parent().remove();
      break;
    case 1 == o:
      changeContainerWidth(l, o, s), l.parent().addClass("hide-buttons");
      break;
    case o < 3:
      changeContainerWidth(l, o, s),
        l.parent().addClass("button-mobile-only"),
        configureButonsNextPrev(i, r, t, a);
      break;
    case 3 == o:
      createResizeObserver(t, o, s), configureButonsNextPrev(i, r, t, a);
      break;
    default:
      configureButonsNextPrev(i, r, t, a);
  }
  n &&
    a.childNodes.forEach((e) => {
      if (!e.children[0].href) {
        e.children[0].setAttribute("onclick", "$zopim.livechat.window.show()");
        let t = e.children[0].firstElementChild;
        t.setAttribute(
          "onclick",
          `zE('webWidget', 'chat:send', 'Ol\xe1, gostaria de saber mais sobre ${t.alt}')`
        );
      }
    });
}
function configureBannerSubtitles(e) {
  document.querySelectorAll(e).forEach(function (e) {
    e.parentElement.title = e.children[0].getAttribute("alt");
  });
}
function changeContainerWidth(e, t, n) {
  e.width(t * n);
}
function createResizeObserver(e, t, n) {
  let r = new ResizeObserver((e) => {
      e[0].contentRect.width < t * n
        ? e[0].target.parentElement.classList.remove("hide-buttons")
        : e[0].target.parentElement.classList.add("hide-buttons");
    }),
    i = document.querySelector(e);
  r.observe(i);
}
function configureButonsNextPrev(e, t, n, r) {
  e.click(() => {
    if (((itemSize = getItemSize(n)), getScrollPercentage(r) >= 95)) {
      scrollSmoothlyToLeft(r, r.scrollWidth);
      return;
    }
    scrollSmoothlyToRight(r, itemSize);
  }),
    t.click(() => {
      if (((itemSize = getItemSize(n)), 5 >= getScrollPercentage(r))) {
        scrollSmoothlyToRight(r, r.scrollWidth);
        return;
      }
      scrollSmoothlyToLeft(r, itemSize);
    });
}
function getItemSize(e) {
  return $(`${e} .box-banner:first-child`).outerWidth(!0);
}
function getScrollPercentage(e) {
  return (100 * e.scrollLeft) / (e.scrollWidth - e.clientWidth);
}
function scrollSmoothlyToRight(e, t) {
  return e.scrollBy({ top: 0, left: t, behavior: "smooth" });
}
function scrollSmoothlyToLeft(e, t) {
  return scrollSmoothlyToRight(e, -t);
}
function centerArrow(e, t) {
  let n = document.querySelector(
      ".painel-categorias__menu .painel-categorias__categoria.ativo"
    ),
    r = document.querySelector(".arrow");
  try {
    let i = r.getBoundingClientRect(),
      l =
        n.getBoundingClientRect().left +
        (n.offsetWidth - r.offsetWidth) / 2 -
        (i.left - parseInt(getComputedStyle(r).left, 10));
    r.style.left = valueBetweenRange(l, e, t) + "px";
  } catch (a) {}
}
function valueBetweenRange(e, t, n) {
  return e < t ? t : e > n ? n : e;
}
function slideNext() {
  let e = Array.from(
      document.querySelectorAll(".painel-categorias__categoria")
    ),
    t = e.filter((e) => !e.id.includes("tab-busca-categoria")),
    n = document.querySelector(".painel-categorias__menu > ul");
  if (0 > getTranslateX(n)) return;
  let r =
      t[0].offsetWidth +
      parseInt(getComputedStyle(t[0]).marginRight, 10) +
      parseInt(getComputedStyle(t[0]).marginLeft, 10),
    i =
      n.clientWidth +
      parseInt(getComputedStyle(n).marginRight, 10) +
      parseInt(getComputedStyle(n).marginLeft, 10),
    l = Array.from(t).reduce(
      (e, t) =>
        e +
        (parseInt(getComputedStyle(t).width, 10) +
          parseInt(getComputedStyle(t).marginLeft, 10) +
          parseInt(getComputedStyle(t).marginRight, 10)),
      0
    );
  if (window.innerWidth > 900) {
    let a = Math.floor(i / r) * r;
    (a = Math.max(
      (a = Math.min((a = (l - i) * (window.innerWidth / 1366)), l - i)),
      r
    )),
      (n.style.transform = `translateX(-${a}px)`);
  } else n.style.transform = `translateX(-${l - i}px)`;
  n.addEventListener("transitionend", (e) => centerArrow(), { once: !0 });
}
function toggleVisibility(e) {
  let t = document.getElementById(e);
  t.style.visibility = "hidden" === t.style.visibility ? "visible" : "hidden";
}
function getTranslateX(e) {
  let t = getComputedStyle(e).getPropertyValue("transform");
  return new WebKitCSSMatrix(t).m41;
}
function slidePrev() {
  let e = document.querySelector(".painel-categorias__menu > ul");
  (e.style.transform = "translateX(0px)"),
    e.addEventListener("transitionend", (e) => centerArrow(), { once: !0 });
}
function updateSlider() {
  (document.querySelector(".painel-categorias__menu > ul").style.transform =
    "translateX(0px)"),
    centerArrow(10, 1250);
}
function enableTouchScroll(e) {
  let t, n;
  e.addEventListener("touchstart", (r) => {
    (t = r.touches[0].pageX - e.offsetLeft), (n = e.scrollLeft);
  }),
    e.addEventListener("touchmove", (r) => {
      r.preventDefault();
      let i = r.touches[0].pageX - e.offsetLeft,
        l = (i - t) * 2;
      e.scrollLeft = n - l;
    });
}
!(async function () {
  let e = 0,
    t = $('.banners-section .banners button[data-type="prev"]'),
    n = $('.banners-section .banners button[data-type="next"]'),
    r = window.innerWidth <= 768 ? 2 : 1,
    i = `https://api-int.autoglass.com.br/integracao-b2c/api/banners-vtex/exibicao/${r}`;
  await s(i);
  let l = $(".banners-section .banners-content"),
    a = window.innerWidth > 1200 ? $(l[0]) : $(l[1]),
    o = a.children();
  async function s(e) {
    try {
      let t = await fetch(e, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!t.ok) throw Error(`Erro: ${t.status}`);
      let n = await t.json(),
        r =
          window.innerWidth <= 768
            ? document.querySelector(".banners-content.mobile")
            : document.querySelector(".banners-content.desktop");
      n.sort((e, t) => e.PosicaoBanner - t.PosicaoBanner),
        n.forEach((e) => {
          let t = `
                <div class="box-banner">
                    <a href="${e.UrlDestino}" tabindex="-1">
                        <img class="imagem-banner"
                            id="i${e.ImagemBanner}"
                            alt="${e.Nome}"
                            src="${e.ImagemBanner}"
                            complete="complete">
                    </a>
                </div>
            `;
          r.innerHTML += t;
        });
    } catch (i) {
      console.error("Erro na requisi\xe7\xe3o:", i);
    }
  }
  d(),
    localStorage.setItem("buscaPlaca", null),
    h(),
    window.addEventListener("resize", (e) => {
      (o = (a = window.innerWidth > 1200 ? $(l[0]) : $(l[1])).children()),
        $(".banners-bars").html(""),
        d(),
        h();
    }),
    $(".banners-section .banners-content a").attr("tabindex", "-1");
  let c = setInterval(() => {
    a[0].scrollBy(window.innerWidth, 0),
      o.length - 1 === e ? (a[0].scrollBy(-a[0].scrollWidth, 0), (e = 0)) : e++,
      u(e);
  }, 1e4);
  function d() {
    o.each((e, t) => {
      $(".banners-bars").append(`<li id="${e}"></li>`);
    }),
      $(".banners-bars li").click((e) => {
        a.scrollLeft(e.target.id * $(window).width()),
          u(e.target.id),
          clearInterval(c);
      }),
      $(".banners-bars li").first().addClass("active");
  }
  function u(e) {
    e > -1 &&
      e < o.length &&
      ($(".banners-bars li").removeClass("active"),
      $($(".banners-bars li")[e]).addClass("active"));
  }
  function h() {
    let e = (window.innerWidth - $(".c-busca")[0].offsetWidth) / 2;
    t.css("left", e), n.css("right", e);
  }
  t.click(() => {
    a[0].scrollBy(-window.innerWidth, 0),
      0 === getScrollPercentage(a[0])
        ? (a[0].scrollBy(a[0].scrollWidth, 0), (e = o.length - 1))
        : e >= 0 && e--,
      u(e),
      clearInterval(c);
  }),
    n.click(() => {
      a[0].scrollBy(window.innerWidth, 0),
        getScrollPercentage(a[0]) >= 95
          ? (a[0].scrollBy(-a[0].scrollWidth, 0), (e = 0))
          : e < o.length && e++,
        u(e),
        clearInterval(c);
    });
})(),
  document.addEventListener("DOMContentLoaded", function () {
    function e() {
      let e = document.querySelector(".banners-content.desktop img"),
        t = document.querySelector(".whys-section"),
        i = t ? t.querySelectorAll("img") : [],
        r = document.querySelectorAll("img");
      r.forEach((t) => {
        t === e ||
          [...i].includes(t) ||
          t.hasAttribute("loading") ||
          t.setAttribute("loading", "lazy");
      }),
        e &&
          (e.setAttribute("loading", "eager"),
          e.setAttribute("fetchpriority", "high")),
        i.forEach((e) => {
          e.setAttribute("loading", "eager"),
            e.setAttribute("fetchpriority", "high");
        });
    }
    e();
    let t = new MutationObserver(() => {
      e();
    });
    t.observe(document.body, { childList: !0, subtree: !0 });
  });
(function () {
  let e = $(".benefits-section .container"),
    t = $(".benefits-section .container .benefit"),
    n = $(".benefits-section .benefits-dots-mobile-container .dot"),
    r = setInterval(() => {
      let t = i();
      t >= 99 ? e[0].scrollBy(-e[0].scrollWidth, 0) : e[0].scrollBy(150, 0);
    }, 5e3);
  function i() {
    return (100 * e[0].scrollLeft) / (e[0].scrollWidth - e[0].clientWidth);
  }
  e.on("wheel", (e) => {
    if (
      1e3 >
      (window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth)
    ) {
      e.preventDefault();
      let { deltaY: t, target: n } = e.originalEvent;
      t > 0 ? n.scrollBy(150, 0) : n.scrollBy(-150, 0), clearInterval(r);
    }
  }),
    e.scroll(() => {
      let e = 100 / t.length,
        l = i();
      t.each((r) => {
        t.eq(r).removeClass("focus"),
          n.eq(r).removeClass("focus"),
          l >= e * r &&
            l <= e * (r + 1) &&
            (t.eq(r).addClass("focus"), n.eq(r).addClass("focus"));
      }),
        clearInterval(r);
    });
})(),
  configureBanners(
    ".banners-promocionais-section",
    ".banners-promocionais-itens"
  ),
  configureBannerSubtitles(".banners-nossos-servicos .box-banner > a"),
  configureBanners(".nossos-servicos-section", ".banners-nossos-servicos", !0),
  (function () {
    let e = 1,
      t = $('.ratings-section .ratings__slider button[data-type="prev"]'),
      n = $('.ratings-section .ratings__slider button[data-type="next"]'),
      r = $(".ratings-section .ratings__slider-content"),
      i = r.children(),
      l = { CSS: { HIGHLIGHT: "highlight" }, WINDOW: { BREAK_POINT: 1050 } },
      a = setInterval(() => {
        e === i.length - 1 ? (e = 0) : e++, s(e), c(e);
      }, 1e4);
    function o() {
      let t = e + 1,
        n = e - 1;
      0 === e && ((n = 0), (t = 2)),
        e === i.length - 1 && ((n = e - 2), (t = i.length - 1)),
        i.each((e, r) => {
          $(r).hide(),
            e < n || e > t || $(r).css("display", "flex").fadeIn("slow");
        });
    }
    function s(e) {
      i.removeClass(l.CSS.HIGHLIGHT), $(i[e]).addClass(l.CSS.HIGHLIGHT), o();
    }
    function c(e) {
      e > -1 &&
        e < i.length &&
        ($(".ratings-section .rating-bars li").removeClass("active"),
        $($(".ratings-section .rating-bars li")[e]).addClass("active"));
    }
    i.each((e, t) => {
      $(".ratings-section .rating-bars").append(`<li id="${e}"></li>`);
    }),
      $(".ratings-section .rating-bars li").click((t) => {
        s((e = +t.target.id)), c(e);
      }),
      $(".ratings-section .rating-bars li")
        .filter((t) => t === e)
        .addClass("active"),
      o(),
      t.click(() => {
        0 === e ? (e = i.length - 1) : e--, clearInterval(a), s(e), c(e);
      }),
      n.click(() => {
        e === i.length - 1 ? (e = 0) : e++, clearInterval(a), s(e), c(e);
      }),
      i.click((t) => {
        let n = i.index(t.currentTarget);
        (e = n), clearInterval(a), s(e), c(e);
      });
  })(),
  window.addEventListener("resize", updateSlider),
  (() => {
    let e = document.querySelector(".painel-categorias__menu > ul"),
      t = document.getElementById("prev-btn"),
      n = document.getElementById("next-btn");
    t.addEventListener("click", slidePrev),
      n.addEventListener("click", slideNext),
      enableTouchScroll(e);
    let r = null;
    document
      .querySelectorAll(
        ".painel-categorias__menu .painel-categorias__categoria"
      )
      .forEach((e, t) => {
        e.addEventListener("mouseenter", (t) => {
          r = delayedAction(() => {
            isActiveElement(e) || centerArrow(10, 1250);
          }, r);
        });
      });
  })()
})(window.jQuery);