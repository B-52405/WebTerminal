var te = Object.defineProperty;
var ne = (e, t, n) => t in e ? te(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var l = (e, t, n) => (ne(e, typeof t != "symbol" ? t + "" : t, n), n), R = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var u = (e, t, n) => (R(e, t, "read from private field"), n ? n.call(e) : t.get(e)), f = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, $ = (e, t, n, r) => (R(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var L = (e, t, n) => (R(e, t, "access private method"), n);
import { openBlock as m, createElementBlock as p, Fragment as S, renderList as I, normalizeClass as re, normalizeStyle as ie, toDisplayString as oe, resolveComponent as Q, createElementVNode as N, createBlock as se, withDirectives as z, createVNode as X, vShow as ce, withKeys as j, withModifiers as ue, vModelText as le } from "vue";
function ae(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var fe = Object.prototype.toString, Z = function(t) {
  if (t === void 0)
    return "undefined";
  if (t === null)
    return "null";
  var n = typeof t;
  if (n === "boolean")
    return "boolean";
  if (n === "string")
    return "string";
  if (n === "number")
    return "number";
  if (n === "symbol")
    return "symbol";
  if (n === "function")
    return ge(t) ? "generatorfunction" : "function";
  if (he(t))
    return "array";
  if (be(t))
    return "buffer";
  if (ye(t))
    return "arguments";
  if (de(t))
    return "date";
  if (me(t))
    return "error";
  if (pe(t))
    return "regexp";
  switch (v(t)) {
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
  if (_e(t))
    return "generator";
  switch (n = fe.call(t), n) {
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
function v(e) {
  return typeof e.constructor == "function" ? e.constructor.name : null;
}
function he(e) {
  return Array.isArray ? Array.isArray(e) : e instanceof Array;
}
function me(e) {
  return e instanceof Error || typeof e.message == "string" && e.constructor && typeof e.constructor.stackTraceLimit == "number";
}
function de(e) {
  return e instanceof Date ? !0 : typeof e.toDateString == "function" && typeof e.getDate == "function" && typeof e.setDate == "function";
}
function pe(e) {
  return e instanceof RegExp ? !0 : typeof e.flags == "string" && typeof e.ignoreCase == "boolean" && typeof e.multiline == "boolean" && typeof e.global == "boolean";
}
function ge(e, t) {
  return v(e) === "GeneratorFunction";
}
function _e(e) {
  return typeof e.throw == "function" && typeof e.return == "function" && typeof e.next == "function";
}
function ye(e) {
  try {
    if (typeof e.length == "number" && typeof e.callee == "function")
      return !0;
  } catch (t) {
    if (t.message.indexOf("callee") !== -1)
      return !0;
  }
  return !1;
}
function be(e) {
  return e.constructor && typeof e.constructor.isBuffer == "function" ? e.constructor.isBuffer(e) : !1;
}
/*!
 * shallow-clone <https://github.com/jonschlinkert/shallow-clone>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
const H = Symbol.prototype.valueOf, we = Z;
function xe(e, t) {
  switch (we(e)) {
    case "array":
      return e.slice();
    case "object":
      return Object.assign({}, e);
    case "date":
      return new e.constructor(Number(e));
    case "map":
      return new Map(e);
    case "set":
      return new Set(e);
    case "buffer":
      return je(e);
    case "symbol":
      return Se(e);
    case "arraybuffer":
      return ke(e);
    case "float32array":
    case "float64array":
    case "int16array":
    case "int32array":
    case "int8array":
    case "uint16array":
    case "uint32array":
    case "uint8clampedarray":
    case "uint8array":
      return Ae(e);
    case "regexp":
      return Oe(e);
    case "error":
      return Object.create(e);
    default:
      return e;
  }
}
function Oe(e) {
  const t = e.flags !== void 0 ? e.flags : /\w+$/.exec(e) || void 0, n = new e.constructor(e.source, t);
  return n.lastIndex = e.lastIndex, n;
}
function ke(e) {
  const t = new e.constructor(e.byteLength);
  return new Uint8Array(t).set(new Uint8Array(e)), t;
}
function Ae(e, t) {
  return new e.constructor(e.buffer, e.byteOffset, e.length);
}
function je(e) {
  const t = e.length, n = Buffer.allocUnsafe ? Buffer.allocUnsafe(t) : Buffer.from(t);
  return e.copy(n), n;
}
function Se(e) {
  return H ? Object(H.call(e)) : {};
}
var Ce = xe;
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var Te = function(t) {
  return t != null && typeof t == "object" && Array.isArray(t) === !1;
};
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var De = Te;
function K(e) {
  return De(e) === !0 && Object.prototype.toString.call(e) === "[object Object]";
}
var Ee = function(t) {
  var n, r;
  return !(K(t) === !1 || (n = t.constructor, typeof n != "function") || (r = n.prototype, K(r) === !1) || r.hasOwnProperty("isPrototypeOf") === !1);
};
const Re = Ce, $e = Z, Le = Ee;
function W(e, t) {
  switch ($e(e)) {
    case "object":
      return Ne(e, t);
    case "array":
      return Be(e, t);
    default:
      return Re(e);
  }
}
function Ne(e, t) {
  if (typeof t == "function")
    return t(e);
  if (t || Le(e)) {
    const n = new e.constructor();
    for (let r in e)
      n[r] = W(e[r], t);
    return n;
  }
  return e;
}
function Be(e, t) {
  const n = new e.constructor(e.length);
  for (let r = 0; r < e.length; r++)
    n[r] = W(e[r], t);
  return n;
}
var Ie = W;
const C = /* @__PURE__ */ ae(Ie), a = Object.freeze({
  BLACK: "black",
  BLUE: "blue",
  GREEN: "green",
  RED: "red",
  YELLOW: "yellow",
  WHITE: "white",
  ORANGR: "orange",
  GRAY: "#282828"
}), Ue = 10.8;
class T {
  constructor() {
    l(this, "text", "");
    l(this, "cls", []);
    l(this, "style", {});
    l(this, "click");
    arguments.length > 0 && (this.text = arguments[0]);
  }
  Text(t) {
    return this.text = t, this;
  }
  Clss(t) {
    return this.cls = t, this;
  }
  Cls(t) {
    return this.cls.push(t), this;
  }
  Style(t) {
    return this.style = t, this;
  }
  Property(t, n) {
    return this.style[t] = n, this;
  }
  Click(t) {
    return this.click = t, this;
  }
  get length() {
    return this.text.length;
  }
  copy() {
    return new T().Text(this.text).Clss(C(this.cls)).Style(C(this.style)).Click(this.click);
  }
  slice(t, n) {
    t === void 0 && (t = 0), n === void 0 && (n = this.length);
    const r = this.copy();
    return r.text = r.text.slice(t, n), r;
  }
  warning(t) {
    return this.text = t, this.style = { color: a.ORANGR }, this;
  }
  error(t) {
    return this.text = t, this.style = { color: a.RED }, this;
  }
  red() {
    this.style.color = a.RED;
  }
}
function O() {
  return arguments.length === 0 ? new T() : new T().Text(arguments[0]);
}
const F = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
}, Pe = {
  props: {
    log_line: Array,
    terminal_line_length: Number,
    cursor_index: Number
  },
  computed: {
    lines() {
      let e = this.terminal_line_length, t = [[]];
      if (this.log_line.forEach((n) => {
        if (e == 0 && (t.push([]), e = this.terminal_line_length), n.length > e) {
          const r = n.slice(0, e);
          let o = n.slice(e);
          for (t[t.length - 1].push(r); o.length > this.terminal_line_length; )
            t.push([o.slice(0, this.terminal_line_length)]), o = o.slice(this.terminal_line_length);
          t.push([o]), e = this.terminal_line_length - n.length + e;
        } else
          t[t.length - 1].push(n.copy()), e -= n.length;
      }), this.cursor_index === void 0)
        return t;
      if (this.cursor_index === 0) {
        const n = t[t.length - 1], r = O(" ").Cls("cursor");
        return n.push(r), t;
      } else {
        let n = this.cursor_index;
        for (let r = t.length - 1; r >= 0; r--) {
          const o = t[r];
          for (let i = o.length - 1; i >= 0; i--) {
            const s = o[i];
            if (s.length >= n) {
              const c = s.length - n, d = s.slice(0, c), D = s.slice(c, c + 1).Cls("cursor"), E = s.slice(c + 1);
              return o.splice(i, 1, d, D, E), t;
            } else
              n -= s.length;
          }
        }
      }
      return t;
    }
  }
}, We = { class: "log_line" }, Fe = ["onClick"];
function Ge(e, t, n, r, o, i) {
  return m(!0), p(S, null, I(i.lines, (s) => (m(), p("div", We, [
    (m(!0), p(S, null, I(s, ({ text: c, cls: d, style: D, click: E }) => (m(), p("p", {
      class: re(["clause", d]),
      style: ie(D),
      onClick: E
    }, oe(c), 15, Fe))), 256))
  ]))), 256);
}
const Me = /* @__PURE__ */ F(Pe, [["render", Ge], ["__scopeId", "data-v-7ab38fdb"]]);
let G = console.log;
function ze(e) {
  typeof e == "function" && (G = e);
}
function M(e, t) {
  for (let n of e)
    G(n);
  typeof t == "function" && t();
}
function U(e, t) {
  M([e], t);
}
async function He(e, t) {
  for (; ; ) {
    const { value: n, done: r } = await e.next();
    if (r)
      break;
    G(n);
  }
  typeof t == "function" && t();
}
function ee(e) {
  return Array.isArray(e) && e.length > 0;
}
function V(e) {
  return typeof e == "object" && Object.keys(e).length > 0;
}
function Ke(e) {
  return e == null || typeof e != "object" && typeof e != "function" || typeof e.next != "function" || typeof e[Symbol.iterator] != "function" ? !1 : e[Symbol.iterator]() === e;
}
function Ve(e) {
  return function(t) {
    for (const n in e)
      t[n] === void 0 && (t[n] = C(e[n]));
  };
}
var A, P;
class Ye {
  constructor() {
    f(this, A);
    l(this, "commands", {});
  }
  Command(t) {
    const n = new Je(t);
    return this.commands[t.toLowerCase()] = n, n;
  }
  Remove(t) {
    delete this.commands[t];
  }
  complete(t) {
    if (L(this, A, P).call(this, t).length !== 1)
      return [];
    {
      const n = [], r = t.toLowerCase();
      for (let o in this.commands)
        o.startsWith(r) && n.push(this.commands[o].name);
      return n.sort();
    }
  }
  execute(t) {
    const n = L(this, A, P).call(this, t);
    if (n.length === 0)
      return;
    const r = this.commands[n[0]];
    if (r === void 0) {
      M(["", "  No such command.", "  Try 'help' for assistance.", ""]);
      return;
    }
    r.call(n.slice(1));
  }
  help(t) {
    if (t === void 0) {
      const o = ["", "Commands:"];
      for (const i in this.commands) {
        const s = this.commands[i];
        let c = `  ${s.name}`;
        c += " ".repeat(B - c.length) + s.description, o.push(c);
      }
      return o.push(""), o;
    }
    if (!(t in this.commands))
      return ["", "  No such command.", ""];
    const n = [""], r = this.commands[t];
    if (r.description !== void 0 && (n.push("Description:"), n.push(`  ${r.description}`), n.push("")), V(r.params)) {
      n.push("Params:");
      for (const o in r.params) {
        const i = r.params[o];
        let s = `  ${i.name}`;
        s += " ".repeat(Y - s.length) + i.type, s += " ".repeat(B - s.length) + i.description, i.default !== void 0 && (s += `(default: ${JSON.stringify(i.default)})`), n.push(s);
      }
      n.push("");
    }
    if (V(r.options)) {
      n.push("Options:");
      for (const o in r.options) {
        const i = r.options[o];
        let s = "  ";
        "short" in i && (s += `-${i.short}, `), s += `--${i.name}`, s += " ".repeat(Y - s.length) + i.type, s += " ".repeat(B - s.length) + i.description, i.default !== void 0 && (s += `(default: ${JSON.stringify(i.default)})`), n.push(s);
      }
      n.push("");
    }
    return n.length === 0 && (n.push("No description, no parama, no options, nothing."), n.push("")), n;
  }
}
A = new WeakSet(), P = function(t) {
  return t.split(/\s+/).filter(Boolean);
};
var w, g, _, y, b, h;
class Je {
  constructor() {
    l(this, "name");
    l(this, "action");
    l(this, "description");
    l(this, "params", {});
    l(this, "options", {});
    f(this, w, []);
    f(this, g, {});
    f(this, _, []);
    f(this, y, []);
    f(this, b, []);
    f(this, h, 0);
    arguments.length > 0 && (this.name = arguments[0]);
  }
  Name(t) {
    return this.name = t, this;
  }
  Action(t) {
    return this.action = t, this;
  }
  Description(t) {
    return this.description = t, this;
  }
  Param(t) {
    q(t);
    const n = t.name.replace(/\s+/g, "");
    return this.params[n] = t, u(this, w).push(u(this, h)), u(this, _).push(void 0), u(this, y).push(J[t.type]), u(this, b).push(t.default), $(this, h, u(this, h) + 1), this;
  }
  Option(t) {
    const n = t.name.replace(/\s+/g, "");
    return q(t), this.options[n] = t, u(this, g)["--" + t.name] = u(this, h), "short" in t && (u(this, g)["-" + t.short] = u(this, h)), t.type === "Boolean" ? (u(this, b).push(!1), u(this, _).push(!0)) : (u(this, b).push(t.default), u(this, _).push(!1)), u(this, y).push(J[t.type]), $(this, h, u(this, h) + 1), this;
  }
  call(t) {
    const n = C(u(this, b));
    let r = 0;
    t.push(void 0);
    for (let i = 0; i < t.length - 1; i++) {
      const s = t[i];
      if (s in u(this, g)) {
        const c = u(this, g)[s], d = u(this, y)[c];
        u(this, _)[c] ? n[c] = !0 : n[c] = d(t[++i]);
      } else if (r === u(this, w).length) {
        U("error: too many parameters");
        return;
      } else {
        const c = u(this, w)[r++], d = u(this, y)[c];
        n[c] = d(s);
      }
    }
    const o = this.action(...n);
    Ke(o) ? He(o) : ee(o) ? M(o) : typeof o == "string" && U(o);
  }
}
w = new WeakMap(), g = new WeakMap(), _ = new WeakMap(), y = new WeakMap(), b = new WeakMap(), h = new WeakMap();
const Y = 18, B = 28, J = {
  Number: parseInt,
  Float: parseFloat,
  String: (e) => e
}, q = Ve({ description: "" }), x = new Ye();
let k = {
  prompt: void 0,
  prompt_visibility: void 0,
  background_color: void 0,
  font_color: void 0,
  logging_interval: void 0
};
function qe(e) {
  k = e;
}
const Qe = {
  expose: [
    "enter"
  ],
  components: {
    LogLine: Me
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
        background_color: a.GRAY,
        font_color: a.WHITE
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
    log_to_buffer(e) {
      if (typeof e == "string")
        this.log_buffer.push([O(e)]);
      else if (ee(e)) {
        for (let t = 0; t < e.length; t++)
          typeof e[t] == "string" && (e[t] = O(e[t]));
        this.log_buffer.push(e);
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
      this.logging || (U(this.command_line), x.execute(this.command), this.cursor_index = 0, this.command_history.unshift(this.command), this.command_history_index = -1, this.$nextTick(() => {
        this.command = "";
      }));
    },
    history(e) {
      e.key === "ArrowUp" ? this.command_history_index < this.command_history.length - 1 && (this.command_history_index++, this.command = this.command_history[this.command_history_index], this.cursor_to_end()) : e.key === "ArrowDown" && this.command_history_index > 0 && (this.command_history_index--, this.command = this.command_history[this.command_history_index], this.cursor_to_end());
    },
    tab() {
      this.complete_index === -1 && (this.complete_command = x.complete(this.command)), this.complete_command.length !== 0 && (this.complete_index = (this.complete_index + 1) % this.complete_command.length, this.command = this.complete_command[this.complete_index], this.cursor_to_end());
    },
    cursor_to_end() {
      setTimeout(() => {
        this.$refs.terminal_input.setSelectionRange(this.command.length, this.command.length), this.cursor_index = 0;
      });
    },
    keydown(e) {
      e.key !== "Tab" && (this.complete_command = [], this.complete_index = -1);
    },
    update_cursor_index(e) {
      const t = e.target;
      setTimeout(() => {
        this.cursor_index = t.value.length - t.selectionEnd;
      });
    },
    focus(e) {
      e && (e.key === "Control" || e.ctrlKey && e.key === "c") || this.$nextTick(() => {
        this.$refs.terminal_input.focus();
      });
    }
  },
  watch: {
    "setting.background_color": function(e) {
      const t = this.$el.parentElement;
      Object.assign(t.style, {
        "background-color": e
      });
    },
    "setting.font_color": function(e) {
      console.log("font_color", e);
      const t = this.$el.parentElement;
      Object.assign(t.style, {
        color: e
      });
    }
  },
  computed: {
    command_line() {
      return this.setting.prompt_visibility ? [O(this.setting.prompt + this.command)] : [O(this.command)];
    }
  },
  mounted() {
    this.resize_observer = new ResizeObserver((e) => {
      for (let t of e)
        t.target === this.$refs.terminal_window && (this.terminal_width = t.contentRect.width, this.terminal_height = t.contentRect.height, this.terminal_line_length = Math.floor(this.terminal_width / Ue));
    }), this.resize_observer.observe(this.$refs.terminal_window), ze(this.log_to_buffer), qe(this.setting), this.focus();
  }
};
function Xe(e, t, n, r, o, i) {
  const s = Q("LogLine");
  return m(), p(S, null, [
    N("div", {
      class: "terminal_window",
      ref: "terminal_window",
      onKeydown: t[0] || (t[0] = (...c) => i.focus && i.focus(...c)),
      tabindex: "0"
    }, [
      (m(!0), p(S, null, I(o.log_lines, (c) => (m(), se(s, {
        log_line: c,
        terminal_line_length: o.terminal_line_length
      }, null, 8, ["log_line", "terminal_line_length"]))), 256)),
      z(N("div", null, [
        X(s, {
          ref: "command_line",
          log_line: i.command_line,
          terminal_line_length: o.terminal_line_length,
          cursor_index: o.cursor_index
        }, null, 8, ["log_line", "terminal_line_length", "cursor_index"])
      ], 512), [
        [ce, !o.logging]
      ])
    ], 544),
    z(N("input", {
      class: "terminal_input",
      ref: "terminal_input",
      "onUpdate:modelValue": t[1] || (t[1] = (c) => o.command = c),
      onKeydown: [
        t[2] || (t[2] = j((...c) => i.update_cursor_index && i.update_cursor_index(...c), ["left", "right"])),
        t[3] || (t[3] = j((...c) => i.history && i.history(...c), ["up", "down"])),
        t[4] || (t[4] = j((...c) => i.enter && i.enter(...c), ["enter"])),
        t[5] || (t[5] = j(ue((...c) => i.tab && i.tab(...c), ["prevent"]), ["tab"])),
        t[6] || (t[6] = (...c) => i.keydown && i.keydown(...c))
      ]
    }, null, 544), [
      [le, o.command]
    ])
  ], 64);
}
const Ze = /* @__PURE__ */ F(Qe, [["render", Xe], ["__scopeId", "data-v-aa044f7e"]]);
x.Command("color").Description("Set the console background and font color.").Option({ name: "background", type: "String", default: "gray", short: "b", description: "Set background color." }).Option({ name: "font", type: "String", default: "white", short: "f", description: "Set font color." }).Action((e, t) => {
  e.toUpperCase() in a ? k.background_color = a[e.toUpperCase()] : k.background_color = e, t.toUpperCase() in a ? k.font_color = a[t.toUpperCase()] : k.font_color = t;
});
x.Command("hello").Description("Say hello to the world.").Param({ name: "name", type: "String", default: "world", description: "Say hello to who." }).Option({ name: "ending", type: "String", default: "!", short: "e", description: "Punctuation." }).Option({ name: "show", type: "Boolean", short: "s", description: "Whether to display punctuation marks." }).Action((e, t, n) => `hello ${e}${n ? t : ""}`);
x.Command("help").Description("Provide help information for commands.").Param({ name: "command", type: "String", description: "Name of the command." }).Action((e) => x.help(e));
const ve = {
  components: {
    TerminalWindow: Ze
  }
}, et = { class: "terminal_container" };
function tt(e, t, n, r, o, i) {
  const s = Q("TerminalWindow");
  return m(), p("div", et, [
    X(s, { ref: "terminal_window" }, null, 512)
  ]);
}
const it = /* @__PURE__ */ F(ve, [["render", tt], ["__scopeId", "data-v-2b218421"]]);
export {
  it as Terminal,
  x as commanding,
  k as setting
};
