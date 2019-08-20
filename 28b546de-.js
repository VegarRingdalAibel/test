$fsx.f[40]=(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(1),r=$fsx.r(16),o=$fsx.r(21),a=$fsx.r(38),i=$fsx.r(23);let l=class extends HTMLElement{constructor(){super(),this.errors=[],this.userService=o.instance(a.UserService),this.sharedState=o.instance(i.SharedState)}async update(){try{await this.userService.update(this.sharedState.currentUser),this.success="Updated successfully",this.render(),setTimeout(()=>{this.success=null,this.render()},1500)}catch(e){const t=await Promise.resolve(e);for(const e in t.errors)t.errors&&t.errors[e]&&this.errors.push(t.errors[e].map(t=>e+": "+t))}}get canSave(){return this.passwordConfirm?this.sharedState&&this.sharedState.currentUser&&this.passwordConfirm===this.password:this.sharedState&&this.sharedState.currentUser}logout(){this.userService.purgeAuth(),location.hash="home"}render(){return r.html`
            <div class="settings-page">
                <div class="container page">
                    <div class="row">
                        <div class="col-md-6 offset-md-3 col-xs-12">
                            <h1 class="text-xs-center">Your Settings</h1>

                            <ul class="error-messages">
                                ${this.errors.map(e=>r.html`
                                        <li>
                                            ${e}
                                        </li>
                                    `)}
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
                                            .value=${this.sharedState.currentUser.image}
                                            @input=${e=>{this.sharedState.currentUser.image=e.target.value,this.render()}}
                                        />
                                    </fieldset>

                                    <fieldset class="form-group">
                                        <input
                                            class="form-control form-control-lg"
                                            type="text"
                                            placeholder="Your Name"
                                            autocomplete="usename"
                                            .value=${this.sharedState.currentUser.username}
                                            @input=${e=>{this.sharedState.currentUser.username=e.target.value,this.render()}}
                                        />
                                    </fieldset>

                                    <fieldset class="form-group">
                                        <textarea
                                            class="form-control form-control-lg"
                                            rows="8"
                                            placeholder="Short bio about you"
                                            autocomplete="bio"
                                            .value=${this.sharedState.currentUser.bio}
                                            @input=${e=>{this.sharedState.currentUser.bio=e.target.value,this.render()}}
                                        ></textarea>
                                    </fieldset>

                                    <fieldset class="form-group">
                                        <input
                                            class="form-control form-control-lg"
                                            type="text"
                                            placeholder="Email"
                                            autocomplete="email"
                                            @input=${e=>{this.sharedState.currentUser.email=e.target.value,this.render()}}
                                        />
                                    </fieldset>

                                    <fieldset class="form-group">
                                        <input
                                            class="form-control form-control-lg"
                                            type="password"
                                            autocomplete="current-password"
                                            placeholder="Password"
                                            @input=${e=>{this.password=e.target.value,this.render()}}
                                        />
                                    </fieldset>

                                    <fieldset class="form-group">
                                        <input
                                            class="form-control form-control-lg"
                                            type="password"
                                            autocomplete="new-password"
                                            placeholder="Confirm new password"
                                            @input=${e=>{this.passwordConfirm=e.target.value,this.render()}}
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
        `}};l=s.__decorate([o.customElement("settings-comp")],l),t.default=l};
//# sourceMappingURL=28b546de-.js.map