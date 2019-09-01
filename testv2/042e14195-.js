$fsx.f[39]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const l=$fsx.r(12),s=$fsx.r(23),c=$fsx.r(28),i=$fsx.r(36);let o=class extends HTMLElement{constructor(){super(...arguments),this.modules=[]}async activate(){this.app=c.instance(i.App),this.modules=this.app.module.getModules()}selectModule(e){this.app.module.selectModule(e)}render(){return s.html`
            <div class="section-header  flex flex-col items-center">
                <h1 class=" text-xl">
                    Select module
                </h1>
            </div>

            <ul class="section-body">
                ${this.modules.map(e=>s.html`
                        <li
                            class="flex flex-col section-body-row"
                            @click=${()=>{this.selectModule(e.id)}}
                        >
                            <div class="text-xl text-center   ">
                                <p>${e.title}</p>
                            </div>
                            <p
                                class="text-sm text-center flex flex-col items-center"
                            >
                                ${e.description}
                                <i>
                                    ${e.qr?s.svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="white" d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h4.05l1.83-2h4.24l1.83 2H20v12zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg>`:s.svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="white" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`}</i
                                >
                            </p>
                        </li>
                    `)}
            </ul>
        `}};l.__decorate([c.property(),l.__metadata("design:type",Array)],o.prototype,"modules",void 0),o=l.__decorate([c.customElement("module-selector-route")],o),t.default=o};