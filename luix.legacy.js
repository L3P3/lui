'use strict';function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}function g(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];if(b)return b.call(a);if("number"==typeof a.length)return{next:aa(a)};throw Error(String(a)+" is not an iterable or ArrayLike");}function h(a){if(!(a instanceof Array)){a=g(a);for(var b,c=[];!(b=a.next()).done;)c.push(b.value);a=c}return a}
function ba(){for(var a=Number(this),b=[],c=a;c<arguments.length;c++)b[c-a]=arguments[c];return b};/*
 lui.js web frame work 1.4.4
 inspired by react and mithril
 L3P3.de 2024
*/
(function(){var k=null,p=!k,r=k,t=0,u=0,w=0,A=p,B=[[]],C=[[]],ca,D,E={},da={},ea={},fa=[],F=[],ha={},G=k,H=p,I=!p,ia=/[A-Z]/g,ja=Array,K=Object,L=K.assign||(K.assign=function(a){for(var b=arguments,c=b.length,d=0,f,e;++d<c;)if(f=b[d])for(e in f)a[e]=f[e];return a}),M=K.keys||(K.keys=function(a){var b=[],c;for(c in a)b.push(c);return b}),ka=setTimeout,la=clearTimeout,ma=document,N=window,O=Date;function na(a){return new Function("a","b","return a!==b&&("+a.join("||")+")")}
function P(a){var b=(a=M(a)).join(",");return ea[b]||(ea[b]=na(a.map(function(c){return"a."+c+"!==b."+c})))}function oa(a,b){return a===b?F:M(a).filter(function(c){return a[c]!==b[c]})}function Q(a){return a?fa[a.length]||(fa[a.length]=na(a.map(function(b,c){return"a["+c+"]!==b["+c+"]"}))):G}
function R(a,b){var c=k,d=b,f=c.v+1;r=c.s;t=1;c.B=I;if(c.u.H!==P){var e=G;try{e=(0,c.u.H)(c.u.o||ha)}catch(Ja){}var l=c.i;if(e){l&&(a=l,b=G);var n=e.length,m,v=c.l||(c.l=(new ja(n)).fill(G));do{var q=v[--n];(m=e[n])&&m!==H?((p=!q)?(v[n]=k=q={u:m,N:m.o&&P(m.o),J:c,v:f,T:n,s:[],l:G,i:G,j:G,B:I},k.s[0]={m:0,V:q},R(a,b),q.i&&a.insertBefore(q.j=q.i,b)):m.o&&q.N(q.u.o,m.o)&&((k=q).u=m,R(a,b)),q.j&&(b=q.j)):q&&(S(q,a),v[n]=G)}while(0<n)}else if(c.l){f=g(c.l);for(e=f.next();!e.done;e=f.next())(e=e.value)&&
S(e,a);c.l=G}l||(c.j=b!==d?b:G)}else{e=c.u.o;l=e.H;var x=e.M;e=e.o;n=x.length;q=H;if(!(0>=pa(n,n)+n)){m=T();v={};var J=[];x=0<n&&qa(x,v,J);if(m.K){q=e&&m.N(e,m.ea);for(var X=g(m.da),y=X.next();!y.done;y=X.next())y=y.value,void 0===v[y]&&(S(m.K[y],a),delete m.K[y]);m.ea=e;m.da=J}else m.K={},m.X=x?P(v[J[0]]):G,m.da=J,m.N=(m.ea=e)&&P(e);for(X=c.l=new ja(n);0<n;){y=J[--n];var z=m.K[y];if(p=!z)m.K[y]=k=z={u:{H:l,o:L({I:v[y]},e)},N:G,J:c,v:f,T:n,s:[],l:G,i:G,j:G,B:I},k.s[0]={m:0,V:z},R(a,b),z.i&&a.insertBefore(z.j=
z.i,b);else{var sa=ra(z);sa&&sa.nextSibling!==b&&ta(z,a,b);if(q||x&&m.X(v[y],z.u.o.I))(k=z).u.o=L({I:v[y]},e),R(a,b)}(X[z.T=n]=z).j&&(b=z.j)}c.j=b!==d?b:G}}}function S(a,b){b&&a.i&&(b.removeChild(a.i),b=G);if(a.l)for(var c=g(a.l),d=c.next();!d.done;d=c.next())(d=d.value)&&S(d,b);U(a.s);if(a.B){var f,e;(!(e=B[f=a.v])||0>(f=e.indexOf(a)))&&(!(e=C[f])||0>(f=e.indexOf(a)))||e.splice(f,1)}}
function U(a){for(var b,c=a.length;1<c;)switch((b=a[--c]).m){case 1:b.O&&b.O.apply(b,h(b.h));break;case 2:b.h=F;break;case 3:ua(b);break;case 4:U(b.s)}}function qa(a,b,c){var d,f="object"===typeof a[0];a=g(a);for(d=a.next();!d.done;d=a.next()){d=d.value;var e=f?d.id:d;b[e]=d;c.push(e)}return f}function ra(a){if(a.i)return a.i;var b;a=(b=a.l)?b.length:0;for(var c,d;0<a;)if((d=b[--a])&&(c=ra(d)))return c;return G}
function ta(a,b,c){if(a.i)return b.insertBefore(a.i,c);if(a.j){var d=a.l.length;do a.l[--d]&&(c=ta(a.l[d],b,c));while(0<d)}return c}function va(a){for(;0!==a[0].m;){if(!a[0].W.G)return G;a[0].W.G=I;a=a[0].ca}return a[0].V}function wa(a){var b;if(b=a=va(a))b=!a.B&&(a.B=H,B[a.v]?B[a.v].push(a):B[a.v]=[a],A||V());return b}function xa(){var a=va(r);a&&(a.B=H,C[a.v]?C[a.v].push(a):C[a.v]=[a])}
function ya(a,b){if(t>=r.length)r[t]={m:1,A:Q(b),h:b=b||F,O:a.apply(null,h(b))||G};else if(b){var c=r[t];c.A(c.h,b)&&(c.O&&c.O.apply(c,h(c.h)),c.O=a.apply(null,h(c.h=b))||G)}++t}function za(a){if(t<r.length)return r[t++].g;var b=r,c=[a,function(d){c[0]!==d&&(c[0]=d,wa(b))},function(){return c[0]}];r[t++]={m:0,g:c};return c}function T(a){return(t<r.length?r[t++]:r[t++]={m:0,g:void 0===a?{}:a}).g}
function Aa(a,b){return t>=r.length?(r[t++]={m:0,A:Q(b),h:b=b||F,g:a.apply(null,h(b))}).g:b&&r[t].A(r[t].h,b)?r[t].g=a.apply(null,h(r[t++].h=b)):r[t++].g}function pa(a,b){return t<r.length?(b=r[t].g,r[t++].g=a):r[t++]={m:0,g:a},b}function Ba(a,b){return a=ka(function(){return b(H)},a),function(){return la(a)}}function ua(a){for(var b=g(a.Z),c=b.next();!c.done;c=b.next())U(a.L[c.value])}function Ca(a,b,c){return{aa:c.ba,ga:a,$:u,fa:p?u:u+b}}function W(a){var b=pa(a,G);return b?oa(b,a):M(a)}
function Da(a){var b=k.i;if(a){for(var c=g(W(a)),d=c.next();!d.done;d=c.next()){d=d.value;switch(d){case "F":b.className=M(a.F).filter(function(f){return a.F[f]}).join(" ");continue;case "R":a.R(b);case "C":case "D":case "S":continue}b[d]=a[d]}if(a.D)for(c=g(W(a.D)),d=c.next();!d.done;d=c.next())d=d.value,b.setAttribute("data-"+d.replace(ia,"-$&").toLowerCase(),a.D[d]);if(a.S)for(c=g(W(a.S)),d=c.next();!d.done;d=c.next())d=d.value,b.style[d]=a.S[d]}return b}
function Ea(a,b,c){return{H:a,o:b?c?(b.C=c,b):b:c?{C:c}:G}}
function V(){p=0>=u;u=O.now();w&&D(w);A=H;w=0;for(var a;(a=B).length;){B=[];a=g(a);for(var b=a.next();!b.done;b=a.next())if(b=b.value){b=g(b);for(var c=b.next();!c.done;c=b.next())if(k=c.value,k.B){if(k.i)R(G,G);else{var d,f=G;c=k.j;for(var e=k,l=k;!(d=(e=e.J).i););do for(var n=l.T,m=(l=l.J).l,v=m.length;++n<v&&m[n]&&!(f=m[n].j););while(!f&&l!==e);l=k;R(d,f);if(l.j!==c)for(;!(l=l.J).i;){c=G;d=g(l.l);for(f=d.next();!(f.done||(f=f.value)&&(c=f.j));f=d.next());if(c===l.j)break;l.j=c}}p=I}}}A=I;C.length&&
(B=C,C=a,Fa())}function Fa(){return w||(w=ca(V))}var Ga=V;function Ha(a){var b=E[a];if(!b){var c=a.indexOf("[");E[a]=b=ma.createElement(0>c?a:a.substring(0,c));if(0<c)for(a=g(a.substring(c+1,a.length-1).split("][")),c=a.next();!c.done;c=a.next()){c=c.value;var d=c.indexOf("=");0<d?b[c.substring(0,d)]=c.substr(d+1):b[c]=H}}return b}function Ia(a){var b=da[a];if(!b){var c=Ha(a);da[a]=b=function(d){return p&&(k.i=c.cloneNode(H)),Da(d),d&&d.C||G}}return b}var Y=ja.prototype,Z=String.prototype;ca=N.requestAnimationFrame;
D=N.cancelAnimationFrame;
Y.fill||(Y.fill=function(a){for(var b=this.length,c=0;c<b;++c)this[c]=a;return this},D||(ca=(D=N.mozCancelAnimationFrame||N.webkitCancelAnimationFrame)?N.mozRequestAnimationFrame||N.webkitRequestAnimationFrame:(D=la,function(a){return ka(a,20)}),O.now||(O.now=function(){return(new O).getTime()},Y.map||(Y.filter=function(a){for(var b=[],c=this.length,d=-1,f=0;f<c;++f)a(this[f],f)&&(b[++d]=this[f]);return b},Y.find=function(a){a=this.findIndex(a);if(0<=a)return this[a]},Y.findIndex=Y.forEach=function(a){for(var b=
this.length,c=0;c<b;++c)if(a(this[c],c))return c;return-1},Y.includes=Z.includes=function(a){return 0<=this.indexOf(a)},Y.indexOf=function(a,b){b=b||0;for(var c=this.length;b<c;++b)if(this[b]===a)return b;return-1},Y.map=function(a){for(var b=[],c=this.length,d=0;d<c;++d)b[d]=a(this[d],d);return b},Y.some=function(a){return 0<=this.findIndex(a)},Y.push||(Y.push=function(a){this[this.length]=a},Function.prototype.apply=function(a,b){a==G?(N._=this,a=N):K.prototype._=this;switch(b?b.length:0){case 0:return a._();
case 1:return a._(b[0]);case 2:return a._(b[0],b[1]);case 3:return a._(b[0],b[1],b[2]);case 4:return a._(b[0],b[1],b[2],b[3]);case 5:return a._(b[0],b[1],b[2],b[3],b[4]);default:return a._(b[0],b[1],b[2],b[3],b[4],b[5])}},Y.join||(Y.concat=function(){for(var a=arguments,b=this,c=[],d=a.length,f=b.length,e=0,l=0,n=-1;l<f;++l)c[++n]=b[l];for(;e<d;++e)for(f=(l=0,b=a[e]).length;l<f;++l)c[++n]=b[l];return c},Y.join=function(a){for(var b="",c=this.length-1,d=0;d<c;++d)b+=this[d]+a;d<c+1&&(b+=this[d]);return b},
Z.charAt=function(a){return this[a]},Z.indexOf=function(a,b){a=a[0];b=b||0;for(var c=this.length;b<c;++b)if(this[b]===a)return b;return-1},Z.split=function(a){for(var b=[],c=this.length,d=a.length,f=-1,e=0,l;0<=(l=this.indexOf(a,e));e=l+d)b[++f]=this.substring(e,l);e<c&&(b[++f]=this.substr(e));return b},Z.substr=function(a){return this.substring(a,this.length)},Z.substring=function(a,b){for(var c="";a<b;++a)c+=this[a];return c}))))));N.lui={defer:function(){return A=H,Fa()},defer_end:Ga,dom_define:function(a,b,c){b=Ha(b);c&&(b=b.cloneNode(H),c.D&&(L(b.dataset,c.D),delete c.D),c.S&&(L(b.style,c.S),delete c.S),L(b,c));E["#"+a]=b},hook_assert:function(a){if(!a)throw E;},hook_async:function(a,b,c){var d;if((t<r.length?(d=r[t++],I):d=r[t++]={m:2,A:Q(b),h:b||F,g:G})||b&&d.A(d.h,b)&&(d.h=b)){void 0!==c&&(d.g=c);var f=r;a.apply(null,h(d.h)).then(function(e){return d.g!==e&&d.h===b&&(d.g=e,wa(f))})}return d.g},hook_callback:function(a,
b){var c=T();c.h=b;return c.ha||(c.ha=function(){var d=ba.apply(0,arguments);return a.apply(null,[].concat(h(c.h),h(d)))})},hook_delay:function(a){var b=g(za(I)),c=b.next().value;b=b.next().value;ya(Ba,[a,b]);return c},hook_dom:function(a,b){return p&&(k.i=Ha(a).cloneNode(H)),Da(b||G)},hook_effect:ya,hook_map:function(a,b,c){var d=G,f=H;if(t<r.length)if((d=r[t]).U!==a)ua(d),d=G;else if(!d.G||c&&d.A(d.h,c))d.h=c||F,d.G=H;else{if(b===d.M)return++t,d.g;f=I}var e=p,l=r,n=++t,m={},v=[],q=0<b.length&&qa(b,
m,v);if(d){if(d.g=[],d.M!==b)for(d.M=b,b=g(d.Z),c=b.next();!c.done;c=b.next())c=c.value,void 0===m[c]&&(U(d.L[c]),delete d.L[c])}else r[n-1]=d={m:3,A:Q(c),h:c||F,g:[],G:H,U:a,X:q?P(b[0]):G,Z:[],L:{},M:b};b=g(v);for(c=b.next();!c.done;c=b.next()){c=c.value;var x=d.L[c];if(p=!x)d.L[c]=x=[{m:1,ca:l,W:d,Y:G,g:G}];if(f||p||(q?d.X(m[c],x[0].Y):m[c]!==x[0].Y)){r=x;t=1;try{x[0].g=a.apply(null,[x[0].Y=m[c]].concat(h(d.h)))}catch(J){}}d.g.push(x[0].g)}p=e;r=l;t=n;d.Z=v;return d.g},hook_memo:Aa,hook_model:function(a){if(t<
r.length)return r[t++].g;for(var b=r,c=[(0,a.init)(G),{}],d=g(M(a)),f=d.next(),e={};!f.done;e={P:e.P},f=d.next())e.P=f.value,c[1][e.P]=function(l){return function(){var n=a[l.P].apply(null,[c[0]].concat(h(ba.apply(0,arguments))));c[0]!==n&&(c[0]=n,wa(b))}}(e);r[t++]={m:0,g:c};return c},hook_object_changes:W,hook_prev:pa,hook_rerender:xa,hook_state:za,hook_static:T,hook_sub:function(a,b){var c=G;if(t<r.length)if((c=r[t]).U!==a)U(c.s),c=G;else if(!c.G||b&&c.A(c.h,b))b&&(c.h=b),c.G=H;else return++t,
c.g;var d=p,f=r,e=t;if(p=!c)(r[t]=c={m:4,A:Q(b),h:b||F,g:G,U:a,G:H,s:[]}).s[0]={m:2,ca:r,W:c};r=c.s;t=1;try{c.g=a.apply(null,h(c.h))}catch(l){}p=d;r=f;t=e+1;return c.g},hook_transition:function(a,b){var c=T({ba:a}),d=Aa(Ca,[a,b,c]);return c.ba=d.fa<=u?d.ga:(xa(),d.$===u?d.aa:d.aa+(d.ga-d.aa)*(u-d.$)/(d.fa-d.$))},init:function(a,b){b=void 0===b?ma.body:b;var c;b.innerHTML="";var d;B[0].push(d={u:{H:function(){return Da((c=a())[0]),c[1]},o:G},N:G,J:G,v:0,T:0,s:[],l:G,i:b,j:b,B:H});d.s[0]={m:0,V:d};
V()},node:Ea,node_dom:function(a,b,c){return Ea(Ia(a),b,c)},node_map:function(a,b,c){return Ea(P,{H:a,M:b,o:c||G})},now:function(){return u}}})()