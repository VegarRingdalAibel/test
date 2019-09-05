$fsx.f[57]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),$fsx.r(31),$fsx.r(32),$fsx.r(55),$fsx.r(50),$fsx.r(56)},$fsx.f[31]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=$fsx.r(10),r=$fsx.r(27);$fsx.r(30).getRouter().cleanUp(!0),r.clearInstance(null),o.rerenderInnerHTML(),o.applyPolyfill(o.ReflowStrategy.NONE,0,e=>{console.log("updated",e)})},$fsx.f[55]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=$fsx.r(11),r=$fsx.r(22),s=$fsx.r(27);$fsx.r(53),$fsx.r(54);let n=class extends HTMLElement{render(){return r.html`
            <main-header class="main-header p-2 "></main-header>
            <free-router class="section-body " name="main"></free-router>
            <main-footer class="section-footer "></main-footer>
            <slide-in-menu class="slide-in-menu hidden-left "></slide-in-menu>
        `}};n=o.__decorate([s.customElement("app-root")],n),t.default=n},$fsx.f[53]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=$fsx.r(11),r=$fsx.r(27),s=$fsx.r(22),n=$fsx.r(35),i=$fsx.r(41);let a=class extends HTMLElement{constructor(){super(...arguments),this.project=""}connectedCallback(){r.subscribe(i.events.PROJECT_CHANGE,this,this.projectUpdate),r.subscribe(i.events.LOGIN,this,this.projectUpdate)}projectUpdate(){this.project=r.instance(n.App).project.selectedProject}disconnectedCallback(){r.unSubscribe(i.events.PROJECT_CHANGE,this)}render(){return s.html`
            <div class="flex flex-col center-items">
                <span class="text-sm text-center"
                    >Selected Project: ${this.project?this.project:"none"}
                </span>
            </div>
        `}};o.__decorate([r.property(),o.__metadata("design:type",String)],a.prototype,"project",void 0),a=o.__decorate([r.customElement("main-footer")],a),t.default=a},$fsx.f[35]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=$fsx.r(27),r=$fsx.r(33),s=$fsx.r(51),n=$fsx.r(52);t.App=class{constructor(){this.login=o.instance(r.Login),this.module=o.instance(s.Module),this.project=o.instance(n.project)}}},$fsx.f[33]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=$fsx.r(30),r=$fsx.r(50),s=$fsx.r(27),n=$fsx.r(41);t.Login=class{constructor(){this.__authenticated=!0}get isAuthenticated(){return this.__authenticated}signin(e){this.__authenticated=!0,requestAnimationFrame(()=>{o.goto(o.href(r.mainRouterConfig.project.id)),s.publish(n.events.LOGIN)})}signout(){this.__authenticated=!1,s.publish(n.events.LOGIN)}}},$fsx.f[50]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=$fsx.r(30),r=$fsx.r(27),s=$fsx.r(33);t.mainRouterConfig={project:{title:"Project Selector",id:"1",componentName:"project-route",path:"project"},login:{title:"Login",id:"2",componentName:"login-route",path:"login"},moduleSelector:{title:"Module Selector",id:"3",componentName:"module-selector-route",path:"module-selector"},tagOp:{title:"Tag Operations",id:"4",componentName:"tagop-route",path:"tagop"},drum:{title:"Drum",id:"5",componentName:"drum-route",path:"drum"},workpack:{title:"Workpack",id:"6",componentName:"workpack-route",path:"workpack"}},o.unknowRouteHandler(()=>{o.goto(o.href(t.mainRouterConfig.project.id))}),o.authRouteHandler(()=>{return!!r.instance(s.Login).isAuthenticated||(o.goto(o.href(t.mainRouterConfig.login.id)),!1)}),o.addRouterConfig("main",[{path:t.mainRouterConfig.project.path,name:t.mainRouterConfig.project.id,load:()=>Promise.resolve().then(()=>$fsx.r(36)),isAuth:!0,isNav:!0,componentName:t.mainRouterConfig.project.componentName},{path:t.mainRouterConfig.login.path,name:t.mainRouterConfig.login.id,load:()=>Promise.resolve().then(()=>$fsx.r(37)),isAuth:!1,isNav:!1,componentName:t.mainRouterConfig.login.componentName},{path:t.mainRouterConfig.moduleSelector.path,name:t.mainRouterConfig.moduleSelector.id,load:()=>Promise.resolve().then(()=>$fsx.r(38)),isAuth:!0,isNav:!1,componentName:t.mainRouterConfig.moduleSelector.componentName},{path:t.mainRouterConfig.tagOp.path,name:t.mainRouterConfig.tagOp.id,load:()=>Promise.resolve().then(()=>$fsx.r(43)),isAuth:!0,isNav:!1,componentName:t.mainRouterConfig.tagOp.componentName},{path:t.mainRouterConfig.drum.path,name:t.mainRouterConfig.drum.id,load:()=>Promise.resolve().then(()=>$fsx.r(46)),isAuth:!0,isNav:!1,componentName:t.mainRouterConfig.drum.componentName},{path:t.mainRouterConfig.workpack.path,name:t.mainRouterConfig.workpack.id,load:()=>Promise.resolve().then(()=>$fsx.r(49)),isAuth:!0,isNav:!1,componentName:t.mainRouterConfig.workpack.componentName}])},$fsx.f[41]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.TOGGLE_FILTER="TOGGLE_FILTER",e.LOGIN="LOGIN",e.PROJECT_CHANGE="PROJECT_CHANGE",e.TOGGLE_SIDE_MENU="TOGGLE_SIDE_MENU",e.RUN_FILTER="RUN_FILTER"}(t.events||(t.events={}))},$fsx.f[51]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=$fsx.r(50),r=$fsx.r(30);t.Modules=[{id:1,title:"Tag Operations",routerID:o.mainRouterConfig.tagOp.id,description:"Manual Search",qr:!1},{id:3,title:"Workpack",routerID:o.mainRouterConfig.workpack.id,description:"Manual Search",qr:!1},{id:5,title:"Drum",routerID:o.mainRouterConfig.drum.id,description:"Manual Search",qr:!1},{id:2,title:"Tag Operations",routerID:o.mainRouterConfig.tagOp.id,description:"QR code scanning",qr:!0},{id:4,title:"Workpack",routerID:o.mainRouterConfig.workpack.id,description:"QR code scanning",qr:!0},{id:6,title:"Drum",routerID:o.mainRouterConfig.drum.id,description:"QR code scanning",qr:!0}];t.Module=class{constructor(){this.__selectedModule=null}getModules(){return t.Modules}get selectedModule(){return this.__selectedModule}selectModule(e){t.Modules.forEach(t=>{e===t.id&&(this.__selectedModule=e,r.goto(r.href(t.routerID)))})}}},$fsx.f[52]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=$fsx.r(50),r=$fsx.r(30),s=$fsx.r(27),n=$fsx.r(41);t.project=class{constructor(){this.__currentProject=null,this.__setAsDefault=!1}selectProject(e,t){this.__currentProject=e,this.__setAsDefault=t,s.publish(n.events.PROJECT_CHANGE),r.goto(r.href(o.mainRouterConfig.moduleSelector.id))}get selectedProject(){return this.__currentProject}get isDefaultProject(){return this.__setAsDefault}}},$fsx.f[54]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=$fsx.r(11),r=$fsx.r(27),s=$fsx.r(22),n=$fsx.r(33),i=$fsx.r(41);let a=class extends HTMLElement{constructor(){super(),this.login=r.instance(n.Login)}connectedCallback(){r.subscribe(i.events.LOGIN,this,()=>{this.render()})}disconnectedCallback(){r.unSubscribe(i.events.LOGIN,this)}render(){return s.html`
            <div class="flex flex-row text-2xl">
                ${this.login.isAuthenticated?s.html`
                          <div
                              class="mr-auto pl-3 pt-1"
                              @click=${()=>{r.publish(i.events.TOGGLE_SIDE_MENU)}}
                          >
                              ${s.svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="white" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`}
                          </div>
                      `:""}
                <h1 class="text-xl  font-bold ml-5">Company Name</h1>
                ${this.login.isAuthenticated?s.html`
                          <a
                              class="ml-auto pr-3 pt-1"
                              href="#"
                              onclick="history.back();return false;"
                          >
                              ${s.svg`<div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path path fill="white" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg></div>`}</a
                          >
                      `:""}
            </div>
        `}};a=o.__decorate([r.customElement("main-header"),o.__metadata("design:paramtypes",[])],a),t.default=a},$fsx.f[56]=(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=$fsx.r(11),r=$fsx.r(22),s=$fsx.r(27);$fsx.r(53),$fsx.r(54);const n=$fsx.r(41);let i=class extends HTMLElement{connectedCallback(){s.subscribe(n.events.TOGGLE_SIDE_MENU,this,this.toggle)}disconnectedCallback(){s.unSubscribe(n.events.TOGGLE_SIDE_MENU,this)}toggle(){this.classList.contains("hidden-left")?this.classList.remove("hidden-left"):this.classList.add("hidden-left")}render(){return r.html`
            <div
                class="w-4/6 section-container bg-gray-900 shadow-2xl border-r border-gray-700"
            >
                <div class="main-header text-2xl p-1 center-items">
                    <h1 class="center-text">Menu</h1>
                </div>
                <div class="section-body">body</div>
                <div class="section-footer">Awesome menu</div>
            </div>
            <div
                @click=${()=>{s.publish(n.events.TOGGLE_SIDE_MENU)}}
                class="w-2/6 bg-gray-800  opacity-0"
            ></div>
        `}};i=o.__decorate([s.customElement("slide-in-menu")],i),t.default=i},$fsx.r(57);