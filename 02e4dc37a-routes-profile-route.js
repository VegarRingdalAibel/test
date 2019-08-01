$fsx.f[50]=(e,i)=>{Object.defineProperty(i,"__esModule",{value:!0});const s=$fsx.r(15),t=$fsx.r(16),r=$fsx.r(47),o=$fsx.r(18),l=$fsx.r(48),n=$fsx.r(49);t.registerCustomElement("profile-comp",class extends HTMLElement{constructor(){super(),this.curRoute="",this.eventAggregator=t.getContext(t.EventAggregator),this.profileService=t.getContext(r.ProfileService),this.sharedState=t.getContext(o.SharedState)}connectedCallback(){t.getContext(t.EventAggregator).subscribe("routeChange",this,this.routechange.bind(this))}routechange(e){this.curRoute=e.options.name,this.render()}async activate(e,i){this.username=i.name,this.profile=await this.profileService.get(this.username)}isUser(){return!!this.profile&&(this.profile.username===this.sharedState.currentUser&&this.sharedState.currentUser.username)}markedhtml(e){let i;if(e){const s=new l.Renderer;i=l(e,{renderer:s})}else i="";return i}onToggleFollowing(){this.sharedState.isAuthenticated?(this.profile.following=!this.profile.following,this.profile.following?this.profileService.follow(this.profile.username):this.profileService.unfollow(this.profile.username),this.render()):location.hash="login"}render(){return s.html`
                <div class="profile-page">
                    <div class="user-info">
                        <div class="container">
                            <div class="row">
                                <div class="col-xs-12 col-md-10 offset-md-1">
                                    <!-- if profile -->
                                    ${this.profile?s.html`
                                              <img src=${this.profile?this.profile.image:void 0} class="user-img" />
                                          `:""}
                                    <!-- else -->
                                    ${this.profile?"":s.html`
                                              <div class="user-img"></div>
                                          `}
                                    <h4>${this.profile.username?this.profile.username:"loading.."}</h4>
                                    <p>
                                        ${n.unsafeHTML(this.markedhtml(this.profile.bio))}
                                    </p>
                                    ${!this.isUser()&&this.profile?s.html`
                                              <button
                                                  class="btn btn-sm btn-outline-secondary action-btn"
                                                  @click=${this.onToggleFollowing}
                                              >
                                                  <i class="ion-plus-round"></i>
                                                  &nbsp; ${this.profile.following?"Unfollow":"Follow"}
                                                  ${this.profile.username}
                                              </button>
                                          `:""}
                                    ${this.isUser()&&this.profile?s.html`
                                              <a href="#settings" class="btn btn-sm btn-outline-secondary action-btn">
                                                  <i class="ion-gear-a"></i> Edit Profile Settings
                                              </a>
                                          `:""}
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
                                                class="nav-link ${"Favorites"!==this.curRoute?"active":""}"
                                                href="#profile/${this.username}/"
                                                >My Posts</a
                                            >
                                        </li>
                                        <li class="nav-item">
                                            <a
                                                class="nav-link ${"Favorites"===this.curRoute?"active":""}"
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
            `}})};