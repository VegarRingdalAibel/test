$fsx.f[49]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=$fsx.r(11),r=$fsx.r(22),l=$fsx.r(27),a=$fsx.r(47);$fsx.r(48);let n=class extends HTMLElement{async activate(){this.workpackService=l.instance(a.WorkpackService),this.wp=await this.workpackService.getAll()}render(){return r.html`
            <div class="section-header  flex flex-col items-center">
                <h1 class=" text-xl">
                    Workpacks
                </h1>
            </div>

            <div class="section-body">
                ${this.wp.map(e=>r.html`
                        <workpack-row
                            class="flex flex-col  section-body-row"
                            .entity=${e}
                        ></workpack-row>
                    `)}
            </div>

            <div class="section-footer ">
                <button disabled class="default-buttons m-2">Filter</button>
            </div>
        `}};n=o.__decorate([l.customElement("workpack-route")],n),t.default=n},$fsx.f[47]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});t.WorkpackService=class{async getAll(){return[{workpack_no:"E20001",title:"Pull & term cables between LV room IT1107 and Hvac Room PY1113",planned_mhr:250,completed_mhr:157,foreman:"John Doe"},{workpack_no:"E20002",title:"Pull & term cables between LV room PY1107 and Hvac Room PY1113",planned_mhr:250,completed_mhr:157,foreman:"John Doe"},{workpack_no:"E20003",title:"Pull & term cables between LV room PY1107 and Hvac Room PY1113",planned_mhr:250,completed_mhr:157,foreman:"Jane Doe"},{workpack_no:"E20004",title:"Pull & term cables between LV room PY1107 and Hvac Room PY1113",planned_mhr:250,completed_mhr:157,foreman:"John Doe"},{workpack_no:"E20005",title:"Pull & term cables between LV room PY1107 and Hvac Room PY1113",planned_mhr:250,completed_mhr:157,foreman:"Jane Doe"},{workpack_no:"E20006",title:"Pull & term cables between LV room PY1107 and Hvac Room PY1113",planned_mhr:250,completed_mhr:157,foreman:"John Doe"}]}}},$fsx.f[48]=(e,t)=>{var o;Object.defineProperty(t,"__esModule",{value:!0});const r=$fsx.r(11),l=$fsx.r(27),a=$fsx.r(22),n=$fsx.r(47);let s=class extends HTMLElement{render(){return a.html`
            <div class="flex flex-col">
                <span class="pl-2 font-semibold"
                    >${this.entity.workpack_no}</span
                >
                <span class="border-t cell-border pl-2 font-light"
                    >${this.entity.title}</span
                >
                <div class="flex flex-row">
                    <span class="pl-2 w-1/6 border-t cell-border font-light"
                        >${Math.round(this.entity.planned_mhr)}</span
                    >
                    <span
                        class="pl-2 w-1/6 border-l border-t cell-border font-light"
                        >${Math.round(this.entity.completed_mhr)}</span
                    >
                    <span
                        class="pl-2 w-5/6 border-l border-t cell-border font-light"
                        >${this.entity.foreman}</span
                    >
                </div>
            </div>
        `}};r.__decorate([l.property(),r.__metadata("design:type","function"==typeof(o=void 0!==n.IWorkpack&&n.IWorkpack)?o:Object)],s.prototype,"entity",void 0),s=r.__decorate([l.customElement("workpack-row")],s),t.default=s};