var Z = Object.defineProperty;
var v = (t, e, n) => e in t ? Z(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var l = (t, e, n) => (v(t, typeof e != "symbol" ? e + "" : e, n), n), D = (t, e, n) => {
  if (!e.has(t))
    throw TypeError("Cannot " + n);
};
var u = (t, e, n) => (D(t, e, "read from private field"), n ? n.call(t) : e.get(t)), f = (t, e, n) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, n);
}, E = (t, e, n, r) => (D(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n);
var R = (t, e, n) => (D(t, e, "access private method"), n);
import { openBlock as a, createElementBlock as d, Fragment as k, renderList as N, normalizeClass as tt, normalizeStyle as et, toDisplayString as nt, resolveComponent as rt, createElementVNode as W, createBlock as it, withDirectives as F, createVNode as st, vShow as ot, withKeys as j, withModifiers as ct, vModelText as ut } from "vue";
function lt(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var ft = Object.prototype.toString, J = function(e) {
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
    return pt(e) ? "generatorfunction" : "function";
  if (at(e))
    return "array";
  if (yt(e))
    return "buffer";
  if (_t(e))
    return "arguments";
  if (mt(e))
    return "date";
  if (ht(e))
    return "error";
  if (dt(e))
    return "regexp";
  switch (q(e)) {
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
  if (gt(e))
    return "generator";
  switch (n = ft.call(e), n) {
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
function q(t) {
  return typeof t.constructor == "function" ? t.constructor.name : null;
}
function at(t) {
  return Array.isArray ? Array.isArray(t) : t instanceof Array;
}
function ht(t) {
  return t instanceof Error || typeof t.message == "string" && t.constructor && typeof t.constructor.stackTraceLimit == "number";
}
function mt(t) {
  return t instanceof Date ? !0 : typeof t.toDateString == "function" && typeof t.getDate == "function" && typeof t.setDate == "function";
}
function dt(t) {
  return t instanceof RegExp ? !0 : typeof t.flags == "string" && typeof t.ignoreCase == "boolean" && typeof t.multiline == "boolean" && typeof t.global == "boolean";
}
function pt(t, e) {
  return q(t) === "GeneratorFunction";
}
function gt(t) {
  return typeof t.throw == "function" && typeof t.return == "function" && typeof t.next == "function";
}
function _t(t) {
  try {
    if (typeof t.length == "number" && typeof t.callee == "function")
      return !0;
  } catch (e) {
    if (e.message.indexOf("callee") !== -1)
      return !0;
  }
  return !1;
}
function yt(t) {
  return t.constructor && typeof t.constructor.isBuffer == "function" ? t.constructor.isBuffer(t) : !1;
}
/*!
 * shallow-clone <https://github.com/jonschlinkert/shallow-clone>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
const G = Symbol.prototype.valueOf, bt = J;
function xt(t, e) {
  switch (bt(t)) {
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
      return kt(t);
    case "symbol":
      return At(t);
    case "arraybuffer":
      return Ot(t);
    case "float32array":
    case "float64array":
    case "int16array":
    case "int32array":
    case "int8array":
    case "uint16array":
    case "uint32array":
    case "uint8clampedarray":
    case "uint8array":
      return jt(t);
    case "regexp":
      return wt(t);
    case "error":
      return Object.create(t);
    default:
      return t;
  }
}
function wt(t) {
  const e = t.flags !== void 0 ? t.flags : /\w+$/.exec(t) || void 0, n = new t.constructor(t.source, e);
  return n.lastIndex = t.lastIndex, n;
}
function Ot(t) {
  const e = new t.constructor(t.byteLength);
  return new Uint8Array(e).set(new Uint8Array(t)), e;
}
function jt(t, e) {
  return new t.constructor(t.buffer, t.byteOffset, t.length);
}
function kt(t) {
  const e = t.length, n = Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : Buffer.from(e);
  return t.copy(n), n;
}
function At(t) {
  return G ? Object(G.call(t)) : {};
}
var St = xt;
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var Ct = function(e) {
  return e != null && typeof e == "object" && Array.isArray(e) === !1;
};
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var Tt = Ct;
function M(t) {
  return Tt(t) === !0 && Object.prototype.toString.call(t) === "[object Object]";
}
var Dt = function(e) {
  var n, r;
  return !(M(e) === !1 || (n = e.constructor, typeof n != "function") || (r = n.prototype, M(r) === !1) || r.hasOwnProperty("isPrototypeOf") === !1);
};
const Et = St, Rt = J, Lt = Dt;
function U(t, e) {
  switch (Rt(t)) {
    case "object":
      return Nt(t, e);
    case "array":
      return Bt(t, e);
    default:
      return Et(t);
  }
}
function Nt(t, e) {
  if (typeof e == "function")
    return e(t);
  if (e || Lt(t)) {
    const n = new t.constructor();
    for (let r in t)
      n[r] = U(t[r], e);
    return n;
  }
  return t;
}
function Bt(t, e) {
  const n = new t.constructor(t.length);
  for (let r = 0; r < t.length; r++)
    n[r] = U(t[r], e);
  return n;
}
var It = U;
const A = /* @__PURE__ */ lt(It), w = Object.freeze({
  BLACK: "black",
  BLUE: "blue",
  GREEN: "green",
  RED: "red",
  YELLOW: "yellow",
  WHITE: "white",
  ORANGR: "orange",
  GRAY: "#282828"
}), Ut = 10.8;
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
    return this.text = e, this.style = { color: w.ORANGR }, this;
  }
  error(e) {
    return this.text = e, this.style = { color: w.RED }, this;
  }
  red() {
    this.style.color = w.RED;
  }
}
function x() {
  return arguments.length === 0 ? new S() : new S().Text(arguments[0]);
}
const Q = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, s] of e)
    n[r] = s;
  return n;
}, $t = {
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
        const n = e[e.length - 1], r = x(" ").Cls("cursor");
        return n.push(r), e;
      } else {
        let n = this.cursor_index;
        for (let r = e.length - 1; r >= 0; r--) {
          const s = e[r];
          for (let i = s.length - 1; i >= 0; i--) {
            const o = s[i];
            if (o.length >= n) {
              const c = o.length - n, m = o.slice(0, c), C = o.slice(c, c + 1).Cls("cursor"), T = o.slice(c + 1);
              return s.splice(i, 1, m, C, T), e;
            } else
              n -= o.length;
          }
        }
      }
      return e;
    }
  }
}, Pt = { class: "log_line" }, Wt = ["onClick"];
function Ft(t, e, n, r, s, i) {
  return a(), d("div", null, [
    (a(!0), d(k, null, N(i.lines, (o) => (a(), d("div", Pt, [
      (a(!0), d(k, null, N(o, ({ text: c, cls: m, style: C, click: T }) => (a(), d("p", {
        class: tt(["clause", m]),
        style: et(C),
        onClick: T
      }, nt(c), 15, Wt))), 256))
    ]))), 256))
  ]);
}
const Gt = /* @__PURE__ */ Q($t, [["render", Ft], ["__scopeId", "data-v-94e9d509"]]);
let $ = console.log;
function Mt(t) {
  typeof t == "function" && ($ = t);
}
function P(t, e) {
  for (let n of t)
    $(n);
  typeof e == "function" && e();
}
function B(t, e) {
  P([t], e);
}
async function zt(t, e) {
  for (; ; ) {
    const { value: n, done: r } = await t.next();
    if (r)
      break;
    $(n);
  }
  typeof e == "function" && e();
}
function X(t) {
  return Array.isArray(t) && t.length > 0;
}
function z(t) {
  return typeof t == "object" && Object.keys(t).length > 0;
}
function Ht(t) {
  return t == null || typeof t != "object" && typeof t != "function" || typeof t.next != "function" || typeof t[Symbol.iterator] != "function" ? !1 : t[Symbol.iterator]() === t;
}
function Kt(t) {
  return function(e) {
    for (const n in t)
      e[n] === void 0 && (e[n] = A(t[n]));
  };
}
var O, I;
class Vt {
  constructor() {
    f(this, O);
    l(this, "commands", {});
  }
  Command(e) {
    const n = new Yt(e);
    return this.commands[e.toLowerCase()] = n, n;
  }
  Remove(e) {
    delete this.commands[e];
  }
  complete(e) {
    if (R(this, O, I).call(this, e).length !== 1)
      return [];
    {
      const n = [], r = e.toLowerCase();
      for (let s in this.commands)
        s.startsWith(r) && n.push(this.commands[s].name);
      return n.sort();
    }
  }
  execute(e) {
    const n = R(this, O, I).call(this, e);
    if (n.length === 0)
      return;
    const r = this.commands[n[0]];
    if (r === void 0) {
      P(["", "  No such command.", "  Try 'help' for assistance.", ""]);
      return;
    }
    r.call(n.slice(1));
  }
  help(e) {
    if (e === void 0) {
      const s = ["", "Commands:"];
      for (const i in this.commands) {
        const o = this.commands[i];
        let c = `  ${o.name}`;
        c += " ".repeat(L - c.length) + o.description, s.push(c);
      }
      return s.push(""), s;
    }
    if (!(e in this.commands))
      return ["", "  No such command.", ""];
    const n = [""], r = this.commands[e];
    if (r.description !== void 0 && (n.push("Description:"), n.push(`  ${r.description}`), n.push("")), z(r.params)) {
      n.push("Params:");
      for (const s in r.params) {
        const i = r.params[s];
        let o = `  ${i.name}`;
        o += " ".repeat(H - o.length) + i.type, o += " ".repeat(L - o.length) + i.description, i.default !== void 0 && (o += `(default: ${JSON.stringify(i.default)})`), n.push(o);
      }
      n.push("");
    }
    if (z(r.options)) {
      n.push("Options:");
      for (const s in r.options) {
        const i = r.options[s];
        let o = "  ";
        "short" in i && (o += `-${i.short}, `), o += `--${i.name}`, o += " ".repeat(H - o.length) + i.type, o += " ".repeat(L - o.length) + i.description, i.default !== void 0 && (o += `(default: ${JSON.stringify(i.default)})`), n.push(o);
      }
      n.push("");
    }
    return n.length === 0 && (n.push("No description, no parama, no options, nothing."), n.push("")), n;
  }
}
O = new WeakSet(), I = function(e) {
  return e.split(/\s+/).filter(Boolean);
};
var b, p, g, _, y, h;
class Yt {
  constructor() {
    l(this, "name");
    l(this, "action");
    l(this, "description");
    l(this, "params", {});
    l(this, "options", {});
    f(this, b, []);
    f(this, p, {});
    f(this, g, []);
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
    V(e);
    const n = e.name.replace(/\s+/g, "");
    return this.params[n] = e, u(this, b).push(u(this, h)), u(this, g).push(void 0), u(this, _).push(K[e.type]), u(this, y).push(e.default), E(this, h, u(this, h) + 1), this;
  }
  Option(e) {
    const n = e.name.replace(/\s+/g, "");
    return V(e), this.options[n] = e, u(this, p)["--" + e.name] = u(this, h), "short" in e && (u(this, p)["-" + e.short] = u(this, h)), e.type === "Boolean" ? (u(this, y).push(!1), u(this, g).push(!0)) : (u(this, y).push(e.default), u(this, g).push(!1)), u(this, _).push(K[e.type]), E(this, h, u(this, h) + 1), this;
  }
  call(e) {
    const n = A(u(this, y));
    let r = 0;
    e.push(void 0);
    for (let i = 0; i < e.length - 1; i++) {
      const o = e[i];
      if (o in u(this, p)) {
        const c = u(this, p)[o], m = u(this, _)[c];
        u(this, g)[c] ? n[c] = !0 : n[c] = m(e[++i]);
      } else if (r === u(this, b).length) {
        B("error: too many parameters");
        return;
      } else {
        const c = u(this, b)[r++], m = u(this, _)[c];
        n[c] = m(o);
      }
    }
    const s = this.action(...n);
    Ht(s) ? zt(s) : X(s) ? P(s) : typeof s == "string" && B(s);
  }
}
b = new WeakMap(), p = new WeakMap(), g = new WeakMap(), _ = new WeakMap(), y = new WeakMap(), h = new WeakMap();
const H = 18, L = 28, K = {
  Number: parseInt,
  Float: parseFloat,
  String: (t) => t
}, V = Kt({ description: "" }), Y = new Vt();
let Jt = {
  prompt: void 0,
  prompt_visibility: void 0,
  background_color: void 0,
  font_color: void 0,
  logging_interval: void 0
};
function qt(t) {
  Jt = t;
}
const Qt = {
  expose: [
    "enter"
  ],
  components: {
    LogLine: Gt
  },
  data() {
    return {
      log_lines: [],
      log_buffer: [],
      logging: !1,
      command: "",
      cursor_index: 0,
      command_history: [],
      command_history_index: -1,
      complete_command: [],
      complete_index: -1,
      setting: {
        prompt: "WebTerminal> ",
        prompt_visibility: !0,
        logging_interval: 24,
        background_color: w.GRAY,
        font_color: w.WHITE
      },
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
        this.log_buffer.push([x(t)]);
      else if (X(t)) {
        for (let e = 0; e < t.length; e++)
          typeof t[e] == "string" && (t[e] = x(t[e]));
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
      this.logging || (B(this.command_line), Y.execute(this.command), this.cursor_index = 0, this.command_history.unshift(this.command), this.command_history_index = -1, this.$nextTick(() => {
        this.command = "";
      }));
    },
    history(t) {
      t.key === "ArrowUp" ? this.command_history_index < this.command_history.length - 1 && (this.command_history_index++, this.command = this.command_history[this.command_history_index], this.cursor_to_end()) : t.key === "ArrowDown" && this.command_history_index > 0 && (this.command_history_index--, this.command = this.command_history[this.command_history_index], this.cursor_to_end());
    },
    tab() {
      this.complete_index === -1 && (this.complete_command = Y.complete(this.command)), this.complete_command.length !== 0 && (this.complete_index = (this.complete_index + 1) % this.complete_command.length, this.command = this.complete_command[this.complete_index], this.cursor_to_end());
    },
    cursor_to_end() {
      setTimeout(() => {
        this.$refs.terminal_input.setSelectionRange(this.command.length, this.command.length), this.cursor_index = 0;
      });
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
      return this.setting.prompt_visibility ? [x(this.setting.prompt + this.command)] : [x(this.command)];
    }
  },
  mounted() {
    this.resize_observer = new ResizeObserver((t) => {
      for (let e of t)
        e.target === this.$refs.terminal_window && (this.terminal_width = e.contentRect.width, this.terminal_height = e.contentRect.height, this.terminal_line_length = Math.floor(this.terminal_width / Ut));
    }), this.resize_observer.observe(this.$refs.terminal_window), Mt(this.log_to_buffer), qt(this.setting), this.focus();
  }
};
function Xt(t, e, n, r, s, i) {
  const o = rt("LogLine");
  return a(), d(k, null, [
    W("div", {
      id: "terminal_window",
      ref: "terminal_window",
      onKeydown: e[0] || (e[0] = (...c) => i.focus && i.focus(...c)),
      tabindex: "0"
    }, [
      (a(!0), d(k, null, N(s.log_lines, (c) => (a(), it(o, {
        log_line: c,
        terminal_line_length: s.terminal_line_length
      }, null, 8, ["log_line", "terminal_line_length"]))), 256)),
      F(st(o, {
        ref: "command_line",
        log_line: i.command_line,
        terminal_line_length: s.terminal_line_length,
        cursor_index: s.cursor_index
      }, null, 8, ["log_line", "terminal_line_length", "cursor_index"]), [
        [ot, !s.logging]
      ])
    ], 544),
    F(W("input", {
      id: "terminal_input",
      ref: "terminal_input",
      "onUpdate:modelValue": e[1] || (e[1] = (c) => s.command = c),
      onKeydown: [
        e[2] || (e[2] = j((...c) => i.update_cursor_index && i.update_cursor_index(...c), ["left", "right"])),
        e[3] || (e[3] = j((...c) => i.history && i.history(...c), ["up", "down"])),
        e[4] || (e[4] = j((...c) => i.enter && i.enter(...c), ["enter"])),
        e[5] || (e[5] = j(ct((...c) => i.tab && i.tab(...c), ["prevent"]), ["tab"])),
        e[6] || (e[6] = (...c) => i.keydown && i.keydown(...c))
      ]
    }, null, 544), [
      [ut, s.command]
    ])
  ], 64);
}
const te = /* @__PURE__ */ Q(Qt, [["render", Xt], ["__scopeId", "data-v-04f42457"]]);
export {
  te as Terminal,
  Y as commanding,
  Jt as setting
};
