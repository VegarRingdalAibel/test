$fsx.f[44]=(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=$fsx.r(1),i=$fsx.r(16);$fsx.r(42);const a=$fsx.r(21),r=$fsx.r(30),n=$fsx.r(43),o=$fsx.r(38),c=$fsx.r(23),l=$fsx.r(34),h=$fsx.r(36),m=$fsx.r(35),d=$fsx.r(5);let u=class extends HTMLElement{constructor(){super(),this.comments=[],this.articleService=a.instance(r.ArticleService),this.commentService=a.instance(n.CommentService),this.userService=a.instance(o.UserService),this.sharedState=a.instance(c.SharedState),this.profileService=a.instance(l.ProfileService)}async activate(t,e,s){this.slug=e.slug,this.article=await this.articleService.get(this.slug),this.comments=await this.commentService.getList(this.slug)||[]}onToggleFavorited(){this.sharedState.isAuthenticated?(this.article.favorited=!this.article.favorited,this.article.favorited?(this.article.favoritesCount++,this.articleService.favorite(this.article.slug)):(this.article.favoritesCount--,this.articleService.unfavorite(this.article.slug)),this.render()):location.hash="login"}onToggleFollowing(){this.sharedState.isAuthenticated?(this.article.author.following=!this.article.author.following,this.article.author.following?this.profileService.follow(this.article.author.username):this.profileService.unfollow(this.article.author.username),this.render()):location.hash="login"}async postComment(){const t=await this.commentService.add(this.slug,this.myComment);this.comments.push(t),this.myComment="",this.render()}get canModify(){return this.sharedState.currentUser&&this.article.author.username===this.sharedState.currentUser.username}async deleteArticle(){await this.articleService.destroy(this.article.slug),location.hash="home",this.render()}async deleteComment(t){await this.commentService.destroy(t,this.slug),this.comments=await this.commentService.getList(this.slug),this.render()}markedhtml(t){let e;if(t){const s=new m.Renderer;e=m(t,{renderer:s})}else e="";return e}render(){return console.log("loaded"),i.html`
            <div class="article-page">
                <div class="banner">
                    <div class="container">
                        <h1>${this.article.title}</h1>
                        <!--   just to stop repeating myself -->
                        ${f.call(this)}
                    </div>
                </div>

                <div class="container page">
                    <div class="row article-content">
                        <div class="col-md-12">
                            ${h.unsafeHTML(this.markedhtml(this.article.body))}
                        </div>
                    </div>

                    <hr />

                    <div class="article-actions">
                        <!--   just to stop repeating myself -->
                        ${f.call(this)}
                    </div>

                    <div class="row">
                        <div class="col-xs-12 col-md-8 offset-md-2">
                            ${this.sharedState.isAuthenticated?i.html`
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

                            <!-- Loop all comments -->
                            ${this.comments.map(t=>i.html`
                                    <comment-section
                                        .comment=${t}
                                        .deleteCb=${t=>{this.deleteComment(t)}}
                                    >
                                    </comment-section>
                                `)}
                        </div>
                    </div>
                </div>
            </div>
        `}};function f(){return i.html`
        <div class="article-meta">
            <a href=${d.href("Profile",{name:this.article.author.username})}>
                <img src.bind="${this.article.author.image?this.article.author.image:""}" />
            </a>
            <div class="info">
                <a href=${d.href("Profile",{name:this.article.author.username})} class="author"
                    >${this.article.author.username}</a
                >
                <span class="date">${t=this.article.createdAt,new Date(t).toLocaleDateString("en",{month:"long",day:"2-digit",year:"numeric"})}</span>
            </div>
            ${this.canModify?i.html`
                      <span>
                          <a class="btn btn-outline-secondary btn-sm" href=${d.href("EditorSlug",{slug:this.article.slug})}>
                              <i class="ion-edit"></i>&nbsp;Edit Article
                          </a>
                          &nbsp;&nbsp;
                          <button class="btn btn-outline-danger btn-sm" @click=${this.deleteArticle}>
                              <i class="ion-trash-a"></i>&nbsp;Delete Article
                          </button>
                      </span>
                  `:""}
            ${this.canModify?"":i.html`
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
    `;var t}u=s.__decorate([a.customElement("article-comp")],u),e.default=u},$fsx.f[42]=(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=$fsx.r(1),i=$fsx.r(16),a=$fsx.r(21),r=$fsx.r(23),n=$fsx.r(5);let o=class extends HTMLElement{constructor(){super(),this.sharedState=a.instance(r.SharedState)}get canModify(){return this.sharedState.currentUser&&this.comment.author.username===this.sharedState.currentUser.username}render(){return i.html`
            <div class="card">
                <div class="card-block">
                    <p class="card-text">${this.comment.body}</p>
                </div>

                <div class="card-footer">
                    <a href=${n.href("Profile",{name:this.comment.author.username})} class="comment-author">
                        <img src=${this.comment.author.image} class="comment-author-img" />
                    </a>

                    &nbsp;

                    <a href=${n.href("Profile",{name:this.comment.author.username})} class="comment-author"
                        >${this.comment.author.username}</a
                    >
                    <span class="date-posted">${t=this.comment.createdAt,new Date(t).toLocaleDateString("en",{month:"long",day:"2-digit",year:"numeric"})}</span>

                    ${this.canModify?i.html`
                              <span class="mod-options">
                                  <i
                                      class="ion-trash-a"
                                      @click=${()=>{this.deleteCb(this.comment.id)}}
                                  ></i>
                              </span>
                          `:""}
                </div>
            </div>
        `;var t}};o=s.__decorate([a.customElement("comment-section")],o),e.default=o},$fsx.f[43]=(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=$fsx.r(28),i=$fsx.r(21);e.CommentService=class{constructor(){this.apiService=i.instance(s.ApiService)}async add(t,e){return(await this.apiService.post(`/articles/${t}/comments`,{comment:{body:e}})).comment}async getList(t){return(await this.apiService.get(`/articles/${t}/comments`)).comments}async destroy(t,e){return await this.apiService.delete(`/articles/${e}/comments/${t}`)}}};
//# sourceMappingURL=5fcd8d0b-routes-article-route.js.map