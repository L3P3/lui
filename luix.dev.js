'use strict';/*
 lui.js web frame work 1.4.4
 inspired by react and mithril
 L3P3.de 2024
*/
{let e=null,f=!e,g=e,h=0,q=0,t=0,v=f,w=[[]],y=[[]];
const A={},aa={},ba={},ca=[],B=[],da={},C=e,D=f,E=!f,F=Array,H=Object,I=H.assign,J=H.keys,ea=H.freeze,fa=H.isFrozen,ha=document,ia=window,ja=ia.performance||Date,ka=a=>(void 0===a&&K("model state must not contain undefined, missing return?"),fa(a)||(ea(a).constructor!==F&&(a.constructor!==H&&K("model state must not contain shit like "+a.constructor.name),a=H.values(a)),a.forEach(ka))),la=({s:{A:a}})=>a===L?"list":a.name_||a.name||"?",M=()=>{const a=[];let b=g,c=C;if(g){for(a[0]="$"+(h-1);0!==b[0].j;)a.unshift(1===
b[0].j?`hook_map[${"object"===typeof b[0].L?b[0].L.id:b[0].L}]`:"hook_sub"),b=b[0].W;b=b[0].U}for(;b;)a.unshift(la(b)+(c!==C?":"+c:"")),c=b.P,b=b.K;return a.join("/")||"-"},ma=(...a)=>{console.log(...a)},na=a=>{ma("lui "+M()+": "+a)},K=a=>{throw Error("lui: "+a);},oa=a=>{ma("lui "+a+": error in callback");e=C},N=(a,b,c)=>{try{return a(...b)}catch(d){throw oa(c),d;}},pa=(a,b)=>{a===b||a&&b&&JSON.stringify(J(a))===JSON.stringify(J(b))||K("object keys mismatch")},O=(a,b,c)=>{g||K("hook called outside of hook context");
c&&(c.constructor!==F&&K("deps must be in an array"),0===c.length&&K("deps must not be empty"));b&&0!==g[0].j&&K("hook called outside of component rendering");a!==C&&h<g.length&&(g[h].j!==a&&K("inconsistent hook order"),g[h].h&&qa(g[h].h,c))},Q=(a,b)=>{O(C,E,C);a!==P(a,a)&&K(b+" changed between renderings")},qa=(a,b)=>{b?a.length!==b.length&&K("deps length changed"):0<a.length&&K("deps presence changed")},ra=a=>new Function("a","b",`return a!==b&&(${a.join("||")})`),L=a=>{const b=(a=J(a)).join(",");
return ba[b]||(0===a.length&&K("object empty"),a.some(c=>(c.includes("-")||"0123456789".includes(c.charAt(0)))&&K("invalid key: "+c)),ba[b]=ra(a.map(c=>`a.${c}!==b.`+c)))},ta=(a,b)=>(pa(a,b),a===b?B:J(a).filter(c=>a[c]!==b[c])),R=a=>a?ca[a.length]||(0===a.length&&K("deps must not be empty"),ca[a.length]=ra(a.map((b,c)=>`a[${c}]!==b[${c}]`))):C,S=(a,b)=>{const c=e,d=b,n=c.v+1;g=c.u;h=1;c.G=E;if(c.s.A!==L){var k=C;try{k=(0,c.s.A)(c.s.o||da)}catch(T){if(T!==A)throw T;}var m=c.i;"object"!==typeof k&&
K("components need to return child list or null");if(k){m&&(a=m,b=C);var r=k.length,l;"number"!==typeof r&&K("childs must be returned in a list");0===r&&K("returned childs list empty");c.l&&r!==c.l.length&&K("returned childs count changed");var u=c.l||(c.l=(new F(r)).fill(C));do{var p=u[--r];if((l=k[r])&&l!==D){p&&p.s.A!==l.A&&K("child component changed at "+r);if(f=!p)u[r]=e=p={s:l,T:l.o&&L(l.o),K:c,v:n,P:r,u:[],l:C,i:C,m:C,G:E},e.u[0]={j:0,U:p},S(a,b),p.i&&a.insertBefore(p.m=p.i,b);else if(pa(p.s.o,
l.o),l.o&&p.T(p.s.o,l.o))(e=p).s=l,S(a,b);p.m&&(b=p.m)}else p&&(V(p,a),u[r]=C)}while(0<r)}else if(c.l){for(r of c.l)r&&V(r,a);c.l=C}m||(c.m=b!==d?b:C)}else{r=c.s.o.A;var x=c.s.o.O;p=c.s.o.o;"object"===typeof x&&x&&x.constructor===F||K("list_data must be an array");"object"!==typeof p&&K("props must be an object");Q(r,"item component");Q(p&&J(p).join(","),"common props");u=x.length;let T=D;if(!(0>=P(u,u)+u)){l=W();k={};m=[];x=0<u&&ua(x,k,m);u||W();if(l.M){T=p&&l.T(p,l.da);for(var G of l.ca)G in k||
(V(l.M[G],a),delete l.M[G]);l.da=p;l.ca=m}else l.M={},l.Y=x?L(k[m[0]]):C,l.ca=m,l.T=(l.da=p)&&L(p);for(G=c.l=new F(u);0<u;){const U=m[--u];let z=l.M[U];if(f=!z)l.M[U]=e=z={s:{A:r,o:I({I:k[U]},p)},T:C,K:c,v:n,P:u,u:[],l:C,i:C,m:C,G:E},e.u[0]={j:0,U:z},S(a,b),z.i&&a.insertBefore(z.m=z.i,b);else{const sa=va(z);sa&&sa.nextSibling!==b&&wa(z,a,b);if(T||x&&l.Y(k[U],z.s.o.I))(e=z).s.o=I({I:k[U]},p),S(a,b)}(G[z.P=u]=z).m&&(b=z.m)}c.m=b!==d?b:C}}},V=(a,b)=>{b&&a.i&&(a.i.remove(),b=C);if(a.l)for(const c of a.l)c&&
V(c,b);X(a.u);if(a.G){let c,d;(!(d=w[c=a.v])||0>(c=d.indexOf(a)))&&(!(d=y[c])||0>(c=d.indexOf(a)))||d.splice(c,1)}},X=a=>{let b,c=a.length;for(;1<c;)switch((b=a[--c]).j){case 3:b.J&&b.J(...b.h);break;case 4:b.h=B;break;case 7:xa(b);break;case 11:X(b.u)}},ua=(a,b,c)=>{const d="object"===typeof a[0],n=W();n.fa||(a[0]!==C&&["object","string","number"].includes(n.fa=typeof a[0])||K("item type invalid"),d&&(!["string","number"].includes(n.ja=typeof a[0].id)&&K("item id type invalid"),n.keys=J(a[0]).join(",")));
for(const k of a)k===C&&K("item is null"),typeof k!==n.fa&&K("item type changed"),d&&(typeof k.id!==n.ja&&K("item id type changed"),J(k).join(",")!==n.keys&&K("item keys differ of "+k.id));for(const k of a)a=d?k.id:k,a in b&&K("item key not unique: "+a),b[a]=k,c.push(a);return d},va=a=>{if(a.i)return a.i;let b;a=(b=a.l)?b.length:0;let c,d;for(;0<a;)if((d=b[--a])&&(c=va(d)))return c;return C},wa=(a,b,c)=>{if(a.i)return b.insertBefore(a.i,c);if(a.m){let d=a.l.length;do a.l[--d]&&(c=wa(a.l[d],b,c));
while(0<d)}return c},ya=a=>{for(;0!==a[0].j;){if(!a[0].X.H)return C;a[0].X.H=E;a=a[0].W}return a[0].U},za=a=>{var b;if(b=a=ya(a))b=!a.G&&(a.G=D,w[a.v]?w[a.v].push(a):w[a.v]=[a],v||Y());return b},Aa=()=>{O(C,E,C);const a=ya(g);a&&(a.G=D,y[a.v]?y[a.v].push(a):y[a.v]=[a])},Ba=(a,b)=>{O(3,E,b);if(h>=g.length)g[h]={j:3,B:R(b),h:b=b||B,J:a(...b)||C};else if(b){const c=g[h];c.B(c.h,b)&&(c.J&&c.J(...c.h),c.J=a(...(c.h=b))||C)}g[h].J&&g[h].J.then&&K("effect function must be synchronous");++h},Ca=a=>{O(5,E,
C);if(h<g.length)return g[h++].g;const b=g,c=[a,d=>{c[0]!==d&&(c[0]=d,za(b))},()=>c[0]];g[h++]={j:5,g:c};return c},W=a=>(O(6,E,C),(h<g.length?g[h++]:g[h++]={j:6,g:void 0===a?{}:a}).g),Da=(a,b)=>(O(8,E,b),h>=g.length?(g[h++]={j:8,B:R(b),h:b=b||B,g:a(...b)}).g:b&&g[h].B(g[h].h,b)?g[h].g=a(...(g[h++].h=b)):g[h++].g),P=(a,b)=>(O(9,E,C),h<g.length?(b=g[h].g,g[h++].g=a):g[h++]={j:9,g:a},b),Ea=(a,b)=>(a=setTimeout(()=>b(D),a),()=>clearTimeout(a)),xa=a=>{for(const b of a.Z)X(a.N[b])},Fa=(a,b,c)=>({aa:c.ba,
ga:a,$:q,ea:f?q:q+b}),Z=a=>{"object"===typeof a&&a||K("object required");const b=P(a,C);return b?ta(b,a):J(a)},Ga=a=>{Q(!a,"attributes presence");const b=e.i;if(a){for(const c of Z(a)){1<c.length&&c.charAt(0).toLowerCase()!==c.charAt(0)&&K("capital prop: "+c);switch(c.charCodeAt(0)){case 70:"object"===typeof a.F&&a.F||K("invalid css flags");b.className=J(a.F).filter(d=>a.F[d]).join(" ");continue;case 82:"function"!==typeof a.R&&K("invalid ref"),a.R(b);case 67:case 68:case 83:continue}97>c.charCodeAt(0)&&
K("invalid prop: "+c);b[c]=a[c]}Q(!a.D,"dataset presence");if(a.D)for(const c of Z(a.D))b.dataset[c]=a.D[c];Q(!a.S,"style presence");if(a.S)for(const c of Z(a.S))b.style[c]=a.S[c]}return b},Ha=(a,b,c)=>("string"===typeof a&&K("component expected, use node_dom instead"),c&&c.constructor!==F&&K("invalid childs type"),{A:a,o:b?c?(b.C=c,b):b:c?{C:c}:C}),Y=()=>{f=0>=q;q=ja.now();t&&cancelAnimationFrame(t);v=D;t=0;var a;let b=0;for(;(a=w).length;){10<++b&&K("rerender loop detected");w=[];for(const c of a)if(c)for(e of c)if(e.G){if(e.i)S(C,
C);else{let d=C,n=e.m,k=e,m=e;for(;!(a=(k=k.K).i););do{let r=m.P;const {l}=m=m.K,u=l.length;for(;++r<u&&l[r]&&!(d=l[r].m););}while(!d&&m!==k);m=e;S(a,d);if(m.m!==n)for(;!(m=m.K).i;){n=C;for(const r of m.l)if(r&&(n=r.m))break;if(n===m.m)break;m.m=n}}f=E}}v=E;e=g=C;y.length&&(w=y,y=a,Ia())},Ia=()=>t||(t=requestAnimationFrame(Y)),Ja=a=>{var b=A[a];if(!b){a.startsWith("#")&&K("dom: unknown handle");const c=a.indexOf("[");b=0>c?a:a.substr(0,c);(0===b.length||b!==b.toLowerCase()||b.includes(" ")||b.includes("#")||
b.includes("."))&&K("dom: invalid tag");A[a]=b=ha.createElement(b);if(0<c){!a.endsWith("]")&&K("dom: ] missing");for(const d of a.substring(c+1,a.length-1).split("]["))!d&&K("dom: empty attribute"),(d.includes("[")||d.includes("]"))&&K("dom: attributes screwed up"),a=d.indexOf("="),d.includes(" ")&&(0>a||d.indexOf(" ")<a)&&K("dom: space in attribute name"),0<a?b[d.substr(0,a)]=d.substr(a+1):b[d]=D}}return b},Ka=a=>{a&&"string"===typeof a||K("dom: descriptor string expected");let b=aa[a];if(!b){const c=
Ja(a);aa[a]=b=d=>(f&&(e.i=c.cloneNode(D)),Ga(d),d&&d.C||C);b.name_="$"+a}return b};ia.onerror=()=>(e&&na("error in component"),w=y=[],E);ia.lui={defer:()=>(e&&K("defer while rendering"),v=D,Ia()),defer_end:()=>(e&&K("defer_end while rendering"),v||K("nothing was deferred"),Y()),dom_define:(a,b,c)=>{A["#"+a]&&K("dom_define: handle exists");b=Ja(b);c&&(c&&(c.C&&K("dom_define cannot have childs"),c.R&&K("dom_define cannot have a ref")),b=b.cloneNode(D),c.D&&(I(b.dataset,c.D),delete c.D),c.S&&(I(b.style,c.S),delete c.S),I(b,c));A["#"+a]=b},hook_assert:a=>{O(C,E,C);if(!a)throw A;},hook_async:(a,b,c)=>{O(4,E,b);let d;const n=M();if((h<g.length?
(d=g[h++],E):d=g[h++]={j:4,B:R(b),h:b||B,g:C})||b&&d.B(d.h,b)&&(d.h=b)){void 0!==c&&(d.g=c);const k=g;a(...d.h).then(m=>d.g!==m&&d.h===b&&(d.g=m,za(k))).catch(m=>{oa(n);throw m;})}return d.g},hook_callback:(a,b)=>{const c=h>=g.length?M():"";b&&b.length||K("deps required, use hook_static instead");const d=W();d.h&&qa(d.h,b);d.h=b;return d.ha||(d.ha=(...n)=>N(a,[...d.h,...n],c))},hook_delay:a=>{const [b,c]=Ca(E);Ba(Ea,[a,c]);return b},hook_dom:(a,b)=>(O(C,D,C),e.i?f&&K("hook_dom called twice"):f||K("hook_dom skipped before"),
b&&(b.C&&K("hook_dom cannot have childs"),b.R&&K("hook_dom cannot have a ref")),f&&(e.i=Ja(a).cloneNode(D)),Ga(b||C)),hook_effect:Ba,hook_map:(a,b,c)=>{O(7,E,c);let d=C,n=D;if(h<g.length)if((d=g[h]).V!==a)xa(d),d=C;else if(!d.H||c&&d.B(d.h,c))d.h=c||B,d.H=D;else{if(b===d.O)return++h,d.g;n=E}const k=f,m=g,r=++h,l={},u=[],p=0<b.length&&ua(b,l,u);0===b.length&&W();if(d){if(d.g=[],d.O!==b){d.O=b;for(const x of d.Z)x in l||(X(d.N[x]),delete d.N[x])}}else g[r-1]=d={j:7,B:R(c),h:c||B,g:[],H:D,V:a,Y:p?L(b[0]):
C,Z:[],N:{},O:b};for(const x of u){b=d.N[x];if(f=!b)d.N[x]=b=[{j:1,W:m,X:d,L:C,g:C}];if(n||f||(p?d.Y(l[x],b[0].L):l[x]!==b[0].L)){g=b;h=1;try{b[0].g=a(b[0].L=l[x],...d.h)}catch(G){if(G!==A)throw G;}g=m}d.g.push(b[0].g)}f=k;g=m;h=r;d.Z=u;return d.g},hook_memo:Da,hook_model:a=>{O(10,E,C);"object"===typeof a&&a||K("mutations object required");"function"!==typeof a.init&&K("init mutation required for initial value");if(h<g.length)return g[h++].g;const b=g,c=M(),d=[N(a.init,[C],c+" -> #init"),{}];N(ka,
[d[0]],c+" -> #init");for(const n of J(a))d[1][n]=(...k)=>{k=N(a[n],[d[0],...k],c+" -> #"+n);d[0]!==k&&(N(ka,[k],c+" -> #"+n),d[0]=k,za(b))};g[h++]={j:10,g:d};return d},hook_object_changes:Z,hook_prev:P,hook_rerender:Aa,hook_state:Ca,hook_static:W,hook_sub:(a,b)=>{O(11,E,b);let c=C;if(h<g.length)if((c=g[h]).V!==a)X(c.u),c=C;else if(!c.H||b&&c.B(c.h,b))b&&(c.h=b),c.H=D;else return++h,c.g;const d=f,n=g,k=h;if(f=!c)(g[h]=c={j:11,B:R(b),h:b||B,g:C,V:a,H:D,u:[]}).u[0]={j:2,W:g,X:c};g=c.u;h=1;try{c.g=a(...c.h)}catch(m){if(m!==
A)throw m;}f=d;g=n;h=k+1;return c.g},hook_transition:(a,b)=>{const c=W({ba:a});a=Da(Fa,[a,b,c]);return c.ba=a.ea<=q?a.ga:(Aa(),a.$===q?a.aa:a.aa+(a.ga-a.aa)*(q-a.$)/(a.ea-a.$))},init:(a,b=ha.body)=>{"function"!==typeof a&&K("no init function specified");b instanceof HTMLElement||K("invalid root element");b.ia&&K("root element already mounted");b.ia=1;let c;b.innerHTML="";const d=()=>((!(c=a())||2!==c.length)&&K("root component must return [props, childs]"),Q(!c[0],"attributes presence"),c[0]!==C&&
("object"!==typeof c[0]&&K("invalid props type"),pa(P(c[0],c[0]),c[0]),c[0].C&&K("root childs must be in second return value")),Ga(c[0]),c[1]);d.name_="$root";w[0].push(b={s:{A:d,o:C},T:C,K:C,v:0,P:0,u:[],l:C,i:b,m:b,G:D});b.u[0]={j:0,U:b};e=g=C;Y()},node:Ha,node_dom:(a,b,c)=>Ha(Ka(a),b,c),node_map:(a,b,c)=>Ha(L,{A:a,O:b,o:c||C}),now:()=>q}}