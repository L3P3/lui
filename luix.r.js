'use strict';function aa(a){var c=0;return function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}}}function f(a){var c="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];if(c)return c.call(a);if("number"==typeof a.length)return{next:aa(a)};throw Error(String(a)+" is not an iterable or ArrayLike");}function g(a){if(!(a instanceof Array)){a=f(a);for(var c,b=[];!(c=a.next()).done;)b.push(c.value);a=b}return a}
function ba(){for(var a=Number(this),c=[],b=a;b<arguments.length;b++)c[b-a]=arguments[b];return c};/*
 lui.js web frame work 1.4.3
 inspired by react and mithril
 L3P3.de 2023
*/
(function(){var h=null,p=!h,r=h,t=0,u=0,z=0,A=p,B=[[]],C=[[]],D={},ca={},da={},ea=[],E=[],fa={},F=h,G=p,I=!p,ha=/[A-Z]/g,J=Array,ia=Object,K=ia.assign,L=ia.keys,ja=document,la=window.performance||Date;function ma(a){return new Function("a","b","return a!==b&&("+a.join("||")+")")}function M(a){var c=(a=L(a)).join(",");return da[c]||(da[c]=ma(a.map(function(b){return"a."+b+"!==b."+b})))}function na(a,c){return a===c?E:L(a).filter(function(b){return a[b]!==c[b]})}
function N(a){return a?ea[a.length]||(ea[a.length]=ma(a.map(function(c,b){return"a["+b+"]!==b["+b+"]"}))):F}
function O(a,c){var b=h,d=c,k=b.v+1;r=b.s;t=1;b.B=I;if(b.u.H!==M){var e=F;try{e=(0,b.u.H)(b.u.o||fa)}catch(Da){}var n=b.i;if(e){n&&(a=n,c=F);var m=e.length,l,v=b.l||(b.l=(new J(m)).fill(F));do{var q=v[--m];(l=e[m])&&l!==G?((p=!q)?(v[m]=h=q={u:l,N:l.o&&M(l.o),J:b,v:k,T:m,s:[],l:F,i:F,j:F,B:I},h.s[0]={m:0,V:q},O(a,c),q.i&&a.insertBefore(q.j=q.i,c)):l.o&&q.N(q.u.o,l.o)&&((h=q).u=l,O(a,c)),q.j&&(c=q.j)):q&&(P(q,a),v[m]=F)}while(0<m)}else if(b.l){k=f(b.l);for(e=k.next();!e.done;e=k.next())(e=e.value)&&
P(e,a);b.l=F}n||(b.j=c!==d?c:F)}else{e=b.u.o;n=e.H;var w=e.M;e=e.o;m=w.length;q=G;if(!(0>=Q(m,m)+m)){l=S();v={};var H=[];w=0<m&&oa(w,v,H);if(l.K){q=e&&l.N(e,l.ea);for(var R=f(l.da),x=R.next();!x.done;x=R.next())x=x.value,x in v||(P(l.K[x],a),delete l.K[x]);l.ea=e;l.da=H}else l.K={},l.X=w?M(v[H[0]]):F,l.da=H,l.N=(l.ea=e)&&M(e);for(R=b.l=new J(m);0<m;){x=H[--m];var y=l.K[x];if(p=!y)l.K[x]=h=y={u:{H:n,o:K({I:v[x]},e)},N:F,J:b,v:k,T:m,s:[],l:F,i:F,j:F,B:I},h.s[0]={m:0,V:y},O(a,c),y.i&&a.insertBefore(y.j=
y.i,c);else{var ka=pa(y);ka&&ka.nextSibling!==c&&qa(y,a,c);if(q||w&&l.X(v[x],y.u.o.I))(h=y).u.o=K({I:v[x]},e),O(a,c)}(R[y.T=m]=y).j&&(c=y.j)}b.j=c!==d?c:F}}}function P(a,c){c&&a.i&&(c.removeChild(a.i),c=F);if(a.l)for(var b=f(a.l),d=b.next();!d.done;d=b.next())(d=d.value)&&P(d,c);T(a.s);if(a.B){var k,e;(!(e=B[k=a.v])||0>(k=e.indexOf(a)))&&(!(e=C[k])||0>(k=e.indexOf(a)))||e.splice(k,1)}}
function T(a){for(var c,b=a.length;1<b;)switch((c=a[--b]).m){case 1:c.O&&c.O.apply(c,g(c.h));break;case 2:c.h=E;break;case 3:ra(c);break;case 4:T(c.s)}}function oa(a,c,b){var d,k="object"===typeof a[0];a=f(a);for(d=a.next();!d.done;d=a.next()){d=d.value;var e=k?d.id:d;c[e]=d;b.push(e)}return k}function pa(a){if(a.i)return a.i;var c;a=(c=a.l)?c.length:0;for(var b,d;0<a;)if((d=c[--a])&&(b=pa(d)))return b;return F}
function qa(a,c,b){if(a.i)return c.insertBefore(a.i,b);if(a.j){var d=a.l.length;do a.l[--d]&&(b=qa(a.l[d],c,b));while(0<d)}return b}function sa(a){for(;0!==a[0].m;){if(!a[0].W.G)return F;a[0].W.G=I;a=a[0].ca}return a[0].V}function U(a){var c;if(c=a=sa(a))c=!a.B&&(a.B=G,B[a.v]?B[a.v].push(a):B[a.v]=[a],A||V());return c}function ta(){var a=sa(r);a&&(a.B=G,C[a.v]?C[a.v].push(a):C[a.v]=[a])}
function ua(a,c){if(t>=r.length)r[t]={m:1,A:N(c),h:c=c||E,O:a.apply(null,g(c))||F};else if(c){var b=r[t];b.A(b.h,c)&&(b.O&&b.O.apply(b,g(b.h)),b.O=a.apply(null,g(b.h=c))||F)}++t}function va(a){if(t<r.length)return r[t++].g;var c=r,b=[a,function(d){b[0]!==d&&(b[0]=d,U(c))},function(){return b[0]}];r[t++]={m:0,g:b};return b}function S(a){return(t<r.length?r[t++]:r[t++]={m:0,g:void 0===a?{}:a}).g}
function wa(a,c){return t>=r.length?(r[t++]={m:0,A:N(c),h:c=c||E,g:a.apply(null,g(c))}).g:c&&r[t].A(r[t].h,c)?r[t].g=a.apply(null,g(r[t++].h=c)):r[t++].g}function Q(a,c){return t<r.length?(c=r[t].g,r[t++].g=a):r[t++]={m:0,g:a},c}function xa(a,c){return a=setTimeout(function(){return c(G)},a),function(){return clearTimeout(a)}}function ra(a){for(var c=f(a.Z),b=c.next();!b.done;b=c.next())T(a.L[b.value])}function ya(a,c,b){return{aa:b.ba,ga:a,$:u,fa:p?u:u+c}}
function W(a){var c=Q(a,F);return c?na(c,a):L(a)}
function X(a){var c=h.i;if(a){for(var b=f(W(a)),d=b.next();!d.done;d=b.next()){d=d.value;switch(d.charCodeAt(0)){case 70:c.className=L(a.F).filter(function(k){return a.F[k]}).join(" ");continue;case 82:a.R(c);case 67:case 68:case 83:continue}c[d]=a[d]}if(a.D)for(b=f(W(a.D)),d=b.next();!d.done;d=b.next())d=d.value,c.setAttribute("data-"+d.replace(ha,"-$&").toLowerCase(),a.D[d]);if(a.S)for(b=f(W(a.S)),d=b.next();!d.done;d=b.next())d=d.value,c.style[d]=a.S[d]}return c}
function Y(a,c,b){return{H:a,o:c?b?(c.C=b,c):c:b?{C:b}:F}}
function V(){p=0>=u;u=la.now();z&&cancelAnimationFrame(z);A=G;z=0;for(var a;(a=B).length;){B=[];a=f(a);for(var c=a.next();!c.done;c=a.next())if(c=c.value){c=f(c);for(var b=c.next();!b.done;b=c.next())if(h=b.value,h.B){if(h.i)O(F,F);else{var d,k=F;b=h.j;for(var e=h,n=h;!(d=(e=e.J).i););do for(var m=n.T,l=(n=n.J).l,v=l.length;++m<v&&l[m]&&!(k=l[m].j););while(!k&&n!==e);n=h;O(d,k);if(n.j!==b)for(;!(n=n.J).i;){b=F;d=f(n.l);for(k=d.next();!(k.done||(k=k.value)&&(b=k.j));k=d.next());if(b===n.j)break;n.j=
b}}p=I}}}A=I;C.length&&(B=C,C=a,za())}function za(){return z||(z=requestAnimationFrame(V))}var Aa=V;function Z(a){var c=D[a];if(!c){var b=a.indexOf("[");D[a]=c=ja.createElement(0>b?a:a.substr(0,b));if(0<b)for(a=f(a.substring(b+1,a.length-1).split("][")),b=a.next();!b.done;b=a.next()){b=b.value;var d=b.indexOf("=");0<d?c[b.substr(0,d)]=b.substr(d+1):c[b]=G}}return c}function Ba(a){var c=ca[a];if(!c){var b=Z(a);ca[a]=c=function(d){return p&&(h.i=b.cloneNode(G)),X(d),d&&d.C||F}}return c}var Ca=J.prototype;
Ca.fill||(Ca.fill=function(a){for(var c=this.length,b=0;b<c;++b)this[b]=a;return this});define({defer:function(){return A=G,za()},defer_end:Aa,dom_define:function(a,c,b){c=Z(c);b&&(c=c.cloneNode(G),b.D&&(K(c.dataset,b.D),delete b.D),b.S&&(K(c.style,b.S),delete b.S),K(c,b));D["#"+a]=c},hook_assert:function(a){if(!a)throw D;},hook_async:function(a,c,b){var d;if((t<r.length?(d=r[t++],I):d=r[t++]={m:2,A:N(c),h:c||E,g:F})||c&&d.A(d.h,c)&&(d.h=c)){void 0!==b&&(d.g=b);var k=r;a.apply(null,g(d.h)).then(function(e){return d.g!==e&&d.h===c&&(d.g=e,U(k))})}return d.g},hook_callback:function(a,
c){var b=S();b.h=c;return b.ha||(b.ha=function(){var d=ba.apply(0,arguments);return a.apply(null,[].concat(g(b.h),g(d)))})},hook_delay:function(a){var c=f(va(I)),b=c.next().value;c=c.next().value;ua(xa,[a,c]);return b},hook_dom:function(a,c){return p&&(h.i=Z(a).cloneNode(G)),X(c||F)},hook_effect:ua,hook_map:function(a,c,b){var d=F,k=G;if(t<r.length)if((d=r[t]).U!==a)ra(d),d=F;else if(!d.G||b&&d.A(d.h,b))d.h=b||E,d.G=G;else{if(c===d.M)return++t,d.g;k=I}var e=p,n=r,m=++t,l={},v=[],q=0<c.length&&oa(c,
l,v);if(d){if(d.g=[],d.M!==c)for(d.M=c,c=f(d.Z),b=c.next();!b.done;b=c.next())b=b.value,b in l||(T(d.L[b]),delete d.L[b])}else r[m-1]=d={m:3,A:N(b),h:b||E,g:[],G:G,U:a,X:q?M(c[0]):F,Z:[],L:{},M:c};c=f(v);for(b=c.next();!b.done;b=c.next()){b=b.value;var w=d.L[b];if(p=!w)d.L[b]=w=[{m:1,ca:n,W:d,Y:F,g:F}];if(k||p||(q?d.X(l[b],w[0].Y):l[b]!==w[0].Y)){r=w;t=1;try{w[0].g=a.apply(null,[w[0].Y=l[b]].concat(g(d.h)))}catch(H){}}d.g.push(w[0].g)}p=e;r=n;t=m;d.Z=v;return d.g},hook_memo:wa,hook_model:function(a){if(t<
r.length)return r[t++].g;for(var c=r,b=[(0,a.init)(F),{}],d=f(L(a)),k=d.next(),e={};!k.done;e={P:e.P},k=d.next())e.P=k.value,b[1][e.P]=function(n){return function(){var m=a[n.P].apply(null,[b[0]].concat(g(ba.apply(0,arguments))));b[0]!==m&&(b[0]=m,U(c))}}(e);r[t++]={m:0,g:b};return b},hook_object_changes:W,hook_prev:Q,hook_rerender:ta,hook_state:va,hook_static:S,hook_sub:function(a,c){var b=F;if(t<r.length)if((b=r[t]).U!==a)T(b.s),b=F;else if(!b.G||c&&b.A(b.h,c))c&&(b.h=c),b.G=G;else return++t,b.g;
var d=p,k=r,e=t;if(p=!b)(r[t]=b={m:4,A:N(c),h:c||E,g:F,U:a,G:G,s:[]}).s[0]={m:2,ca:r,W:b};r=b.s;t=1;try{b.g=a.apply(null,g(b.h))}catch(n){}p=d;r=k;t=e+1;return b.g},hook_transition:function(a,c){var b=S({ba:a});a=wa(ya,[a,c,b]);return b.ba=a.fa<=u?a.ga:(ta(),a.$===u?a.aa:a.aa+(a.ga-a.aa)*(u-a.$)/(a.fa-a.$))},init:function(a,c){c=void 0===c?ja.body:c;var b;c.innerHTML="";B[0].push(c={u:{H:function(){return X((b=a())[0]),b[1]},o:F},N:F,J:F,v:0,T:0,s:[],l:F,i:c,j:c,B:G});c.s[0]={m:0,V:c};V()},node:Y,
node_dom:function(a,c,b){return Y(Ba(a),c,b)},node_map:function(a,c,b){return Y(M,{H:a,M:c,o:b||F})},now:function(){return u}})})()