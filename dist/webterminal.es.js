var X = Object.defineProperty;
var Z = (t, e, n) => e in t ? X(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var l = (t, e, n) => (Z(t, typeof e != "symbol" ? e + "" : e, n), n), L = (t, e, n) => {
  if (!e.has(t))
    throw TypeError("Cannot " + n);
};
var u = (t, e, n) => (L(t, e, "read from private field"), n ? n.call(t) : e.get(t)), f = (t, e, n) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, n);
}, T = (t, e, n, r) => (L(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n);
var R = (t, e, n) => (L(t, e, "access private method"), n);
import { openBlock as a, createElementBlock as d, Fragment as k, renderList as B, normalizeClass as v, normalizeStyle as ee, toDisplayString as te, resolveComponent as ne, createElementVNode as P, createBlock as re, withDirectives as $, createVNode as ie, vShow as se, withKeys as j, withModifiers as oe, vModelText as ce } from "vue";
function ue(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var le = Object.prototype.toString, V = function(e) {
  if (e === void 0)
    return "undefined";
  if (e === null)
    return "null";
  var n = typeof e;
  if (n === "boolean")
    return "boolean";
  if (n === "string")
    return "string";
  if (n === "number")
    return "number";
  if (n === "symbol")
    return "symbol";
  if (n === "function")
    return de(e) ? "generatorfunction" : "function";
  if (fe(e))
    return "array";
  if (_e(e))
    return "buffer";
  if (pe(e))
    return "arguments";
  if (he(e))
    return "date";
  if (ae(e))
    return "error";
  if (me(e))
    return "regexp";
  switch (Y(e)) {
    case "Symbol":
      return "symbol";
    case "Promise":
      return "promise";
    case "WeakMap":
      return "weakmap";
    case "WeakSet":
      return "weakset";
    case "Map":
      return "map";
    case "Set":
      return "set";
    case "Int8Array":
      return "int8array";
    case "Uint8Array":
      return "uint8array";
    case "Uint8ClampedArray":
      return "uint8clampedarray";
    case "Int16Array":
      return "int16array";
    case "Uint16Array":
      return "uint16array";
    case "Int32Array":
      return "int32array";
    case "Uint32Array":
      return "uint32array";
    case "Float32Array":
      return "float32array";
    case "Float64Array":
      return "float64array";
  }
  if (ge(e))
    return "generator";
  switch (n = le.call(e), n) {
    case "[object Object]":
      return "object";
    case "[object Map Iterator]":
      return "mapiterator";
    case "[object Set Iterator]":
      return "setiterator";
    case "[object String Iterator]":
      return "stringiterator";
    case "[object Array Iterator]":
      return "arrayiterator";
  }
  return n.slice(8, -1).toLowerCase().replace(/\s/g, "");
};
function Y(t) {
  return typeof t.constructor == "function" ? t.constructor.name : null;
}
function fe(t) {
  return Array.isArray ? Array.isArray(t) : t instanceof Array;
}
function ae(t) {
  return t instanceof Error || typeof t.message == "string" && t.constructor && typeof t.constructor.stackTraceLimit == "number";
}
function he(t) {
  return t instanceof Date ? !0 : typeof t.toDateString == "function" && typeof t.getDate == "function" && typeof t.setDate == "function";
}
function me(t) {
  return t instanceof RegExp ? !0 : typeof t.flags == "string" && typeof t.ignoreCase == "boolean" && typeof t.multiline == "boolean" && typeof t.global == "boolean";
}
function de(t, e) {
  return Y(t) === "GeneratorFunction";
}
function ge(t) {
  return typeof t.throw == "function" && typeof t.return == "function" && typeof t.next == "function";
}
function pe(t) {
  try {
    if (typeof t.length == "number" && typeof t.callee == "function")
      return !0;
  } catch (e) {
    if (e.message.indexOf("callee") !== -1)
      return !0;
  }
  return !1;
}
function _e(t) {
  return t.constructor && typeof t.constructor.isBuffer == "function" ? t.constructor.isBuffer(t) : !1;
}
/*!
 * shallow-clone <https://github.com/jonschlinkert/shallow-clone>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
const W = Symbol.prototype.valueOf, ye = V;
function be(t, e) {
  switch (ye(t)) {
    case "array":
      return t.slice();
    case "object":
      return Object.assign({}, t);
    case "date":
      return new t.constructor(Number(t));
    case "map":
      return new Map(t);
    case "set":
      return new Set(t);
    case "buffer":
      return je(t);
    case "symbol":
      return ke(t);
    case "arraybuffer":
      return xe(t);
    case "float32array":
    case "float64array":
    case "int16array":
    case "int32array":
    case "int8array":
    case "uint16array":
    case "uint32array":
    case "uint8clampedarray":
    case "uint8array":
      return Oe(t);
    case "regexp":
      return we(t);
    case "error":
      return Object.create(t);
    default:
      return t;
  }
}
function we(t) {
  const e = t.flags !== void 0 ? t.flags : /\w+$/.exec(t) || void 0, n = new t.constructor(t.source, e);
  return n.lastIndex = t.lastIndex, n;
}
function xe(t) {
  const e = new t.constructor(t.byteLength);
  return new Uint8Array(e).set(new Uint8Array(t)), e;
}
function Oe(t, e) {
  return new t.constructor(t.buffer, t.byteOffset, t.length);
}
function je(t) {
  const e = t.length, n = Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : Buffer.from(e);
  return t.copy(n), n;
}
function ke(t) {
  return W ? Object(W.call(t)) : {};
}
var Ae = be;
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var Se = function(e) {
  return e != null && typeof e == "object" && Array.isArray(e) === !1;
};
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var Ce = Se;
function F(t) {
  return Ce(t) === !0 && Object.prototype.toString.call(t) === "[object Object]";
}
var De = function(e) {
  var n, r;
  return !(F(e) === !1 || (n = e.constructor, typeof n != "function") || (r = n.prototype, F(r) === !1) || r.hasOwnProperty("isPrototypeOf") === !1);
};
const Ee = Ae, Le = V, Te = De;
function I(t, e) {
  switch (Le(t)) {
    case "object":
      return Re(t, e);
    case "array":
      return Be(t, e);
    default:
      return Ee(t);
  }
}
function Re(t, e) {
  if (typeof e == "function")
    return e(t);
  if (e || Te(t)) {
    const n = new t.constructor();
    for (let r in t)
      n[r] = I(t[r], e);
    return n;
  }
  return t;
}
function Be(t, e) {
  const n = new t.constructor(t.length);
  for (let r = 0; r < t.length; r++)
    n[r] = I(t[r], e);
  return n;
}
var Ne = I;
const A = /* @__PURE__ */ ue(Ne), x = Object.freeze({
  BLACK: "black",
  BLUE: "blue",
  GREEN: "green",
  RED: "red",
  YELLOW: "yellow",
  WHITE: "white",
  ORANGR: "orange",
  GRAY: "#282828"
});
class S {
  constructor() {
    l(this, "text", "");
    l(this, "cls", []);
    l(this, "style", {});
    l(this, "click");
    arguments.length > 0 && (this.text = arguments[0]);
  }
  Text(e) {
    return this.text = e, this;
  }
  Clss(e) {
    return this.cls = e, this;
  }
  Cls(e) {
    return this.cls.push(e), this;
  }
  Style(e) {
    return this.style = e, this;
  }
  Property(e, n) {
    return this.style[e] = n, this;
  }
  Click(e) {
    return this.click = e, this;
  }
  get length() {
    return this.text.length;
  }
  copy() {
    return new S().Text(this.text).Clss(A(this.cls)).Style(A(this.style)).Click(this.click);
  }
  slice(e, n) {
    e === void 0 && (e = 0), n === void 0 && (n = this.length);
    const r = this.copy();
    return r.text = r.text.slice(e, n), r;
  }
  warning(e) {
    return this.text = e, this.style = { color: x.ORANGR }, this;
  }
  error(e) {
    return this.text = e, this.style = { color: x.RED }, this;
  }
  red() {
    this.style.color = x.RED;
  }
}
function w() {
  return arguments.length === 0 ? new S() : new S().Text(arguments[0]);
}
const J = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, s] of e)
    n[r] = s;
  return n;
}, Ie = {
  props: {
    log_line: Array,
    terminal_line_length: Number,
    cursor_index: Number
  },
  computed: {
    lines() {
      let t = this.terminal_line_length, e = [[]];
      if (this.log_line.forEach((n) => {
        if (t == 0 && (e.push([]), t = this.terminal_line_length), n.length > t) {
          const r = n.slice(0, t);
          let s = n.slice(t);
          for (e[e.length - 1].push(r); s.length > this.terminal_line_length; )
            e.push([s.slice(0, this.terminal_line_length)]), s = s.slice(this.terminal_line_length);
          e.push([s]), t = this.terminal_line_length - n.length + t;
        } else
          e[e.length - 1].push(n.copy()), t -= n.length;
      }), this.cursor_index === void 0)
        return e;
      if (this.cursor_index === 0) {
        const n = e[e.length - 1], r = w(" ").Cls("cursor");
        return n.push(r), e;
      } else {
        let n = this.cursor_index;
        for (let r = e.length - 1; r >= 0; r--) {
          const s = e[r];
          for (let i = s.length - 1; i >= 0; i--) {
            const c = s[i];
            if (c.length >= n) {
              const o = c.length - n, m = c.slice(0, o), D = c.slice(o, o + 1).Cls("cursor"), E = c.slice(o + 1);
              return s.splice(i, 1, m, D, E), e;
            } else
              n -= c.length;
          }
        }
      }
      return e;
    }
  }
}, Ue = { ref: "container" }, Pe = { class: "log_line" }, $e = ["onClick"];
function We(t, e, n, r, s, i) {
  return a(), d("div", Ue, [
    (a(!0), d(k, null, B(i.lines, (c) => (a(), d("div", Pe, [
      (a(!0), d(k, null, B(c, ({ text: o, cls: m, style: D, click: E }) => (a(), d("p", {
        class: v(["clause", m]),
        style: ee(D),
        onClick: E
      }, te(o), 15, $e))), 256))
    ]))), 256))
  ], 512);
}
const Fe = /* @__PURE__ */ J(Ie, [["render", We], ["__scopeId", "data-v-6e182a2c"]]);
let U = console.log;
function Ge(t) {
  typeof t == "function" && (U = t);
}
function q(t, e) {
  for (let n of t)
    U(n);
  typeof e == "function" && e();
}
function C(t, e) {
  q([t], e);
}
async function Me(t, e) {
  for (; ; ) {
    const { value: n, done: r } = await t.next();
    if (r)
      break;
    U(n);
  }
  typeof e == "function" && e();
}
function Q(t) {
  return Array.isArray(t) && t.length > 0;
}
function G(t) {
  return typeof t == "object" && Object.keys(t).length > 0;
}
function ze(t) {
  return t == null || typeof t != "object" && typeof t != "function" || typeof t.next != "function" || typeof t[Symbol.iterator] != "function" ? !1 : t[Symbol.iterator]() === t;
}
function Ke(t) {
  return function(e) {
    for (const n in t)
      e[n] === void 0 && (e[n] = A(t[n]));
  };
}
var O, N;
class He {
  constructor() {
    f(this, O);
    l(this, "name", "");
    l(this, "banner", []);
    l(this, "description", "");
    l(this, "commands", {});
  }
  Name(e) {
    return this.name = e, this;
  }
  Banner(e) {
    return this.banner = e, this;
  }
  Description(e) {
    return this.description = e, this;
  }
  Command(e) {
    const n = new Ve(e);
    return this.commands[e.toLowerCase()] = n, n;
  }
  Remove(e) {
    delete this.commands[e];
  }
  complete(e) {
    if (R(this, O, N).call(this, e).length !== 1)
      return [];
    {
      const n = [], r = e.toLowerCase();
      for (let s in this.commands)
        s.startsWith(r) && n.push(this.commands[s].name);
      return n.sort();
    }
  }
  execute(e) {
    const n = R(this, O, N).call(this, e);
    if (n.length === 0)
      return;
    const r = this.commands[n[0]];
    if (r === void 0) {
      C("  No such command.");
      return;
    }
    r.call(n.slice(1));
  }
  help(e) {
    if (e === void 0) {
      const s = ["Commands:", ""];
      for (const i in this.commands) {
        const c = this.commands[i];
        let o = `  ${c.name}`;
        o += " ".repeat(M - o.length) + c.description, s.push(o);
      }
      return s.push(""), s;
    }
    if (!(e in this.commands))
      return "  No such command.";
    const n = [], r = this.commands[e];
    if (r.description !== void 0 && (n.push(`Description: ${r.description}`), n.push("")), G(r.params)) {
      n.push("Params:");
      for (const s in r.params) {
        const i = r.params[s];
        let c = `  ${i.name}`;
        c += " ".repeat(M - c.length) + i.description, i.default !== void 0 && (c += `(default: ${JSON.stringify(i.default)})`), n.push(c);
      }
      n.push("");
    }
    if (G(r.options)) {
      n.push("Options:");
      for (const s in r.options) {
        const i = r.options[s];
        let c = "  ";
        "short" in i && (c += `-${i.short}, `), c += `--${i.name}`, c += " ".repeat(26 - c.length) + i.description, i.default !== void 0 && (c += `(default: ${JSON.stringify(i.default)})`), n.push(c);
      }
      n.push("");
    }
    return n;
  }
}
O = new WeakSet(), N = function(e) {
  return e.split(/\s+/).filter(Boolean);
};
var b, g, p, _, y, h;
class Ve {
  constructor() {
    l(this, "name");
    l(this, "action");
    l(this, "description");
    l(this, "params", {});
    l(this, "options", {});
    f(this, b, []);
    f(this, g, {});
    f(this, p, []);
    f(this, _, []);
    f(this, y, []);
    f(this, h, 0);
    arguments.length > 0 && (this.name = arguments[0]);
  }
  Name(e) {
    return this.name = e, this;
  }
  Action(e) {
    return this.action = e, this;
  }
  Description(e) {
    return this.description = e, this;
  }
  Param(e) {
    K(e);
    const n = e.name.replace(/\s+/g, "");
    return this.params[n] = e, u(this, b).push(u(this, h)), u(this, p).push(void 0), u(this, _).push(z[e.type]), u(this, y).push(e.default), T(this, h, u(this, h) + 1), this;
  }
  Option(e) {
    const n = e.name.replace(/\s+/g, "");
    return K(e), this.options[n] = e, u(this, g)["--" + e.name] = u(this, h), "short" in e && (u(this, g)["-" + e.short] = u(this, h)), e.type === "Boolean" ? (u(this, y).push(!1), u(this, p).push(!0)) : (u(this, y).push(e.default), u(this, p).push(!1)), u(this, _).push(z[e.type]), T(this, h, u(this, h) + 1), this;
  }
  call(e) {
    const n = A(u(this, y));
    let r = 0;
    e.push(void 0);
    for (let i = 0; i < e.length - 1; i++) {
      const c = e[i];
      if (c in u(this, g)) {
        const o = u(this, g)[c], m = u(this, _)[o];
        u(this, p)[o] ? n[o] = !0 : n[o] = m(e[++i]);
      } else if (r === u(this, b).length) {
        C("error: too many parameters");
        return;
      } else {
        const o = u(this, b)[r++], m = u(this, _)[o];
        n[o] = m(c);
      }
    }
    const s = this.action(...n);
    ze(s) ? Me(s) : Q(s) ? q(s) : typeof s == "string" && C(s);
  }
}
b = new WeakMap(), g = new WeakMap(), p = new WeakMap(), _ = new WeakMap(), y = new WeakMap(), h = new WeakMap();
const M = 26, z = {
  Number: parseInt,
  Float: parseFloat,
  String: (t) => t
}, K = Ke({ description: "" }), H = new He();
let Ye = {
  prompt: void 0,
  prompt_visibility: void 0,
  background_color: void 0,
  font_color: void 0,
  logging_interval: void 0
};
function Je(t) {
  Ye = t;
}
const qe = 10.8, Qe = {
  expose: [
    "enter"
  ],
  components: {
    LogLine: Fe
  },
  data() {
    return {
      log_lines: [],
      log_buffer: [],
      logging: !1,
      command: "",
      command_history: [],
      command_history_index: -1,
      cursor_index: 0,
      setting: {
        prompt: "WebTerminal> ",
        prompt_visibility: !0,
        logging_interval: 24,
        background_color: x.GRAY,
        font_color: x.WHITE
      },
      complete_command: [],
      complete_index: -1,
      terminal_width: void 0,
      terminal_height: void 0,
      terminal_line_length: void 0
    };
  },
  methods: {
    scroll_to_bottom() {
      setTimeout(() => {
        this.$refs.terminal_window.scrollTop = this.$refs.terminal_window.scrollHeight;
      });
    },
    log_to_buffer(t) {
      if (typeof t == "string")
        this.log_buffer.push([w(t)]);
      else if (Q(t)) {
        for (let e = 0; e < t.length; e++)
          typeof t[e] == "string" && (t[e] = w(t[e]));
        this.log_buffer.push(t);
      }
      this.log_buffer.length > 0 && !this.logging && (this.logging = !0, this.buffer_to_log());
    },
    //buffer_to_log不一直循环的理由是：
    //如果一直循环，每次输入的时候第一行就会有延迟
    async buffer_to_log() {
      if (this.scroll_to_bottom(), this.log_buffer.length === 0) {
        this.logging = !1;
        return;
      }
      this.log_buffer.length > 0 && this.log_lines.push(this.log_buffer.shift()), setTimeout(this.buffer_to_log, this.setting.logging_interval);
    },
    enter() {
      this.logging || (C(this.command_line), H.execute(this.command), this.command_history.unshift(this.command), this.command_history_index = -1, this.$nextTick(() => {
        this.command = "";
      }));
    },
    history(t) {
      t.key === "ArrowUp" ? this.command_history_index < this.command_history.length - 1 && (this.command_history_index++, this.command = this.command_history[this.command_history_index]) : t.key === "ArrowDown" && this.command_history_index > 0 && (this.command_history_index--, this.command = this.command_history[this.command_history_index]);
    },
    tab() {
      this.complete_index === -1 && (this.complete_command = H.complete(this.command)), this.complete_command.length !== 0 && (this.complete_index = (this.complete_index + 1) % this.complete_command.length, this.command = this.complete_command[this.complete_index]);
    },
    keydown(t) {
      t.key !== "Tab" && (this.complete_command = [], this.complete_index = -1);
    },
    update_cursor_index(t) {
      const e = t.target;
      setTimeout(() => {
        this.cursor_index = e.value.length - e.selectionEnd;
      });
    },
    focus(t) {
      t && (t.key === "Control" || t.ctrlKey && t.key === "c") || this.$nextTick(() => {
        this.$refs.terminal_input.focus();
      });
    }
  },
  watch: {
    "setting.background_color": function(t) {
      const e = this.$el.parentElement;
      Object.assign(e.style, {
        "background-color": t
      });
    },
    "setting.font_color": function(t) {
      console.log("font_color", t);
      const e = this.$el.parentElement;
      Object.assign(e.style, {
        color: t
      });
    }
  },
  computed: {
    command_line() {
      return this.setting.prompt_visibility ? [w(this.setting.prompt + this.command)] : [w(this.command)];
    }
  },
  mounted() {
    this.resize_observer = new ResizeObserver((t) => {
      for (let e of t)
        e.target === this.$refs.terminal_window && (this.terminal_width = e.contentRect.width, this.terminal_height = e.contentRect.height, this.terminal_line_length = Math.floor(this.terminal_width / qe));
    }), this.resize_observer.observe(this.$refs.terminal_window), Ge(this.log_to_buffer), Je(this.setting), this.focus();
  }
};
function Xe(t, e, n, r, s, i) {
  const c = ne("LogLine");
  return a(), d(k, null, [
    P("div", {
      ref: "terminal_window",
      onKeydown: e[0] || (e[0] = (...o) => i.focus && i.focus(...o)),
      tabindex: "0"
    }, [
      (a(!0), d(k, null, B(s.log_lines, (o) => (a(), re(c, {
        log_line: o,
        terminal_line_length: s.terminal_line_length
      }, null, 8, ["log_line", "terminal_line_length"]))), 256)),
      $(ie(c, {
        ref: "command_line",
        log_line: i.command_line,
        terminal_line_length: s.terminal_line_length,
        cursor_index: s.cursor_index
      }, null, 8, ["log_line", "terminal_line_length", "cursor_index"]), [
        [se, !s.logging]
      ])
    ], 544),
    $(P("input", {
      ref: "terminal_input",
      "onUpdate:modelValue": e[1] || (e[1] = (o) => s.command = o),
      onKeydown: [
        e[2] || (e[2] = j((...o) => i.update_cursor_index && i.update_cursor_index(...o), ["left", "right"])),
        e[3] || (e[3] = j((...o) => i.history && i.history(...o), ["up", "down"])),
        e[4] || (e[4] = j((...o) => i.enter && i.enter(...o), ["enter"])),
        e[5] || (e[5] = j(oe((...o) => i.tab && i.tab(...o), ["prevent"]), ["tab"])),
        e[6] || (e[6] = (...o) => i.keydown && i.keydown(...o))
      ]
    }, null, 544), [
      [ce, s.command]
    ])
  ], 64);
}
const et = /* @__PURE__ */ J(Qe, [["render", Xe], ["__scopeId", "data-v-78e024b9"]]);
export {
  et as Terminal,
  H as commanding,
  Ye as terminal_setting
};
