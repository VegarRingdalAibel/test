import{c as b,d as a}from"./chunk.3N2YFPE7.js";var c=function(n,s={},o=null){n[0]==="#"&&(n=n.substr(1,n.length));let r=n.split("/").filter(t=>!!t),e="";r.forEach((t,f)=>{t[0]===":"&&s[t.substr(1,t.length)]!==void 0?e=e+s[t.substr(1,t.length)]:e=e+`${t}`,r.length-1!==f&&(e=e+"/")}),e=`#${e}`;let i;if(o){i=new URLSearchParams;for(let t in o)o[t]&&i.append(t,o[t]);location.hash=`${e}?${i.toString()}`}else location.hash=e},g=Object.defineProperty,m=Object.getOwnPropertyDescriptor,d=(n,s,o,r)=>{for(var e=r>1?void 0:r?m(s,o):s,i=n.length-1,t;i>=0;i--)(t=n[i])&&(e=(r?t(s,o,e):t(e))||e);return r&&e&&g(s,o,e),e},l=!1;function _(){return l}function p(){l=!1,c("")}var u=class extends HTMLElement{click(){l=!l,c("#child/protected")}render(){return a`
            <section>
                <h1>Auth component</h1>
                <button
                    class="m-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    @click=${this.click}
                >
                    ${_()?"logout":"login"}
                </button>
            </section>
        `}};u=d([b("login-route")],u);var A=u;export{_ as a,p as b,A as c,c as d};
