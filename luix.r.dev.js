'use strict';function ba(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}function e(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];if(b)return b.call(a);if("number"==typeof a.length)return{next:ba(a)};throw Error(String(a)+" is not an iterable or ArrayLike");}function f(a){if(!(a instanceof Array)){a=e(a);for(var b,c=[];!(b=a.next()).done;)c.push(b.value);a=c}return a}
function h(){for(var a=Number(this),b=[],c=a;c<arguments.length;c++)b[c-a]=arguments[c];return b};/*
 lui.js web frame work 1.4.3
 inspired by react and mithril
 L3P3.de 2023
*/
(function(){var k=null,q=!k,t=k,u=0,v=0,w=0,z=q,A=[[]],D=[[]],E={},ca={},da={},ea=[],F=[],fa={},G=k,H=q,I=!q,ha=/[A-Z]/g,K=Array,L=Object,M=L.assign,N=L.keys,ia=L.freeze||function(a){return a},ja=L.isFrozen||function(a){return null===a||"object"!==typeof a},ka=document,la=window,ma=la.performance||Date;
function na(a){return void 0===a&&O("model state must not contain undefined, missing return?"),ja(a)||(ia(a).constructor!==K&&(a.constructor!==L&&O("model state must not contain shit like "+a.constructor.name),a=L.values(a)),a.forEach(na))}function oa(a){a=a.s.A;return a===P?"list":a.name_||a.name||"?"}
function Q(){var a=[],b=t,c=G;if(t){for(a[0]="$"+(u-1);0!==b[0].j;)a.unshift(1===b[0].j?"hook_map["+("object"===typeof b[0].L?b[0].L.id:b[0].L)+"]":"hook_sub"),b=b[0].X;b=b[0].V}for(;b;)a.unshift(oa(b)+(c!==G?":"+c:"")),c=b.T,b=b.K;return a.join("/")||"-"}function pa(){console.log.apply(console,f(h.apply(0,arguments)))}function qa(a){var b=h.apply(1,arguments);pa.apply(null,["lui "+Q()+": "+a].concat(f(b)))}function O(a){throw Error("lui: "+a);}
function ra(a){pa("lui "+a+": error in callback");k=G}function R(a,b,c){try{return a.apply(null,f(b))}catch(d){throw ra(c),d;}}function sa(a,b){a===b||a&&b&&JSON.stringify(N(a))===JSON.stringify(N(b))||O("object keys mismatch")}
function S(a,b,c){t||O("hook called outside of hook context");c&&(c.constructor!==K&&O("deps must be in an array"),0===c.length&&O("deps must not be empty"));b&&0!==t[0].j&&O("hook called outside of component rendering");a!==G&&u<t.length&&(t[u].j!==a&&O("inconsistent hook order"),t[u].h&&ua(t[u].h,c))}function T(a,b){S(G,I,G);a!==U(a,a)&&O(b+" changed between renderings")}function ua(a,b){b?a.length!==b.length&&O("deps length changed"):0<a.length&&O("deps presence changed")}
function va(a){return new Function("a","b","return a!==b&&("+a.join("||")+")")}function P(a){var b=(a=N(a)).join(",");return da[b]||(0===a.length&&O("object empty"),a.some(function(c){return(c.includes("-")||"0123456789".includes(c.charAt(0)))&&O("invalid key: "+c)}),da[b]=va(a.map(function(c){return"a."+c+"!==b."+c})))}function xa(a,b){return sa(a,b),a===b?F:N(a).filter(function(c){return a[c]!==b[c]})}
function V(a){return a?ea[a.length]||(0===a.length&&O("deps must not be empty"),ea[a.length]=va(a.map(function(b,c){return"a["+c+"]!==b["+c+"]"}))):G}
function W(a,b){var c=k,d=b,l=c.v+1;t=c.u;u=1;c.G=I;if(c.s.A!==P){var g=G;try{g=(0,c.s.A)(c.s.o||fa)}catch(ta){if(ta!==E)throw ta;}var m=c.i;"object"!==typeof g&&O("components need to return child list or null");if(g){m&&(a=m,b=G);var n=g.length,p;"number"!==typeof n&&O("childs must be returned in a list");0===n&&O("returned childs list empty");c.l&&n!==c.l.length&&O("returned childs count changed");var x=c.l||(c.l=(new K(n)).fill(G));do{var r=x[--n];if((p=g[n])&&p!==H){r&&r.s.A!==p.A&&O("child component changed at "+
n);if(q=!r)x[n]=k=r={s:p,U:p.o&&P(p.o),K:c,v:l,T:n,u:[],l:G,i:G,m:G,G:I},k.u[0]={j:0,V:r},W(a,b),r.i&&a.insertBefore(r.m=r.i,b);else if(sa(r.s.o,p.o),p.o&&r.U(r.s.o,p.o))(k=r).s=p,W(a,b);r.m&&(b=r.m)}else r&&(X(r,a),x[n]=G)}while(0<n)}else if(c.l){l=e(c.l);for(g=l.next();!g.done;g=l.next())(g=g.value)&&X(g,a);c.l=G}m||(c.m=b!==d?b:G)}else{g=c.s.o;m=g.A;var y=g.P;g=g.o;"object"===typeof y&&y&&y.constructor===K||O("list_data must be an array");"object"!==typeof g&&O("props must be an object");T(m,"item component");
T(g&&N(g).join(","),"common props");n=y.length;r=H;if(!(0>=U(n,n)+n)){p=Y();x={};var J=[];y=0<n&&ya(y,x,J);n||Y();if(p.N){r=g&&p.U(g,p.ea);for(var aa=e(p.da),B=aa.next();!B.done;B=aa.next())B=B.value,B in x||(X(p.N[B],a),delete p.N[B]);p.ea=g;p.da=J}else p.N={},p.Z=y?P(x[J[0]]):G,p.da=J,p.U=(p.ea=g)&&P(g);for(aa=c.l=new K(n);0<n;){B=J[--n];var C=p.N[B];if(q=!C)p.N[B]=k=C={s:{A:m,o:M({I:x[B]},g)},U:G,K:c,v:l,T:n,u:[],l:G,i:G,m:G,G:I},k.u[0]={j:0,V:C},W(a,b),C.i&&a.insertBefore(C.m=C.i,b);else{var wa=
za(C);wa&&wa.nextSibling!==b&&Aa(C,a,b);if(r||y&&p.Z(x[B],C.s.o.I))(k=C).s.o=M({I:x[B]},g),W(a,b)}(aa[C.T=n]=C).m&&(b=C.m)}c.m=b!==d?b:G}}}function X(a,b){b&&a.i&&(b.removeChild(a.i),b=G);if(a.l)for(var c=e(a.l),d=c.next();!d.done;d=c.next())(d=d.value)&&X(d,b);Z(a.u);if(a.G){var l,g;(!(g=A[l=a.v])||0>(l=g.indexOf(a)))&&(!(g=D[l])||0>(l=g.indexOf(a)))||g.splice(l,1)}}
function Z(a){for(var b,c=a.length;1<c;)switch((b=a[--c]).j){case 3:b.J&&b.J.apply(b,f(b.h));break;case 4:b.h=F;break;case 7:Ba(b);break;case 11:Z(b.u)}}
function ya(a,b,c){var d="object"===typeof a[0],l=Y();l.ga||(a[0]!==G&&["object","string","number"].includes(l.ga=typeof a[0])||O("item type invalid"),d&&(!["string","number"].includes(l.ka=typeof a[0].id)&&O("item id type invalid"),l.keys=N(a[0]).join(",")));for(var g=e(a),m=g.next();!m.done;m=g.next())m=m.value,m===G&&O("item is null"),typeof m!==l.ga&&O("item type changed"),d&&(typeof m.id!==l.ka&&O("item id type changed"),N(m).join(",")!==l.keys&&O("item keys differ of "+m.id));a=e(a);for(m=a.next();!m.done;m=
a.next())l=m.value,g=d?l.id:l,g in b&&O("item key not unique: "+g),b[g]=l,c.push(g);return d}function za(a){if(a.i)return a.i;var b;a=(b=a.l)?b.length:0;for(var c,d;0<a;)if((d=b[--a])&&(c=za(d)))return c;return G}function Aa(a,b,c){if(a.i)return b.insertBefore(a.i,c);if(a.m){var d=a.l.length;do a.l[--d]&&(c=Aa(a.l[d],b,c));while(0<d)}return c}function Ca(a){for(;0!==a[0].j;){if(!a[0].Y.H)return G;a[0].Y.H=I;a=a[0].X}return a[0].V}
function Da(a){var b;if(b=a=Ca(a))b=!a.G&&(a.G=H,A[a.v]?A[a.v].push(a):A[a.v]=[a],z||Ea());return b}function Fa(){S(G,I,G);var a=Ca(t);a&&(a.G=H,D[a.v]?D[a.v].push(a):D[a.v]=[a])}function Ga(a,b){S(3,I,b);if(u>=t.length)t[u]={j:3,B:V(b),h:b=b||F,J:a.apply(null,f(b))||G};else if(b){var c=t[u];c.B(c.h,b)&&(c.J&&c.J.apply(c,f(c.h)),c.J=a.apply(null,f(c.h=b))||G)}t[u].J&&t[u].J.then&&O("effect function must be synchronous");++u}
function Ha(a){S(5,I,G);if(u<t.length)return t[u++].g;var b=t,c=[a,function(d){c[0]!==d&&(c[0]=d,Da(b))},function(){return c[0]}];t[u++]={j:5,g:c};return c}function Y(a){return S(6,I,G),(u<t.length?t[u++]:t[u++]={j:6,g:void 0===a?{}:a}).g}function Ia(a,b){return S(8,I,b),u>=t.length?(t[u++]={j:8,B:V(b),h:b=b||F,g:a.apply(null,f(b))}).g:b&&t[u].B(t[u].h,b)?t[u].g=a.apply(null,f(t[u++].h=b)):t[u++].g}function U(a,b){return S(9,I,G),u<t.length?(b=t[u].g,t[u++].g=a):t[u++]={j:9,g:a},b}
function Ja(a,b){return a=setTimeout(function(){return b(H)},a),function(){return clearTimeout(a)}}function Ba(a){for(var b=e(a.$),c=b.next();!c.done;c=b.next())Z(a.O[c.value])}function Ka(a,b,c){return{ba:c.ca,ha:a,aa:v,fa:q?v:v+b}}function La(a){"object"===typeof a&&a||O("object required");var b=U(a,G);return b?xa(b,a):N(a)}
function Ma(a){T(!a,"attributes presence");var b=k.i;if(a){for(var c=e(La(a)),d=c.next();!d.done;d=c.next()){d=d.value;1<d.length&&d.charAt(0).toLowerCase()!==d.charAt(0)&&O("capital prop: "+d);switch(d.charCodeAt(0)){case 70:"object"===typeof a.F&&a.F||O("invalid css flags");b.className=N(a.F).filter(function(l){return a.F[l]}).join(" ");continue;case 82:"function"!==typeof a.R&&O("invalid ref"),a.R(b);case 67:case 68:case 83:continue}97>d.charCodeAt(0)&&O("invalid prop: "+d);b[d]=a[d]}T(!a.D,"dataset presence");
if(a.D)for(c=e(La(a.D)),d=c.next();!d.done;d=c.next())d=d.value,b.setAttribute("data-"+d.replace(ha,"-$&").toLowerCase(),a.D[d]);T(!a.S,"style presence");if(a.S)for(c=e(La(a.S)),d=c.next();!d.done;d=c.next())d=d.value,b.style[d]=a.S[d]}return b}function Na(a,b,c){return"string"===typeof a&&O("component expected, use node_dom instead"),c&&c.constructor!==K&&O("invalid childs type"),{A:a,o:b?c?(b.C=c,b):b:c?{C:c}:G}}
function Ea(){q=0>=v;v=ma.now();w&&cancelAnimationFrame(w);z=H;w=0;for(var a,b=0;(a=A).length;){10<++b&&O("rerender loop detected");A=[];a=e(a);for(var c=a.next();!c.done;c=a.next())if(c=c.value){c=e(c);for(var d=c.next();!d.done;d=c.next())if(k=d.value,k.G){if(k.i)W(G,G);else{var l,g=G;d=k.m;for(var m=k,n=k;!(l=(m=m.K).i););do for(var p=n.T,x=(n=n.K).l,r=x.length;++p<r&&x[p]&&!(g=x[p].m););while(!g&&n!==m);n=k;W(l,g);if(n.m!==d)for(;!(n=n.K).i;){d=G;l=e(n.l);for(g=l.next();!(g.done||(g=g.value)&&
(d=g.m));g=l.next());if(d===n.m)break;n.m=d}}q=I}}}z=I;k=t=G;D.length&&(A=D,D=a,Oa())}function Oa(){return w||(w=requestAnimationFrame(Ea))}
function Pa(a){var b=E[a];if(!b){a.startsWith("#")&&O("dom: unknown handle");var c=a.indexOf("[");b=0>c?a:a.substr(0,c);(0===b.length||b!==b.toLowerCase()||b.includes(" ")||b.includes("#")||b.includes("."))&&O("dom: invalid tag");E[a]=b=ka.createElement(b);if(0<c)for(!a.endsWith("]")&&O("dom: ] missing"),a=e(a.substring(c+1,a.length-1).split("][")),c=a.next();!c.done;c=a.next()){c=c.value;!c&&O("dom: empty attribute");(c.includes("[")||c.includes("]"))&&O("dom: attributes screwed up");var d=c.indexOf("=");
c.includes(" ")&&(0>d||c.indexOf(" ")<d)&&O("dom: space in attribute name");0<d?b[c.substr(0,d)]=c.substr(d+1):b[c]=H}}return b}function Qa(a){a&&"string"===typeof a||O("dom: descriptor string expected");var b=ca[a];if(!b){var c=Pa(a);ca[a]=b=function(d){return q&&(k.i=c.cloneNode(H)),Ma(d),d&&d.C||G};b.name_="$"+a}return b}la.onerror=function(){return k&&qa("error in component"),A=D=[],I};var Ra=K.prototype;Ra.fill||(Ra.fill=function(a){for(var b=this.length,c=0;c<b;++c)this[c]=a;return this});define({defer:function(){return k&&O("defer while rendering"),z=H,Oa()},defer_end:function(){return k&&O("defer_end while rendering"),z||O("nothing was deferred"),Ea()},dom_define:function(a,b,c){E["#"+a]&&O("dom_define: handle exists");b=Pa(b);c&&(c&&(c.C&&O("dom_define cannot have childs"),c.R&&O("dom_define cannot have a ref")),b=b.cloneNode(H),c.D&&(M(b.dataset,c.D),delete c.D),c.S&&(M(b.style,c.S),delete c.S),M(b,c));E["#"+a]=b},hook_assert:function(a){S(G,I,G);if(!a)throw E;},hook_async:function(a,
b,c){S(4,I,b);var d,l=Q();if((u<t.length?(d=t[u++],I):d=t[u++]={j:4,B:V(b),h:b||F,g:G})||b&&d.B(d.h,b)&&(d.h=b)){void 0!==c&&(d.g=c);var g=t;a.apply(null,f(d.h)).then(function(m){return d.g!==m&&d.h===b&&(d.g=m,Da(g))}).catch(function(m){ra(l);throw m;})}return d.g},hook_callback:function(a,b){var c=u>=t.length?Q():"";b&&b.length||O("deps required, use hook_static instead");var d=Y();d.h&&ua(d.h,b);d.h=b;return d.ia||(d.ia=function(){var l=h.apply(0,arguments);return R(a,[].concat(f(d.h),f(l)),c)})},
hook_delay:function(a){var b=e(Ha(I)),c=b.next().value;b=b.next().value;Ga(Ja,[a,b]);return c},hook_dom:function(a,b){return S(G,H,G),k.i?q&&O("hook_dom called twice"):q||O("hook_dom skipped before"),b&&(b.C&&O("hook_dom cannot have childs"),b.R&&O("hook_dom cannot have a ref")),q&&(k.i=Pa(a).cloneNode(H)),Ma(b||G)},hook_effect:Ga,hook_map:function(a,b,c){S(7,I,c);var d=G,l=H;if(u<t.length)if((d=t[u]).W!==a)Ba(d),d=G;else if(!d.H||c&&d.B(d.h,c))d.h=c||F,d.H=H;else{if(b===d.P)return++u,d.g;l=I}var g=
q,m=t,n=++u,p={},x=[],r=0<b.length&&ya(b,p,x);0===b.length&&Y();if(d){if(d.g=[],d.P!==b)for(d.P=b,b=e(d.$),c=b.next();!c.done;c=b.next())c=c.value,c in p||(Z(d.O[c]),delete d.O[c])}else t[n-1]=d={j:7,B:V(c),h:c||F,g:[],H:H,W:a,Z:r?P(b[0]):G,$:[],O:{},P:b};b=e(x);for(c=b.next();!c.done;c=b.next()){c=c.value;var y=d.O[c];if(q=!y)d.O[c]=y=[{j:1,X:m,Y:d,L:G,g:G}];if(l||q||(r?d.Z(p[c],y[0].L):p[c]!==y[0].L)){t=y;u=1;try{y[0].g=a.apply(null,[y[0].L=p[c]].concat(f(d.h)))}catch(J){if(J!==E)throw J;}t=m}d.g.push(y[0].g)}q=
g;t=m;u=n;d.$=x;return d.g},hook_memo:Ia,hook_model:function(a){S(10,I,G);"object"===typeof a&&a||O("mutations object required");"function"!==typeof a.init&&O("init mutation required for initial value");if(u<t.length)return t[u++].g;var b=t,c=Q(),d=[R(a.init,[G],c+" -> #init"),{}];R(na,[d[0]],c+" -> #init");for(var l=e(N(a)),g=l.next(),m={};!g.done;m={M:m.M},g=l.next())m.M=g.value,d[1][m.M]=function(n){return function(){var p=R(a[n.M],[d[0]].concat(f(h.apply(0,arguments))),c+" -> #"+n.M);d[0]!==p&&
(R(na,[p],c+" -> #"+n.M),d[0]=p,Da(b))}}(m);t[u++]={j:10,g:d};return d},hook_object_changes:La,hook_prev:U,hook_rerender:Fa,hook_state:Ha,hook_static:Y,hook_sub:function(a,b){S(11,I,b);var c=G;if(u<t.length)if((c=t[u]).W!==a)Z(c.u),c=G;else if(!c.H||b&&c.B(c.h,b))b&&(c.h=b),c.H=H;else return++u,c.g;var d=q,l=t,g=u;if(q=!c)(t[u]=c={j:11,B:V(b),h:b||F,g:G,W:a,H:H,u:[]}).u[0]={j:2,X:t,Y:c};t=c.u;u=1;try{c.g=a.apply(null,f(c.h))}catch(m){if(m!==E)throw m;}q=d;t=l;u=g+1;return c.g},hook_transition:function(a,
b){var c=Y({ca:a});a=Ia(Ka,[a,b,c]);return c.ca=a.fa<=v?a.ha:(Fa(),a.aa===v?a.ba:a.ba+(a.ha-a.ba)*(v-a.aa)/(a.fa-a.aa))},init:function(a,b){function c(){return(!(d=a())||2!==d.length)&&O("root component must return [props, childs]"),T(!d[0],"attributes presence"),d[0]!==G&&("object"!==typeof d[0]&&O("invalid props type"),sa(U(d[0],d[0]),d[0]),d[0].C&&O("root childs must be in second return value")),Ma(d[0]),d[1]}b=void 0===b?ka.body:b;"function"!==typeof a&&O("no init function specified");b instanceof
HTMLElement||O("invalid root element");b.ja&&O("root element already mounted");b.ja=1;var d;b.innerHTML="";c.name_="$root";A[0].push(b={s:{A:c,o:G},U:G,K:G,v:0,T:0,u:[],l:G,i:b,m:b,G:H});b.u[0]={j:0,V:b};k=t=G;Ea()},node:Na,node_dom:function(a,b,c){return Na(Qa(a),b,c)},node_map:function(a,b,c){return Na(P,{A:a,P:b,o:c||G})},now:function(){return v}})})()