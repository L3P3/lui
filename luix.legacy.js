'use strict';function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}function g(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];if(b)return b.call(a);if("number"==typeof a.length)return{next:aa(a)};throw Error(String(a)+" is not an iterable or ArrayLike");}function h(a){if(!(a instanceof Array)){a=g(a);for(var b,c=[];!(b=a.next()).done;)c.push(b.value);a=c}return a}
function ba(){for(var a=Number(this),b=[],c=a;c<arguments.length;c++)b[c-a]=arguments[c];return b};/*
 lui.js web frame work 1.4.1
 inspired by react and mithril
 L3P3.de 2023
*/
(function(){var k=null,p=!k,r=k,t=0,u=0,w=0,A=p,B=[],C=[],D={},ca={},da={},ea=[],E=[],fa={},F=k,G=p,H=!p,ha=/[A-Z]/g,I=Array,K=Object,L=K.assign||(K.assign=function(a){for(var b=arguments,c=b.length,d=0,f,e;++d<c;)if(f=b[d])for(e in f)a[e]=f[e];return a}),M=K.keys||(K.keys=function(a){var b=[],c;for(c in a)b.push(c);return b}),ia=setTimeout,ja=clearTimeout,ka=document,N=window,O=Date;function la(a){return new Function("a","b","return a!==b&&("+a.join("||")+")")}
function P(a){var b=(a=M(a)).join(",");return da[b]||(da[b]=la(a.map(function(c){return"a."+c+"!==b."+c})))}function ma(a,b){return a===b?E:M(a).filter(function(c){return a[c]!==b[c]})}function Q(a){return a?ea[a.length]||(ea[a.length]=la(a.map(function(b,c){return"a["+c+"]!==b["+c+"]"}))):F}
function R(a,b){var c=k,d=b,f=c.v+1;r=c.s;t=1;c.B=H;if(c.u.H!==P){var e=F;try{e=(0,c.u.H)(c.u.o||fa)}catch(Ha){}var l=c.i;if(e){l&&(a=l,b=F);var n=e.length,m,v=c.l||(c.l=(new I(n)).fill(F));do{var q=v[--n];(m=e[n])&&m!==G?((p=!q)?((v[n]=k=q={u:m,N:m.o&&P(m.o),J:c,v:f,T:n,s:[],l:F,i:F,j:F,B:H}).s[0]={m:0,V:q},R(a,b),q.i&&a.insertBefore(q.j=q.i,b)):m.o&&q.N(q.u.o,m.o)&&((k=q).u=m,R(a,b)),q.j&&(b=q.j)):q&&(S(q,a),v[n]=F)}while(0<n)}else if(c.l){f=g(c.l);for(e=f.next();!e.done;e=f.next())(e=e.value)&&
S(e,a);c.l=F}l||(c.j=b!==d?b:F)}else{e=c.u.o;l=e.H;var x=e.M;e=e.o;n=x.length;q=G;if(!(0>=na(n,n)+n)){m=T();v={};var J=[];x=0<n&&oa(x,v,J);if(m.K){q=e&&m.N(e,m.ea);for(var W=g(m.da),y=W.next();!y.done;y=W.next())y=y.value,void 0===v[y]&&(S(m.K[y],a),delete m.K[y]);m.ea=e;m.da=J}else m.K={},m.X=x?P(v[J[0]]):F,m.da=J,m.N=(m.ea=e)&&P(e);for(W=c.l=new I(n);0<n;){y=J[--n];var z=m.K[y];if(p=!z)(m.K[y]=k=z={u:{H:l,o:L({I:v[y]},e)},N:F,J:c,v:f,T:n,s:[],l:F,i:F,j:F,B:H}).s[0]={m:0,V:z},R(a,b),z.i&&a.insertBefore(z.j=
z.i,b);else{var qa=pa(z);qa&&qa.nextSibling!==b&&ra(z,a,b);if(q||x&&m.X(v[y],z.u.o.I))(k=z).u.o=L({I:v[y]},e),R(a,b)}(W[z.T=n]=z).j&&(b=z.j)}c.j=b!==d?b:F}}}function S(a,b){b&&a.i&&(b.removeChild(a.i),b=F);if(a.l)for(var c=g(a.l),d=c.next();!d.done;d=c.next())(d=d.value)&&S(d,b);U(a.s);if(a.B){var f,e;(!(e=B[f=a.v])||0>(f=e.indexOf(a)))&&(!(e=C[f])||0>(f=e.indexOf(a)))||e.splice(f,1)}}
function U(a){for(var b,c=a.length;1<c;)switch((b=a[--c]).m){case 1:b.O&&b.O.apply(b,h(b.h));break;case 2:b.h=E;break;case 3:sa(b);break;case 4:U(b.s)}}function oa(a,b,c){var d,f="object"===typeof a[0];a=g(a);for(d=a.next();!d.done;d=a.next()){d=d.value;var e=f?d.id:d;b[e]=d;c.push(e)}return f}function pa(a){if(a.i)return a.i;var b;a=(b=a.l)?b.length:0;for(var c,d;0<a;)if((d=b[--a])&&(c=pa(d)))return c;return F}
function ra(a,b,c){if(a.i)return b.insertBefore(a.i,c),a.i;if(a.j){var d=a.l.length;do a.l[--d]&&(c=ra(a.l[d],b,c));while(0<d)}return c}function ta(a){for(;0!==a[0].m;){if(!a[0].W.G)return F;a[0].W.G=H;a=a[0].ca}return a[0].V}function ua(a){return(a=ta(a))&&!a.B&&(a.B=G,B[a.v]?B[a.v].push(a):B[a.v]=[a],A||V())}function va(){var a=ta(r);a&&(a.B=G,C[a.v]?C[a.v].push(a):C[a.v]=[a])}
function wa(a,b){if(t>=r.length)r[t]={m:1,A:Q(b),h:b=b||E,O:a.apply(null,h(b))||F};else if(b){var c=r[t];c.A(c.h,b)&&(c.O&&c.O.apply(c,h(c.h)),c.O=a.apply(null,h(c.h=b))||F)}++t}function xa(a){if(t<r.length)return r[t++].g;var b=r,c=[a,function(d){c[0]!==d&&(c[0]=d,ua(b))},function(){return c[0]}];r[t++]={m:0,g:c};return c}function T(a){return(t<r.length?r[t++]:r[t++]={m:0,g:void 0===a?{}:a}).g}
function ya(a,b){return t>=r.length?(r[t++]={m:0,A:Q(b),h:b=b||E,g:a.apply(null,h(b))}).g:b&&r[t].A(r[t].h,b)?r[t].g=a.apply(null,h(r[t++].h=b)):r[t++].g}function na(a,b){return t<r.length?(b=r[t].g,r[t++].g=a):r[t++]={m:0,g:a},b}function za(a,b){return a=ia(function(){return b(G)},a),function(){return ja(a)}}function sa(a){for(var b=g(a.Z),c=b.next();!c.done;c=b.next())U(a.L[c.value])}function Aa(a,b,c){return{aa:c.ba,ga:a,$:u,fa:p?u:u+b}}function X(a){var b=na(a,F);return b?ma(b,a):M(a)}
function Ba(a){var b=k.i;if(a){for(var c=g(X(a)),d=c.next();!d.done;d=c.next()){d=d.value;switch(d){case "F":b.className=M(a.F).filter(function(f){return a.F[f]}).join(" ");continue;case "R":a.R(b);case "C":case "D":case "S":continue}b[d]=a[d]}if(a.D)for(c=g(X(a.D)),d=c.next();!d.done;d=c.next())d=d.value,b.setAttribute("data-"+d.replace(ha,"-$&").toLowerCase(),a.D[d]);if(a.S)for(c=g(X(a.S)),d=c.next();!d.done;d=c.next())d=d.value,b.style[d]=a.S[d]}return b}
function Ca(a,b,c){return{H:a,o:b?c?(b.C=c,b):b:c?{C:c}:F}}
function V(){p=0>=u;u=O.now();w&&cancelAnimationFrame(w);A=G;w=0;for(var a;(a=B).length;){B=[];a=g(a);for(var b=a.next();!b.done;b=a.next())if(b=b.value){b=g(b);for(var c=b.next();!c.done;c=b.next())if(k=c.value,k.B){if(k.i)R(F,F);else{var d,f=F;c=k.j;for(var e=k,l=k;!(d=(e=e.J).i););do for(var n=l.T,m=(l=l.J).l,v=m.length;++n<v&&m[n]&&!(f=m[n].j););while(!f&&l!==e);l=k;R(d,f);if(l.j!==c)for(;!(l=l.J).i;){c=F;d=g(l.l);for(f=d.next();!(f.done||(f=f.value)&&(c=f.j));f=d.next());if(c===l.j)break;l.j=
c}}p=H}}}A=H;C.length&&(B=C,C=a,Da())}function Da(){return w||(w=requestAnimationFrame(V))}var Ea=V;function Fa(a){var b=D[a];if(!b){var c=a.indexOf("[");D[a]=b=ka.createElement(0>c?a:a.substring(0,c));if(0<c)for(a=g(a.substring(c+1,a.length-1).split("][")),c=a.next();!c.done;c=a.next()){c=c.value;var d=c.indexOf("=");0<d?b[c.substring(0,d)]=c.substr(d+1):b[c]=G}}return b}function Ga(a){var b=ca[a];if(!b){var c=Fa(a);ca[a]=b=function(d){return p&&(k.i=c.cloneNode(G)),Ba(d),d&&d.C||F}}return b}
var Y=I.prototype,Z=String.prototype;
Y.fill||(Y.fill=function(a){for(var b=this.length,c=0;c<b;++c)this[c]=a;return this},N.requestAnimationFrame||(requestAnimationFrame=N.mozRequestAnimationFrame||N.webkitCancelAnimationFrame&&N.webkitRequestAnimationFrame||function(a){return ia(a,20)},cancelAnimationFrame=N.mozCancelAnimationFrame||N.webkitCancelAnimationFrame||ja,O.now||(O.now=function(){return(new O).getTime()},Y.map||(Y.filter=function(a){for(var b=[],c=this.length,d=-1,f=0;f<c;++f)a(this[f],f)&&(b[++d]=this[f]);return b},Y.find=
function(a){a=this.findIndex(a);if(0<=a)return this[a]},Y.findIndex=Y.forEach=function(a){for(var b=this.length,c=0;c<b;++c)if(a(this[c],c))return c;return-1},Y.includes=Z.includes=function(a){return 0<=this.indexOf(a)},Y.indexOf=function(a,b){b=b||0;for(var c=this.length;b<c;++b)if(this[b]===a)return b;return-1},Y.map=function(a){for(var b=[],c=this.length,d=0;d<c;++d)b[d]=a(this[d],d);return b},Y.some=function(a){return 0<=this.findIndex(a)},Y.push||(Y.push=function(a){this[this.length]=a},Function.prototype.apply=
function(a,b){a==F?(N._=this,a=N):K.prototype._=this;switch(b?b.length:0){case 0:return a._();case 1:return a._(b[0]);case 2:return a._(b[0],b[1]);case 3:return a._(b[0],b[1],b[2]);case 4:return a._(b[0],b[1],b[2],b[3]);case 5:return a._(b[0],b[1],b[2],b[3],b[4]);default:return a._(b[0],b[1],b[2],b[3],b[4],b[5])}},Y.join||(Y.concat=function(){for(var a=arguments,b=this,c=[],d=a.length,f=b.length,e=0,l=0,n=-1;l<f;++l)c[++n]=b[l];for(;e<d;++e)for(f=(l=0,b=a[e]).length;l<f;++l)c[++n]=b[l];return c},
Y.join=function(a){for(var b="",c=this.length-1,d=0;d<c;++d)b+=this[d]+a;d<c+1&&(b+=this[d]);return b},Z.charAt=function(a){return this[a]},Z.indexOf=function(a,b){a=a[0];b=b||0;for(var c=this.length;b<c;++b)if(this[b]===a)return b;return-1},Z.split=function(a){for(var b=[],c=this.length,d=a.length,f=-1,e=0,l;0<=(l=this.indexOf(a,e));e=l+d)b[++f]=this.substring(e,l);e<c&&(b[++f]=this.substr(e));return b},Z.substr=function(a){return this.substring(a,this.length)},Z.substring=function(a,b){for(var c=
"";a<b;++a)c+=this[a];return c}))))));N.lui={defer:function(){return A=G,Da()},defer_end:Ea,dom_define:function(a,b,c){b=Fa(b);c&&(b=b.cloneNode(G),c.D&&(L(b.dataset,c.D),delete c.D),c.S&&(L(b.style,c.S),delete c.S),L(b,c));D["#"+a]=b},hook_assert:function(a){if(!a)throw D;},hook_async:function(a,b,c){var d;if((t<r.length?(d=r[t++],H):d=r[t++]={m:2,A:Q(b),h:b||E,g:F})||b&&d.A(d.h,b)&&(d.h=b)){void 0!==c&&(d.g=c);var f=r;a.apply(null,h(d.h)).then(function(e){return d.g!==e&&d.h===b&&(d.g=e,ua(f))})}return d.g},hook_callback:function(a,
b){var c=T();c.h=b;return c.ha||(c.ha=function(){var d=ba.apply(0,arguments);return a.apply(null,[].concat(h(c.h),h(d)))})},hook_delay:function(a){var b=g(xa(H)),c=b.next().value;b=b.next().value;wa(za,[a,b]);return c},hook_dom:function(a,b){return p&&(k.i=Fa(a).cloneNode(G)),Ba(b||F)},hook_effect:wa,hook_map:function(a,b,c){var d=F,f=G;if(t<r.length)if((d=r[t]).U!==a)sa(d),d=F;else if(!d.G||c&&d.A(d.h,c))d.h=c||E,d.G=G;else{if(b===d.M)return++t,d.g;f=H}var e=p,l=r,n=++t,m={},v=[],q=0<b.length&&oa(b,
m,v);if(d){if(d.g=[],d.M!==b)for(d.M=b,b=g(d.Z),c=b.next();!c.done;c=b.next())c=c.value,void 0===m[c]&&(U(d.L[c]),delete d.L[c])}else r[n-1]=d={m:3,A:Q(c),h:c||E,g:[],G:G,U:a,X:q?P(b[0]):F,Z:[],L:{},M:b};b=g(v);for(c=b.next();!c.done;c=b.next()){c=c.value;var x=d.L[c];if(p=!x)d.L[c]=x=[{m:1,ca:l,W:d,Y:F,g:F}];if(f||p||(q?d.X(m[c],x[0].Y):m[c]!==x[0].Y)){r=x;t=1;try{x[0].g=a.apply(null,[x[0].Y=m[c]].concat(h(d.h)))}catch(J){}}d.g.push(x[0].g)}p=e;r=l;t=n;d.Z=v;return d.g},hook_memo:ya,hook_model:function(a){if(t<
r.length)return r[t++].g;for(var b=r,c=[(0,a.init)(F),{}],d={},f=g(M(a)),e=f.next();!e.done;d={P:d.P},e=f.next())d.P=e.value,c[1][d.P]=function(l){return function(){var n=a[l.P].apply(null,[c[0]].concat(h(ba.apply(0,arguments))));c[0]!==n&&(c[0]=n,ua(b))}}(d);r[t++]={m:0,g:c};return c},hook_object_changes:X,hook_prev:na,hook_rerender:va,hook_state:xa,hook_static:T,hook_sub:function(a,b){var c=F;if(t<r.length)if((c=r[t]).U!==a)U(c.s),c=F;else if(!c.G||b&&c.A(c.h,b))b&&(c.h=b),c.G=G;else return++t,
c.g;var d=p,f=r,e=t;if(p=!c)(r[t]=c={m:4,A:Q(b),h:b||E,g:F,U:a,G:G,s:[]}).s[0]={m:2,ca:r,W:c};r=c.s;t=1;try{c.g=a.apply(null,h(c.h))}catch(l){}p=d;r=f;t=e+1;return c.g},hook_transition:function(a,b){var c=T({ba:a}),d=ya(Aa,[a,b,c]);return c.ba=d.fa<=u?d.ga:(va(),d.$===u?d.aa:d.aa+(d.ga-d.aa)*(u-d.$)/(d.fa-d.$))},init:function(a,b){b=void 0===b?ka.body:b;var c;b.innerHTML="";(k={u:{H:function(){return Ba((c=a())[0]),c[1]},o:F},N:F,J:F,v:0,T:0,s:[],l:F,i:b,j:b,B:G}).s[0]={m:0,V:k};B[0]=[k];V()},node:Ca,
node_dom:function(a,b,c){return Ca(Ga(a),b,c)},node_map:function(a,b,c){return Ca(P,{H:a,M:b,o:c||F})},now:function(){return u}}})()