'use strict';function aa(a){var c=0;return function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}}}function f(a){var c="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];if(c)return c.call(a);if("number"==typeof a.length)return{next:aa(a)};throw Error(String(a)+" is not an iterable or ArrayLike");}function k(a){if(!(a instanceof Array)){a=f(a);for(var c,b=[];!(c=a.next()).done;)b.push(c.value);a=b}return a}
function ba(){for(var a=Number(this),c=[],b=a;b<arguments.length;b++)c[b-a]=arguments[b];return c};/*
 lui.js web frame work 2.2.0
 inspired by react and mithril
 L3P3.de 2024
*/
(function(){var l=null,n=!l,u=l,x=0,y=0,z=0,A=!n,B=[],C=[],D={},E={},F={},G=[],H=[],ca={},I=l,L=n,M=A,da=/[A-Z]/g,N=Array,ea=Object,O=ea.assign,P=ea.keys,ha=document,ia=window.performance||Date;function ja(a){return new Function("a","b","return a!==b&&("+a.join("||")+")")}function Q(a){var c=(a=P(a)).join(",");return F[c]||(F[c]=ja(a.map(function(b){return"a."+b+"!==b."+b})))}function ka(a,c){return a===c?H:P(a).filter(function(b){return a[b]!==c[b]})}
function R(a){return a?G[a.length]||(G[a.length]=ja(a.map(function(c,b){return"a["+b+"]!==b["+b+"]"}))):I}
function S(a,c){var b=l,d=c,g=b.s+1;u=b.M;x=0;b.u=M;if(b.o.A!==S){var e=I;try{e=(0,b.o.A)(b.o.m||ca)}catch(ta){}var q=b.g;if(e){q&&(a=q,c=I);var m=e.length,h,v=b.j||(b.j=(new N(m)).fill(I));do{var r=v[--m];(h=e[m])&&h!==L?((n=!r)?(v[m]=l=r={o:h,J:h.m&&Q(h.m),G:b,s:g,L:m,M:[],j:I,g:I,h:I,u:M},S(a,c),r.g&&a.insertBefore(r.h=r.g,c)):h.m&&r.J(r.o.m,h.m)&&((l=r).o=h,S(a,c)),r.h&&(c=r.h)):r&&(T(r,a),v[m]=I)}while(0<m)}else if(b.j){g=f(b.j);for(e=g.next();!e.done;e=g.next())(e=e.value)&&T(e,a);b.j=I}q||
(b.h=c!==d?c:I)}else{e=b.o.m;q=e.A;var w=e.U;e=e.m;m=w.length;r=L;if(!(0>=U(m,m)+m)){h=la();v={};var J=[],K;if(K=0<m){K="object"===typeof w[0];w=f(w);for(var p=w.next();!p.done;p=w.next()){p=p.value;var t=K?p.id:p;v[t]=p;J.push(t)}}if(h.H){r=e&&h.J(e,h.P);w=f(h.O);for(p=w.next();!p.done;p=w.next())p=p.value,p in v||(T(h.H[p],a),delete h.H[p]);h.P=e;h.O=J}else h.H={},h.T=K?Q(v[J[0]]):I,h.O=J,h.J=(h.P=e)&&Q(e);for(w=b.j=new N(m);0<m;){p=J[--m];t=h.H[p];if(n=!t)h.H[p]=l=t={o:{A:q,m:O({I:v[p]},e)},J:I,
G:b,s:g,L:m,M:[],j:I,g:I,h:I,u:M},S(a,c),t.g&&a.insertBefore(t.h=t.g,c);else{var fa=ma(t);fa&&fa.nextSibling!==c&&na(t,a,c);if(r||K&&h.T(v[p],t.o.m.I))(l=t).o.m=O({I:v[p]},e),S(a,c)}(w[t.L=m]=t).h&&(c=t.h)}b.h=c!==d?c:I}}}
function T(a,c){c&&a.g&&(c.removeChild(a.g),c=I);if(a.j)for(var b=f(a.j),d=b.next();!d.done;d=b.next())(d=d.value)&&T(d,c);c=a.M;for(d=c.length;1<d;)switch((b=c[--d]).v){case 1:b.K&&b.K.apply(b,k(b.l));break;case 2:b.l=H}if(a.u){var g,e;(!(e=B[g=a.s])||0>(g=e.indexOf(a)))&&(!(e=C[g])||0>(g=e.indexOf(a)))||e.splice(g,1)}}function ma(a){if(a.g)return a.g;var c;a=(c=a.j)?c.length:0;for(var b,d;0<a;)if((d=c[--a])&&(b=ma(d)))return b;return I}
function na(a,c,b){if(a.g)return c.insertBefore(a.g,b);if(a.h){var d=a.j.length;do a.j[--d]&&(b=na(a.j[d],c,b));while(0<d)}return b}function V(a){return!a.u&&(a.u=L,B[a.s]?B[a.s].push(a):B[a.s]=[a],A||W())}function la(a){return(x<u.length?u[x++]:u[x++]={v:0,i:void 0===a?{}:a}).i}function U(a,c){return x<u.length?(c=u[x].i,u[x++].i=a):u[x++]={v:0,i:a},c}function X(a){var c=U(a,I);return c?ka(c,a):P(a)}
function oa(a){var c=l.g;if(a){for(var b=f(X(a)),d=b.next();!d.done;d=b.next()){d=d.value;switch(d.charCodeAt(0)){case 70:c.className=P(a.F).filter(function(g){return a.F[g]}).join(" ");continue;case 82:a.R(c);case 67:case 68:case 83:continue}c[d]=a[d]}if(a.D)for(b=f(X(a.D)),d=b.next();!d.done;d=b.next())d=d.value,c.setAttribute("data-"+d.replace(da,"-$&").toLowerCase(),a.D[d]);if(a.S)for(b=f(X(a.S)),d=b.next();!d.done;d=b.next())d=d.value,c.style[d]=a.S[d]}return c}
function Y(a,c,b){return{A:a,m:c?b?(c.C=b,c):c:b?{C:b}:I}}
function W(){n=0>=y;y=ia.now();z&&cancelAnimationFrame(z);A=L;z=0;for(var a;(a=B).length;){B=[];a=f(a);for(var c=a.next();!c.done;c=a.next())if(c=c.value){c=f(c);for(var b=c.next();!b.done;b=c.next())if(l=b.value,l.u){if(l.g)S(I,I);else{var d,g=I;b=l.h;for(var e=l,q=l;!(d=(e=e.G).g););do for(var m=q.L,h=(q=q.G).j,v=h.length;++m<v&&h[m]&&!(g=h[m].h););while(!g&&q!==e);q=l;S(d,g);if(q.h!==b)for(;!(q=q.G).g;){b=I;d=f(q.j);for(g=d.next();!(g.done||(g=g.value)&&(b=g.h));g=d.next());if(b===q.h)break;q.h=
b}}n=M}}}A=M;C.length&&(B=C,C=a,pa())}function pa(){return z||(z=requestAnimationFrame(W))}var qa=W;function Z(a){var c=D[a];if(!c){var b=a.indexOf("[");D[a]=c=ha.createElement(0>b?a:a.substr(0,b));if(0<b)for(a=f(a.substring(b+1,a.length-1).split("][")),b=a.next();!b.done;b=a.next()){b=b.value;var d=b.indexOf("=");0<d?c[b.substr(0,d)]=b.substr(d+1):c[b]=L}}return c}function ra(a){var c=E[a];if(!c){var b=Z(a);E[a]=c=function(d){return n&&(l.g=b.cloneNode(L)),oa(d),d&&d.C||I}}return c}var sa=N.prototype;
sa.fill||(sa.fill=function(a){for(var c=this.length,b=0;b<c;++b)this[b]=a;return this});define({defer:function(){return A=L,pa()},defer_end:qa,dom_define:function(a,c,b){c=Z(c);b&&(c=c.cloneNode(L),b.D&&(O(c.dataset,b.D),delete b.D),b.S&&(O(c.style,b.S),delete b.S),O(c,b));D["#"+a]=c},hook_assert:function(a){if(!a)throw D;},hook_async:function(a,c,b){var d;if((x<u.length?(d=u[x++],M):d=u[x++]={v:2,B:R(c),l:c||H,i:I})||c&&d.B(d.l,c)&&(d.l=c)){void 0!==b&&(d.i=b);var g=l;a.apply(null,k(d.l)).then(function(e){return d.i!==e&&d.l===c&&(d.i=e,V(g))})}return d.i},hook_dom:function(a,c){return l.g===
I&&(l.g=Z(a).cloneNode(L)),oa(c||I)},hook_effect:function(a,c){if(x>=u.length)u[x]={v:1,B:R(c),l:c=c||H,K:a.apply(null,k(c))||I};else if(c){var b=u[x];b.B(b.l,c)&&(b.K&&b.K.apply(b,k(b.l)),b.K=a.apply(null,k(b.l=c))||I)}++x},hook_memo:function(a,c){return x>=u.length?(u[x++]={v:0,B:R(c),l:c=c||H,i:a.apply(null,k(c))}).i:c&&u[x].B(u[x].l,c)?u[x].i=a.apply(null,k(u[x++].l=c)):u[x++].i},hook_model:function(a){if(x<u.length)return u[x++].i;for(var c=l,b=[(0,a.init)(I),{}],d=f(P(a)),g=d.next(),e={};!g.done;e=
{N:void 0},g=d.next())e.N=g.value,b[1][e.N]=function(q){return function(){var m=a[q.N].apply(null,[b[0]].concat(k(ba.apply(0,arguments))));b[0]!==m&&(b[0]=m,V(c))}}(e);u[x++]={v:0,i:b};return b},hook_prev:U,hook_rerender:function(){var a=l;a.u=L;C[a.s]?C[a.s].push(a):C[a.s]=[a]},hook_state:function(a){if(x<u.length)return u[x++].i;var c=l,b=[a,function(d){b[0]!==d&&(b[0]=d,V(c))},function(){return b[0]}];u[x++]={v:0,i:b};return b},hook_static:la,init:function(a,c,b){c=void 0===c?ha.body:c;b=void 0===
b?I:b;c.innerHTML="";V({o:{A:a,m:b},J:I,G:I,s:0,L:0,M:[],j:I,g:c,h:c,u:M})},node:Y,node_dom:function(a,c,b){return Y(ra(a),c,b)},node_map:function(a,c,b){return Y(S,{A:a,U:c,m:b||I})},now:function(){return y}})})()