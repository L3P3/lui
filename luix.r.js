'use strict';function aa(a){var c=0;return function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}}}function f(a){var c="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];if(c)return c.call(a);if("number"==typeof a.length)return{next:aa(a)};throw Error(String(a)+" is not an iterable or ArrayLike");}function g(a){if(!(a instanceof Array)){a=f(a);for(var c,b=[];!(c=a.next()).done;)b.push(c.value);a=b}return a}
function k(){for(var a=Number(this),c=[],b=a;b<arguments.length;b++)c[b-a]=arguments[b];return c};/*
 lui.js web frame work 2.1.2
 inspired by react and mithril
 L3P3.de 2024
*/
(function(){var p=null,r=!p,t=p,v=0,z=0,A=0,B=!r,C=[],D=[],E={},ba={},ca={},da=[],F=[],ea={},G=p,I=r,J=B,fa=/[A-Z]/g,K=Array,ha=Object,L=ha.assign,M=ha.keys,ia=document,ka=window.performance||Date;function la(a){return new Function("a","b","return a!==b&&("+a.join("||")+")")}function N(a){var c=(a=M(a)).join(",");return ca[c]||(ca[c]=la(a.map(function(b){return"a."+b+"!==b."+b})))}function ma(a,c){return a===c?F:M(a).filter(function(b){return a[b]!==c[b]})}
function O(a){return a?da[a.length]||(da[a.length]=la(a.map(function(c,b){return"a["+b+"]!==b["+b+"]"}))):G}
function P(a,c){var b=p,d=c,h=b.v+1;t=b.s;v=1;b.B=J;if(b.u.H!==N){var e=G;try{e=(0,b.u.H)(b.u.o||ea)}catch(Ea){}var n=b.i;if(e){n&&(a=n,c=G);var m=e.length,l,u=b.l||(b.l=(new K(m)).fill(G));do{var q=u[--m];(l=e[m])&&l!==I?((r=!q)?(u[m]=p=q={u:l,N:l.o&&N(l.o),J:b,v:h,P:m,s:[],l:G,i:G,j:G,B:J},p.s[0]={m:0,U:q},P(a,c),q.i&&a.insertBefore(q.j=q.i,c)):l.o&&q.N(q.u.o,l.o)&&((p=q).u=l,P(a,c)),q.j&&(c=q.j)):q&&(Q(q,a),u[m]=G)}while(0<m)}else if(b.l){h=f(b.l);for(e=h.next();!e.done;e=h.next())(e=e.value)&&
Q(e,a);b.l=G}n||(b.j=c!==d?c:G)}else{e=b.u.o;n=e.H;var w=e.M;e=e.o;m=w.length;q=I;if(!(0>=S(m,m)+m)){l=T();u={};var H=[];w=0<m&&na(w,u,H);if(l.K){q=e&&l.N(e,l.ea);for(var R=f(l.da),x=R.next();!x.done;x=R.next())x=x.value,x in u||(Q(l.K[x],a),delete l.K[x]);l.ea=e;l.da=H}else l.K={},l.W=w?N(u[H[0]]):G,l.da=H,l.N=(l.ea=e)&&N(e);for(R=b.l=new K(m);0<m;){x=H[--m];var y=l.K[x];if(r=!y)l.K[x]=p=y={u:{H:n,o:L({I:u[x]},e)},N:G,J:b,v:h,P:m,s:[],l:G,i:G,j:G,B:J},p.s[0]={m:0,U:y},P(a,c),y.i&&a.insertBefore(y.j=
y.i,c);else{var ja=oa(y);ja&&ja.nextSibling!==c&&pa(y,a,c);if(q||w&&l.W(u[x],y.u.o.I))(p=y).u.o=L({I:u[x]},e),P(a,c)}(R[y.P=m]=y).j&&(c=y.j)}b.j=c!==d?c:G}}}function Q(a,c){c&&a.i&&(c.removeChild(a.i),c=G);if(a.l)for(var b=f(a.l),d=b.next();!d.done;d=b.next())(d=d.value)&&Q(d,c);U(a.s);if(a.B){var h,e;(!(e=C[h=a.v])||0>(h=e.indexOf(a)))&&(!(e=D[h])||0>(h=e.indexOf(a)))||e.splice(h,1)}}
function U(a){for(var c,b=a.length;1<b;)switch((c=a[--b]).m){case 1:c.O&&c.O.apply(c,g(c.h));break;case 2:c.h=F;break;case 3:qa(c);break;case 4:U(c.s)}}function na(a,c,b){var d="object"===typeof a[0];a=f(a);for(var h=a.next();!h.done;h=a.next()){h=h.value;var e=d?h.id:h;c[e]=h;b.push(e)}return d}function oa(a){if(a.i)return a.i;var c;a=(c=a.l)?c.length:0;for(var b,d;0<a;)if((d=c[--a])&&(b=oa(d)))return b;return G}
function pa(a,c,b){if(a.i)return c.insertBefore(a.i,b);if(a.j){var d=a.l.length;do a.l[--d]&&(b=pa(a.l[d],c,b));while(0<d)}return b}function ra(a){for(;0!==a[0].m;){if(!a[0].V.G)return G;a[0].V.G=J;a=a[0].ca}return a[0].U}function V(a){return(a=ra(a))&&sa(a)}function sa(a){return!a.B&&(a.B=I,C[a.v]?C[a.v].push(a):C[a.v]=[a],B||W())}function ta(){var a=ra(t);a&&(a.B=I,D[a.v]?D[a.v].push(a):D[a.v]=[a])}
function ua(a,c){if(v>=t.length)t[v]={m:1,A:O(c),h:c=c||F,O:a.apply(null,g(c))||G};else if(c){var b=t[v];b.A(b.h,c)&&(b.O&&b.O.apply(b,g(b.h)),b.O=a.apply(null,g(b.h=c))||G)}++v}function va(a){if(v<t.length)return t[v++].g;var c=t,b=[a,function(d){b[0]!==d&&(b[0]=d,V(c))},function(){return b[0]}];t[v++]={m:0,g:b};return b}function T(a){return(v<t.length?t[v++]:t[v++]={m:0,g:void 0===a?{}:a}).g}
function wa(a,c){return v>=t.length?(t[v++]={m:0,A:O(c),h:c=c||F,g:a.apply(null,g(c))}).g:c&&t[v].A(t[v].h,c)?t[v].g=a.apply(null,g(t[v++].h=c)):t[v++].g}function S(a,c){return v<t.length?(c=t[v].g,t[v++].g=a):t[v++]={m:0,g:a},c}function xa(a,c){return a=setTimeout(function(){return c(I)},a),function(){return clearTimeout(a)}}function qa(a){for(var c=f(a.Y),b=c.next();!b.done;b=c.next())U(a.L[b.value])}function ya(a,c,b){return{aa:b.ba,ga:a,$:z,fa:r?z:z+c}}
function X(a){var c=S(a,G);return c?ma(c,a):M(a)}
function za(a){var c=p.i;if(a){for(var b=f(X(a)),d=b.next();!d.done;d=b.next()){d=d.value;switch(d.charCodeAt(0)){case 70:c.className=M(a.F).filter(function(h){return a.F[h]}).join(" ");continue;case 82:a.R(c);case 67:case 68:case 83:continue}c[d]=a[d]}if(a.D)for(b=f(X(a.D)),d=b.next();!d.done;d=b.next())d=d.value,c.setAttribute("data-"+d.replace(fa,"-$&").toLowerCase(),a.D[d]);if(a.S)for(b=f(X(a.S)),d=b.next();!d.done;d=b.next())d=d.value,c.style[d]=a.S[d]}return c}
function Y(a,c,b){return{H:a,o:c?b?(c.C=b,c):c:b?{C:b}:G}}
function W(){r=0>=z;z=ka.now();A&&cancelAnimationFrame(A);B=I;A=0;for(var a;(a=C).length;){C=[];a=f(a);for(var c=a.next();!c.done;c=a.next())if(c=c.value){c=f(c);for(var b=c.next();!b.done;b=c.next())if(p=b.value,p.B){if(p.i)P(G,G);else{var d,h=G;b=p.j;for(var e=p,n=p;!(d=(e=e.J).i););do for(var m=n.P,l=(n=n.J).l,u=l.length;++m<u&&l[m]&&!(h=l[m].j););while(!h&&n!==e);n=p;P(d,h);if(n.j!==b)for(;!(n=n.J).i;){b=G;d=f(n.l);for(h=d.next();!(h.done||(h=h.value)&&(b=h.j));h=d.next());if(b===n.j)break;n.j=
b}}r=J}}}B=J;D.length&&(C=D,D=a,Aa())}function Aa(){return A||(A=requestAnimationFrame(W))}var Ba=W;function Z(a){var c=E[a];if(!c){var b=a.indexOf("[");E[a]=c=ia.createElement(0>b?a:a.substr(0,b));if(0<b)for(a=f(a.substring(b+1,a.length-1).split("][")),b=a.next();!b.done;b=a.next()){b=b.value;var d=b.indexOf("=");0<d?c[b.substr(0,d)]=b.substr(d+1):c[b]=I}}return c}function Ca(a){var c=ba[a];if(!c){var b=Z(a);ba[a]=c=function(d){return r&&(p.i=b.cloneNode(I)),za(d),d&&d.C||G}}return c}var Da=K.prototype;
Da.fill||(Da.fill=function(a){for(var c=this.length,b=0;b<c;++b)this[b]=a;return this});define({defer:function(){return B=I,Aa()},defer_end:Ba,dom_define:function(a,c,b){c=Z(c);b&&(c=c.cloneNode(I),b.D&&(L(c.dataset,b.D),delete b.D),b.S&&(L(c.style,b.S),delete b.S),L(c,b));E["#"+a]=c},hook_assert:function(a){if(!a)throw E;},hook_async:function(a,c,b){var d;if((v<t.length?(d=t[v++],J):d=t[v++]={m:2,A:O(c),h:c||F,g:G})||c&&d.A(d.h,c)&&(d.h=c)){void 0!==b&&(d.g=b);var h=t;a.apply(null,g(d.h)).then(function(e){return d.g!==e&&d.h===c&&(d.g=e,V(h))})}return d.g},hook_callback:function(a,
c){var b=T();b.h=c;return b.ha||(b.ha=function(){var d=k.apply(0,arguments);return a.apply(null,[].concat(g(b.h),g(d)))})},hook_delay:function(a){var c=f(va(J)),b=c.next().value;c=c.next().value;ua(xa,[a,c]);return b},hook_dom:function(a,c){return p.i===G&&(p.i=Z(a).cloneNode(I)),za(c||G)},hook_effect:ua,hook_map:function(a,c,b){var d=G,h=I;if(v<t.length)if((d=t[v]).T!==a)qa(d),d=G;else if(!d.G||b&&d.A(d.h,b))d.h=b||F,d.G=I;else{if(c===d.M)return++v,d.g;h=J}var e=r,n=t,m=++v,l={},u=[],q=0<c.length&&
na(c,l,u);if(d){if(d.g=[],d.M!==c)for(d.M=c,c=f(d.Y),b=c.next();!b.done;b=c.next())b=b.value,b in l||(U(d.L[b]),delete d.L[b])}else t[m-1]=d={m:3,A:O(b),h:b||F,g:[],G:I,T:a,W:q?N(c[0]):G,Y:[],L:{},M:c};c=f(u);for(b=c.next();!b.done;b=c.next()){b=b.value;var w=d.L[b];if(r=!w)d.L[b]=w=[{m:1,ca:n,V:d,X:G,g:G}];if(h||r||(q?d.W(l[b],w[0].X):l[b]!==w[0].X)){t=w;v=1;try{w[0].g=a.apply(null,[w[0].X=l[b]].concat(g(d.h)))}catch(H){}}d.g.push(w[0].g)}r=e;t=n;v=m;d.Y=u;return d.g},hook_memo:wa,hook_model:function(a){if(v<
t.length)return t[v++].g;for(var c=t,b=[(0,a.init)(G),{}],d=f(M(a)),h=d.next(),e={};!h.done;e={Z:void 0},h=d.next())e.Z=h.value,b[1][e.Z]=function(n){return function(){var m=a[n.Z].apply(null,[b[0]].concat(g(k.apply(0,arguments))));b[0]!==m&&(b[0]=m,V(c))}}(e);t[v++]={m:0,g:b};return b},hook_object_changes:X,hook_prev:S,hook_rerender:ta,hook_state:va,hook_static:T,hook_sub:function(a,c){var b=G;if(v<t.length)if((b=t[v]).T!==a)U(b.s),b=G;else if(!b.G||c&&b.A(b.h,c))c&&(b.h=c),b.G=I;else return++v,
b.g;var d=r,h=t,e=v;if(r=!b)(t[v]=b={m:4,A:O(c),h:c||F,g:G,T:a,G:I,s:[]}).s[0]={m:2,ca:t,V:b};t=b.s;v=1;try{b.g=a.apply(null,g(b.h))}catch(n){}r=d;t=h;v=e+1;return b.g},hook_transition:function(a,c){var b=T({ba:a});a=wa(ya,[a,c,b]);return b.ba=a.fa<=z?a.ga:(ta(),a.$===z?a.aa:a.aa+(a.ga-a.aa)*(z-a.$)/(a.fa-a.$))},init:function(a,c,b){c=void 0===c?ia.body:c;b=void 0===b?G:b;c.innerHTML="";a={u:{H:a,o:b},N:G,J:G,v:0,P:0,s:[],l:G,i:c,j:c,B:J};a.s[0]={m:0,U:a};sa(a)},node:Y,node_dom:function(a,c,b){return Y(Ca(a),
c,b)},node_map:function(a,c,b){return Y(N,{H:a,M:c,o:b||G})},now:function(){return z}})})()