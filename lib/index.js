"use strict";

module.exports = function (e) {
  var t = {};

  function n(r) {
    if (t[r]) return t[r].exports;
    var o = t[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
  }

  return n.m = e, n.c = t, n.d = function (e, t, r) {
    n.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: r
    });
  }, n.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }, n.t = function (e, t) {
    if (1 & t && (e = n(e)), 8 & t) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var r = Object.create(null);
    if (n.r(r), Object.defineProperty(r, "default", {
      enumerable: !0,
      value: e
    }), 2 & t && "string" != typeof e) for (var o in e) n.d(r, o, function (t) {
      return e[t];
    }.bind(null, o));
    return r;
  }, n.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };
    return n.d(t, "a", t), t;
  }, n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, n.p = "", n(n.s = 10);
}([function (e, t) {
  e.exports = require("prop-types");
}, function (e, t) {
  e.exports = require("react");
}, function (e, t) {
  e.exports = require("react-dom");
}, function (e, t, n) {
  "use strict";

  e.exports = function (e) {
    var t = [];
    return t.toString = function () {
      return this.map(function (t) {
        var n = function (e, t) {
          var n = e[1] || "",
              r = e[3];
          if (!r) return n;

          if (t && "function" == typeof btoa) {
            var o = (a = r, c = btoa(unescape(encodeURIComponent(JSON.stringify(a)))), s = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(c), "/*# ".concat(s, " */")),
                i = r.sources.map(function (e) {
              return "/*# sourceURL=".concat(r.sourceRoot || "").concat(e, " */");
            });
            return [n].concat(i).concat([o]).join("\n");
          }

          var a, c, s;
          return [n].join("\n");
        }(t, e);

        return t[2] ? "@media ".concat(t[2], " {").concat(n, "}") : n;
      }).join("");
    }, t.i = function (e, n, r) {
      "string" == typeof e && (e = [[null, e, ""]]);
      var o = {};
      if (r) for (var i = 0; i < this.length; i++) {
        var a = this[i][0];
        null != a && (o[a] = !0);
      }

      for (var c = 0; c < e.length; c++) {
        var s = [].concat(e[c]);
        r && o[s[0]] || (n && (s[2] ? s[2] = "".concat(n, " and ").concat(s[2]) : s[2] = n), t.push(s));
      }
    }, t;
  };
}, function (e, t, n) {
  var r,
      o,
      i = {},
      a = (r = function r() {
    return window && document && document.all && !window.atob;
  }, function () {
    return void 0 === o && (o = r.apply(this, arguments)), o;
  }),
      c = function c(e, t) {
    return t ? t.querySelector(e) : document.querySelector(e);
  },
      s = function (e) {
    var t = {};
    return function (e, n) {
      if ("function" == typeof e) return e();

      if (void 0 === t[e]) {
        var r = c.call(this, e, n);
        if (window.HTMLIFrameElement && r instanceof window.HTMLIFrameElement) try {
          r = r.contentDocument.head;
        } catch (e) {
          r = null;
        }
        t[e] = r;
      }

      return t[e];
    };
  }(),
      u = null,
      l = 0,
      f = [],
      p = n(7);

  function d(e, t) {
    for (var n = 0; n < e.length; n++) {
      var r = e[n],
          o = i[r.id];

      if (o) {
        o.refs++;

        for (var a = 0; a < o.parts.length; a++) o.parts[a](r.parts[a]);

        for (; a < r.parts.length; a++) o.parts.push(v(r.parts[a], t));
      } else {
        var c = [];

        for (a = 0; a < r.parts.length; a++) c.push(v(r.parts[a], t));

        i[r.id] = {
          id: r.id,
          refs: 1,
          parts: c
        };
      }
    }
  }

  function y(e, t) {
    for (var n = [], r = {}, o = 0; o < e.length; o++) {
      var i = e[o],
          a = t.base ? i[0] + t.base : i[0],
          c = {
        css: i[1],
        media: i[2],
        sourceMap: i[3]
      };
      r[a] ? r[a].parts.push(c) : n.push(r[a] = {
        id: a,
        parts: [c]
      });
    }

    return n;
  }

  function b(e, t) {
    var n = s(e.insertInto);
    if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
    var r = f[f.length - 1];
    if ("top" === e.insertAt) r ? r.nextSibling ? n.insertBefore(t, r.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild), f.push(t);else if ("bottom" === e.insertAt) n.appendChild(t);else {
      if ("object" != typeof e.insertAt || !e.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
      var o = s(e.insertAt.before, n);
      n.insertBefore(t, o);
    }
  }

  function m(e) {
    if (null === e.parentNode) return !1;
    e.parentNode.removeChild(e);
    var t = f.indexOf(e);
    t >= 0 && f.splice(t, 1);
  }

  function h(e) {
    var t = document.createElement("style");

    if (void 0 === e.attrs.type && (e.attrs.type = "text/css"), void 0 === e.attrs.nonce) {
      var r = function () {
        0;
        return n.nc;
      }();

      r && (e.attrs.nonce = r);
    }

    return g(t, e.attrs), b(e, t), t;
  }

  function g(e, t) {
    Object.keys(t).forEach(function (n) {
      e.setAttribute(n, t[n]);
    });
  }

  function v(e, t) {
    var n, r, o, i;

    if (t.transform && e.css) {
      if (!(i = "function" == typeof t.transform ? t.transform(e.css) : t.transform.default(e.css))) return function () {};
      e.css = i;
    }

    if (t.singleton) {
      var a = l++;
      n = u || (u = h(t)), r = j.bind(null, n, a, !1), o = j.bind(null, n, a, !0);
    } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = function (e) {
      var t = document.createElement("link");
      return void 0 === e.attrs.type && (e.attrs.type = "text/css"), e.attrs.rel = "stylesheet", g(t, e.attrs), b(e, t), t;
    }(t), r = S.bind(null, n, t), o = function o() {
      m(n), n.href && URL.revokeObjectURL(n.href);
    }) : (n = h(t), r = x.bind(null, n), o = function o() {
      m(n);
    });

    return r(e), function (t) {
      if (t) {
        if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
        r(e = t);
      } else o();
    };
  }

  e.exports = function (e, t) {
    if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
    (t = t || {}).attrs = "object" == typeof t.attrs ? t.attrs : {}, t.singleton || "boolean" == typeof t.singleton || (t.singleton = a()), t.insertInto || (t.insertInto = "head"), t.insertAt || (t.insertAt = "bottom");
    var n = y(e, t);
    return d(n, t), function (e) {
      for (var r = [], o = 0; o < n.length; o++) {
        var a = n[o];
        (c = i[a.id]).refs--, r.push(c);
      }

      e && d(y(e, t), t);

      for (o = 0; o < r.length; o++) {
        var c;

        if (0 === (c = r[o]).refs) {
          for (var s = 0; s < c.parts.length; s++) c.parts[s]();

          delete i[c.id];
        }
      }
    };
  };

  var O,
      w = (O = [], function (e, t) {
    return O[e] = t, O.filter(Boolean).join("\n");
  });

  function j(e, t, n, r) {
    var o = n ? "" : r.css;
    if (e.styleSheet) e.styleSheet.cssText = w(t, o);else {
      var i = document.createTextNode(o),
          a = e.childNodes;
      a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(i, a[t]) : e.appendChild(i);
    }
  }

  function x(e, t) {
    var n = t.css,
        r = t.media;
    if (r && e.setAttribute("media", r), e.styleSheet) e.styleSheet.cssText = n;else {
      for (; e.firstChild;) e.removeChild(e.firstChild);

      e.appendChild(document.createTextNode(n));
    }
  }

  function S(e, t, n) {
    var r = n.css,
        o = n.sourceMap,
        i = void 0 === t.convertToAbsoluteUrls && o;
    (t.convertToAbsoluteUrls || i) && (r = p(r)), o && (r += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */");
    var a = new Blob([r], {
      type: "text/css"
    }),
        c = e.href;
    e.href = URL.createObjectURL(a), c && URL.revokeObjectURL(c);
  }
}, function (e, t, n) {
  var r = n(6);
  "string" == typeof r && (r = [[e.i, r, ""]]);
  var o = {
    hmr: !0,
    transform: void 0,
    insertInto: void 0
  };
  n(4)(r, o);
  r.locals && (e.exports = r.locals);
}, function (e, t, n) {
  (t = n(3)(!1)).push([e.i, ".scale-view-container {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: 100vw;\n  height: 100vh;\n}\n\n.scale-view-container__content {\n  position: relative;\n  overflow: hidden;\n  background-size: 100%;\n  transform-origin: 0 0;\n  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);\n  transition: all 0.3s linear;\n}\n", ""]), e.exports = t;
}, function (e, t) {
  e.exports = function (e) {
    var t = "undefined" != typeof window && window.location;
    if (!t) throw new Error("fixUrls requires window.location");
    if (!e || "string" != typeof e) return e;
    var n = t.protocol + "//" + t.host,
        r = n + t.pathname.replace(/\/[^\/]*$/, "/");
    return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (e, t) {
      var o,
          i = t.trim().replace(/^"(.*)"$/, function (e, t) {
        return t;
      }).replace(/^'(.*)'$/, function (e, t) {
        return t;
      });
      return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i) ? e : (o = 0 === i.indexOf("//") ? i : 0 === i.indexOf("/") ? n + i : r + i.replace(/^\.\//, ""), "url(" + JSON.stringify(o) + ")");
    });
  };
}, function (e, t, n) {
  var r = n(9);
  "string" == typeof r && (r = [[e.i, r, ""]]);
  var o = {
    hmr: !0,
    transform: void 0,
    insertInto: void 0
  };
  n(4)(r, o);
  r.locals && (e.exports = r.locals);
}, function (e, t, n) {
  (t = n(3)(!1)).push([e.i, ".scale-view-item__container {\n  position: absolute;\n}\n\n.scale-view-item__content {\n  position: relative;\n  height: 100%;\n}\n", ""]), e.exports = t;
}, function (e, t, n) {
  "use strict";

  n.r(t), n.d(t, "ScaleViewContainer", function () {
    return I;
  }), n.d(t, "ScaleViewItem", function () {
    return le;
  }), n.d(t, "ScaleViewContext", function () {
    return c;
  }), n.d(t, "useSize", function () {
    return B;
  }), n.d(t, "withSize", function () {
    return F;
  });
  var r = n(1),
      o = n.n(r),
      i = n(0),
      a = n.n(i);
  var c = o.a.createContext({
    size: {}
  });

  function s(e, t, n, r, o, i, a) {
    try {
      var c = e[i](a),
          s = c.value;
    } catch (e) {
      return void n(e);
    }

    c.done ? t(s) : Promise.resolve(s).then(r, o);
  }

  function u(e) {
    return function () {
      var t = this,
          n = arguments;
      return new Promise(function (r, o) {
        var i = e.apply(t, n);

        function a(e) {
          s(i, r, o, a, c, "next", e);
        }

        function c(e) {
          s(i, r, o, a, c, "throw", e);
        }

        a(void 0);
      });
    };
  }

  function l(e, t) {
    var n = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, r);
    }

    return n;
  }

  function f(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? l(Object(n), !0).forEach(function (t) {
        p(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : l(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }

    return e;
  }

  function p(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }

  const d = e => e ? "number" == typeof e ? e + "px" : (e.endsWith("%") || e.endsWith("px"), e) : 0;

  function y(e, t) {
    let n = e.transformOrigin;
    if (n) return {
      transformOrigin: n
    };
    if (t && t.from) switch (t.from) {
      case "top":
        return {
          transformOrigin: "0 0"
        };

      case "bottom":
        return {
          transformOrigin: "0 100%"
        };

      case "left":
        return {
          transformOrigin: "0 50%"
        };

      case "right":
        return {
          transformOrigin: "100% 50%"
        };

      default:
        return {
          transformOrigin: "50% 50%"
        };
    }
    return {
      transformOrigin: "0% 0%"
    };
  }

  const b = e => {
    if (!e) return {};

    const t = function (e) {
      const t = /scale\((.*)\)/.exec(e);
      return t ? t[1].split(",").map(parseFloat) : [1, 1];
    }(e.style.transform),
          n = e.style.transformOrigin.split(" ");

    return {
      left: e.offsetLeft,
      top: e.offsetTop,
      width: e.offsetWidth,
      height: e.offsetHeight,
      scaleX: t[0],
      scaleY: t[1],
      parent: e.offsetParent,
      transformOrigin: n,
      node: e
    };
  },
        m = function () {
    var e = u(regeneratorRuntime.mark(function e(t, n) {
      var r, o;
      return regeneratorRuntime.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            if (r = function () {
              var e = u(regeneratorRuntime.mark(function e(t) {
                return regeneratorRuntime.wrap(function (e) {
                  for (;;) switch (e.prev = e.next) {
                    case 0:
                      return e.abrupt("return", new Promise(e => {
                        let n = null;

                        const r = (t, o = 0) => {
                          setTimeout(() => {
                            n = document.getElementById(t), n ? e(n) : 3 === o ? e(null) : r(t, o + 1);
                          }, 0);
                        };

                        r(t, 0);
                      }));

                    case 1:
                    case "end":
                      return e.stop();
                  }
                }, e);
              }));
              return function (t) {
                return e.apply(this, arguments);
              };
            }(), t !== n) {
              e.next = 4;
              break;
            }

            return console.error("relationId不能是组件本身"), e.abrupt("return", {});

          case 4:
            return e.next = 6, r(t);

          case 6:
            if (o = e.sent) {
              e.next = 10;
              break;
            }

            return console.error("找不到相对组件或关系不正确"), e.abrupt("return", {});

          case 10:
            return e.abrupt("return", b(o));

          case 11:
          case "end":
            return e.stop();
        }
      }, e);
    }));
    return function (t, n) {
      return e.apply(this, arguments);
    };
  }(),
        h = e => {
    const t = e.transformOrigin,
          n = e.height;

    if (t[1].endsWith("%")) {
      return parseFloat(t[1]) / 100;
    }

    return parseFloat(t[1]) / n;
  },
        g = e => {
    const t = e.transformOrigin,
          n = e.width;

    if (t[0].endsWith("%")) {
      return parseFloat(t[0]) / 100;
    }

    return parseFloat(t[0]) / n;
  },
        v = function () {
    var e = u(regeneratorRuntime.mark(function e(t) {
      var n, r, o, i, a, c, s, l;
      return regeneratorRuntime.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            if (n = t.relations, r = void 0 === n ? {} : n, o = t.id, i = t.scales, a = t.transformOrigin, c = t.size, s = t.el, 0 !== [...new Set(Object.values(r))].length) {
              e.next = 4;
              break;
            }

            return e.abrupt("return", {});

          case 4:
            return l = function () {
              var e = u(regeneratorRuntime.mark(function e() {
                return regeneratorRuntime.wrap(function (e) {
                  for (;;) switch (e.prev = e.next) {
                    case 0:
                      return e.abrupt("return", new Promise(e => {
                        const t = {},
                              n = Object.entries(r);
                        0 === n.length && e(t);
                        let l = null,
                            f = null,
                            p = null,
                            d = null;
                        n.forEach(function () {
                          var r = u(regeneratorRuntime.mark(function r(u, y) {
                            var b, v, O, w, j, x;
                            return regeneratorRuntime.wrap(function (r) {
                              for (;;) switch (r.prev = r.next) {
                                case 0:
                                  return r.next = 2, m(u[1], o);

                                case 2:
                                  b = r.sent, v = h(b), O = g(b), w = 0, j = 0, r.t0 = u[0], r.next = "layoutBelow" === r.t0 ? 10 : "layoutAbove" === r.t0 ? 13 : "toLeftOf" === r.t0 ? 16 : "toRightOf" === r.t0 ? 19 : "alignLeft" === r.t0 ? 22 : "alignRight" === r.t0 ? 25 : "alignTop" === r.t0 ? 28 : "alignBottom" === r.t0 ? 31 : 34;
                                  break;

                                case 10:
                                  return w = b.height * (1 - b.scaleY) * (1 - v), p = b.top + b.height - w, r.abrupt("break", 35);

                                case 13:
                                  return w = b.height * (1 - b.scaleY) * v, d = b.parent.offsetHeight - b.top - w, r.abrupt("break", 35);

                                case 16:
                                  return j = b.width * (1 - b.scaleX) * O, f = b.parent.offsetWidth - b.left - j, r.abrupt("break", 35);

                                case 19:
                                  return j = b.width * (1 - b.scaleX) * (1 - O), l = b.left + b.width - j, r.abrupt("break", 35);

                                case 22:
                                  return j = b.width * (1 - b.scaleX) * O, l = b.left + j, r.abrupt("break", 35);

                                case 25:
                                  return j = b.width * (1 - b.scaleX) * O, f = b.parent.offsetWidth - b.left - b.width * b.scaleX - j, r.abrupt("break", 35);

                                case 28:
                                  return w = b.height * (1 - b.scaleY) * v, p = b.top + w, r.abrupt("break", 35);

                                case 31:
                                  return w = b.height * (1 - b.scaleY) * v, d = b.parent.offsetHeight - b.top - b.height * b.scaleY - w, r.abrupt("break", 35);

                                case 34:
                                  return r.abrupt("break", 35);

                                case 35:
                                  n.length === y + 1 && (x = () => (s.current.style.transformOrigin || a.transformOrigin).split(" "), (() => {
                                    const e = x();
                                    let n = 0,
                                        r = 0;
                                    const o = c.width,
                                          a = c.height,
                                          u = i[0],
                                          y = i[1],
                                          b = s.current.style,
                                          m = b.width,
                                          h = b.height,
                                          g = parseInt(m) || o - l - f,
                                          v = parseInt(h) || a - p - d;

                                    if (n = e[0].endsWith("%") ? parseFloat(e[0]) / 100 : parseFloat(e[0]) / g, r = e[1].endsWith("%") ? parseFloat(e[1]) / 100 : parseFloat(e[1]) / v, null != l) {
                                      l -= g * (1 - u) * n, t.left = l;
                                    }

                                    if (null != f) {
                                      f -= g * (1 - u) * (1 - n), t.right = f;
                                    }

                                    if (null != p) {
                                      p -= v * (1 - y) * r, t.top = p;
                                    }

                                    if (null != d) {
                                      d -= v * (1 - y) * (1 - r), t.bottom = d;
                                    }
                                  })(), e(t));

                                case 36:
                                case "end":
                                  return r.stop();
                              }
                            }, r);
                          }));
                          return function (e, t) {
                            return r.apply(this, arguments);
                          };
                        }());
                      }));

                    case 1:
                    case "end":
                      return e.stop();
                  }
                }, e);
              }));
              return function () {
                return e.apply(this, arguments);
              };
            }(), e.abrupt("return", l());

          case 6:
          case "end":
            return e.stop();
        }
      }, e);
    }));
    return function (t) {
      return e.apply(this, arguments);
    };
  }(),
        O = e => {
    const t = e.relateStyle,
          n = e.el,
          r = e.transition,
          o = e.scales,
          i = e.afterStyle;
    let a = f(f({}, i), t);
    const c = n.current || {},
          s = a.transform;
    return f(f({}, a), {}, {
      transform: "scale(".concat(o[0], ", ").concat(o[1], ") ").concat(s || "")
    }, y(f(f({}, c.style), i), r));
  },
        w = e => {
    const t = e.mode,
          n = e.size,
          r = e.transition,
          o = e.style;
    let i = [],
        a = o,
        c = {};

    switch (t) {
      case "fixed":
        c = (e => {
          const t = e.size,
                n = e.style,
                r = t.scaleX,
                o = t.scaleY;
          return {
            scale: [1 / r, 1 / o],
            style: {
              width: "calc(".concat(d(n.width), " * ").concat(r, ")"),
              height: "calc(".concat(d(n.height), " * ").concat(o, ")")
            }
          };
        })({
          size: n,
          style: o
        }), i = c.scale, a = f(f({}, a), c.style);
        break;

      case "scaleXFix":
        i = (e => {
          const t = e.size,
                n = t.scaleX;
          return [t.scaleY / n, 1];
        })({
          size: n
        });

        break;

      case "scaleYFix":
        i = (e => {
          const t = e.size;
          return [1, t.scaleX / t.scaleY];
        })({
          size: n
        });

        break;

      case "adaptWidth":
        c = (e => {
          const t = e.size,
                n = e.style,
                r = t.scaleX / t.scaleY;
          return r >= 1 ? {
            scale: [1 / r, 1],
            style: {
              width: "calc(".concat(d(n.width), " * ").concat(r, ")")
            }
          } : {
            scale: [1, r]
          };
        })({
          size: n,
          style: o
        }), i = c.scale, a = f(f({}, a), c.style);
        break;

      case "adaptHeight":
        c = (e => {
          const t = e.size,
                n = e.style,
                r = t.scaleX / t.scaleY;
          return r >= 1 ? {
            scale: [1 / r, 1]
          } : {
            scale: [1, r],
            style: {
              width: "calc(".concat(d(n.height), " * ").concat(r, ")")
            }
          };
        })({
          size: n,
          style: o
        }), i = c.scale, a = f(f({}, a), c.style);
        break;

      default:
        i = [1, 1];
    }

    return {
      scales: i,
      transformOrigin: y(o, r),
      afterStyle: a
    };
  };

  n(5);

  function j(e, t, n, r, o, i, a) {
    try {
      var c = e[i](a),
          s = c.value;
    } catch (e) {
      return void n(e);
    }

    c.done ? t(s) : Promise.resolve(s).then(r, o);
  }

  function x(e) {
    return function () {
      var t = this,
          n = arguments;
      return new Promise(function (r, o) {
        var i = e.apply(t, n);

        function a(e) {
          j(i, r, o, a, c, "next", e);
        }

        function c(e) {
          j(i, r, o, a, c, "throw", e);
        }

        a(void 0);
      });
    };
  }

  function S(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, t) {
      if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return;
      var n = [],
          r = !0,
          o = !1,
          i = void 0;

      try {
        for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
      } catch (e) {
        o = !0, i = e;
      } finally {
        try {
          r || null == c.return || c.return();
        } finally {
          if (o) throw i;
        }
      }

      return n;
    }(e, t) || function (e, t) {
      if (!e) return;
      if ("string" == typeof e) return E(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === n && e.constructor && (n = e.constructor.name);
      if ("Map" === n || "Set" === n) return Array.from(e);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return E(e, t);
    }(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }

  function E(e, t) {
    (null == t || t > e.length) && (t = e.length);

    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];

    return r;
  }

  function P(e, t) {
    var n = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, r);
    }

    return n;
  }

  function R(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? P(Object(n), !0).forEach(function (t) {
        C(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : P(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }

    return e;
  }

  function C(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }

  const T = e => {
    const t = e.config,
          n = e.el,
          o = e.container,
          i = e.content,
          a = S(Object(r.useState)({
      width: parseInt(t.width),
      height: parseInt(t.height),
      scaleX: 1,
      scaleY: 1
    }), 2),
          c = a[0],
          s = a[1],
          u = Object(r.useRef)(0),
          l = Object(r.useRef)(null);
    return Object(r.useEffect)(() => (u.current = 1, () => {
      u.current = 0;
    }), []), Object(r.useEffect)(() => {
      const e = function () {
        var e = x(regeneratorRuntime.mark(function e() {
          return regeneratorRuntime.wrap(function (e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.abrupt("return", new Promise(e => {
                  const t = () => {
                    clearTimeout(l.current), n.current ? e(n.current) : l.current = setTimeout(() => {
                      t();
                    }, 0);
                  };

                  t();
                }));

              case 1:
              case "end":
                return e.stop();
            }
          }, e);
        }));
        return function () {
          return e.apply(this, arguments);
        };
      }(),
            r = function () {
        var n = x(regeneratorRuntime.mark(function n() {
          var r, a, u, l, f, p, d, y, b;
          return regeneratorRuntime.wrap(function (n) {
            for (;;) switch (n.prev = n.next) {
              case 0:
                return n.next = 2, e();

              case 2:
                r = n.sent, a = r.clientWidth, u = r.clientHeight, l = c.width, f = c.height, p = c.scaleX, d = c.scaleY, y = "hidden", b = "hidden", n.t0 = t.scaleType, n.next = "ADAPT_WIDTH" === n.t0 ? 11 : "ADAPT_HEIGHT" === n.t0 ? 16 : 21;
                break;

              case 11:
                return p = a / l, d = a / l, y = "auto", b = "hidden", n.abrupt("break", 24);

              case 16:
                return p = u / f, d = u / f, y = "auto", b = "hidden", n.abrupt("break", 24);

              case 21:
                return p = a / l, d = u / f, n.abrupt("break", 24);

              case 24:
                i.setContentConfig({
                  transform: "scale(".concat(p, ", ").concat(d, ")")
                }), o.setContainerConfig({
                  overflowX: y,
                  overflowY: b
                }), s({
                  scaleX: p,
                  scaleY: d,
                  width: l,
                  height: f
                });

              case 27:
              case "end":
                return n.stop();
            }
          }, n);
        }));
        return function () {
          return n.apply(this, arguments);
        };
      }(),
            a = function (e, t) {
        let n = null;
        return function (...r) {
          clearTimeout(n), n = setTimeout(() => {
            e.call(this, ...r);
          }, t);
        };
      }(r, 200);

      return 1 === u.current && window.addEventListener("resize", a), u.current++, r(), () => {
        0 === u.current && window.removeEventListener("resize", a), clearTimeout(l.current);
      };
    }, [t]), c;
  },
        k = e => {
    const t = e.config,
          n = e.el,
          o = (() => {
      const e = {
        overflowX: "hidden",
        overflowY: "hidden"
      },
            t = Object(r.useRef)(e);
      return {
        containerConfig: t.current,
        setContainerConfig: n => {
          t.current = R(R({}, e), n);
        }
      };
    })(),
          i = (e => {
      const t = e.config,
            n = {
        width: t.width,
        height: t.height,
        transform: "scale(1,1)"
      },
            o = Object(r.useRef)(n);
      return {
        contentConfig: o.current,
        setContentConfig: e => {
          o.current = R(R({}, n), e);
        }
      };
    })({
      config: t
    });

    return {
      size: T({
        config: t,
        container: o,
        content: i,
        el: n
      }),
      containerConfig: o.containerConfig,
      contentConfig: i.contentConfig
    };
  },
        A = e => {
    const t = e.config,
          n = e.children,
          i = e.className,
          a = e.style,
          s = e.contentId,
          u = e.contentClass,
          l = e.contentStyle,
          f = Object(r.useRef)(null),
          p = k({
      config: t,
      el: f
    }),
          d = p.containerConfig,
          y = p.contentConfig,
          b = p.size;
    return o.a.createElement(c.Provider, {
      value: {
        size: b
      }
    }, o.a.createElement("div", {
      ref: f,
      className: ["scale-view-container", i].filter(Boolean).join(" "),
      style: R(R({}, d), a)
    }, o.a.createElement("div", {
      id: s,
      className: ["scale-view-container__content", u].filter(Boolean).join(" "),
      style: R(R({}, y), l)
    }, n)));
  };

  A.propTypes = {
    children: a.a.element.isRequired,
    config: a.a.shape({
      width: a.a.number.isRequired,
      height: a.a.number.isRequired,
      scaleType: a.a.string.isRequired
    }).isRequired,
    className: a.a.any,
    style: a.a.object,
    contentId: a.a.oneOfType([a.a.string, a.a.number]),
    contentClass: a.a.any,
    contentStyle: a.a.object
  }, A.defaultProps = {
    config: {
      width: 1920,
      height: 1080,
      scaleType: "FULL_SCREEN"
    }
  };
  var I = A,
      D = n(2),
      z = n.n(D);

  function L() {
    return (L = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }

      return e;
    }).apply(this, arguments);
  }

  function X(e, t) {
    var n = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, r);
    }

    return n;
  }

  function N(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? X(Object(n), !0).forEach(function (t) {
        U(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : X(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }

    return e;
  }

  function U(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }

  function Y(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, t) {
      if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return;
      var n = [],
          r = !0,
          o = !1,
          i = void 0;

      try {
        for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
      } catch (e) {
        o = !0, i = e;
      } finally {
        try {
          r || null == c.return || c.return();
        } finally {
          if (o) throw i;
        }
      }

      return n;
    }(e, t) || function (e, t) {
      if (!e) return;
      if ("string" == typeof e) return M(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === n && e.constructor && (n = e.constructor.name);
      if ("Map" === n || "Set" === n) return Array.from(e);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return M(e, t);
    }(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }

  function M(e, t) {
    (null == t || t > e.length) && (t = e.length);

    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];

    return r;
  }

  const _ = e => {
    const t = Y(Object(r.useReducer)(function (e, t) {
      return N(N({}, e), {}, t ? {
        show: !0
      } : {
        show: !1
      });
    }, e), 2),
          n = t[0],
          o = t[1],
          i = Y(Object(r.useState)(() => function (e) {
      const t = e.anim,
            n = void 0 === t ? "opacity" : t,
            r = e.from,
            o = (e.delay, e.timeout),
            i = void 0 === o ? 0 : o;
      let a = {};

      switch (n) {
        case "slide":
          a = function (e, t, n) {
            let r = {},
                o = "";

            switch (e) {
              case "left":
                o = {
                  transform: "translateX(-100%)",
                  opacity: 0
                }, r = {
                  entering: {
                    transform: "translateX(0)",
                    opacity: 1
                  },
                  entered: {
                    transform: "translateX(0)",
                    opacity: 1
                  },
                  exiting: {
                    transform: "translateX(-100%)",
                    opacity: 0
                  },
                  exited: {
                    transform: "translateX(-100%)",
                    opacity: 0
                  }
                };
                break;

              case "right":
                o = {
                  transform: "translateX(100%)",
                  opacity: 0
                }, r = {
                  entering: {
                    transform: "translateX(0)",
                    opacity: 1
                  },
                  entered: {
                    transform: "translateX(0)",
                    opacity: 1
                  },
                  exiting: {
                    transform: "translateX(100%)",
                    opacity: 0
                  },
                  exited: {
                    transform: "translateX(100%)",
                    opacity: 0
                  }
                };
                break;

              case "top":
                o = {
                  transform: "translateY(-100%)",
                  opacity: 0
                }, r = {
                  entering: {
                    transform: "translateY(0)",
                    opacity: 1
                  },
                  entered: {
                    transform: "translateY(0)",
                    opacity: 1
                  },
                  exiting: {
                    transform: "translateY(-100%)",
                    opacity: 0
                  },
                  exited: {
                    transform: "translateY(-100%)",
                    opacity: 0
                  }
                };
                break;

              case "bottom":
                o = {
                  transform: "translateY(100%)",
                  opacity: 0
                }, r = {
                  entering: {
                    transform: "translateY(0)",
                    opacity: 1
                  },
                  entered: {
                    transform: "translateY(0)",
                    opacity: 1
                  },
                  exiting: {
                    transform: "translateY(100%)",
                    opacity: 0
                  },
                  exited: {
                    transform: "translateY(100%)",
                    opacity: 0
                  }
                };
            }

            return {
              defaultTransitionStyle: f({
                transition: "all ".concat(n, "ms ease-in")
              }, o),
              transitionStyle: r
            };
          }(r, 0, i);

          break;

        case "opacity":
          a = function (e, t) {
            return {
              defaultTransitionStyle: f({
                transition: "opacity ".concat(t, "ms ease-in-out")
              }, {
                opacity: 0
              }),
              transitionStyle: {
                entering: {
                  opacity: 1
                },
                entered: {
                  opacity: 1
                },
                exiting: {
                  opacity: 0
                },
                exited: {
                  opacity: 0
                }
              }
            };
          }(0, i);

      }

      const c = a,
            s = c.defaultTransitionStyle,
            u = c.transitionStyle;
      return {
        defaultContentStyle: s,
        transitionContentStyle: u
      };
    }(e)), 1)[0],
          a = Object(r.useRef)(null);
    return Object(r.useEffect)(() => () => {
      clearTimeout(a.current);
    }, []), {
      transitionProps: n,
      transitionStyle: i,
      onEnter: () => {
        const e = n.delay;
        a.current = setTimeout(() => {
          o(!0);
        }, e);
      }
    };
  },
        B = () => Object(r.useContext)(c).size,
        F = e => t => {
    const n = B();
    return o.a.createElement(e, L({}, t, {
      size: n
    }));
  };

  function q(e, t) {
    var n = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, r);
    }

    return n;
  }

  function W(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }

  function H(e, t) {
    if (null == e) return {};

    var n,
        r,
        o = function (e, t) {
      if (null == e) return {};
      var n,
          r,
          o = {},
          i = Object.keys(e);

      for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (o[n] = e[n]);

      return o;
    }(e, t);

    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(e);

      for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
    }

    return o;
  }

  function V(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, t) {
      if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return;
      var n = [],
          r = !0,
          o = !1,
          i = void 0;

      try {
        for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
      } catch (e) {
        o = !0, i = e;
      } finally {
        try {
          r || null == c.return || c.return();
        } finally {
          if (o) throw i;
        }
      }

      return n;
    }(e, t) || function (e, t) {
      if (!e) return;
      if ("string" == typeof e) return $(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === n && e.constructor && (n = e.constructor.name);
      if ("Map" === n || "Set" === n) return Array.from(e);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $(e, t);
    }(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }

  function $(e, t) {
    (null == t || t > e.length) && (t = e.length);

    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];

    return r;
  }

  const G = e => {
    const t = Object(r.useRef)(null),
          n = Object(r.useRef)(null),
          i = V(Object(r.useState)(() => e.in ? e.appear ? (t.current = "entering", "exited") : "entered" : e.unmountOnExit || e.mountOnEnter ? "unmounted" : "exited"), 2),
          a = i[0],
          c = i[1];
    Object(r.useEffect)(() => (u(!0, t.current), () => {
      p();
    }), []), Object(r.useEffect)(() => {
      let t = null;
      e.in ? "entering" !== a && "entered" !== a && (t = "entering") : "entering" !== a && "entered" !== a || (t = "exited"), u(!1, t);
    }, [e]);

    const s = () => {
      const t = e.timeout;
      let n, r, o;
      return n = r = o = t, null != t && "number" != typeof t && (n = t.exit, r = t.enter, o = void 0 !== t.appear ? t.appear : r), {
        exit: n,
        enter: r,
        appear: o
      };
    },
          u = (t = !1, n) => {
      null !== n ? (p(), "entering" === n ? l(t) : f()) : e.unmountOnExit && "exited" === a && c("unmounted");
    },
          l = t => {
      const n = e.enter,
            r = t,
            o = V(e.nodeRef ? [r] : [z.a.findDOMNode(void 0), r], 2),
            i = o[0],
            a = o[1],
            c = s(),
            u = r ? c.appear : c.enter;
      t || n ? (e.onEnter(i, a), d("entering", () => {
        e.onEntering(i, a), b(u, () => {
          d("entered", () => {
            e.onEntered(i, a);
          });
        });
      })) : d("entered", () => {
        e.onEntered(i);
      });
    },
          f = () => {
      const t = e.exit,
            n = s(),
            r = e.nodeRef ? void 0 : z.a.findDOMNode(void 0);
      t ? (e.onExit(r), d("exiting", () => {
        e.onExiting(r), b(n.exit, () => {
          d("exited", () => {
            e.onExited(r);
          });
        });
      })) : d("exited", () => {
        e.onExited(r);
      });
    },
          p = () => {
      null !== n.current && (n.current.cancel(), n.current = null);
    },
          d = (e, t) => {
      t = y(t), c(e), t && t();
    },
          y = e => {
      let t = !0;
      return n.current = r => {
        t && (t = !1, n.current = null, e(r));
      }, n.current.cancel = () => {
        t = !1;
      }, n.current;
    },
          b = (t, r) => {
      y(r);
      const o = e.nodeRef ? e.nodeRef.current : z.a.findDOMNode(void 0),
            i = null == t && !e.addEndListener;

      if (o && !i) {
        if (e.addEndListener) {
          const t = V(e.nodeRef ? [n.current] : [o, n.current], 2),
                r = t[0],
                i = t[1];
          e.addEndListener(r, i);
        }

        null != t && setTimeout(n.current, t);
      } else setTimeout(n.current, 0);
    },
          m = e.children,
          h = (e.in, H(e, ["children", "in"]));

    return "unmounted" === a ? null : o.a.createElement(o.a.Fragment, null, "function" == typeof m ? m(a, h) : o.a.cloneElement(o.a.Children.only(m), h));
  };

  G.UNMOUNTED = "unmounted", G.EXITED = "exited", G.ENTERING = "entering", G.ENTERED = "entered", G.EXITING = "exiting";

  var J = e => {
    const t = function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? q(Object(n), !0).forEach(function (t) {
          W(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : q(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }

      return e;
    }({
      in: void 0 !== e.in && e.in,
      mountOnEnter: void 0 !== e.mountOnEnter && e.mountOnEnter,
      unmountOnExit: void 0 !== e.unmountOnExit && e.unmountOnExit,
      appear: void 0 !== e.appear && e.appear,
      enter: void 0 === e.enter || e.enter,
      exit: void 0 === e.exit || e.exit,
      onEnter: e.onEnter || (() => {}),
      onEntering: e.onEntering || (() => {}),
      onEntered: e.onEntered || (() => {}),
      onExit: e.onExit || (() => {}),
      onExiting: e.onExiting || (() => {}),
      onExited: e.onExited || (() => {})
    }, e);

    return o.a.createElement(G, t);
  };

  const K = a.a.shape({
    anim: a.a.string.isRequired,
    from: a.a.string,
    timeout: a.a.number,
    delay: a.a.number
  }),
        Q = a.a.shape({
    layoutBelow: a.a.string,
    layoutAbove: a.a.string,
    toLeftOf: a.a.string,
    toRightOf: a.a.string,
    alignTop: a.a.string,
    alignBottom: a.a.string,
    alignLeft: a.a.string,
    alignRight: a.a.string
  });
  n(8);

  function Z() {
    return (Z = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }

      return e;
    }).apply(this, arguments);
  }

  function ee(e, t, n, r, o, i, a) {
    try {
      var c = e[i](a),
          s = c.value;
    } catch (e) {
      return void n(e);
    }

    c.done ? t(s) : Promise.resolve(s).then(r, o);
  }

  function te(e) {
    return function () {
      var t = this,
          n = arguments;
      return new Promise(function (r, o) {
        var i = e.apply(t, n);

        function a(e) {
          ee(i, r, o, a, c, "next", e);
        }

        function c(e) {
          ee(i, r, o, a, c, "throw", e);
        }

        a(void 0);
      });
    };
  }

  function ne(e, t) {
    var n = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, r);
    }

    return n;
  }

  function re(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? ne(Object(n), !0).forEach(function (t) {
        oe(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ne(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }

    return e;
  }

  function oe(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }

  function ie(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, t) {
      if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return;
      var n = [],
          r = !0,
          o = !1,
          i = void 0;

      try {
        for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
      } catch (e) {
        o = !0, i = e;
      } finally {
        try {
          r || null == c.return || c.return();
        } finally {
          if (o) throw i;
        }
      }

      return n;
    }(e, t) || function (e, t) {
      if (!e) return;
      if ("string" == typeof e) return ae(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === n && e.constructor && (n = e.constructor.name);
      if ("Map" === n || "Set" === n) return Array.from(e);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ae(e, t);
    }(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }

  function ae(e, t) {
    (null == t || t > e.length) && (t = e.length);

    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];

    return r;
  }

  const ce = e => {
    const t = e.children,
          n = e.contentClass,
          r = e.contentStyle,
          i = e.defaultContentStyle,
          a = e.transitionContentStyle,
          c = e.transitionProps;
    return o.a.createElement(J, {
      in: c.show,
      timeout: c.timeout
    }, e => o.a.createElement("div", {
      style: re(re(re({}, i), a[e]), r),
      className: ["scale-view-item__content", n].filter(Boolean).join(" ")
    }, t));
  },
        se = e => {
    const t = e.config,
          n = void 0 === t ? {} : t,
          i = e.className,
          a = e.contentClass,
          c = e.size,
          s = e.children,
          u = re(re({}, e.style), n.style),
          l = re(re({}, e.contentStyle), n.contentStyle),
          f = e.mode || n.mode || "",
          p = e.id || n.id,
          d = e.relations || n.relations || {},
          y = e.getContainer || n.getContainer,
          b = Object(r.useRef)(null),
          m = e.transition || n.transition || {};
    var h;
    h = b, Object(r.useEffect)(() => {
      !function e(t) {
        t !== document.body && ("data-view-item" !== t.dataset.symbol ? e(t.parentNode) : console.error("ScaleViewItem不允许嵌套ScaleViewItem"));
      }(h.current.parentNode);
    }, [h]);

    const g = (e => {
      const t = e.size,
            n = e.el,
            o = e.mode,
            i = e.transition,
            a = e.style,
            c = ie(Object(r.useState)({}), 2),
            s = c[0],
            u = c[1],
            l = _(re({
        anim: "opacity",
        delay: 0,
        timeout: 0,
        show: !1
      }, i));

      return Object(r.useMemo)(te(regeneratorRuntime.mark(function r() {
        var c, s, f, p, d, y;
        return regeneratorRuntime.wrap(function (r) {
          for (;;) switch (r.prev = r.next) {
            case 0:
              return c = w({
                mode: o,
                style: a,
                transition: i,
                size: t
              }), s = c.scales, f = c.transformOrigin, p = c.afterStyle, r.next = 3, v(re({
                scales: s,
                transformOrigin: f
              }, e));

            case 3:
              d = r.sent, y = O({
                el: n,
                afterStyle: p,
                relateStyle: d,
                scales: s,
                transition: i
              }), u(y), l.onEnter();

            case 7:
            case "end":
              return r.stop();
          }
        }, r);
      })), [t]), re({
        containerStyle: s,
        transitionProps: l.transitionProps
      }, l.transitionStyle);
    })({
      size: c,
      el: b,
      mode: f,
      relations: d,
      transition: m,
      style: u
    }),
          j = g.containerStyle,
          x = g.defaultContentStyle,
          S = g.transitionContentStyle,
          E = g.transitionProps,
          P = () => o.a.createElement("div", {
      id: p,
      "data-symbol": "data-view-item",
      style: re({}, j),
      ref: b,
      className: ["scale-view-item__container", i].filter(Boolean).join(" ")
    }, o.a.createElement(ce, {
      contentClass: a,
      contentStyle: l,
      defaultContentStyle: x,
      transitionContentStyle: S,
      transitionProps: E
    }, s));

    return y ? z.a.createPortal(P(), "function" == typeof y ? y() : y) : P();
  },
        ue = e => o.a.createElement(c.Consumer, null, ({
    size: t
  }) => o.a.createElement(se, Z({}, e, {
    size: t
  })));

  ue.propTypes = {
    id: a.a.oneOfType([a.a.number, a.a.string]),
    mode: a.a.string,
    transition: K,
    relations: Q,
    getContainer: a.a.oneOfType([a.a.func, a.a.object]),
    style: a.a.object,
    contentStyle: a.a.object,
    className: a.a.any,
    contentClass: a.a.any,
    config: a.a.shape({
      id: a.a.oneOfType([a.a.number, a.a.string]),
      mode: a.a.string,
      transition: K,
      relations: Q,
      getContainer: a.a.oneOfType([a.a.func, a.a.object]),
      style: a.a.object,
      contentStyle: a.a.object
    })
  }, ue.defaultProps = {};
  var le = ue;
  t.default = {
    ScaleViewContainer: I,
    ScaleViewItem: le,
    ScaleViewContext: c,
    useSize: B,
    withSize: F
  };
}]);