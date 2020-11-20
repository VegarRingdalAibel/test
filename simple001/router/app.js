(function() {
  var f = window.__fuse = window.__fuse || {};
  var modules = f.modules = f.modules || {}; f.dt = function (x) { return x && x.__esModule ? x : { "default": x }; };

f.modules = modules;
  f.bundle = function(collection, fn) {
    for (var num in collection) {
      modules[num] = collection[num];
    }
    fn ? fn() : void 0;
  };
  f.c = {};
  f.r = function(id) {
    var cached = f.c[id];
    if (cached) return cached.m.exports;
    var module = modules[id];
    if (!module) {
      
      throw new Error('Module ' + id + ' was not found');
    }
    cached = f.c[id] = {};
    cached.exports = {};
    cached.m = { exports: cached.exports };
    module(f.r, cached.exports, cached.m);
    return cached.m.exports;
  }; 
})();
__fuse.bundle({

// samples/router/fuseHmrPlugin.ts @2
2: function(__fusereq, exports, module){
exports.__esModule = true;
function __DefaultExport__(payload, helper) {
  const {updates} = payload;
  window.dispatchEvent(new CustomEvent('HMR-FUSEBOX'));
  if (helper.isStylesheeetUpdate) {
    helper.flushModules(updates);
    helper.updateModules();
    helper.callModules(updates);
  } else {
    helper.flushAll();
    helper.updateModules();
    helper.callEntries();
  }
}
exports.default = __DefaultExport__;

},

// node_modules/fuse-box/modules/fuse-box-css/index.js @6
6: function(__fusereq, exports, module){
var cssHandler = function (__filename, contents) {
  var styleId = __filename.replace(/[\.\/]+/g, '-');
  if (styleId.charAt(0) === '-') styleId = styleId.substring(1);
  var exists = document.getElementById(styleId);
  if (!exists) {
    var s = document.createElement(contents ? 'style' : 'link');
    s.id = styleId;
    s.type = 'text/css';
    if (contents) {
      s.innerHTML = contents;
    } else {
      s.rel = 'stylesheet';
      s.href = __filename;
    }
    document.getElementsByTagName('head')[0].appendChild(s);
  } else {
    if (contents) exists.innerHTML = contents;
  }
};
module.exports = cssHandler;

},

// samples/router/index.css @5
5: function(__fusereq, exports, module){
},

// node_modules/fuse-box/modules/fuse-box-websocket/index.js @10
10: function(__fusereq, exports, module){
const events = __fusereq(29);
function log(text) {
  console.info(`%c${text}`, 'color: #237abe');
}
class SocketClient {
  constructor(opts) {
    opts = opts || ({});
    const port = opts.port || window.location.port;
    const protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
    const domain = location.hostname || 'localhost';
    if (opts.connectionURL) {
      this.url = opts.connectionURL;
    } else {
      if (opts.useCurrentURL) {
        this.url = protocol + location.hostname + (location.port ? ':' + location.port : '');
      }
      if (opts.port) {
        this.url = `${protocol}${domain}:${opts.port}`;
      }
    }
    this.authSent = false;
    this.emitter = new events.EventEmitter();
  }
  reconnect(fn) {
    setTimeout(() => {
      this.emitter.emit('reconnect', {
        message: 'Trying to reconnect'
      });
      this.connect(fn);
    }, 5000);
  }
  on(event, fn) {
    this.emitter.on(event, fn);
  }
  connect(fn) {
    setTimeout(() => {
      log(`Connecting to FuseBox HMR at ${this.url}`);
      this.client = new WebSocket(this.url);
      this.bindEvents(fn);
    }, 0);
  }
  close() {
    this.client.close();
  }
  send(eventName, data) {
    if (this.client.readyState === 1) {
      this.client.send(JSON.stringify({
        name: eventName,
        payload: data || ({})
      }));
    }
  }
  error(data) {
    this.emitter.emit('error', data);
  }
  bindEvents(fn) {
    this.client.onopen = event => {
      log('Connection successful');
      if (fn) {
        fn(this);
      }
    };
    this.client.onerror = event => {
      this.error({
        reason: event.reason,
        message: 'Socket error'
      });
    };
    this.client.onclose = event => {
      this.emitter.emit('close', {
        message: 'Socket closed'
      });
      if (event.code !== 1011) {
        this.reconnect(fn);
      }
    };
    this.client.onmessage = event => {
      let data = event.data;
      if (data) {
        let item = JSON.parse(data);
        this.emitter.emit(item.name, item.payload);
      }
    };
  }
}
exports.SocketClient = SocketClient;

},

// node_modules/fuse-box/modules/events/index.js @29
29: function(__fusereq, exports, module){
function EventEmitter() {
  this._events = this._events || ({});
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;
EventEmitter.defaultMaxListeners = 10;
EventEmitter.prototype.setMaxListeners = function (n) {
  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};
EventEmitter.prototype.emit = function (type) {
  var er, handler, len, args, i, listeners;
  if (!this._events) this._events = {};
  if (type === 'error') {
    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er;
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }
  handler = this._events[type];
  if (isUndefined(handler)) return false;
  if (isFunction(handler)) {
    switch (arguments.length) {
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++) listeners[i].apply(this, args);
  }
  return true;
};
EventEmitter.prototype.addListener = function (type, listener) {
  var m;
  if (!isFunction(listener)) throw TypeError('listener must be a function');
  if (!this._events) this._events = {};
  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);
  if (!this._events[type]) this._events[type] = listener; else if (isObject(this._events[type])) this._events[type].push(listener); else this._events[type] = [this._events[type], listener];
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }
    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
      if (typeof console.trace === 'function') {
        console.trace();
      }
    }
  }
  return this;
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.once = function (type, listener) {
  if (!isFunction(listener)) throw TypeError('listener must be a function');
  var fired = false;
  function g() {
    this.removeListener(type, g);
    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }
  g.listener = listener;
  this.on(type, g);
  return this;
};
EventEmitter.prototype.removeListener = function (type, listener) {
  var list, position, length, i;
  if (!isFunction(listener)) throw TypeError('listener must be a function');
  if (!this._events || !this._events[type]) return this;
  list = this._events[type];
  length = list.length;
  position = -1;
  if (list === listener || isFunction(list.listener) && list.listener === listener) {
    delete this._events[type];
    if (this._events.removeListener) this.emit('removeListener', type, listener);
  } else if (isObject(list)) {
    for (i = length; i-- > 0; ) {
      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
        position = i;
        break;
      }
    }
    if (position < 0) return this;
    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }
    if (this._events.removeListener) this.emit('removeListener', type, listener);
  }
  return this;
};
EventEmitter.prototype.removeAllListeners = function (type) {
  var key, listeners;
  if (!this._events) return this;
  if (!this._events.removeListener) {
    if (arguments.length === 0) this._events = {}; else if (this._events[type]) delete this._events[type];
    return this;
  }
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }
  listeners = this._events[type];
  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];
  return this;
};
EventEmitter.prototype.listeners = function (type) {
  var ret;
  if (!this._events || !this._events[type]) ret = []; else if (isFunction(this._events[type])) ret = [this._events[type]]; else ret = this._events[type].slice();
  return ret;
};
EventEmitter.prototype.listenerCount = function (type) {
  if (this._events) {
    var evlistener = this._events[type];
    if (isFunction(evlistener)) return 1; else if (evlistener) return evlistener.length;
  }
  return 0;
};
EventEmitter.listenerCount = function (emitter, type) {
  return emitter.listenerCount(type);
};
function isFunction(arg) {
  return typeof arg === 'function';
}
function isNumber(arg) {
  return typeof arg === 'number';
}
function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
function isUndefined(arg) {
  return arg === void 0;
}

},

// node_modules/fuse-box/modules/fuse-box-hot-reload/clientHotReload.ts @3
3: function(__fusereq, exports, module){
exports.__esModule = true;
const {SocketClient} = __fusereq(10);
function log(text) {
  console.info(`%c${text}`, 'color: #237abe');
}
const STYLESHEET_EXTENSIONS = ['.css', '.scss', '.sass', '.less', '.styl'];
function gatherSummary() {
  const modules = [];
  for (const id in __fuse.modules) {
    modules.push(parseInt(id));
  }
  return {
    modules
  };
}
function createHMRHelper(payload) {
  const {updates} = payload;
  let isStylesheeetUpdate = true;
  for (const item of updates) {
    const file = item.path;
    const s = file.match(/(\.\w+)$/i);
    const extension = s[1];
    if (!STYLESHEET_EXTENSIONS.includes(extension)) {
      isStylesheeetUpdate = false;
    }
  }
  return {
    isStylesheeetUpdate,
    callEntries: () => {
      const appEntries = [1];
      for (const entryId of appEntries) {
        __fuse.r(entryId);
      }
    },
    callModules: modules => {
      for (const item of modules) __fuse.r(item.id);
    },
    flushAll: () => {
      __fuse.c = {};
    },
    flushModules: modules => {
      for (const item of modules) {
        __fuse.c[item.id] = undefined;
      }
    },
    updateModules: () => {
      for (const update of updates) {
        new Function(update.content)();
      }
    }
  };
}
exports.connect = opts => {
  let client = new SocketClient(opts);
  client.connect();
  client.on('get-summary', data => {
    const {id} = data;
    const summary = gatherSummary();
    client.send('summary', {
      id,
      summary
    });
  });
  client.on('reload', () => {
    window.location.reload();
  });
  client.on('hmr', payload => {
    const {updates} = payload;
    const hmr = createHMRHelper(payload);
    const hmrModuleId = 2;
    if (hmrModuleId) {
      const hmrModule = __fuse.r(hmrModuleId);
      if (!hmrModule.default) throw new Error('An HMR plugin must export a default function');
      hmrModule.default(payload, hmr);
      return;
    }
    hmr.updateModules();
    if (hmr.isStylesheeetUpdate) {
      log(`Flushing ${updates.map(item => item.path)}`);
      hmr.flushModules(updates);
      log(`Calling modules ${updates.map(item => item.path)}`);
      hmr.callModules(updates);
    } else {
      log(`Flushing all`);
      hmr.flushAll();
      log(`Calling entries all`);
      hmr.callEntries();
    }
  });
};

},

