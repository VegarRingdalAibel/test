import{a,b as p,c as f,d as n}from"./chunk.SR7GRLS5.js";import"./chunk.K5OJMX56.js";import"./chunk.32AVIKSE.js";import{c as h,d as r}from"./chunk.3N2YFPE7.js";var d=Object.defineProperty,g=Object.getOwnPropertyDescriptor,b=(t,o,l,s)=>{for(var e=s>1?void 0:s?g(o,l):o,i=t.length-1,m;i>=0;i--)(m=t[i])&&(e=(s?m(o,l,e):m(e))||e);return s&&e&&d(o,l,e),e},u=a.child.children,c=class extends HTMLElement{connectedCallback(){f(this,this.render)}render(){return r`
            <ul class="ani flex bg-indigo-500 p-6">
                ${p("sub").map(t=>t.isNav?r`
                            <li class="mr-6">
                                <a class="text-green-200 hover:text-white" href="${t.href}"
                                    >${t.title}</a
                                >
                            </li>
                        `:"")}
            </ul>

            ${n(u.subHome.path,()=>import("./_dist_/routes/home.js"),r` <home-route></home-route> `)}
            ${n(u.subSettings.path,()=>import("./_dist_/routes/settings.js"),r` <settings-route></settings-route> `)}
            ${n(u.protected.path,()=>import("./_dist_/routes/protected.js"),r` <protected-route></protected-route> `)}
        `}};c=b([h("childrouter-route")],c);var _=c;export{_ as default};
