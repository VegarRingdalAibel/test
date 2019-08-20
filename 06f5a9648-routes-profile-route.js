$fsx.f[37]=(e,s)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0});const i=$fsx.r(1),t=$fsx.r(16),r=$fsx.r(21),l=$fsx.r(34),o=$fsx.r(23),a=$fsx.r(35),n=$fsx.r(36),c=$fsx.r(5);let h=class extends HTMLElement{constructor(){super(),this.curRoute="",this.profileService=r.instance(l.ProfileService),this.sharedState=r.instance(o.SharedState)}connectedCallback(){r.subscribe("routeChange",this,this.routechange.bind(this))}routechange(e){this.curRoute=e.options.name,this.render()}async activate(e,s){this.username=s.name,this.profile=await this.profileService.get(this.username)}isUser(){return!(!this.profile||!this.sharedState.currentUser)&&this.profile.username===this.sharedState.currentUser.username}markedhtml(e){let s;if(e){const i=new a.Renderer;s=a(e,{renderer:i})}else s="";return s}onToggleFollowing(){this.sharedState.isAuthenticated?(this.profile.following=!this.profile.following,this.profile.following?this.profileService.follow(this.profile.username):this.profileService.unfollow(this.profile.username),this.render()):location.hash="login"}render(){return t.html`
            <div class="profile-page">
                <div class="user-info">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12 col-md-10 offset-md-1">
                                <!-- 
                                        -----------------------------------
                                    -->
                                ${this.profile?t.html`
                                          <img src=${this.profile?this.profile.image:void 0} class="user-img" />
                                      `:""}
                                <!-- 
                                        -----------------------------------
                                    -->
                                ${this.profile?"":t.html`
                                          <div class="user-img"></div>
                                      `}

                                <h4>${this.profile.username?this.profile.username:"loading.."}</h4>
                                <p>
                                    ${n.unsafeHTML(this.markedhtml(this.profile.bio))}
                                </p>

                                <!-- 
                                        -----------------------------------
                                    -->
                                ${!this.isUser()&&this.profile?t.html`
                                          <button
                                              class="btn btn-sm btn-outline-secondary action-btn"
                                              @click=${this.onToggleFollowing}
                                          >
                                              <i class="ion-plus-round"></i>
                                              &nbsp; ${this.profile.following?"Unfollow":"Follow"} ${this.profile.username}
                                          </button>
                                      `:""}
                                <!-- 
                                        -----------------------------------
                                    -->
                                ${this.isUser()&&this.profile?t.html`
                                          <a href=${c.href("Settings")} class="btn btn-sm btn-outline-secondary action-btn">
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
                                            href=${c.href("MyPosts",{name:this.username})}
                                            >My Posts</a
                                        >
                                    </li>
                                    <li class="nav-item">
                                        <a
                                            class="nav-link ${"Favorites"===this.curRoute?"active":""}"
                                            href=${c.href("Favorites",{name:this.username})}
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
        `}};h=i.__decorate([r.customElement("profile-comp")],h),s.default=h};
//# sourceMappingURL=06f5a9648-routes-profile-route.js.map