// node_modules/lit-html/lit-html.js @16
16: function(__fusereq, exports, module){
exports.__esModule = true;
var t, s;
const i = `lit$${(Math.random() + "").slice(9)}$`, e = "?" + i, h = `<${e}>`, o = document, l = (t = "") => o.createComment(t), n = t => null === t || "object" != typeof t && "function" != typeof t, r = Array.isArray, c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, u = />/g, a = />|[ 	\n\r]([^ -- "'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))/g, v = /'/g, d = /"/g, f = /^(?:script|style|textarea)$/i, p = 1, m = 2, g = 3, y = 4, $ = 5, x = t => (s, ...i) => ({
  _$litType$: t,
  strings: s,
  values: i
}), w = x(1), V = x(2), b = {}, T = {}, A = new Map(), z = t => (...s) => ({
  _$litDirective$: t,
  values: s
}), D = (t, s, i) => {
  var e, h;
  const o = null !== (e = null == i ? void 0 : i.renderBefore) && void 0 !== e ? e : s;
  let n = o.$lit$;
  if (void 0 === n) {
    const t = null !== (h = null == i ? void 0 : i.renderBefore) && void 0 !== h ? h : null;
    o.$lit$ = n = new Z(s.insertBefore(l(), t), t, i);
  }
  n._setValue(t);
}, E = o.createTreeWalker(o);
class M {
  update(t, s) {
    return this.render(...s);
  }
}
class N {
  constructor({strings: t, _$litType$: s}) {
    (this.t = [], E.currentNode = (this.i = o.createElement("template")).content);
    const n = (this.h = t).length - 1, r = [];
    let p, m, g = 2 === s ? "<svg>" : "", y = 0, $ = 0, x = 0, w = c;
    for (let s = 0; s < n; s++) {
      const e = t[s];
      let o, l, n = -1, p = 0;
      for (; p < e.length; ) {
        if ((w.lastIndex = p, l = w.exec(e), null === l)) {
          w === a && (n = -1);
          break;
        }
        (p = w.lastIndex, w === c ? "!--" === l[1] ? w = _ : void 0 !== l[1] ? w = u : void 0 !== l[2] ? (f.test(l[2]) && (m = RegExp("</" + l[2], "g")), w = a) : void 0 !== l[3] && (w = a) : w === a ? ">" === l[0] ? (w = null != m ? m : c, n = -1) : (n = w.lastIndex - l[2].length, o = l[1], w = void 0 === l[3] ? a : '"' === l[3] ? d : v) : w === d || w === v ? w = a : w === _ || w === u ? w = c : (w = a, m = void 0));
      }
      g += w === c ? e + h : (-1 !== n ? (r.push(o), e.slice(0, n) + "$lit$" + e.slice(n)) : e) + i;
    }
    if ((this.i.innerHTML = g + this.h[n], 2 === s)) {
      const t = this.i.content, s = t.firstChild;
      (s.remove(), t.append(...s.childNodes));
    }
    for (; null !== (p = E.nextNode()) && $ < n; ) {
      if (1 === p.nodeType) {
        if (p.hasAttributes()) {
          const {attributes: t} = p;
          for (let s = 0; s < t.length; s++) {
            const {name: e, value: h} = t[s];
            if (e.endsWith("$lit$")) {
              (s--, p.removeAttribute(e));
              const t = h.split(i), o = (/([.?@])?(.*)/).exec(r[x++]);
              (this.t.push({
                o: 1,
                l: y,
                _: o[2],
                h: t,
                u: "." === o[1] ? k : "?" === o[1] ? I : "@" === o[1] ? S : j
              }), $ += t.length - 1);
            } else e === i && (p.removeAttribute(e), s--, this.t.push({
              o: 6,
              l: y
            }));
          }
        }
        if (f.test(p.tagName)) {
          const t = p.textContent.split(i), s = t.length - 1;
          if (s > 0) {
            p.textContent = "";
            for (let i = 0; i < s; i++) (p.append(t[i] || l()), this.t.push({
              o: 2,
              l: ++y
            }), $++);
            p.append(t[s] || l());
          }
        }
      } else if (8 === p.nodeType) if (p.data === e) ($++, this.t.push({
        o: 2,
        l: y
      })); else {
        let t = -1;
        for (; -1 !== (t = p.data.indexOf(i, t + 1)); ) (this.t.push({
          o: 7,
          l: y
        }), $++, t += i.length - 1);
      }
      y++;
    }
  }
}
class R {
  constructor(t) {
    (this.t = [], this.v = t);
  }
  p(t) {
    const {i: {content: s}, t: i} = this.v, e = o.importNode(s, !0);
    E.currentNode = e;
    let h = E.nextNode(), l = 0, n = 0, r = i[0];
    for (; void 0 !== r && null !== h; ) {
      if (l === r.l) {
        let s;
        (2 === r.o ? s = new Z(h, h.nextSibling, t) : 1 === r.o && (s = new r.u(h, r._, r.h, t)), this.t.push(s), r = i[++n]);
      }
      void 0 !== r && l !== r.l && (h = E.nextNode(), l++);
    }
    return e;
  }
  m(t) {
    let s = 0;
    for (const i of this.t) void 0 !== i ? void 0 !== i.strings ? (i._setValue(t, s), s += i.strings.length - 1) : i._setValue(t[s++]) : s++;
  }
}
class Z {
  constructor(t, s, i) {
    (this._startNode = t, this._endNode = s, this.options = i, this.type = 2);
  }
  _setValue(t) {
    n(t) ? t !== this._value && this.g(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t._$litDirective$ ? this.V(t) : void 0 !== t.nodeType ? this._commitNode(t) : (t => r(t) || t && "function" == typeof t[Symbol.iterator])(t) ? this.T(t) : t === T ? (this._value = T, this.A()) : t !== b && this.g(t);
  }
  D(t, s = this._endNode) {
    return this._startNode.parentNode.insertBefore(t, s);
  }
  V(t) {
    var s;
    const i = t._$litDirective$;
    ((null === (s = this.M) || void 0 === s ? void 0 : s.constructor) !== i && (this.A(), this.M = new i(this)), this._setValue(this.M.update(this, t.values)));
  }
  _commitNode(t) {
    this._value !== t && (this.A(), this._value = this.D(t));
  }
  g(t) {
    const s = this._startNode.nextSibling;
    (null != t || (t = ""), null !== s && 3 === s.nodeType && (null === this._endNode ? null === s.nextSibling : s === this._endNode.previousSibling) ? s.data = t : this._commitNode(new Text(t)), this._value = t);
  }
  $(t) {
    const {strings: s, values: i} = t;
    let e = A.get(s);
    if ((void 0 === e && A.set(s, e = new N(t)), null != this._value && this._value.v === e)) this._value.m(i); else {
      const t = new R(e), s = t.p(this.options);
      (t.m(i), this._commitNode(s), this._value = t);
    }
  }
  T(t) {
    r(this._value) || (this._value = [], this.A());
    const s = this._value;
    let i, e = 0;
    for (const h of t) (e === s.length ? s.push(i = new Z(this.D(l()), this.D(l()), this.options)) : i = s[e], i._setValue(h), e++);
    e < s.length && (s.length = e, this.A(null == i ? void 0 : i._endNode.nextSibling));
  }
  A(t = this._startNode.nextSibling) {
    for (; t && t !== this._endNode; ) {
      const s = t.nextSibling;
      (t.remove(), t = s);
    }
  }
}
class j {
  constructor(t, s, i, e) {
    (this.type = 1, this._value = T, this.element = t, this.name = s, i.length > 2 || "" !== i[0] || "" !== i[1] ? (this._value = Array(i.length - 1).fill(T), this.strings = i) : this._value = T);
  }
  get tagName() {
    return this.element.tagName;
  }
  N(t, s) {
    var i, e;
    const h = null === (i = t) || void 0 === i ? void 0 : i._$litDirective$;
    if (void 0 !== h) {
      let i = (null !== (e = this.R) && void 0 !== e ? e : this.R = [])[s];
      ((null == i ? void 0 : i.constructor) !== h && (i = this.R[s] = new h(this)), t = i.update(this, t.values));
    }
    return null != t ? t : "";
  }
  _setValue(t, s) {
    const i = this.strings;
    if (void 0 === i) {
      const s = this.N(t, 0);
      (n(s) || s === T) && s === this._value || s === b || this.Z(this._value = s);
    } else {
      let e, h, o = i[0], l = !1, r = !1;
      for (e = 0; e < i.length - 1; e++) (h = this.N(t[s + e], e), h === b ? h = this._value[e] : (r = r || h === T, l = l || !((n(h) || h === T) && h === this._value[e]), this._value[e] = h), o += ("string" == typeof h ? h : h + "") + i[e + 1]);
      l && this.Z(r ? T : o);
    }
  }
  Z(t) {
    t === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t);
  }
}
class k extends j {
  constructor() {
    (super(...arguments), this.type = 3);
  }
  Z(t) {
    this.element[this.name] = t === T ? void 0 : t;
  }
}
class I extends j {
  constructor() {
    (super(...arguments), this.type = 4);
  }
  Z(t) {
    t && t !== T ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name);
  }
}
class S extends j {
  constructor(...t) {
    var s;
    (super(...t), this.type = 5, this.j = null === (s = t[3]) || void 0 === s ? void 0 : s.eventContext);
  }
  _setValue(t) {
    null != t || (t = T);
    const s = this._value, i = t === T && s !== T || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, e = t !== T && (s === T || i);
    (i && this.element.removeEventListener(this.name, this, s), e && this.element.addEventListener(this.name, this, t), this._value = t);
  }
  handleEvent(t) {
    var s;
    "function" == typeof this._value ? this._value.call(null !== (s = this.j) && void 0 !== s ? s : this.element, t) : this._value.handleEvent(t);
  }
}
(null !== (t = (s = globalThis).litHtmlVersions) && void 0 !== t ? t : s.litHtmlVersions = []).push("2.0.0-pre.3");
exports.ATTRIBUTE_PART = p;
exports.AttributePart = j;
exports.BOOLEAN_ATTRIBUTE_PART = y;
exports.BooleanAttributePart = I;
exports.Directive = M;
exports.EVENT_PART = $;
exports.EventPart = S;
exports.NODE_PART = m;
exports.NodePart = Z;
exports.PROPERTY_PART = g;
exports.PropertyPart = k;
exports.directive = z;
exports.html = w;
exports.noChange = b;
exports.nothing = T;
exports.render = D;
exports.svg = V;

},

// packages/core/src/requestRender.ts @26
26: function(__fusereq, exports, module){
function requestRender(ctx) {
  if (ctx.isConnected) {
    if (ctx.__wait) {} else {
      ctx.__wait = true;
      requestAnimationFrame(async () => {
        await Promise.resolve(true);
        ctx.render();
        ctx.__wait = false;
      });
    }
  }
}
exports.requestRender = requestRender;

},

// packages/core/src/symbols.ts @38
38: function(__fusereq, exports, module){
function initSymbolCache() {
  if (!globalThis._LHF_SYMBOL) {
    globalThis._LHF_SYMBOL = {};
    globalThis._LHF_PROP_SYMBOL = {};
  }
}
exports.initSymbolCache = initSymbolCache;
function getObservedAttributesMapSymbol() {
  if (!globalThis._LHF_SYMBOL.observedAttributesMap) {
    globalThis._LHF_SYMBOL.observedAttributesMap = Symbol('observedAttributesMap');
    return globalThis._LHF_SYMBOL.observedAttributesMap;
  } else {
    return globalThis._LHF_SYMBOL.observedAttributesMap;
  }
}
exports.getObservedAttributesMapSymbol = getObservedAttributesMapSymbol;
function getObservedAttributesSymbol() {
  if (!globalThis._LHF_SYMBOL.observedAttributes) {
    globalThis._LHF_SYMBOL.observedAttributes = Symbol('observedAttributes');
    return globalThis._LHF_SYMBOL.observedAttributes;
  } else {
    return globalThis._LHF_SYMBOL.observedAttributes;
  }
}
exports.getObservedAttributesSymbol = getObservedAttributesSymbol;
function getPropSymbol(name) {
  if (!globalThis._LHF_PROP_SYMBOL[name]) {
    globalThis._LHF_PROP_SYMBOL[name] = Symbol(name);
    return globalThis._LHF_PROP_SYMBOL[name];
  } else {
    return globalThis._LHF_PROP_SYMBOL[name];
  }
}
exports.getPropSymbol = getPropSymbol;
function getLoggerSymbol() {
  if (!globalThis._LHF_SYMBOL.logger) {
    globalThis._LHF_SYMBOL.logger = Symbol('logger');
    return globalThis._LHF_SYMBOL.logger;
  } else {
    return globalThis._LHF_SYMBOL.logger;
  }
}
exports.getLoggerSymbol = getLoggerSymbol;
function getLoggerCountSymbol() {
  if (!globalThis._LHF_SYMBOL.loggerCount) {
    globalThis._LHF_SYMBOL.loggerCount = Symbol('loggerCount');
    return globalThis._LHF_SYMBOL.loggerCount;
  } else {
    return globalThis._LHF_SYMBOL.loggerCount;
  }
}
exports.getLoggerCountSymbol = getLoggerCountSymbol;
function getTransmitterSymbol() {
  if (!globalThis._LHF_SYMBOL.transmitter) {
    globalThis._LHF_SYMBOL.transmitter = Symbol('transmitter');
    return globalThis._LHF_SYMBOL.transmitter;
  } else {
    return globalThis._LHF_SYMBOL.transmitter;
  }
}
exports.getTransmitterSymbol = getTransmitterSymbol;
initSymbolCache();

},

// packages/core/src/logger.ts @21
21: function(__fusereq, exports, module){
exports.__esModule = true;
var symbols_1 = __fusereq(38);
let log = false;
let skipElements = [];
if (!globalThis[symbols_1.getLoggerSymbol()]) {
  globalThis[symbols_1.getLoggerSymbol()] = new WeakMap();
  globalThis[symbols_1.getLoggerCountSymbol()] = 0;
}
function enableInternalLogger(skip = []) {
  skipElements = skip;
  log = true;
}
exports.enableInternalLogger = enableInternalLogger;
function disableInternalLogger() {
  log = false;
}
exports.disableInternalLogger = disableInternalLogger;
function registerLoggerContext(context) {
  if (log) {
    const map = globalThis[symbols_1.getLoggerSymbol()];
    if (map.has(context)) {
      throw 'contxt duplicate';
    }
    const count = globalThis[symbols_1.getLoggerCountSymbol()] + 1;
    globalThis[symbols_1.getLoggerCountSymbol()] = count;
    map.set(context, count);
  }
}
function getID(ctx) {
  if (log) {
    const map = globalThis[symbols_1.getLoggerSymbol()];
    return map.get(ctx);
  }
}
function logger(name, ctx, tag) {
  if (log && skipElements.indexOf(tag) === -1) {
    let id = getID(ctx);
    if (!id) {
      registerLoggerContext(ctx);
    }
    id = getID(ctx);
    const text = name || '??' + '' + (id || '?');
    const x = 25 - Math.floor(text.length);
    const idOnly = '' + (id || '?');
    const y = 6 - Math.floor(idOnly.length);
    console.log(`@SIMPLE-HTML/core | ${name}${Array(x).join(' ')}| id:${id || '?'}${Array(y).join(' ')} | IsConnected:${ctx && ctx.isConnected === true ? 'Y' : 'N'} |  ${tag}`);
  }
}
exports.logger = logger;

},

// packages/core/src/property.ts @22
22: function(__fusereq, exports, module){
exports.__esModule = true;
var requestRender_1 = __fusereq(26);
var symbols_1 = __fusereq(38);
var logger_1 = __fusereq(21);
function property(options = {}) {
  return function reg(_class, prop) {
    Object.defineProperty(_class, prop, {
      get: function () {
        return this[symbols_1.getPropSymbol(this.tagName + '_' + prop)];
      },
      set: function (x) {
        logger_1.logger('property set', this, this.tagName);
        const oldValue = this[symbols_1.getPropSymbol(this.tagName + '_' + prop)];
        this[symbols_1.getPropSymbol(this.tagName + '_' + prop)] = x;
        if (this.valuesChanged && oldValue !== x) {
          this.valuesChanged('property', prop, oldValue, x);
        }
        if (oldValue !== x && !options.skipRender) {
          requestRender_1.requestRender(this);
        }
      },
      configurable: true
    });
  };
}
exports.property = property;

},

// packages/core/src/prop.ts @20
20: function(__fusereq, exports, module){
exports.__esModule = true;
var symbols_1 = __fusereq(38);
function prop() {
  return function reg(_class, prop) {
    Object.defineProperty(_class, prop, {
      get: function () {
        return this[symbols_1.getPropSymbol(this.tagName + '_' + prop)];
      },
      set: function (x) {
        this[symbols_1.getPropSymbol(this.tagName + '_' + prop)] = x;
        return true;
      },
      configurable: true
    });
  };
}
exports.prop = prop;

},

// packages/core/src/customElement.ts @23
23: function(__fusereq, exports, module){
exports.__esModule = true;
var lit_html_1 = __fusereq(16);
var symbols_1 = __fusereq(38);
var logger_1 = __fusereq(21);
function customElement(elementName, extended) {
  return function reg(elementClass) {
    const observedAttributes = elementClass.observedAttributes;
    Object.defineProperty(elementClass, 'observedAttributes', {
      set: function (value) {
        elementClass.prototype[symbols_1.getObservedAttributesSymbol()] = value;
        return true;
      },
      get: function () {
        return elementClass.prototype[symbols_1.getObservedAttributesSymbol()];
      },
      configurable: true
    });
    if (Array.isArray(observedAttributes) && Array.isArray(elementClass.observedAttributes)) {
      elementClass.observedAttributes = elementClass.observedAttributes.concat(observedAttributes);
    }
    if (Array.isArray(observedAttributes) && !Array.isArray(elementClass.observedAttributes)) {
      elementClass.observedAttributes = observedAttributes;
    }
    const Base = class extends elementClass {
      constructor() {
        super();
        logger_1.logger('constructor', this, super.tagName);
      }
      renderCalled() {
        if (super.renderCalled) {
          super.renderCalled.call(this);
        }
      }
      render(...result) {
        if (super.render) {
          logger_1.logger('render', this, super.tagName);
          const template = super.render.call(this, ...result);
          Promise.resolve(template).then(templates => {
            lit_html_1.render(templates, this, {
              eventContext: this
            });
            if (super.updated) {
              requestAnimationFrame(() => {
                super.updated();
              });
            }
          });
        }
        this.renderCalled();
      }
      connectedCallback() {
        logger_1.logger('connectedCallback', this, super.tagName);
        if (super.connectedCallback) {
          super.connectedCallback.call(this);
        }
        this.render(this);
      }
      register(call) {
        if (this.callers) {
          this.callers.push(call);
        } else {
          this.callers = [];
          this.callers.push(call);
        }
      }
      disconnectedCallback() {
        logger_1.logger('disconnectedCallback', this, super.tagName);
        if (this.callers) {
          this.callers.forEach(call => call());
        }
        this.callers = [];
        if (super.disconnectedCallback) {
          super.disconnectedCallback.call(this);
        }
      }
      attributeChangedCallback(name, oldValue, newValue) {
        logger_1.logger('attributeChangedCallback', this, super.tagName);
        if (!this[symbols_1.getObservedAttributesMapSymbol()]) {
          const attribute = name.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
          this[symbols_1.getObservedAttributesMapSymbol()] = new Map();
          this[symbols_1.getObservedAttributesMapSymbol()].set(attribute, name);
        }
        const nameProp = this[symbols_1.getObservedAttributesMapSymbol()].get(name);
        this[nameProp] = newValue || '';
        if (super.attributeChangedCallback) {
          super.attributeChangedCallback.call(this, name, oldValue, newValue);
        }
        if (super.valuesChanged) {
          super.valuesChanged('attribute', name, oldValue, newValue);
        }
      }
    };
    if (!customElements.get(elementName)) {
      if (extended) {
        customElements.define(elementName, Base, extended);
      } else {
        customElements.define(elementName, Base);
      }
    } else {
      if (globalThis.hmrCache) {
        if (extended) {
          customElements.define(elementName, Base, extended);
        } else {
          customElements.define(elementName, Base);
        }
      }
    }
  };
}
exports.customElement = customElement;

},

// packages/core/src/transmitter.ts @24
24: function(__fusereq, exports, module){
exports.__esModule = true;
var symbols_1 = __fusereq(38);
if (!globalThis[symbols_1.getTransmitterSymbol()]) {
  globalThis[symbols_1.getTransmitterSymbol()] = {};
}
function transmitter() {
  return globalThis[symbols_1.getTransmitterSymbol()];
}
function publish(channel, ...args) {
  Promise.resolve().then(() => {
    if (Array.isArray(transmitter()[channel])) {
      for (let i = 0, len = transmitter()[channel].length; i < len; i++) {
        const ctx = transmitter()[channel][i].ctx;
        transmitter()[channel][i].func.apply(ctx, args);
      }
    }
  });
}
exports.publish = publish;
function publishSync(channel, ...args) {
  if (Array.isArray(transmitter()[channel])) {
    for (let i = 0, len = transmitter()[channel].length; i < len; i++) {
      const ctx = transmitter()[channel][i].ctx;
      transmitter()[channel][i].func.apply(ctx, args);
    }
  }
}
exports.publishSync = publishSync;
function publishNext(channel, ...args) {
  setTimeout(() => {
    if (Array.isArray(transmitter()[channel])) {
      for (let i = 0, len = transmitter()[channel].length; i < len; i++) {
        const ctx = transmitter()[channel][i].ctx;
        transmitter()[channel][i].func.apply(ctx, args);
      }
    }
  }, 0);
}
exports.publishNext = publishNext;
function unSubscribe(channel, ctx) {
  if (Array.isArray(transmitter()[channel])) {
    const events = transmitter()[channel].filter(event => {
      if (event.ctx !== ctx) {
        return true;
      } else {
        return false;
      }
    });
    transmitter()[channel] = events;
  }
}
exports.unSubscribe = unSubscribe;
function subscribe(channel, ctx, func) {
  if (!Array.isArray(transmitter()[channel])) {
    transmitter()[channel] = [];
  }
  transmitter()[channel].push({
    ctx: ctx,
    func: func
  });
}
exports.subscribe = subscribe;

},

// packages/core/src/disconnectedCallback.ts @27
27: function(__fusereq, exports, module){
function disconnectedCallback(ctx, call) {
  ctx.register(call);
}
exports.disconnectedCallback = disconnectedCallback;

},

// packages/core/src/state.ts @25
25: function(__fusereq, exports, module){
exports.__esModule = true;
var a__1 = __fusereq(9);
let state = window.state || ({});
const keys = new Set();
if (!window.state) {
  window.addEventListener('HMR-FUSEBOX', () => {
    window.state = state;
    console.log('HMR-FUSEBOX', window.state);
  });
}
function getState() {
  state;
}
exports.getState = getState;
function setState(newState) {
  state = newState;
}
exports.setState = setState;
function assignState(obj, part) {
  return Object.assign(obj, part);
}
exports.assignState = assignState;
function stateContainer(key, defaultValue, customPublishedTrigger) {
  if (!state.hasOwnProperty(key)) {
    state[key] = defaultValue;
  }
  const currentState = state[key];
  const setter = function (value) {
    state[key] = value;
  };
  const middleware = function (value) {
    setter(value);
    a__1.publish(key, value);
  };
  return [currentState, customPublishedTrigger ? setter : middleware];
}
exports.stateContainer = stateContainer;
function validateKey(key) {
  if (keys.has(key)) {
    throw new Error(`state key used allready, use another name`);
  } else {
    keys.add(key);
    return key;
  }
}
exports.validateKey = validateKey;

},

// node_modules/tslib/tslib.es6.js @28
28: function(__fusereq, exports, module){
exports.__esModule = true;
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || ({
    __proto__: []
  }) instanceof Array && (function (d, b) {
    d.__proto__ = b;
  }) || (function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  });
  return extendStatics(d, b);
};
function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
exports.__extends = __extends;
exports.__assign = function () {
  exports.__assign = Object.assign || (function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  });
  return exports.__assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
