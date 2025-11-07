!(function (e) {
  var i;
  (i = function (e) {
    var i = /\+/g;
    function r(e) {
      return t.raw ? e : encodeURIComponent(e);
    }
    function n(e) {
      return t.raw ? e : decodeURIComponent(e);
    }
    function o(r, n) {
      var o = t.raw
        ? r
        : (function e(r) {
            0 === r.indexOf('"') &&
              (r = r.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
              return (
                (r = decodeURIComponent(r.replace(i, " "))),
                t.json ? JSON.parse(r) : r
              );
            } catch (n) {}
          })(r);
      return e.isFunction(n) ? n(o) : o;
    }
    var t = (e.cookie = function (i, c, s) {
      if (arguments.length > 1 && !e.isFunction(c)) {
        if ("number" == typeof (s = e.extend({}, t.defaults, s)).expires) {
          var u,
            a = s.expires,
            f = (s.expires = new Date());
          f.setMilliseconds(f.getMilliseconds() + 864e5 * a);
        }
        return (document.cookie = [
          r(i),
          "=",
          ((u = c), r(t.json ? JSON.stringify(u) : String(u))),
          s.expires ? "; expires=" + s.expires.toUTCString() : "",
          s.path ? "; path=" + s.path : "",
          s.domain ? "; domain=" + s.domain : "",
          s.secure ? "; secure" : "",
        ].join(""));
      }
      for (
        var p = i ? void 0 : {},
          l = document.cookie ? document.cookie.split("; ") : [],
          d = 0,
          x = l.length;
        d < x;
        d++
      ) {
        var v = l[d].split("="),
          j = n(v.shift()),
          y = v.join("=");
        if (i === j) {
          p = o(y, c);
          break;
        }
        i || void 0 === (y = o(y)) || (p[j] = y);
      }
      return p;
    });
    (t.defaults = {}),
      (e.removeCookie = function (i, r) {
        return e.cookie(i, "", e.extend({}, r, { expires: -1 })), !e.cookie(i);
      });
  }),
    "function" == typeof define && define.amd
      ? define(["jquery"], i)
      : "object" == typeof exports
      ? (module.exports = i(require("jquery")))
      : i(jQuery);
})(window.jQueryNew || window.jQuery);
