$fsx.f[30]=(e,i)=>{Object.defineProperty(i,"__esModule",{value:!0});const s=$fsx.r(15),t=$fsx.r(16),r=$fsx.r(29),o=$fsx.r(18);t.registerCustomElement("profile-comp",class extends HTMLElement{constructor(){super(),this.curRoute="",this.eventAggregator=t.getContext(t.EventAggregator),this.profileService=t.getContext(r.ProfileService),this.sharedState=t.getContext(o.SharedState)}connectedCallback(){t.getContext(t.EventAggregator).subscribe("routeChange",this,this.routechange.bind(this))}routechange(e){this.curRoute=e.options.name,this.render()}async activate(e,i){this.username=i.name,this.profile=await this.profileService.get(this.username)}isUser(){return!!this.profile&&(this.profile.username===this.sharedState.currentUser&&this.sharedState.currentUser.username)}render(){return s.html`
                <div class="profile-page">
                    <div class="user-info">
                        <div class="container">
                            <div class="row">
                                <div class="col-xs-12 col-md-10 offset-md-1">
                                    <img
                                        if.bind="profile"
                                        src=${this.profile?this.profile.image:void 0}
                                        class="user-img"
                                    />
                                    <div if.bind="!profile" class="user-img"></div>
                                    <h4>${this.profile.username?this.profile.username:"loading.."}</h4>
                                    <p inner-html.bind="profile.bio | formatHtml"></p>
                                    <button
                                        class="btn btn-sm btn-outline-secondary action-btn"
                                        if.bind="!isUser() && profile"
                                        click.delegate="onToggleFollowing()"
                                    >
                                        <i class="ion-plus-round"></i>
                                        &nbsp; ${this.profile.following?"Unfollow":"Follow"} ${this.profile.username}
                                    </button>
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
            `}})},$fsx.f[29]=(e,i)=>{Object.defineProperty(i,"__esModule",{value:!0});const s=$fsx.r(23),t=$fsx.r(16);i.ProfileService=class{constructor(){this.apiService=t.getContext(s.ApiService)}async get(e){return(await this.apiService.get("/profiles/"+e)).profile}async follow(e){return await this.apiService.post("/profiles/"+e+"/follow")}async unfollow(e){return await this.apiService.delete("/profiles/"+e+"/follow")}}};