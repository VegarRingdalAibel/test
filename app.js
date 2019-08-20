$fsx.f[51]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),$fsx.r(1),$fsx.r(2),$fsx.r(47),$fsx.r(50)},$fsx.f[47]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(5),i=$fsx.r(21);s.getRouter().registerRouteChangeHandler((e,t)=>{i.publish("routeChange",{options:e,activeRouter:t})}),s.addRouterConfig("main",[{path:"",load:()=>Promise.resolve().then(()=>$fsx.r(33)),componentName:"home-comp",name:"HomeBlank",isNav:!1},{path:"home",componentName:"home-comp",load:()=>Promise.resolve().then(()=>$fsx.r(33)),name:"Home"},{path:"home/type/feed",componentName:"home-comp",load:()=>Promise.resolve().then(()=>$fsx.r(33)),name:"HomeFeed"},{path:"home/type/all",componentName:"home-comp",load:()=>Promise.resolve().then(()=>$fsx.r(33)),name:"HomeAll"},{path:"home/:tag",componentName:"home-comp",load:()=>Promise.resolve().then(()=>$fsx.r(33)),name:"HomeTag"},{path:"profile/:name",componentName:"profile-comp",load:()=>Promise.resolve().then(()=>$fsx.r(37)),name:"Profile",children:!0},{path:"login",componentName:"auth-comp",load:()=>Promise.resolve().then(()=>$fsx.r(39)),name:"Login"},{path:"register",componentName:"Auth-comp",load:()=>Promise.resolve().then(()=>$fsx.r(39)),name:"Register"},{path:"settings",componentName:"Settings-comp",load:()=>Promise.resolve().then(()=>$fsx.r(40)),name:"Settings"},{path:"editor",componentName:"Editor-comp",load:()=>Promise.resolve().then(()=>$fsx.r(41)),name:"Editor"},{path:"editor/:slug",componentName:"Editor-comp",load:()=>Promise.resolve().then(()=>$fsx.r(41)),name:"EditorSlug"},{path:"article/:slug",componentName:"Article-comp",load:()=>Promise.resolve().then(()=>$fsx.r(44)),name:"Article"}]),s.addRouterConfig("subProfile",[{path:"profile/:name",componentName:"profile-article-route",load:()=>Promise.resolve().then(()=>$fsx.r(45)),name:"MyPosts"},{path:"profile/:name/favorites",componentName:"profile-favorites-route",load:()=>Promise.resolve().then(()=>$fsx.r(46)),name:"Favorites"}])},$fsx.f[5]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(4),i=$fsx.r(3);var r=$fsx.r(3);t.enableLogger=r.enableLogger,t.disableLogger=r.disableLogger;var a=$fsx.r(4);t.getRouter=a.getRouter,t.href=a.href,t.authRouteHandler=a.authRouteHandler,t.unknowRouteHandler=a.unknowRouteHandler,t.addRouterConfig=a.addRouterConfig,t.goto=a.goto,t.navs=a.navs,t.removeRouterConfig=a.removeRouterConfig;class o extends HTMLElement{constructor(){super(),this.router=s.getRouter()}connectedCallback(){i.logger("FreeRouter-connectedcallback",this.getAttribute("name")),this.router.activateRouterElement(this.getAttribute("name"))}disconnectedcallback(){i.logger("FreeRouter-disconnectedcallback",this.getAttribute("name")),this.router.deactivateRouterElement(this.getAttribute("name"))}}t.FreeRouter=o,customElements.get("free-router")||customElements.define("free-router",o)},$fsx.f[4]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(3);class i{constructor(){this.active=[],this.routers=[],this.routersConfig=[],this.usehash=!0,this.hashChange=this.hashChange.bind(this),window.addEventListener("hashchange",this.hashChange)}activateRouterElement(e){this.active.push(e),this.loadingHandlerCallback&&this.loadingHandlerCallback(location.hash,this.active[this.active.length-1]),this.dowork().then(()=>{!1===this.foundRoute&&this.routeNotFound(),this.routeChangeHandlerCallback&&this.routeChangeHandlerCallback(this.activeRoute,this.active[this.active.length-1])})}deactivateRouterElement(e){let t=this.active.indexOf(e);-1!==t&&this.active.splice(t,1)}goto(e,t={}){const s=e.split("/").filter(e=>!!e);let i="";s.forEach((e,r)=>{":"===e[0]&&void 0!==t[e.substr(1,e.length)]?i+=t[e.substr(1,e.length)]:i+=`${e}`,s.length-1!==r&&(i+="/")}),location.hash=i}getNavLinks(e,t){let s=[];return this.routersConfig[this.routers.indexOf(t?this.active[this.active.length-1]:e)].forEach(e=>{s.push({name:e.name,isNav:!1!==e.isNav,href:(this.usehash?"#":"")+e.path,data:e.data,componentName:e.componentName,isAuth:e.isAuth})}),s}getNavLink(e,t,s){let i={};return this.routersConfig[this.routers.indexOf(s?this.active[this.active.length-1]:t)].forEach(t=>{t.name===e&&(i={name:t.name,isNav:!1!==t.isNav,href:(this.usehash?"#":"")+t.path,data:t.data,componentName:t.componentName,isAuth:t.isAuth})}),i}async hashChange(){if(this.lastpop=null,s.logger("router-hashChange","start",this.active[this.active.length-1]),this.loadingHandlerCallback&&this.loadingHandlerCallback(location.hash,this.active[this.active.length-1]),this.backEventtriggered)this.backEventtriggered=!1;else{if(await this.dowork(),!1===this.foundRoute){if(this.active.length>1){let e=this.active.pop();e!==this.lastpop&&(this.lastpop=e,await this.dowork())}1!==this.active.length||this.foundRoute||this.routeNotFound()}this.routeChangeHandlerCallback&&this.routeChangeHandlerCallback(this.activeRoute,this.active[this.active.length-1])}}async dowork(){this.foundRoute=null;let e=location.hash?location.hash.substring(1,location.hash.length):"",t=document.getElementsByTagName("free-router"),i=!0;for(let e=0;t.length>e;e++)if(t[e].getAttribute("name")===this.active[this.active.length-1]){let s=t[e].children[0];s&&s.canDeactivate&&!0!==(i=await s.canDeactivate())&&(this.backEventtriggered=!0,history.back())}if(!0===i){this.foundRoute=!1,s.logger("router-hashChange","routeSearch",this.active[this.active.length-1]);for(let i=0;t.length>i;i++)if(!this.foundRoute&&t[i].getAttribute("name")===this.active[this.active.length-1]){let r=this.routersConfig[this.routers.indexOf(this.active[this.active.length-1])];if(r)for(let a=0;a<r.length;a++){const o=r[a];let n=!1;if(""===e||""===o.path)n=e===o.path;else{new RegExp(s.createRouteRegex(s.parsePattern(o.path),o.children)).test(e)&&(n=!0)}if(n&&o.isAuth&&(this.routeAuth(this.getNavLink(o.name,this.active[this.active.length-1]))||(this.foundRoute=!0,n=!1,a=r.length)),n){a=r.length;const n=this.activeRoute&&this.activeRoute.componentName===o.componentName;let l;n&&s.logger("router-hashChange","verified, but reuse activated",this.active[this.active.length-1],e,o.name),this.activeRoute={name:o.name,href:o.path,isNav:!!o.isNav,data:Object.assign({},o.data),componentName:o.componentName},s.logger("router-hashChange","verified",this.active[this.active.length-1],e,o.name),this.foundRoute=!0,o.load&&!n&&await o.load(),!n&&t[i].children.length&&(s.logger("router-hashChange","removing child",this.active[this.active.length-1],e),t[i].removeChild(t[i].children[0])),n||(l=document.createElement(o.componentName.toUpperCase()),s.logger("router-hashChange","chreate element",this.active[this.active.length-1],e)),this.haltedActivate&&(this.haltedActivate=null);let c=n?t[i].children[0]:l;if(c.activate){let r=this.active[this.active.length-1];this.haltedActivate=o.path,await c.activate(o.path,s.getVariables(s.parsePattern(o.path),e),this.activeRoute),n?(s.logger("router-hashChange","reUse activated"),c.connectedCallback&&c.connectedCallback()):this.haltedActivate===o.path?(s.logger("router-hashChange","append child",this.active[this.active.length-1],e),t[i].appendChild(l)):(l.disconnectedCallback&&l.disconnectedCallback(),s.logger("router-hashChange","skipping append child",r,e))}else n?s.logger("router-hashChange","reUse activated"):(s.logger("router-hashChange","append child",this.active[this.active.length-1],e),t[i].appendChild(l))}else s.logger("router-hashChange","not-verified",this.active[this.active.length-1],e,o.name)}}}}routeNotFound(){this.routeNotFoundCallback?this.routeNotFoundCallback(location.hash):console.log("route not found",location.hash)}registerUnknowRouteHandler(e){this.routeNotFoundCallback=e}routeAuth(e){return this.routeAuthCallback?this.routeAuthCallback(e):(console.log("no auth function registered",location.hash),!0)}href(e,t,s){let i="unknown";if(this.routersConfig.forEach(t=>{t.forEach(t=>{t.name===e&&(i=t.path)})}),t){const e=i.split("/").filter(e=>!!e);let s="";e.forEach((i,r)=>{":"===i[0]&&void 0!==t[i.substr(1,i.length)]?s+=t[i.substr(1,i.length)]:s+=`${i}`,e.length-1!==r&&(s+="/")}),i=s}return s?i:(this.usehash?"#":"")+i}registerAuthRouteHandler(e){this.routeAuthCallback=e}registerLoadingHandler(e){this.loadingHandlerCallback=e}registerRouteChangeHandler(e){this.routeChangeHandlerCallback=e}addRouterConfig(e,t){if(-1!==this.routers.indexOf(e))console.error("can not have 2 routers with same name");else{let s=[];t.forEach(t=>{this.href(t.name)!==(this.usehash?"#":"")+"unknown"&&console.error("you should need to have unique names for routes, please fix:",e,t.name),-1!==s.indexOf(t.name)&&console.error("you have same name on some of routes in new config, please fix:",t.name),s.push(t.name)}),this.routers.push(e),this.routersConfig.push(t)}}removeRouterConfig(e){let t=this.routers.indexOf(e);-1!==t&&(this.routers.splice(t,1),this.routersConfig.splice(t,1))}}t.RouterInternal=i;const r=new i;t.getRouter=function(){return r},t.href=function(e,t,s){return r.href(e,t,s)},t.navs=function(e){return r.getNavLinks(e)},t.addRouterConfig=function(e,t){return r.addRouterConfig(e,t)},t.removeRouterConfig=function(e){return r.removeRouterConfig(e)},t.unknowRouteHandler=function(e){return r.registerUnknowRouteHandler(e)},t.authRouteHandler=function(e){return r.registerAuthRouteHandler(e)},t.goto=function(e,t={}){return r.goto(e,t)}},$fsx.f[3]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=e=>!(!e||"string"!=typeof e||":"!==e[0])&&(e.split(":").length>2&&console.error(`route argument contains illigal string: ${e}, please fix`),!0),i=e=>e.substring(1,e.length);t.parsePattern=e=>{const t=e.split("/"),r=[];return t.forEach((a,o)=>{o===t.length-1&&""===a&&"\\/"===e[e.length-1]||r.push({staticType:!s(a),variable:s(a)?i(a):null,regex:s(a)?"[a-zA-Z0-9\\_\\-\\:]+":a})}),r},t.createRouteRegex=(e,t)=>{let s="";return e.forEach((i,r)=>{e.length>1&&0===r||1===e.length?s="^"+i.regex:"\\/"===i.regex?s+=i.regex:s=s+"\\/"+i.regex,t||e.length-1!==r||(s+="($|/$)")}),s},t.getVariables=(e,t)=>{const s=t.split("/"),i={};return s.forEach((t,s)=>{e[s]&&e[s].variable&&(i[e[s].variable]=t),s>e.length-1&&(i._paths||(i._paths=[]),i._paths.push(t))}),i};let r=!1;t.logger=(...e)=>{r&&console.log("Logger ---",e)},t.enableLogger=()=>{r=!0},t.disableLogger=()=>{r=!1}},$fsx.f[21]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),$fsx.r(1);var s=$fsx.r(17);t.attribute=s.attribute,t.property=s.property,t.customElement=s.customElement;var i=$fsx.r(18);t.instance=i.instance;var r=$fsx.r(19);t.FetchClient=r.FetchClient;var a=$fsx.r(20);t.publish=a.publish,t.subscribe=a.subscribe,t.unSubscribe=a.unSubscribe},$fsx.f[17]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(16);function i(e){e.isConnected&&(e.__wait||(e.__wait=!0,requestAnimationFrame(()=>{e.render(),e.__wait=!1})))}t.property=function(){return function(e,t){Object.defineProperty(e,t,{get:function(){return this["_"+t]},set:function(e){const s=this["_"+t];this["_"+t]=e,this.valuesChanged&&s!==e&&this.valuesChanged("property",t,s,e),s!==e&&i(this)}})}},t.attribute=function(){return function(e,t){Object.defineProperty(e,t,{get:function(){return this["_"+t]},set:function(e){const s=this["_"+t];this["_"+t]=e,this.valuesChanged&&s!==e&&this.valuesChanged("property",t,s,e),s!==e&&i(this)}});const s=t.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/\s+/g,"-").toLowerCase();e._observedAttributesMap||(e._observedAttributesMap=new Map),e._observedAttributesMap.set(s,t),e._observedAttributes?e._observedAttributes.push(s):(e._observedAttributes=[],e._observedAttributes.push(s))}},t.customElement=function(e,t){return function(r){if(!customElements.get(e)){const a=r.prototype.render,o=r.prototype.connectedCallback,n=r.prototype.disconnectedCallback,l=r.prototype.attributeChangedCallback,c=r.prototype.valuesChanged,h=r.prototype.updated;Object.defineProperty(r,"observedAttributes",{get:function(){return r.prototype._observedAttributes}}),r.prototype.render=function(...e){s.render(a.call(this,...e),this,{eventContext:this}),h&&setTimeout(()=>{h()})},r.prototype.connectedCallback=function(){o&&o.call(this),i(this)},r.prototype.disconnectedCallback=function(){n&&n.call(this)},r.prototype.attributeChangedCallback=function(e,t,s){this[this._observedAttributesMap.get(e)]=s||"",l&&l.call(this,e,t,s),c&&c("attribute",e,t,s),i(this)},t?customElements.define(e,r,t):customElements.define(e,r)}}}},$fsx.f[18]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=new Map;t.instance=e=>{if(s.has(e))return s.get(e);{const t=new e;return s.set(e,t),t}}},$fsx.f[19]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.FetchClient=class{constructor(e={}){this.config=e,this.setConfig(e)}setConfig(e){e.defaultUrl&&(this.config.defaultUrl=e.defaultUrl),e.cache&&(this.config.cache=e.cache),e.credentials&&(this.config.credentials=e.credentials),e.headers&&(this.config.headers=e.headers),e.method&&(this.config.method=e.method),e.mode&&(this.config.mode=e.mode),e.redirect&&(this.config.redirect=e.redirect),e.referrer&&(this.config.referrer=e.referrer)}getConfig(){return this.config}fetch(e,t){const s=this.config.defaultUrl?this.config.defaultUrl+e:e,i={body:t.body?t.body:void 0,cache:t.cache||this.config.cache,credentials:t.credentials||this.config.credentials,headers:t.headers||this.config.headers,method:t.method||this.config.method,mode:t.mode||this.config.mode,redirect:t.redirect||this.config.redirect,referrer:t.referrer||this.config.referrer};return fetch(s,i)}}},$fsx.f[20]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(18);class i{constructor(){this.channels={}}publish(e,...t){Promise.resolve().then(()=>{if(Array.isArray(this.channels[e]))for(let s=0,i=this.channels[e].length;s<i;s++)this.channels[e][s].func.apply(this,t)})}unSubscribe(e,t){if(Array.isArray(this.channels[e]))for(let s=0,i=this.channels[e].length;s<i;s++)this.channels[e][s].ctx===t&&this.channels[e].splice(s,1)}subscribe(e,t,s){Array.isArray(this.channels[e])||(this.channels[e]=[]),this.channels[e].push({ctx:t,func:s})}}t.publish=function(e,...t){s.instance(i).publish(e,...t)},t.unSubscribe=function(e,t){s.instance(i).unSubscribe(e,t)},t.subscribe=function(e,t,r){s.instance(i).subscribe(e,t,r)}},$fsx.f[33]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(1),i=$fsx.r(16),r=$fsx.r(5),a=$fsx.r(21),o=$fsx.r(23),n=$fsx.r(29),l=$fsx.r(30);$fsx.r(32);let c=class extends HTMLElement{constructor(){super(...arguments),this.articles=[],this.shownList="all",this.tags=[],this.filterTag=void 0,this.currentPage=1,this.limit=10}connectedCallback(){this.sharedState=a.instance(o.SharedState),this.tagService=a.instance(n.TagService),this.articleService=a.instance(l.ArticleService),this.getArticles(),this.getTags()}async getArticles(){const e={limit:this.limit,offset:this.limit*(this.currentPage-1)};void 0!==this.filterTag&&(e.tag=this.filterTag);const t=await this.articleService.getList(this.shownList,e);this.articles.splice(0,this.tags.length),this.articles.push(...t.articles),this.totalPages=Array.from(new Array(Math.ceil(t.articlesCount/this.limit)),(e,t)=>t+1),this.render()}async getTags(){const e=await this.tagService.getList();this.tags.splice(0,this.tags.length),this.tags.push(...e),this.render()}activate(e,t){t.tag?this.setListTo("all",t.tag):"home/type/feed"===e?this.setListTo("feed"):this.setListTo("all")}setListTo(e,t){t!==this.filterTag&&(this.currentPage=1),this.shownList=e,this.filterTag=t}render(){return i.html`
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
                                    <!-- if statement -->
                                    ${this.sharedState.isAuthenticated?i.html`
                                              <li class="nav-item">
                                                  <a
                                                      class=" nav-link ${this.sharedState.isAuthenticated?"":"disabled"} 
                                                ${"feed"===this.shownList?" active":""}"
                                                      href=${r.href("HomeFeed")}
                                                      >Your Feed</a
                                                  >
                                              </li>
                                          `:""}

                                    <li class="nav-item">
                                        <a
                                            class="nav-link ${this.filterTag||"all"!==this.shownList?"":"active"}"
                                            href=${r.href("HomeAll")}
                                            >Global Feed</a
                                        >
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link ${this.filterTag?"active":""}"
                                            >${this.filterTag?"#"+this.filterTag:""}</a
                                        >
                                    </li>
                                </ul>
                            </div>

                            <article-list
                                .articles=${this.articles}
                                .totalPages=${this.totalPages}
                                .currentPage=${this.currentPage}
                                .setPageCb=${e=>{this.currentPage=e,this.getArticles()}}
                            >
                            </article-list>
                        </div>

                        <div class="col-md-3">
                            <div class="sidebar">
                                <p>Popular Tags</p>

                                <div class="tag-list">
                                    <!-- repeat -->
                                    ${this.tags.map(e=>i.html`
                                            <a
                                                class="tag-pill tag-default"
                                                href=${r.href("HomeTag",{tag:e})}
                                                >${e}</a
                                            >
                                        `)}
                                    <!-- if statement -->
                                    ${0===this.tags.length?i.html`
                                              <div>No tags are here... yet.</div>
                                          `:""}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `}};c=s.__decorate([a.customElement("home-comp")],c),t.default=c},$fsx.f[23]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(22);t.SharedState=class{constructor(){this.setState()}resetState(){this.currentUser=new s.User,this.isAuthenticated=!1}setState(){if(window.localStorage.jwtToken){const e=window.localStorage[window.localStorage.jwtToken+"currentUser"];e?(this.currentUser=new s.User(JSON.parse(e)),this.isAuthenticated=!0):(this.currentUser=new s.User,this.isAuthenticated=!1)}}saveState(e){e&&(window.localStorage[window.localStorage.jwtToken+"currentUser"]=JSON.stringify(e))}}},$fsx.f[22]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.User=class{constructor(e){this.email=e?e.email:"",this.token=e?e.token:"",this.username=e?e.username:"",this.bio=e?e.bio:"",this.image=e?e.image:""}}},$fsx.f[29]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(28),i=$fsx.r(21);t.TagService=class{constructor(){this.apiService=i.instance(s.ApiService)}async getList(){return(await this.apiService.get("/tags")).tags}}},$fsx.f[28]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(24),i=$fsx.r(25),r=$fsx.r(26),a=$fsx.r(21),o=$fsx.r(27);t.ApiService=class{constructor(){this.jwtService=a.instance(i.JwtService),this.http=new a.FetchClient}setHeaders(){const e={"Content-Type":"application/json",Accept:"application/json"};return this.jwtService.getToken()&&(e.Authorization=`Token ${this.jwtService.getToken()}`),new Headers(e)}async get(e,t){const i={method:"GET",headers:this.setHeaders()};try{const a=await this.http.fetch(`${s.config.api_url}${e}?${o.urlqueryStringify(t)}`,i);return r.status(a)}catch(e){return r.parseError(e)}}async put(e,t={}){const i={method:"PUT",headers:this.setHeaders(),body:JSON.stringify(t)};try{const t=await this.http.fetch(`${s.config.api_url}${e}`,i);return r.status(t)}catch(e){return await r.parseError(e)}}async post(e,t={}){const i={method:"POST",headers:this.setHeaders(),body:JSON.stringify(t)};try{const t=await this.http.fetch(`${s.config.api_url}${e}`,i);return r.status(t)}catch(e){return await r.parseError(e)}}async delete(e){const t={method:"DELETE",headers:this.setHeaders()};try{const i=await this.http.fetch(`${s.config.api_url}${e}`,t);return r.status(i)}catch(e){return await r.parseError(e)}}}},$fsx.f[24]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.config={api_url:"https://conduit.productionready.io/api"}},$fsx.f[25]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.JwtService=class{getToken(){return window.localStorage.jwtToken}saveToken(e){window.localStorage.jwtToken=e}destroyToken(){window.localStorage.removeItem("jwtToken")}}},$fsx.f[26]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.status=function(e){if(e.status>=200&&e.status<400)return e.json();throw e},t.parseError=function(e){return e instanceof Error?Promise.resolve(null):new Promise((t,s)=>s(e.json()))}},$fsx.f[27]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=Object.prototype.hasOwnProperty;function i(e){return decodeURIComponent(e.replace(/\+/g," "))}t.urlQueryParse=function(e){const t=/([^=?&]+)=?([^&]*)/g,s={};let r;for(;r=t.exec(e);s[i(r[1])]=i(r[2]));return s},t.urlqueryStringify=function(e,t){const i=[];"string"!=typeof(t=t||"")&&(t="?");for(const t in e)s.call(e,t)&&i.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));return i.length?t+i.join("&"):""}},$fsx.f[30]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(28),i=$fsx.r(21);t.ArticleService=class{constructor(){this.apiService=i.instance(s.ApiService)}async getList(e,t){return await this.apiService.get("/articles"+("feed"===e?"/feed":""),t)}async get(e){return(await this.apiService.get("/articles/"+e)).article}async destroy(e){return await this.apiService.delete("/articles/"+e)}async save(e){if(e.slug){return(await this.apiService.put("/articles/"+e.slug,{article:e})).article}return(await this.apiService.post("/articles/",{article:e})).article}async favorite(e){return await this.apiService.post("/articles/"+e+"/favorite")}async unfavorite(e){return await this.apiService.delete("/articles/"+e+"/favorite")}}},$fsx.f[32]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(1),i=$fsx.r(16),r=$fsx.r(21);$fsx.r(31);let a=class extends HTMLElement{constructor(){super(...arguments),this.articles=[],this.totalPages=[]}valuesChanged(e,t,s,i){"currentPage"===t&&s&&s!==i&&this.setPageCb(i)}render(){return i.html`
            ${0===this.articles.length?i.html`
                      <div class="article-preview">
                          No articles are here... yet.
                      </div>
                  `:""}
            ${this.articles.map(e=>i.html`
                    <article-preview .article=${e}></article-preview>
                `)}
            ${this.totalPages&&this.totalPages.length?i.html`
                      <nav>
                          <ul class="pagination">
                              ${this.totalPages.map(e=>i.html`
                                          <li
                                              class="page-item ${e===this.currentPage?"active":""}"
                                              @click=${()=>{this.currentPage=e}}"
                                          >
                                              <a class="page-link">${e}</a>
                                          </li>
                                      `)}
                          </ul>
                      </nav>
                  `:""}
        `}};s.__decorate([r.property()],a.prototype,"articles",void 0),s.__decorate([r.property()],a.prototype,"totalPages",void 0),s.__decorate([r.property()],a.prototype,"currentPage",void 0),s.__decorate([r.property()],a.prototype,"totalPsetPageCbages",void 0),a=s.__decorate([r.customElement("article-list")],a),t.default=a},$fsx.f[31]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(1),i=$fsx.r(16),r=$fsx.r(21),a=$fsx.r(30),o=$fsx.r(23),n=$fsx.r(5);let l=class extends HTMLElement{constructor(){super(),this.articleService=r.instance(a.ArticleService),this.sharedState=r.instance(o.SharedState)}async onToggleFavorited(){this.sharedState.isAuthenticated?(this.article.favorited=!this.article.favorited,this.article.favorited?(this.article.favoritesCount++,await this.articleService.favorite(this.article.slug)):(this.article.favoritesCount--,await this.articleService.unfavorite(this.article.slug)),this.render()):location.hash="login"}render(){return i.html`
            <div class="article-preview">
                <div class="article-meta">
                    <a href=${n.href("Profile",{name:this.article.author.username})}>
                        <img alt="profile-picture" src=${this.article.author.image?this.article.author.image:""} />
                    </a>

                    <div class="info">
                        <a href=${n.href("Profile",{name:this.article.author.username})} class="author">
                            ${this.article.author.username}</a
                        >
                        <span class="date">${e=this.article.createdAt,new Date(e).toLocaleDateString("en",{month:"long",day:"2-digit",year:"numeric"})}</span>
                    </div>

                    <button
                        class="btn btn-sm pull-xs-right ${this.article.favorited?"btn-primary":"btn-outline-primary"}"
                        @click=${this.onToggleFavorited}
                    >
                        <i class="ion-heart"></i> ${this.article.favoritesCount}
                    </button>
                </div>

                <a href=${n.href("Article",{slug:this.article.slug})} class="preview-link">
                    <h1>${this.article.title}</h1>
                    <p>${this.article.description}</p>
                    <span>Read more...</span>

                    <ul class="tag-list">
                        ${this.article.tagList.map(e=>i.html`
                                <li class="tag-default tag-pill tag-outline">${e}</li>
                            `)}
                    </ul>
                </a>
            </div>
        `;var e}};s.__decorate([r.property()],l.prototype,"article",void 0),l=s.__decorate([r.customElement("article-preview")],l),t.default=l},$fsx.f[34]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(28),i=$fsx.r(21);t.ProfileService=class{constructor(){this.apiService=i.instance(s.ApiService)}async get(e){return(await this.apiService.get("/profiles/"+e)).profile}async follow(e){return await this.apiService.post("/profiles/"+e+"/follow")}async unfollow(e){return await this.apiService.delete("/profiles/"+e+"/follow")}}},$fsx.f[39]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(1),i=$fsx.r(16),r=$fsx.r(21),a=$fsx.r(38),o=$fsx.r(23),n=$fsx.r(5);let l=class extends HTMLElement{constructor(){super(),this.type="",this.username="",this.passwordConfirm="",this.email="",this.emailConfirm="",this.password="",this.errors=[],this.userService=r.instance(a.UserService),this.sharedState=r.instance(o.SharedState)}async activate(e,t,s){this.type=s.name}get canSave(){return"Login"===this.type?""!==this.email&&""!==this.password:""!==this.username&&""!==this.email&&""!==this.password&&this.password===this.passwordConfirm&&this.email===this.emailConfirm}async submitForm(){this.errors=[];const e={username:this.username,email:this.email,password:this.password};try{await this.userService.attemptAuth(this.type,e),location.hash="home"}catch(e){const t=await Promise.resolve(e);for(const e in t.errors)t.errors&&t.errors[e]&&this.errors.push(t.errors[e].map(t=>e+": "+t));this.render()}}render(){return i.html`
            <div class="auth-page">
                <div class="container page">
                    <div class="row">
                        <div class="col-md-6 offset-md-3 col-xs-12">
                            <h1 class="text-xs-center">Sign ${"login"===this.type?"in":"up"}</h1>
                            <p class="text-xs-center">
                                ${"Register"===this.type?i.html`
                                          <a href=${n.href("Login")}>Have an account?</a>
                                      `:i.html`
                                          <a href=${n.href("Register")}>Need an account?</a>
                                      `}
                            </p>

                            <ul class="error-messages">
                                ${this.errors.map(e=>i.html`
                                        <li>
                                            ${e}
                                        </li>
                                    `)}
                            </ul>

                            <form>
                                <!-- if statement -->
                                ${"Register"===this.type?i.html`
                                          <fieldset class="form-group">
                                              <input
                                                  class="form-control form-control-lg"
                                                  type="text"
                                                  autocomplete="username"
                                                  placeholder="Your Name"
                                                  @input=${e=>{this.username=e.target.value,this.render()}}
                                              />
                                          </fieldset>
                                      `:""}

                                <fieldset class="form-group">
                                    <input
                                        class="form-control form-control-lg"
                                        type="text"
                                        autocomplete="email"
                                        placeholder="Email"
                                        @input=${e=>{this.email=e.target.value,this.render()}}
                                    />
                                </fieldset>

                                <!-- if statement -->
                                ${"Register"===this.type?i.html`
                                          <fieldset class="form-group">
                                              <input
                                                  class="form-control form-control-lg"
                                                  type="text"
                                                  autocomplete="new-email"
                                                  placeholder="Confirm Email"
                                                  @input=${e=>{this.emailConfirm=e.target.value,this.render()}}
                                              />
                                          </fieldset>
                                      `:""}

                                <fieldset class="form-group">
                                    <input
                                        class="form-control form-control-lg"
                                        type="password"
                                        autocomplete="current-password"
                                        placeholder="Password"
                                        @input=${e=>{this.password=e.target.value,this.render()}}
                                    />
                                </fieldset>

                                <!-- if statement -->
                                ${"Register"===this.type?i.html`
                                          <fieldset class="form-group">
                                              <input
                                                  class="form-control form-control-lg"
                                                  type="password"
                                                  autocomplete="new-password"
                                                  placeholder="Confirm Password"
                                                  @input=${e=>{this.passwordConfirm=e.target.value,this.render()}}
                                              />
                                          </fieldset>
                                      `:""}

                                <!-- PS! do not use button in forms, need to improve override default -->
                                <input
                                    type="button"
                                    class="btn btn-lg btn-primary pull-xs-right"
                                    @click=${this.submitForm}
                                    .disabled=${!this.canSave}
                                    .value="Sign ${"Login"===this.type?"in":"up"}"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `}};l=s.__decorate([r.customElement("auth-comp")],l),t.default=l},$fsx.f[38]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(28),i=$fsx.r(25),r=$fsx.r(23),a=$fsx.r(21);t.UserService=class{constructor(){this.jwtService=a.instance(i.JwtService),this.sharedState=a.instance(r.SharedState),this.apiService=a.instance(s.ApiService)}async populate(){if(this.jwtService.getToken()){const e=await this.apiService.get("/user");this.setAuth(e.user)}else this.purgeAuth()}setAuth(e){this.jwtService.saveToken(e.token),this.sharedState.saveState(e),this.sharedState.setState()}purgeAuth(){this.jwtService.destroyToken(),this.sharedState.resetState()}async attemptAuth(e,t){const s="Login"===e?"/login":"",i=await this.apiService.post("/users"+s,{user:t});return this.setAuth(i.user),i}async update(e){const t=await this.apiService.put("/user",{user:e});return this.sharedState.currentUser=t.user,this.setAuth(t.user),t.user}}},$fsx.f[41]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(1),i=$fsx.r(16),r=$fsx.r(21),a=$fsx.r(30),o=$fsx.r(5);let n=class extends HTMLElement{constructor(){super(),this.article={title:"",description:"",body:"",tagList:[]},this.articleService=r.instance(a.ArticleService)}async activate(e,t,s){return this.routeConfig=s,this.slug=t.slug,this.slug?this.article=await this.articleService.get(this.slug):(this.article={title:"",description:"",body:"",tagList:[]},null)}addTag(e){this.article.tagList.push(e),this.render()}removeTag(e){this.article.tagList.splice(this.article.tagList.indexOf(e),1),this.render()}async publishArticle(){const e=await this.articleService.save(this.article);this.slug=e.slug,o.getRouter().goto("article/:slug",{slug:this.slug})}render(){return i.html`
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
                                            @blur=${e=>this.article.title=e.target.value}
                                        />
                                    </fieldset>
                                    <fieldset class="form-group">
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="What's this article about?"
                                            .value=${this.article.description}
                                            @blur=${e=>this.article.description=e.target.value}
                                        />
                                    </fieldset>
                                    <fieldset class="form-group">
                                        <textarea
                                            class="form-control"
                                            rows="8"
                                            placeholder="Write your article (in markdown)"
                                            .value=${this.article.body}
                                            @change=${e=>this.article.body=e.target.value}
                                        ></textarea>
                                    </fieldset>
                                    <fieldset class="form-group">
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Enter tags"
                                            .value=${this.tag||""}
                                            @blur=${e=>this.addTag(e.target.value)}
                                        />

                                        <div class="tag-list">
                                            <!-- repeat statement -->
                                            ${this.article.tagList.map(e=>(console.log(e),i.html`
                                                    <span class="tag-default tag-pill">
                                                        <i
                                                            class="ion-close-round"
                                                            @click=${()=>{this.removeTag(e)}}
                                                        ></i>
                                                        ${e}</span
                                                    >
                                                `))}
                                        </div>
                                    </fieldset>

                                    <input
                                        type="button"
                                        class="btn btn-lg pull-xs-right btn-primary"
                                        type="button"
                                        @click=${this.publishArticle}
                                        value="Publish Article"
                                    />
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `}};n=s.__decorate([r.customElement("editor-comp")],n),t.default=n},$fsx.f[50]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(1),i=$fsx.r(16);$fsx.r(48),$fsx.r(49);const r=$fsx.r(21);let a=class extends HTMLElement{render(){return i.html`
            <header-section></header-section>
            <free-router name="main"></free-router>
            <footer-section></footer-section>
        `}};a=s.__decorate([r.customElement("app-main")],a),t.default=a},$fsx.f[48]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(1),i=$fsx.r(16),r=$fsx.r(21),a=$fsx.r(5);let o=class extends HTMLElement{render(){return i.html`
            <footer>
                <div class="container">
                    <a href=${a.href("Home")} class="logo-font">conduit</a>

                    <span class="attribution">
                        An interactive learning project from
                        <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
                    </span>
                </div>
            </footer>
        `}};o=s.__decorate([r.customElement("footer-section")],o),t.default=o},$fsx.f[49]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(1),i=$fsx.r(16),r=$fsx.r(21),a=$fsx.r(23),o=$fsx.r(5);let n=class extends HTMLElement{connectedCallback(){r.subscribe("routeChange",this,this.updateHeaders.bind(this))}updateHeaders(e){this.activeRoute=e.name,this.render()}render(){return i.html`
            <nav class="navbar navbar-light">
                <div class="container">
                    <a class="navbar-brand" href=${o.href("Home")}>conduit</a>
                    <ul class="nav navbar-nav pull-xs-right">
                        <li class="${"nav-item"+("home"===this.activeRoute?" active":"")}">
                            <a class="nav-link" href=${o.href("Home")}>Home</a>
                        </li>

                        ${r.instance(a.SharedState).isAuthenticated?i.html`
                                  <li class="${"nav-item"+("create"===this.activeRoute?" active":"")}">
                                      <a class="nav-link" href=${o.href("Editor")}> <i class="ion-compose"></i>&nbsp;New Post </a>
                                  </li>

                                  <li class="${"nav-item"+("settings"===this.activeRoute?" active":"")}">
                                      <a class="nav-link" href=${o.href("Settings")}> <i class="ion-gear-a"></i>&nbsp;Settings </a>
                                  </li>
                              `:""}
                        ${r.instance(a.SharedState).isAuthenticated?"":i.html`
                                  <li class="${"nav-item"+("login"===this.activeRoute?" active":"")}">
                                      <a class="nav-link" href=${o.href("Login")}><i class="ion-compose"></i>Sign in</a>
                                  </li>

                                  <li class="${"nav-item"+("register"===this.activeRoute?" active":"")}">
                                      <a class="nav-link" href=${o.href("Register")}><i class="ion-compose"></i>Sign up</a>
                                  </li>
                              `}
                        ${r.instance(a.SharedState).isAuthenticated?i.html`
                                  <li class="${"nav-item"+("profile"===this.activeRoute?" active":"")}">
                                      <a class="nav-link" href=${o.href("Profile",{name:r.instance(a.SharedState).currentUser.username})}
                                          >${r.instance(a.SharedState).currentUser.username}</a
                                      >
                                  </li>
                              `:""}
                    </ul>
                </div>
            </nav>
        `}};n=s.__decorate([r.customElement("header-section")],n),t.default=n},$fsx.r(51);
//# sourceMappingURL=app.js.map