$fsx.f[46]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=$fsx.r(12),s=$fsx.r(23),i=$fsx.r(28),o=$fsx.r(44);$fsx.r(45);let l=class extends HTMLElement{async activate(){this.drumService=i.instance(o.DrumService),this.drums=await this.drumService.getAll()}render(){return s.html`
            <div class="section-header  flex flex-col items-center">
                <h1 class=" text-xl">
                    Drums
                </h1>
            </div>
            <div class="section-body">
                ${this.drums.map(e=>s.html`
                        <drum-row
                            class="flex flex-col  section-body-row"
                            .entity=${e}
                            >ent.drum</drum-row
                        >
                    `)}
            </div>
            <div class="section-footer ">
                <button disabled class="default-buttons m-2">Filter</button>
            </div>
        `}};l=r.__decorate([i.customElement("drum-route")],l),t.default=l},$fsx.f[44]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});t.DrumService=class{async getAll(){return[{drum:"T-JS3001",description:"BFOU P5/P12-1kV- 6x6MM2/6MM",recived:500,left:458,location:"some thing..."},{drum:"T-JS3001",description:"BFOU P5/P12-1kV- 6x6MM2/6MM",recived:500,left:458,location:"some thing..."},{drum:"T-JS3001",description:"BFOU P5/P12-1kV- 6x6MM2/6MM",recived:500,left:458,location:"some thing..."},{drum:"T-JS3001",description:"BFOU P5/P12-1kV- 6x6MM2/6MM",recived:500,left:458,location:"some thing..."},{drum:"T-JS3001",description:"BFOU P5/P12-1kV- 6x6MM2/6MM",recived:500,left:458,location:"some thing..."},{drum:"T-JS3001",description:"BFOU P5/P12-1kV- 6x6MM2/6MM",recived:500,left:458,location:"some thing..."},{drum:"T-JS3001",description:"BFOU P5/P12-1kV- 6x6MM2/6MM",recived:500,left:458,location:"some thing..."},{drum:"T-JS3001",description:"BFOU P5/P12-1kV- 6x6MM2/6MM",recived:500,left:458,location:"some thing..."}]}}},$fsx.f[45]=(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0});const s=$fsx.r(12),i=$fsx.r(28),o=$fsx.r(23),l=$fsx.r(44);let d=class extends HTMLElement{render(){return o.html`
            <div class="flex flex-col">
                <span class="pl-2 font-semibold">${this.entity.drum}</span>
                <span class="border-t cell-border pl-2 font-light"
                    >${this.entity.description}</span
                >
                <div class="flex flex-row">
                    <span class="pl-2 w-1/6 border-t cell-border font-light"
                        >${Math.round(this.entity.recived)}</span
                    >
                    <span
                        class="pl-2 w-1/6 border-l border-t cell-border font-light"
                        >${Math.round(this.entity.left)}</span
                    >
                    <span
                        class="pl-2 w-5/6 border-l border-t cell-border font-light"
                        >${this.entity.location}</span
                    >
                </div>
            </div>
        `}};s.__decorate([i.property(),s.__metadata("design:type","function"==typeof(r=void 0!==l.IDrum&&l.IDrum)?r:Object)],d.prototype,"entity",void 0),d=s.__decorate([i.customElement("drum-row")],d),t.default=d};