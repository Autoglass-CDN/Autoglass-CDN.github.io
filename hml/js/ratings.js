!(function (t) {
  var e = {};
  function n(r) {
    if (e[r]) return e[r].exports;
    var i = (e[r] = { i: r, l: !1, exports: {} });
    return t[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
  }
  (n.m = t),
    (n.c = e),
    (n.d = function (t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
    }),
    (n.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (n.t = function (t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var i in t)
          n.d(
            r,
            i,
            function (e) {
              return t[e];
            }.bind(null, i)
          );
      return r;
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return n.d(e, "a", e), e;
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ""),
    n((n.s = 0));
})([
  function (t, e) {
    !(function () {
      let t = 1;
      const e = $('.ratings-section .ratings__slider button[data-type="prev"]'),
        n = $('.ratings-section .ratings__slider button[data-type="next"]'),
        r = $(".ratings-section .ratings__slider-content").children(),
        i = { HIGHLIGHT: "highlight" },
        a = setInterval(() => {
          t === r.length - 1 ? (t = 0) : t++, o(t), c(t);
        }, 1e4);
      function l() {
        let e = t + 1,
          n = t - 1;
        0 === t && ((n = 0), (e = 2)),
          t === r.length - 1 && ((n = t - 2), (e = r.length - 1)),
          r.each((t, r) => {
            $(r).hide(),
              t < n || t > e || $(r).css("display", "flex").fadeIn("slow");
          });
      }
      function o(t) {
        r.removeClass(i.HIGHLIGHT), $(r[t]).addClass(i.HIGHLIGHT), l();
      }
      function c(t) {
        t > -1 &&
          t < r.length &&
          ($(".ratings-section .rating-bars li").removeClass("active"),
          $($(".ratings-section .rating-bars li")[t]).addClass("active"));
      }
      r.each((t, e) => {
        $(".ratings-section .rating-bars").append(`<li id="${t}"></li>`);
      }),
        $(".ratings-section .rating-bars li").click((e) => {
          (t = +e.target.id), o(t), c(t);
        }),
        $(".ratings-section .rating-bars li")
          .filter((e) => e === t)
          .addClass("active"),
        l(),
        e.click(() => {
          0 === t ? (t = r.length - 1) : t--, clearInterval(a), o(t), c(t);
        }),
        n.click(() => {
          t === r.length - 1 ? (t = 0) : t++, clearInterval(a), o(t), c(t);
        }),
        r.click((e) => {
          const n = r.index(e.currentTarget);
          (t = n), clearInterval(a), o(t), c(t);
        });
    })();
  },
]);
