'use strict';/*
 lui.js web frame work 2.2.0
 inspired by react and mithril
 L3P3.de 2024
*/
{let e=null,f=!e,g=e,m=0,t=0,u=0,x=!f,y=[],z=[];
const A={},B={},C={},aa=[e,(a,b)=>a!==b&&a[0]!==b[0],(a,b)=>a!==b&&(a[0]!==b[0]||a[1]!==b[1]),(a,b)=>a!==b&&(a[0]!==b[0]||a[1]!==b[1]||a[2]!==b[2])],E=[],ba={},F=e,G=f,H=x,I=Array,ca=Object,K=ca.assign,L=ca.keys,da=document,ea=window,ha=ea.performance||Date,M=a=>{const b=(a=L(a)).join(",");return C[b]||(C[b]=a)},N=(a,b,c)=>{if(a===b)return!1;for(const d of c)if(a[d]!==b[d])return!0;return!1},ia=(a,b)=>a===b?E:L(a).filter(c=>a[c]!==b[c]),O=a=>a?5>a.length?aa[a.length]:ja:F,ja=(a,b)=>{if(a===b)return!1;
for(let c=0,d=a.length;c<d;++c)if(a[c]!==b[c])return!0;return!1},P=(a,b)=>{const c=e,d=b,n=c.v+1;g=c.u;m=1;c.B=H;if(c.s.H!==P){var k=F;try{k=(0,c.s.H)(c.s.o||ba)}catch(R){}var p=c.i;if(k){p&&(a=p,b=F);var q=k.length,h,r=c.l||(c.l=(new I(q)).fill(F));do{var l=r[--q];(h=k[q])&&h!==G?((f=!l)?(r[q]=e=l={s:h,N:h.o&&M(h.o),J:c,v:n,P:q,u:[],l:F,i:F,j:F,B:H},e.u[0]={m:0,U:l},P(a,b),l.i&&a.insertBefore(l.j=l.i,b)):h.o&&N(l.s.o,h.o,l.N)&&((e=l).s=h,P(a,b)),l.j&&(b=l.j)):l&&(Q(l,a),r[q]=F)}while(0<q)}else if(c.l){for(q of c.l)q&&
Q(q,a);c.l=F}p||(c.j=b!==d?b:F)}else{q=c.s.o.H;var v=c.s.o.M;l=c.s.o.o;r=v.length;let R=G;if(!(0>=S(r,r)+r)){h=T();k={};p=[];v=0<r&&ka(v,k,p);if(h.K){R=l&&N(l,h.da,h.N);for(var D of h.ca)D in k||(Q(h.K[D],a),delete h.K[D]);h.da=l;h.ca=p}else h.K={},h.W=v?M(k[p[0]]):F,h.ca=p,h.N=(h.da=l)&&M(l);for(D=c.l=new I(r);0<r;){const J=p[--r];let w=h.K[J];if(f=!w)h.K[J]=e=w={s:{H:q,o:K({I:k[J]},l)},N:F,J:c,v:n,P:r,u:[],l:F,i:F,j:F,B:H},e.u[0]={m:0,U:w},P(a,b),w.i&&a.insertBefore(w.j=w.i,b);else{const fa=la(w);
fa&&fa.nextSibling!==b&&ma(w,a,b);if(R||v&&N(k[J],w.s.o.I,h.W))(e=w).s.o=K({I:k[J]},l),P(a,b)}(D[w.P=r]=w).j&&(b=w.j)}c.j=b!==d?b:F}}},Q=(a,b)=>{b&&a.i&&(a.i.remove(),b=F);if(a.l)for(const c of a.l)c&&Q(c,b);U(a.u);if(a.B){let c,d;(!(d=y[c=a.v])||0>(c=d.indexOf(a)))&&(!(d=z[c])||0>(c=d.indexOf(a)))||d.splice(c,1)}},U=a=>{let b,c=a.length;for(;1<c;)switch((b=a[--c]).m){case 1:b.O&&b.O(...b.h);break;case 2:b.h=E;break;case 3:na(b);break;case 4:U(b.u)}},ka=(a,b,c)=>{const d="object"===typeof a[0];for(const n of a)a=
d?n.id:n,b[a]=n,c.push(a);return d},la=a=>{if(a.i)return a.i;let b;a=(b=a.l)?b.length:0;let c,d;for(;0<a;)if((d=b[--a])&&(c=la(d)))return c;return F},ma=(a,b,c)=>{if(a.i)return b.insertBefore(a.i,c);if(a.j){let d=a.l.length;do a.l[--d]&&(c=ma(a.l[d],b,c));while(0<d)}return c},oa=a=>{for(;0!==a[0].m;){if(!a[0].V.G)return F;a[0].V.G=H;a=a[0].ba}return a[0].U},V=a=>(a=oa(a))&&pa(a),pa=a=>!a.B&&(a.B=G,y[a.v]?y[a.v].push(a):y[a.v]=[a],x||W()),qa=()=>{const a=oa(g);a&&(a.B=G,z[a.v]?z[a.v].push(a):z[a.v]=
[a])},ra=(a,b)=>{if(m>=g.length)g[m]={m:1,A:O(b),h:b=b||E,O:a(...b)||F};else if(b){const c=g[m];c.A(c.h,b)&&(c.O&&c.O(...c.h),c.O=a(...(c.h=b))||F)}++m},sa=a=>{if(m<g.length)return g[m++].g;const b=g,c=[a,d=>{c[0]!==d&&(c[0]=d,V(b))},()=>c[0]];g[m++]={m:0,g:c};return c},T=a=>(m<g.length?g[m++]:g[m++]={m:0,g:void 0===a?{}:a}).g,ta=(a,b)=>m>=g.length?(g[m++]={m:0,A:O(b),h:b=b||E,g:a(...b)}).g:b&&g[m].A(g[m].h,b)?g[m].g=a(...(g[m++].h=b)):g[m++].g,S=(a,b)=>(m<g.length?(b=g[m].g,g[m++].g=a):g[m++]={m:0,
g:a},b),ua=(a,b)=>(a=setTimeout(()=>b(G),a),()=>clearTimeout(a)),na=a=>{for(const b of a.Y)U(a.L[b])},va=(a,b,c)=>({$:c.aa,fa:a,Z:t,ea:f?t:t+b}),X=a=>{const b=S(a,F);return b?ia(b,a):L(a)},wa=a=>{const b=e.i;if(a){for(const c of X(a)){switch(c.charCodeAt(0)){case 70:b.className=L(a.F).filter(d=>a.F[d]).join(" ");continue;case 82:a.R(b);case 67:case 68:case 83:continue}b[c]=a[c]}if(a.D)for(const c of X(a.D))b.dataset[c]=a.D[c];if(a.S)for(const c of X(a.S))b.style[c]=a.S[c]}return b},Y=(a,b,c)=>({H:a,
o:b?c?(b.C=c,b):b:c?{C:c}:F}),W=()=>{f=0>=t;t=ha.now();u&&cancelAnimationFrame(u);x=G;u=0;for(var a;(a=y).length;){y=[];for(const b of a)if(b)for(e of b)if(e.B){if(e.i)P(F,F);else{let c=F,d=e.j,n=e,k=e;for(;!(a=(n=n.J).i););do{let p=k.P;const {l:q}=k=k.J,h=q.length;for(;++p<h&&q[p]&&!(c=q[p].j););}while(!c&&k!==n);k=e;P(a,c);if(k.j!==d)for(;!(k=k.J).i;){d=F;for(const p of k.l)if(p&&(d=p.j))break;if(d===k.j)break;k.j=d}}f=H}}x=H;z.length&&(y=z,z=a,xa())},xa=()=>u||(u=requestAnimationFrame(W)),Z=a=>
{let b=A[a];if(!b){const c=a.indexOf("[");A[a]=b=da.createElement(0>c?a:a.substr(0,c));if(0<c)for(const d of a.substring(c+1,a.length-1).split("]["))a=d.indexOf("="),0<a?b[d.substr(0,a)]=d.substr(a+1):b[d]=G}return b},ya=a=>{let b=B[a];if(!b){const c=Z(a);B[a]=b=d=>(f&&(e.i=c.cloneNode(G)),wa(d),d&&d.C||F)}return b};ea.lui={defer:()=>(x=G,xa()),defer_end:W,dom_define:(a,b,c)=>{b=Z(b);c&&(b=b.cloneNode(G),c.D&&(K(b.dataset,c.D),delete c.D),c.S&&(K(b.style,c.S),delete c.S),K(b,c));A["#"+a]=b},hook_assert:a=>{if(!a)throw A;},hook_async:(a,b,c)=>{let d;if((m<g.length?(d=g[m++],H):d=g[m++]={m:2,A:O(b),h:b||E,g:F})||b&&d.A(d.h,b)&&(d.h=b)){void 0!==c&&(d.g=c);const n=g;a(...d.h).then(k=>d.g!==k&&d.h===b&&(d.g=k,V(n)))}return d.g},hook_callback:(a,b)=>{const c=T();c.h=b;return c.ga||(c.ga=(...d)=>a(...c.h,...d))},hook_delay:a=>
{const [b,c]=sa(H);ra(ua,[a,c]);return b},hook_dom:(a,b)=>(e.i===F&&(e.i=Z(a).cloneNode(G)),wa(b||F)),hook_effect:ra,hook_map:(a,b,c)=>{let d=F,n=G;if(m<g.length)if((d=g[m]).T!==a)na(d),d=F;else if(!d.G||c&&d.A(d.h,c))d.h=c||E,d.G=G;else{if(b===d.M)return++m,d.g;n=H}const k=f,p=g,q=++m,h={},r=[],l=0<b.length&&ka(b,h,r);if(d){if(d.g=[],d.M!==b){d.M=b;for(const v of d.Y)v in h||(U(d.L[v]),delete d.L[v])}}else g[q-1]=d={m:3,A:O(c),h:c||E,g:[],G,T:a,W:l?M(b[0]):F,Y:[],L:{},M:b};for(const v of r){b=d.L[v];
if(f=!b)d.L[v]=b=[{m:1,ba:p,V:d,X:F,g:F}];if(n||f||(l?N(h[v],b[0].X,d.W):h[v]!==b[0].X)){g=b;m=1;try{b[0].g=a(b[0].X=h[v],...d.h)}catch(D){}}d.g.push(b[0].g)}f=k;g=p;m=q;d.Y=r;return d.g},hook_memo:ta,hook_model:a=>{if(m<g.length)return g[m++].g;const b=g,c=[(0,a.init)(F),{}];for(const d of L(a))c[1][d]=(...n)=>{n=(0,a[d])(c[0],...n);c[0]!==n&&(c[0]=n,V(b))};g[m++]={m:0,g:c};return c},hook_object_changes:X,hook_prev:S,hook_rerender:qa,hook_state:sa,hook_static:T,hook_sub:(a,b)=>{let c=F;if(m<g.length)if((c=
g[m]).T!==a)U(c.u),c=F;else if(!c.G||b&&c.A(c.h,b))b&&(c.h=b),c.G=G;else return++m,c.g;const d=f,n=g,k=m;if(f=!c)(g[m]=c={m:4,A:O(b),h:b||E,g:F,T:a,G,u:[]}).u[0]={m:2,ba:g,V:c};g=c.u;m=1;try{c.g=a(...c.h)}catch(p){}f=d;g=n;m=k+1;return c.g},hook_transition:(a,b)=>{const c=T({aa:a});a=ta(va,[a,b,c]);return c.aa=a.ea<=t?a.fa:(qa(),a.Z===t?a.$:a.$+(a.fa-a.$)*(t-a.Z)/(a.ea-a.Z))},init:(a,b=da.body,c=F)=>{b.innerHTML="";a={s:{H:a,o:c},N:F,J:F,v:0,P:0,u:[],l:F,i:b,j:b,B:H};a.u[0]={m:0,U:a};pa(a)},node:Y,
node_dom:(a,b,c)=>Y(ya(a),b,c),node_map:(a,b,c)=>Y(P,{H:a,M:b,o:c||F}),now:()=>t}}