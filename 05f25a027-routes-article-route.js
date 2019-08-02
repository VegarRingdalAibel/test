$fsx.f[39]=(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});const s=$fsx.r(15);$fsx.r(37);const i=$fsx.r(16),r=$fsx.r(25),a=$fsx.r(38),o=$fsx.r(33),n=$fsx.r(18),c=$fsx.r(29),l=$fsx.r(31),h=$fsx.r(30);function m(){return s.html`
        <div class="article-meta">
            <a href="#profile/${this.article.author.username}">
                <img src.bind="${this.article.author.image?this.article.author.image:""}" />
            </a>
            <div class="info">
                <a href="#profile/${this.article.author.username}" class="author">${this.article.author.username}</a>
                <span class="date">${t=this.article.createdAt,new Date(t).toLocaleDateString("en",{month:"long",day:"2-digit",year:"numeric"})}</span>
            </div>
            ${this.canModify?s.html`
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
            ${this.canModify?"":s.html`
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
    `;var t}i.registerCustomElement("article-comp",class extends HTMLElement{constructor(){super(),this.comments=[],this.articleService=i.getContext(r.ArticleService),this.commentService=i.getContext(a.CommentService),this.userService=i.getContext(o.UserService),this.sharedState=i.getContext(n.SharedState),this.profileService=i.getContext(c.ProfileService)}async activate(t,e,s){this.slug=e.slug,this.article=await this.articleService.get(this.slug),this.comments=await this.commentService.getList(this.slug)||[]}onToggleFavorited(){this.sharedState.isAuthenticated?(this.article.favorited=!this.article.favorited,this.article.favorited?(this.article.favoritesCount++,this.articleService.favorite(this.article.slug)):(this.article.favoritesCount--,this.articleService.unfavorite(this.article.slug)),this.render()):location.hash="login"}onToggleFollowing(){this.sharedState.isAuthenticated?(this.article.author.following=!this.article.author.following,this.article.author.following?this.profileService.follow(this.article.author.username):this.profileService.unfollow(this.article.author.username),this.render()):location.hash="login"}async postComment(){const t=await this.commentService.add(this.slug,this.myComment);this.comments.push(t),this.myComment="",this.render()}get canModify(){return this.article.author.username===this.sharedState.currentUser.username}async deleteArticle(){await this.articleService.destroy(this.article.slug),location.hash="home",this.render()}async deleteComment(t){await this.commentService.destroy(t,this.slug),this.comments=await this.commentService.getList(this.slug),this.render()}markedhtml(t){let e;if(t){const s=new h.Renderer;e=h(t,{renderer:s})}else e="";return e}render(){return console.log("loaded"),s.html`
                <div class="article-page">
                    <div class="banner">
                        <div class="container">
                            <h1>${this.article.title}</h1>
                            <!--   just to stop repeating myself -->
                            ${m.call(this)}
                        </div>
                    </div>

                    <div class="container page">
                        <div class="row article-content">
                            <div class="col-md-12">
                                ${l.unsafeHTML(this.markedhtml(this.article.body))}
                            </div>
                        </div>

                        <hr />

                        <div class="article-actions">
                            <!--   just to stop repeating myself -->
                            ${m.call(this)}
                        </div>

                        <div class="row">
                            <div class="col-xs-12 col-md-8 offset-md-2">
                                ${this.sharedState.isAuthenticated?s.html`
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
                                ${this.comments.map(t=>s.html`
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
            `}})},$fsx.f[37]=(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});const s=$fsx.r(15),i=$fsx.r(16),r=$fsx.r(18),a=$fsx.r(4);i.registerCustomElement("comment-section",class extends HTMLElement{get canModify(){return this.comment.author.username===this.sharedState.currentUser.username}deleteCb(t){}constructor(){super(),this.sharedState=i.getContext(r.SharedState)}render(){return s.html`
                <div class="card">
                    <div class="card-block">
                        <p class="card-text">${this.comment.body}</p>
                    </div>

                    <div class="card-footer">
                        <a href="${a.getRouter().getNavLink("profile","main").href+"/"+this.comment.author.username}" class="comment-author">
                            <img src=${this.comment.author.image} class="comment-author-img" />
                        </a>

                        &nbsp;

                        <a href="${"#profile/"+this.comment.author.username}" class="comment-author">${this.comment.author.username}</a>

                        <span class="date-posted">${t=this.comment.createdAt,new Date(t).toLocaleDateString("en",{month:"long",day:"2-digit",year:"numeric"})}</span>
                        ${this.canModify?s.html` <span class="mod-options">
                            <i class="ion-trash-a" @click=${()=>{this.deleteCb(this.comment.id)}}></i>
                        </span>`:""}
                       
                    </div>
                </div>
            `;var t}})},$fsx.f[38]=(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});const s=$fsx.r(23),i=$fsx.r(16);e.CommentService=class{constructor(){this.apiService=i.getContext(s.ApiService)}async add(t,e){return(await this.apiService.post(`/articles/${t}/comments`,{comment:{body:e}})).comment}async getList(t){return(await this.apiService.get(`/articles/${t}/comments`)).comments}async destroy(t,e){return await this.apiService.delete(`/articles/${e}/comments/${t}`)}}};