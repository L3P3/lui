function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}function f(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:aa(a)}}function g(a){if(!(a instanceof Array)){a=f(a);for(var b,c=[];!(b=a.next()).done;)c.push(b.value);a=c}return a};/*
 lui.js web frame work 1.0.0
 inspired by react and mithril
 L3P3.de 2021
*/
{var h=null,p=!h,r=h,t=0,u=0,y=0,z=p,A=[],B=[],C={},ba={},ca={},da=[],E=[],F=h,G=p,H=!p,I=Array,J=Object,ea=J.assign||(J.assign=function(a){for(var b=arguments.length,c=0,d,e;++c<b;)if(d=arguments[c])for(e in d)a[e]=d[e];return a}),K=J.keys||(J.keys=function(a){var b=[],c;for(c in a)b.push(c);return b}),fa=setTimeout,ha=clearTimeout,ia=document,L=window,M=Date;function ja(a){return new Function("a","b","return a!==b&&("+a.join("||")+")")}
function N(a){var b=(a=K(a)).join(",");return ca[b]||(ca[b]=ja(a.map(function(c){return"a."+c+"!==b."+c})))}function ka(a,b){return a===b?E:K(a).filter(function(c){return a[c]!==b[c]})}function O(a){return a?da[a.length]||(da[a.length]=ja(a.map(function(b,c){return"a["+c+"]!==b["+c+"]"}))):F}
function P(a,b){var c=h,d=b;r=c.s;t=1;c.A=H;if(c.u.D!==N){var e=F;try{e=c.u.D(c.u.o)}catch(za){}var m=c.i;if(e){m&&(a=m,b=F);var k=e.length,n,q=c.m||(c.m=(new I(k)).fill(F));do{var l=q[--k];(n=e[k])&&n!==G?((p=!l)?((q[k]=h=l={u:n,M:n.o&&N(n.o),G:c,level:c.level+1,L:k,s:[],m:F,i:F,j:F,A:H}).s[0]={l:0,P:l},P(a,b),l.i&&a.insertBefore(l.j=l.i,b)):n.o&&l.M(l.u.o,n.o)&&((h=l).u=n,P(a,b)),l.j&&(b=l.j)):l&&(Q(l,a),q[k]=F)}while(0<k)}else if(c.m){e=f(c.m);for(k=e.next();!k.done;k=e.next())(k=k.value)&&Q(k,
a);c.m=F}m||(c.j=b!==d?b:F)}else{e=c.u.o;m=e.D;var D=e.K;e=e.o;k=D.length;if(!(0>=R(k,k)+k)){l=S();n={};q=[];D=0<k&&la(D,n,q);if(l.H){l.ba=e!==F&&l.M(e,l.ca);for(var w=f(l.aa),v=w.next();!v.done;v=w.next())v=v.value,v in n||(Q(l.H[v],a),delete l.H[v]);l.ca=e;l.aa=q}else l.H={},l.U=D?N(n[q[0]]):F,l.aa=q,l.M=(l.ca=e)&&N(e),l.ba=G;for(w=c.m=new I(k);0<k;){v=q[--k];var x=l.H[v];if(p=!x)(l.H[v]=h=x={u:{D:m,o:ea({I:n[v]},e)},M:F,G:c,level:c.level+1,L:k,s:[],m:F,i:F,j:F,A:H}).s[0]={l:0,P:x},P(a,b),x.i&&
a.insertBefore(x.j=x.i,b);else if(x.L!==k&&(ma(x,a,b),x.L=k),l.ba||D&&l.U(n[v],x.u.o.I))(h=x).u.o=ea({I:n[v]},e),P(a,b);(w[k]=x).j&&(b=x.j)}c.j=b!==d?b:F}}}function Q(a,b){b&&a.i&&(b.removeChild(a.i),b=F);if(a.m)for(var c=f(a.m),d=c.next();!d.done;d=c.next())(d=d.value)&&Q(d,b);T(a.s);if(a.A){var e,m;(!(m=A[e=a.level])||0>(e=m.indexOf(a)))&&(!(m=B[e])||0>(e=m.indexOf(a)))||m.splice(e,1)}}
function T(a){for(var b,c=a.length;1<c;)switch((b=a[--c]).l){case 1:b.N&&b.N.apply(b,g(b.h));break;case 2:b.h=E;break;case 3:na(b);break;case 4:T(b.s)}}function la(a,b,c){var d,e="object"===typeof a[0];a=f(a);for(d=a.next();!d.done;d=a.next()){d=d.value;var m=e?d.id:d;b[m]=d;c.push(m)}return e}function ma(a,b,c){if(a.i)return b.insertBefore(a.i,c),a.i;if(a.j){var d=a.m.length;do a.m[--d]&&(c=ma(a.m[d],b,c));while(0<d)}return c}
function oa(a){for(;0!==a[0].l;){if(!a[0].T.B)return F;a[0].T.B=H;a=a[0].$}return a[0].P}function U(a){return(a=oa(a))&&!a.A&&(a.A=G,A[a.level]?A[a.level].push(a):A[a.level]=[a],z||V())}function pa(){var a=oa(r);a&&(a.A=G,B[a.level]?B[a.level].push(a):B[a.level]=[a])}function qa(a,b){if(t>=r.length)r[t]={l:1,v:O(b),h:b=b||E,N:a.apply(null,g(b))||F};else if(b){var c=r[t];c.v(c.h,b)&&(c.N&&c.N.apply(c,g(c.h)),c.N=a.apply(null,g(c.h=b))||F)}++t}
function ra(a){if(t<r.length)return r[t++].g;var b=r,c=[a,function(d){c[0]!==d&&(c[0]=d,U(b))},function(){return c[0]}];r[t++]={l:0,g:c};return c}function S(a){return(t<r.length?r[t++]:r[t++]={l:0,g:void 0===a?{}:a}).g}function sa(a,b){return t>=r.length?(r[t++]={l:0,v:O(b),h:b=b||E,g:a.apply(null,g(b))}).g:b&&r[t].v(r[t].h,b)?r[t].g=a.apply(null,g(r[t++].h=b)):r[t++].g}function R(a,b){return t<r.length?(b=r[t].g,r[t++].g=a):r[t++]={l:0,g:a},b}
function ta(a,b){return a=fa(function(){return b(G)},a),function(){return ha(a)}}function na(a){for(var b=f(a.W),c=b.next();!c.done;c=b.next())T(a.J[c.value])}function ua(a,b,c){return{Y:c.Z,ea:a,X:u,da:p?u:u+b}}function W(a){var b=R(a,F);return b?ka(b,a):K(a)}
function X(a){var b=h.i;if(a){for(var c=f(W(a)),d=c.next();!d.done;d=c.next())switch(d=d.value,d){case "F":b.className=K(a.F).filter(function(e){return a.F[e]}).join(" ");continue;case "R":a.R(b);case "C":case "S":continue;default:b[d]=a[d]}if(a.S)for(c=f(W(a.S)),d=c.next();!d.done;d=c.next())d=d.value,b.style[d]=a.S[d]}return b}function va(a,b,c){return{D:a,o:b?c?(b.C=c,b):b:c?{C:c}:F}}
function V(){p=0>=u;u=M.now();z=G;y=0;for(var a;(a=A).length;){A=[];a=f(a);for(var b=a.next();!b.done;b=a.next())if(b=b.value){b=f(b);for(var c=b.next();!c.done;c=b.next())if(h=c.value,h.A){if(h.i)P(F,F);else{var d,e=F;c=h.j;for(var m=h,k=h;!(d=(m=m.G).i););do for(var n=k.L,q=(k=k.G).m,l=q.length;++n<l&&q[n]&&!(e=q[n].j););while(!e&&k!==m);k=h;P(d,e);if(k.j!==c)for(;!(k=k.G).i;){c=F;d=f(k.m);for(e=d.next();!(e.done||(e=e.value)&&(c=e.j));e=d.next());if(c===k.j)break;k.j=c}}p=H}}}z=H;B.length&&(A=
B,B=a,wa())}function wa(){return y||(y=requestAnimationFrame(V))}function xa(a){var b=C[a];if(!b){var c=a.indexOf("[");C[a]=b=ia.createElement(0>c?a.substr(0):a.substr(0,c));if(0<c)for(a=f(a.substring(c+1,a.length-1).split("][")),c=a.next();!c.done;c=a.next()){c=c.value;var d=c.indexOf("=");0<d?b[c.substr(0,d)]=c.substr(d+1):b[c]=G}}return b}function ya(a){var b=ba[a];if(!b){var c=xa(a);ba[a]=b=function(d){return p&&(h.i=c.cloneNode(G)),X(d),d&&d.C||F}}return b}var Y=I.prototype,Z=String.prototype;
M.now||(M.now=function(){return(new M).getTime()},Y.map||(Y.map=function(a){for(var b=[],c=this.length,d=0;d<c;++d)b.push(a(this[d],d));return b},Y.filter=function(a){for(var b=[],c=this.length,d=0;d<c;++d)a(this[d],d)&&b.push(this[d]);return b},Y.indexOf=function(a,b){b||(b=0);for(var c=this.length;b<c;++b)if(this[b]===a)return b;return-1},Y.fill=function(a){for(var b=this.length,c=0;c<b;++c)this[c]=a;return this},Y.push||(Z.charAt=function(a){return this[a]},Z.substring=function(a,b){for(var c=
"";a<b;++a)c+=this[a];return c},Z.substr=function(a){return this.substring(a,this.length)},Z.indexOf=function(a,b){a=a[0];b||(b=0);for(var c=this.length;b<c;++b)if(this[b]===a)return b;return-1},Y.push=function(a){this[this.length]=a},Y.join=function(a){for(var b="",c=this.length-1,d=0;d<c;)b+=this[d++]+a;d<c+1&&(b+=this[d]);return b},Z.split=function(a){for(var b=[],c=this.length,d=a.length,e=0,m;0<=(m=this.indexOf(a,e));e=m+d)b.push(this.substring(e,m));e<c&&b.push(this.substr(e));return b})));
L.requestAnimationFrame||(requestAnimationFrame=L.mozRequestAnimationFrame||L.webkitCancelAnimationFrame&&L.webkitRequestAnimationFrame||function(a){return fa(a,20)},cancelAnimationFrame=L.mozCancelAnimationFrame||L.webkitCancelAnimationFrame||ha);L.lui={defer:function(){return z=G,wa()},defer_end:function(){return cancelAnimationFrame(y),V()},hook_assert:function(a){if(!a)throw C;},hook_async:function(a,b,c){var d;if((t<r.length?(d=r[t++],H):d=r[t++]={l:2,v:O(b),h:b||E,g:F})||b&&d.v(d.h,b)&&(d.h=b)){void 0!==c&&(d.g=c);var e=r;a.apply(null,g(d.h)).then(function(m){return d.g!==m&&d.h===b&&(d.g=m,U(e))})}return d.g},hook_callback:function(a,b){var c=S();c.h=b;return c.fa||(c.fa=function(d){for(var e=[],m=0;m<arguments.length;++m)e[m]=arguments[m];
return a.apply(null,[].concat(g(c.h),g(e)))})},hook_delay:function(a){var b=f(ra(H)),c=b.next().value;b=b.next().value;qa(ta,[a,b]);return c},hook_dom:function(a,b){return p&&(h.i=xa(a).cloneNode(G)),X(b||F)},hook_effect:qa,hook_first:function(){return p},hook_map:function(a,b,c){var d=F,e=G;if(t<r.length)if((d=r[t]).O!==a)na(d),d=F;else if(!d.B||c&&d.v(d.h,c))d.h=c||E,d.B=G;else{if(b===d.K)return++t,d.g;e=H}var m=p,k=r,n=++t,q={},l=[],D=0<b.length&&la(b,q,l);if(d){if(d.g=[],d.K!==b)for(d.K=b,b=f(d.W),
c=b.next();!c.done;c=b.next())c=c.value,c in q||(T(d.J[c]),delete d.J[c])}else r[n-1]=d={l:3,v:O(c),h:c||E,g:[],B:G,O:a,U:D?N(b[0]):F,W:[],J:{},K:b};b=f(l);for(c=b.next();!c.done;c=b.next()){c=c.value;var w=d.J[c];if(p=!w)d.J[c]=w=[{l:1,$:k,T:d,V:F,g:F}];if(e||p||(D?d.U(q[c],w[0].V):q[c]!==w[0].V)){r=w;t=1;try{w[0].g=a.apply(null,[w[0].V=q[c]].concat(g(d.h)))}catch(v){}}d.g.push(w[0].g)}p=m;r=k;t=n;d.W=l;return d.g},hook_memo:sa,hook_object_changes:W,hook_prev:R,hook_reducer:function(a){if(t<r.length)return r[t++].g;
var b=r,c=[a[0](F),function(d,e){var m=a[d](c[0],e);c[0]!==m&&(c[0]=m,U(b))}];r[t++]={l:0,g:c};return c},hook_reducer_f:function(a,b){if(t<r.length)return r[t++].g;var c=r,d=[b?b():F,function(e){e=a(d[0],e);d[0]!==e&&(d[0]=e,U(c))}];r[t++]={l:0,g:d};return d},hook_rerender:pa,hook_state:ra,hook_static:S,hook_sub:function(a,b){var c=F;if(t<r.length)if((c=r[t]).O!==a)T(c.s),c=F;else if(!c.B||b&&c.v(c.h,b))b&&(c.h=b),c.B=G;else return++t,c.g;var d=p,e=r,m=t;if(p=!c)(r[t]=c={l:4,v:O(b),h:b||E,g:F,O:a,
B:G,s:[]}).s[0]={l:2,$:r,T:c};r=c.s;t=1;try{c.g=a.apply(null,g(c.h))}catch(k){}p=d;r=e;t=m+1;return c.g},hook_transition:function(a,b){var c=S({Z:a}),d=sa(ua,[a,b,c]);return c.Z=d.da<=u?d.ea:(pa(),d.X===u?d.Y:d.Y+(d.ea-d.Y)*(u-d.X)/(d.da-d.X))},init:function(a){var b,c=ia.body;c.innerHTML="";(h={u:{D:function(){return X((b=a())[0]),b[1]},o:F},M:F,G:F,level:0,L:0,s:[],m:F,i:c,j:c,A:G}).s[0]={l:0,P:h};A[0]=[h];V()},node:va,node_dom:function(a,b,c){return va(ya(a),b,c)},node_map:function(a,b,c){return va(N,
{D:a,K:b,o:c||F})},now:function(){return u}}}