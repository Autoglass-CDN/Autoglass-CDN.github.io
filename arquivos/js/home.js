function configureBanners(e, t, n) {
  let r = $(`${e} button[data-type="prev"]`),
    i = $(`${e} button[data-type="next"]`),
    l = $(`${t}`),
    s = l[0],
    o = l.children().length,
    a = $(`${t} .box-banner:first-child`).outerWidth(!0) + 1;
  switch (!0) {
    case 0 == o:
      l.parent()[0] &&
        "H2" == l.parent()[0].previousSibling.tagName &&
        l.parent()[0].previousSibling.remove(),
        l.parent().remove();
      break;
    case 1 == o:
      changeContainerWidth(l, o, a), l.parent().addClass("hide-buttons");
      break;
    case o < 3:
      changeContainerWidth(l, o, a),
        l.parent().addClass("button-mobile-only"),
        configureButonsNextPrev(i, r, t, s);
      break;
    case 3 == o:
      createResizeObserver(t, o, a), configureButonsNextPrev(i, r, t, s);
      break;
    default:
      configureButonsNextPrev(i, r, t, s);
  }
  n &&
    s.childNodes.forEach((e) => {
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
  } catch (s) {}
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
  let r = Array.from(t).reduce(
      (e, t) =>
        e +
        (parseInt(getComputedStyle(t).width, 10) +
          parseInt(getComputedStyle(t).marginLeft, 10) +
          parseInt(getComputedStyle(t).marginRight, 10)),
      0
    ),
    i =
      n.clientWidth +
      parseInt(getComputedStyle(n).marginRight, 10) +
      parseInt(getComputedStyle(n).marginLeft, 10);
  (n.style.transform = `translateX(${i - (r < 1808 ? r + 69 : r)}px)`),
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
!(function () {
  let e = 0,
    t = $('.banners-section .banners button[data-type="prev"]'),
    n = $('.banners-section .banners button[data-type="next"]'),
    r = $(".banners-section .banners-content"),
    i = window.innerWidth > 1200 ? $(r[0]) : $(r[1]),
    l = i.children();
  localStorage.setItem("buscaPlaca", null),
    o(),
    c(),
    window.addEventListener("resize", (e) => {
      (l = (i = window.innerWidth > 1200 ? $(r[0]) : $(r[1])).children()),
        $(".banners-bars").html(""),
        o(),
        c();
    }),
    $(".banners-section .banners-content a").attr("tabindex", "-1");
  let s = setInterval(() => {
    i[0].scrollBy(window.innerWidth, 0),
      l.length - 1 === e ? (i[0].scrollBy(-i[0].scrollWidth, 0), (e = 0)) : e++,
      a(e);
  }, 1e4);
  function o() {
    l.each((e, t) => {
      $(".banners-bars").append(`<li id="${e}"></li>`);
    }),
      $(".banners-bars li").click((e) => {
        i.scrollLeft(e.target.id * $(window).width()),
          a(e.target.id),
          clearInterval(s);
      }),
      $(".banners-bars li").first().addClass("active");
  }
  function a(e) {
    e > -1 &&
      e < l.length &&
      ($(".banners-bars li").removeClass("active"),
      $($(".banners-bars li")[e]).addClass("active"));
  }
  function c() {
    let e = (window.innerWidth - $(".c-busca")[0].offsetWidth) / 2;
    t.css("left", e), n.css("right", e);
  }
  t.click(() => {
    i[0].scrollBy(-window.innerWidth, 0),
      0 === getScrollPercentage(i[0])
        ? (i[0].scrollBy(i[0].scrollWidth, 0), (e = l.length - 1))
        : e >= 0 && e--,
      a(e),
      clearInterval(s);
  }),
    n.click(() => {
      i[0].scrollBy(window.innerWidth, 0),
        getScrollPercentage(i[0]) >= 95
          ? (i[0].scrollBy(-i[0].scrollWidth, 0), (e = 0))
          : e < l.length && e++,
        a(e),
        clearInterval(s);
    });
})(),
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
      s = setInterval(() => {
        e === i.length - 1 ? (e = 0) : e++, a(e), c(e);
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
    function a(e) {
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
        a((e = +t.target.id)), c(e);
      }),
      $(".ratings-section .rating-bars li")
        .filter((t) => t === e)
        .addClass("active"),
      o(),
      t.click(() => {
        0 === e ? (e = i.length - 1) : e--, clearInterval(s), a(e), c(e);
      }),
      n.click(() => {
        e === i.length - 1 ? (e = 0) : e++, clearInterval(s), a(e), c(e);
      }),
      i.click((t) => {
        let n = i.index(t.currentTarget);
        (e = n), clearInterval(s), a(e), c(e);
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
  })();