exports.__rest = __rest;
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return (c > 3 && r && Object.defineProperty(target, key, r), r);
}
exports.__decorate = __decorate;
function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
exports.__param = __param;
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
exports.__metadata = __metadata;
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
exports.__awaiter = __awaiter;
function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  }, f, y, t, g;
  return (g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g);
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if ((f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)) return t;
      if ((y = 0, t)) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
exports.__generator = __generator;
exports.__createBinding = Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
};
function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) exports.__createBinding(o, m, p);
}
exports.__exportStar = __exportStar;
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
exports.__values = __values;
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
exports.__read = __read;
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
  return ar;
}
exports.__spread = __spread;
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; (j++, k++)) r[k] = a[j];
  return r;
}
exports.__spreadArrays = __spreadArrays;
;
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
exports.__await = __await;
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return (i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);
  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if ((f(v), q.shift(), q.length)) resume(q[0][0], q[0][1]);
  }
}
exports.__asyncGenerator = __asyncGenerator;
function __asyncDelegator(o) {
  var i, p;
  return (i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i);
  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}
exports.__asyncDelegator = __asyncDelegator;
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && (function (v) {
      return new Promise(function (resolve, reject) {
        (v = o[n](v), settle(resolve, reject, v.done, v.value));
      });
    });
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}
exports.__asyncValues = __asyncValues;
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
exports.__makeTemplateObject = __makeTemplateObject;
;
var __setModuleDefault = Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
};
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) exports.__createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}
exports.__importStar = __importStar;
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}
exports.__importDefault = __importDefault;
function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
exports.__classPrivateFieldGet = __classPrivateFieldGet;
function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
exports.__classPrivateFieldSet = __classPrivateFieldSet;

},

