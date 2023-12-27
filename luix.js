'use strict';/*
 lui.js web frame work 1.4.3
 inspired by react and mithril
 L3P3.de 2023
*/
{let e=null,f=!e,g=e,n=0,r=0,t=0,x=f,y=[[]],z=[[]];
const A={},B={},C={},D=[],F=[],aa={},G=e,H=f,I=!f,ba=Array,ca=Object,K=ca.assign,L=ca.keys,da=document,ea=window,fa=ea.performance||Date,ha=a=>new Function("a","b",`return a!==b&&(${a.join("||")})`),M=a=>{const b=(a=L(a)).join(",");return C[b]||(C[b]=ha(a.map(c=>`a.${c}!==b.`+c)))},ja=(a,b)=>a===b?F:L(a).filter(c=>a[c]!==b[c]),N=a=>a?D[a.length]||(D[a.length]=ha(a.map((b,c)=>`a[${c}]!==b[${c}]`))):G,O=(a,b)=>{const c=e,d=b,m=c.v+1;g=c.u;n=1;c.B=I;if(c.s.H!==M){var k=G;try{k=(0,c.s.H)(c.s.o||aa)}catch(R){}var p=
c.i;if(k){p&&(a=p,b=G);var q=k.length,h,u=c.l||(c.l=(new ba(q)).fill(G));do{var l=u[--q];(h=k[q])&&h!==H?((f=!l)?(u[q]=e=l={s:h,N:h.o&&M(h.o),J:c,v:m,P:q,u:[],l:G,i:G,j:G,B:I},e.u[0]={m:0,U:l},O(a,b),l.i&&a.insertBefore(l.j=l.i,b)):h.o&&l.N(l.s.o,h.o)&&((e=l).s=h,O(a,b)),l.j&&(b=l.j)):l&&(P(l,a),u[q]=G)}while(0<q)}else if(c.l){for(q of c.l)q&&P(q,a);c.l=G}p||(c.j=b!==d?b:G)}else{q=c.s.o.H;var v=c.s.o.M;l=c.s.o.o;u=v.length;let R=H;if(!(0>=Q(u,u)+u)){h=S();k={};p=[];v=0<u&&ka(v,k,p);if(h.K){R=l&&h.N(l,
h.da);for(var E of h.ca)E in k||(P(h.K[E],a),delete h.K[E]);h.da=l;h.ca=p}else h.K={},h.W=v?M(k[p[0]]):G,h.ca=p,h.N=(h.da=l)&&M(l);for(E=c.l=new ba(u);0<u;){const J=p[--u];let w=h.K[J];if(f=!w)h.K[J]=e=w={s:{H:q,o:K({I:k[J]},l)},N:G,J:c,v:m,P:u,u:[],l:G,i:G,j:G,B:I},e.u[0]={m:0,U:w},O(a,b),w.i&&a.insertBefore(w.j=w.i,b);else{const ia=la(w);ia&&ia.nextSibling!==b&&ma(w,a,b);if(R||v&&h.W(k[J],w.s.o.I))(e=w).s.o=K({I:k[J]},l),O(a,b)}(E[w.P=u]=w).j&&(b=w.j)}c.j=b!==d?b:G}}},P=(a,b)=>{b&&a.i&&(a.i.remove(),
b=G);if(a.l)for(const c of a.l)c&&P(c,b);T(a.u);if(a.B){let c,d;(!(d=y[c=a.v])||0>(c=d.indexOf(a)))&&(!(d=z[c])||0>(c=d.indexOf(a)))||d.splice(c,1)}},T=a=>{let b,c=a.length;for(;1<c;)switch((b=a[--c]).m){case 1:b.O&&b.O(...b.h);break;case 2:b.h=F;break;case 3:na(b);break;case 4:T(b.u)}},ka=(a,b,c)=>{const d="object"===typeof a[0];for(const m of a)a=d?m.id:m,b[a]=m,c.push(a);return d},la=a=>{if(a.i)return a.i;let b;a=(b=a.l)?b.length:0;let c,d;for(;0<a;)if((d=b[--a])&&(c=la(d)))return c;return G},
ma=(a,b,c)=>{if(a.i)return b.insertBefore(a.i,c);if(a.j){let d=a.l.length;do a.l[--d]&&(c=ma(a.l[d],b,c));while(0<d)}return c},oa=a=>{for(;0!==a[0].m;){if(!a[0].V.G)return G;a[0].V.G=I;a=a[0].ba}return a[0].U},V=a=>{var b;if(b=a=oa(a))b=!a.B&&(a.B=H,y[a.v]?y[a.v].push(a):y[a.v]=[a],x||U());return b},pa=()=>{const a=oa(g);a&&(a.B=H,z[a.v]?z[a.v].push(a):z[a.v]=[a])},qa=(a,b)=>{if(n>=g.length)g[n]={m:1,A:N(b),h:b=b||F,O:a(...b)||G};else if(b){const c=g[n];c.A(c.h,b)&&(c.O&&c.O(...c.h),c.O=a(...(c.h=
b))||G)}++n},ra=a=>{if(n<g.length)return g[n++].g;const b=g,c=[a,d=>{c[0]!==d&&(c[0]=d,V(b))},()=>c[0]];g[n++]={m:0,g:c};return c},S=a=>(n<g.length?g[n++]:g[n++]={m:0,g:void 0===a?{}:a}).g,sa=(a,b)=>n>=g.length?(g[n++]={m:0,A:N(b),h:b=b||F,g:a(...b)}).g:b&&g[n].A(g[n].h,b)?g[n].g=a(...(g[n++].h=b)):g[n++].g,Q=(a,b)=>(n<g.length?(b=g[n].g,g[n++].g=a):g[n++]={m:0,g:a},b),ta=(a,b)=>(a=setTimeout(()=>b(H),a),()=>clearTimeout(a)),na=a=>{for(const b of a.Y)T(a.L[b])},ua=(a,b,c)=>({$:c.aa,fa:a,Z:r,ea:f?
r:r+b}),W=a=>{const b=Q(a,G);return b?ja(b,a):L(a)},X=a=>{const b=e.i;if(a){for(const c of W(a)){switch(c.charCodeAt(0)){case 70:b.className=L(a.F).filter(d=>a.F[d]).join(" ");continue;case 82:a.R(b);case 67:case 68:case 83:continue}b[c]=a[c]}if(a.D)for(const c of W(a.D))b.dataset[c]=a.D[c];if(a.S)for(const c of W(a.S))b.style[c]=a.S[c]}return b},Y=(a,b,c)=>({H:a,o:b?c?(b.C=c,b):b:c?{C:c}:G}),U=()=>{f=0>=r;r=fa.now();t&&cancelAnimationFrame(t);x=H;t=0;for(var a;(a=y).length;){y=[];for(const b of a)if(b)for(e of b)if(e.B){if(e.i)O(G,
G);else{let c=G,d=e.j,m=e,k=e;for(;!(a=(m=m.J).i););do{let p=k.P;const {l:q}=k=k.J,h=q.length;for(;++p<h&&q[p]&&!(c=q[p].j););}while(!c&&k!==m);k=e;O(a,c);if(k.j!==d)for(;!(k=k.J).i;){d=G;for(const p of k.l)if(p&&(d=p.j))break;if(d===k.j)break;k.j=d}}f=I}}x=I;z.length&&(y=z,z=a,va())},va=()=>t||(t=requestAnimationFrame(U)),Z=a=>{let b=A[a];if(!b){const c=a.indexOf("[");A[a]=b=da.createElement(0>c?a:a.substr(0,c));if(0<c)for(const d of a.substring(c+1,a.length-1).split("]["))a=d.indexOf("="),0<a?b[d.substr(0,
a)]=d.substr(a+1):b[d]=H}return b},wa=a=>{let b=B[a];if(!b){const c=Z(a);B[a]=b=d=>(f&&(e.i=c.cloneNode(H)),X(d),d&&d.C||G)}return b};ea.lui={defer:()=>(x=H,va()),defer_end:U,dom_define:(a,b,c)=>{b=Z(b);c&&(b=b.cloneNode(H),c.D&&(K(b.dataset,c.D),delete c.D),c.S&&(K(b.style,c.S),delete c.S),K(b,c));A["#"+a]=b},hook_assert:a=>{if(!a)throw A;},hook_async:(a,b,c)=>{let d;if((n<g.length?(d=g[n++],I):d=g[n++]={m:2,A:N(b),h:b||F,g:G})||b&&d.A(d.h,b)&&(d.h=b)){void 0!==c&&(d.g=c);const m=g;a(...d.h).then(k=>d.g!==k&&d.h===b&&(d.g=k,V(m)))}return d.g},hook_callback:(a,b)=>{const c=S();c.h=b;return c.ga||(c.ga=(...d)=>a(...c.h,...d))},hook_delay:a=>
{const [b,c]=ra(I);qa(ta,[a,c]);return b},hook_dom:(a,b)=>(f&&(e.i=Z(a).cloneNode(H)),X(b||G)),hook_effect:qa,hook_map:(a,b,c)=>{let d=G,m=H;if(n<g.length)if((d=g[n]).T!==a)na(d),d=G;else if(!d.G||c&&d.A(d.h,c))d.h=c||F,d.G=H;else{if(b===d.M)return++n,d.g;m=I}const k=f,p=g,q=++n,h={},u=[],l=0<b.length&&ka(b,h,u);if(d){if(d.g=[],d.M!==b){d.M=b;for(const v of d.Y)v in h||(T(d.L[v]),delete d.L[v])}}else g[q-1]=d={m:3,A:N(c),h:c||F,g:[],G:H,T:a,W:l?M(b[0]):G,Y:[],L:{},M:b};for(const v of u){b=d.L[v];
if(f=!b)d.L[v]=b=[{m:1,ba:p,V:d,X:G,g:G}];if(m||f||(l?d.W(h[v],b[0].X):h[v]!==b[0].X)){g=b;n=1;try{b[0].g=a(b[0].X=h[v],...d.h)}catch(E){}}d.g.push(b[0].g)}f=k;g=p;n=q;d.Y=u;return d.g},hook_memo:sa,hook_model:a=>{if(n<g.length)return g[n++].g;const b=g,c=[(0,a.init)(G),{}];for(const d of L(a))c[1][d]=(...m)=>{m=(0,a[d])(c[0],...m);c[0]!==m&&(c[0]=m,V(b))};g[n++]={m:0,g:c};return c},hook_object_changes:W,hook_prev:Q,hook_rerender:pa,hook_state:ra,hook_static:S,hook_sub:(a,b)=>{let c=G;if(n<g.length)if((c=
g[n]).T!==a)T(c.u),c=G;else if(!c.G||b&&c.A(c.h,b))b&&(c.h=b),c.G=H;else return++n,c.g;const d=f,m=g,k=n;if(f=!c)(g[n]=c={m:4,A:N(b),h:b||F,g:G,T:a,G:H,u:[]}).u[0]={m:2,ba:g,V:c};g=c.u;n=1;try{c.g=a(...c.h)}catch(p){}f=d;g=m;n=k+1;return c.g},hook_transition:(a,b)=>{const c=S({aa:a});a=sa(ua,[a,b,c]);return c.aa=a.ea<=r?a.fa:(pa(),a.Z===r?a.$:a.$+(a.fa-a.$)*(r-a.Z)/(a.ea-a.Z))},init:(a,b=da.body)=>{let c;b.innerHTML="";y[0].push(b={s:{H:()=>(X((c=a())[0]),c[1]),o:G},N:G,J:G,v:0,P:0,u:[],l:G,i:b,j:b,
B:H});b.u[0]={m:0,U:b};U()},node:Y,node_dom:(a,b,c)=>Y(wa(a),b,c),node_map:(a,b,c)=>Y(M,{H:a,M:b,o:c||G}),now:()=>r}}