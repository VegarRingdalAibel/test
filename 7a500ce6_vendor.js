FuseBox.pkg("fuse-box-css", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
var __filename = "index.js";
var runningInBrowser = FuseBox.isBrowser || FuseBox.target === "electron";
var cssHandler = function (__filename, contents) {
  if (runningInBrowser) {
    var styleId = __filename.replace(/[\.\/]+/g, "-");
    if (styleId.charAt(0) === "-") styleId = styleId.substring(1);
    var exists = document.getElementById(styleId);
    if (!exists) {
      var s = document.createElement(contents ? "style" : "link");
      s.id = styleId;
      s.type = "text/css";
      if (contents) {
        s.innerHTML = contents;
      } else {
        s.rel = "stylesheet";
        s.href = __filename;
      }
      document.getElementsByTagName("head")[0].appendChild(s);
    } else {
      if (contents) {
        exists.innerHTML = contents;
      }
    }
  }
};
module.exports = cssHandler;

});
	___scope___.entry = "index.js";
})
FuseBox.pkg("lit-html-free-router", {}, function(___scope___){
___scope___.file("dist/esm/index.js", function(exports, require, module){
const __req3__ = require("./router");
const __req1__ = require("./router");
const __req2__ = require("./helpers");
class FreeRouter extends HTMLElement {
  constructor() {
    super();
    this.router = __req1__.getRouter();
  }
  connectedCallback() {
    __req2__.logger("FreeRouter-connectedcallback", this.getAttribute("name"));
    this.router.activateRouterElement(this.getAttribute("name"));
  }
  disconnectedcallback() {
    __req2__.logger("FreeRouter-disconnectedcallback", this.getAttribute("name"));
    this.router.deactivateRouterElement(this.getAttribute("name"));
  }
}
module.exports.FreeRouter = FreeRouter;
if (!customElements.get("free-router")) {
  customElements.define("free-router", FreeRouter);
}
module.exports.getRouter = __req3__.getRouter;

});
___scope___.file("dist/esm/router.js", function(exports, require, module){
const __req1__ = require("./helpers");
class RouterInternal {
  constructor() {
    this.active = [];
    this.routers = [];
    this.routersConfig = [];
    this.hashChange = this.hashChange.bind(this);
    window.addEventListener("hashchange", this.hashChange);
  }
  activateRouterElement(name) {
    this.active.push(name);
    if (this.loadingHandlerCallback) {
      this.loadingHandlerCallback(location.hash, this.active[this.active.length - 1]);
    }
    this.dowork().then(() => {
      if (this.foundRoute === false) {
        this.routeNotFound();
      }
      if (this.routeChangeHandlerCallback) {
        this.routeChangeHandlerCallback(this.activeRoute, this.active[this.active.length - 1]);
      }
    });
  }
  deactivateRouterElement(name) {
    let i = this.active.indexOf(name);
    if (i !== -1) {
      this.active.splice(i, 1);
    }
  }
  goto(hash, params = {}) {
    const urls = hash.split("/").filter(x => x ? true : false);
    let newUrl = "";
    urls.forEach((val, i) => {
      if (val[0] === ":" && params[val.substr(1, val.length)] !== undefined) {
        newUrl = newUrl + params[val.substr(1, val.length)];
      } else {
        newUrl = newUrl + `${val}`;
      }
      if (urls.length - 1 !== i) {
        newUrl = newUrl + `/`;
      }
    });
    location.hash = newUrl;
  }
  getNavLinks(routerName, active) {
    let result = [];
    let r_config = this.routersConfig[this.routers.indexOf(active ? this.active[this.active.length - 1] : routerName)];
    r_config.forEach(r => {
      result.push({
        name: r.name,
        isNav: r.isNav === false ? false : true,
        href: "#" + r.path,
        data: r.data,
        componentName: r.componentName,
        isAuth: r.isAuth
      });
    });
    return result;
  }
  getNavLink(pathname, routerName, active) {
    let result = {};
    let r_config = this.routersConfig[this.routers.indexOf(active ? this.active[this.active.length - 1] : routerName)];
    r_config.forEach(r => {
      if (r.name === pathname) {
        result = {
          name: r.name,
          isNav: r.isNav === false ? false : true,
          href: "#" + r.path,
          data: r.data,
          componentName: r.componentName,
          isAuth: r.isAuth
        };
      }
    });
    return result;
  }
  async hashChange() {
    this.lastpop = null;
    __req1__.logger("router-hashChange", "start", this.active[this.active.length - 1]);
    if (this.loadingHandlerCallback) {
      this.loadingHandlerCallback(location.hash, this.active[this.active.length - 1]);
    }
    if (this.backEventtriggered) {
      this.backEventtriggered = false;
    } else {
      await this.dowork();
      if (this.foundRoute === false) {
        if (this.active.length > 1) {
          let y = this.active.pop();
          if (y !== this.lastpop) {
            this.lastpop = y;
            await this.dowork();
          }
        }
        if (this.active.length === 1 && !this.foundRoute) {
          this.routeNotFound();
        }
      }
      if (this.routeChangeHandlerCallback) {
        this.routeChangeHandlerCallback(this.activeRoute, this.active[this.active.length - 1]);
      }
    }
  }
  async dowork() {
    this.foundRoute = null;
    let hash = location.hash ? location.hash.substring(1, location.hash.length) : "";
    let routerElements = document.getElementsByTagName("free-router");
    let ok = true;
    for (let i = 0; routerElements.length > i; i++) {
      if (routerElements[i].getAttribute("name") === this.active[this.active.length - 1]) {
        let firstchild = routerElements[i].children[0];
        if (firstchild && firstchild.canDeactivate) {
          ok = await firstchild.canDeactivate();
          if (ok !== true) {
            this.backEventtriggered = true;
            history.back();
          }
        }
      }
    }
    if (ok === true) {
      this.foundRoute = false;
      __req1__.logger("router-hashChange", "routeSearch", this.active[this.active.length - 1]);
      for (let i = 0; routerElements.length > i; i++) {
        if (!this.foundRoute && routerElements[i].getAttribute("name") === this.active[this.active.length - 1]) {
          let r_config = this.routersConfig[this.routers.indexOf(this.active[this.active.length - 1])];
          if (r_config) {
            for (let y = 0; y < r_config.length; y++) {
              const route = r_config[y];
              let verified = false;
              if (hash === "" || route.path === "") {
                verified = hash === route.path;
              } else {
                let regex = new RegExp(__req1__.createRouteRegex(__req1__.parsePattern(route.path), route.children));
                if (regex.test(hash)) {
                  verified = true;
                }
              }
              if (verified && route.isAuth) {
                if (!this.routeAuth(this.getNavLink(route.name, this.active[this.active.length - 1]))) {
                  this.foundRoute = true;
                  verified = false;
                  y = r_config.length;
                }
              }
              if (verified) {
                y = r_config.length;
                this.activeRoute = {
                  name: route.name,
                  href: route.path,
                  isNav: route.isNav ? true : false,
                  data: Object.assign({}, route.data)
                };
                __req1__.logger("router-hashChange", "verified", this.active[this.active.length - 1], hash, route.name);
                this.foundRoute = true;
                if (route.load) {
                  await route.load();
                }
                if (routerElements[i].children.length) {
                  __req1__.logger("router-hashChange", "removing child", this.active[this.active.length - 1], hash);
                  routerElements[i].removeChild(routerElements[i].children[0]);
                }
                let el = document.createElement(route.componentName.toUpperCase());
                __req1__.logger("router-hashChange", "chreate element", this.active[this.active.length - 1], hash);
                if (this.haltedActivate) {
                  this.haltedActivate = null;
                }
                if (el.activate) {
                  let active = this.active[this.active.length - 1];
                  this.haltedActivate = route.path;
                  await el.activate(route.path, __req1__.getVariables(__req1__.parsePattern(route.path), hash), this.activeRoute);
                  if (this.haltedActivate === route.path) {
                    __req1__.logger("router-hashChange", "append child", this.active[this.active.length - 1], hash);
                    routerElements[i].appendChild(el);
                  } else {
                    el.disconnectedCallback ? el.disconnectedCallback() : null;
                    __req1__.logger("router-hashChange", "skipping append child", active, hash);
                  }
                } else {
                  __req1__.logger("router-hashChange", "append child", this.active[this.active.length - 1], hash);
                  routerElements[i].appendChild(el);
                }
              } else {
                __req1__.logger("router-hashChange", "not-verified", this.active[this.active.length - 1], hash, route.name);
              }
            }
          }
        }
      }
    }
  }
  routeNotFound() {
    if (this.routeNotFoundCallback) {
      this.routeNotFoundCallback(location.hash);
    } else {
      console.log("route not found", location.hash);
    }
  }
  registerUnknowRouteHandler(callback) {
    this.routeNotFoundCallback = callback;
  }
  routeAuth(options) {
    if (this.routeAuthCallback) {
      return this.routeAuthCallback(options);
    } else {
      console.log("no auth function registered", location.hash);
      return true;
    }
  }
  registerAuthRouteHandler(callback) {
    this.routeAuthCallback = callback;
  }
  registerLoadingHandler(callback) {
    this.loadingHandlerCallback = callback;
  }
  registerRouteChangeHandler(callback) {
    this.routeChangeHandlerCallback = callback;
  }
  addRouterConfig(name, routes) {
    if (this.routers.indexOf(name) !== -1) {
      throw new Error("can not have 2 routers with same name");
    } else {
      this.routers.push(name);
      this.routersConfig.push(routes);
    }
  }
  removeRouterConfig(name) {
    let i = this.routers.indexOf(name);
    if (i !== -1) {
      this.routers.splice(i, 1);
      this.routersConfig.splice(i, 1);
    }
  }
}
module.exports.RouterInternal = RouterInternal;
const router = new RouterInternal();
function getRouter() {
  return router;
}
module.exports.getRouter = getRouter;

});
___scope___.file("dist/esm/helpers.js", function(exports, require, module){
const PATH_ARGUMENT_REGEX = "[a-zA-Z0-9\\_\\-\\:]+";
const PATH_SLASH_REGEX = "\\/";
const isVariable = path => {
  if (path && typeof path === "string" && path[0] === ":") {
    if (path.split(":").length > 2) {
      console.error(`route argument contains illigal string: ${path}, please fix`);
    }
    return true;
  } else {
    return false;
  }
};
const getVariableName = path => {
  return path.substring(1, path.length);
};
const parsePattern = pattern => {
  const paths = pattern.split("/");
  const pathsConfig = [];
  paths.forEach((path, index) => {
    if (index === paths.length - 1 && path === "" && pattern[pattern.length - 1] === PATH_SLASH_REGEX) {} else {
      pathsConfig.push({
        staticType: !isVariable(path),
        variable: isVariable(path) ? getVariableName(path) : null,
        regex: isVariable(path) ? PATH_ARGUMENT_REGEX : path
      });
    }
  });
  return pathsConfig;
};
module.exports.parsePattern = parsePattern;
const createRouteRegex = (pathPattern, openEnd) => {
  let regex = "";
  pathPattern.forEach((pattern, index) => {
    if (pathPattern.length > 1 && index === 0 || pathPattern.length === 1) {
      regex = "^" + pattern.regex;
    } else {
      if (pattern.regex === PATH_SLASH_REGEX) {
        regex = regex + pattern.regex;
      } else {
        regex = regex + PATH_SLASH_REGEX + pattern.regex;
      }
    }
    if (!openEnd && pathPattern.length - 1 === index) {
      regex = regex + "($|/$)";
    }
  });
  return regex;
};
module.exports.createRouteRegex = createRouteRegex;
const getVariables = (pathPattern, pattern) => {
  const paths = pattern.split("/");
  const args = {};
  paths.forEach((path, i) => {
    if (pathPattern[i] && pathPattern[i].variable) {
      args[pathPattern[i].variable] = path;
    }
    if (i > pathPattern.length - 1) {
      if (!args._paths) {
        args._paths = [];
      }
      args._paths.push(path);
    }
  });
  return args;
};
module.exports.getVariables = getVariables;
let loggerStatus = false;
const logger = (...message) => {
  if (loggerStatus) {
    console.log("Logger ---", message);
  }
};
module.exports.logger = logger;
const enableLogger = () => {
  loggerStatus = true;
};
module.exports.enableLogger = enableLogger;
const disableLogger = () => {
  loggerStatus = false;
};
module.exports.disableLogger = disableLogger;

});
	___scope___.entry = "dist/esm/index.js";
})
FuseBox.pkg("lit-html", {}, function(___scope___){
___scope___.file("lit-html.js", function(exports, require, module){
const __req12__ = require("./lib/template.js");
const __req11__ = require("./lib/template-result.js");
const __req10__ = require("./lib/template-instance.js");
const __req9__ = require("./lib/template-factory.js");
const __req8__ = require("./lib/render.js");
const __req7__ = require("./lib/parts.js");
const __req6__ = require("./lib/part.js");
const __req5__ = require("./lib/dom.js");
const __req4__ = require("./lib/directive.js");
const __req3__ = require("./lib/default-template-processor.js");
const __req1__ = require("./lib/default-template-processor.js");
const __req2__ = require("./lib/template-result.js");
(window["litHtmlVersions"] || (window["litHtmlVersions"] = [])).push("1.1.1");
const html = (strings, ...values) => new __req2__.TemplateResult(strings, values, "html", __req1__.defaultTemplateProcessor);
module.exports.html = html;
const svg = (strings, ...values) => new __req2__.SVGTemplateResult(strings, values, "svg", __req1__.defaultTemplateProcessor);
module.exports.svg = svg;
module.exports.DefaultTemplateProcessor = __req3__.DefaultTemplateProcessor;
module.exports.defaultTemplateProcessor = __req3__.defaultTemplateProcessor;
module.exports.directive = __req4__.directive;
module.exports.isDirective = __req4__.isDirective;
module.exports.removeNodes = __req5__.removeNodes;
module.exports.reparentNodes = __req5__.reparentNodes;
module.exports.noChange = __req6__.noChange;
module.exports.nothing = __req6__.nothing;
module.exports.AttributeCommitter = __req7__.AttributeCommitter;
module.exports.AttributePart = __req7__.AttributePart;
module.exports.BooleanAttributePart = __req7__.BooleanAttributePart;
module.exports.EventPart = __req7__.EventPart;
module.exports.isIterable = __req7__.isIterable;
module.exports.isPrimitive = __req7__.isPrimitive;
module.exports.NodePart = __req7__.NodePart;
module.exports.PropertyCommitter = __req7__.PropertyCommitter;
module.exports.PropertyPart = __req7__.PropertyPart;
module.exports.parts = __req8__.parts;
module.exports.render = __req8__.render;
module.exports.templateCaches = __req9__.templateCaches;
module.exports.templateFactory = __req9__.templateFactory;
module.exports.TemplateInstance = __req10__.TemplateInstance;
module.exports.SVGTemplateResult = __req11__.SVGTemplateResult;
module.exports.TemplateResult = __req11__.TemplateResult;
module.exports.createMarker = __req12__.createMarker;
module.exports.isTemplatePartActive = __req12__.isTemplatePartActive;
module.exports.Template = __req12__.Template;

});
___scope___.file("lib/default-template-processor.js", function(exports, require, module){
const __req1__ = require("./parts.js");
class DefaultTemplateProcessor {
  handleAttributeExpressions(element, name, strings, options) {
    const prefix = name[0];
    if (prefix === ".") {
      const committer = new __req1__.PropertyCommitter(element, name.slice(1), strings);
      return committer.parts;
    }
    if (prefix === "@") {
      return [new __req1__.EventPart(element, name.slice(1), options.eventContext)];
    }
    if (prefix === "?") {
      return [new __req1__.BooleanAttributePart(element, name.slice(1), strings)];
    }
    const committer = new __req1__.AttributeCommitter(element, name, strings);
    return committer.parts;
  }
  handleTextExpression(options) {
    return new __req1__.NodePart(options);
  }
}
module.exports.DefaultTemplateProcessor = DefaultTemplateProcessor;
const defaultTemplateProcessor = new DefaultTemplateProcessor();
module.exports.defaultTemplateProcessor = defaultTemplateProcessor;

});
___scope___.file("lib/template-result.js", function(exports, require, module){
const __req1__ = require("./dom.js");
const __req2__ = require("./template.js");
class TemplateResult {
  constructor(strings, values, type, processor) {
    this.strings = strings;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  getHTML() {
    const l = this.strings.length - 1;
    let html = "";
    let isCommentBinding = false;
    for (let i = 0; i < l; i++) {
      const s = this.strings[i];
      const commentOpen = s.lastIndexOf("<!--");
      isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf("-->", commentOpen + 1) === -1;
      const attributeMatch = __req2__.lastAttributeNameRegex.exec(s);
      if (attributeMatch === null) {
        html += s + (isCommentBinding ? __req2__.marker : __req2__.nodeMarker);
      } else {
        html += s.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + __req2__.boundAttributeSuffix + attributeMatch[3] + __req2__.marker;
      }
    }
    html += this.strings[l];
    return html;
  }
  getTemplateElement() {
    const template = document.createElement("template");
    template.innerHTML = this.getHTML();
    return template;
  }
}
module.exports.TemplateResult = TemplateResult;
class SVGTemplateResult extends TemplateResult {
  getHTML() {
    return `<svg>${super.getHTML()}</svg>`;
  }
  getTemplateElement() {
    const template = super.getTemplateElement();
    const content = template.content;
    const svgElement = content.firstChild;
    content.removeChild(svgElement);
    __req1__.reparentNodes(content, svgElement.firstChild);
    return template;
  }
}
module.exports.SVGTemplateResult = SVGTemplateResult;

});
___scope___.file("lib/directive.js", function(exports, require, module){
const directives = new WeakMap();
const directive = f => (...args) => {
  const d = f(...args);
  directives.set(d, true);
  return d;
};
module.exports.directive = directive;
const isDirective = o => {
  return typeof o === "function" && directives.has(o);
};
module.exports.isDirective = isDirective;

});
___scope___.file("lib/dom.js", function(exports, require, module){
const isCEPolyfill = window.customElements !== undefined && window.customElements.polyfillWrapFlushCallback !== undefined;
module.exports.isCEPolyfill = isCEPolyfill;
const reparentNodes = (container, start, end = null, before = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.insertBefore(start, before);
    start = n;
  }
};
module.exports.reparentNodes = reparentNodes;
const removeNodes = (container, start, end = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.removeChild(start);
    start = n;
  }
};
module.exports.removeNodes = removeNodes;

});
___scope___.file("lib/part.js", function(exports, require, module){
const noChange = {};
module.exports.noChange = noChange;
const nothing = {};
module.exports.nothing = nothing;

});
___scope___.file("lib/parts.js", function(exports, require, module){
const __req1__ = require("./directive.js");
const __req2__ = require("./dom.js");
const __req3__ = require("./part.js");
const __req4__ = require("./template-instance.js");
const __req5__ = require("./template-result.js");
const __req6__ = require("./template.js");
const isPrimitive = value => {
  return value === null || !(typeof value === "object" || typeof value === "function");
};
module.exports.isPrimitive = isPrimitive;
const isIterable = value => {
  return Array.isArray(value) || !!(value && value[Symbol.iterator]);
};
module.exports.isIterable = isIterable;
class AttributeCommitter {
  constructor(element, name, strings) {
    this.dirty = true;
    this.element = element;
    this.name = name;
    this.strings = strings;
    this.parts = [];
    for (let i = 0; i < strings.length - 1; i++) {
      this.parts[i] = this._createPart();
    }
  }
  _createPart() {
    return new AttributePart(this);
  }
  _getValue() {
    const strings = this.strings;
    const l = strings.length - 1;
    let text = "";
    for (let i = 0; i < l; i++) {
      text += strings[i];
      const part = this.parts[i];
      if (part !== undefined) {
        const v = part.value;
        if (isPrimitive(v) || !isIterable(v)) {
          text += typeof v === "string" ? v : String(v);
        } else {
          for (const t of v) {
            text += typeof t === "string" ? t : String(t);
          }
        }
      }
    }
    text += strings[l];
    return text;
  }
  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }
}
module.exports.AttributeCommitter = AttributeCommitter;
class AttributePart {
  constructor(committer) {
    this.value = undefined;
    this.committer = committer;
  }
  setValue(value) {
    if (value !== __req3__.noChange && (!isPrimitive(value) || value !== this.value)) {
      this.value = value;
      if (!__req1__.isDirective(value)) {
        this.committer.dirty = true;
      }
    }
  }
  commit() {
    while (__req1__.isDirective(this.value)) {
      const directive = this.value;
      this.value = __req3__.noChange;
      directive(this);
    }
    if (this.value === __req3__.noChange) {
      return;
    }
    this.committer.commit();
  }
}
module.exports.AttributePart = AttributePart;
class NodePart {
  constructor(options) {
    this.value = undefined;
    this.__pendingValue = undefined;
    this.options = options;
  }
  appendInto(container) {
    this.startNode = container.appendChild(__req6__.createMarker());
    this.endNode = container.appendChild(__req6__.createMarker());
  }
  insertAfterNode(ref) {
    this.startNode = ref;
    this.endNode = ref.nextSibling;
  }
  appendIntoPart(part) {
    part.__insert(this.startNode = __req6__.createMarker());
    part.__insert(this.endNode = __req6__.createMarker());
  }
  insertAfterPart(ref) {
    ref.__insert(this.startNode = __req6__.createMarker());
    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (__req1__.isDirective(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = __req3__.noChange;
      directive(this);
    }
    const value = this.__pendingValue;
    if (value === __req3__.noChange) {
      return;
    }
    if (isPrimitive(value)) {
      if (value !== this.value) {
        this.__commitText(value);
      }
    } else if (value instanceof __req5__.TemplateResult) {
      this.__commitTemplateResult(value);
    } else if (value instanceof Node) {
      this.__commitNode(value);
    } else if (isIterable(value)) {
      this.__commitIterable(value);
    } else if (value === __req3__.nothing) {
      this.value = __req3__.nothing;
      this.clear();
    } else {
      this.__commitText(value);
    }
  }
  __insert(node) {
    this.endNode.parentNode.insertBefore(node, this.endNode);
  }
  __commitNode(value) {
    if (this.value === value) {
      return;
    }
    this.clear();
    this.__insert(value);
    this.value = value;
  }
  __commitText(value) {
    const node = this.startNode.nextSibling;
    value = value == null ? "" : value;
    const valueAsString = typeof value === "string" ? value : String(value);
    if (node === this.endNode.previousSibling && node.nodeType === 3) {
      node.data = valueAsString;
    } else {
      this.__commitNode(document.createTextNode(valueAsString));
    }
    this.value = value;
  }
  __commitTemplateResult(value) {
    const template = this.options.templateFactory(value);
    if (this.value instanceof __req4__.TemplateInstance && this.value.template === template) {
      this.value.update(value.values);
    } else {
      const instance = new __req4__.TemplateInstance(template, value.processor, this.options);
      const fragment = instance._clone();
      instance.update(value.values);
      this.__commitNode(fragment);
      this.value = instance;
    }
  }
  __commitIterable(value) {
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    }
    const itemParts = this.value;
    let partIndex = 0;
    let itemPart;
    for (const item of value) {
      itemPart = itemParts[partIndex];
      if (itemPart === undefined) {
        itemPart = new NodePart(this.options);
        itemParts.push(itemPart);
        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }
      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }
    if (partIndex < itemParts.length) {
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart.endNode);
    }
  }
  clear(startNode = this.startNode) {
    __req2__.removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }
}
module.exports.NodePart = NodePart;
class BooleanAttributePart {
  constructor(element, name, strings) {
    this.value = undefined;
    this.__pendingValue = undefined;
    if (strings.length !== 2 || strings[0] !== "" || strings[1] !== "") {
      throw new Error("Boolean attributes can only contain a single expression");
    }
    this.element = element;
    this.name = name;
    this.strings = strings;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (__req1__.isDirective(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = __req3__.noChange;
      directive(this);
    }
    if (this.__pendingValue === __req3__.noChange) {
      return;
    }
    const value = !!this.__pendingValue;
    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, "");
      } else {
        this.element.removeAttribute(this.name);
      }
      this.value = value;
    }
    this.__pendingValue = __req3__.noChange;
  }
}
module.exports.BooleanAttributePart = BooleanAttributePart;
class PropertyCommitter extends AttributeCommitter {
  constructor(element, name, strings) {
    super(element, name, strings);
    this.single = strings.length === 2 && strings[0] === "" && strings[1] === "";
  }
  _createPart() {
    return new PropertyPart(this);
  }
  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }
    return super._getValue();
  }
  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element[this.name] = this._getValue();
    }
  }
}
module.exports.PropertyCommitter = PropertyCommitter;
class PropertyPart extends AttributePart {}
module.exports.PropertyPart = PropertyPart;
let eventOptionsSupported = false;
try {
  const options = {
    get capture() {
      eventOptionsSupported = true;
      return false;
    }
  };
  window.addEventListener("test", options, options);
  window.removeEventListener("test", options, options);
} catch (_e) {}
class EventPart {
  constructor(element, eventName, eventContext) {
    this.value = undefined;
    this.__pendingValue = undefined;
    this.element = element;
    this.eventName = eventName;
    this.eventContext = eventContext;
    this.__boundHandleEvent = e => this.handleEvent(e);
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (__req1__.isDirective(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = __req3__.noChange;
      directive(this);
    }
    if (this.__pendingValue === __req3__.noChange) {
      return;
    }
    const newListener = this.__pendingValue;
    const oldListener = this.value;
    const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
    if (shouldRemoveListener) {
      this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }
    if (shouldAddListener) {
      this.__options = getOptions(newListener);
      this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }
    this.value = newListener;
    this.__pendingValue = __req3__.noChange;
  }
  handleEvent(event) {
    if (typeof this.value === "function") {
      this.value.call(this.eventContext || this.element, event);
    } else {
      this.value.handleEvent(event);
    }
  }
}
module.exports.EventPart = EventPart;
const getOptions = o => o && (eventOptionsSupported ? {
  capture: o.capture,
  passive: o.passive,
  once: o.once
} : o.capture);

});
___scope___.file("lib/render.js", function(exports, require, module){
const __req1__ = require("./dom.js");
const __req2__ = require("./parts.js");
const __req3__ = require("./template-factory.js");
const parts = new WeakMap();
module.exports.parts = parts;
const render = (result, container, options) => {
  let part = parts.get(container);
  if (part === undefined) {
    __req1__.removeNodes(container, container.firstChild);
    parts.set(container, part = new __req2__.NodePart(Object.assign({
      templateFactory: __req3__.templateFactory
    }, options)));
    part.appendInto(container);
  }
  part.setValue(result);
  part.commit();
};
module.exports.render = render;

});
___scope___.file("lib/template-factory.js", function(exports, require, module){
const __req1__ = require("./template.js");
function templateFactory(result) {
  let templateCache = templateCaches.get(result.type);
  if (templateCache === undefined) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };
    templateCaches.set(result.type, templateCache);
  }
  let template = templateCache.stringsArray.get(result.strings);
  if (template !== undefined) {
    return template;
  }
  const key = result.strings.join(__req1__.marker);
  template = templateCache.keyString.get(key);
  if (template === undefined) {
    template = new __req1__.Template(result, result.getTemplateElement());
    templateCache.keyString.set(key, template);
  }
  templateCache.stringsArray.set(result.strings, template);
  return template;
}
module.exports.templateFactory = templateFactory;
const templateCaches = new Map();
module.exports.templateCaches = templateCaches;

});
___scope___.file("lib/template-instance.js", function(exports, require, module){
const __req1__ = require("./dom.js");
const __req2__ = require("./template.js");
class TemplateInstance {
  constructor(template, processor, options) {
    this.__parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }
  update(values) {
    let i = 0;
    for (const part of this.__parts) {
      if (part !== undefined) {
        part.setValue(values[i]);
      }
      i++;
    }
    for (const part of this.__parts) {
      if (part !== undefined) {
        part.commit();
      }
    }
  }
  _clone() {
    const fragment = __req1__.isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
    const stack = [];
    const parts = this.template.parts;
    const walker = document.createTreeWalker(fragment, 133, null, false);
    let partIndex = 0;
    let nodeIndex = 0;
    let part;
    let node = walker.nextNode();
    while (partIndex < parts.length) {
      part = parts[partIndex];
      if (!__req2__.isTemplatePartActive(part)) {
        this.__parts.push(undefined);
        partIndex++;
        continue;
      }
      while (nodeIndex < part.index) {
        nodeIndex++;
        if (node.nodeName === "TEMPLATE") {
          stack.push(node);
          walker.currentNode = node.content;
        }
        if ((node = walker.nextNode()) === null) {
          walker.currentNode = stack.pop();
          node = walker.nextNode();
        }
      }
      if (part.type === "node") {
        const part = this.processor.handleTextExpression(this.options);
        part.insertAfterNode(node.previousSibling);
        this.__parts.push(part);
      } else {
        this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
      }
      partIndex++;
    }
    if (__req1__.isCEPolyfill) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }
    return fragment;
  }
}
module.exports.TemplateInstance = TemplateInstance;

});
___scope___.file("lib/template.js", function(exports, require, module){
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
module.exports.marker = marker;
const nodeMarker = `<!--${marker}-->`;
module.exports.nodeMarker = nodeMarker;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
module.exports.markerRegex = markerRegex;
const boundAttributeSuffix = "$lit$";
module.exports.boundAttributeSuffix = boundAttributeSuffix;
class Template {
  constructor(result, element) {
    this.parts = [];
    this.element = element;
    const nodesToRemove = [];
    const stack = [];
    const walker = document.createTreeWalker(element.content, 133, null, false);
    let lastPartIndex = 0;
    let index = -1;
    let partIndex = 0;
    const {strings, values: {length}} = result;
    while (partIndex < length) {
      const node = walker.nextNode();
      if (node === null) {
        walker.currentNode = stack.pop();
        continue;
      }
      index++;
      if (node.nodeType === 1) {
        if (node.hasAttributes()) {
          const attributes = node.attributes;
          const {length} = attributes;
          let count = 0;
          for (let i = 0; i < length; i++) {
            if (endsWith(attributes[i].name, boundAttributeSuffix)) {
              count++;
            }
          }
          while (count-- > 0) {
            const stringForPart = strings[partIndex];
            const name = lastAttributeNameRegex.exec(stringForPart)[2];
            const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
            const attributeValue = node.getAttribute(attributeLookupName);
            node.removeAttribute(attributeLookupName);
            const statics = attributeValue.split(markerRegex);
            this.parts.push({
              type: "attribute",
              index,
              name,
              strings: statics
            });
            partIndex += statics.length - 1;
          }
        }
        if (node.tagName === "TEMPLATE") {
          stack.push(node);
          walker.currentNode = node.content;
        }
      } else if (node.nodeType === 3) {
        const data = node.data;
        if (data.indexOf(marker) >= 0) {
          const parent = node.parentNode;
          const strings = data.split(markerRegex);
          const lastIndex = strings.length - 1;
          for (let i = 0; i < lastIndex; i++) {
            let insert;
            let s = strings[i];
            if (s === "") {
              insert = createMarker();
            } else {
              const match = lastAttributeNameRegex.exec(s);
              if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                s = s.slice(0, match.index) + match[1] + match[2].slice(0, -boundAttributeSuffix.length) + match[3];
              }
              insert = document.createTextNode(s);
            }
            parent.insertBefore(insert, node);
            this.parts.push({
              type: "node",
              index: ++index
            });
          }
          if (strings[lastIndex] === "") {
            parent.insertBefore(createMarker(), node);
            nodesToRemove.push(node);
          } else {
            node.data = strings[lastIndex];
          }
          partIndex += lastIndex;
        }
      } else if (node.nodeType === 8) {
        if (node.data === marker) {
          const parent = node.parentNode;
          if (node.previousSibling === null || index === lastPartIndex) {
            index++;
            parent.insertBefore(createMarker(), node);
          }
          lastPartIndex = index;
          this.parts.push({
            type: "node",
            index
          });
          if (node.nextSibling === null) {
            node.data = "";
          } else {
            nodesToRemove.push(node);
            index--;
          }
          partIndex++;
        } else {
          let i = -1;
          while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
            this.parts.push({
              type: "node",
              index: -1
            });
            partIndex++;
          }
        }
      }
    }
    for (const n of nodesToRemove) {
      n.parentNode.removeChild(n);
    }
  }
}
module.exports.Template = Template;
const endsWith = (str, suffix) => {
  const index = str.length - suffix.length;
  return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = part => part.index !== -1;
module.exports.isTemplatePartActive = isTemplatePartActive;
const createMarker = () => document.createComment("");
module.exports.createMarker = createMarker;
const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
module.exports.lastAttributeNameRegex = lastAttributeNameRegex;

});
	___scope___.entry = "lit-html.js";
})
FuseBox.pkg("http", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
if (FuseBox.isServer) {
  module.exports = global.require("http");
} else {
  module.exports = {};
}

});
	___scope___.entry = "index.js";
})
FuseBox.pkg("events", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
if (FuseBox.isServer) {
  module.exports = global.require("events");
} else {
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
    if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError("n must be a positive number");
    this._maxListeners = n;
    return this;
  };
  EventEmitter.prototype.emit = function (type) {
    var er, handler, len, args, i, listeners;
    if (!this._events) this._events = {};
    if (type === "error") {
      if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
        er = arguments[1];
        if (er instanceof Error) {
          throw er;
        }
        throw TypeError("Uncaught, unspecified \"error\" event.");
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
    if (!isFunction(listener)) throw TypeError("listener must be a function");
    if (!this._events) this._events = {};
    if (this._events.newListener) this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);
    if (!this._events[type]) this._events[type] = listener; else if (isObject(this._events[type])) this._events[type].push(listener); else this._events[type] = [this._events[type], listener];
    if (isObject(this._events[type]) && !this._events[type].warned) {
      if (!isUndefined(this._maxListeners)) {
        m = this._maxListeners;
      } else {
        m = EventEmitter.defaultMaxListeners;
      }
      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error("(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
        if (typeof console.trace === "function") {
          console.trace();
        }
      }
    }
    return this;
  };
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  EventEmitter.prototype.once = function (type, listener) {
    if (!isFunction(listener)) throw TypeError("listener must be a function");
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
    if (!isFunction(listener)) throw TypeError("listener must be a function");
    if (!this._events || !this._events[type]) return this;
    list = this._events[type];
    length = list.length;
    position = -1;
    if (list === listener || isFunction(list.listener) && list.listener === listener) {
      delete this._events[type];
      if (this._events.removeListener) this.emit("removeListener", type, listener);
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
      if (this._events.removeListener) this.emit("removeListener", type, listener);
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
        if (key === "removeListener") continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners("removeListener");
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
    return typeof arg === "function";
  }
  function isNumber(arg) {
    return typeof arg === "number";
  }
  function isObject(arg) {
    return typeof arg === "object" && arg !== null;
  }
  function isUndefined(arg) {
    return arg === void 0;
  }
}

});
	___scope___.entry = "index.js";
})