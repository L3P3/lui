'use strict';/*
 lui.js web frame work 1.1.2
 inspired by react and mithril
 L3P3.de 2021
*/
{let e=null,f=!e,g=e,n=0,r=0,u=0,x=f,y=[],z=[];
const A={},B={},C={},D=[],F=[],H=e,I=f,J=!f,K=Array,L=Object,aa=L.assign,M=L.keys,ba=document,ca=window,da=ca.performance||Date,ea=a=>new Function("a","b",`return a!==b&&(${a.join("||")})`),N=a=>{const b=(a=M(a)).join(",");return C[b]||(C[b]=ea(a.map(c=>`a.${c}!==b.`+c)))},fa=(a,b)=>a===b?F:M(a).filter(c=>a[c]!==b[c]),O=a=>a?D[a.length]||(D[a.length]=ea(a.map((b,c)=>`a[${c}]!==b[${c}]`))):H,P=(a,b)=>{const c=e,d=b,l=c.v+1;g=c.u;n=1;c.B=J;if(c.s.G!==N){var k=H;try{k=c.s.G(c.s.o)}catch(Q){}var p=c.i;
if(k){p&&(a=p,b=H);var q=k.length,h,t=c.m||(c.m=(new K(q)).fill(H));do{var m=t[--q];(h=k[q])&&h!==I?((f=!m)?((t[q]=e=m={s:h,M:h.o&&N(h.o),H:c,v:l,O:q,u:[],m:H,i:H,j:H,B:J}).u[0]={l:0,T:m},P(a,b),m.i&&a.insertBefore(m.j=m.i,b)):h.o&&m.M(m.s.o,h.o)&&((e=m).s=h,P(a,b)),m.j&&(b=m.j)):m&&(R(m,a),t[q]=H)}while(0<q)}else if(c.m){for(q of c.m)q&&R(q,a);c.m=H}p||(c.j=b!==d?b:H)}else{q=c.s.o.G;var v=c.s.o.L;m=c.s.o.o;t=v.length;let Q=I;if(!(0>=S(t,t)+t)){h=T();k={};p=[];v=0<t&&ha(v,k,p);if(h.J){Q=m!==H&&h.M(m,
h.ca);for(var E of h.ba)E in k||(R(h.J[E],a),delete h.J[E]);h.ca=m;h.ba=p}else h.J={},h.V=v?N(k[p[0]]):H,h.ba=p,h.M=(h.ca=m)&&N(m);for(E=c.m=new K(t);0<t;){const G=p[--t];let w=h.J[G];if(f=!w)(h.J[G]=e=w={s:{G:q,o:aa({I:k[G]},m)},M:H,H:c,v:l,O:t,u:[],m:H,i:H,j:H,B:J}).u[0]={l:0,T:w},P(a,b),w.i&&a.insertBefore(w.j=w.i,b);else if(ia(w,a,b),Q||v&&h.V(k[G],w.s.o.I))(e=w).s.o=aa({I:k[G]},m),P(a,b);(E[w.O=t]=w).j&&(b=w.j)}c.j=b!==d?b:H}}},R=(a,b)=>{b&&a.i&&(b.removeChild(a.i),b=H);if(a.m)for(const c of a.m)c&&
R(c,b);U(a.u);if(a.B){let c,d;(!(d=y[c=a.v])||0>(c=d.indexOf(a)))&&(!(d=z[c])||0>(c=d.indexOf(a)))||d.splice(c,1)}},U=a=>{let b,c=a.length;for(;1<c;)switch((b=a[--c]).l){case 1:b.N&&b.N(...b.h);break;case 2:b.h=F;break;case 3:ja(b);break;case 4:U(b.u)}},ha=(a,b,c)=>{const d="object"===typeof a[0];for(const l of a)a=d?l.id:l,b[a]=l,c.push(a);return d},ia=(a,b,c)=>{if(a.i)return b.insertBefore(a.i,c),a.i;if(a.j){let d=a.m.length;do a.m[--d]&&(c=ia(a.m[d],b,c));while(0<d)}return c},ka=a=>{for(;0!==a[0].l;){if(!a[0].U.D)return H;
a[0].U.D=J;a=a[0].aa}return a[0].T},W=a=>(a=ka(a))&&!a.B&&(a.B=I,y[a.v]?y[a.v].push(a):y[a.v]=[a],x||V()),la=()=>{const a=ka(g);a&&(a.B=I,z[a.v]?z[a.v].push(a):z[a.v]=[a])},ma=(a,b)=>{if(n>=g.length)g[n]={l:1,A:O(b),h:b=b||F,N:a(...b)||H};else if(b){const c=g[n];c.A(c.h,b)&&(c.N&&c.N(...c.h),c.N=a(...(c.h=b))||H)}++n},na=a=>{if(n<g.length)return g[n++].g;const b=g,c=[a,d=>{c[0]!==d&&(c[0]=d,W(b))},()=>c[0]];g[n++]={l:0,g:c};return c},T=a=>(n<g.length?g[n++]:g[n++]={l:0,g:void 0===a?{}:a}).g,oa=(a,
b)=>n>=g.length?(g[n++]={l:0,A:O(b),h:b=b||F,g:a(...b)}).g:b&&g[n].A(g[n].h,b)?g[n].g=a(...(g[n++].h=b)):g[n++].g,S=(a,b)=>(n<g.length?(b=g[n].g,g[n++].g=a):g[n++]={l:0,g:a},b),pa=(a,b)=>(a=setTimeout(()=>b(I),a),()=>clearTimeout(a)),ja=a=>{for(const b of a.X)U(a.K[b])},qa=(a,b,c)=>({Z:c.$,ea:a,Y:r,da:f?r:r+b}),X=a=>{const b=S(a,H);return b?fa(b,a):M(a)},Y=a=>{const b=e.i;if(a){for(const c of X(a))switch(c.charCodeAt(0)){case 70:b.className=M(a.F).filter(d=>a.F[d]).join(" ");continue;case 82:a.R(b);
case 67:case 83:continue;default:b[c]=a[c]}if(a.S)for(const c of X(a.S))b.style[c]=a.S[c]}return b},Z=(a,b,c)=>({G:a,o:b?c?(b.C=c,b):b:c?{C:c}:H}),V=()=>{f=0>=r;r=da.now();x=I;u=0;for(var a;(a=y).length;){y=[];for(const b of a)if(b)for(e of b)if(e.B){if(e.i)P(H,H);else{let c=H,d=e.j,l=e,k=e;for(;!(a=(l=l.H).i););do{let p=k.O;const {m:q}=k=k.H,h=q.length;for(;++p<h&&q[p]&&!(c=q[p].j););}while(!c&&k!==l);k=e;P(a,c);if(k.j!==d)for(;!(k=k.H).i;){d=H;for(const p of k.m)if(p&&(d=p.j))break;if(d===k.j)break;
k.j=d}}f=J}}x=J;z.length&&(y=z,z=a,ra())},ra=()=>u||(u=requestAnimationFrame(V)),sa=a=>{let b=A[a];if(!b){const c=a.indexOf("[");A[a]=b=ba.createElement(0>c?a.substr(0):a.substr(0,c));if(0<c)for(const d of a.substring(c+1,a.length-1).split("]["))a=d.indexOf("="),0<a?b[d.substr(0,a)]=d.substr(a+1):b[d]=I}return b},ta=a=>{let b=B[a];if(!b){const c=sa(a);B[a]=b=d=>(f&&(e.i=c.cloneNode(I)),Y(d),d&&d.C||H)}return b};ca.lui={defer:()=>(x=I,ra()),defer_end:()=>(cancelAnimationFrame(u),V()),hook_assert:a=>{if(!a)throw A;},hook_async:(a,b,c)=>{let d;if((n<g.length?(d=g[n++],J):d=g[n++]={l:2,A:O(b),h:b||F,g:H})||b&&d.A(d.h,b)&&(d.h=b)){void 0!==c&&(d.g=c);const l=g;a(...d.h).then(k=>d.g!==k&&d.h===b&&(d.g=k,W(l)))}return d.g},hook_callback:(a,b)=>{const c=T();c.h=b;return c.fa||(c.fa=(...d)=>a(...c.h,...d))},hook_delay:a=>{const [b,c]=na(J);ma(pa,[a,c]);return b},hook_dom:(a,b)=>(f&&(e.i=sa(a).cloneNode(I)),Y(b||
H)),hook_effect:ma,hook_first:()=>f,hook_map:(a,b,c)=>{let d=H,l=I;if(n<g.length)if((d=g[n]).P!==a)ja(d),d=H;else if(!d.D||c&&d.A(d.h,c))d.h=c||F,d.D=I;else{if(b===d.L)return++n,d.g;l=J}const k=f,p=g,q=++n,h={},t=[],m=0<b.length&&ha(b,h,t);if(d){if(d.g=[],d.L!==b){d.L=b;for(const v of d.X)v in h||(U(d.K[v]),delete d.K[v])}}else g[q-1]=d={l:3,A:O(c),h:c||F,g:[],D:I,P:a,V:m?N(b[0]):H,X:[],K:{},L:b};for(const v of t){b=d.K[v];if(f=!b)d.K[v]=b=[{l:1,aa:p,U:d,W:H,g:H}];if(l||f||(m?d.V(h[v],b[0].W):h[v]!==
b[0].W)){g=b;n=1;try{b[0].g=a(b[0].W=h[v],...d.h)}catch(E){}}d.g.push(b[0].g)}f=k;g=p;n=q;d.X=t;return d.g},hook_memo:oa,hook_object_changes:X,hook_prev:S,hook_reducer:a=>{if(n<g.length)return g[n++].g;const b=g,c=[a[0](H),(d,l)=>{d=a[d](c[0],l);c[0]!==d&&(c[0]=d,W(b))}];g[n++]={l:0,g:c};return c},hook_reducer_f:(a,b)=>{if(n<g.length)return g[n++].g;const c=g,d=[b?b():H,l=>{l=a(d[0],l);d[0]!==l&&(d[0]=l,W(c))}];g[n++]={l:0,g:d};return d},hook_rerender:la,hook_state:na,hook_static:T,hook_sub:(a,b)=>
{let c=H;if(n<g.length)if((c=g[n]).P!==a)U(c.u),c=H;else if(!c.D||b&&c.A(c.h,b))b&&(c.h=b),c.D=I;else return++n,c.g;const d=f,l=g,k=n;if(f=!c)(g[n]=c={l:4,A:O(b),h:b||F,g:H,P:a,D:I,u:[]}).u[0]={l:2,aa:g,U:c};g=c.u;n=1;try{c.g=a(...c.h)}catch(p){}f=d;g=l;n=k+1;return c.g},hook_transition:(a,b)=>{const c=T({$:a});a=oa(qa,[a,b,c]);return c.$=a.da<=r?a.ea:(la(),a.Y===r?a.Z:a.Z+(a.ea-a.Z)*(r-a.Y)/(a.da-a.Y))},init:a=>{let b;const c=ba.body;c.innerHTML="";(e={s:{G:()=>(Y((b=a())[0]),b[1]),o:H},M:H,H,v:0,
O:0,u:[],m:H,i:c,j:c,B:I}).u[0]={l:0,T:e};y[0]=[e];V()},node:Z,node_dom:(a,b,c)=>Z(ta(a),b,c),node_map:(a,b,c)=>Z(N,{G:a,L:b,o:c||H}),now:()=>r}}