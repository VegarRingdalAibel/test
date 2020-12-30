import{b as v,c as w,d as f,e as S}from"./chunk.K5OJMX56.js";import"./chunk.32AVIKSE.js";import{c as g,d as b}from"./chunk.3N2YFPE7.js";function c(e,n){w(f,e,n)}function u(e){v(f,e)}var a=function(e){S.push(e)},m=Object.defineProperty,d=Object.getOwnPropertyDescriptor,_=(e,n,i,s)=>{for(var t=s>1?void 0:s?d(n,i):n,r=e.length-1,o;r>=0;r--)(o=e[r])&&(t=(s?o(n,i,t):o(t))||t);return s&&t&&m(n,i,t),t},l=class extends HTMLElement{constructor(){super(...arguments);this.locked=!1}connectedCallback(){c(this,function(){console.log("trigger settings event",this.counter),a(new Promise(e=>{this.locked?(alert("sorry"),e(!1)):e(!0),console.log("stopevent")}))})}disconnectedCallback(){u(this)}clicker(){this.locked=!this.locked}render(){return b`
            <section>
                <h1>Settings</h1>
                <br />
                Locked:<input type="checkbox" @click=${this.clicker} .checked=${this.locked} />
            </section>
        `}};l=_([g("settings-route")],l);var h=l;export{h as default};
