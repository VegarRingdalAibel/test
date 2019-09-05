$fsx.f[43]=(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});const o=$fsx.r(11),a=$fsx.r(22),l=$fsx.r(27),s=$fsx.r(39);$fsx.r(40),$fsx.r(42);const r=$fsx.r(41);let p=class extends HTMLElement{constructor(){super(...arguments),this.showFilter=!0,this.tagOp=[]}connectedCallback(){l.subscribe(r.events.RUN_FILTER,this,this.runFilter),l.subscribe(r.events.TOGGLE_FILTER,this,this.filterToggle)}disconnectedCallback(){l.unSubscribe(r.events.TOGGLE_FILTER,this),l.unSubscribe(r.events.RUN_FILTER,this)}async runFilter(){this.tagOp=await this.tagopService.getAll()}filterToggle(){this.showFilter=!this.showFilter}async activate(){this.tagopService=l.instance(s.TagopService)}render(){return a.html`
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
        `}};o.__decorate([l.property(),o.__metadata("design:type",Object)],p.prototype,"showFilter",void 0),o.__decorate([l.property(),o.__metadata("design:type",Array)],p.prototype,"tagOp",void 0),p=o.__decorate([l.customElement("tagop-route")],p),e.default=p},$fsx.f[39]=(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});e.TagopService=class{async getAll(){return[{tag:"T-GG886592.001",tagop:"PU",tagop_no:1,tagop_desc:"Pull cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:100,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"TF",tagop_no:1,tagop_desc:"Term from end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"TT",tagop_no:1,tagop_desc:"Term to end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"TC",tagop_no:1,tagop_desc:"test cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.002",tagop:"PU",tagop_no:1,tagop_desc:"Pull cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:100,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.002",tagop:"TF",tagop_no:1,tagop_desc:"Term from end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.002",tagop:"TT",tagop_no:1,tagop_desc:"Term to end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.002",tagop:"TC",tagop_no:1,tagop_desc:"test cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.003",tagop:"PU",tagop_no:1,tagop_desc:"Pull cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:100,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.003",tagop:"TF",tagop_no:1,tagop_desc:"Term from end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.003",tagop:"TT",tagop_no:1,tagop_desc:"Term to end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.003",tagop:"TC",tagop_no:1,tagop_desc:"test cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.001",tagop:"PU",tagop_no:1,tagop_desc:"Pull cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:100,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.001",tagop:"TF",tagop_no:1,tagop_desc:"Term from end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.001",tagop:"TT",tagop_no:1,tagop_desc:"Term to end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.001",tagop:"TC",tagop_no:1,tagop_desc:"test cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.002",tagop:"PU",tagop_no:1,tagop_desc:"Pull cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:100,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.002",tagop:"TF",tagop_no:1,tagop_desc:"Term from end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.002",tagop:"TT",tagop_no:1,tagop_desc:"Term to end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886752.002",tagop:"TC",tagop_no:1,tagop_desc:"test cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"PU",tagop_no:1,tagop_desc:"Pull cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:100,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"TF",tagop_no:1,tagop_desc:"Term from end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"TT",tagop_no:1,tagop_desc:"Term to end",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"},{tag:"T-GG886592.001",tagop:"TC",tagop_no:1,tagop_desc:"test cable",tag_desc:"BFOU P5/P12-1kV- 6x6MM2/6MM",plan_qty:1,compl_qty:0,workpack_no:"E20001",forman:"John Doe"}]}}},$fsx.f[40]=(t,e)=>{var o;Object.defineProperty(e,"__esModule",{value:!0});const a=$fsx.r(11),l=$fsx.r(27),s=$fsx.r(22),r=$fsx.r(39);let p=class extends HTMLElement{constructor(){super(...arguments),this.progress=!1}toggelProgress(){this.progress=!this.progress}render(){return s.html`
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
                        ${this.progress?"close":"open"}
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
                          <h1 class="p-1 pl-2 text-center underline">
                              Report progress
                          </h1>
                          <div class="flex flex-row p-1">
                              <label class="w-1/4"> forman: </label
                              ><select
                                  class="w-3/6 font-light text-sm pl-2 bg-gray-700"
                                  ><option>John Doe</option>
                                  <option>Jane Doe</option>
                                  ></select
                              >
                          </div>
                          <div class="flex flex-row p-1">
                              <label class="w-1/4"> date: </label
                              ><input
                                  type="date"
                                  class="w-3/6 font-light text-sm pl-2 bg-gray-700"
                              />
                          </div>
                          <div class="flex flex-row p-1">
                              <label class="w-1/4"> drum: </label
                              ><select
                                  class="w-3/6 font-light text-sm pl-2 bg-gray-700"
                                  ><option>T50001</option>
                                  <option>T50002</option></select
                              >
                          </div>
                          <div class="flex flex-row p-1">
                              <label class="w-1/4"> meter high: </label
                              ><input
                                  type="number"
                                  class="w-3/6 font-light text-sm pl-2 bg-gray-700"
                              />
                          </div>
                          <div class="flex flex-row p-1 pb-3">
                              <label class="w-1/4"> meter low: </label
                              ><input
                                  type="number"
                                  class="w-3/6 font-light text-sm pl-2 bg-gray-700"
                              />
                          </div>
                          <div class="flex flex-row p-1 pb-3">
                              <button class="w-3/6 default-buttons">
                                  report
                              </button>
                          </div>
                      </div>
                  `:""}
        `}};a.__decorate([l.property(),a.__metadata("design:type","function"==typeof(o=void 0!==r.ITagop&&r.ITagop)?o:Object)],p.prototype,"entity",void 0),a.__decorate([l.property(),a.__metadata("design:type",Object)],p.prototype,"progress",void 0),p=a.__decorate([l.customElement("tag-op-row")],p),e.default=p},$fsx.f[42]=(t,e)=>{var o;Object.defineProperty(e,"__esModule",{value:!0});const a=$fsx.r(11),l=$fsx.r(27),s=$fsx.r(22),r=$fsx.r(39),p=$fsx.r(41);let c=class extends HTMLElement{render(){return s.html`
            <div class="flex flex-row m-1">
                <div class="mr-1 w-1/4 flex flex-col">
                    <div class="mb-1 flex flex-col">
                        <label class="text-xs text-gray-600 bg-gray-800 pl-2"
                            >OP code:</label
                        >
                        <input
                            placeholder=""
                            class="flex-1 font-semibold pl-2 border-b border-gray-700 bg-gray-800"
                        />
                    </div>
                    <div class=" opacity-25 flex-grow bg-gray-800">
                        <div class="opacity-25 text-center"></div>
                    </div>
                </div>

                <div class="w-3/4 flex flex-col ">
                    <div class="mb-1 flex flex-col">
                        <label class="text-xs text-gray-600 bg-gray-800 pl-2"
                            >Tag:</label
                        >
                        <input
                            placeholder=""
                            class="flex-1 font-semibold pl-2 border-b border-gray-700 bg-gray-800"
                        />
                    </div>
                    <div class="flex flex-col">
                        <label class="text-xs text-gray-600 bg-gray-800 pl-2"
                            >Tag description/cable type:</label
                        >
                        <input
                            placeholder=""
                            class="flex-1 font-semibold pl-2 border-b border-gray-700 bg-gray-800"
                        />
                    </div>
                </div>
            </div>

            <div class="m-1 flex flex-row  ">
                <div class="mr-1 w-1/4 flex flex-row ">
                    <div class=" w-2/4 flex flex-col">
                        <label
                            class="text-xs text-gray-600 border-r border-gray-700 bg-gray-800 pl-2"
                            >C.Qty:</label
                        >
                        <input
                            placeholder=""
                            class="flex-1 font-semibold pl-2 border-r border-b border-gray-700 bg-gray-800"
                        />
                    </div>
                    <div class="w-2/4 flex flex-col">
                        <label class="text-xs text-gray-600 bg-gray-800 pl-2"
                            >P.Qty:</label
                        >
                        <input
                            placeholder=""
                            class="flex-1 font-semibold pl-2 border-b border-gray-700 bg-gray-800"
                        />
                    </div>
                </div>
                <div class="w-3/4 flex flex-col">
                    <label class="text-xs text-gray-600 bg-gray-800 pl-2"
                        >OP Description:</label
                    >
                    <input
                        placeholder=""
                        class="flex-1 font-semibold pl-2 border-b border-gray-700 bg-gray-800"
                    />
                </div>
            </div>

            <!--   have this as optional ? -->
            <div class="m-1 flex flex-row  ">
                <div class="mr-1 w-1/4 flex flex-col">
                    <label class="text-xs text-gray-600 bg-gray-800 pl-2"
                        >Workpack:</label
                    >
                    <input
                        placeholder=""
                        class="flex-1 font-semibold pl-2 border-b border-gray-700 bg-gray-800"
                    />
                </div>

                <div class="w-3/4 flex flex-col">
                    <label class="text-xs text-gray-600 bg-gray-800 pl-2"
                        >Foreman:</label
                    >
                    <input
                        placeholder=""
                        class="flex-1 font-semibold pl-2 border-b border-gray-700 bg-gray-800"
                    />
                </div>
            </div>
            <div class="flex flex-row pt-3">
                <button
                    @click=${()=>{l.publish(p.events.RUN_FILTER)}}
                    class="m-2 flex-1 default-buttons"
                >
                    filter
                </button>
                <button
                    @click=${()=>{l.publish(p.events.TOGGLE_FILTER)}}
                    class="m-2 flex-1 default-buttons"
                >
                    hide
                </button>
            </div>
        `}};a.__decorate([l.property(),a.__metadata("design:type","function"==typeof(o=void 0!==r.ITagop&&r.ITagop)?o:Object)],c.prototype,"entity",void 0),c=a.__decorate([l.customElement("tag-op-row-filter")],c),e.default=c};