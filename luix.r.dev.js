'use strict';function ba(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}function e(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];if(b)return b.call(a);if("number"==typeof a.length)return{next:ba(a)};throw Error(String(a)+" is not an iterable or ArrayLike");}function f(a){if(!(a instanceof Array)){a=e(a);for(var b,c=[];!(b=a.next()).done;)c.push(b.value);a=c}return a}
function h(){for(var a=Number(this),b=[],c=a;c<arguments.length;c++)b[c-a]=arguments[c];return b};/*
 lui.js web frame work 2.1.1
 inspired by react and mithril
 L3P3.de 2024
*/
(function(){var k=null,q=!k,t=k,u=0,w=0,x=0,z=!q,A=[],D=[],E={},ca={},da={},ea=[],F=[],fa={},G=k,H=q,I=z,ha=/[A-Z]/g,K=Array,L=Object,M=L.assign,N=L.keys,ia=L.freeze||function(a){return a},ja=L.isFrozen||function(a){return a===G||"object"!==typeof a},ka=document,la=window,ma=la.performance||Date;
function na(a){return void 0===a&&O("model state must not contain undefined, missing return?"),ja(a)||(ia(a).constructor!==K&&(a.constructor!==L&&O("model state must not contain shit like "+a.constructor.name),a=L.values(a)),a.forEach(na))}function oa(a){a=a.s.A;return a===P?"list":a.name_||a.name||"?"}
function Q(){var a=[],b=t,c=G;if(t){for(a[0]="$"+(u-1);0!==b[0].j;)a.unshift(1===b[0].j?"hook_map["+("object"===typeof b[0].K?b[0].K.id:b[0].K)+"]":"hook_sub"),b=b[0].X;b=b[0].V}for(;b;)a.unshift(oa(b)+(c!==G?":"+c:"")),c=b.T,b=b.J;return a.join("/")||"-"}function pa(){console.log.apply(console,f(h.apply(0,arguments)))}function qa(a){var b=h.apply(1,arguments);pa.apply(null,["lui "+Q()+": "+a].concat(f(b)))}function O(a){throw Error("lui: "+a);}
function ra(a){pa("lui "+a+": error in callback");k=G}function R(a,b,c){try{return a.apply(null,f(b))}catch(d){throw ra(c),d;}}function ta(a,b){a===b||a&&b&&JSON.stringify(N(a))===JSON.stringify(N(b))||O("object keys mismatch")}
function S(a,b,c){t||O("hook called outside of hook context");c&&(c.constructor!==K&&O("deps must be in an array"),0===c.length&&O("deps must not be empty"));b&&0!==t[0].j&&O("hook called outside of component rendering");a!==G&&u<t.length&&(t[u].j!==a&&O("inconsistent hook order"),t[u].h&&ua(t[u].h,c))}function T(a,b){S(G,I,G);a!==U(a,a)&&O(b+" changed between renderings")}function ua(a,b){b?a.length!==b.length&&O("deps length changed"):0<a.length&&O("deps presence changed")}
function wa(a){return new Function("a","b","return a!==b&&("+a.join("||")+")")}function P(a){var b=(a=N(a)).join(",");return da[b]||(0===a.length&&O("object empty"),a.some(function(c){return(c.includes("-")||"0123456789".includes(c.charAt(0)))&&O("invalid key: "+c)}),da[b]=wa(a.map(function(c){return"a."+c+"!==b."+c})))}function xa(a,b){return ta(a,b),a===b?F:N(a).filter(function(c){return a[c]!==b[c]})}
function V(a){return a?ea[a.length]||(0===a.length&&O("deps must not be empty"),ea[a.length]=wa(a.map(function(b,c){return"a["+c+"]!==b["+c+"]"}))):G}
function W(a,b){var c=k,d=b,l=c.v+1;t=c.u;u=1;c.G=I;if(c.s.A!==P){var g=G;try{g=(0,c.s.A)(c.s.o||fa)}catch(sa){if(sa!==E)throw sa;}var p=c.i;"object"!==typeof g&&O("components need to return child list or null");if(g){p&&(a=p,b=G);var m=g.length,n;"number"!==typeof m&&O("childs must be returned in a list");0===m&&O("returned childs list empty");c.l&&m!==c.l.length&&O("returned childs count changed");var v=c.l||(c.l=(new K(m)).fill(G));do{var r=v[--m];if((n=g[m])&&n!==H){n.length!=G&&0===m&&0===k.v&&
O("root component signature changed, see https://github.com/L3P3/lui/issues/53");!n.A&&O("invalid node type at "+m);r&&r.s.A!==n.A&&O("node type changed at "+m);if(q=!r)v[m]=k=r={s:n,U:n.o&&P(n.o),J:c,v:l,T:m,u:[],l:G,i:G,m:G,G:I},k.u[0]={j:0,V:r},W(a,b),r.i&&a.insertBefore(r.m=r.i,b);else if(ta(r.s.o,n.o),n.o&&r.U(r.s.o,n.o))(k=r).s=n,W(a,b);r.m&&(b=r.m)}else r&&(X(r,a),v[m]=G)}while(0<m)}else if(c.l){l=e(c.l);for(g=l.next();!g.done;g=l.next())(g=g.value)&&X(g,a);c.l=G}p||(c.m=b!==d?b:G)}else{g=
c.s.o;p=g.A;var y=g.P;g=g.o;"object"===typeof y&&y&&y.constructor===K||O("list_data must be an array");"object"!==typeof g&&O("props must be an object");T(p,"item component");T(g&&N(g).join(","),"common props");m=y.length;r=H;if(!(0>=U(m,m)+m)){n=Y();v={};var J=[];y=0<m&&ya(y,v,J);m||Y();if(n.M){r=g&&n.U(g,n.ea);for(var aa=e(n.da),B=aa.next();!B.done;B=aa.next())B=B.value,B in v||(X(n.M[B],a),delete n.M[B]);n.ea=g;n.da=J}else n.M={},n.Z=y?P(v[J[0]]):G,n.da=J,n.U=(n.ea=g)&&P(g);for(aa=c.l=new K(m);0<
m;){B=J[--m];var C=n.M[B];if(q=!C)n.M[B]=k=C={s:{A:p,o:M({I:v[B]},g)},U:G,J:c,v:l,T:m,u:[],l:G,i:G,m:G,G:I},k.u[0]={j:0,V:C},W(a,b),C.i&&a.insertBefore(C.m=C.i,b);else{var va=za(C);va&&va.nextSibling!==b&&Aa(C,a,b);if(r||y&&n.Z(v[B],C.s.o.I))(k=C).s.o=M({I:v[B]},g),W(a,b)}(aa[C.T=m]=C).m&&(b=C.m)}c.m=b!==d?b:G}}}
function X(a,b){b&&a.i&&(b.removeChild(a.i),b=G);if(a.l)for(var c=e(a.l),d=c.next();!d.done;d=c.next())(d=d.value)&&X(d,b);Z(a.u);if(a.G){var l,g;(!(g=A[l=a.v])||0>(l=g.indexOf(a)))&&(!(g=D[l])||0>(l=g.indexOf(a)))||g.splice(l,1)}}function Z(a){for(var b,c=a.length;1<c;)switch((b=a[--c]).j){case 3:b.L&&b.L.apply(b,f(b.h));break;case 4:b.h=F;break;case 7:Ba(b);break;case 11:Z(b.u)}}
function ya(a,b,c){var d="object"===typeof a[0],l=Y();l.ga||(a[0]!==G&&["object","string","number"].includes(l.ga=typeof a[0])||O("item type invalid"),d&&(!["string","number"].includes(l.ja=typeof a[0].id)&&O("item id type invalid"),l.keys=N(a[0]).join(",")));for(var g=e(a),p=g.next();!p.done;p=g.next())p=p.value,p===G&&O("item is null"),typeof p!==l.ga&&O("item type changed"),d&&(typeof p.id!==l.ja&&O("item id type changed"),N(p).join(",")!==l.keys&&O("item keys differ of "+p.id));a=e(a);for(l=a.next();!l.done;l=
a.next())l=l.value,g=d?l.id:l,g in b&&O("item key not unique: "+g),b[g]=l,c.push(g);return d}function za(a){if(a.i)return a.i;var b;a=(b=a.l)?b.length:0;for(var c,d;0<a;)if((d=b[--a])&&(c=za(d)))return c;return G}function Aa(a,b,c){if(a.i)return b.insertBefore(a.i,c);if(a.m){var d=a.l.length;do a.l[--d]&&(c=Aa(a.l[d],b,c));while(0<d)}return c}function Ca(a){for(;0!==a[0].j;){if(!a[0].Y.H)return G;a[0].Y.H=I;a=a[0].X}return a[0].V}function Da(a){return(a=Ca(a))&&Ea(a)}
function Ea(a){return!a.G&&(a.G=H,A[a.v]?A[a.v].push(a):A[a.v]=[a],z||Fa())}function Ga(){S(G,I,G);var a=Ca(t);a&&(a.G=H,D[a.v]?D[a.v].push(a):D[a.v]=[a])}function Ha(a,b){S(3,I,b);if(u>=t.length)t[u]={j:3,B:V(b),h:b=b||F,L:a.apply(null,f(b))||G};else if(b){var c=t[u];c.B(c.h,b)&&(c.L&&c.L.apply(c,f(c.h)),c.L=a.apply(null,f(c.h=b))||G)}var d;(null==(d=t[u].L)?0:d.then)&&O("effect function must be synchronous");++u}
function Ia(a){S(5,I,G);if(u<t.length)return t[u++].g;var b=t,c=[a,function(d){c[0]!==d&&(c[0]=d,Da(b))},function(){return c[0]}];t[u++]={j:5,g:c};return c}function Y(a){return S(6,I,G),(u<t.length?t[u++]:t[u++]={j:6,g:void 0===a?{}:a}).g}function Ja(a,b){return S(8,I,b),u>=t.length?(t[u++]={j:8,B:V(b),h:b=b||F,g:a.apply(null,f(b))}).g:b&&t[u].B(t[u].h,b)?t[u].g=a.apply(null,f(t[u++].h=b)):t[u++].g}function U(a,b){return S(9,I,G),u<t.length?(b=t[u].g,t[u++].g=a):t[u++]={j:9,g:a},b}
function Ka(a,b){return a=setTimeout(function(){return b(H)},a),function(){return clearTimeout(a)}}function Ba(a){for(var b=e(a.$),c=b.next();!c.done;c=b.next())Z(a.N[c.value])}function La(a,b,c){return{ba:c.ca,ha:a,aa:w,fa:q?w:w+b}}function Ma(a){"object"===typeof a&&a||O("object required");var b=U(a,G);return b?xa(b,a):N(a)}
function Na(a){T(!a,"attributes presence");var b=k.i;if(a){for(var c=e(Ma(a)),d=c.next();!d.done;d=c.next()){d=d.value;1<d.length&&d.charAt(0).toLowerCase()!==d.charAt(0)&&O("capital prop: "+d);switch(d.charCodeAt(0)){case 70:"object"===typeof a.F&&a.F||O("invalid css flags");b.className=N(a.F).filter(function(l){return a.F[l]}).join(" ");continue;case 82:"function"!==typeof a.R&&O("invalid ref"),a.R(b);case 67:case 68:case 83:continue}97>d.charCodeAt(0)&&O("invalid prop: "+d);b[d]=a[d]}T(!a.D,"dataset presence");
if(a.D)for(c=e(Ma(a.D)),d=c.next();!d.done;d=c.next())d=d.value,b.setAttribute("data-"+d.replace(ha,"-$&").toLowerCase(),a.D[d]);T(!a.S,"style presence");if(a.S)for(c=e(Ma(a.S)),d=c.next();!d.done;d=c.next())d=d.value,b.style[d]=a.S[d]}return b}function Oa(a,b,c){return"string"===typeof a&&O("component expected, use node_dom instead"),c&&c.constructor!==K&&O("invalid childs type"),{A:a,o:b?c?(b.C=c,b):b:c?{C:c}:G}}
function Fa(){q=0>=w;w=ma.now();x&&cancelAnimationFrame(x);z=H;x=0;for(var a,b=0;(a=A).length;){10<++b&&O("rerender loop detected");A=[];a=e(a);for(var c=a.next();!c.done;c=a.next())if(c=c.value){c=e(c);for(var d=c.next();!d.done;d=c.next())if(k=d.value,k.G){if(k.i)W(G,G);else{var l,g=G;d=k.m;for(var p=k,m=k;!(l=(p=p.J).i););do for(var n=m.T,v=(m=m.J).l,r=v.length;++n<r&&v[n]&&!(g=v[n].m););while(!g&&m!==p);m=k;W(l,g);if(m.m!==d)for(;!(m=m.J).i;){d=G;l=e(m.l);for(g=l.next();!(g.done||(g=g.value)&&
(d=g.m));g=l.next());if(d===m.m)break;m.m=d}}q=I}}}z=I;k=t=G;D.length&&(A=D,D=a,Pa())}function Pa(){return x||(x=requestAnimationFrame(Fa))}
function Qa(a){var b=E[a];if(!b){a.startsWith("#")&&O("dom: unknown handle");var c=a.indexOf("[");b=0>c?a:a.substr(0,c);(0===b.length||b!==b.toLowerCase()||b.includes(" ")||b.includes("#")||b.includes("."))&&O("dom: invalid tag");E[a]=b=ka.createElement(b);if(0<c)for(!a.endsWith("]")&&O("dom: ] missing"),a=e(a.substring(c+1,a.length-1).split("][")),c=a.next();!c.done;c=a.next()){c=c.value;!c&&O("dom: empty attribute");(c.includes("[")||c.includes("]"))&&O("dom: attributes screwed up");var d=c.indexOf("=");
c.includes(" ")&&(0>d||c.indexOf(" ")<d)&&O("dom: space in attribute name");0<d?b[c.substr(0,d)]=c.substr(d+1):b[c]=H}}return b}function Ra(a){a&&"string"===typeof a||O("dom: descriptor string expected");var b=ca[a];if(!b){var c=Qa(a);ca[a]=b=function(d){return q&&(k.i=c.cloneNode(H)),Na(d),d&&d.C||G};b.name_="$"+a}return b}la.onerror=function(){return k&&qa("error in component"),A=D=[],I};var Sa=K.prototype;Sa.fill||(Sa.fill=function(a){for(var b=this.length,c=0;c<b;++c)this[c]=a;return this});define({defer:function(){return k&&O("defer while rendering"),z=H,Pa()},defer_end:function(){return k&&O("defer_end while rendering"),z||O("nothing was deferred"),Fa()},dom_define:function(a,b,c){E["#"+a]&&O("dom_define: handle exists");b=Qa(b);c&&(c&&(c.C&&O("dom_define cannot have childs"),c.R&&O("dom_define cannot have a ref")),b=b.cloneNode(H),c.D&&(M(b.dataset,c.D),delete c.D),c.S&&(M(b.style,c.S),delete c.S),M(b,c));E["#"+a]=b},hook_assert:function(a){S(G,I,G);if(!a)throw E;},hook_async:function(a,
b,c){S(4,I,b);var d,l=Q();if((u<t.length?(d=t[u++],I):d=t[u++]={j:4,B:V(b),h:b||F,g:G})||b&&d.B(d.h,b)&&(d.h=b)){void 0!==c&&(d.g=c);var g=t;a.apply(null,f(d.h)).then(function(p){return d.g!==p&&d.h===b&&(d.g=p,Da(g))}).catch(function(p){ra(l);throw p;})}return d.g},hook_callback:function(a,b){var c=u>=t.length?Q():"";(null==b?0:b.length)||O("deps required, use hook_static instead");var d=Y();d.h&&ua(d.h,b);d.h=b;return d.ia||(d.ia=function(){var l=h.apply(0,arguments);return R(a,[].concat(f(d.h),
f(l)),c)})},hook_delay:function(a){var b=e(Ia(I)),c=b.next().value;b=b.next().value;Ha(Ka,[a,b]);return c},hook_dom:function(a,b){return S(G,H,G),k.i?q&&k.J&&O("hook_dom called twice"):q||O("hook_dom skipped before"),b&&(b.C&&O("hook_dom cannot have childs"),b.R&&O("hook_dom cannot have a ref")),k.i===G&&(k.i=Qa(a).cloneNode(H)),Na(b||G)},hook_effect:Ha,hook_map:function(a,b,c){S(7,I,c);var d=G,l=H;if(u<t.length)if((d=t[u]).W!==a)Ba(d),d=G;else if(!d.H||c&&d.B(d.h,c))d.h=c||F,d.H=H;else{if(b===d.P)return++u,
d.g;l=I}var g=q,p=t,m=++u,n={},v=[],r=0<b.length&&ya(b,n,v);0===b.length&&Y();if(d){if(d.g=[],d.P!==b)for(d.P=b,b=e(d.$),c=b.next();!c.done;c=b.next())c=c.value,c in n||(Z(d.N[c]),delete d.N[c])}else t[m-1]=d={j:7,B:V(c),h:c||F,g:[],H:H,W:a,Z:r?P(b[0]):G,$:[],N:{},P:b};b=e(v);for(c=b.next();!c.done;c=b.next()){c=c.value;var y=d.N[c];if(q=!y)d.N[c]=y=[{j:1,X:p,Y:d,K:G,g:G}];if(l||q||(r?d.Z(n[c],y[0].K):n[c]!==y[0].K)){t=y;u=1;try{y[0].g=a.apply(null,[y[0].K=n[c]].concat(f(d.h)))}catch(J){if(J!==E)throw J;
}t=p}d.g.push(y[0].g)}q=g;t=p;u=m;d.$=v;return d.g},hook_memo:Ja,hook_model:function(a){S(10,I,G);"object"===typeof a&&a||O("mutations object required");"function"!==typeof a.init&&O("init mutation required for initial value");if(u<t.length)return t[u++].g;var b=t,c=Q(),d=[R(a.init,[G],c+" -> #init"),{}];R(na,[d[0]],c+" -> #init");for(var l=e(N(a)),g=l.next(),p={};!g.done;p={O:void 0},g=l.next())p.O=g.value,d[1][p.O]=function(m){return function(){var n=R(a[m.O],[d[0]].concat(f(h.apply(0,arguments))),
c+" -> #"+m.O);d[0]!==n&&(R(na,[n],c+" -> #"+m.O),d[0]=n,Da(b))}}(p);t[u++]={j:10,g:d};return d},hook_object_changes:Ma,hook_prev:U,hook_rerender:Ga,hook_state:Ia,hook_static:Y,hook_sub:function(a,b){S(11,I,b);var c=G;if(u<t.length)if((c=t[u]).W!==a)Z(c.u),c=G;else if(!c.H||b&&c.B(c.h,b))b&&(c.h=b),c.H=H;else return++u,c.g;var d=q,l=t,g=u;if(q=!c)(t[u]=c={j:11,B:V(b),h:b||F,g:G,W:a,H:H,u:[]}).u[0]={j:2,X:t,Y:c};t=c.u;u=1;try{c.g=a.apply(null,f(c.h))}catch(p){if(p!==E)throw p;}q=d;t=l;u=g+1;return c.g},
hook_transition:function(a,b){var c=Y({ca:a});a=Ja(La,[a,b,c]);return c.ca=a.fa<=w?a.ha:(Ga(),a.aa===w?a.ba:a.ba+(a.ha-a.ba)*(w-a.aa)/(a.fa-a.aa))},init:function(a,b,c){b=void 0===b?ka.body:b;c=void 0===c?G:c;"function"!==typeof a&&O("no init function specified");b.innerHTML!=G||O("invalid component_ element");b._lui_used&&O("root element already mounted");b._lui_used=1;b.innerHTML="";b={s:{A:a,o:c},U:G,J:G,v:0,T:0,u:[],l:G,i:b,m:b,G:I};b.u[0]={j:0,V:b};a.name_="$root";k=t=G;Ea(b)},node:Oa,node_dom:function(a,
b,c){return Oa(Ra(a),b,c)},node_map:function(a,b,c){return Oa(P,{A:a,P:b,o:c||G})},now:function(){return w}})})()