// packages/core/src/attribute.ts @19
19: function(__fusereq, exports, module){
exports.__esModule = true;
var requestRender_1 = __fusereq(26);
var symbols_1 = __fusereq(38);
var logger_1 = __fusereq(21);
function attribute(options = {}) {
  return function reg(_class, prop) {
    Object.defineProperty(_class, prop, {
      get: function () {
        return this[symbols_1.getPropSymbol(this.tagName + '_' + prop)];
      },
      set: function (x) {
        logger_1.logger('attribute set', this, this.tagName);
        const oldValue = this[symbols_1.getPropSymbol(this.tagName + '_' + prop)];
        this[symbols_1.getPropSymbol(this.tagName + '_' + prop)] = x;
        if (this.valuesChanged && oldValue !== x) {
          this.valuesChanged('property', prop, oldValue, x);
        }
        if (oldValue !== x && !options.skipRender) {
          requestRender_1.requestRender(this);
        }
      },
      configurable: true
    });
    const attribute = prop.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
    if (!_class[symbols_1.getObservedAttributesMapSymbol()]) {
      _class[symbols_1.getObservedAttributesMapSymbol()] = new Map();
    }
    _class[symbols_1.getObservedAttributesMapSymbol()].set(attribute, prop);
    if (_class[symbols_1.getObservedAttributesSymbol()]) {
      _class[symbols_1.getObservedAttributesSymbol()].push(attribute);
    } else {
      _class[symbols_1.getObservedAttributesSymbol()] = [];
      _class[symbols_1.getObservedAttributesSymbol()].push(attribute);
    }
  };
}
exports.attribute = attribute;

},

