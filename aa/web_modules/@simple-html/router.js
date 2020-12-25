import { d as directive } from '../common/lit-html-55f97547.js';

function initSymbolCache() {
    if (!globalThis._LHF_SYMBOL) {
        globalThis._LHF_SYMBOL = {};
        globalThis._LHF_PROP_SYMBOL = {};
    }
}
function getTransmitterSymbol() {
    if (!globalThis._LHF_SYMBOL.transmitter) {
        globalThis._LHF_SYMBOL.transmitter = Symbol('transmitter');
        return globalThis._LHF_SYMBOL.transmitter;
    }
    else {
        return globalThis._LHF_SYMBOL.transmitter;
    }
}
initSymbolCache();

if (!globalThis[getTransmitterSymbol()]) {
    globalThis[getTransmitterSymbol()] = {};
}
function transmitter() {
    return globalThis[getTransmitterSymbol()];
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
function unSubscribe(channel, ctx) {
    if (Array.isArray(transmitter()[channel])) {
        const events = transmitter()[channel].filter((event) => {
            if (event.ctx !== ctx) {
                return true;
            }
            else {
                return false;
            }
        });
        transmitter()[channel] = events;
    }
}
function subscribe(channel, ctx, func) {
    if (!Array.isArray(transmitter()[channel])) {
        transmitter()[channel] = [];
    }
    transmitter()[channel].push({ ctx: ctx, func: func });
}

const state = window.state || {};
if (!window.state) {
    window.addEventListener('SIMPLE_HTML_SAVE_STATE', () => {
        window.state = state;
        console.log('SIMPLE_HTML_HMR', window.state);
    });
}

function disconnectedCallback(ctx, call) {
    ctx.registerDisconnectCallback(call);
}

const CAN_DEACTIVATE_EVENT = 'CAN_DEACTIVATE_EVENT';
function subscribeCanDeactivateEvent(ctx, call) {
    subscribe(CAN_DEACTIVATE_EVENT, ctx, call);
}
function unSubscribeCanDeactivateEvent(ctx) {
    unSubscribe(CAN_DEACTIVATE_EVENT, ctx);
}
function publishCanDeactivateEvent() {
    publish(CAN_DEACTIVATE_EVENT);
}
let canDeactivateCallers = [];
function canDeactivate() {
    return new Promise(async (resolve) => {
        canDeactivateCallers = [];
        publishCanDeactivateEvent();
        setTimeout(async () => {
            let result = true;
            for (let i = 0; i < canDeactivateCallers.length; i++) {
                const y = await Promise.resolve(canDeactivateCallers[i]);
                if (y === false) {
                    result = y;
                }
            }
            resolve(result);
        }, 0);
    });
}
const stopCanDeactivate = function (promise) {
    canDeactivateCallers.push(promise);
};

const HASH_RENDER_EVENT = 'HASH_RENDER_EVENT';
function publishHashEvent() {
    publish(HASH_RENDER_EVENT);
}
function connectHashChanges(context, callback) {
    disconnectedCallback(context, () => unSubscribe(HASH_RENDER_EVENT, context));
    subscribe(HASH_RENDER_EVENT, context, callback);
}

const PATH_ARGUMENT_REGEX = '[a-zA-Z0-9\\_\\-\\:]+';

const PATH_SLASH_REGEX = '\\/';

function getVariableName(path) {
    return path.substring(1, path.length);
}

function isVariable(path) {
    if (path && typeof path === 'string' && path[0] === ':') {
        return true;
    }
    else {
        return false;
    }
}

function parseUrlPattern(urlPattern) {
    const paths = urlPattern.split('/');
    const pathsConfig = [];
    paths.forEach((path, index) => {
        if (index === paths.length - 1 &&
            path === '' &&
            urlPattern[urlPattern.length - 1] === PATH_SLASH_REGEX) ;
        else {
            pathsConfig.push({
                staticType: !isVariable(path),
                variable: isVariable(path) ? getVariableName(path) : null,
                regex: isVariable(path) ? PATH_ARGUMENT_REGEX : path
            });
        }
    });
    return pathsConfig;
}

function createRouteRegex(pathPattern, openEnd) {
    let regex = '';
    pathPattern.forEach((pattern, index) => {
        if ((pathPattern.length > 1 && index === 0) || pathPattern.length === 1) {
            regex = '^' + pattern.regex;
        }
        else {
            if (pattern.regex === PATH_SLASH_REGEX) {
                regex = regex + pattern.regex;
            }
            else {
                regex = regex + PATH_SLASH_REGEX + pattern.regex;
            }
        }
        if (!openEnd && pathPattern.length - 1 === index) {
            regex = regex + '($|/$)';
        }
    });
    return regex;
}

const routeMatch = function (hash = '', locationhash = window.location.hash) {
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
    const pattern = parseUrlPattern(hash);
    const regexString = createRouteRegex(pattern, openEnd);
    const regex = new RegExp(regexString);
    return regex.test(locationhash);
};

const resolvePromise = directive((promise, htmlTemplate) => (part) => {
    Promise.resolve(promise).then(() => {
        part.setValue(htmlTemplate);
        part.commit();
    });
});
const routeMatchAsync = function (hash = '', importStatement, htmlTemplate) {
    if (routeMatch(hash)) {
        return resolvePromise(importStatement(), htmlTemplate);
    }
    else {
        return '';
    }
};

const gotoURL = function (path, params = {}, query = null) {
    if (path[0] === '#') {
        path = path.substr(1, path.length);
    }
    const urls = path.split('/').filter((x) => (x ? true : false));
    let newUrl = '';
    urls.forEach((val, i) => {
        if (val[0] === ':' && params[val.substr(1, val.length)] !== undefined) {
            newUrl = newUrl + params[val.substr(1, val.length)];
        }
        else {
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
    }
    else {
        location.hash = newUrl;
    }
};

function startRouter() {
    let oldhash = window.location.hash;
    let isBackEvent = false;
    const hashChange = function () {
        if (!isBackEvent) {
            canDeactivate().then((result) => {
                if (result) {
                    oldhash = window.location.hash;
                    publishHashEvent();
                }
                else {
                    isBackEvent = true;
                    window.location.hash = oldhash;
                }
            });
        }
        else {
            isBackEvent = false;
        }
    };
    if (!globalThis.__simple_html_router) {
        globalThis.__simple_html_router = true;
        window.addEventListener('hashchange', hashChange);
    }
}

export { connectHashChanges, gotoURL, routeMatchAsync, startRouter, stopCanDeactivate, subscribeCanDeactivateEvent, unSubscribeCanDeactivateEvent };
