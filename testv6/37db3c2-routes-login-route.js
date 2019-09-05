$fsx.f[37]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(11),l=$fsx.r(22),n=$fsx.r(27),i=$fsx.r(35);let c=class extends HTMLElement{constructor(){super(...arguments),this.userID=""}connectedCallback(){this.app=n.instance(i.App),this.app.login.signout()}async login(e){e.preventDefault();await this.app.login.signin(this.userID)}render(){return l.html`
            <div class="section-header flex flex-col items-center">
                <h1 class=" text-xl">
                    Welcome
                </h1>
            </div>

            <div class="section-body ">
                <form class="flex flex-col items-center ">
                    <label class="text-white text-center"
                        >User ID:
                        <input
                            @input=${e=>{this.userID=e.target.value}}
                            type="username"
                            .value=${this.userID}
                            placeholder="id card number"
                            class=" p-2 m-2 w-5/6 text-center bg-gray-700 text-white"
                    /></label>
                    <div>
                        <button @click=${this.login} class="default-buttons">
                            login
                        </button>
                        <button @click=${this.login} class="default-buttons">
                            scan id card
                        </button>
                    </div>
                </form>
            </div>
        `}};c=s.__decorate([n.customElement("login-route")],c),t.default=c};