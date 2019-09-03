$fsx.f[43]=(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});const o=$fsx.r(11),a=$fsx.r(22),r=$fsx.r(27),s=$fsx.r(39);$fsx.r(40),$fsx.r(42);const l=$fsx.r(41);let n=class extends HTMLElement{constructor(){super(...arguments),this.showFilter=!0,this.tagOp=[]}connectedCallback(){r.subscribe(l.events.RUN_FILTER,this,this.runFilter),r.subscribe(l.events.TOGGLE_FILTER,this,this.filterToggle)}disconnectedCallback(){r.unSubscribe(l.events.TOGGLE_FILTER,this),r.unSubscribe(l.events.RUN_FILTER,this)}async runFilter(){this.tagOp=await this.tagopService.getAll()}filterToggle(){this.showFilter=!this.showFilter}async activate(){this.tagopService=r.instance(s.TagopService)}render(){return a.html`
            <div class="section-header  flex flex-col items-center">
                <h1 class=" text-xl text-white">
                    Tag operations
                </h1>

                <!--   filter and its header -->
                ${this.showFilter?a.html`
                          <div class="text-sm">Filter</div>
                      `:""}
                ${this.showFilter?a.html`
                          <tag-op-row-filter
                              class="section-filter-row bg-gray-700 pt-1"
                          >
                          </tag-op-row-filter>
                      `:""}

                <!--  header -->
                ${this.tagOp.length?a.html`
                          <div class="text-sm">(${this.tagOp.length})</div>
                      `:""}
            </div>

            <div class="section-body">
                ${this.tagOp.length?"":a.html`
                          <div class="bg-gray-700 text-center m-10 p-1">
                              Nothing to display
                          </div>
                      `}
                ${this.tagOp.map(t=>a.html`
                        <tag-op-row
                            class="flex flex-col section-body-row"
                            .entity=${t}
                        ></tag-op-row>
                    `)}
            </div>

            <div class="section-footer ">
                ${this.showFilter?"":a.html`
                          <button
                              @click=${this.filterToggle}
                              class="default-buttons m-2"
                          >
                              filter
                          </button>
                      `}
            </div>
        `}};o.__decorate([r.property(),o.__metadata("design:type",Object)],n.prototype,"showFilter",void 0),o.__decorate([r.property(),o.__metadata("design:type",Array)],n.prototype,"tagOp",void 0),n=o.__decorate([r.customElement("tagop-route")],n),e.default=n},$fsx.f[39]=(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});e.TagopService=class{async getAll(){return[{tag:"T-GG886592.001",tagop:"PU",tagop_no:1,tagop_desc:"Pull cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:100,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"TF",tagop_no:1,tagop_desc:"Term from end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"TT",tagop_no:1,tagop_desc:"Term to end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"TC",tagop_no:1,tagop_desc:"test cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.002",tagop:"PU",tagop_no:1,tagop_desc:"Pull cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:100,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.002",tagop:"TF",tagop_no:1,tagop_desc:"Term from end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.002",tagop:"TT",tagop_no:1,tagop_desc:"Term to end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.002",tagop:"TC",tagop_no:1,tagop_desc:"test cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.003",tagop:"PU",tagop_no:1,tagop_desc:"Pull cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:100,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.003",tagop:"TF",tagop_no:1,tagop_desc:"Term from end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.003",tagop:"TT",tagop_no:1,tagop_desc:"Term to end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.003",tagop:"TC",tagop_no:1,tagop_desc:"test cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.001",tagop:"PU",tagop_no:1,tagop_desc:"Pull cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:100,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.001",tagop:"TF",tagop_no:1,tagop_desc:"Term from end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.001",tagop:"TT",tagop_no:1,tagop_desc:"Term to end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.001",tagop:"TC",tagop_no:1,tagop_desc:"test cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.002",tagop:"PU",tagop_no:1,tagop_desc:"Pull cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:100,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.002",tagop:"TF",tagop_no:1,tagop_desc:"Term from end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.002",tagop:"TT",tagop_no:1,tagop_desc:"Term to end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.002",tagop:"TC",tagop_no:1,tagop_desc:"test cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"PU",tagop_no:1,tagop_desc:"Pull cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:100,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"TF",tagop_no:1,tagop_desc:"Term from end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"TT",tagop_no:1,tagop_desc:"Term to end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"TC",tagop_no:1,tagop_desc:"test cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"}]}}},$fsx.f[40]=(t,e)=>{var o;Object.defineProperty(e,"__esModule",{value:!0});const a=$fsx.r(11),r=$fsx.r(27),s=$fsx.r(22),l=$fsx.r(39);let n=class extends HTMLElement{constructor(){super(...arguments),this.progress=!1}toggelProgress(){this.progress=!this.progress}render(){return s.html`
            <div class="flex flex-row">
                <div class="w-1/4 flex flex-col">
                    <span
                        class="flex-grow text-center font-bold text align-middle "
                        @click=${this.toggelProgress}
                    >
                        ${this.entity.tagop}
                    </span>
                    <button
                        @click=${this.toggelProgress}
                        class="text-sm bg-teal-800 text-white font-bold m-1 "
                    >
                        (report)
                    </button>
                </div>

                <div class="w-3/4 flex flex-col border-l cell-border">
                    <span class="flex-1 font-semibold pl-2 align-middle"
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

            ${this.progress?s.html`
                      <div class="flex flex-col border-t cell-border">
                          <h1 class="p-1 pl-2 ">Report progress</h1>
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                      </div>
                  `:""}
        `}};a.__decorate([r.property(),a.__metadata("design:type","function"==typeof(o=void 0!==l.ITagop&&l.ITagop)?o:Object)],n.prototype,"entity",void 0),a.__decorate([r.property(),a.__metadata("design:type",Object)],n.prototype,"progress",void 0),n=a.__decorate([r.customElement("tag-op-row")],n),e.default=n},$fsx.f[42]=(t,e)=>{var o;Object.defineProperty(e,"__esModule",{value:!0});const a=$fsx.r(11),r=$fsx.r(27),s=$fsx.r(22),l=$fsx.r(39),n=$fsx.r(41);let p=class extends HTMLElement{render(){return s.html`
            <div class="flex flex-row m1">
                <div class="w-1/4 flex flex-col">
                    <input
                        placeholder="OP"
                        class="flex-grow text-center font-bold text border-gray-700 bg-gray-800"
                    />
                    <div class="bg-gray-800">
                        <div class="opacity-0">empty</div>
                    </div>
                </div>

                <div class="w-3/4 flex flex-col border-l border-gray-700">
                    <input
                        placeholder="Tag"
                        class="flex-1 font-semibold pl-2 border-gray-700 bg-gray-800"
                    />
                    <input
                        placeholder="Tag description/cable type"
                        class="flex-1 font-light text-sm pl-2 border-gray-700 bg-gray-800"
                    />
                </div>
            </div>

            <div class="flex flex-row  ">
                <div class="w-1/4 flex flex-row border-t border-gray-700">
                    <input
                        placeholder="P.Qty"
                        class="w-2/4  text-sm text-center border-gray-700 bg-gray-800"
                    />
                    <input
                        placeholder="C.Qty"
                        class="w-2/4  text-sm text-center border-l border-gray-700 bg-gray-800"
                    />
                </div>
                <input
                    placeholder="OP Description"
                    class="w-3/4 font-light text-sm pl-2 border-l border-t border-gray-700 bg-gray-800 "
                />
            </div>

            <!--   have this as optional ? -->
            <div class="flex flex-row  ">
                <input
                    placeholder="Workpack"
                    class="w-1/4 font-light text-sm pl-2 border-t border-gray-700 bg-gray-800"
                />

                <input
                    placeholder="Foreman"
                    class="w-3/4 font-light text-sm pl-2 border-l border-t border-gray-700 bg-gray-800"
                />
            </div>
            <div class="flex flex-row pt-3">
                <button
                    @click=${()=>{r.publish(n.events.RUN_FILTER)}}
                    class="m-2 flex-1 default-buttons"
                >
                    filter
                </button>
                <button
                    @click=${()=>{r.publish(n.events.TOGGLE_FILTER)}}
                    class="m-2 flex-1 default-buttons"
                >
                    hide
                </button>
            </div>
        `}};a.__decorate([r.property(),a.__metadata("design:type","function"==typeof(o=void 0!==l.ITagop&&l.ITagop)?o:Object)],p.prototype,"entity",void 0),p=a.__decorate([r.customElement("tag-op-row-filter")],p),e.default=p};