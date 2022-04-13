import{S as x,i as ee,s as te,e as u,t as U,c as h,a as y,h as Y,d as n,b as s,g as R,F as i,E as H,G as pe,f as ce,H as J,I as se,J as X,k as S,K as de,m as D,L as _e,M as W,N as ve,w as ue,x as he,y as fe,q as Q,o as B,B as me,O as be,P as ke,Q as ye,p as Me,v as we,R as Ce,T as Ee,n as Ie}from"../chunks/index-bbc8ee63.js";import{w as $e}from"../chunks/index-b66b148c.js";function Le(r){let e,t,o,a,f;return{c(){e=u("footer"),t=u("div"),o=U(`This work licensed under
    `),a=u("a"),f=U("CC BY-NC-SA 4.0"),this.h()},l(l){e=h(l,"FOOTER",{class:!0});var c=y(e);t=h(c,"DIV",{class:!0});var _=y(t);o=Y(_,`This work licensed under
    `),a=h(_,"A",{href:!0,class:!0});var E=y(a);f=Y(E,"CC BY-NC-SA 4.0"),E.forEach(n),_.forEach(n),c.forEach(n),this.h()},h(){s(a,"href","https://creativecommons.org/licenses/by-nc-sa/4.0"),s(a,"class","svelte-dy6fjt"),s(t,"class","svelte-dy6fjt"),s(e,"class","svelte-dy6fjt")},m(l,c){R(l,e,c),i(e,t),i(t,o),i(t,a),i(a,f)},p:H,i:H,o:H,d(l){l&&n(e)}}}class Pe extends x{constructor(e){super(),ee(this,e,null,Le,te,{})}}const Ne=()=>{const r=pe("__svelte__");return{page:{subscribe:r.page.subscribe},navigating:{subscribe:r.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:r.navigating.subscribe}},session:r.session,updated:r.updated}},ge={subscribe(r){return Ne().page.subscribe(r)}};function Te(){const{subscribe:r,set:e,update:t}=$e("");return{subscribe:r,toggle:()=>t(o=>o==="light"||o===""?"dark":"light"),setLightMode:()=>e("light"),setDarkMode:()=>e("dark"),setMode:o=>e(o),reset:()=>e("")}}const F=Te();function oe(r,e,t){const o=r.slice();return o[6]=e[t],o[8]=t,o}function le(r){let e,t=r[6].name+"",o,a,f;return{c(){e=u("a"),this.h()},l(l){e=h(l,"A",{class:!0,tabindex:!0,style:!0,"sveltekit:prefetch":!0,href:!0});var c=y(e);c.forEach(n),this.h()},h(){s(e,"class","nav-item svelte-c1vu3p"),s(e,"tabindex","0"),ce(e,"transition-delay",r[8]*32+"ms"),s(e,"sveltekit:prefetch",""),s(e,"href",o=r[6].link),J(e,"active",r[6].link===r[1].url.pathname)},m(l,c){R(l,e,c),e.innerHTML=t,a||(f=se(e,"click",r[4]),a=!0)},p(l,c){c&10&&J(e,"active",l[6].link===l[1].url.pathname)},d(l){l&&n(e),a=!1,f()}}}function ae(r){let e,t,o,a,f;return{c(){e=u("button"),t=u("img"),this.h()},l(l){e=h(l,"BUTTON",{class:!0,id:!0,style:!0});var c=y(e);t=h(c,"IMG",{src:!0,alt:!0,height:!0,width:!0,class:!0}),c.forEach(n),this.h()},h(){X(t.src,o="/icons/"+(r[2]==="dark"?"sun":"moon")+".svg")||s(t,"src",o),s(t,"alt","toggle dark mode"),s(t,"height","24"),s(t,"width","24"),s(t,"class","svelte-c1vu3p"),s(e,"class","nav-item svelte-c1vu3p"),s(e,"id","color-mode-toggle"),ce(e,"transition-delay",r[3].length*32+"ms")},m(l,c){R(l,e,c),i(e,t),a||(f=se(e,"click",F.toggle),a=!0)},p(l,c){c&4&&!X(t.src,o="/icons/"+(l[2]==="dark"?"sun":"moon")+".svg")&&s(t,"src",o)},d(l){l&&n(e),a=!1,f()}}}function qe(r){let e,t,o,a,f,l,c,_,E,w,V,K,v,M,j,L,I,q,P,N,C,b,m=r[3],d=[];for(let g=0;g<m.length;g+=1)d[g]=le(oe(r,m,g));let k=r[1].url.pathname!="/portfolio"&&ae(r);return{c(){e=u("link"),t=u("link"),o=S(),a=u("header"),f=u("div"),l=u("a"),c=u("img"),E=S(),w=u("img"),K=S(),v=u("nav"),M=u("div");for(let g=0;g<d.length;g+=1)d[g].c();j=S(),k&&k.c(),L=S(),I=u("button"),q=u("div"),P=S(),N=u("div"),this.h()},l(g){const $=de('[data-svelte="svelte-1y4vmbx"]',document.head);e=h($,"LINK",{rel:!0,href:!0,as:!0}),t=h($,"LINK",{rel:!0,href:!0,as:!0}),$.forEach(n),o=D(g),a=h(g,"HEADER",{id:!0,class:!0});var p=y(a);f=h(p,"DIV",{id:!0,class:!0});var T=y(f);l=h(T,"A",{href:!0});var G=y(l);c=h(G,"IMG",{id:!0,src:!0,alt:!0,height:!0,width:!0}),E=D(G),w=h(G,"IMG",{id:!0,src:!0,alt:!0,height:!0,width:!0,class:!0}),G.forEach(n),T.forEach(n),K=D(p),v=h(p,"NAV",{class:!0});var O=y(v);M=h(O,"DIV",{class:!0});var z=y(M);for(let Z=0;Z<d.length;Z+=1)d[Z].l(z);j=D(z),k&&k.l(z),z.forEach(n),L=D(O),I=h(O,"BUTTON",{id:!0,"aria-label":!0,class:!0});var re=y(I);q=h(re,"DIV",{class:!0}),y(q).forEach(n),re.forEach(n),P=D(O),N=h(O,"DIV",{id:!0,class:!0}),y(N).forEach(n),O.forEach(n),p.forEach(n),this.h()},h(){s(e,"rel","preload"),s(e,"href","/icons/sun.svg"),s(e,"as","image"),s(t,"rel","preload"),s(t,"href","/icons/moon.svg"),s(t,"as","image"),s(c,"id","logo-svg"),X(c.src,_="/images/fsj.svg")||s(c,"src",_),s(c,"alt","fsj logo"),s(c,"height","100"),s(c,"width","100"),s(w,"id","logo-shadow"),X(w.src,V="/images/fsj.svg")||s(w,"src",V),s(w,"alt","fsj logo"),s(w,"height","100"),s(w,"width","100"),s(w,"class","svelte-c1vu3p"),s(l,"href","/"),s(f,"id","logo"),s(f,"class","svelte-c1vu3p"),s(M,"class","nav-container svelte-c1vu3p"),s(q,"class","svelte-c1vu3p"),s(I,"id","menu-icon"),s(I,"aria-label","menu"),s(I,"class","svelte-c1vu3p"),s(N,"id","blur"),s(N,"class","svelte-c1vu3p"),s(v,"class","svelte-c1vu3p"),J(v,"active",r[0]),s(a,"id","header"),s(a,"class","svelte-c1vu3p")},m(g,$){i(document.head,e),i(document.head,t),R(g,o,$),R(g,a,$),i(a,f),i(f,l),i(l,c),i(l,E),i(l,w),i(a,K),i(a,v),i(v,M);for(let p=0;p<d.length;p+=1)d[p].m(M,null);i(M,j),k&&k.m(M,null),i(v,L),i(v,I),i(I,q),i(v,P),i(v,N),C||(b=se(I,"click",r[5]),C=!0)},p(g,[$]){if($&11){m=g[3];let p;for(p=0;p<m.length;p+=1){const T=oe(g,m,p);d[p]?d[p].p(T,$):(d[p]=le(T),d[p].c(),d[p].m(M,j))}for(;p<d.length;p+=1)d[p].d(1);d.length=m.length}g[1].url.pathname!="/portfolio"?k?k.p(g,$):(k=ae(g),k.c(),k.m(M,null)):k&&(k.d(1),k=null),$&1&&J(v,"active",g[0])},i:H,o:H,d(g){n(e),n(t),g&&n(o),g&&n(a),_e(d,g),k&&k.d(),C=!1,b()}}}function Ae(r,e,t){let o,a;W(r,ge,E=>t(1,o=E)),W(r,F,E=>t(2,a=E));const f=[{name:"CV",link:"/cv"},{name:"Posts",link:"/posts"},{name:"Portfolio",link:"/portfolio"}];let l=!1;return[l,o,a,f,()=>t(0,l=!1),()=>t(0,l=!l)]}class Se extends x{constructor(e){super(),ee(this,e,Ae,qe,te,{})}}const{document:A}=Ee;function ne(r){let e,t;return e=new Pe({}),{c(){ue(e.$$.fragment)},l(o){he(e.$$.fragment,o)},m(o,a){fe(e,o,a),t=!0},i(o){t||(Q(e.$$.fragment,o),t=!0)},o(o){B(e.$$.fragment,o),t=!1},d(o){me(e,o)}}}function De(r){let e,t,o,a,f,l,c,_,E,w,V,K,v,M,j,L,I,q,P;M=new Se({});const N=r[2].default,C=ve(N,r,r[1],null);let b=r[0].url.pathname!="/"&&ne();return{c(){e=u("link"),t=u("link"),o=u("link"),a=u("link"),f=u("link"),l=u("script"),c=U(`function getInitialColorMode() {
      const persistedColorMode = window.localStorage.getItem("color-mode");
      const hasPersistedColorMode = typeof persistedColorMode === "string";
      if (hasPersistedColorMode) {
        console.log(\`loaded color mode: \${persistedColorMode}\`);
        return persistedColorMode;
      }
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const hasMediaQueryPreference = typeof mql.matches === "boolean";

      if (hasMediaQueryPreference) {
        return mql.matches ? "dark" : "light";
      }
      return "light";
    }

    const colorMode = getInitialColorMode();
    const root = document.documentElement;

    root.setAttribute("data-color-mode", colorMode);
  `),_=u("script"),w=u("script"),V=U(`window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-XRLEG6433K");`),K=S(),v=u("div"),ue(M.$$.fragment),j=S(),L=u("main"),I=u("content"),C&&C.c(),q=S(),b&&b.c(),this.h()},l(m){const d=de('[data-svelte="svelte-1hqfpcp"]',A.head);e=h(d,"LINK",{rel:!0,href:!0,as:!0}),t=h(d,"LINK",{rel:!0,href:!0,as:!0}),o=h(d,"LINK",{rel:!0,href:!0}),a=h(d,"LINK",{rel:!0,href:!0}),f=h(d,"LINK",{rel:!0,href:!0}),l=h(d,"SCRIPT",{});var k=y(l);c=Y(k,`function getInitialColorMode() {
      const persistedColorMode = window.localStorage.getItem("color-mode");
      const hasPersistedColorMode = typeof persistedColorMode === "string";
      if (hasPersistedColorMode) {
        console.log(\`loaded color mode: \${persistedColorMode}\`);
        return persistedColorMode;
      }
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const hasMediaQueryPreference = typeof mql.matches === "boolean";

      if (hasMediaQueryPreference) {
        return mql.matches ? "dark" : "light";
      }
      return "light";
    }

    const colorMode = getInitialColorMode();
    const root = document.documentElement;

    root.setAttribute("data-color-mode", colorMode);
  `),k.forEach(n),_=h(d,"SCRIPT",{src:!0});var g=y(_);g.forEach(n),w=h(d,"SCRIPT",{});var $=y(w);V=Y($,`window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-XRLEG6433K");`),$.forEach(n),d.forEach(n),K=D(m),v=h(m,"DIV",{class:!0});var p=y(v);he(M.$$.fragment,p),j=D(p),L=h(p,"MAIN",{});var T=y(L);I=h(T,"CONTENT",{});var G=y(I);C&&C.l(G),G.forEach(n),q=D(T),b&&b.l(T),T.forEach(n),p.forEach(n),this.h()},h(){s(e,"rel","preload"),s(e,"href","/normalize.css"),s(e,"as","style"),s(t,"rel","preload"),s(t,"href","/fonts.css"),s(t,"as","style"),s(o,"rel","stylesheet"),s(o,"href","/normalize.css"),s(a,"rel","stylesheet"),s(a,"href","/hint.min.css"),s(f,"rel","stylesheet"),s(f,"href","/fonts.css"),_.async=!0,X(_.src,E="https://www.googletagmanager.com/gtag/js?id=G-XRLEG6433K")||s(_,"src",E),s(v,"class","container")},m(m,d){i(A.head,e),i(A.head,t),i(A.head,o),i(A.head,a),i(A.head,f),i(A.head,l),i(l,c),i(A.head,_),i(A.head,w),i(w,V),R(m,K,d),R(m,v,d),fe(M,v,null),i(v,j),i(v,L),i(L,I),C&&C.m(I,null),i(L,q),b&&b.m(L,null),P=!0},p(m,[d]){C&&C.p&&(!P||d&2)&&be(C,N,m,m[1],P?ye(N,m[1],d,null):ke(m[1]),null),m[0].url.pathname!="/"?b?d&1&&Q(b,1):(b=ne(),b.c(),Q(b,1),b.m(L,null)):b&&(Ie(),B(b,1,1,()=>{b=null}),Me())},i(m){P||(Q(M.$$.fragment,m),Q(C,m),Q(b),P=!0)},o(m){B(M.$$.fragment,m),B(C,m),B(b),P=!1},d(m){n(e),n(t),n(o),n(a),n(f),n(l),n(_),n(w),m&&n(K),m&&n(v),me(M),C&&C.d(m),b&&b.d()}}}function Ke(){const r=window.localStorage.getItem("color-mode");if(typeof r=="string")return console.log(`loaded color mode: ${r}`),r;const t=window.matchMedia("(prefers-color-scheme: dark)");return typeof t.matches=="boolean"&&t.matches?"dark":"light"}function ie(r,e=!1){const t=document.documentElement;r===""&&(t.getAttribute("data-color-mode")==="dark"?r="light":r="dark"),t.setAttribute("data-color-mode",r),e&&window.localStorage.setItem("color-mode",r)}function je(r,e,t){let o,a;W(r,F,_=>t(3,o=_)),W(r,ge,_=>t(0,a=_));let{$$slots:f={},$$scope:l}=e;we(()=>{F.setMode(Ke()),ie(o)});let c=F.subscribe(_=>{try{ie(_)}catch(E){if(!(E instanceof ReferenceError))throw E}});return Ce(c),r.$$set=_=>{"$$scope"in _&&t(1,l=_.$$scope)},[a,l,f]}class Ve extends x{constructor(e){super(),ee(this,e,je,De,te,{})}}export{Ve as default};
