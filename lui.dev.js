'use strict';/*
 lui.js web frame work 1.3.1
 inspired by react and mithril
 L3P3.de 2022
*/
{let e=null,f=!e,g=e,h=0,l=0,t=0,y=f,z=[],A=[];
const B={},aa={},ba={},ca=[],da={},C=[],D=e,F=f,G=!f,H=Array,ea=Object,fa=ea.assign,J=ea.keys,ha=document,K=window,ia=K.performance||Date,ja=({s:{v:a}})=>a===L?"list":a.name_||a.name||"?",M=()=>{const a=[];let b=g,c=D;if(b){for(a.unshift("$"+(h-1));0!==b[0].o;)a.unshift(1===b[0].o?`hook_map[${"object"===typeof b[0].O?b[0].O.id:b[0].O}]`:"hook_sub"),b=b[0].W;b=b[0].N}for(;b;)a.unshift(ja(b)+(c?":"+c:"")),c=b.L,b=b.H;return a.join("/")||"-"},ka=(...a)=>{console.log(...a)},la=a=>{ka("lui "+M()+": "+
a,...[])},N=a=>{throw Error("lui: "+a);},ma=a=>{ka("lui "+a+": error in callback")},na=(a,b,c)=>{try{return a(...b)}catch(d){throw ma(c),d;}},Q=(a,b)=>{a===b||a&&b&&JSON.stringify(J(a))===JSON.stringify(J(b))||N("object keys mismatch")},R=(a,b,c)=>{g||N("hook called outside of hook context");c&&(c.constructor!==H&&N("deps must be in an array"),0===c.length&&N("deps must not be empty"));b&&0!==g[0].o&&N("hook called outside of component rendering");a!==D&&h<g.length&&(g[h].o!==a&&N("inconsistent hook order"),
g[h].m&&oa(g[h].m,c))},T=(a,b)=>{R(D,G,D);a!==S(a,a)&&N(b+" changed between renderings")},oa=(a,b)=>{b?a.length!==b.length&&N("deps length changed"):0<a.length&&N("deps presence changed")},pa=a=>new Function("a","b",`return a!==b&&(${a.join("||")})`),L=a=>{const b=(a=J(a)).join(",");return ba[b]||(0===a.length&&N("object empty"),a.some(c=>(c.includes("-")||"0123456789".includes(c.charAt(0)))&&N("invalid key: "+c)),ba[b]=pa(a.map(c=>`a.${c}!==b.`+c)))},qa=(a,b)=>(Q(a,b),a===b?C:J(a).filter(c=>a[c]!==
b[c])),U=a=>a?ca[a.length]||(0===a.length&&N("deps must not be empty"),ca[a.length]=pa(a.map((b,c)=>`a[${c}]!==b[${c}]`))):D,V=(a,b)=>{const c=e,d=b,w=c.u+1;g=c.B;h=1;c.A=G;if(c.s.v!==L){var p=D;try{p=(0,c.s.v)(c.s.l||da)}catch(O){if(O!==B)throw O;}var n=c.g;"object"!==typeof p&&N("components need to return child list or null");if(p){n&&(a=n,b=D);var q=p.length,k;"number"!==typeof q&&N("childs must be returned in a list");0===q&&N("returned childs list empty");c.h&&q!==c.h.length&&N("returned childs count changed");
var u=c.h||(c.h=(new H(q)).fill(D));do{var m=u[--q];if((k=p[q])&&k!==F){m&&m.s.v!==k.v&&N("child component changed at "+q);if(f=!m)(u[q]=e=m={s:k,M:k.l&&L(k.l),H:c,u:w,L:q,B:[],h:D,g:D,i:D,A:G}).B[0]={o:0,N:m},V(a,b),m.g&&a.insertBefore(m.i=m.g,b);else if(Q(m.s.l,k.l),k.l&&m.M(m.s.l,k.l))(e=m).s=k,V(a,b);m.i&&(b=m.i)}else m&&(W(m,a),u[q]=D)}while(0<q)}else if(c.h){for(q of c.h)q&&W(q,a);c.h=D}n||(c.i=b!==d?b:D)}else{q=c.s.l.v;var x=c.s.l.Z;m=c.s.l.l;"object"===typeof x&&x&&x.constructor===H||N("list_data must be an array");
"object"!==typeof m&&N("props must be an object");T(q,"item component");T(m&&J(m).join(","),"common props");u=x.length;let O=F;if(!(0>=S(u,u)+u)){k=X();p={};n=[];var r;if(r=0<u){r="object"===typeof x[0];const E=X();E.U||(x[0]!==D&&["object","string","number"].includes(E.U=typeof x[0])||N("item type invalid"),r&&(!["string","number"].includes(E.$=typeof x[0].id)&&N("item id type invalid"),E.keys=J(x[0]).join(",")));for(var v of x)v===D&&N("item is null"),typeof v!==E.U&&N("item type changed"),r&&(typeof v.id!==
E.$&&N("item id type changed"),J(v).join(",")!==E.keys&&N("item keys differ of "+v.id));for(var I of x)v=r?I.id:I,v in p&&N("item key not unique: "+v),p[v]=I,n.push(v)}I=r;u||X();if(k.K){O=m&&k.M(m,k.T);for(var P of k.P)P in p||(W(k.K[P],a),delete k.K[P]);k.T=m;k.P=n}else k.K={},k.Y=I?L(p[n[0]]):D,k.P=n,k.M=(k.T=m)&&L(m);for(P=c.h=new H(u);0<u;){v=n[--u];r=k.K[v];if(f=!r)(k.K[v]=e=r={s:{v:q,l:fa({I:p[v]},m)},M:D,H:c,u:w,L:u,B:[],h:D,g:D,i:D,A:G}).B[0]={o:0,N:r},V(a,b),r.g&&a.insertBefore(r.i=r.g,
b);else if((x=ra(r))&&x.nextSibling!==b&&sa(r,a,b),O||I&&k.Y(p[v],r.s.l.I))(e=r).s.l=fa({I:p[v]},m),V(a,b);(P[r.L=u]=r).i&&(b=r.i)}c.i=b!==d?b:D}}},W=(a,b)=>{b&&a.g&&(b.removeChild(a.g),b=D);if(a.h)for(const c of a.h)c&&W(c,b);Y(a.B);if(a.A){let c,d;(!(d=z[c=a.u])||0>(c=d.indexOf(a)))&&(!(d=A[c])||0>(c=d.indexOf(a)))||d.splice(c,1)}},Y=a=>{let b,c=a.length;for(;1<c;)switch((b=a[--c]).o){case 3:b.G&&b.G(...b.m);break;case 4:b.m=C;break;case 7:ta(b);break;case 11:Y(b.B)}},ra=a=>{if(a.g)return a.g;let b;
a=(b=a.h)?b.length:0;let c,d;for(;0<a;)if((d=b[--a])&&(c=ra(d)))return c;return D},sa=(a,b,c)=>{if(a.g)return b.insertBefore(a.g,c),a.g;if(a.i){let d=a.h.length;do a.h[--d]&&(c=sa(a.h[d],b,c));while(0<d)}return c},ua=a=>{for(;0!==a[0].o;){if(!a[0].X.V)return D;a[0].X.V=G;a=a[0].W}return a[0].N},va=a=>(a=ua(a))&&!a.A&&(a.A=F,z[a.u]?z[a.u].push(a):z[a.u]=[a],y||Z()),X=a=>(R(6,G,D),(h<g.length?g[h++]:g[h++]={o:6,j:void 0===a?{}:a}).j),S=(a,b)=>(R(9,G,D),h<g.length?(b=g[h].j,g[h++].j=a):g[h++]={o:9,j:a},
b),ta=a=>{for(const b of a.ba)Y(a.aa[b])},wa=a=>{"object"===typeof a&&a||N("object required");const b=S(a,D);return b?qa(b,a):J(a)},xa=a=>{T(!a,"attributes presence");const b=e.g;if(a){for(const c of wa(a))switch(1<c.length&&c.charAt(0).toLowerCase()!==c.charAt(0)&&N("capital prop: "+c),c.charCodeAt(0)){case 70:"object"===typeof a.F&&a.F||N("invalid css flags");b.className=J(a.F).filter(d=>a.F[d]).join(" ");continue;case 82:"function"!==typeof a.R&&N("invalid ref"),a.R(b);case 67:case 68:case 83:continue;
default:97>c.charCodeAt(0)&&N("invalid prop: "+c),b[c]=a[c]}T(!a.D,"dataset presence");if(a.D)for(const c of wa(a.D))b.dataset[c]=a.D[c];T(!a.S,"style presence");if(a.S)for(const c of wa(a.S))b.style[c]=a.S[c]}return b},ya=(a,b,c)=>("string"===typeof a&&N("component expected, use node_dom instead"),c&&c.constructor!==H&&N("invalid childs type"),{v:a,l:b?c?(b.C=c,b):b:c?{C:c}:D}),Z=()=>{f=0>=l;l=ia.now();t&&cancelAnimationFrame(t);y=F;t=0;var a;let b=0;for(;(a=z).length;){10<++b&&N("rerender loop detected");
z=[];for(const c of a)if(c)for(e of c)if(e.A){if(e.g)V(D,D);else{let d=D,w=e.i,p=e,n=e;for(;!(a=(p=p.H).g););do{let q=n.L;const {h:k}=n=n.H,u=k.length;for(;++q<u&&k[q]&&!(d=k[q].i););}while(!d&&n!==p);n=e;V(a,d);if(n.i!==w)for(;!(n=n.H).g;){w=D;for(const q of n.h)if(q&&(w=q.i))break;if(w===n.i)break;n.i=w}}f=G}}y=G;e=g=D;A.length&&(z=A,A=a,za())},za=()=>t||(t=requestAnimationFrame(Z)),Aa=a=>{var b=B[a];if(!b){const c=a.indexOf("[");b=0>c?a.substr(0):a.substr(0,c);(0===b.length||b!==b.toLowerCase()||
b.includes(" ")||b.includes("#")||b.includes("."))&&N("dom: invalid tag");B[a]=b=ha.createElement(b);if(0<c){!a.endsWith("]")&&N("dom: ] missing");for(const d of a.substring(c+1,a.length-1).split("]["))!d&&N("dom: empty attribute"),(d.includes("[")||d.includes("]"))&&N("dom: attributes screwed up"),a=d.indexOf("="),d.includes(" ")&&(0>a||d.indexOf(" ")<a)&&N("dom: space in attribute name"),0<a?b[d.substr(0,a)]=d.substr(a+1):b[d]=F}}return b},Ba=a=>{let b=aa[a];if(!b){const c=Aa(a);aa[a]=b=d=>(f&&
(e.g=c.cloneNode(F)),xa(d),d&&d.C||D);b.name_="$"+a}return b};K.onerror=()=>(e&&la("error in component"),z=A=[],G);K.lui={defer:()=>(e&&N("defer while rendering"),y=F,za()),defer_end:()=>(e&&N("defer_end while rendering"),y||N("nothing was deferred"),Z()),hook_assert:a=>{R(D,G,D);if(!a)throw B;},hook_async:(a,b,c)=>{R(4,G,b);let d;const w=M();if((h<g.length?(d=g[h++],G):d=g[h++]={o:4,J:U(b),m:b||C,j:D})||b&&d.J(d.m,b)&&(d.m=b)){void 0!==c&&(d.j=c);const p=g;a(...d.m).then(n=>d.j!==n&&d.m===b&&(d.j=n,va(p))).catch(n=>{ma(w);throw n;})}return d.j},hook_dom:(a,b)=>(R(D,F,D),e.g?f&&N("hook_dom called twice"):f||N("hook_dom skipped before"),
b&&(b.C&&N("hook_dom cannot have childs"),b.R&&N("hook_dom cannot have a ref")),f&&(e.g=Aa(a).cloneNode(F)),xa(b||D)),hook_effect:(a,b)=>{R(3,G,b);if(h>=g.length)g[h]={o:3,J:U(b),m:b=b||C,G:a(...b)||D};else if(b){const c=g[h];c.J(c.m,b)&&(c.G&&c.G(...c.m),c.G=a(...(c.m=b))||D)}g[h].G&&g[h].G.then&&N("effect function must be synchronous");++h},hook_memo:(a,b)=>(R(8,G,b),h>=g.length?(g[h++]={o:8,J:U(b),m:b=b||C,j:a(...b)}).j:b&&g[h].J(g[h].m,b)?g[h].j=a(...(g[h++].m=b)):g[h++].j),hook_model:a=>{R(10,
G,D);"object"!==typeof a&&N("mutations object required");"function"!==typeof a.init&&N("init mutation required for initial value");if(h<g.length)return g[h++].j;const b=g,c=M(),d=[(0,a.init)(D),{}];for(const w of J(a))d[1][w]=p=>{p=na(a[w],[d[0],p],c+" -> #"+w);d[0]!==p&&(d[0]=p,va(b))};g[h++]={o:10,j:d};return d},hook_prev:S,hook_rerender:()=>{R(D,G,D);const a=ua(g);a&&(a.A=F,A[a.u]?A[a.u].push(a):A[a.u]=[a])},hook_state:a=>{R(5,G,D);if(h<g.length)return g[h++].j;const b=g,c=[a,d=>{c[0]!==d&&(c[0]=
d,va(b))},()=>c[0]];g[h++]={o:5,j:c};return c},hook_static:X,init:a=>{(e||z.length||A.length)&&N("init called more than once");"function"!==typeof a&&N("no init function specified");let b;const c=ha.body;c.innerHTML="";const d=()=>((!(b=a())||2!==b.length)&&N("root component must return [props, childs]"),T(!b[0],"attributes presence"),b[0]!==D&&("object"!==typeof b[0]&&N("invalid props type"),Q(S(b[0],b[0]),b[0]),b[0].C&&N("root childs must be in second return value")),xa(b[0]),b[1]);d.name_="$root";
(e={s:{v:d,l:D},M:D,H:D,u:0,L:0,B:[],h:D,g:c,i:c,A:F}).B[0]={o:0,N:e};z[0]=[e];e=g=D;Z()},node:ya,node_dom:(a,b,c)=>ya(Ba(a),b,c),node_map:(a,b,c)=>ya(L,{v:a,Z:b,l:c||D}),now:()=>l}}