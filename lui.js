'use strict';/*
 lui.js web frame work 2.1.0
 inspired by react and mithril
 L3P3.de 2024
*/
{let e=null,g=!e,h=e,l=0,v=0,w=0,x=!g,y=[],z=[];
const A={},C={},D={},E=[],F=[],aa={},G=e,H=g,J=x,K=Array,L=Object,M=L.assign,N=L.keys,P=document,ba=window,ca=ba.performance||Date,da=a=>new Function("a","b",`return a!==b&&(${a.join("||")})`),Q=a=>{const b=(a=N(a)).join(",");return D[b]||(D[b]=da(a.map(c=>`a.${c}!==b.`+c)))},fa=(a,b)=>a===b?F:N(a).filter(c=>a[c]!==b[c]),R=a=>a?E[a.length]||(E[a.length]=da(a.map((b,c)=>`a[${c}]!==b[${c}]`))):G,S=(a,b)=>{const c=e,d=b,n=c.s+1;h=c.M;l=0;c.u=J;if(c.o.A!==Q){var f=G;try{f=(0,c.o.A)(c.o.l||aa)}catch(O){}var q=
c.g;if(f){q&&(a=q,b=G);var r=f.length,k,t=c.j||(c.j=(new K(r)).fill(G));do{var m=t[--r];(k=f[r])&&k!==H?((g=!m)?(t[r]=e=m={o:k,J:k.l&&Q(k.l),G:c,s:n,L:r,M:[],j:G,g:G,h:G,u:J},S(a,b),m.g&&a.insertBefore(m.h=m.g,b)):k.l&&m.J(m.o.l,k.l)&&((e=m).o=k,S(a,b)),m.h&&(b=m.h)):m&&(T(m,a),t[r]=G)}while(0<r)}else if(c.j){for(r of c.j)r&&T(r,a);c.j=G}q||(c.h=b!==d?b:G)}else{r=c.o.l.A;var u=c.o.l.T;m=c.o.l.l;t=u.length;let O=H;if(!(0>=U(t,t)+t)){k=ha();f={};q=[];var p;if(p=0<t){p="object"===typeof u[0];for(var B of u)u=
p?B.id:B,f[u]=B,q.push(u)}B=p;if(k.H){O=m&&k.J(m,k.O);for(var I of k.N)I in f||(T(k.H[I],a),delete k.H[I]);k.O=m;k.N=q}else k.H={},k.P=B?Q(f[q[0]]):G,k.N=q,k.J=(k.O=m)&&Q(m);for(I=c.j=new K(t);0<t;){u=q[--t];p=k.H[u];if(g=!p)k.H[u]=e=p={o:{A:r,l:M({I:f[u]},m)},J:G,G:c,s:n,L:t,M:[],j:G,g:G,h:G,u:J},S(a,b),p.g&&a.insertBefore(p.h=p.g,b);else{const ea=ia(p);ea&&ea.nextSibling!==b&&ja(p,a,b);if(O||B&&k.P(f[u],p.o.l.I))(e=p).o.l=M({I:f[u]},m),S(a,b)}(I[p.L=t]=p).h&&(b=p.h)}c.h=b!==d?b:G}}},T=(a,b)=>{b&&
a.g&&(a.g.remove(),b=G);if(a.j)for(var c of a.j)c&&T(c,b);b=a.M;let d=b.length;for(;1<d;)switch((c=b[--d]).v){case 1:c.K&&c.K(...c.m);break;case 2:c.m=F}if(a.u){let n,f;(!(f=y[n=a.s])||0>(n=f.indexOf(a)))&&(!(f=z[n])||0>(n=f.indexOf(a)))||f.splice(n,1)}},ia=a=>{if(a.g)return a.g;let b;a=(b=a.j)?b.length:0;let c,d;for(;0<a;)if((d=b[--a])&&(c=ia(d)))return c;return G},ja=(a,b,c)=>{if(a.g)return b.insertBefore(a.g,c);if(a.h){let d=a.j.length;do a.j[--d]&&(c=ja(a.j[d],b,c));while(0<d)}return c},W=a=>
!a.u&&(a.u=H,y[a.s]?y[a.s].push(a):y[a.s]=[a],x||V()),ha=a=>(l<h.length?h[l++]:h[l++]={v:0,i:void 0===a?{}:a}).i,U=(a,b)=>(l<h.length?(b=h[l].i,h[l++].i=a):h[l++]={v:0,i:a},b),X=a=>{const b=U(a,G);return b?fa(b,a):N(a)},ka=a=>{const b=e.g;if(a){for(const c of X(a)){switch(c.charCodeAt(0)){case 70:b.className=N(a.F).filter(d=>a.F[d]).join(" ");continue;case 82:a.R(b);case 67:case 68:case 83:continue}b[c]=a[c]}if(a.D)for(const c of X(a.D))b.dataset[c]=a.D[c];if(a.S)for(const c of X(a.S))b.style[c]=
a.S[c]}return b},Y=(a,b,c)=>({A:a,l:b?c?(b.C=c,b):b:c?{C:c}:G}),V=()=>{g=0>=v;v=ca.now();w&&cancelAnimationFrame(w);x=H;w=0;for(var a;(a=y).length;){y=[];for(const b of a)if(b)for(e of b)if(e.u){if(e.g)S(G,G);else{let c=G,d=e.h,n=e,f=e;for(;!(a=(n=n.G).g););do{let q=f.L;const {j:r}=f=f.G,k=r.length;for(;++q<k&&r[q]&&!(c=r[q].h););}while(!c&&f!==n);f=e;S(a,c);if(f.h!==d)for(;!(f=f.G).g;){d=G;for(const q of f.j)if(q&&(d=q.h))break;if(d===f.h)break;f.h=d}}g=J}}x=J;z.length&&(y=z,z=a,la())},la=()=>w||
(w=requestAnimationFrame(V)),Z=a=>{let b=A[a];if(!b){const c=a.indexOf("[");A[a]=b=P.createElement(0>c?a:a.substr(0,c));if(0<c)for(const d of a.substring(c+1,a.length-1).split("]["))a=d.indexOf("="),0<a?b[d.substr(0,a)]=d.substr(a+1):b[d]=H}return b},ma=a=>{let b=C[a];if(!b){const c=Z(a);C[a]=b=d=>(g&&(e.g=c.cloneNode(H)),ka(d),d&&d.C||G)}return b};ba.lui={defer:()=>(x=H,la()),defer_end:V,dom_define:(a,b,c)=>{b=Z(b);c&&(b=b.cloneNode(H),c.D&&(M(b.dataset,c.D),delete c.D),c.S&&(M(b.style,c.S),delete c.S),M(b,c));A["#"+a]=b},hook_assert:a=>{if(!a)throw A;},hook_async:(a,b,c)=>{let d;if((l<h.length?(d=h[l++],J):d=h[l++]={v:2,B:R(b),m:b||F,i:G})||b&&d.B(d.m,b)&&(d.m=b)){void 0!==c&&(d.i=c);const n=e;a(...d.m).then(f=>d.i!==f&&d.m===b&&(d.i=f,W(n)))}return d.i},hook_dom:(a,b)=>(e.g===G&&(e.g=Z(a).cloneNode(H)),ka(b||G)),hook_effect:(a,b)=>{if(l>=
h.length)h[l]={v:1,B:R(b),m:b=b||F,K:a(...b)||G};else if(b){const c=h[l];c.B(c.m,b)&&(c.K&&c.K(...c.m),c.K=a(...(c.m=b))||G)}++l},hook_memo:(a,b)=>l>=h.length?(h[l++]={v:0,B:R(b),m:b=b||F,i:a(...b)}).i:b&&h[l].B(h[l].m,b)?h[l].i=a(...(h[l++].m=b)):h[l++].i,hook_model:a=>{if(l<h.length)return h[l++].i;const b=e,c=[(0,a.init)(G),{}];for(const d of N(a))c[1][d]=(...n)=>{n=(0,a[d])(c[0],...n);c[0]!==n&&(c[0]=n,W(b))};h[l++]={v:0,i:c};return c},hook_prev:U,hook_rerender:()=>{const a=e;a.u=H;z[a.s]?z[a.s].push(a):
z[a.s]=[a]},hook_state:a=>{if(l<h.length)return h[l++].i;const b=e,c=[a,d=>{c[0]!==d&&(c[0]=d,W(b))},()=>c[0]];h[l++]={v:0,i:c};return c},hook_static:ha,init:(a,b=P.body,c=G)=>{b.innerHTML="";W({o:{A:a,l:c},J:G,G,s:0,L:0,M:[],j:G,g:b,h:b,u:J})},node:Y,node_dom:(a,b,c)=>Y(ma(a),b,c),node_map:(a,b,c)=>Y(Q,{A:a,T:b,l:c||G}),now:()=>v}}