// packages/core/src/index.ts @9
9: function(__fusereq, exports, module){
exports.__esModule = true;
__fusereq(28);
var attribute_1 = __fusereq(19);
exports.attribute = attribute_1.attribute;
var prop_1 = __fusereq(20);
exports.prop = prop_1.prop;
var logger_1 = __fusereq(21);
exports.enableInternalLogger = logger_1.enableInternalLogger;
exports.disableInternalLogger = logger_1.disableInternalLogger;
var property_1 = __fusereq(22);
exports.property = property_1.property;
var customElement_1 = __fusereq(23);
exports.customElement = customElement_1.customElement;
var transmitter_1 = __fusereq(24);
exports.publish = transmitter_1.publish;
exports.subscribe = transmitter_1.subscribe;
exports.unSubscribe = transmitter_1.unSubscribe;
exports.publishNext = transmitter_1.publishNext;
exports.publishSync = transmitter_1.publishSync;
var state_1 = __fusereq(25);
exports.validateKey = state_1.validateKey;
exports.stateContainer = state_1.stateContainer;
exports.stateResult = state_1.stateResult;
exports.assignState = state_1.assignState;
var requestRender_1 = __fusereq(26);
exports.requestRender = requestRender_1.requestRender;
var disconnectedCallback_1 = __fusereq(27);
exports.disconnectedCallback = disconnectedCallback_1.disconnectedCallback;

},

