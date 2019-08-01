$fsx.f[42]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),$fsx.r(1),$fsx.r(38),$fsx.r(41)},$fsx.f[38]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(4),i=$fsx.r(16);s.getRouter().registerRouteChangeHandler((e,t)=>{i.getContext(i.EventAggregator).publish("routeChange",{options:e,activeRouter:t})}),s.getRouter().addRouterConfig("main",[{path:"",load:()=>Promise.resolve().then(()=>$fsx.r(28)),componentName:"home-comp",name:"Home",isNav:!1},{path:"home",componentName:"home-comp",load:()=>Promise.resolve().then(()=>$fsx.r(28)),name:"Home"},{path:"profile/:name",componentName:"profile-comp",load:()=>Promise.resolve().then(()=>$fsx.r(30)),name:"Profile",children:!0},{path:"login",componentName:"auth-comp",load:()=>Promise.resolve().then(()=>$fsx.r(32)),name:"Login"},{path:"register",componentName:"Auth-comp",load:()=>Promise.resolve().then(()=>$fsx.r(32)),name:"Register"},{path:"settings",componentName:"Settings-comp",load:()=>Promise.resolve().then(()=>$fsx.r(33)),name:"Settings"},{path:"editor",componentName:"Editor-comp",load:()=>Promise.resolve().then(()=>$fsx.r(34)),name:"Editor"},{path:"editor/:slug",componentName:"Editor-comp",load:()=>Promise.resolve().then(()=>$fsx.r(34)),name:"Editor"},{path:"article/:slug",componentName:"Article-comp",load:()=>Promise.resolve().then(()=>$fsx.r(35)),name:"Erticle"}]),s.getRouter().addRouterConfig("subProfile",[{path:"profile/:name",componentName:"profile-article-route",load:()=>Promise.resolve().then(()=>$fsx.r(36)),name:"MyPosts"},{path:"profile/:name/favorites",componentName:"profile-favorites-route",load:()=>Promise.resolve().then(()=>$fsx.r(37)),name:"Favorites"}])},$fsx.f[16]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(15);t.registerCustomElement=(e,t)=>{if(customElements.get(e))console.log("element already registered");else{const i=t.prototype.render,r=t.prototype.connectedCallback,a=t.prototype.disconnectedCallback,o=t.prototype.updated;t.prototype.render=function(...e){s.render(i.call(this,...e),this,{eventContext:this}),o&&o()},t.prototype.connectedCallback=function(){r&&r.call(this),this.haltUpdate||this.render()},t.prototype.disconnectedCallback=function(){a&&a.call(this)},customElements.define(e,t)}};const i=new Map;t.getContext=e=>{if(i.has(e))return i.get(e);{const t=new e;return i.set(e,t),t}};t.EventAggregator=class{constructor(){this.channels={}}publish(e,...t){if(Array.isArray(this.channels[e]))for(let s=0,i=this.channels[e].length;s<i;s++)this.channels[e][s].func.apply(this,t)}unsubscribe(e,t){if(Array.isArray(this.channels[e]))for(let s=0,i=this.channels[e].length;s<i;s++)this.channels[e][s].ctx===t&&this.channels[e].splice(s,1)}subscribe(e,t,s){Array.isArray(this.channels[e])||(this.channels[e]=[]),this.channels[e].push({ctx:t,func:s})}};t.FetchClient=class{constructor(e={}){this.config=e,this.setConfig(e)}setConfig(e){e.defaultUrl&&(this.config.defaultUrl=e.defaultUrl),e.cache&&(this.config.cache=e.cache),e.credentials&&(this.config.credentials=e.credentials),e.headers&&(this.config.headers=e.headers),e.method&&(this.config.method=e.method),e.mode&&(this.config.mode=e.mode),e.redirect&&(this.config.redirect=e.redirect),e.referrer&&(this.config.referrer=e.referrer)}getConfig(){return this.config}fetch(e,t){const s=this.config.defaultUrl?this.config.defaultUrl+e:e,i={body:t.body?t.body:void 0,cache:t.cache||this.config.cache,credentials:t.credentials||this.config.credentials,headers:t.headers||this.config.headers,method:t.method||this.config.method,mode:t.mode||this.config.mode,redirect:t.redirect||this.config.redirect,referrer:t.referrer||this.config.referrer};return fetch(s,i)}}},$fsx.f[28]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(15),i=$fsx.r(16),r=$fsx.r(18),a=$fsx.r(24),o=$fsx.r(25);$fsx.r(27),i.registerCustomElement("home-comp",class extends HTMLElement{constructor(){super(...arguments),this.articles=[],this.shownList="all",this.tags=[],this.filterTag=void 0,this.currentPage=1,this.limit=10}connectedCallback(){this.sharedState=i.getContext(r.SharedState),this.tagService=i.getContext(a.TagService),this.articleService=i.getContext(o.ArticleService),this.eventAggregator=i.getContext(i.EventAggregator),this.getArticles(),this.getTags()}async getArticles(){const e={limit:this.limit,offset:this.limit*(this.currentPage-1)};void 0!==this.filterTag&&(e.tag=this.filterTag);const t=await this.articleService.getList(this.shownList,e);this.articles.splice(0,this.tags.length),this.articles.push(...t.articles),this.totalPages=Array.from(new Array(Math.ceil(t.articlesCount/this.limit)),(e,t)=>t+1),this.render()}async getTags(){const e=await this.tagService.getList();this.tags.splice(0,this.tags.length),this.tags.push(...e),this.render()}setListTo(e,t){("feed"!==e||this.sharedState.isAuthenticated)&&(t!==this.filterTag&&(this.currentPage=1),this.shownList=e,this.filterTag=t,this.getArticles())}setPageTo(e){this.currentPage=e,this.getArticles()}render(){return s.html`
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
                                                class=" nav-link ${this.sharedState.isAuthenticated?"":"disabled"} 
                                                ${"feed"===this.shownList?" active":""}"
                                                @click=${()=>this.setListTo("feed")}
                                                >Your Feed</a
                                            >
                                        </li>
                                        <li class="nav-item">
                                            <a
                                                class="nav-link ${this.filterTag||"all"!==this.shownList?"":"active"}"
                                                @click=${()=>this.setListTo("all")}
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
                                    set-page-cb.trigger="setPageTo($event.detail)"
                                ></article-list>
                            </div>

                            <div class="col-md-3">
                                <div class="sidebar">
                                    <p>Popular Tags</p>

                                    <div class="tag-list">
                                        ${this.tags.map(e=>s.html`
                                                <a class="tag-pill tag-default" click.delegate="setListTo('all', tag)">${e}</a>
                                            `)}
                                        ${0===this.tags.length?s.html`
                                                <div>No tags are here... yet.</div>
                                            `:""} 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `}})},$fsx.f[18]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(17);t.SharedState=class{constructor(){this.setState()}resetState(){this.currentUser=new s.User,this.isAuthenticated=!1}setState(){if(window.localStorage.jwtToken){const e=window.localStorage[window.localStorage.jwtToken+"currentUser"];e?(this.currentUser=new s.User(JSON.parse(e)),this.isAuthenticated=!0):(this.currentUser=new s.User,this.isAuthenticated=!1)}}saveState(e){e&&(window.localStorage[window.localStorage.jwtToken+"currentUser"]=JSON.stringify(e))}}},$fsx.f[17]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});t.User=class{constructor(e){this.email=e?e.email:"",this.token=e?e.token:"",this.username=e?e.username:"",this.bio=e?e.bio:"",this.image=e?e.image:""}}},$fsx.f[24]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(23),i=$fsx.r(16);t.TagService=class{constructor(){this.apiService=i.getContext(s.ApiService)}async getList(){return(await this.apiService.get("/tags")).tags}}},$fsx.f[23]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(19),i=$fsx.r(20),r=$fsx.r(21),a=$fsx.r(16),o=$fsx.r(22);t.ApiService=class{constructor(){this.jwtService=a.getContext(i.JwtService),this.http=new a.FetchClient}setHeaders(){const e={"Content-Type":"application/json",Accept:"application/json"};return this.jwtService.getToken()&&(e.Authorization=`Token ${this.jwtService.getToken()}`),new Headers(e)}async get(e,t){const i={method:"GET",headers:this.setHeaders()};try{const a=await this.http.fetch(`${s.config.api_url}${e}?${o.urlqueryStringify(t)}`,i);return r.status(a)}catch(e){return r.parseError(e)}}async put(e,t={}){const i={method:"PUT",headers:this.setHeaders(),body:JSON.stringify(t)};try{const t=await this.http.fetch(`${s.config.api_url}${e}`,i);return r.status(t)}catch(e){return await r.parseError(e)}}async post(e,t={}){const i={method:"POST",headers:this.setHeaders(),body:JSON.stringify(t)};try{const t=await this.http.fetch(`${s.config.api_url}${e}`,i);return r.status(t)}catch(e){return await r.parseError(e)}}async delete(e){const t={method:"DELETE",headers:this.setHeaders()};try{const i=await this.http.fetch(`${s.config.api_url}${e}`,t);return r.status(i)}catch(e){return await r.parseError(e)}}}},$fsx.f[19]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.config={api_url:"https://conduit.productionready.io/api"}},$fsx.f[20]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});t.JwtService=class{getToken(){return window.localStorage.jwtToken}saveToken(e){window.localStorage.jwtToken=e}destroyToken(){window.localStorage.removeItem("jwtToken")}}},$fsx.f[21]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.status=function(e){if(e.status>=200&&e.status<400)return e.json();throw e},t.parseError=function(e){return e instanceof Error?Promise.resolve(null):new Promise((t,s)=>s(e.json()))}},$fsx.f[22]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=Object.prototype.hasOwnProperty;function i(e){return decodeURIComponent(e.replace(/\+/g," "))}t.urlQueryParse=function(e){const t=/([^=?&]+)=?([^&]*)/g,s={};let r;for(;r=t.exec(e);s[i(r[1])]=i(r[2]));return s},t.urlqueryStringify=function(e,t){const i=[];"string"!=typeof(t=t||"")&&(t="?");for(const t in e)s.call(e,t)&&i.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));return i.length?t+i.join("&"):""}},$fsx.f[25]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(23),i=$fsx.r(16);t.ArticleService=class{constructor(){this.apiService=i.getContext(s.ApiService)}async getList(e,t){return await this.apiService.get("/articles"+("feed"===e?"/feed":""),t)}async get(e){return(await this.apiService.get("/articles/"+e)).article}async destroy(e){return await this.apiService.delete("/articles/"+e)}async save(e){return e.slug?(await this.apiService.put("/articles/"+e.slug,{article:e})).article:(await this.apiService.post("/articles/",{article:e})).article}async favorite(e){return await this.apiService.post("/articles/"+e+"/favorite")}async unfavorite(e){return await this.apiService.delete("/articles/"+e+"/favorite")}}},$fsx.f[27]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(15),i=$fsx.r(16);$fsx.r(26),i.registerCustomElement("article-list",class extends HTMLElement{constructor(){super(...arguments),this._articles=[],this._totalPages=[]}set articles(e){this._articles=e||[],this.render()}get articles(){return this._articles}set totalPages(e){this._totalPages=e||[],this.render()}get totalPages(){return this._totalPages}render(){return s.html`
                ${0===this.articles.length?s.html`
                          <div class="article-preview">
                              No articles are here... yet.
                          </div>
                      `:""}

                <!--  if we have articles -->
                ${this.articles.map(e=>s.html`
                        <article-preview .article=${e}></article-preview>
                    `)}

                <!--  all the buttons -->
                ${this.totalPages.length?s.html`
                          <nav>
                              <ul class="pagination">
                                  ${this.totalPages.map(e=>s.html`
                                          <li
                                              class="page-item ${e===this.currentPage?"active":""}"
                                              click.delegate="setPageCb($pageNumber)"
                                          >
                                              <a class="page-link">${e}</a>
                                          </li>
                                      `)}
                              </ul>
                          </nav>
                      `:""}
            `}})},$fsx.f[26]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(15),i=$fsx.r(16),r=$fsx.r(25),a=$fsx.r(18),o=$fsx.r(4);i.registerCustomElement("article-preview",class extends HTMLElement{constructor(){super(),this.articleService=i.getContext(r.ArticleService),this.sharedState=i.getContext(a.SharedState)}async onToggleFavorited(){this.sharedState.isAuthenticated?(this.article.favorited=!this.article.favorited,this.article.favorited?(this.article.favoritesCount++,await this.articleService.favorite(this.article.slug)):(this.article.favoritesCount--,await this.articleService.unfavorite(this.article.slug)),this.render()):o.getRouter().goto(o.getRouter().getNavLink("login","main").href)}render(){return s.html`
                <div class="article-preview">
                    <div class="article-meta">
                        <a href="${"#"+this.article.author.username}">
                            <img alt="profile-picture" src=${this.article.author.image?this.article.author.image:""} />
                        </a>

                        <div class="info">
                            <a href="${"#profile/"+this.article.author.username}" class="author">
                                ${this.article.author.username}</a
                            >
                            <span class="date">${this.article.createdAt}</span>
                        </div>

                        <button
                            class="btn btn-sm pull-xs-right ${this.article.favorited?"btn-primary":"btn-outline-primary"}"
                            @click=${this.onToggleFavorited}
                        >
                            <i class="ion-heart"></i> ${this.article.favoritesCount}
                        </button>
                    </div>

                    <a href="${this.article.slug?"#article/"+this.article.slug:"#article"}" class="preview-link">
                        <h1>${this.article.title}</h1>
                        <p>${this.article.description}</p>
                        <span>Read more...</span>

                        <ul class="tag-list">
                            ${this.article.tagList.map(e=>{s.html`
                                    <li class="tag-default tag-pill tag-outline">${e}</li>
                                `})}
                        </ul>
                    </a>
                </div>
            `}})},$fsx.f[32]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(15),i=$fsx.r(16),r=$fsx.r(31),a=$fsx.r(18);i.registerCustomElement("auth-comp",class extends HTMLElement{constructor(){super(),this.type="",this.username="",this.passwordConfirm="",this.email="",this.emailConfirm="",this.password="",this.errors=[],this.userService=i.getContext(r.UserService),this.sharedState=i.getContext(a.SharedState)}async activate(e,t,s){this.type=s.name}get canSave(){return"Login"===this.type?""!==this.email&&""!==this.password:""!==this.username&&""!==this.email&&""!==this.password&&this.password===this.passwordConfirm&&this.email===this.emailConfirm}async submitForm(){this.errors=[];const e={username:this.username,email:this.email,password:this.password};try{await this.userService.attemptAuth(this.type,e),location.hash="home"}catch(e){const t=await Promise.resolve(e);for(const e in t.errors)t.errors&&t.errors[e]&&this.errors.push(t.errors[e].map(t=>e+": "+t));this.render()}}render(){return s.html`
                <div class="auth-page">
                    <div class="container page">
                        <div class="row">
                            <div class="col-md-6 offset-md-3 col-xs-12">
                                <h1 class="text-xs-center">Sign ${"login"===this.type?"in":"up"}</h1>
                                <p class="text-xs-center">
                                    ${"Register"===this.type?s.html`
                                              <a href="#login">Have an account?</a>
                                          `:s.html`
                                              <a href="#Register">Need an account?</a>
                                          `}
                                </p>

                                <ul class="error-messages">
                                    ${this.errors.map(e=>s.html`<li >
                                        ${e}
                                    </li>`)}
                                </ul>

                                <form>
                                    ${"Register"===this.type?s.html`
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

                                    ${"Register"===this.type?s.html`
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

                                    ${"Register"===this.type?s.html`
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
            `}})},$fsx.f[31]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(23),i=$fsx.r(20),r=$fsx.r(18),a=$fsx.r(16);t.UserService=class{constructor(){this.jwtService=a.getContext(i.JwtService),this.sharedState=a.getContext(r.SharedState),this.apiService=a.getContext(s.ApiService)}async populate(){if(this.jwtService.getToken()){const e=await this.apiService.get("/user");this.setAuth(e.user)}else this.purgeAuth()}setAuth(e){this.jwtService.saveToken(e.token),this.sharedState.saveState(e),this.sharedState.setState()}purgeAuth(){this.jwtService.destroyToken(),this.sharedState.resetState()}async attemptAuth(e,t){const s="Login"===e?"/login":"",i=await this.apiService.post("/users"+s,{user:t});return this.setAuth(i.user),i}async update(e){const t=await this.apiService.put("/user",{user:e});return this.sharedState.currentUser=t.user,t.user}}},$fsx.f[34]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(15),i=$fsx.r(16),r=$fsx.r(25),a=$fsx.r(4);i.registerCustomElement("editor-comp",class extends HTMLElement{constructor(){super(),this.article={title:"",description:"",body:"",tagList:[]},this.articleService=i.getContext(r.ArticleService)}tagChanged(e,t){void 0!==e&&""!==e&&this.addTag(this.tag)}async activate(e,t){return this.routeConfig=t,this.slug=e.slug,this.slug?this.article=await this.articleService.get(this.slug):(this.article={title:"",description:"",body:"",tagList:[]},null)}addTag(e){this.article.tagList.push(e)}removeTag(e){this.article.tagList.splice(this.article.tagList.indexOf(e),1)}async publishArticle(){const e=await this.articleService.save(this.article);this.slug=e.slug,a.getRouter().goto("editor/:slug",{slug:this.slug})}render(){return console.log("wow"),s.html`
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
       >
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="What's this article about?" 
                .value=${this.article.description}
                    @blur=${e=>this.article.description=e.target.value}
            />
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" 
      
                .value=${this.article.body}
                    @blur=${e=>this.article.body=e.target.value}
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" 
                    .value=${this.tag}
                    @blur=${e=>this.tag=e.target.value}>
        
                <div class="tag-list">
                    ${this.article.tagList.map(e=>s.html`
                            <span repeat.for="$tag of article.tagList" class="tag-default tag-pill">
                                <i class="ion-close-round" @click=${()=>{this.removeTag(e)}}"></i>
                                ${e}</span
                            >
                        `)}
                  
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

            `}})},$fsx.f[41]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(15);$fsx.r(39),$fsx.r(40),$fsx.r(16).registerCustomElement("app-main",class extends HTMLElement{render(){return s.html`
                <header-section></header-section>
                <free-router name="main"></free-router>
                <footer-section></footer-section>
            `}})},$fsx.f[39]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(15);$fsx.r(16).registerCustomElement("footer-section",class extends HTMLElement{render(){return s.html`
                <footer>
                    <div class="container">
                        <a href="/" class="logo-font">conduit</a>

                        <span class="attribution">
                            An interactive learning project from
                            <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
                        </span>
                    </div>
                </footer>
            `}})},$fsx.f[40]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(15),i=$fsx.r(16),r=$fsx.r(18);i.registerCustomElement("header-section",class extends HTMLElement{connectedCallback(){i.getContext(i.EventAggregator).subscribe("routeChange",this,this.routechange.bind(this))}routechange(e){this.activeRoute=e.name,this.render()}render(){return s.html`
                <nav class="navbar navbar-light">
                    <div class="container">
                        <a class="navbar-brand" href="#home">conduit</a>
                        <ul class="nav navbar-nav pull-xs-right">
                            <li class="${"nav-item"+("home"===this.activeRoute?" active":"")}">
                                <a class="nav-link" href="#home">Home</a>
                            </li>

                            ${i.getContext(r.SharedState).isAuthenticated?s.html`
                                    <li class="${"nav-item"+("create"===this.activeRoute?" active":"")}">
                                        <a class="nav-link" href="#editor"> <i class="ion-compose"></i>&nbsp;New Post </a>
                                    </li>

                                    <li class="${"nav-item"+("settings"===this.activeRoute?" active":"")}">
                                        <a class="nav-link" href="#settings"> <i class="ion-gear-a"></i>&nbsp;Settings </a>
                                    </li>
                                `:""}
                            ${i.getContext(r.SharedState).isAuthenticated?"":s.html`
                                    <li class="${"nav-item"+("login"===this.activeRoute?" active":"")}">
                                        <a class="nav-link" href="#login"><i class="ion-compose"></i>Sign in</a>
                                    </li>

                                    <li class="${"nav-item"+("register"===this.activeRoute?" active":"")}">
                                        <a class="nav-link" href="#register"><i class="ion-compose"></i>Sign up</a>
                                    </li>
                                `}
                            ${i.getContext(r.SharedState).isAuthenticated?s.html`
                                    <li class="${"nav-item"+("profile"===this.activeRoute?" active":"")}">
                                        <a class="nav-link" href="${"#profile/"+i.getContext(r.SharedState).currentUser.username}"
                                            >${i.getContext(r.SharedState).currentUser.username}</a
                                        >
                                    </li>
                                `:""}
                        </ul>
                    </div>
                </nav>
            `}})},$fsx.r(42);