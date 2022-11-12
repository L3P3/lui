'use strict';/*
 lui.js web frame work 1.3.4
 inspired by react and mithril
 L3P3.de 2022
*/
{let e=null,f=!e,g=e,h=0,m=0,u=0,y=f,z=[],A=[];
const B={},aa={},ba={},ca=[],C=[],da={},D=e,F=f,G=!f,H=Array,I=Object,ea=I.assign,J=I.keys,fa=I.freeze,ha=I.isFrozen,ia=document,L=window,ja=L.performance||Date,N=a=>(void 0===a&&M("model state must not contain undefined, missing return?"),ha(a)||(fa(a).constructor!==H&&(a.constructor!==I&&M("model state must not contain shit like "+a.constructor.name),a=I.values(a)),a.forEach(N))),ka=({s:{v:a}})=>a===O?"list":a.name_||a.name||"?",R=()=>{const a=[];let b=g,c=D;if(b){for(a.unshift("$"+(h-1));0!==b[0].o;)a.unshift(1===
b[0].o?`hook_map[${"object"===typeof b[0].O?b[0].O.id:b[0].O}]`:"hook_sub"),b=b[0].W;b=b[0].N}for(;b;)a.unshift(ka(b)+(c?":"+c:"")),c=b.L,b=b.H;return a.join("/")||"-"},la=(...a)=>{console.log(...a)},ma=a=>{la("lui "+R()+": "+a,...[])},M=a=>{throw Error("lui: "+a);},na=a=>{la("lui "+a+": error in callback");e=D},S=(a,b,c)=>{try{return a(...b)}catch(d){throw na(c),d;}},oa=(a,b)=>{a===b||a&&b&&JSON.stringify(J(a))===JSON.stringify(J(b))||M("object keys mismatch")},T=(a,b,c)=>{g||M("hook called outside of hook context");
c&&(c.constructor!==H&&M("deps must be in an array"),0===c.length&&M("deps must not be empty"));b&&0!==g[0].o&&M("hook called outside of component rendering");a!==D&&h<g.length&&(g[h].o!==a&&M("inconsistent hook order"),g[h].m&&pa(g[h].m,c))},V=(a,b)=>{T(D,G,D);a!==U(a,a)&&M(b+" changed between renderings")},pa=(a,b)=>{b?a.length!==b.length&&M("deps length changed"):0<a.length&&M("deps presence changed")},qa=a=>new Function("a","b",`return a!==b&&(${a.join("||")})`),O=a=>{const b=(a=J(a)).join(",");
return ba[b]||(0===a.length&&M("object empty"),a.some(c=>(c.includes("-")||"0123456789".includes(c.charAt(0)))&&M("invalid key: "+c)),ba[b]=qa(a.map(c=>`a.${c}!==b.`+c)))},ra=(a,b)=>(oa(a,b),a===b?C:J(a).filter(c=>a[c]!==b[c])),sa=a=>a?ca[a.length]||(0===a.length&&M("deps must not be empty"),ca[a.length]=qa(a.map((b,c)=>`a[${c}]!==b[${c}]`))):D,W=(a,b)=>{const c=e,d=b,r=c.u+1;g=c.B;h=1;c.A=G;if(c.s.v!==O){var k=D;try{k=(0,c.s.v)(c.s.l||da)}catch(P){if(P!==B)throw P;}var p=c.g;"object"!==typeof k&&
M("components need to return child list or null");if(k){p&&(a=p,b=D);var q=k.length,l;"number"!==typeof q&&M("childs must be returned in a list");0===q&&M("returned childs list empty");c.h&&q!==c.h.length&&M("returned childs count changed");var v=c.h||(c.h=(new H(q)).fill(D));do{var n=v[--q];if((l=k[q])&&l!==F){n&&n.s.v!==l.v&&M("child component changed at "+q);if(f=!n)(v[q]=e=n={s:l,M:l.l&&O(l.l),H:c,u:r,L:q,B:[],h:D,g:D,i:D,A:G}).B[0]={o:0,N:n},W(a,b),n.g&&a.insertBefore(n.i=n.g,b);else if(oa(n.s.l,
l.l),l.l&&n.M(n.s.l,l.l))(e=n).s=l,W(a,b);n.i&&(b=n.i)}else n&&(X(n,a),v[q]=D)}while(0<q)}else if(c.h){for(q of c.h)q&&X(q,a);c.h=D}p||(c.i=b!==d?b:D)}else{q=c.s.l.v;var x=c.s.l.Z;n=c.s.l.l;"object"===typeof x&&x&&x.constructor===H||M("list_data must be an array");"object"!==typeof n&&M("props must be an object");V(q,"item component");V(n&&J(n).join(","),"common props");v=x.length;let P=F;if(!(0>=U(v,v)+v)){l=Y();k={};p=[];var t;if(t=0<v){t="object"===typeof x[0];const E=Y();E.U||(x[0]!==D&&["object",
"string","number"].includes(E.U=typeof x[0])||M("item type invalid"),t&&(!["string","number"].includes(E.$=typeof x[0].id)&&M("item id type invalid"),E.keys=J(x[0]).join(",")));for(var w of x)w===D&&M("item is null"),typeof w!==E.U&&M("item type changed"),t&&(typeof w.id!==E.$&&M("item id type changed"),J(w).join(",")!==E.keys&&M("item keys differ of "+w.id));for(var K of x)w=t?K.id:K,w in k&&M("item key not unique: "+w),k[w]=K,p.push(w)}K=t;v||Y();if(l.K){P=n&&l.M(n,l.T);for(var Q of l.P)Q in k||
(X(l.K[Q],a),delete l.K[Q]);l.T=n;l.P=p}else l.K={},l.Y=K?O(k[p[0]]):D,l.P=p,l.M=(l.T=n)&&O(n);for(Q=c.h=new H(v);0<v;){w=p[--v];t=l.K[w];if(f=!t)(l.K[w]=e=t={s:{v:q,l:ea({I:k[w]},n)},M:D,H:c,u:r,L:v,B:[],h:D,g:D,i:D,A:G}).B[0]={o:0,N:t},W(a,b),t.g&&a.insertBefore(t.i=t.g,b);else if((x=ta(t))&&x.nextSibling!==b&&ua(t,a,b),P||K&&l.Y(k[w],t.s.l.I))(e=t).s.l=ea({I:k[w]},n),W(a,b);(Q[t.L=v]=t).i&&(b=t.i)}c.i=b!==d?b:D}}},X=(a,b)=>{b&&a.g&&(b.removeChild(a.g),b=D);if(a.h)for(var c of a.h)c&&X(c,b);b=a.B;
let d=b.length;for(;1<d;)switch((c=b[--d]).o){case 3:c.G&&c.G(...c.m);break;case 4:c.m=C}if(a.A){let r,k;(!(k=z[r=a.u])||0>(r=k.indexOf(a)))&&(!(k=A[r])||0>(r=k.indexOf(a)))||k.splice(r,1)}},ta=a=>{if(a.g)return a.g;let b;a=(b=a.h)?b.length:0;let c,d;for(;0<a;)if((d=b[--a])&&(c=ta(d)))return c;return D},ua=(a,b,c)=>{if(a.g)return b.insertBefore(a.g,c),a.g;if(a.i){let d=a.h.length;do a.h[--d]&&(c=ua(a.h[d],b,c));while(0<d)}return c},va=a=>{for(;0!==a[0].o;){if(!a[0].X.V)return D;a[0].X.V=G;a=a[0].W}return a[0].N},
wa=a=>(a=va(a))&&!a.A&&(a.A=F,z[a.u]?z[a.u].push(a):z[a.u]=[a],y||Z()),Y=a=>(T(6,G,D),(h<g.length?g[h++]:g[h++]={o:6,j:void 0===a?{}:a}).j),U=(a,b)=>(T(9,G,D),h<g.length?(b=g[h].j,g[h++].j=a):g[h++]={o:9,j:a},b),xa=a=>{"object"===typeof a&&a||M("object required");const b=U(a,D);return b?ra(b,a):J(a)},ya=a=>{V(!a,"attributes presence");const b=e.g;if(a){for(const c of xa(a))switch(1<c.length&&c.charAt(0).toLowerCase()!==c.charAt(0)&&M("capital prop: "+c),c.charCodeAt(0)){case 70:"object"===typeof a.F&&
a.F||M("invalid css flags");b.className=J(a.F).filter(d=>a.F[d]).join(" ");continue;case 82:"function"!==typeof a.R&&M("invalid ref"),a.R(b);case 67:case 68:case 83:continue;default:97>c.charCodeAt(0)&&M("invalid prop: "+c),b[c]=a[c]}V(!a.D,"dataset presence");if(a.D)for(const c of xa(a.D))b.dataset[c]=a.D[c];V(!a.S,"style presence");if(a.S)for(const c of xa(a.S))b.style[c]=a.S[c]}return b},za=(a,b,c)=>("string"===typeof a&&M("component expected, use node_dom instead"),c&&c.constructor!==H&&M("invalid childs type"),
{v:a,l:b?c?(b.C=c,b):b:c?{C:c}:D}),Z=()=>{f=0>=m;m=ja.now();u&&cancelAnimationFrame(u);y=F;u=0;var a;let b=0;for(;(a=z).length;){10<++b&&M("rerender loop detected");z=[];for(const c of a)if(c)for(e of c)if(e.A){if(e.g)W(D,D);else{let d=D,r=e.i,k=e,p=e;for(;!(a=(k=k.H).g););do{let q=p.L;const {h:l}=p=p.H,v=l.length;for(;++q<v&&l[q]&&!(d=l[q].i););}while(!d&&p!==k);p=e;W(a,d);if(p.i!==r)for(;!(p=p.H).g;){r=D;for(const q of p.h)if(q&&(r=q.i))break;if(r===p.i)break;p.i=r}}f=G}}y=G;e=g=D;A.length&&(z=
A,A=a,Aa())},Aa=()=>u||(u=requestAnimationFrame(Z)),Ba=a=>{var b=B[a];if(!b){const c=a.indexOf("[");b=0>c?a.substr(0):a.substr(0,c);(0===b.length||b!==b.toLowerCase()||b.includes(" ")||b.includes("#")||b.includes("."))&&M("dom: invalid tag");B[a]=b=ia.createElement(b);if(0<c){!a.endsWith("]")&&M("dom: ] missing");for(const d of a.substring(c+1,a.length-1).split("]["))!d&&M("dom: empty attribute"),(d.includes("[")||d.includes("]"))&&M("dom: attributes screwed up"),a=d.indexOf("="),d.includes(" ")&&
(0>a||d.indexOf(" ")<a)&&M("dom: space in attribute name"),0<a?b[d.substr(0,a)]=d.substr(a+1):b[d]=F}}return b},Ca=a=>{let b=aa[a];if(!b){const c=Ba(a);aa[a]=b=d=>(f&&(e.g=c.cloneNode(F)),ya(d),d&&d.C||D);b.name_="$"+a}return b};L.onerror=()=>(e&&ma("error in component"),z=A=[],G);L.lui={defer:()=>(e&&M("defer while rendering"),y=F,Aa()),defer_end:()=>(e&&M("defer_end while rendering"),y||M("nothing was deferred"),Z()),hook_assert:a=>{T(D,G,D);if(!a)throw B;},hook_async:(a,b,c)=>{T(4,G,b);let d;const r=R();if((h<g.length?(d=g[h++],G):d=g[h++]={o:4,J:sa(b),m:b||C,j:D})||b&&d.J(d.m,b)&&(d.m=b)){void 0!==c&&(d.j=c);const k=g;a(...d.m).then(p=>d.j!==p&&d.m===b&&(d.j=p,wa(k))).catch(p=>{na(r);throw p;})}return d.j},hook_dom:(a,b)=>(T(D,F,D),e.g?f&&M("hook_dom called twice"):f||
M("hook_dom skipped before"),b&&(b.C&&M("hook_dom cannot have childs"),b.R&&M("hook_dom cannot have a ref")),f&&(e.g=Ba(a).cloneNode(F)),ya(b||D)),hook_effect:(a,b)=>{T(3,G,b);if(h>=g.length)g[h]={o:3,J:sa(b),m:b=b||C,G:a(...b)||D};else if(b){const c=g[h];c.J(c.m,b)&&(c.G&&c.G(...c.m),c.G=a(...(c.m=b))||D)}g[h].G&&g[h].G.then&&M("effect function must be synchronous");++h},hook_memo:(a,b)=>(T(8,G,b),h>=g.length?(g[h++]={o:8,J:sa(b),m:b=b||C,j:a(...b)}).j:b&&g[h].J(g[h].m,b)?g[h].j=a(...(g[h++].m=b)):
g[h++].j),hook_model:a=>{T(10,G,D);"object"===typeof a&&a||M("mutations object required");"function"!==typeof a.init&&M("init mutation required for initial value");if(h<g.length)return g[h++].j;const b=g,c=R(),d=[S(a.init,[D],c+" -> #init"),{}];S(N,[d[0]],c+" -> #init");for(const r of J(a))d[1][r]=k=>{k=S(a[r],[d[0],k],c+" -> #"+r);d[0]!==k&&(S(N,[k],c+" -> #"+r),d[0]=k,wa(b))};g[h++]={o:10,j:d};return d},hook_prev:U,hook_rerender:()=>{T(D,G,D);const a=va(g);a&&(a.A=F,A[a.u]?A[a.u].push(a):A[a.u]=
[a])},hook_state:a=>{T(5,G,D);if(h<g.length)return g[h++].j;const b=g,c=[a,d=>{c[0]!==d&&(c[0]=d,wa(b))},()=>c[0]];g[h++]={o:5,j:c};return c},hook_static:Y,init:a=>{(e||z.length||A.length)&&M("init called more than once");"function"!==typeof a&&M("no init function specified");let b;const c=ia.body;c.innerHTML="";const d=()=>((!(b=a())||2!==b.length)&&M("root component must return [props, childs]"),V(!b[0],"attributes presence"),b[0]!==D&&("object"!==typeof b[0]&&M("invalid props type"),oa(U(b[0],
b[0]),b[0]),b[0].C&&M("root childs must be in second return value")),ya(b[0]),b[1]);d.name_="$root";(e={s:{v:d,l:D},M:D,H:D,u:0,L:0,B:[],h:D,g:c,i:c,A:F}).B[0]={o:0,N:e};z[0]=[e];e=g=D;Z()},node:za,node_dom:(a,b,c)=>za(Ca(a),b,c),node_map:(a,b,c)=>za(O,{v:a,Z:b,l:c||D}),now:()=>m}}