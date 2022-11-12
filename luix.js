'use strict';/*
 lui.js web frame work 1.3.4
 inspired by react and mithril
 L3P3.de 2022
*/
{let e=null,f=!e,g=e,n=0,r=0,u=0,x=f,y=[],z=[];
const A={},B={},C={},D=[],F=[],aa={},G=e,H=f,J=!f,K=Array,L=Object,ba=L.assign,M=L.keys,ca=document,da=window,ea=da.performance||Date,fa=a=>new Function("a","b",`return a!==b&&(${a.join("||")})`),N=a=>{const b=(a=M(a)).join(",");return C[b]||(C[b]=fa(a.map(c=>`a.${c}!==b.`+c)))},ia=(a,b)=>a===b?F:M(a).filter(c=>a[c]!==b[c]),O=a=>a?D[a.length]||(D[a.length]=fa(a.map((b,c)=>`a[${c}]!==b[${c}]`))):G,P=(a,b)=>{const c=e,d=b,m=c.v+1;g=c.u;n=1;c.B=J;if(c.s.H!==N){var k=G;try{k=(0,c.s.H)(c.s.o||aa)}catch(Q){}var p=
c.i;if(k){p&&(a=p,b=G);var q=k.length,h,t=c.l||(c.l=(new K(q)).fill(G));do{var l=t[--q];(h=k[q])&&h!==H?((f=!l)?((t[q]=e=l={s:h,N:h.o&&N(h.o),J:c,v:m,P:q,u:[],l:G,i:G,j:G,B:J}).u[0]={m:0,U:l},P(a,b),l.i&&a.insertBefore(l.j=l.i,b)):h.o&&l.N(l.s.o,h.o)&&((e=l).s=h,P(a,b)),l.j&&(b=l.j)):l&&(R(l,a),t[q]=G)}while(0<q)}else if(c.l){for(q of c.l)q&&R(q,a);c.l=G}p||(c.j=b!==d?b:G)}else{q=c.s.o.H;var v=c.s.o.M;l=c.s.o.o;t=v.length;let Q=H;if(!(0>=S(t,t)+t)){h=T();k={};p=[];v=0<t&&ja(v,k,p);if(h.K){Q=l&&h.N(l,
h.da);for(var E of h.ca)E in k||(R(h.K[E],a),delete h.K[E]);h.da=l;h.ca=p}else h.K={},h.W=v?N(k[p[0]]):G,h.ca=p,h.N=(h.da=l)&&N(l);for(E=c.l=new K(t);0<t;){const I=p[--t];let w=h.K[I];if(f=!w)(h.K[I]=e=w={s:{H:q,o:ba({I:k[I]},l)},N:G,J:c,v:m,P:t,u:[],l:G,i:G,j:G,B:J}).u[0]={m:0,U:w},P(a,b),w.i&&a.insertBefore(w.j=w.i,b);else{const ha=ka(w);ha&&ha.nextSibling!==b&&la(w,a,b);if(Q||v&&h.W(k[I],w.s.o.I))(e=w).s.o=ba({I:k[I]},l),P(a,b)}(E[w.P=t]=w).j&&(b=w.j)}c.j=b!==d?b:G}}},R=(a,b)=>{b&&a.i&&(b.removeChild(a.i),
b=G);if(a.l)for(const c of a.l)c&&R(c,b);U(a.u);if(a.B){let c,d;(!(d=y[c=a.v])||0>(c=d.indexOf(a)))&&(!(d=z[c])||0>(c=d.indexOf(a)))||d.splice(c,1)}},U=a=>{let b,c=a.length;for(;1<c;)switch((b=a[--c]).m){case 1:b.O&&b.O(...b.h);break;case 2:b.h=F;break;case 3:ma(b);break;case 4:U(b.u)}},ja=(a,b,c)=>{const d="object"===typeof a[0];for(const m of a)a=d?m.id:m,b[a]=m,c.push(a);return d},ka=a=>{if(a.i)return a.i;let b;a=(b=a.l)?b.length:0;let c,d;for(;0<a;)if((d=b[--a])&&(c=ka(d)))return c;return G},
la=(a,b,c)=>{if(a.i)return b.insertBefore(a.i,c),a.i;if(a.j){let d=a.l.length;do a.l[--d]&&(c=la(a.l[d],b,c));while(0<d)}return c},na=a=>{for(;0!==a[0].m;){if(!a[0].V.G)return G;a[0].V.G=J;a=a[0].ba}return a[0].U},W=a=>(a=na(a))&&!a.B&&(a.B=H,y[a.v]?y[a.v].push(a):y[a.v]=[a],x||V()),oa=()=>{const a=na(g);a&&(a.B=H,z[a.v]?z[a.v].push(a):z[a.v]=[a])},pa=(a,b)=>{if(n>=g.length)g[n]={m:1,A:O(b),h:b=b||F,O:a(...b)||G};else if(b){const c=g[n];c.A(c.h,b)&&(c.O&&c.O(...c.h),c.O=a(...(c.h=b))||G)}++n},qa=
a=>{if(n<g.length)return g[n++].g;const b=g,c=[a,d=>{c[0]!==d&&(c[0]=d,W(b))},()=>c[0]];g[n++]={m:0,g:c};return c},T=a=>(n<g.length?g[n++]:g[n++]={m:0,g:void 0===a?{}:a}).g,ra=(a,b)=>n>=g.length?(g[n++]={m:0,A:O(b),h:b=b||F,g:a(...b)}).g:b&&g[n].A(g[n].h,b)?g[n].g=a(...(g[n++].h=b)):g[n++].g,S=(a,b)=>(n<g.length?(b=g[n].g,g[n++].g=a):g[n++]={m:0,g:a},b),sa=(a,b)=>(a=setTimeout(()=>b(H),a),()=>clearTimeout(a)),ma=a=>{for(const b of a.Y)U(a.L[b])},ta=(a,b,c)=>({$:c.aa,fa:a,Z:r,ea:f?r:r+b}),X=a=>{const b=
S(a,G);return b?ia(b,a):M(a)},Y=a=>{const b=e.i;if(a){for(const c of X(a))switch(c.charCodeAt(0)){case 70:b.className=M(a.F).filter(d=>a.F[d]).join(" ");continue;case 82:a.R(b);case 67:case 68:case 83:continue;default:b[c]=a[c]}if(a.D)for(const c of X(a.D))b.dataset[c]=a.D[c];if(a.S)for(const c of X(a.S))b.style[c]=a.S[c]}return b},Z=(a,b,c)=>({H:a,o:b?c?(b.C=c,b):b:c?{C:c}:G}),V=()=>{f=0>=r;r=ea.now();u&&cancelAnimationFrame(u);x=H;u=0;for(var a;(a=y).length;){y=[];for(const b of a)if(b)for(e of b)if(e.B){if(e.i)P(G,
G);else{let c=G,d=e.j,m=e,k=e;for(;!(a=(m=m.J).i););do{let p=k.P;const {l:q}=k=k.J,h=q.length;for(;++p<h&&q[p]&&!(c=q[p].j););}while(!c&&k!==m);k=e;P(a,c);if(k.j!==d)for(;!(k=k.J).i;){d=G;for(const p of k.l)if(p&&(d=p.j))break;if(d===k.j)break;k.j=d}}f=J}}x=J;z.length&&(y=z,z=a,ua())},ua=()=>u||(u=requestAnimationFrame(V)),va=a=>{let b=A[a];if(!b){const c=a.indexOf("[");A[a]=b=ca.createElement(0>c?a.substr(0):a.substr(0,c));if(0<c)for(const d of a.substring(c+1,a.length-1).split("]["))a=d.indexOf("="),
0<a?b[d.substr(0,a)]=d.substr(a+1):b[d]=H}return b},wa=a=>{let b=B[a];if(!b){const c=va(a);B[a]=b=d=>(f&&(e.i=c.cloneNode(H)),Y(d),d&&d.C||G)}return b};da.lui={defer:()=>(x=H,ua()),defer_end:V,hook_assert:a=>{if(!a)throw A;},hook_async:(a,b,c)=>{let d;if((n<g.length?(d=g[n++],J):d=g[n++]={m:2,A:O(b),h:b||F,g:G})||b&&d.A(d.h,b)&&(d.h=b)){void 0!==c&&(d.g=c);const m=g;a(...d.h).then(k=>d.g!==k&&d.h===b&&(d.g=k,W(m)))}return d.g},hook_callback:(a,b)=>{const c=T();c.h=b;return c.ga||(c.ga=(...d)=>a(...c.h,...d))},hook_delay:a=>{const [b,c]=qa(J);pa(sa,[a,c]);return b},hook_dom:(a,b)=>(f&&(e.i=va(a).cloneNode(H)),Y(b||G)),hook_effect:pa,hook_map:(a,b,
c)=>{let d=G,m=H;if(n<g.length)if((d=g[n]).T!==a)ma(d),d=G;else if(!d.G||c&&d.A(d.h,c))d.h=c||F,d.G=H;else{if(b===d.M)return++n,d.g;m=J}const k=f,p=g,q=++n,h={},t=[],l=0<b.length&&ja(b,h,t);if(d){if(d.g=[],d.M!==b){d.M=b;for(const v of d.Y)v in h||(U(d.L[v]),delete d.L[v])}}else g[q-1]=d={m:3,A:O(c),h:c||F,g:[],G:H,T:a,W:l?N(b[0]):G,Y:[],L:{},M:b};for(const v of t){b=d.L[v];if(f=!b)d.L[v]=b=[{m:1,ba:p,V:d,X:G,g:G}];if(m||f||(l?d.W(h[v],b[0].X):h[v]!==b[0].X)){g=b;n=1;try{b[0].g=a(b[0].X=h[v],...d.h)}catch(E){}}d.g.push(b[0].g)}f=
k;g=p;n=q;d.Y=t;return d.g},hook_memo:ra,hook_model:a=>{if(n<g.length)return g[n++].g;const b=g,c=[(0,a.init)(G),{}];for(const d of M(a))c[1][d]=m=>{m=(0,a[d])(c[0],m);c[0]!==m&&(c[0]=m,W(b))};g[n++]={m:0,g:c};return c},hook_object_changes:X,hook_prev:S,hook_rerender:oa,hook_state:qa,hook_static:T,hook_sub:(a,b)=>{let c=G;if(n<g.length)if((c=g[n]).T!==a)U(c.u),c=G;else if(!c.G||b&&c.A(c.h,b))b&&(c.h=b),c.G=H;else return++n,c.g;const d=f,m=g,k=n;if(f=!c)(g[n]=c={m:4,A:O(b),h:b||F,g:G,T:a,G:H,u:[]}).u[0]=
{m:2,ba:g,V:c};g=c.u;n=1;try{c.g=a(...c.h)}catch(p){}f=d;g=m;n=k+1;return c.g},hook_transition:(a,b)=>{const c=T({aa:a});a=ra(ta,[a,b,c]);return c.aa=a.ea<=r?a.fa:(oa(),a.Z===r?a.$:a.$+(a.fa-a.$)*(r-a.Z)/(a.ea-a.Z))},init:a=>{let b;const c=ca.body;c.innerHTML="";(e={s:{H:()=>(Y((b=a())[0]),b[1]),o:G},N:G,J:G,v:0,P:0,u:[],l:G,i:c,j:c,B:H}).u[0]={m:0,U:e};y[0]=[e];V()},node:Z,node_dom:(a,b,c)=>Z(wa(a),b,c),node_map:(a,b,c)=>Z(N,{H:a,M:b,o:c||G}),now:()=>r}}