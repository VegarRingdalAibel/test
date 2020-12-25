(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{101:function(e,t,c){"use strict";c.r(t);c(26);var o=c(7),n=c(18),s=c(0);let r,i=e=>e;var l=Object.defineProperty,d=Object.getOwnPropertyDescriptor;let h=class extends HTMLElement{constructor(){super(...arguments),this.locked=!1}connectedCallback(){Object(s.f)(this,(function(){console.log("trigger settings event",this.counter),Object(s.e)(new Promise((e=>{this.locked?(alert("sorry"),e(!1)):e(!0),console.log("stopevent")})))}))}disconnectedCallback(){Object(s.g)(this)}clicker(){this.locked=!this.locked}render(){return Object(o.a)(r||(r=i`
            <section>
                <h1>Settings</h1>
                <br />
                Locked:<input type="checkbox" @click=${0} .checked=${0} />
            </section>
        `),this.clicker,this.locked)}};h=((e,t,c,o)=>{for(var n,s=o>1?void 0:o?d(t,c):t,r=e.length-1;r>=0;r--)(n=e[r])&&(s=(o?n(t,c,s):n(s))||s);return o&&s&&l(t,c,s),s})([Object(n.a)("settings-route")],h),t.default=h}}]);