$fsx.f[43]=(t,o)=>{Object.defineProperty(o,"__esModule",{value:!0});const e=$fsx.r(12),a=$fsx.r(23),l=$fsx.r(28),r=$fsx.r(40);$fsx.r(41),$fsx.r(42);let s=class extends HTMLElement{constructor(){super(...arguments),this.showFilter=!1,this.tagOp=[]}connectedCallback(){l.subscribe("toggleFilter",this,this.filterToggle.bind(this))}disconnectedCallback(){l.unSubscribe("toggleFilter",this)}filterToggle(){this.showFilter=!this.showFilter}async activate(){this.tagopService=l.instance(r.TagopService),this.tagOp=await this.tagopService.getAll()}render(){return a.html`
            <div class="section-header  flex flex-col items-center">
                <h1 class=" text-xl text-white">
                    Tag operations
                </h1>
                ${this.showFilter?a.html`
                          <span>Filter:<span></span></span>
                      `:""}
                ${this.showFilter?a.html`
                          <tag-op-row-filter
                              class="section-body-row"
                          ></tag-op-row-filter>
                      `:""}
            </div>

            <div class="section-body">
                ${this.tagOp.map(t=>a.html`
                        <tag-op-row
                            class="flex flex-col  section-body-row"
                            .entity=${t}
                        ></tag-op-row>
                    `)}
            </div>

            <div class="section-footer ">
                <button @click=${this.filterToggle} class="default-buttons m-2">
                    Filter
                </button>
            </div>
        `}};e.__decorate([l.property(),e.__metadata("design:type",Object)],s.prototype,"showFilter",void 0),e.__decorate([l.property(),e.__metadata("design:type",Array)],s.prototype,"tagOp",void 0),s=e.__decorate([l.customElement("tagop-route")],s),o.default=s},$fsx.f[40]=(t,o)=>{Object.defineProperty(o,"__esModule",{value:!0});o.TagopService=class{async getAll(){return[{tag:"T-GG886592.001",tagop:"PU",tagop_no:1,tagop_desc:"Pull cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:100,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"TF",tagop_no:1,tagop_desc:"Term from end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"TT",tagop_no:1,tagop_desc:"Term to end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"TC",tagop_no:1,tagop_desc:"test cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.002",tagop:"PU",tagop_no:1,tagop_desc:"Pull cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:100,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.002",tagop:"TF",tagop_no:1,tagop_desc:"Term from end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.002",tagop:"TT",tagop_no:1,tagop_desc:"Term to end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.002",tagop:"TC",tagop_no:1,tagop_desc:"test cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.003",tagop:"PU",tagop_no:1,tagop_desc:"Pull cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:100,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.003",tagop:"TF",tagop_no:1,tagop_desc:"Term from end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.003",tagop:"TT",tagop_no:1,tagop_desc:"Term to end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.003",tagop:"TC",tagop_no:1,tagop_desc:"test cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.001",tagop:"PU",tagop_no:1,tagop_desc:"Pull cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:100,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.001",tagop:"TF",tagop_no:1,tagop_desc:"Term from end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.001",tagop:"TT",tagop_no:1,tagop_desc:"Term to end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.001",tagop:"TC",tagop_no:1,tagop_desc:"test cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.002",tagop:"PU",tagop_no:1,tagop_desc:"Pull cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:100,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.002",tagop:"TF",tagop_no:1,tagop_desc:"Term from end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.002",tagop:"TT",tagop_no:1,tagop_desc:"Term to end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.002",tagop:"TC",tagop_no:1,tagop_desc:"test cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"PU",tagop_no:1,tagop_desc:"Pull cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:100,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"TF",tagop_no:1,tagop_desc:"Term from end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"TT",tagop_no:1,tagop_desc:"Term to end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"TC",tagop_no:1,tagop_desc:"test cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"}]}}},$fsx.f[41]=(t,o)=>{var e;Object.defineProperty(o,"__esModule",{value:!0});const a=$fsx.r(12),l=$fsx.r(28),r=$fsx.r(23),s=$fsx.r(40);let n=class extends HTMLElement{render(){return r.html`
            <div class="flex flex-row">
                <div class="w-1/4 flex flex-col">
                    <span class="flex-grow text-center font-bold text-2xl">
                        ${this.entity.tagop}
                    </span>
                </div>

                <div class="w-3/4 flex flex-col border-l cell-border">
                    <span class="flex-1 font-semibold pl-2 "
                        >${this.entity.tag}
                    </span>
                    <span class="flex-1 font-light text-sm pl-2 "
                        >${this.entity.tag_desc}
                    </span>
                </div>
            </div>

            <div class="flex flex-row">
                <div class="w-1/4 flex flex-row border-t cell-border">
                    <span class="flex-1 text-center ">
                        ${this.entity.plan_qty}
                    </span>
                    <span class="flex-1 text-center border-l cell-border">
                        ${this.entity.compl_qty}
                    </span>
                </div>
                <span
                    class="w-3/4 font-light text-sm pl-2 border-l border-t cell-border"
                    >${this.entity.tagop_desc}
                </span>
            </div>

            <!--   have this as optional ? -->
            <div class="flex flex-row">
                <span
                    class="w-1/4 font-light text-sm pl-2 border-t cell-border"
                >
                    ${this.entity.workpack_no}
                </span>
                <span
                    class="w-3/4 font-light text-sm pl-2 border-l border-t cell-border"
                >
                    ${this.entity.forman}
                </span>
            </div>
        `}};a.__decorate([l.property(),a.__metadata("design:type","function"==typeof(e=void 0!==s.ITagop&&s.ITagop)?e:Object)],n.prototype,"entity",void 0),n=a.__decorate([l.customElement("tag-op-row")],n),o.default=n},$fsx.f[42]=(t,o)=>{var e;Object.defineProperty(o,"__esModule",{value:!0});const a=$fsx.r(12),l=$fsx.r(28),r=$fsx.r(23),s=$fsx.r(40);let n=class extends HTMLElement{render(){return r.html`
            <div class="flex flex-row m-1 ">
                <div class="w-1/4 flex flex-col">
                    <input
                        placeholder="op"
                        class="flex-grow text-center font-bold text-2xl border-gray-800 bg-gray-700"
                    />
                </div>

                <div class="w-3/4 flex flex-col border-l border-gray-800">
                    <input
                        placeholder="tag"
                        class="flex-1 font-semibold pl-2 border-gray-800 bg-gray-700"
                    />
                    <input
                        placeholder="tag desc"
                        class="flex-1 font-light text-sm pl-2 border-gray-800 bg-gray-700"
                    />
                </div>
            </div>

            <div class="flex flex-row m-1  ">
                <div class="w-1/4 flex flex-row border-t border-gray-800">
                    <input
                        placeholder="plan"
                        class="w-2/4  text-center border-gray-800 bg-gray-700"
                    />
                    <input
                        placeholder="comp"
                        class="w-2/4  text-center border-l border-gray-800 bg-gray-700"
                    />
                </div>
                <input
                    placeholder="op desc"
                    class="w-3/4 font-light text-sm pl-2 border-l border-t border-gray-800 bg-gray-700 "
                />
            </div>

            <!--   have this as optional ? -->
            <div class="flex flex-row m-1 ">
                <input
                    placeholder="workpack"
                    class="w-1/4 font-light text-sm pl-2 border-t border-gray-800 bg-gray-700"
                />

                <input
                    placeholder="foreman"
                    class="w-3/4 font-light text-sm pl-2 border-l border-t border-gray-800 bg-gray-700"
                />
            </div>
            <div class="flex flex-row">
                <button
                    @click=${()=>{l.publish("toggleFilter")}}
                    class="m-1 flex-1 default-buttons"
                >
                    run filter
                </button>
                <div></div>
            </div>
        `}};a.__decorate([l.property(),a.__metadata("design:type","function"==typeof(e=void 0!==s.ITagop&&s.ITagop)?e:Object)],n.prototype,"entity",void 0),n=a.__decorate([l.customElement("tag-op-row-filter")],n),o.default=n};