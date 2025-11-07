!(function (t) {
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
        if (
          (1 & e && (t = n(t)),
          8 & e || (4 & e && "object" == typeof t && t && t.__esModule))
        )
          return t;
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
    function (e, n) {
      !(function () {
        let e = 1,
          n = t('.ratings-section .ratings__slider button[data-type="prev"]'),
          r = t('.ratings-section .ratings__slider button[data-type="next"]'),
          i = t(".ratings-section .ratings__slider-content").children(),
          a = { HIGHLIGHT: "highlight" },
          o = setInterval(() => {
            e === i.length - 1 ? (e = 0) : e++, s(e), c(e);
          }, 1e4);
        function l() {
          let n = e + 1,
            r = e - 1;
          0 === e && ((r = 0), (n = 2)),
            e === i.length - 1 && ((r = e - 2), (n = i.length - 1)),
            i.each((e, i) => {
              t(i).hide(),
                e < r || e > n || t(i).css("display", "flex").fadeIn("slow");
            });
        }
        function s(e) {
          i.removeClass(a.HIGHLIGHT), t(i[e]).addClass(a.HIGHLIGHT), l();
        }
        function c(e) {
          e > -1 &&
            e < i.length &&
            (t(".ratings-section .rating-bars li").removeClass("active"),
            t(t(".ratings-section .rating-bars li")[e]).addClass("active"));
        }
        i.each((e, n) => {
          t(".ratings-section .rating-bars").append(`<li id="${e}"></li>`);
        }),
          t(".ratings-section .rating-bars li").click((t) => {
            s((e = +t.target.id)), c(e);
          }),
          t(".ratings-section .rating-bars li")
            .filter((t) => t === e)
            .addClass("active"),
          l(),
          n.click(() => {
            0 === e ? (e = i.length - 1) : e--, clearInterval(o), s(e), c(e);
          }),
          r.click(() => {
            e === i.length - 1 ? (e = 0) : e++, clearInterval(o), s(e), c(e);
          }),
          i.click((t) => {
            let n = i.index(t.currentTarget);
            (e = n), clearInterval(o), s(e), c(e);
          });
      })();
    },
  ]);
})(jQueryNew);
