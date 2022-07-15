'use strict';/*
 lui.js web frame work 1.3.2
 inspired by react and mithril
 L3P3.de 2022
*/
{let e=null,g=!e,h=e,l=0,u=0,w=0,x=g,y=[],z=[];
const A={},C={},D={},E=[],F=[],aa={},H=e,I=g,J=!g,K=Array,L=Object,M=L.assign,O=L.keys,P=document,ba=window,ca=ba.performance||Date,da=a=>new Function("a","b",`return a!==b&&(${a.join("||")})`),Q=a=>{const b=(a=O(a)).join(",");return D[b]||(D[b]=da(a.map(c=>`a.${c}!==b.`+c)))},fa=(a,b)=>a===b?F:O(a).filter(c=>a[c]!==b[c]),R=a=>a?E[a.length]||(E[a.length]=da(a.map((b,c)=>`a[${c}]!==b[${c}]`))):H,S=(a,b)=>{const c=e,d=b,p=c.u+1;h=c.A;l=1;c.v=J;if(c.o.B!==Q){var f=H;try{f=(0,c.o.B)(c.o.l||aa)}catch(N){}var q=
c.g;if(f){q&&(a=q,b=H);var r=f.length,k,t=c.j||(c.j=(new K(r)).fill(H));do{var m=t[--r];(k=f[r])&&k!==I?((g=!m)?((t[r]=e=m={o:k,K:k.l&&Q(k.l),H:c,u:p,M:r,A:[],j:H,g:H,h:H,v:J}).A[0]={s:0,N:m},S(a,b),m.g&&a.insertBefore(m.h=m.g,b)):k.l&&m.K(m.o.l,k.l)&&((e=m).o=k,S(a,b)),m.h&&(b=m.h)):m&&(T(m,a),t[r]=H)}while(0<r)}else if(c.j){for(r of c.j)r&&T(r,a);c.j=H}q||(c.h=b!==d?b:H)}else{r=c.o.l.B;var n=c.o.l.W;m=c.o.l.l;t=n.length;let N=I;if(!(0>=U(t,t)+t)){k=ha();f={};q=[];var v;if(v=0<t){v="object"===typeof n[0];
for(var B of n)n=v?B.id:B,f[n]=B,q.push(n)}B=v;if(k.J){N=m&&k.K(m,k.P);for(var G of k.O)G in f||(T(k.J[G],a),delete k.J[G]);k.P=m;k.O=q}else k.J={},k.V=B?Q(f[q[0]]):H,k.O=q,k.K=(k.P=m)&&Q(m);for(G=c.j=new K(t);0<t;){v=q[--t];n=k.J[v];if(g=!n)(k.J[v]=e=n={o:{B:r,l:M({I:f[v]},m)},K:H,H:c,u:p,M:t,A:[],j:H,g:H,h:H,v:J}).A[0]={s:0,N:n},S(a,b),n.g&&a.insertBefore(n.h=n.g,b);else{const ea=ia(n);ea&&ea.nextSibling!==b&&ja(n,a,b);if(N||B&&k.V(f[v],n.o.l.I))(e=n).o.l=M({I:f[v]},m),S(a,b)}(G[n.M=t]=n).h&&(b=
n.h)}c.h=b!==d?b:H}}},T=(a,b)=>{b&&a.g&&(b.removeChild(a.g),b=H);if(a.j)for(var c of a.j)c&&T(c,b);b=a.A;let d=b.length;for(;1<d;)switch((c=b[--d]).s){case 1:c.L&&c.L(...c.m);break;case 2:c.m=F}if(a.v){let p,f;(!(f=y[p=a.u])||0>(p=f.indexOf(a)))&&(!(f=z[p])||0>(p=f.indexOf(a)))||f.splice(p,1)}},ia=a=>{if(a.g)return a.g;let b;a=(b=a.j)?b.length:0;let c,d;for(;0<a;)if((d=b[--a])&&(c=ia(d)))return c;return H},ja=(a,b,c)=>{if(a.g)return b.insertBefore(a.g,c),a.g;if(a.h){let d=a.j.length;do a.j[--d]&&
(c=ja(a.j[d],b,c));while(0<d)}return c},ka=a=>{for(;0!==a[0].s;){if(!a[0].U.T)return H;a[0].U.T=J;a=a[0].X}return a[0].N},W=a=>(a=ka(a))&&!a.v&&(a.v=I,y[a.u]?y[a.u].push(a):y[a.u]=[a],x||V()),ha=a=>(l<h.length?h[l++]:h[l++]={s:0,i:void 0===a?{}:a}).i,U=(a,b)=>(l<h.length?(b=h[l].i,h[l++].i=a):h[l++]={s:0,i:a},b),X=a=>{const b=U(a,H);return b?fa(b,a):O(a)},Y=a=>{const b=e.g;if(a){for(const c of X(a))switch(c.charCodeAt(0)){case 70:b.className=O(a.F).filter(d=>a.F[d]).join(" ");continue;case 82:a.R(b);
case 67:case 68:case 83:continue;default:b[c]=a[c]}if(a.D)for(const c of X(a.D))b.dataset[c]=a.D[c];if(a.S)for(const c of X(a.S))b.style[c]=a.S[c]}return b},Z=(a,b,c)=>({B:a,l:b?c?(b.C=c,b):b:c?{C:c}:H}),V=()=>{g=0>=u;u=ca.now();w&&cancelAnimationFrame(w);x=I;w=0;for(var a;(a=y).length;){y=[];for(const b of a)if(b)for(e of b)if(e.v){if(e.g)S(H,H);else{let c=H,d=e.h,p=e,f=e;for(;!(a=(p=p.H).g););do{let q=f.M;const {j:r}=f=f.H,k=r.length;for(;++q<k&&r[q]&&!(c=r[q].h););}while(!c&&f!==p);f=e;S(a,c);
if(f.h!==d)for(;!(f=f.H).g;){d=H;for(const q of f.j)if(q&&(d=q.h))break;if(d===f.h)break;f.h=d}}g=J}}x=J;z.length&&(y=z,z=a,la())},la=()=>w||(w=requestAnimationFrame(V)),ma=a=>{let b=A[a];if(!b){const c=a.indexOf("[");A[a]=b=P.createElement(0>c?a.substr(0):a.substr(0,c));if(0<c)for(const d of a.substring(c+1,a.length-1).split("]["))a=d.indexOf("="),0<a?b[d.substr(0,a)]=d.substr(a+1):b[d]=I}return b},na=a=>{let b=C[a];if(!b){const c=ma(a);C[a]=b=d=>(g&&(e.g=c.cloneNode(I)),Y(d),d&&d.C||H)}return b};ba.lui={defer:()=>(x=I,la()),defer_end:V,hook_assert:a=>{if(!a)throw A;},hook_async:(a,b,c)=>{let d;if((l<h.length?(d=h[l++],J):d=h[l++]={s:2,G:R(b),m:b||F,i:H})||b&&d.G(d.m,b)&&(d.m=b)){void 0!==c&&(d.i=c);const p=h;a(...d.m).then(f=>d.i!==f&&d.m===b&&(d.i=f,W(p)))}return d.i},hook_dom:(a,b)=>(g&&(e.g=ma(a).cloneNode(I)),Y(b||H)),hook_effect:(a,b)=>{if(l>=h.length)h[l]={s:1,G:R(b),m:b=b||F,L:a(...b)||H};else if(b){const c=h[l];c.G(c.m,b)&&(c.L&&c.L(...c.m),c.L=a(...(c.m=b))||H)}++l},hook_memo:(a,
b)=>l>=h.length?(h[l++]={s:0,G:R(b),m:b=b||F,i:a(...b)}).i:b&&h[l].G(h[l].m,b)?h[l].i=a(...(h[l++].m=b)):h[l++].i,hook_model:a=>{if(l<h.length)return h[l++].i;const b=h,c=[(0,a.init)(H),{}];for(const d of O(a))c[1][d]=p=>{p=(0,a[d])(c[0],p);c[0]!==p&&(c[0]=p,W(b))};h[l++]={s:0,i:c};return c},hook_prev:U,hook_rerender:()=>{const a=ka(h);a&&(a.v=I,z[a.u]?z[a.u].push(a):z[a.u]=[a])},hook_state:a=>{if(l<h.length)return h[l++].i;const b=h,c=[a,d=>{c[0]!==d&&(c[0]=d,W(b))},()=>c[0]];h[l++]={s:0,i:c};return c},
hook_static:ha,init:a=>{let b;const c=P.body;c.innerHTML="";(e={o:{B:()=>(Y((b=a())[0]),b[1]),l:H},K:H,H,u:0,M:0,A:[],j:H,g:c,h:c,v:I}).A[0]={s:0,N:e};y[0]=[e];V()},node:Z,node_dom:(a,b,c)=>Z(na(a),b,c),node_map:(a,b,c)=>Z(Q,{B:a,W:b,l:c||H}),now:()=>u}}