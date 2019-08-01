$fsx.f[43]=(t,e)=>{var r=$fsx.r(32),s=$fsx.r(37),i=$fsx.r(35),n=$fsx.r(28),a=$fsx.r(38),o=$fsx.r(42);var c={M:function(t){return t.getMonth()+1},MM:function(t){return u(t.getMonth()+1,2)},Q:function(t){return Math.ceil((t.getMonth()+1)/3)},D:function(t){return t.getDate()},DD:function(t){return u(t.getDate(),2)},DDD:function(t){return r(t)},DDDD:function(t){return u(r(t),3)},d:function(t){return t.getDay()},E:function(t){return t.getDay()||7},W:function(t){return s(t)},WW:function(t){return u(s(t),2)},YY:function(t){return u(t.getFullYear(),4).substr(2)},YYYY:function(t){return u(t.getFullYear(),4)},GG:function(t){return String(i(t)).substr(2)},GGGG:function(t){return i(t)},H:function(t){return t.getHours()},HH:function(t){return u(t.getHours(),2)},h:function(t){var e=t.getHours();return 0===e?12:e>12?e%12:e},hh:function(t){return u(c.h(t),2)},m:function(t){return t.getMinutes()},mm:function(t){return u(t.getMinutes(),2)},s:function(t){return t.getSeconds()},ss:function(t){return u(t.getSeconds(),2)},S:function(t){return Math.floor(t.getMilliseconds()/100)},SS:function(t){return u(Math.floor(t.getMilliseconds()/10),2)},SSS:function(t){return u(t.getMilliseconds(),3)},Z:function(t){return l(t.getTimezoneOffset(),":")},ZZ:function(t){return l(t.getTimezoneOffset())},X:function(t){return Math.floor(t.getTime()/1e3)},x:function(t){return t.getTime()}};function l(t,e){e=e||"";var r=t>0?"-":"+",s=Math.abs(t),i=s%60;return r+u(Math.floor(s/60),2)+e+u(i,2)}function u(t,e){for(var r=Math.abs(t).toString();r.length<e;)r="0"+r;return r}t.exports=function(t,e,r){var s=e?String(e):"YYYY-MM-DDTHH:mm:ss.SSSZ",i=(r||{}).locale,l=o.format.formatters,u=o.format.formattingTokensRegExp;i&&i.format&&i.format.formatters&&(l=i.format.formatters,i.format.formattingTokensRegExp&&(u=i.format.formattingTokensRegExp));var m=n(t);return a(m)?function(t,e,r){var s,i,n,a=t.match(r),o=a.length;for(s=0;s<o;s++)i=e[a[s]]||c[a[s]],a[s]=i||((n=a[s]).match(/\[[\s\S]/)?n.replace(/^\[|]$/g,""):n.replace(/\\/g,""));return function(t){for(var e="",r=0;r<o;r++)a[r]instanceof Function?e+=a[r](t,c):e+=a[r];return e}}(s,l,u)(m):"Invalid Date"}},$fsx.f[57]=(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});const r=$fsx.r(15);$fsx.r(55);const s=$fsx.r(16),i=$fsx.r(25),n=$fsx.r(56),a=$fsx.r(51),o=$fsx.r(18),c=$fsx.r(47),l=$fsx.r(48),u=$fsx.r(43),m=$fsx.r(49);function h(){return r.html`
        <div class="article-meta">
            <a href="#profile/${this.article.author.username}">
                <img src.bind="${this.article.author.image?this.article.author.image:""}" />
            </a>
            <div class="info">
                <a href="#profile/${this.article.author.username}" class="author">${this.article.author.username}</a>
                <span class="date">${u(new Date(this.article.createdAt),"MMMM D, YYYY")}</span>
            </div>
            ${this.canModify?r.html`
                      <span>
                          <a class="btn btn-outline-secondary btn-sm" href="#editor/${this.article.slug}">
                              <i class="ion-edit"></i>&nbsp;Edit Article
                          </a>
                          &nbsp;&nbsp;
                          <button class="btn btn-outline-danger btn-sm" @click=${this.deleteArticle}>
                              <i class="ion-trash-a"></i>&nbsp;Delete Article
                          </button>
                      </span>
                  `:""}
            ${this.canModify?"":r.html`
                      <span>
                          <button class="btn btn-sm btn-outline-secondary" @click=${this.onToggleFollowing}>
                              <i class="ion-plus-round"></i>
                              &nbsp; ${this.article.author.following?"Unfollow":"Follow"} ${this.article.author.username}
                          </button>
                          &nbsp;&nbsp;
                          <button
                              class="btn btn-sm ${this.article.favorited?"btn-primary":"btn-outline-primary"}"
                              @click=${this.onToggleFavorited}
                          >
                              <i class="ion-heart"></i>
                              &nbsp; ${this.article.favorited?"Unfavorite":"Favorite"} Post
                              <span class="counter">(${this.article.favoritesCount})</span>
                          </button>
                      </span>
                  `}
        </div>
    `}s.registerCustomElement("article-comp",class extends HTMLElement{constructor(){super(),this.comments=[],this.articleService=s.getContext(i.ArticleService),this.commentService=s.getContext(n.CommentService),this.userService=s.getContext(a.UserService),this.sharedState=s.getContext(o.SharedState),this.profileService=s.getContext(c.ProfileService)}async activate(t,e,r){this.slug=e.slug,this.article=await this.articleService.get(this.slug),this.comments=await this.commentService.getList(this.slug)||[]}onToggleFavorited(){this.sharedState.isAuthenticated?(this.article.favorited=!this.article.favorited,this.article.favorited?(this.article.favoritesCount++,this.articleService.favorite(this.article.slug)):(this.article.favoritesCount--,this.articleService.unfavorite(this.article.slug)),this.render()):location.hash="login"}onToggleFollowing(){this.sharedState.isAuthenticated?(this.article.author.following=!this.article.author.following,this.article.author.following?this.profileService.follow(this.article.author.username):this.profileService.unfollow(this.article.author.username),this.render()):location.hash="login"}async postComment(){const t=await this.commentService.add(this.slug,this.myComment);this.comments.push(t),this.myComment="",this.render()}get canModify(){return this.article.author.username===this.sharedState.currentUser.username}async deleteArticle(){await this.articleService.destroy(this.article.slug),location.hash="home",this.render()}async deleteComment(t){await this.commentService.destroy(t,this.slug),this.comments=await this.commentService.getList(this.slug),this.render()}markedhtml(t){let e;if(t){const r=new l.Renderer;e=l(t,{renderer:r})}else e="";return e}render(){return console.log("loaded"),r.html`
                <div class="article-page">
                    <div class="banner">
                        <div class="container">
                            <h1>${this.article.title}</h1>
                            <!--   just to stop repeating myself -->
                            ${h.call(this)}
                        </div>
                    </div>

                    <div class="container page">
                        <div class="row article-content">
                            <div class="col-md-12">
                                ${m.unsafeHTML(this.markedhtml(this.article.body))}
                            </div>
                        </div>

                        <hr />

                        <div class="article-actions">
                            <!--   just to stop repeating myself -->
                            ${h.call(this)}
                        </div>

                        <div class="row">
                            <div class="col-xs-12 col-md-8 offset-md-2">
                                ${this.sharedState.isAuthenticated?r.html`
                                          <form class="card comment-form">
                                              <div class="card-block">
                                                  <textarea
                                                      class="form-control"
                                                      placeholder="Write a comment..."
                                                      rows="3"
                                                      .value=${this.myComment?this.myComment:""}
                                                      @input=${t=>this.myComment=t.target.value}
                                                  ></textarea>
                                              </div>
                                              <div class="card-footer">
                                                  <img
                                                      src="${this.sharedState.currentUser.image?this.sharedState.currentUser.image:""}"
                                                      class="comment-author-img"
                                                  />

                                                  <!-- PS! do not use button in forms, need to improve override default -->
                                                  <input type ="button" class="btn btn-sm btn-primary" @click=${this.postComment}"
                                                  value="Post Comment">
                                              </div>
                                          </form>
                                      `:""}
                                ${this.comments.map(t=>r.html`
                                        <comment-section
                                            .comment=${t}
                                            .delete-cb=${()=>{console.log("wow")}}
                                        >
                                        </comment-section>
                                    `)}
                            </div>
                        </div>
                    </div>
                </div>
            `}})},$fsx.f[55]=(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});const r=$fsx.r(15),s=$fsx.r(16),i=$fsx.r(18),n=$fsx.r(4),a=$fsx.r(43);s.registerCustomElement("comment-section",class extends HTMLElement{get canModify(){return this.comment.author.username===this.sharedState.currentUser.username}deleteCb(t){}constructor(){super(),this.sharedState=s.getContext(i.SharedState)}render(){return r.html`
                <div class="card">
                    <div class="card-block">
                        <p class="card-text">${this.comment.body}</p>
                    </div>

                    <div class="card-footer">
                        <a href="${n.getRouter().getNavLink("profile","main").href+"/"+this.comment.author.username}" class="comment-author">
                            <img src=${this.comment.author.image} class="comment-author-img" />
                        </a>

                        &nbsp;

                        <a href="${"#profile/"+this.comment.author.username}" class="comment-author">${this.comment.author.username}</a>

                        <span class="date-posted">${a(new Date(this.comment.createdAt),"MMMM D, YYYY")}</span>
                        ${this.canModify?r.html` <span class="mod-options">
                            <i class="ion-trash-a" @click=${()=>{this.deleteCb(this.comment.id)}}></i>
                        </span>`:""}
                       
                    </div>
                </div>
            `}})},$fsx.f[56]=(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});const r=$fsx.r(23),s=$fsx.r(16);e.CommentService=class{constructor(){this.apiService=s.getContext(r.ApiService)}async add(t,e){return(await this.apiService.post(`/articles/${t}/comments`,{comment:{body:e}})).comment}async getList(t){return(await this.apiService.get(`/articles/${t}/comments`)).comments}async destroy(t,e){return await this.apiService.delete(`/articles/${e}/comments/${t}`)}}};