// node_modules/fuse-box/modules/fuse_helpers_decorate/index.js @18
18: function(__fusereq, exports, module){
function d(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return (c > 3 && r && Object.defineProperty(target, key, r), r);
}
exports.d = d;
function p(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
exports.p = p;
function m(metadataKey, metadataValue) {
  if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') return Reflect.metadata(metadataKey, metadataValue);
}
exports.m = m;

},

// packages/router/src/gotoURL.ts @35
35: function(__fusereq, exports, module){
exports.__esModule = true;
exports.gotoURL = function (path, params = {}, query = null) {
  if (path[0] === '#') {
    path = path.substr(1, path.length);
  }
  const urls = path.split('/').filter(x => x ? true : false);
  let newUrl = '';
  urls.forEach((val, i) => {
    if (val[0] === ':' && params[val.substr(1, val.length)] !== undefined) {
      newUrl = newUrl + params[val.substr(1, val.length)];
    } else {
      newUrl = newUrl + `${val}`;
    }
    if (urls.length - 1 !== i) {
      newUrl = newUrl + `/`;
    }
  });
  newUrl = `#${newUrl}`;
  let urlparams;
  if (query) {
    urlparams = new URLSearchParams();
    for (const k in query) {
      if (query[k]) {
        urlparams.append(k, query[k]);
      }
    }
    location.hash = `${newUrl}?${urlparams.toString()}`;
  } else {
    location.hash = newUrl;
  }
};

},

// packages/router/src/routeMatchAsync.ts @34
34: function(__fusereq, exports, module){
exports.__esModule = true;
var lit_html_1 = __fusereq(16);
var routeMatch_1 = __fusereq(33);
const AsyncTask = class extends lit_html_1.Directive {
  render() {
    return '';
  }
  update(part, args) {
    Promise.resolve(args[0]).then(() => {
      part._setValue(args[1]);
    });
  }
};
exports.resolvePromise = lit_html_1.directive(AsyncTask);
exports.routeMatchAsync = function (hash = '', importStatement, htmlTemplate) {
  if (routeMatch_1.routeMatch(hash)) {
    return exports.resolvePromise(importStatement(), htmlTemplate);
  } else {
    return '';
  }
};

},

// packages/router/src/PATH_SLASH_REGEX.ts @49
49: function(__fusereq, exports, module){
exports.__esModule = true;
exports.PATH_SLASH_REGEX = '\\/';

},

// packages/router/src/createRouteRegex.ts @44
44: function(__fusereq, exports, module){
exports.__esModule = true;
var PATH_SLASH_REGEX_1 = __fusereq(49);
function createRouteRegex(pathPattern, openEnd) {
  let regex = '';
  pathPattern.forEach((pattern, index) => {
    if (pathPattern.length > 1 && index === 0 || pathPattern.length === 1) {
      regex = '^' + pattern.regex;
    } else {
      if (pattern.regex === PATH_SLASH_REGEX_1.PATH_SLASH_REGEX) {
        regex = regex + pattern.regex;
      } else {
        regex = regex + PATH_SLASH_REGEX_1.PATH_SLASH_REGEX + pattern.regex;
      }
    }
    if (!openEnd && pathPattern.length - 1 === index) {
      regex = regex + '($|/$)';
    }
  });
  return regex;
}
exports.createRouteRegex = createRouteRegex;

},

// packages/router/src/PATH_ARGUMENT_REGEX.ts @48
48: function(__fusereq, exports, module){
exports.__esModule = true;
exports.PATH_ARGUMENT_REGEX = '[a-zA-Z0-9\\_\\-\\:]+';

},

// packages/router/src/isVariable.ts @51
51: function(__fusereq, exports, module){
function isVariable(path) {
  if (path && typeof path === 'string' && path[0] === ':') {
    return true;
  } else {
    return false;
  }
}
exports.isVariable = isVariable;

},

// packages/router/src/getVariableName.ts @50
50: function(__fusereq, exports, module){
function getVariableName(path) {
  return path.substring(1, path.length);
}
exports.getVariableName = getVariableName;

},

// packages/router/src/parseUrlPattern.ts @43
43: function(__fusereq, exports, module){
exports.__esModule = true;
var PATH_ARGUMENT_REGEX_1 = __fusereq(48);
var PATH_SLASH_REGEX_1 = __fusereq(49);
var getVariableName_1 = __fusereq(50);
var isVariable_1 = __fusereq(51);
function parseUrlPattern(urlPattern) {
  const paths = urlPattern.split('/');
  const pathsConfig = [];
  paths.forEach((path, index) => {
    if (index === paths.length - 1 && path === '' && urlPattern[urlPattern.length - 1] === PATH_SLASH_REGEX_1.PATH_SLASH_REGEX) {} else {
      pathsConfig.push({
        staticType: !isVariable_1.isVariable(path),
        variable: isVariable_1.isVariable(path) ? getVariableName_1.getVariableName(path) : null,
        regex: isVariable_1.isVariable(path) ? PATH_ARGUMENT_REGEX_1.PATH_ARGUMENT_REGEX : path
      });
    }
  });
  return pathsConfig;
}
exports.parseUrlPattern = parseUrlPattern;

},

// packages/router/src/routeMatch.ts @33
33: function(__fusereq, exports, module){
exports.__esModule = true;
var parseUrlPattern_1 = __fusereq(43);
var createRouteRegex_1 = __fusereq(44);
exports.routeMatch = function (hash = '', locationhash = window.location.hash) {
  if (!hash && (locationhash === '' || locationhash === '#')) {
    return true;
  }
  if (locationhash.indexOf('?') !== -1) {
    locationhash = locationhash.split('?')[0];
  }
  let openEnd = false;
  if (hash[hash.length - 1] === '*') {
    hash = hash.substring(0, hash.length - 1);
    openEnd = true;
  }
  const pattern = parseUrlPattern_1.parseUrlPattern(hash);
  const regexString = createRouteRegex_1.createRouteRegex(pattern, openEnd);
  const regex = new RegExp(regexString);
  return regex.test(locationhash);
};

},

// packages/router/src/getUrlVars.ts @52
52: function(__fusereq, exports, module){
function getUrlVars(string) {
  const vars = {};
  string.replace(/[?&]+([^=&]+)=([^&]*)/gi, (_m, key, value) => {
    vars[key] = value;
  });
  return vars;
}
exports.getUrlVars = getUrlVars;

},

// packages/router/src/getVariables.ts @45
45: function(__fusereq, exports, module){
exports.__esModule = true;
var getUrlVars_1 = __fusereq(52);
function getVariables(pathPattern, pattern) {
  const paths = pattern.split('?')[0].split('/');
  const args = {
    _paths: []
  };
  paths.forEach((path, i) => {
    if (pathPattern[i] && pathPattern[i].variable) {
      args[pathPattern[i].variable] = path;
    }
    if (i >= pathPattern.length - 1) {
      args._paths.push(path);
    }
  });
  args._query = getUrlVars_1.getUrlVars(pattern);
  return args;
}
exports.getVariables = getVariables;

},

// packages/router/src/getRouteParams.ts @36
36: function(__fusereq, exports, module){
exports.__esModule = true;
var parseUrlPattern_1 = __fusereq(43);
var getVariables_1 = __fusereq(45);
exports.getRouteParams = function (hash, locationhash = window.location.hash) {
  const pattern = parseUrlPattern_1.parseUrlPattern(hash);
  return getVariables_1.getVariables(pattern, locationhash);
};

},

// packages/router/src/index.ts @15
15: function(__fusereq, exports, module){
exports.__esModule = true;
var core_1 = __fusereq(9);
var routeMatch_1 = __fusereq(33);
exports.routeMatch = routeMatch_1.routeMatch;
var routeMatchAsync_1 = __fusereq(34);
exports.routeMatchAsync = routeMatchAsync_1.routeMatchAsync;
var gotoURL_1 = __fusereq(35);
exports.gotoURL = gotoURL_1.gotoURL;
var getRouteParams_1 = __fusereq(36);
exports.getRouteParams = getRouteParams_1.getRouteParams;
const HASH_RENDER_EVENT = 'HASH_RENDER_EVENT';
function subscribeHashEvent(ctx, call) {
  core_1.subscribe(HASH_RENDER_EVENT, ctx, call);
}
exports.subscribeHashEvent = subscribeHashEvent;
function unSubscribeHashEvent(ctx) {
  core_1.unSubscribe(HASH_RENDER_EVENT, ctx);
}
exports.unSubscribeHashEvent = unSubscribeHashEvent;
function publishHashEvent() {
  core_1.publish(HASH_RENDER_EVENT);
}
exports.publishHashEvent = publishHashEvent;
const CAN_DEACTIVATE_EVENT = 'CAN_DEACTIVATE_EVENT';
function subscribeCanDeactivateEvent(ctx, call) {
  core_1.subscribe(CAN_DEACTIVATE_EVENT, ctx, call);
}
exports.subscribeCanDeactivateEvent = subscribeCanDeactivateEvent;
function unSubscribeCanDeactivateEvent(ctx) {
  core_1.unSubscribe(CAN_DEACTIVATE_EVENT, ctx);
}
exports.unSubscribeCanDeactivateEvent = unSubscribeCanDeactivateEvent;
function publishCanDeactivateEvent() {
  core_1.publish(CAN_DEACTIVATE_EVENT);
}
exports.publishCanDeactivateEvent = publishCanDeactivateEvent;
exports.canDeactivateCallers = [];
const canDeactivate = function () {
  return new Promise(async resolve => {
    exports.canDeactivateCallers = [];
    publishCanDeactivateEvent();
    setTimeout(async () => {
      let result = true;
      for (let i = 0; i < exports.canDeactivateCallers.length; i++) {
        const y = await Promise.resolve(exports.canDeactivateCallers[i]);
        if (y === false) {
          result = y;
        }
      }
      resolve(result);
    }, 0);
  });
};
exports.stopCanDeactivate = function (promise) {
  exports.canDeactivateCallers.push(promise);
};
function init() {
  let oldhash = window.location.hash;
  let isBackEvent = false;
  const hashChange = function () {
    if (!isBackEvent) {
      canDeactivate().then(result => {
        if (result) {
          oldhash = window.location.hash;
          core_1.publish(HASH_RENDER_EVENT);
        } else {
          isBackEvent = true;
          window.location.hash = oldhash;
        }
      });
    } else {
      isBackEvent = false;
    }
  };
  window.addEventListener('hashchange', hashChange);
  const cleanUp = {
    handleEvent: function () {
      window.removeEventListener('HMR-FUSEBOX', cleanUp);
      window.removeEventListener('hashchange', hashChange);
    }
  };
  window.addEventListener('HMR-FUSEBOX', cleanUp);
}
exports.init = init;

},

// samples/router/routes/settings.ts @13
13: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(18);
exports.__esModule = true;
var lit_html_1 = __fusereq(16);
var core_1 = __fusereq(9);
var router_1 = __fusereq(15);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  constructor() {
    super(...arguments);
    this.locked = false;
  }
  connectedCallback() {
    router_1.subscribeCanDeactivateEvent(this, function () {
      console.log('trigger settings event', this.counter);
      router_1.stopCanDeactivate(new Promise(resolve => {
        if (this.locked) {
          alert('sorry');
          resolve(false);
        } else {
          resolve(true);
        }
        console.log('stopevent');
      }));
    });
  }
  disconnectedCallback() {
    router_1.unSubscribeCanDeactivateEvent(this);
  }
  clicker() {
    this.locked = this.locked ? false : true;
  }
  render() {
    return lit_html_1.html`
            <section>
                <h1>Settings</h1>
                <br />
                Locked:<input type="checkbox" @click=${this.clicker} .checked=${this.locked} />
            </section>
        `;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('settings-route')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// samples/router/routes/home.ts @12
12: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(18);
exports.__esModule = true;
var lit_html_1 = __fusereq(16);
var core_1 = __fusereq(9);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  render() {
    return lit_html_1.html` <section><h1>home</h1></section> `;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('home-route')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// samples/router/routes/login.ts @14
14: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(18);
exports.__esModule = true;
var lit_html_1 = __fusereq(16);
var core_1 = __fusereq(9);
var src_1 = __fusereq(15);
let loggedin = false;
function isAuthenticted() {
  return loggedin;
}
exports.isAuthenticted = isAuthenticted;
function logout() {
  loggedin = false;
  src_1.gotoURL('');
}
exports.logout = logout;
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  click() {
    loggedin = loggedin ? false : true;
    src_1.gotoURL('#child/protected');
  }
  render() {
    return lit_html_1.html`
            <section>
                <h1>Auth component</h1>
                <button
                    class="m-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    @click=${this.click}
                >
                    ${isAuthenticted() ? 'logout' : 'login'}
                </button>
            </section>
        `;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('login-route')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// samples/router/routes/routerConfig.ts @7
7: function(__fusereq, exports, module){
exports.__esModule = true;
var router_1 = __fusereq(15);
var lit_html_1 = __fusereq(16);
router_1.init();
exports.routerConfig = {
  home: {
    path: '',
    href: '#',
    title: 'Home',
    load: () => Promise.resolve().then(() => __fusereq(12)),
    html: lit_html_1.html` <home-route></home-route> `,
    isNav: true
  },
  settings: {
    path: '#settings',
    href: '#settings',
    title: 'Settings',
    load: () => Promise.resolve().then(() => __fusereq(13)),
    html: lit_html_1.html` <settings-route></settings-route> `,
    isNav: true
  },
  login: {
    path: '#login',
    href: '#login',
    title: 'Auth',
    load: () => Promise.resolve().then(() => __fusereq(14)),
    html: lit_html_1.html` <login-route></login-route>`,
    isNav: false
  },
  unknown: {
    path: 'unknown',
    href: 'unknown',
    title: 'Unknown',
    isNav: false
  },
  child: {
    path: '#child/*',
    href: '#child/',
    title: 'ChildRoute',
    isNav: true,
    children: {
      subHome: {
        path: '#child/',
        href: '#child/',
        title: 'SubHome',
        isNav: true
      },
      subSettings: {
        path: '#child/settings',
        href: '#child/settings',
        title: 'Sub Settings',
        isNav: true
      },
      protected: {
        path: '#child/protected',
        href: '#child/protected',
        title: 'sub Protected',
        isNav: true
      }
    }
  }
};
function navs(router) {
  if (router === 'main') {
    return Object.keys(exports.routerConfig).map(key => exports.routerConfig[key]);
  } else {
    const childRoutes = exports.routerConfig.child.children;
    return Object.keys(childRoutes).map(key => childRoutes[key]);
  }
}
exports.navs = navs;
function href(param) {
  return param;
}
exports.href = href;

},

// samples/router/routes/protected.ts @37
37: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(18);
exports.__esModule = true;
var lit_html_1 = __fusereq(16);
var core_1 = __fusereq(9);
var login_1 = __fusereq(14);
var src_1 = __fusereq(15);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  constructor() {
    super(...arguments);
    this.cool = 1;
  }
  connectedCallback() {
    if (!login_1.isAuthenticted()) {
      src_1.gotoURL('#login');
    }
  }
  render() {
    return lit_html_1.html` <section><h1>Welcome to the inner circle :-)</h1></section> `;
  }
};
__fuse_decorate.d([core_1.property(), __fuse_decorate.m("design:type", Object)], __DefaultExport__.prototype, "cool", void 0);
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('protected-route')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// samples/router/routes/childrouter.ts @17
17: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(18);
exports.__esModule = true;
var lit_html_1 = __fusereq(16);
var core_1 = __fusereq(9);
var routerConfig_1 = __fusereq(7);
var router_1 = __fusereq(15);
const childRoute = routerConfig_1.routerConfig.child.children;
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    router_1.subscribeHashEvent(this, () => {
      this.render();
    });
  }
  disconnectedCallback() {
    router_1.unSubscribeHashEvent(this);
  }
  render() {
    return lit_html_1.html`
            <ul class="ani flex bg-indigo-500 p-6">
                ${routerConfig_1.navs('sub').map(route => {
      if (route.isNav) {
        return lit_html_1.html`
                            <li class="mr-6">
                                <a class="text-teal-200 hover:text-white" href="${route.href}"
                                    >${route.title}</a
                                >
                            </li>
                        `;
      } else {
        return '';
      }
    })}
            </ul>

            ${router_1.routeMatchAsync(childRoute.subHome.path, () => Promise.resolve().then(() => __fusereq(12)), lit_html_1.html` <home-route></home-route> `)}
            ${router_1.routeMatchAsync(childRoute.subSettings.path, () => Promise.resolve().then(() => __fusereq(13)), lit_html_1.html` <settings-route></settings-route> `)}
            ${router_1.routeMatchAsync(childRoute.protected.path, () => Promise.resolve().then(() => __fusereq(37)), lit_html_1.html` <protected-route></protected-route> `)}
        `;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('childrouter-route')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// samples/router/app-root.ts @8
8: function(__fusereq, exports, module){
var __fuse_decorate = __fusereq(18);
exports.__esModule = true;
var lit_html_1 = __fusereq(16);
var core_1 = __fusereq(9);
var routerConfig_1 = __fusereq(7);
var router_1 = __fusereq(15);
var router_2 = __fusereq(15);
var login_1 = __fusereq(14);
let __DefaultExport__ = class __DefaultExport__ extends HTMLElement {
  connectedCallback() {
    router_1.subscribeHashEvent(this, () => {
      this.render();
    });
  }
  disconnectedCallback() {
    router_1.unSubscribeHashEvent(this);
  }
  render() {
    return lit_html_1.html`
            <ul class="flex bg-teal-500 p-6">
                ${routerConfig_1.navs('main').map(route => {
      if (route.isNav) {
        return lit_html_1.html`
                            <li class="mr-6">
                                <a class="text-teal-200 hover:text-white" href="${route.href}"
                                    >${route.title}</a
                                >
                            </li>
                        `;
      }
      return '';
    })}

                <li style="margin-left: auto;" class="mr-6">
                    <span
                        class="text-teal-200 hover:text-white"
                        @click=${() => {
      if (login_1.isAuthenticted()) {
        login_1.logout();
      } else {
        router_1.gotoURL('#:path', {
          path: 'login'
        });
      }
    }}
                    >
                        ${login_1.isAuthenticted() ? 'Logout' : 'Login'}
                    </span>
                </li>
            </ul>

            <!--  if you want you could show more then 1 -->
            ${router_2.routeMatchAsync(routerConfig_1.routerConfig.home.path, routerConfig_1.routerConfig.home.load, routerConfig_1.routerConfig.home.html)}
            ${router_2.routeMatchAsync(routerConfig_1.routerConfig.settings.path, routerConfig_1.routerConfig.settings.load, routerConfig_1.routerConfig.settings.html)}
            ${router_2.routeMatchAsync(routerConfig_1.routerConfig.login.path, routerConfig_1.routerConfig.login.load, routerConfig_1.routerConfig.login.html)}

            <!--  if you want you could show more then 1 -->
            ${router_2.routeMatchAsync('#child/*', () => Promise.resolve().then(() => __fusereq(17)), lit_html_1.html` <childrouter-route></childrouter-route> `)}
        `;
  }
};
__DefaultExport__ = __fuse_decorate.d([core_1.customElement('app-root')], __DefaultExport__);
exports.default = __DefaultExport__;

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/index.js @11
11: function(__fusereq, exports, module){
exports.__esModule = true;
var rerenderInnerHTML_1 = __fusereq(30);
exports.rerenderInnerHTML = rerenderInnerHTML_1.rerenderInnerHTML;
var applyPolyfill_1 = __fusereq(31);
exports.applyPolyfill = applyPolyfill_1.applyPolyfill;
var reflowStrategy_1 = __fusereq(32);
exports.ReflowStrategy = reflowStrategy_1.ReflowStrategy;

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/reflow-strategy/rerenderInnerHTML.js @30
30: function(__fusereq, exports, module){
function rerenderInnerHTML() {
  if (document.body) {
    requestAnimationFrame(() => {
      const oldBodyHtml = document.body.innerHTML;
      document.body.innerHTML = '';
      document.body.innerHTML = oldBodyHtml;
    });
  }
}
exports.rerenderInnerHTML = rerenderInnerHTML;

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/applyPolyfill.js @31
31: function(__fusereq, exports, module){
exports.__esModule = true;
var hmrCache_1 = __fusereq(39);
var overrideCustomElementDefine_1 = __fusereq(40);
var onCustomElementChange_1 = __fusereq(41);
var createHookElementChangeListener_1 = __fusereq(42);
var reflowStrategy_1 = __fusereq(32);
function applyPolyfill(reflowStrategy = reflowStrategy_1.ReflowStrategy.NONE, reflowDelayMs = 250, onCustomElementChangeListener) {
  hmrCache_1.initCache();
  overrideCustomElementDefine_1.overrideCustomElementDefine();
  onCustomElementChange_1.onCustomElementChange(createHookElementChangeListener_1.createHookElementChangeListener(reflowStrategy, reflowDelayMs, onCustomElementChangeListener));
}
exports.applyPolyfill = applyPolyfill;

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/reflowStrategy.js @32
32: function(__fusereq, exports, module){
exports.__esModule = true;
(function (ReflowStrategy) {
  ReflowStrategy["RERENDER_INNER_HTML"] = "rerenderInnnerHTML";
  ReflowStrategy["NONE"] = "none";
})(exports.ReflowStrategy || (exports.ReflowStrategy = {}));

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/hmrCache.js @39
39: function(__fusereq, exports, module){
function initCache() {
  if (!globalThis.hmrCache) {
    globalThis.hmrCache = {};
    globalThis.hmrCacheSymbolAttributes = {};
    globalThis.hmrCacheSymbolObserver = {};
  }
}
exports.initCache = initCache;
function getMostRecentImpl(elementName) {
  return globalThis.hmrCache[elementName];
}
exports.getMostRecentImpl = getMostRecentImpl;
function setMostRecentImpl(elementName, impl) {
  globalThis.hmrCache[elementName] = impl;
}
exports.setMostRecentImpl = setMostRecentImpl;
function isCacheInitialized() {
  return globalThis.hmrCache.initialized;
}
exports.isCacheInitialized = isCacheInitialized;
function setCacheAsInitialized() {
  globalThis.hmrCache.initialized = true;
}
exports.setCacheAsInitialized = setCacheAsInitialized;
function getSymbolAttributes(elementName) {
  if (!globalThis.hmrCacheSymbolAttributes[elementName]) {
    globalThis.hmrCacheSymbolAttributes[elementName] = Symbol('observedAttributesArray');
    return globalThis.hmrCacheSymbolAttributes[elementName];
  } else {
    return globalThis.hmrCacheSymbolAttributes[elementName];
  }
}
exports.getSymbolAttributes = getSymbolAttributes;
function getSymbolObserver(elementName) {
  if (!globalThis.hmrCacheSymbolObserver[elementName]) {
    globalThis.hmrCacheSymbolObserver[elementName] = Symbol('observedAttributesObserver');
    return globalThis.hmrCacheSymbolObserver[elementName];
  } else {
    return globalThis.hmrCacheSymbolObserver[elementName];
  }
}
exports.getSymbolObserver = getSymbolObserver;

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/overrideCustomElementDefine.js @40
40: function(__fusereq, exports, module){
exports.__esModule = true;
var hmrCache_1 = __fusereq(39);
var createHookClass_1 = __fusereq(46);
var constructInstance_1 = __fusereq(47);
function overrideCustomElementDefine() {
  if (!hmrCache_1.isCacheInitialized()) {
    hmrCache_1.setCacheAsInitialized();
    const originalDefineFn = CustomElementRegistry.prototype.define;
    CustomElementRegistry.prototype.define = function (elementName, impl, options) {
      const registeredCustomElement = customElements.get(elementName);
      impl[hmrCache_1.getSymbolAttributes(elementName)] = impl.observedAttributes;
      hmrCache_1.setMostRecentImpl(elementName, impl);
      if (!registeredCustomElement) {
        const hookClass = new Proxy(createHookClass_1.createHookClass(elementName, impl), {
          construct: function (element, args, newTarget) {
            const mostRecentImpl = hmrCache_1.getMostRecentImpl(elementName);
            return constructInstance_1.constructInstance(mostRecentImpl, args, newTarget);
          }
        });
        originalDefineFn.apply(this, [elementName, hookClass, options]);
      } else {
        const onCustomElementChange = globalThis.hmrCache.onCustomElementChange;
        if (onCustomElementChange && typeof onCustomElementChange === 'function') {
          onCustomElementChange(elementName, impl, options);
        }
      }
    };
  }
}
exports.overrideCustomElementDefine = overrideCustomElementDefine;

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/onCustomElementChange.js @41
41: function(__fusereq, exports, module){
exports.__esModule = true;
var hmrCache_1 = __fusereq(39);
exports.onCustomElementChange = changeListener => {
  hmrCache_1.initCache();
  if (!globalThis.hmrCache.onCustomElementChange) {
    globalThis.hmrCache.onCustomElementChange = changeListener;
  }
};

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/createHookElementChangeListener.js @42
42: function(__fusereq, exports, module){
exports.__esModule = true;
var reflowStrategy_1 = __fusereq(32);
var rerenderInnerHTML_1 = __fusereq(30);
exports.createHookElementChangeListener = (reflowStrategy = reflowStrategy_1.ReflowStrategy.RERENDER_INNER_HTML, reflowDelayMs = 250, onCustomElementChangeListener) => {
  let timer;
  let elementsChanged = [];
  if (!onCustomElementChangeListener) {
    onCustomElementChangeListener = () => {};
  }
  return (elementName, impl, options) => {
    if (onCustomElementChangeListener) {
      onCustomElementChangeListener(elementName, impl, options);
    }
    if (reflowStrategy && reflowStrategy === reflowStrategy_1.ReflowStrategy.RERENDER_INNER_HTML) {
      elementsChanged.push(elementName);
      clearTimeout(timer);
      timer = setTimeout(() => {
        rerenderInnerHTML_1.rerenderInnerHTML();
        elementsChanged = [];
      }, reflowDelayMs);
    }
  };
};

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/createHookClass.js @46
46: function(__fusereq, exports, module){
exports.__esModule = true;
var hmrCache_1 = __fusereq(39);
function createHookClass(elementName, originalImpl) {
  return class extends originalImpl {
    static get observedAttributes() {
      return [];
    }
    connectedCallback() {
      const Impl = hmrCache_1.getMostRecentImpl(elementName);
      const mostRecentImpl = Impl.prototype;
      const attributes = Impl[hmrCache_1.getSymbolAttributes(elementName)];
      const observerOptions = {
        childList: false,
        attributes: true,
        attributeOldValue: true,
        subtree: false
      };
      const callback = mutationList => {
        mutationList.forEach(mutation => {
          if (mostRecentImpl.attributeChangedCallback && attributes && attributes.indexOf(mutation.attributeName) !== -1) {
            mostRecentImpl.attributeChangedCallback.apply(this, [mutation.attributeName, mutation.oldValue, this.getAttribute(mutation.attributeName), null]);
          }
        });
      };
      if (attributes) {
        if (Array.isArray(attributes)) {
          attributes.forEach(attributeName => {
            const haveAtt = this.getAttributeNode(attributeName);
            if (haveAtt) {
              mostRecentImpl.attributeChangedCallback.apply(this, [attributeName, null, this.getAttribute(attributeName), null]);
            }
          });
        } else {
          console.warn(`observedAttributes in ${elementName} is not array, please fix`);
        }
      }
      this[hmrCache_1.getSymbolObserver(elementName)] = new MutationObserver(callback);
      this[hmrCache_1.getSymbolObserver(elementName)].observe(this, observerOptions);
      if (mostRecentImpl.connectedCallback) {
        mostRecentImpl.connectedCallback.apply(this, arguments);
      }
    }
    disconnectedCallback() {
      this[hmrCache_1.getSymbolObserver(elementName)].disconnect();
      this[hmrCache_1.getSymbolObserver(elementName)] = null;
      const mostRecentImpl = hmrCache_1.getMostRecentImpl(elementName).prototype;
      if (mostRecentImpl.disconnectedCallback) {
        mostRecentImpl.disconnectedCallback.apply(this, arguments);
      }
    }
    adoptedCallback() {
      const mostRecentImpl = hmrCache_1.getMostRecentImpl(elementName).prototype;
      if (mostRecentImpl.adoptedCallback) {
        mostRecentImpl.adoptedCallback.apply(this, arguments);
      }
    }
  };
}
exports.createHookClass = createHookClass;

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/constructInstance.js @47
47: function(__fusereq, exports, module){
exports.__esModule = true;
var patch_1 = __fusereq(53);
exports.BLACKLISTED_PROTOTYPE_PATCH_METHODS = [];
exports.BLACKLISTED_STATIC_PATCH_METHODS = ['name', 'prototype', 'length'];
function constructInstance(mostRecentImpl, args, newTarget) {
  var _a, _b;
  let check = window[mostRecentImpl.__proto__.name];
  if (check) {
    check = window[mostRecentImpl.__proto__.name].prototype instanceof Element;
  }
  if (!check) {
    let proto = mostRecentImpl.__proto__;
    let base = null;
    while (proto) {
      if (((_b = window[(_a = proto === null || proto === void 0 ? void 0 : proto.__proto__) === null || _a === void 0 ? void 0 : _a.name]) === null || _b === void 0 ? void 0 : _b.prototype) instanceof Element) {
        base = proto;
      }
      if (base) {
        break;
      }
      proto = proto.__proto__;
    }
    if (!window.HMR_SKIP_DEEP_PATCH) {
      patch_1.patch(base.prototype, newTarget.prototype, exports.BLACKLISTED_PROTOTYPE_PATCH_METHODS);
    }
  }
  patch_1.patch(mostRecentImpl.prototype, newTarget.prototype, exports.BLACKLISTED_PROTOTYPE_PATCH_METHODS);
  const customElementInstance = Reflect.construct(mostRecentImpl, args, newTarget);
  return customElementInstance;
}
exports.constructInstance = constructInstance;

},

// node_modules/custom-elements-hmr-polyfill/dist/ES6/polyfill/patch.js @53
53: function(__fusereq, exports, module){
function patch(recentImpl, targetImpl, BLACKLISTED_PATCH_METHODS) {
  const ownPropertyNamesProto = Object.getOwnPropertyNames(recentImpl);
  const whitelistedPrototypePropertyNamesProto = ownPropertyNamesProto.filter(propertyName => {
    return BLACKLISTED_PATCH_METHODS.indexOf(propertyName) === -1;
  });
  for (let i = 0; i < whitelistedPrototypePropertyNamesProto.length; i++) {
    const propertyDescriptor = Object.getOwnPropertyDescriptor(recentImpl, whitelistedPrototypePropertyNamesProto[i]);
    if (propertyDescriptor) {
      if (propertyDescriptor.configurable) {
        Object.defineProperty(targetImpl, whitelistedPrototypePropertyNamesProto[i], propertyDescriptor);
      } else {
        console.warn('[custom-element-hmr-polyfill]', `${whitelistedPrototypePropertyNamesProto[i]} is not configurable, skipping`);
      }
    }
  }
}
exports.patch = patch;

},

// samples/router/hmr.ts @4
4: function(__fusereq, exports, module){
exports.__esModule = true;
var custom_elements_hmr_polyfill_1 = __fusereq(11);
if (document.body) {
  document.body.innerHTML = '';
  setTimeout(() => {
    document.body.innerHTML = '<app-root></app-root>';
  }, 0);
}
custom_elements_hmr_polyfill_1.applyPolyfill(custom_elements_hmr_polyfill_1.ReflowStrategy.NONE);

},

// samples/router/index.ts @1
1: function(__fusereq, exports, module){
exports.__esModule = true;
__fusereq(4);
__fusereq(5);
__fusereq(7);
__fusereq(8);
var core_1 = __fusereq(9);
core_1.enableInternalLogger();

}
}, function(){
__fuse.r(1)
const hmr = __fuse.r(3);
hmr.connect({"useCurrentURL":true})
})
//# sourceMappingURL=app.js.map