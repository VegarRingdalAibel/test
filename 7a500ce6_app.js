FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("src/index.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.css");
require("./routerConfig");
require("./components/app-main");
//# sourceMappingURL=index.js.map
});
___scope___.file("src/index.css", function(exports, require, module){
require("fuse-box-css")("default/src/index.css","body {\n    margin: 0;\n    overflow-y: scroll;\n}\n\n\n.tag-pill:hover{\n    background-color: #687077;\n    text-decoration: underline !important;\n\n}\n\n.tag-pill:focus{\n    color: #3d8b3d;\n    background-color: #687077;\n    text-decoration: underline !important;\n}\n\n")
});
___scope___.file("src/routerConfig.js", function(exports, require, module){
var $fsmp$ = require("fuse-box-dev-import");
Object.defineProperty(exports, "__esModule", { value: true });
const lit_html_free_router_1 = require("lit-html-free-router");
const litHtmlHelpers_1 = require("./litHtmlHelpers");
lit_html_free_router_1.getRouter().registerRouteChangeHandler((options, activeRouter) => {
    litHtmlHelpers_1.getContext(litHtmlHelpers_1.EventAggregator).publish('routeChange', { options, activeRouter });
});
lit_html_free_router_1.getRouter().addRouterConfig('main', [
    {
        path: '',
        load: () => $fsmp$("~/src/routes/home-route.js"),
        componentName: 'home-comp',
        name: 'Home',
        isNav: false
    },
    {
        path: 'home',
        componentName: 'home-comp',
        load: () => $fsmp$("~/src/routes/home-route.js"),
        name: 'Home'
    },
    {
        path: 'profile/:name',
        componentName: 'profile-comp',
        load: () => $fsmp$("~/src/routes/profile-route.js"),
        name: 'Profile',
        children: true
    },
    {
        path: 'login',
        componentName: 'auth-comp',
        load: () => $fsmp$("~/src/routes/auth-route.js"),
        name: 'Login'
    },
    {
        path: 'register',
        componentName: 'Auth-comp',
        load: () => $fsmp$("~/src/routes/auth-route.js"),
        name: 'Register'
    },
    {
        path: 'settings',
        componentName: 'Settings-comp',
        load: () => $fsmp$("~/src/routes/settings-route.js"),
        name: 'Settings'
    },
    {
        path: 'editor',
        componentName: 'Editor-comp',
        load: () => $fsmp$("~/src/routes/editor-route.js"),
        name: 'Editor'
    },
    {
        path: 'editor/:slug',
        componentName: 'Editor-comp',
        load: () => $fsmp$("~/src/routes/editor-route.js"),
        name: 'Editor'
    },
    {
        path: 'article/:slug',
        componentName: 'Article-comp',
        load: () => $fsmp$("~/src/routes/article-route.js"),
        name: 'Erticle'
    }
]);
lit_html_free_router_1.getRouter().addRouterConfig('subProfile', [
    {
        path: 'profile/:name',
        componentName: 'profile-article-route',
        load: () => $fsmp$("~/src/routes/profile-article-route.js"),
        name: 'MyPosts'
    },
    {
        path: 'profile/:name/favorites',
        componentName: 'profile-favorites-route',
        load: () => $fsmp$("~/src/routes/profile-favorites-route.js"),
        name: 'Favorites'
    }
]);
//# sourceMappingURL=routerConfig.js.map
});
___scope___.file("src/litHtmlHelpers.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const lit_html_1 = require("lit-html");
exports.registerCustomElement = (elementName, elementClass) => {
    if (!customElements.get(elementName)) {
        const rendermethod = elementClass.prototype.render;
        const connectedCallbackMethod = elementClass.prototype.connectedCallback;
        const disconnectedCallbackMethod = elementClass.prototype.disconnectedCallback;
        const updatedMethod = elementClass.prototype.updated;
        elementClass.prototype.render = function (...result) {
            lit_html_1.render(rendermethod.call(this, ...result), this, { eventContext: this });
            if (updatedMethod) {
                updatedMethod();
            }
        };
        elementClass.prototype.connectedCallback = function () {
            if (connectedCallbackMethod) {
                connectedCallbackMethod.call(this);
            }
            if (!this.haltUpdate) {
                this.render();
            }
        };
        elementClass.prototype.disconnectedCallback = function () {
            if (disconnectedCallbackMethod) {
                disconnectedCallbackMethod.call(this);
            }
        };
        customElements.define(elementName, elementClass);
    }
    else {
        console.log('element already registered');
    }
};
const singeltonMap = new Map();
exports.getContext = (_class) => {
    if (singeltonMap.has(_class)) {
        return singeltonMap.get(_class);
    }
    else {
        const newclass = new _class();
        singeltonMap.set(_class, newclass);
        return newclass;
    }
};
class EventAggregator {
    constructor() {
        this.channels = {};
    }
    publish(channel, ...args) {
        if (Array.isArray(this.channels[channel])) {
            for (let i = 0, len = this.channels[channel].length; i < len; i++) {
                this.channels[channel][i].func.apply(this, args);
            }
        }
        else {
        }
    }
    unsubscribe(channel, ctx) {
        if (Array.isArray(this.channels[channel])) {
            for (let i = 0, len = this.channels[channel].length; i < len; i++) {
                if (this.channels[channel][i].ctx === ctx) {
                    this.channels[channel].splice(i, 1);
                }
            }
        }
        else {
        }
    }
    subscribe(channel, ctx, func) {
        if (!Array.isArray(this.channels[channel])) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({ ctx: ctx, func: func });
    }
}
exports.EventAggregator = EventAggregator;
class FetchClient {
    constructor(config = {}) {
        this.config = config;
        this.setConfig(config);
    }
    setConfig(config) {
        if (config.defaultUrl) {
            this.config.defaultUrl = config.defaultUrl;
        }
        if (config.cache) {
            this.config.cache = config.cache;
        }
        if (config.credentials) {
            this.config.credentials = config.credentials;
        }
        if (config.headers) {
            this.config.headers = config.headers;
        }
        if (config.method) {
            this.config.method = config.method;
        }
        if (config.mode) {
            this.config.mode = config.mode;
        }
        if (config.redirect) {
            this.config.redirect = config.redirect;
        }
        if (config.referrer) {
            this.config.referrer = config.referrer;
        }
    }
    getConfig() {
        return this.config;
    }
    fetch(url, options) {
        const fetchUrl = this.config.defaultUrl ? this.config.defaultUrl + url : url;
        const fetchOptions = {
            body: options.body ? options.body : undefined,
            cache: options.cache || this.config.cache,
            credentials: options.credentials || this.config.credentials,
            headers: options.headers || this.config.headers,
            method: options.method || this.config.method,
            mode: options.mode || this.config.mode,
            redirect: options.redirect || this.config.redirect,
            referrer: options.referrer || this.config.referrer
        };
        return fetch(fetchUrl, fetchOptions);
    }
}
exports.FetchClient = FetchClient;
//# sourceMappingURL=litHtmlHelpers.js.map
});
___scope___.file("src/routes/home-route.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const lit_html_1 = require("lit-html");
const litHtmlHelpers_1 = require("../litHtmlHelpers");
const sharedstate_1 = require("~/src/resources/state/sharedstate.js");
const tagservice_1 = require("~/src/resources/services/tagservice.js");
const articleservice_1 = require("~/src/resources/services/articleservice.js");
require("../components/article-list");
litHtmlHelpers_1.registerCustomElement('home-comp', class extends HTMLElement {
    constructor() {
        super(...arguments);
        this.articles = [];
        this.shownList = 'all';
        this.tags = [];
        this.filterTag = undefined;
        this.currentPage = 1;
        this.limit = 10;
    }
    connectedCallback() {
        this.sharedState = litHtmlHelpers_1.getContext(sharedstate_1.SharedState);
        this.tagService = litHtmlHelpers_1.getContext(tagservice_1.TagService);
        this.articleService = litHtmlHelpers_1.getContext(articleservice_1.ArticleService);
        this.eventAggregator = litHtmlHelpers_1.getContext(litHtmlHelpers_1.EventAggregator);
        this.getArticles();
        this.getTags();
    }
    async getArticles() {
        const params = {
            limit: this.limit,
            offset: this.limit * (this.currentPage - 1)
        };
        if (this.filterTag !== undefined) {
            params.tag = this.filterTag;
        }
        const response = await this.articleService.getList(this.shownList, params);
        this.articles.splice(0, this.tags.length);
        this.articles.push(...response.articles);
        this.totalPages = Array.from(new Array(Math.ceil(response.articlesCount / this.limit)), (_val, index) => index + 1);
        this.render();
    }
    async getTags() {
        const response = await this.tagService.getList();
        this.tags.splice(0, this.tags.length);
        this.tags.push(...response);
        this.render();
    }
    setListTo(type, tag) {
        if (type === 'feed' && !this.sharedState.isAuthenticated) {
            return;
        }
        if (tag !== this.filterTag) {
            this.currentPage = 1;
        }
        this.shownList = type;
        this.filterTag = tag;
        this.getArticles();
    }
    setPageTo(pageNumber) {
        this.currentPage = pageNumber;
        this.getArticles();
    }
    render() {
        return lit_html_1.html `
                <div class="home-page">
                    <div class="banner">
                        <div class="container">
                            <h1 class="logo-font">conduit</h1>
                            <p>A place to share your knowledge.</p>
                        </div>
                    </div>

                    <div class="container page">
                        <div class="row">
                            <div class="col-md-9">
                                <div class="feed-toggle">
                                    <ul class="nav nav-pills outline-active">
                                        <li class="nav-item">
                                            <a
                                                class=" nav-link ${this.sharedState.isAuthenticated ? '' : 'disabled'} 
                                                ${this.shownList === 'feed' ? ' active' : ''}"
                                                @click=${() => this.setListTo('feed')}
                                                >Your Feed</a
                                            >
                                        </li>
                                        <li class="nav-item">
                                            <a
                                                class="nav-link ${!this.filterTag && this.shownList === 'all' ? 'active' : ''}"
                                                @click=${() => this.setListTo('all')}
                                                >Global Feed</a
                                            >
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link ${this.filterTag ? 'active' : ''}"
                                                >${this.filterTag ? '#' + this.filterTag : ''}</a
                                            >
                                        </li>
                                    </ul>
                                </div>

                                <article-list
                                    .articles=${this.articles}
                                    .totalPages=${this.totalPages}
                                    .currentPage=${this.currentPage}
                                    set-page-cb.trigger="setPageTo($event.detail)"
                                ></article-list>
                            </div>

                            <div class="col-md-3">
                                <div class="sidebar">
                                    <p>Popular Tags</p>

                                    <div class="tag-list">
                                        ${this.tags.map(tag => {
            return lit_html_1.html `
                                                <a class="tag-pill tag-default" click.delegate="setListTo('all', tag)">${tag}</a>
                                            `;
        })}
                                        ${this.tags.length === 0 ?
            lit_html_1.html `
                                                <div>No tags are here... yet.</div>
                                            ` : ''} 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    }
});
//# sourceMappingURL=home-route.js.map
});
___scope___.file("src/resources/state/sharedstate.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
class SharedState {
    constructor() {
        this.setState();
    }
    resetState() {
        this.currentUser = new user_1.User();
        this.isAuthenticated = false;
    }
    setState() {
        if (window.localStorage['jwtToken']) {
            const user = window.localStorage[window.localStorage['jwtToken'] + 'currentUser'];
            if (user) {
                this.currentUser = new user_1.User(JSON.parse(user));
                this.isAuthenticated = true;
            }
            else {
                this.currentUser = new user_1.User();
                this.isAuthenticated = false;
            }
        }
    }
    saveState(user) {
        if (user) {
            window.localStorage[window.localStorage['jwtToken'] + 'currentUser'] = JSON.stringify(user);
        }
    }
}
exports.SharedState = SharedState;
//# sourceMappingURL=sharedstate.js.map
});
___scope___.file("src/resources/models/user.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(user) {
        this.email = user ? user.email : '';
        this.token = user ? user.token : '';
        this.username = user ? user.username : '';
        this.bio = user ? user.bio : '';
        this.image = user ? user.image : '';
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map
});
___scope___.file("src/resources/services/tagservice.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const apiservice_1 = require("./apiservice");
const litHtmlHelpers_1 = require("~/src/litHtmlHelpers.js");
class TagService {
    constructor() {
        this.apiService = litHtmlHelpers_1.getContext(apiservice_1.ApiService);
    }
    async getList() {
        const data = await this.apiService.get('/tags');
        return data.tags;
    }
}
exports.TagService = TagService;
//# sourceMappingURL=tagservice.js.map
});
___scope___.file("src/resources/services/apiservice.js", function(exports, require, module){
var http = require("http");
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const jwtservice_1 = require("./jwtservice");
const servicehelper_1 = require("./servicehelper");
const litHtmlHelpers_1 = require("~/src/litHtmlHelpers.js");
const queryStringify_1 = require("../queryStringify");
class ApiService {
    constructor() {
        this.jwtService = litHtmlHelpers_1.getContext(jwtservice_1.JwtService);
        this.http = new litHtmlHelpers_1.FetchClient();
    }
    setHeaders() {
        const headersConfig = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        };
        if (this.jwtService.getToken()) {
            headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
        }
        return new Headers(headersConfig);
    }
    async get(path, params) {
        const options = {
            method: 'GET',
            headers: this.setHeaders()
        };
        try {
            const result = await this.http.fetch(`${config_1.config.api_url}${path}?${queryStringify_1.urlqueryStringify(params)}`, options);
            return servicehelper_1.status(result);
        }
        catch (e) {
            return servicehelper_1.parseError(e);
        }
    }
    async put(path, body = {}) {
        const options = {
            method: 'PUT',
            headers: this.setHeaders(),
            body: JSON.stringify(body)
        };
        try {
            const result = await this.http.fetch(`${config_1.config.api_url}${path}`, options);
            return servicehelper_1.status(result);
        }
        catch (e) {
            return await servicehelper_1.parseError(e);
        }
    }
    async post(path, body = {}) {
        const options = {
            method: 'POST',
            headers: this.setHeaders(),
            body: JSON.stringify(body)
        };
        try {
            const result = await this.http.fetch(`${config_1.config.api_url}${path}`, options);
            return servicehelper_1.status(result);
        }
        catch (e) {
            return await servicehelper_1.parseError(e);
        }
    }
    async delete(path) {
        const options = {
            method: 'DELETE',
            headers: this.setHeaders()
        };
        try {
            const result = await this.http.fetch(`${config_1.config.api_url}${path}`, options);
            return servicehelper_1.status(result);
        }
        catch (e) {
            return await servicehelper_1.parseError(e);
        }
    }
}
exports.ApiService = ApiService;
//# sourceMappingURL=apiservice.js.map
});
___scope___.file("src/resources/services/config.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    api_url: 'https://conduit.productionready.io/api'
};
//# sourceMappingURL=config.js.map
});
___scope___.file("src/resources/services/jwtservice.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
class JwtService {
    getToken() {
        return window.localStorage['jwtToken'];
    }
    saveToken(token) {
        window.localStorage['jwtToken'] = token;
    }
    destroyToken() {
        window.localStorage.removeItem('jwtToken');
    }
}
exports.JwtService = JwtService;
//# sourceMappingURL=jwtservice.js.map
});
___scope___.file("src/resources/services/servicehelper.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
function status(response) {
    if (response.status >= 200 && response.status < 400) {
        return response.json();
    }
    throw response;
}
exports.status = status;
function parseError(error) {
    if (!(error instanceof Error)) {
        return new Promise((_resolve, reject) => reject(error.json()));
    }
    else {
        return Promise.resolve(null);
    }
}
exports.parseError = parseError;
//# sourceMappingURL=servicehelper.js.map
});
___scope___.file("src/resources/queryStringify.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const has = Object.prototype.hasOwnProperty;
function decode(input) {
    return decodeURIComponent(input.replace(/\+/g, ' '));
}
function urlQueryParse(query) {
    const parser = /([^=?&]+)=?([^&]*)/g;
    const result = {};
    let part;
    for (; part = parser.exec(query); result[decode(part[1])] = decode(part[2]))
        ;
    return result;
}
exports.urlQueryParse = urlQueryParse;
function urlqueryStringify(obj, prefix) {
    prefix = prefix || '';
    const pairs = [];
    if ('string' !== typeof prefix) {
        prefix = '?';
    }
    for (const key in obj) {
        if (has.call(obj, key)) {
            pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
    }
    return pairs.length ? prefix + pairs.join('&') : '';
}
exports.urlqueryStringify = urlqueryStringify;
//# sourceMappingURL=queryStringify.js.map
});
___scope___.file("src/resources/services/articleservice.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const apiservice_1 = require("./apiservice");
const litHtmlHelpers_1 = require("~/src/litHtmlHelpers.js");
class ArticleService {
    constructor() {
        this.apiService = litHtmlHelpers_1.getContext(apiservice_1.ApiService);
    }
    async getList(type, params) {
        const data = await this.apiService.get('/articles' + (type === 'feed' ? '/feed' : ''), params);
        return data;
    }
    async get(slug) {
        const data = await this.apiService.get('/articles/' + slug);
        return data.article;
    }
    async destroy(slug) {
        const result = await this.apiService.delete('/articles/' + slug);
        return result;
    }
    async save(article) {
        if (article.slug) {
            const data = await this.apiService.put('/articles/' + article.slug, { article: article });
            return data.article;
        }
        else {
            const data = await this.apiService.post('/articles/', { article: article });
            return data.article;
        }
    }
    async favorite(slug) {
        const result = await this.apiService.post('/articles/' + slug + '/favorite');
        return result;
    }
    async unfavorite(slug) {
        const result = await this.apiService.delete('/articles/' + slug + '/favorite');
        return result;
    }
}
exports.ArticleService = ArticleService;
//# sourceMappingURL=articleservice.js.map
});
___scope___.file("src/components/article-list.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const lit_html_1 = require("lit-html");
const litHtmlHelpers_1 = require("../litHtmlHelpers");
require("./article-preview");
litHtmlHelpers_1.registerCustomElement('article-list', class extends HTMLElement {
    constructor() {
        super(...arguments);
        this._articles = [];
        this._totalPages = [];
    }
    set articles(v) {
        this._articles = v || [];
        this.render();
    }
    get articles() {
        return this._articles;
    }
    set totalPages(v) {
        this._totalPages = v || [];
        this.render();
    }
    get totalPages() {
        return this._totalPages;
    }
    render() {
        return lit_html_1.html `
                ${this.articles.length === 0
            ? lit_html_1.html `
                          <div class="article-preview">
                              No articles are here... yet.
                          </div>
                      `
            : ''}

                <!--  if we have articles -->
                ${this.articles.map(article => {
            return lit_html_1.html `
                        <article-preview .article=${article}></article-preview>
                    `;
        })}

                <!--  all the buttons -->
                ${this.totalPages.length
            ? lit_html_1.html `
                          <nav>
                              <ul class="pagination">
                                  ${this.totalPages.map((pageNumber) => {
                return lit_html_1.html `
                                          <li
                                              class="page-item ${pageNumber === this.currentPage ? 'active' : ''}"
                                              click.delegate="setPageCb($pageNumber)"
                                          >
                                              <a class="page-link">${pageNumber}</a>
                                          </li>
                                      `;
            })}
                              </ul>
                          </nav>
                      `
            : ''}
            `;
    }
});
//# sourceMappingURL=article-list.js.map
});
___scope___.file("src/components/article-preview.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const lit_html_1 = require("lit-html");
const litHtmlHelpers_1 = require("../litHtmlHelpers");
const articleservice_1 = require("~/src/resources/services/articleservice.js");
const sharedstate_1 = require("~/src/resources/state/sharedstate.js");
const lit_html_free_router_1 = require("lit-html-free-router");
litHtmlHelpers_1.registerCustomElement('article-preview', class extends HTMLElement {
    constructor() {
        super();
        this.articleService = litHtmlHelpers_1.getContext(articleservice_1.ArticleService);
        this.sharedState = litHtmlHelpers_1.getContext(sharedstate_1.SharedState);
    }
    async onToggleFavorited() {
        if (this.sharedState.isAuthenticated) {
            this.article.favorited = !this.article.favorited;
            if (this.article.favorited) {
                this.article.favoritesCount++;
                await this.articleService.favorite(this.article.slug);
            }
            else {
                this.article.favoritesCount--;
                await this.articleService.unfavorite(this.article.slug);
            }
            this.render();
        }
        else {
            lit_html_free_router_1.getRouter().goto(lit_html_free_router_1.getRouter().getNavLink('login', 'main').href);
        }
    }
    render() {
        return lit_html_1.html `
                <div class="article-preview">
                    <div class="article-meta">
                        <a href="${'#' + this.article.author.username}">
                            <img alt="profile-picture" src=${this.article.author.image ? this.article.author.image : ''} />
                        </a>

                        <div class="info">
                            <a href="${'#profile/' + this.article.author.username}" class="author">
                                ${this.article.author.username}</a
                            >
                            <span class="date">${this.article.createdAt}</span>
                        </div>

                        <button
                            class="btn btn-sm pull-xs-right ${this.article.favorited ? 'btn-primary' : 'btn-outline-primary'}"
                            @click=${this.onToggleFavorited}
                        >
                            <i class="ion-heart"></i> ${this.article.favoritesCount}
                        </button>
                    </div>

                    <a href="${this.article.slug ? '#article/' + this.article.slug : '#article'}" class="preview-link">
                        <h1>${this.article.title}</h1>
                        <p>${this.article.description}</p>
                        <span>Read more...</span>

                        <ul class="tag-list">
                            ${this.article.tagList.map((tag) => {
            lit_html_1.html `
                                    <li class="tag-default tag-pill tag-outline">${tag}</li>
                                `;
        })}
                        </ul>
                    </a>
                </div>
            `;
    }
});
//# sourceMappingURL=article-preview.js.map
});
___scope___.file("src/routes/profile-route.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const lit_html_1 = require("lit-html");
const litHtmlHelpers_1 = require("../litHtmlHelpers");
const profileservice_1 = require("~/src/resources/services/profileservice.js");
const sharedstate_1 = require("~/src/resources/state/sharedstate.js");
litHtmlHelpers_1.registerCustomElement('profile-comp', class extends HTMLElement {
    constructor() {
        super();
        this.curRoute = '';
        this.eventAggregator = litHtmlHelpers_1.getContext(litHtmlHelpers_1.EventAggregator);
        this.profileService = litHtmlHelpers_1.getContext(profileservice_1.ProfileService);
        this.sharedState = litHtmlHelpers_1.getContext(sharedstate_1.SharedState);
    }
    connectedCallback() {
        litHtmlHelpers_1.getContext(litHtmlHelpers_1.EventAggregator).subscribe('routeChange', this, this.routechange.bind(this));
    }
    routechange(x) {
        this.curRoute = x.options.name;
        this.render();
    }
    async activate(_x, params) {
        this.username = params.name;
        this.profile = await this.profileService.get(this.username);
    }
    isUser() {
        if (this.profile) {
            return this.profile.username === this.sharedState.currentUser && this.sharedState.currentUser.username;
        }
        else {
            return false;
        }
    }
    render() {
        return lit_html_1.html `
                <div class="profile-page">
                    <div class="user-info">
                        <div class="container">
                            <div class="row">
                                <div class="col-xs-12 col-md-10 offset-md-1">
                                    <img
                                        if.bind="profile"
                                        src=${this.profile ? this.profile.image : undefined}
                                        class="user-img"
                                    />
                                    <div if.bind="!profile" class="user-img"></div>
                                    <h4>${this.profile.username ? this.profile.username : 'loading..'}</h4>
                                    <p inner-html.bind="profile.bio | formatHtml"></p>
                                    <button
                                        class="btn btn-sm btn-outline-secondary action-btn"
                                        if.bind="!isUser() && profile"
                                        click.delegate="onToggleFollowing()"
                                    >
                                        <i class="ion-plus-round"></i>
                                        &nbsp; ${this.profile.following ? 'Unfollow' : 'Follow'} ${this.profile.username}
                                    </button>
                                    ${this.isUser() && this.profile
            ? lit_html_1.html `
                                              <a href="#settings" class="btn btn-sm btn-outline-secondary action-btn">
                                                  <i class="ion-gear-a"></i> Edit Profile Settings
                                              </a>
                                          `
            : ''}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12 col-md-10 offset-md-1">
                                <div class="articles-toggle">
                                    <ul class="nav nav-pills outline-active">
                                        <li class="nav-item">
                                            <a
                                                class="nav-link ${this.curRoute !== 'Favorites' ? 'active' : ''}"
                                                href="#profile/${this.username}/"
                                                >My Posts</a
                                            >
                                        </li>
                                        <li class="nav-item">
                                            <a
                                                class="nav-link ${this.curRoute === 'Favorites' ? 'active' : ''}"
                                                href="#profile/${this.username}/favorites"
                                                >Favorited Posts</a
                                            >
                                        </li>
                                    </ul>
                                </div>

                                <free-router name="subProfile"> </free-router>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    }
});
//# sourceMappingURL=profile-route.js.map
});
___scope___.file("src/resources/services/profileservice.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const apiservice_1 = require("./apiservice");
const litHtmlHelpers_1 = require("~/src/litHtmlHelpers.js");
class ProfileService {
    constructor() {
        this.apiService = litHtmlHelpers_1.getContext(apiservice_1.ApiService);
    }
    async get(username) {
        const data = await this.apiService.get('/profiles/' + username);
        return data.profile;
    }
    async follow(username) {
        const result = await this.apiService.post('/profiles/' + username + '/follow');
        return result;
    }
    async unfollow(username) {
        const result = await this.apiService.delete('/profiles/' + username + '/follow');
        return result;
    }
}
exports.ProfileService = ProfileService;
//# sourceMappingURL=profileservice.js.map
});
___scope___.file("src/routes/auth-route.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const lit_html_1 = require("lit-html");
const litHtmlHelpers_1 = require("../litHtmlHelpers");
const userservice_1 = require("~/src/resources/services/userservice.js");
const sharedstate_1 = require("~/src/resources/state/sharedstate.js");
litHtmlHelpers_1.registerCustomElement('auth-comp', class extends HTMLElement {
    constructor() {
        super();
        this.type = '';
        this.username = '';
        this.passwordConfirm = '';
        this.email = '';
        this.emailConfirm = '';
        this.password = '';
        this.errors = [];
        this.userService = litHtmlHelpers_1.getContext(userservice_1.UserService);
        this.sharedState = litHtmlHelpers_1.getContext(sharedstate_1.SharedState);
    }
    async activate(_route, _params, route) {
        this.type = route.name;
    }
    get canSave() {
        if (this.type === 'Login') {
            return this.email !== '' && this.password !== '';
        }
        else {
            return (this.username !== '' &&
                this.email !== '' &&
                this.password !== '' &&
                this.password === this.passwordConfirm &&
                this.email === this.emailConfirm);
        }
    }
    async submitForm() {
        this.errors = [];
        const credentials = {
            username: this.username,
            email: this.email,
            password: this.password
        };
        try {
            await this.userService.attemptAuth(this.type, credentials);
            location.hash = 'home';
        }
        catch (e) {
            const err = await Promise.resolve(e);
            for (const k in err.errors) {
                if (err.errors && err.errors[k]) {
                    this.errors.push(err.errors[k].map((x) => {
                        return k + ': ' + x;
                    }));
                }
            }
            this.render();
        }
    }
    render() {
        return lit_html_1.html `
                <div class="auth-page">
                    <div class="container page">
                        <div class="row">
                            <div class="col-md-6 offset-md-3 col-xs-12">
                                <h1 class="text-xs-center">Sign ${this.type === 'login' ? 'in' : 'up'}</h1>
                                <p class="text-xs-center">
                                    ${this.type === 'Register'
            ? lit_html_1.html `
                                              <a href="#login">Have an account?</a>
                                          `
            : lit_html_1.html `
                                              <a href="#Register">Need an account?</a>
                                          `}
                                </p>

                                <ul class="error-messages">
                                    ${this.errors.map(error => {
            return lit_html_1.html `<li >
                                        ${error}
                                    </li>`;
        })}
                                </ul>

                                <form>
                                    ${this.type === 'Register'
            ? lit_html_1.html `
                                              <fieldset class="form-group">
                                                  <input
                                                      class="form-control form-control-lg"
                                                      type="text"
                                                      autocomplete="username"
                                                      placeholder="Your Name"
                                                      @input=${(e) => {
                this.username = e.target.value;
                this.render();
            }}
                                                  />
                                              </fieldset>
                                          `
            : ''}

                                    <fieldset class="form-group">
                                        <input
                                            class="form-control form-control-lg"
                                            type="text"
                                            autocomplete="email"
                                            placeholder="Email"
                                            @input=${(e) => {
            this.email = e.target.value;
            this.render();
        }}
                                        />
                                    </fieldset>

                                    ${this.type === 'Register'
            ? lit_html_1.html `
                                              <fieldset class="form-group">
                                                  <input
                                                      class="form-control form-control-lg"
                                                      type="text"
                                                      autocomplete="new-email"
                                                      placeholder="Confirm Email"
                                                      @input=${(e) => {
                this.emailConfirm = e.target.value;
                this.render();
            }}
                                                  />
                                              </fieldset>
                                          `
            : ''}

                                    <fieldset class="form-group">
                                        <input
                                            class="form-control form-control-lg"
                                            type="password"
                                            autocomplete="current-password"
                                            placeholder="Password"
                                            @input=${(e) => {
            this.password = e.target.value;
            this.render();
        }}
                                        />
                                    </fieldset>

                                    ${this.type === 'Register'
            ? lit_html_1.html `
                                              <fieldset class="form-group">
                                                  <input
                                                      class="form-control form-control-lg"
                                                      type="password"
                                                      autocomplete="new-password"
                                                      placeholder="Confirm Password"
                                                      @input=${(e) => {
                this.passwordConfirm = e.target.value;
                this.render();
            }}
                                                  />
                                              </fieldset>
                                          `
            : ''}

                                    <!-- PS! do not use button in forms, need to improve override default -->
                                    <input
                                        type="button"
                                        class="btn btn-lg btn-primary pull-xs-right"
                                        @click=${this.submitForm}
                                        .disabled=${!this.canSave}
                                        .value="Sign ${this.type === 'Login' ? 'in' : 'up'}"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    }
});
//# sourceMappingURL=auth-route.js.map
});
___scope___.file("src/resources/services/userservice.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const apiservice_1 = require("./apiservice");
const jwtservice_1 = require("./jwtservice");
const sharedstate_1 = require("../state/sharedstate");
const litHtmlHelpers_1 = require("~/src/litHtmlHelpers.js");
class UserService {
    constructor() {
        this.jwtService = litHtmlHelpers_1.getContext(jwtservice_1.JwtService);
        this.sharedState = litHtmlHelpers_1.getContext(sharedstate_1.SharedState);
        this.apiService = litHtmlHelpers_1.getContext(apiservice_1.ApiService);
    }
    async populate() {
        if (this.jwtService.getToken()) {
            const data = await this.apiService.get('/user');
            this.setAuth(data.user);
        }
        else {
            this.purgeAuth();
        }
    }
    setAuth(user) {
        this.jwtService.saveToken(user.token);
        this.sharedState.saveState(user);
        this.sharedState.setState();
    }
    purgeAuth() {
        this.jwtService.destroyToken();
        this.sharedState.resetState();
    }
    async attemptAuth(type, credentials) {
        const route = type === 'Login' ? '/login' : '';
        const data = await this.apiService.post('/users' + route, { user: credentials });
        this.setAuth(data.user);
        return data;
    }
    async update(user) {
        const data = await this.apiService.put('/user', { user });
        this.sharedState.currentUser = data.user;
        return data.user;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userservice.js.map
});
___scope___.file("src/routes/settings-route.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const lit_html_1 = require("lit-html");
const litHtmlHelpers_1 = require("../litHtmlHelpers");
const userservice_1 = require("~/src/resources/services/userservice.js");
const sharedstate_1 = require("~/src/resources/state/sharedstate.js");
litHtmlHelpers_1.registerCustomElement('settings-comp', class extends HTMLElement {
    constructor() {
        super();
        this.errors = [];
        this.userService = litHtmlHelpers_1.getContext(userservice_1.UserService);
        this.sharedState = litHtmlHelpers_1.getContext(sharedstate_1.SharedState);
    }
    async update() {
        try {
            await this.userService.update(this.sharedState.currentUser);
            this.success = 'Updated successfully';
            setTimeout(() => {
                this.success = null;
            }, 1500);
        }
        catch (e) {
            const err = await Promise.resolve(e);
            for (const k in err.errors) {
                if (err.errors && err.errors[k]) {
                    this.errors.push(err.errors[k].map((x) => {
                        return k + ': ' + x;
                    }));
                }
            }
        }
    }
    get canSave() {
        return (this.sharedState && this.sharedState.currentUser && this.sharedState.password === this.passwordConfirm);
    }
    logout() {
        this.userService.purgeAuth();
        location.hash = 'home';
    }
    render() {
        return lit_html_1.html `
                <div class="settings-page">
                    <div class="container page">
                        <div class="row">
                            <div class="col-md-6 offset-md-3 col-xs-12">
                                <h1 class="text-xs-center">Your Settings</h1>

                                <ul class="error-messages">
                                    ${this.errors.map(error => {
            return lit_html_1.html `
                                            <li>
                                                ${error}
                                            </li>
                                        `;
        })}
                                </ul>

                                <ul class="error-success">
                                    ${this.success}
                                </ul>

                                <form>
                                    <fieldset>
                                        <fieldset class="form-group">
                                            <input
                                                class="form-control"
                                                type="text"
                                                placeholder="URL of profile picture"
                                                .value =${this.sharedState.currentUser.image}
                                                @input=${(e) => {
            this.sharedState.currentUser.image = e.target.value;
            this.render();
        }}
                                            />
                                        </fieldset>

                                        <fieldset class="form-group">
                                            <input
                                                class="form-control form-control-lg"
                                                type="text"
                                                placeholder="Your Name"
                                                autocomplete="usename"
                                                .value =${this.sharedState.currentUser.username}
                                                @input=${(e) => {
            this.sharedState.currentUser.username = e.target.value;
            this.render();
        }}
                                            />
                                        </fieldset>

                                        <fieldset class="form-group">
                                            <textarea
                                                class="form-control form-control-lg"
                                                rows="8"
                                                placeholder="Short bio about you"
                                                autocomplete="bio"
                                                .value =${this.sharedState.currentUser.bio}
                                                @input=${(e) => {
            this.sharedState.currentUser.bio = e.target.value;
            this.render();
        }}
                                            ></textarea>
                                        </fieldset>

                                        <fieldset class="form-group">
                                            <input
                                                class="form-control form-control-lg"
                                                type="text"
                                                placeholder="Email"
                                                autocomplete="email"
                                                @input=${(e) => {
            this.sharedState.currentUser.email = e.target.value;
            this.render();
        }}
                                            />
                                        </fieldset>

                                        <fieldset class="form-group">
                                            <input
                                                class="form-control form-control-lg"
                                                type="password"
                                                autocomplete="current-password"
                                                placeholder="Password"
                                                 @input=${(e) => {
            this.password = e.target.value;
            this.render();
        }}
                                            />
                                        </fieldset>

                                        <fieldset class="form-group">
                                            <input
                                                class="form-control form-control-lg"
                                                type="password"
                                                autocomplete="new-password"
                                                placeholder="Confirm new password"
                                                @input=${(e) => {
            this.passwordConfirm = e.target.value;
            this.render();
        }}
                                            />
                                        </fieldset>

                                        <!-- PS! do not use button in forms, need to improve override default -->
                                        <input
                                            type="button"
                                            class="btn btn-lg btn-primary pull-xs-right"
                                            @click=${this.update}
                                            .disabled.bind=${!this.canSave}
                                            value="Update Settings"
                                        />
                                    </fieldset>
                                </form>

                                <hr />
                                <button class="btn btn-outline-danger" @click=${this.logout}>
                                    Or click here to logout.
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    }
});
//# sourceMappingURL=settings-route.js.map
});
___scope___.file("src/routes/editor-route.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const lit_html_1 = require("lit-html");
const litHtmlHelpers_1 = require("../litHtmlHelpers");
const articleservice_1 = require("~/src/resources/services/articleservice.js");
const lit_html_free_router_1 = require("lit-html-free-router");
litHtmlHelpers_1.registerCustomElement('editor-comp', class extends HTMLElement {
    constructor() {
        super();
        this.article = {
            title: '',
            description: '',
            body: '',
            tagList: []
        };
        this.articleService = litHtmlHelpers_1.getContext(articleservice_1.ArticleService);
    }
    tagChanged(newValue, _oldValue) {
        if (newValue !== undefined && newValue !== '') {
            this.addTag(this.tag);
        }
    }
    async activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.slug = params.slug;
        if (this.slug) {
            return (this.article = await this.articleService.get(this.slug));
        }
        else {
            this.article = {
                title: '',
                description: '',
                body: '',
                tagList: []
            };
        }
        return null;
    }
    addTag(tag) {
        this.article.tagList.push(tag);
    }
    removeTag(tag) {
        this.article.tagList.splice(this.article.tagList.indexOf(tag), 1);
    }
    async publishArticle() {
        const article = await this.articleService.save(this.article);
        this.slug = article.slug;
        lit_html_free_router_1.getRouter().goto('editor/:slug', { slug: this.slug });
    }
    render() {
        console.log('wow');
        return lit_html_1.html `
                <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input 
                type="text" 
                class="form-control form-control-lg" 
                placeholder="Article Title" 
    
                .value=${this.article.title}
                    @blur=${(e) => (this.article.title = e.target.value)}
       >
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="What's this article about?" 
                .value=${this.article.description}
                    @blur=${(e) => (this.article.description = e.target.value)}
            />
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" 
      
                .value=${this.article.body}
                    @blur=${(e) => (this.article.body = e.target.value)}
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" 
                    .value=${this.tag}
                    @blur=${(e) => (this.tag = e.target.value)}>
        
                <div class="tag-list">
                    ${this.article.tagList.map((tag) => {
            return lit_html_1.html `
                            <span repeat.for="$tag of article.tagList" class="tag-default tag-pill">
                                <i class="ion-close-round" @click=${() => {
                this.removeTag(tag);
            }}"></i>
                                ${tag}</span
                            >
                        `;
        })}
                  
                </div>
              </fieldset>

              <!-- PS! do not use button in forms, need to improve override default -->
              <input type="button" class="btn btn-lg pull-xs-right btn-primary" type="button" @click=${this.publishArticle} value="Publish Article">
            
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>

            `;
    }
});
//# sourceMappingURL=editor-route.js.map
});
___scope___.file("src/routes/article-route.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const lit_html_1 = require("lit-html");
const litHtmlHelpers_1 = require("../litHtmlHelpers");
litHtmlHelpers_1.registerCustomElement('acticle-comp', class extends HTMLElement {
    render() {
        return lit_html_1.html `
                acticle-comp
            `;
    }
});
//# sourceMappingURL=article-route.js.map
});
___scope___.file("src/routes/profile-article-route.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const lit_html_1 = require("lit-html");
const litHtmlHelpers_1 = require("../litHtmlHelpers");
const articleservice_1 = require("~/src/resources/services/articleservice.js");
require("../components/article-list");
litHtmlHelpers_1.registerCustomElement('profile-article-route', class extends HTMLElement {
    constructor() {
        super();
        this.articles = [];
        this.currentPage = 1;
        this.limit = 10;
        this.articleService = litHtmlHelpers_1.getContext(articleservice_1.ArticleService);
        this.eventAggregator = litHtmlHelpers_1.getContext(litHtmlHelpers_1.EventAggregator);
    }
    activate(_x, params) {
        this.username = params.name;
        return this.getArticles();
    }
    async getArticles() {
        const queryParams = {
            limit: this.limit,
            offset: this.limit * (this.currentPage - 1),
            author: this.username
        };
        const response = await this.articleService.getList('all', queryParams);
        this.articles.splice(0, this.articles.length);
        this.articles.push(...response.articles);
        this.totalPages = Array.from(new Array(Math.ceil(response.articlesCount / this.limit)), (_val, index) => index + 1);
        this.eventAggregator.publish('articleChange');
        this.render();
    }
    render() {
        return lit_html_1.html `
                <article-list
                    .articles=${this.articles}
                    .totalPages=${this.totalPages}
                    .pageNumber=${this.pageNumber}
                    .currentPage=${this.currentPage}
                    set-page-cb.trigger="setPageTo(pageNumber)"
                ></article-list>
            `;
    }
});
//# sourceMappingURL=profile-article-route.js.map
});
___scope___.file("src/routes/profile-favorites-route.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const lit_html_1 = require("lit-html");
const litHtmlHelpers_1 = require("../litHtmlHelpers");
const articleservice_1 = require("~/src/resources/services/articleservice.js");
litHtmlHelpers_1.registerCustomElement('profile-favorites-route', class extends HTMLElement {
    constructor() {
        super();
        this.articles = [];
        this.currentPage = 1;
        this.limit = 10;
        this.articleService = litHtmlHelpers_1.getContext(articleservice_1.ArticleService);
        this.eventAggregator = litHtmlHelpers_1.getContext(litHtmlHelpers_1.EventAggregator);
    }
    activate(_x, params) {
        this.username = params.name;
        return this.getArticles();
    }
    async getArticles() {
        const queryParams = {
            limit: this.limit,
            offset: this.limit * (this.currentPage - 1),
            author: this.username,
            favorited: true
        };
        const response = await this.articleService.getList('all', queryParams);
        this.articles.splice(0, this.articles.length);
        this.articles.push(...response.articles);
        this.totalPages = Array.from(new Array(Math.ceil(response.articlesCount / this.limit)), (_val, index) => index + 1);
        this.eventAggregator.publish('articleChange');
        this.render();
    }
    render() {
        return lit_html_1.html `
                <article-list
                    .articles=${this.articles}
                    .totalPages=${this.totalPages}
                    .pageNumber=${this.pageNumber || 1}
                    .currentPage=${this.currentPage}
                    set-page-cb.trigger="setPageTo(pageNumber)"
                ></article-list>
            `;
    }
});
//# sourceMappingURL=profile-favorites-route.js.map
});
___scope___.file("src/components/app-main.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const lit_html_1 = require("lit-html");
require("./footer-section");
require("./header-section");
const litHtmlHelpers_1 = require("../litHtmlHelpers");
litHtmlHelpers_1.registerCustomElement('app-main', class extends HTMLElement {
    render() {
        return lit_html_1.html `
                <header-section></header-section>
                <free-router name="main"></free-router>
                <footer-section></footer-section>
            `;
    }
});
//# sourceMappingURL=app-main.js.map
});
___scope___.file("src/components/footer-section.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const lit_html_1 = require("lit-html");
const litHtmlHelpers_1 = require("../litHtmlHelpers");
litHtmlHelpers_1.registerCustomElement('footer-section', class extends HTMLElement {
    render() {
        return lit_html_1.html `
                <footer>
                    <div class="container">
                        <a href="/" class="logo-font">conduit</a>

                        <span class="attribution">
                            An interactive learning project from
                            <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
                        </span>
                    </div>
                </footer>
            `;
    }
});
//# sourceMappingURL=footer-section.js.map
});
___scope___.file("src/components/header-section.js", function(exports, require, module){
Object.defineProperty(exports, "__esModule", { value: true });
const lit_html_1 = require("lit-html");
const litHtmlHelpers_1 = require("../litHtmlHelpers");
const sharedstate_1 = require("../resources/state/sharedstate");
litHtmlHelpers_1.registerCustomElement('header-section', class extends HTMLElement {
    connectedCallback() {
        litHtmlHelpers_1.getContext(litHtmlHelpers_1.EventAggregator).subscribe('routeChange', this, this.routechange.bind(this));
    }
    routechange(x) {
        this.activeRoute = x.name;
        this.render();
    }
    render() {
        return lit_html_1.html `
                <nav class="navbar navbar-light">
                    <div class="container">
                        <a class="navbar-brand" href="#home">conduit</a>
                        <ul class="nav navbar-nav pull-xs-right">
                            <li class="${'nav-item' + (this.activeRoute === 'home' ? ' active' : '')}">
                                <a class="nav-link" href="#home">Home</a>
                            </li>

                            ${litHtmlHelpers_1.getContext(sharedstate_1.SharedState).isAuthenticated ?
            lit_html_1.html `
                                    <li class="${'nav-item' + (this.activeRoute === 'create' ? ' active' : '')}">
                                        <a class="nav-link" href="#editor"> <i class="ion-compose"></i>&nbsp;New Post </a>
                                    </li>

                                    <li class="${'nav-item' + (this.activeRoute === 'settings' ? ' active' : '')}">
                                        <a class="nav-link" href="#settings"> <i class="ion-gear-a"></i>&nbsp;Settings </a>
                                    </li>
                                ` : ''}
                            ${!litHtmlHelpers_1.getContext(sharedstate_1.SharedState).isAuthenticated ?
            lit_html_1.html `
                                    <li class="${'nav-item' + (this.activeRoute === 'login' ? ' active' : '')}">
                                        <a class="nav-link" href="#login"><i class="ion-compose"></i>Sign in</a>
                                    </li>

                                    <li class="${'nav-item' + (this.activeRoute === 'register' ? ' active' : '')}">
                                        <a class="nav-link" href="#register"><i class="ion-compose"></i>Sign up</a>
                                    </li>
                                ` : ''}
                            ${litHtmlHelpers_1.getContext(sharedstate_1.SharedState).isAuthenticated ?
            lit_html_1.html `
                                    <li class="${'nav-item' + (this.activeRoute === 'profile' ? ' active' : '')}">
                                        <a class="nav-link" href="${'#profile/' + litHtmlHelpers_1.getContext(sharedstate_1.SharedState).currentUser.username}"
                                            >${litHtmlHelpers_1.getContext(sharedstate_1.SharedState).currentUser.username}</a
                                        >
                                    </li>
                                ` : ''}
                        </ul>
                    </div>
                </nav>
            `;
    }
});
//# sourceMappingURL=header-section.js.map
});
	___scope___.entry = "src/index.js";
})
FuseBox.import("fuse-box-hot-reload").connect({"port":4444})
//# sourceMappingURL=7a500ce6_app.js.map