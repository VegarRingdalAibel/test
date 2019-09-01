$fsx.f[38]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(12),l=$fsx.r(23),i=$fsx.r(28),n=$fsx.r(36);let c=class extends HTMLElement{constructor(){super(...arguments),this.userID=""}connectedCallback(){this.app=i.instance(n.App),this.app.login.signout()}async login(){await this.app.login.signin(this.userID)}render(){return l.html`
            <div class="section-header flex flex-col items-center">
                <h1 class=" text-xl">
                    Welcome
                </h1>
            </div>

            <div class="section-body ">
                <form class="flex flex-col items-center ">
                    <input
                        @input=${e=>{this.userID=e.target.value}}
                        .value=${this.userID}
                        placeholder="id card number"
                        class=" p-2 m-2 w-5/6 text-center bg-gray-300"
                    />
                    <div>
                        <button @click=${this.login} class="default-buttons">
                            Login
                        </button>
                        <button @click=${this.login} class="default-buttons">
                            Scan id card
                        </button>
                    </div>
                </form>
            </div>
        `}};c=s.__decorate([i.customElement("login-route")],c),t.default=c};