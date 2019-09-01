$fsx.f[37]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=$fsx.r(12),c=$fsx.r(23),s=$fsx.r(28),r=$fsx.r(35),i=$fsx.r(36);let l=class extends HTMLElement{constructor(){super(...arguments),this.projects=[],this.setAsDefaultProject=!1}async activate(){this.projectService=s.instance(r.ProjectService),this.app=s.instance(i.App),this.projects=await this.projectService.getAll()}selectProject(e){this.app.project.selectProject(e,this.setAsDefaultProject)}toggleDefault(){this.setAsDefaultProject=!this.setAsDefaultProject}render(){return c.html`
            <div class="section-header  flex flex-col items-center">
                <h1 class=" text-xl">
                    Select Project
                </h1>
            </div>

            <div class="section-body">
                <ul>
                    ${this.projects.map(e=>c.html`
                            <li
                                class="flex flex-col section-body-row "
                                @click=${()=>{this.selectProject(e.module_code)}}
                            >
                                <p class="text-xl text-center">
                                    ${e.module_code}
                                </p>
                                <p class="text-sm text-center">
                                    ${e.description}
                                </p>
                            </li>
                        `)}
                </ul>
            </div>

            <div class="section-footer flex flex-col items-center ">
                <div>
                    <label>set as default: </label
                    ><input
                        .checked=${this.setAsDefaultProject}
                        @change=${this.toggleDefault}
                        type="checkbox"
                    />
                </div>
            </div>
        `}};o.__decorate([s.property(),o.__metadata("design:type",Array)],l.prototype,"projects",void 0),o.__decorate([s.property(),o.__metadata("design:type",Object)],l.prototype,"setAsDefaultProject",void 0),l=o.__decorate([s.customElement("project-route")],l),t.default=l},$fsx.f[35]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});t.ProjectService=class{async getAll(){return[{module_code:"0057010",description:"Power Station -project 1"},{module_code:"0057010",description:"Power Station -project 2"},{module_code:"0057010",description:"Power Station -project 2"},{module_code:"0057010",description:"Power Station -project 3"},{module_code:"0055090",description:"Power Station -project 1"},{module_code:"0055090",description:"Power Station -project 2"},{module_code:"0055090",description:"Power Station -project 3"},{module_code:"0055090",description:"Power Station -project 4"}]}}};