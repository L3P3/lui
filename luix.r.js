'use strict';function aa(a){var c=0;return function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}}}function f(a){var c="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return c?c.call(a):{next:aa(a)}}function g(a){if(!(a instanceof Array)){a=f(a);for(var c,b=[];!(c=a.next()).done;)b.push(c.value);a=b}return a}function ba(){for(var a=Number(this),c=[],b=a;b<arguments.length;b++)c[b-a]=arguments[b];return c};/*
 lui.js web frame work 1.3.1
 inspired by react and mithril
 L3P3.de 2022
*/
(function(){var h=null,p=!h,r=h,t=0,u=0,z=0,A=p,B=[],C=[],D={},E={},F={},ca=[],da={},G=[],I=h,J=p,K=!p,ea=/[A-Z]/g,L=Array,fa=Object,ia=fa.assign,M=fa.keys,ja=document,ka=window.performance||Date;function la(a){return new Function("a","b","return a!==b&&("+a.join("||")+")")}function N(a){var c=(a=M(a)).join(",");return F[c]||(F[c]=la(a.map(function(b){return"a."+b+"!==b."+b})))}function ma(a,c){return a===c?G:M(a).filter(function(b){return a[b]!==c[b]})}
function O(a){return a?ca[a.length]||(ca[a.length]=la(a.map(function(c,b){return"a["+b+"]!==b["+b+"]"}))):I}
function Q(a,c){var b=h,d=c,k=b.v+1;r=b.s;t=1;b.B=K;if(b.u.H!==N){var e=I;try{e=(0,b.u.H)(b.u.o||da)}catch(Da){}var n=b.i;if(e){n&&(a=n,c=I);var m=e.length,l,v=b.l||(b.l=(new L(m)).fill(I));do{var q=v[--m];(l=e[m])&&l!==J?((p=!q)?((v[m]=h=q={u:l,N:l.o&&N(l.o),J:b,v:k,T:m,s:[],l:I,i:I,j:I,B:K}).s[0]={m:0,V:q},Q(a,c),q.i&&a.insertBefore(q.j=q.i,c)):l.o&&q.N(q.u.o,l.o)&&((h=q).u=l,Q(a,c)),q.j&&(c=q.j)):q&&(R(q,a),v[m]=I)}while(0<m)}else if(b.l){k=f(b.l);for(e=k.next();!e.done;e=k.next())(e=e.value)&&
R(e,a);b.l=I}n||(b.j=c!==d?c:I)}else{e=b.u.o;n=e.H;var w=e.M;e=e.o;m=w.length;q=J;if(!(0>=S(m,m)+m)){l=T();v={};var H=[];w=0<m&&na(w,v,H);if(l.K){q=e&&l.N(e,l.ea);for(var P=f(l.da),x=P.next();!x.done;x=P.next())x=x.value,x in v||(R(l.K[x],a),delete l.K[x]);l.ea=e;l.da=H}else l.K={},l.X=w?N(v[H[0]]):I,l.da=H,l.N=(l.ea=e)&&N(e);for(P=b.l=new L(m);0<m;){x=H[--m];var y=l.K[x];if(p=!y)(l.K[x]=h=y={u:{H:n,o:ia({I:v[x]},e)},N:I,J:b,v:k,T:m,s:[],l:I,i:I,j:I,B:K}).s[0]={m:0,V:y},Q(a,c),y.i&&a.insertBefore(y.j=
y.i,c);else{var ha=oa(y);ha&&ha.nextSibling!==c&&pa(y,a,c);if(q||w&&l.X(v[x],y.u.o.I))(h=y).u.o=ia({I:v[x]},e),Q(a,c)}(P[y.T=m]=y).j&&(c=y.j)}b.j=c!==d?c:I}}}function R(a,c){c&&a.i&&(c.removeChild(a.i),c=I);if(a.l)for(var b=f(a.l),d=b.next();!d.done;d=b.next())(d=d.value)&&R(d,c);U(a.s);if(a.B){var k,e;(!(e=B[k=a.v])||0>(k=e.indexOf(a)))&&(!(e=C[k])||0>(k=e.indexOf(a)))||e.splice(k,1)}}
function U(a){for(var c,b=a.length;1<b;)switch((c=a[--b]).m){case 1:c.O&&c.O.apply(c,g(c.h));break;case 2:c.h=G;break;case 3:qa(c);break;case 4:U(c.s)}}function na(a,c,b){var d,k="object"===typeof a[0];a=f(a);for(d=a.next();!d.done;d=a.next()){d=d.value;var e=k?d.id:d;c[e]=d;b.push(e)}return k}function oa(a){if(a.i)return a.i;var c;a=(c=a.l)?c.length:0;for(var b,d;0<a;)if((d=c[--a])&&(b=oa(d)))return b;return I}
function pa(a,c,b){if(a.i)return c.insertBefore(a.i,b),a.i;if(a.j){var d=a.l.length;do a.l[--d]&&(b=pa(a.l[d],c,b));while(0<d)}return b}function ra(a){for(;0!==a[0].m;){if(!a[0].W.G)return I;a[0].W.G=K;a=a[0].ca}return a[0].V}function V(a){return(a=ra(a))&&!a.B&&(a.B=J,B[a.v]?B[a.v].push(a):B[a.v]=[a],A||W())}function sa(){var a=ra(r);a&&(a.B=J,C[a.v]?C[a.v].push(a):C[a.v]=[a])}
function ta(a,c){if(t>=r.length)r[t]={m:1,A:O(c),h:c=c||G,O:a.apply(null,g(c))||I};else if(c){var b=r[t];b.A(b.h,c)&&(b.O&&b.O.apply(b,g(b.h)),b.O=a.apply(null,g(b.h=c))||I)}++t}function ua(a){if(t<r.length)return r[t++].g;var c=r,b=[a,function(d){b[0]!==d&&(b[0]=d,V(c))},function(){return b[0]}];r[t++]={m:0,g:b};return b}function T(a){return(t<r.length?r[t++]:r[t++]={m:0,g:void 0===a?{}:a}).g}
function va(a,c){return t>=r.length?(r[t++]={m:0,A:O(c),h:c=c||G,g:a.apply(null,g(c))}).g:c&&r[t].A(r[t].h,c)?r[t].g=a.apply(null,g(r[t++].h=c)):r[t++].g}function S(a,c){return t<r.length?(c=r[t].g,r[t++].g=a):r[t++]={m:0,g:a},c}function wa(a,c){return a=setTimeout(function(){return c(J)},a),function(){return clearTimeout(a)}}function qa(a){for(var c=f(a.Z),b=c.next();!b.done;b=c.next())U(a.L[b.value])}function xa(a,c,b){return{aa:b.ba,ga:a,$:u,fa:p?u:u+c}}
function X(a){var c=S(a,I);return c?ma(c,a):M(a)}
function Y(a){var c=h.i;if(a){for(var b=f(X(a)),d=b.next();!d.done;d=b.next())switch(d=d.value,d.charCodeAt(0)){case 70:c.className=M(a.F).filter(function(k){return a.F[k]}).join(" ");continue;case 82:a.R(c);case 67:case 68:case 83:continue;default:c[d]=a[d]}if(a.D)for(b=f(X(a.D)),d=b.next();!d.done;d=b.next())d=d.value,c.setAttribute("data-"+d.replace(ea,"-$&").toLowerCase(),a.D[d]);if(a.S)for(b=f(X(a.S)),d=b.next();!d.done;d=b.next())d=d.value,c.style[d]=a.S[d]}return c}
function Z(a,c,b){return{H:a,o:c?b?(c.C=b,c):c:b?{C:b}:I}}
function W(){p=0>=u;u=ka.now();z&&cancelAnimationFrame(z);A=J;z=0;for(var a;(a=B).length;){B=[];a=f(a);for(var c=a.next();!c.done;c=a.next())if(c=c.value){c=f(c);for(var b=c.next();!b.done;b=c.next())if(h=b.value,h.B){if(h.i)Q(I,I);else{var d,k=I;b=h.j;for(var e=h,n=h;!(d=(e=e.J).i););do for(var m=n.T,l=(n=n.J).l,v=l.length;++m<v&&l[m]&&!(k=l[m].j););while(!k&&n!==e);n=h;Q(d,k);if(n.j!==b)for(;!(n=n.J).i;){b=I;d=f(n.l);for(k=d.next();!(k.done||(k=k.value)&&(b=k.j));k=d.next());if(b===n.j)break;n.j=
b}}p=K}}}A=K;C.length&&(B=C,C=a,ya())}function ya(){return z||(z=requestAnimationFrame(W))}var za=W;function Aa(a){var c=D[a];if(!c){var b=a.indexOf("[");D[a]=c=ja.createElement(0>b?a.substr(0):a.substr(0,b));if(0<b)for(a=f(a.substring(b+1,a.length-1).split("][")),b=a.next();!b.done;b=a.next()){b=b.value;var d=b.indexOf("=");0<d?c[b.substr(0,d)]=b.substr(d+1):c[b]=J}}return c}function Ba(a){var c=E[a];if(!c){var b=Aa(a);E[a]=c=function(d){return p&&(h.i=b.cloneNode(J)),Y(d),d&&d.C||I}}return c}
var Ca=L.prototype;Ca.fill||(Ca.fill=function(a){for(var c=this.length,b=0;b<c;++b)this[b]=a;return this});define({defer:function(){return A=J,ya()},defer_end:za,hook_assert:function(a){if(!a)throw D;},hook_async:function(a,c,b){var d;if((t<r.length?(d=r[t++],K):d=r[t++]={m:2,A:O(c),h:c||G,g:I})||c&&d.A(d.h,c)&&(d.h=c)){void 0!==b&&(d.g=b);var k=r;a.apply(null,g(d.h)).then(function(e){return d.g!==e&&d.h===c&&(d.g=e,V(k))})}return d.g},hook_callback:function(a,c){var b=T();b.h=c;return b.ha||(b.ha=function(){var d=ba.apply(0,arguments);return a.apply(null,[].concat(g(b.h),g(d)))})},hook_delay:function(a){var c=
f(ua(K)),b=c.next().value;c=c.next().value;ta(wa,[a,c]);return b},hook_dom:function(a,c){return p&&(h.i=Aa(a).cloneNode(J)),Y(c||I)},hook_effect:ta,hook_map:function(a,c,b){var d=I,k=J;if(t<r.length)if((d=r[t]).U!==a)qa(d),d=I;else if(!d.G||b&&d.A(d.h,b))d.h=b||G,d.G=J;else{if(c===d.M)return++t,d.g;k=K}var e=p,n=r,m=++t,l={},v=[],q=0<c.length&&na(c,l,v);if(d){if(d.g=[],d.M!==c)for(d.M=c,c=f(d.Z),b=c.next();!b.done;b=c.next())b=b.value,b in l||(U(d.L[b]),delete d.L[b])}else r[m-1]=d={m:3,A:O(b),h:b||
G,g:[],G:J,U:a,X:q?N(c[0]):I,Z:[],L:{},M:c};c=f(v);for(b=c.next();!b.done;b=c.next()){b=b.value;var w=d.L[b];if(p=!w)d.L[b]=w=[{m:1,ca:n,W:d,Y:I,g:I}];if(k||p||(q?d.X(l[b],w[0].Y):l[b]!==w[0].Y)){r=w;t=1;try{w[0].g=a.apply(null,[w[0].Y=l[b]].concat(g(d.h)))}catch(H){}}d.g.push(w[0].g)}p=e;r=n;t=m;d.Z=v;return d.g},hook_memo:va,hook_model:function(a){if(t<r.length)return r[t++].g;for(var c=r,b=[(0,a.init)(I),{}],d={},k=f(M(a)),e=k.next();!e.done;d={P:d.P},e=k.next())d.P=e.value,b[1][d.P]=function(n){return function(m){m=
(0,a[n.P])(b[0],m);b[0]!==m&&(b[0]=m,V(c))}}(d);r[t++]={m:0,g:b};return b},hook_object_changes:X,hook_prev:S,hook_rerender:sa,hook_state:ua,hook_static:T,hook_sub:function(a,c){var b=I;if(t<r.length)if((b=r[t]).U!==a)U(b.s),b=I;else if(!b.G||c&&b.A(b.h,c))c&&(b.h=c),b.G=J;else return++t,b.g;var d=p,k=r,e=t;if(p=!b)(r[t]=b={m:4,A:O(c),h:c||G,g:I,U:a,G:J,s:[]}).s[0]={m:2,ca:r,W:b};r=b.s;t=1;try{b.g=a.apply(null,g(b.h))}catch(n){}p=d;r=k;t=e+1;return b.g},hook_transition:function(a,c){var b=T({ba:a});
a=va(xa,[a,c,b]);return b.ba=a.fa<=u?a.ga:(sa(),a.$===u?a.aa:a.aa+(a.ga-a.aa)*(u-a.$)/(a.fa-a.$))},init:function(a,c){var b;c.innerHTML="";(h={u:{H:function(){return Y((b=a())[0]),b[1]},o:I},N:I,J:I,v:0,T:0,s:[],l:I,i:c,j:c,B:J}).s[0]={m:0,V:h};B[0]=[h];W()},node:Z,node_dom:function(a,c,b){return Z(Ba(a),c,b)},node_map:function(a,c,b){return Z(N,{H:a,M:c,o:b||I})},now:function(){return u}})})()