'use strict';function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}function f(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:aa(a)}}function g(a){if(!(a instanceof Array)){a=f(a);for(var b,c=[];!(b=a.next()).done;)c.push(b.value);a=c}return a};/*
 lui.js web frame work 1.3.4
 inspired by react and mithril
 L3P3.de 2022
*/
(function(){var k=null,p=!k,u=k,x=0,y=0,z=0,A=p,B=[],C=[],D={},E={},F={},G=[],H=[],ba={},K=k,L=p,M=!p,ca=/[A-Z]/g,N=Array,O=Object,da=O.assign,P=O.keys,fa=document,ha=window.performance||Date;function ia(a){return new Function("a","b","return a!==b&&("+a.join("||")+")")}function Q(a){var b=(a=P(a)).join(",");return F[b]||(F[b]=ia(a.map(function(c){return"a."+c+"!==b."+c})))}function ja(a,b){return a===b?H:P(a).filter(function(c){return a[c]!==b[c]})}
function R(a){return a?G[a.length]||(G[a.length]=ia(a.map(function(b,c){return"a["+c+"]!==b["+c+"]"}))):K}
function S(a,b){var c=k,d=b,l=c.u+1;u=c.A;x=1;c.v=M;if(c.s.B!==Q){var e=K;try{e=(0,c.s.B)(c.s.m||ba)}catch(ta){}var q=c.g;if(e){q&&(a=q,b=K);var m=e.length,h,v=c.j||(c.j=(new N(m)).fill(K));do{var r=v[--m];(h=e[m])&&h!==L?((p=!r)?((v[m]=k=r={s:h,K:h.m&&Q(h.m),H:c,u:l,N:m,A:[],j:K,g:K,h:K,v:M}).A[0]={o:0,O:r},S(a,b),r.g&&a.insertBefore(r.h=r.g,b)):h.m&&r.K(r.s.m,h.m)&&((k=r).s=h,S(a,b)),r.h&&(b=r.h)):r&&(T(r,a),v[m]=K)}while(0<m)}else if(c.j){l=f(c.j);for(e=l.next();!e.done;e=l.next())(e=e.value)&&
T(e,a);c.j=K}q||(c.h=b!==d?b:K)}else{e=c.s.m;q=e.B;var w=e.X;e=e.m;m=w.length;r=L;if(!(0>=U(m,m)+m)){h=ka();v={};var I=[],J;if(J=0<m){var n;J="object"===typeof w[0];w=f(w);for(n=w.next();!n.done;n=w.next()){n=n.value;var t=J?n.id:n;v[t]=n;I.push(t)}}if(h.J){r=e&&h.K(e,h.T);w=f(h.P);for(n=w.next();!n.done;n=w.next())n=n.value,n in v||(T(h.J[n],a),delete h.J[n]);h.T=e;h.P=I}else h.J={},h.W=J?Q(v[I[0]]):K,h.P=I,h.K=(h.T=e)&&Q(e);for(w=c.j=new N(m);0<m;){n=I[--m];t=h.J[n];if(p=!t)(h.J[n]=k=t={s:{B:q,
m:da({I:v[n]},e)},K:K,H:c,u:l,N:m,A:[],j:K,g:K,h:K,v:M}).A[0]={o:0,O:t},S(a,b),t.g&&a.insertBefore(t.h=t.g,b);else{var ea=la(t);ea&&ea.nextSibling!==b&&ma(t,a,b);if(r||J&&h.W(v[n],t.s.m.I))(k=t).s.m=da({I:v[n]},e),S(a,b)}(w[t.N=m]=t).h&&(b=t.h)}c.h=b!==d?b:K}}}
function T(a,b){b&&a.g&&(b.removeChild(a.g),b=K);if(a.j)for(var c=f(a.j),d=c.next();!d.done;d=c.next())(d=d.value)&&T(d,b);b=a.A;for(d=b.length;1<d;)switch((c=b[--d]).o){case 1:c.L&&c.L.apply(c,g(c.l));break;case 2:c.l=H}if(a.v){var l,e;(!(e=B[l=a.u])||0>(l=e.indexOf(a)))&&(!(e=C[l])||0>(l=e.indexOf(a)))||e.splice(l,1)}}function la(a){if(a.g)return a.g;var b;a=(b=a.j)?b.length:0;for(var c,d;0<a;)if((d=b[--a])&&(c=la(d)))return c;return K}
function ma(a,b,c){if(a.g)return b.insertBefore(a.g,c),a.g;if(a.h){var d=a.j.length;do a.j[--d]&&(c=ma(a.j[d],b,c));while(0<d)}return c}function na(a){for(;0!==a[0].o;){if(!a[0].V.U)return K;a[0].V.U=M;a=a[0].Y}return a[0].O}function V(a){return(a=na(a))&&!a.v&&(a.v=L,B[a.u]?B[a.u].push(a):B[a.u]=[a],A||W())}function ka(a){return(x<u.length?u[x++]:u[x++]={o:0,i:void 0===a?{}:a}).i}function U(a,b){return x<u.length?(b=u[x].i,u[x++].i=a):u[x++]={o:0,i:a},b}
function X(a){var b=U(a,K);return b?ja(b,a):P(a)}
function Y(a){var b=k.g;if(a){for(var c=f(X(a)),d=c.next();!d.done;d=c.next())switch(d=d.value,d.charCodeAt(0)){case 70:b.className=P(a.F).filter(function(l){return a.F[l]}).join(" ");continue;case 82:a.R(b);case 67:case 68:case 83:continue;default:b[d]=a[d]}if(a.D)for(c=f(X(a.D)),d=c.next();!d.done;d=c.next())d=d.value,b.setAttribute("data-"+d.replace(ca,"-$&").toLowerCase(),a.D[d]);if(a.S)for(c=f(X(a.S)),d=c.next();!d.done;d=c.next())d=d.value,b.style[d]=a.S[d]}return b}
function Z(a,b,c){return{B:a,m:b?c?(b.C=c,b):b:c?{C:c}:K}}
function W(){p=0>=y;y=ha.now();z&&cancelAnimationFrame(z);A=L;z=0;for(var a;(a=B).length;){B=[];a=f(a);for(var b=a.next();!b.done;b=a.next())if(b=b.value){b=f(b);for(var c=b.next();!c.done;c=b.next())if(k=c.value,k.v){if(k.g)S(K,K);else{var d,l=K;c=k.h;for(var e=k,q=k;!(d=(e=e.H).g););do for(var m=q.N,h=(q=q.H).j,v=h.length;++m<v&&h[m]&&!(l=h[m].h););while(!l&&q!==e);q=k;S(d,l);if(q.h!==c)for(;!(q=q.H).g;){c=K;d=f(q.j);for(l=d.next();!(l.done||(l=l.value)&&(c=l.h));l=d.next());if(c===q.h)break;q.h=
c}}p=M}}}A=M;C.length&&(B=C,C=a,oa())}function oa(){return z||(z=requestAnimationFrame(W))}var pa=W;function qa(a){var b=D[a];if(!b){var c=a.indexOf("[");D[a]=b=fa.createElement(0>c?a.substr(0):a.substr(0,c));if(0<c)for(a=f(a.substring(c+1,a.length-1).split("][")),c=a.next();!c.done;c=a.next()){c=c.value;var d=c.indexOf("=");0<d?b[c.substr(0,d)]=c.substr(d+1):b[c]=L}}return b}function ra(a){var b=E[a];if(!b){var c=qa(a);E[a]=b=function(d){return p&&(k.g=c.cloneNode(L)),Y(d),d&&d.C||K}}return b}
var sa=N.prototype;sa.fill||(sa.fill=function(a){for(var b=this.length,c=0;c<b;++c)this[c]=a;return this});define({defer:function(){return A=L,oa()},defer_end:pa,hook_assert:function(a){if(!a)throw D;},hook_async:function(a,b,c){var d;if((x<u.length?(d=u[x++],M):d=u[x++]={o:2,G:R(b),l:b||H,i:K})||b&&d.G(d.l,b)&&(d.l=b)){void 0!==c&&(d.i=c);var l=u;a.apply(null,g(d.l)).then(function(e){return d.i!==e&&d.l===b&&(d.i=e,V(l))})}return d.i},hook_dom:function(a,b){return p&&(k.g=qa(a).cloneNode(L)),Y(b||K)},hook_effect:function(a,b){if(x>=u.length)u[x]={o:1,G:R(b),l:b=b||H,L:a.apply(null,g(b))||K};else if(b){var c=
u[x];c.G(c.l,b)&&(c.L&&c.L.apply(c,g(c.l)),c.L=a.apply(null,g(c.l=b))||K)}++x},hook_memo:function(a,b){return x>=u.length?(u[x++]={o:0,G:R(b),l:b=b||H,i:a.apply(null,g(b))}).i:b&&u[x].G(u[x].l,b)?u[x].i=a.apply(null,g(u[x++].l=b)):u[x++].i},hook_model:function(a){if(x<u.length)return u[x++].i;for(var b=u,c=[(0,a.init)(K),{}],d={},l=f(P(a)),e=l.next();!e.done;d={M:d.M},e=l.next())d.M=e.value,c[1][d.M]=function(q){return function(m){m=(0,a[q.M])(c[0],m);c[0]!==m&&(c[0]=m,V(b))}}(d);u[x++]={o:0,i:c};
return c},hook_prev:U,hook_rerender:function(){var a=na(u);a&&(a.v=L,C[a.u]?C[a.u].push(a):C[a.u]=[a])},hook_state:function(a){if(x<u.length)return u[x++].i;var b=u,c=[a,function(d){c[0]!==d&&(c[0]=d,V(b))},function(){return c[0]}];u[x++]={o:0,i:c};return c},hook_static:ka,init:function(a,b){var c;b.innerHTML="";(k={s:{B:function(){return Y((c=a())[0]),c[1]},m:K},K:K,H:K,u:0,N:0,A:[],j:K,g:b,h:b,v:L}).A[0]={o:0,O:k};B[0]=[k];W()},node:Z,node_dom:function(a,b,c){return Z(ra(a),b,c)},node_map:function(a,
b,c){return Z(Q,{B:a,X:b,m:c||K})},now:function(){return y}})})()