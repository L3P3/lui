/*
 lui.js web frame work 1.2.0
 inspired by react and mithril
 L3P3.de 2021
*/
{let e=null,f=!e,g=e,h=0,q=0,t=0,u=f,x=[],y=[];
const A={},aa={},ba={},ca=[],B=[],C=e,D=f,E=!f,G=Array,da=Object,ea=da.assign,H=da.keys,fa=document,I=window,ha=I.performance||Date,ia=({s:{A:a}})=>a===J?"list":a.name_||a.name||"?",K=()=>{const a=[];let b=g,c=C;if(b){for(a.unshift("$"+(h-1));0!==b[0].i;)a.unshift(1===b[0].i?`hook_map[${"object"===typeof b[0].L?b[0].L.id:b[0].L}]`:"hook_sub"),b=b[0].W;b=b[0].U}for(;b;)a.unshift(ia(b)+(c?":"+c:"")),c=b.P,b=b.K;return a.join("/")||"-"},ja=(...a)=>{console.log(...a)},ka=a=>{ja("lui "+K()+": "+a,...[])},
L=a=>{throw Error("lui: "+a);},la=a=>{ja("lui "+a+": error in callback")},M=(a,b,c)=>{try{return a(...b)}catch(d){throw la(c),d;}},ma=(a,b)=>{a===b||a&&b&&JSON.stringify(H(a))===JSON.stringify(H(b))||L("object keys mismatch")},N=(a,b,c)=>{g||L("hook called outside of hook context");c&&(c.constructor!==G&&L("deps must be in an array"),0===c.length&&L("deps must not be empty"));b&&0!==g[0].i&&L("hook called outside of component rendering");a!==C&&h<g.length&&(g[h].i!==a&&L("inconsistent hook order"),
g[h].h&&na(g[h].h,c))},P=(a,b)=>{N(C,E,C);a!==O(a,a)&&L(b+" changed between renderings")},na=(a,b)=>{b?a.length!==b.length&&L("deps length changed"):0<a.length&&L("deps presence changed")},oa=a=>new Function("a","b",`return a!==b&&(${a.join("||")})`),J=a=>{const b=(a=H(a)).join(",");return ba[b]||(0===a.length&&L("object empty"),a.some(c=>(c.includes("-")||"0123456789".includes(c.charAt(0)))&&L("invalid key: "+c)),ba[b]=oa(a.map(c=>`a.${c}!==b.`+c)))},pa=(a,b)=>(ma(a,b),a===b?B:H(a).filter(c=>a[c]!==
b[c])),Q=a=>a?ca[a.length]||(0===a.length&&L("deps must not be empty"),ca[a.length]=oa(a.map((b,c)=>`a[${c}]!==b[${c}]`))):C,T=(a,b)=>{const c=e,d=b,m=c.v+1;g=c.u;h=1;c.G=E;if(c.s.A!==J){var k=C;try{k=(0,c.s.A)(c.s.o)}catch(R){if(R!==A)throw R;}var n=c.j;"object"!==typeof k&&L("components need to return child list or null");if(k){n&&(a=n,b=C);var r=k.length,l;"number"!==typeof r&&L("childs must be returned in a list");0===r&&L("returned childs list empty");c.l&&r!==c.l.length&&L("returned childs count changed");
var v=c.l||(c.l=(new G(r)).fill(C));do{var p=v[--r];if((l=k[r])&&l!==D){p&&p.s.A!==l.A&&L("child component changed at "+r);if(f=!p)(v[r]=e=p={s:l,T:l.o&&J(l.o),K:c,v:m,P:r,u:[],l:C,j:C,m:C,G:E}).u[0]={i:0,U:p},T(a,b),p.j&&a.insertBefore(p.m=p.j,b);else if(ma(p.s.o,l.o),l.o&&p.T(p.s.o,l.o))(e=p).s=l,T(a,b);p.m&&(b=p.m)}else p&&(U(p,a),v[r]=C)}while(0<r)}else if(c.l){for(r of c.l)r&&U(r,a);c.l=C}n||(c.m=b!==d?b:C)}else{r=c.s.o.A;var w=c.s.o.O;p=c.s.o.o;"object"===typeof w&&w&&w.constructor===G||L("list_data must be an array");
"object"!==typeof p&&L("props must be an object");P(r,"item component");P(p&&H(p).join(","),"common props");v=w.length;let R=D;if(!(0>=O(v,v)+v)){l=V();k={};n=[];w=0<v&&qa(w,k,n);v||V();if(l.M){R=p!==C&&l.T(p,l.da);for(var F of l.ca)F in k||(U(l.M[F],a),delete l.M[F]);l.da=p;l.ca=n}else l.M={},l.Y=w?J(k[n[0]]):C,l.ca=n,l.T=(l.da=p)&&J(p);for(F=c.l=new G(v);0<v;){const S=n[--v];let z=l.M[S];if(f=!z)(l.M[S]=e=z={s:{A:r,o:ea({I:k[S]},p)},T:C,K:c,v:m,P:v,u:[],l:C,j:C,m:C,G:E}).u[0]={i:0,U:z},T(a,b),z.j&&
a.insertBefore(z.m=z.j,b);else if(ra(z,a,b),R||w&&l.Y(k[S],z.s.o.I))(e=z).s.o=ea({I:k[S]},p),T(a,b);(F[z.P=v]=z).m&&(b=z.m)}c.m=b!==d?b:C}}},U=(a,b)=>{b&&a.j&&(b.removeChild(a.j),b=C);if(a.l)for(const c of a.l)c&&U(c,b);W(a.u);if(a.G){let c,d;(!(d=x[c=a.v])||0>(c=d.indexOf(a)))&&(!(d=y[c])||0>(c=d.indexOf(a)))||d.splice(c,1)}},W=a=>{let b,c=a.length;for(;1<c;)switch((b=a[--c]).i){case 3:b.J&&b.J(...b.h);break;case 4:b.h=B;break;case 7:sa(b);break;case 12:W(b.u)}},qa=(a,b,c)=>{const d="object"===typeof a[0],
m=V();m.fa||(a[0]!==C&&["object","string","number"].includes(m.fa=typeof a[0])||L("item type invalid"),d&&(!["string","number"].includes(m.ia=typeof a[0].id)&&L("item id type invalid"),m.keys=H(a[0]).join(",")));for(const k of a)k===C&&L("item is null"),typeof k!==m.fa&&L("item type changed"),d&&(typeof k.id!==m.ia&&L("item id type changed"),H(k).join(",")!==m.keys&&L("item keys differ of "+k.id));for(const k of a)a=d?k.id:k,a in b&&L("item key not unique: "+a),b[a]=k,c.push(a);return d},ra=(a,b,
c)=>{if(a.j)return b.insertBefore(a.j,c),a.j;if(a.m){let d=a.l.length;do a.l[--d]&&(c=ra(a.l[d],b,c));while(0<d)}return c},ta=a=>{for(;0!==a[0].i;){if(!a[0].X.H)return C;a[0].X.H=E;a=a[0].W}return a[0].U},Y=a=>(a=ta(a))&&!a.G&&(a.G=D,x[a.v]?x[a.v].push(a):x[a.v]=[a],u||X()),ua=()=>{N(C,E,C);const a=ta(g);a&&(a.G=D,y[a.v]?y[a.v].push(a):y[a.v]=[a])},va=(a,b)=>{N(3,E,b);if(h>=g.length)g[h]={i:3,B:Q(b),h:b=b||B,J:a(...b)||C};else if(b){const c=g[h];c.B(c.h,b)&&(c.J&&c.J(...c.h),c.J=a(...(c.h=b))||C)}g[h].J&&
g[h].J.then&&L("effect function must be synchronous");++h},wa=a=>{N(5,E,C);if(h<g.length)return g[h++].g;const b=g,c=[a,d=>{c[0]!==d&&(c[0]=d,Y(b))},()=>c[0]];g[h++]={i:5,g:c};return c},V=a=>(N(6,E,C),(h<g.length?g[h++]:g[h++]={i:6,g:void 0===a?{}:a}).g),xa=(a,b)=>(N(8,E,b),h>=g.length?(g[h++]={i:8,B:Q(b),h:b=b||B,g:a(...b)}).g:b&&g[h].B(g[h].h,b)?g[h].g=a(...(g[h++].h=b)):g[h++].g),O=(a,b)=>(N(9,E,C),h<g.length?(b=g[h].g,g[h++].g=a):g[h++]={i:9,g:a},b),ya=(a,b)=>(a=setTimeout(()=>b(D),a),()=>clearTimeout(a)),
sa=a=>{for(const b of a.Z)W(a.N[b])},za=(a,b,c)=>({aa:c.ba,ga:a,$:q,ea:f?q:q+b}),Z=a=>{"object"===typeof a&&a||L("object required");const b=O(a,C);return b?pa(b,a):H(a)},Aa=a=>{P(!a,"attributes presence");const b=e.j;if(a){for(const c of Z(a))switch(1<c.length&&c.charAt(0).toLowerCase()!==c.charAt(0)&&L("capital prop: "+c),c.charCodeAt(0)){case 70:"object"===typeof a.F&&a.F||L("invalid css flags");b.className=H(a.F).filter(d=>a.F[d]).join(" ");continue;case 82:"function"!==typeof a.R&&L("invalid ref"),
a.R(b);case 67:case 68:case 83:continue;default:97>c.charCodeAt(0)&&L("invalid prop: "+c),b[c]=a[c]}P(!a.D,"dataset presence");if(a.D)for(const c of Z(a.D))b.dataset[c]=a.D[c];P(!a.S,"style presence");if(a.S)for(const c of Z(a.S))b.style[c]=a.S[c]}return b},Ba=(a,b,c)=>("string"===typeof a&&L("component expected, use node_dom instead"),c&&c.constructor!==G&&L("invalid childs type"),{A:a,o:b?c?(b.C=c,b):b:c?{C:c}:C}),X=()=>{f=0>=q;q=ha.now();t&&cancelAnimationFrame(t);u=D;t=0;var a;let b=0;for(;(a=
x).length;){10<++b&&L("rerender loop detected");x=[];for(const c of a)if(c)for(e of c)if(e.G){if(e.j)T(C,C);else{let d=C,m=e.m,k=e,n=e;for(;!(a=(k=k.K).j););do{let r=n.P;const {l}=n=n.K,v=l.length;for(;++r<v&&l[r]&&!(d=l[r].m););}while(!d&&n!==k);n=e;T(a,d);if(n.m!==m)for(;!(n=n.K).j;){m=C;for(const r of n.l)if(r&&(m=r.m))break;if(m===n.m)break;n.m=m}}f=E}}u=E;e=g=C;y.length&&(x=y,y=a,Ca())},Ca=()=>t||(t=requestAnimationFrame(X)),Da=a=>{var b=A[a];if(!b){const c=a.indexOf("[");b=0>c?a.substr(0):a.substr(0,
c);(0===b.length||b!==b.toLowerCase()||b.includes(" ")||b.includes("#")||b.includes("."))&&L("dom: invalid tag");A[a]=b=fa.createElement(b);if(0<c){!a.endsWith("]")&&L("dom: ] missing");for(const d of a.substring(c+1,a.length-1).split("]["))!d&&L("dom: empty attribute"),(d.includes("[")||d.includes("]"))&&L("dom: attributes screwed up"),a=d.indexOf("="),d.includes(" ")&&(0>a||d.indexOf(" ")<a)&&L("dom: space in attribute name"),0<a?b[d.substr(0,a)]=d.substr(a+1):b[d]=D}}return b},Ea=a=>{let b=aa[a];
if(!b){const c=Da(a);aa[a]=b=d=>(f&&(e.j=c.cloneNode(D)),Aa(d),d&&d.C||C);b.name_="$"+a}return b};I.onerror=()=>(e&&ka("error in component"),x=y=[],E);I.lui={defer:()=>(e&&L("defer while rendering"),u=D,Ca()),defer_end:()=>(e&&L("defer_end while rendering"),u||L("nothing was deferred"),X()),hook_assert:a=>{N(C,E,C);if(!a)throw A;},hook_async:(a,b,c)=>{N(4,E,b);let d;const m=K();if((h<g.length?(d=g[h++],E):d=g[h++]={i:4,B:Q(b),h:b||B,g:C})||b&&d.B(d.h,b)&&(d.h=b)){void 0!==c&&(d.g=c);const k=g;a(...d.h).then(n=>d.g!==n&&d.h===b&&(d.g=n,Y(k))).catch(n=>{la(m);throw n;})}return d.g},hook_callback:(a,b)=>{const c=h>=g.length?K():"";b&&b.length||L("deps required, use hook_static instead");
const d=V();d.h&&na(d.h,b);d.h=b;return d.ha||(d.ha=(...m)=>M(a,[...d.h,...m],c))},hook_delay:a=>{const [b,c]=wa(E);va(ya,[a,c]);return b},hook_dom:(a,b)=>(N(C,D,C),e.j?f&&L("hook_dom called twice"):f||L("hook_dom skipped before"),b&&(b.C&&L("hook_dom cannot have childs"),b.R&&L("hook_dom cannot have a ref")),f&&(e.j=Da(a).cloneNode(D)),Aa(b||C)),hook_effect:va,hook_first:()=>(N(C,E,C),f),hook_map:(a,b,c)=>{N(7,E,c);let d=C,m=D;if(h<g.length)if((d=g[h]).V!==a)sa(d),d=C;else if(!d.H||c&&d.B(d.h,c))d.h=
c||B,d.H=D;else{if(b===d.O)return++h,d.g;m=E}const k=f,n=g,r=++h,l={},v=[],p=0<b.length&&qa(b,l,v);0===b.length&&V();if(d){if(d.g=[],d.O!==b){d.O=b;for(const w of d.Z)w in l||(W(d.N[w]),delete d.N[w])}}else g[r-1]=d={i:7,B:Q(c),h:c||B,g:[],H:D,V:a,Y:p?J(b[0]):C,Z:[],N:{},O:b};for(const w of v){b=d.N[w];if(f=!b)d.N[w]=b=[{i:1,W:n,X:d,L:C,g:C}];if(m||f||(p?d.Y(l[w],b[0].L):l[w]!==b[0].L)){g=b;h=1;try{b[0].g=a(b[0].L=l[w],...d.h)}catch(F){if(F!==A)throw F;}g=n}d.g.push(b[0].g)}f=k;g=n;h=r;d.Z=v;return d.g},
hook_memo:xa,hook_object_changes:Z,hook_prev:O,hook_reducer:a=>{N(10,E,C);a&&a.constructor!==G&&L("actions array required");"function"===typeof a&&L("array required, use hook_reducer_f instead");if(h<g.length)return g[h++].g;const b=g,c=K(),d=[(0,a[0])(C),(m,k)=>{m=M(a[m],[d[0],k],c);d[0]!==m&&(d[0]=m,Y(b))}];g[h++]={i:10,g:d};return d},hook_reducer_f:(a,b)=>{N(11,E,C);"function"!==typeof a&&L("reducer function required");b&&"function"!==typeof b&&L("initializer must be a function");if(h<g.length)return g[h++].g;
const c=g,d=K(),m=[b?b():C,k=>{k=M(a,[m[0],k],d);m[0]!==k&&(m[0]=k,Y(c))}];g[h++]={i:11,g:m};return m},hook_rerender:ua,hook_state:wa,hook_static:V,hook_sub:(a,b)=>{N(12,E,b);let c=C;if(h<g.length)if((c=g[h]).V!==a)W(c.u),c=C;else if(!c.H||b&&c.B(c.h,b))b&&(c.h=b),c.H=D;else return++h,c.g;const d=f,m=g,k=h;if(f=!c)(g[h]=c={i:12,B:Q(b),h:b||B,g:C,V:a,H:D,u:[]}).u[0]={i:2,W:g,X:c};g=c.u;h=1;try{c.g=a(...c.h)}catch(n){if(n!==A)throw n;}f=d;g=m;h=k+1;return c.g},hook_transition:(a,b)=>{const c=V({ba:a});
a=xa(za,[a,b,c]);return c.ba=a.ea<=q?a.ga:(ua(),a.$===q?a.aa:a.aa+(a.ga-a.aa)*(q-a.$)/(a.ea-a.$))},init:a=>{(e||x.length||y.length)&&L("init called more than once");"function"!==typeof a&&L("no init function specified");let b;const c=fa.body;c.innerHTML="";const d=()=>((!(b=a())||2!==b.length)&&L("root component must return [props, childs]"),P(!b[0],"attributes presence"),b[0]!==C&&("object"!==typeof b[0]&&L("invalid props type"),ma(O(b[0],b[0]),b[0]),b[0].C&&L("root childs must be in second return value")),
Aa(b[0]),b[1]);d.name_="$root";(e={s:{A:d,o:C},T:C,K:C,v:0,P:0,u:[],l:C,j:c,m:c,G:D}).u[0]={i:0,U:e};x[0]=[e];e=g=C;X()},node:Ba,node_dom:(a,b,c)=>Ba(Ea(a),b,c),node_map:(a,b,c)=>Ba(J,{A:a,O:b,o:c||C}),now:()=>q}}