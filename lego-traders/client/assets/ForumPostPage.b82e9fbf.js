import{_ as v,y,z as f,i as P,j as d,B as C,C as F,a as n,b as t,t as _,D as b,F as w,r as B,d as k,x,P as l,E as I,e as p,o as r,f as S,g as u}from"./index.342622b1.js";const N={watch:{$route(s,e){s!=e&&(this.getPostComments(),this.getPostById())}},setup(){const s=y(),e=f();async function a(){try{await x.getPostById(s.params.postId)}catch(c){e.push({name:"Forum"}),l.error("This post doesn't exist.",c)}}async function o(){try{await I.getPostComments(s.params.postId)}catch(c){l.error(c)}}return P(()=>{o(),a()}),{comments:d(()=>p.comments),post:d(()=>p.activePost),getPostComments:o,getPostById:a}},components:{ForumComment:C,CommentForm:F}},U={class:"container-fluid post-detail-page bg-light"},V={class:"row"},j={class:"col-md-9 my-3"},D={class:"row"},E={class:"col-12"},R={class:"bg-primary w-100 p-3 border-card"},z={class:"mb-3"},A={key:0},L=["src"],M={class:"row justify-content-center"},T={class:"col-md-9 my-3"},q={class:"bg-primary w-100 p-3 border-card"},G={class:"bg-warning rounded p-3"},H={class:"col-md-3 my-3"},J={class:"bg-dark w-100 p-3 rounded"},K=["src"];function O(s,e,a,o,c,Q){var i;const h=u("ForumComment"),g=u("CommentForm");return r(),n("div",U,[t("div",V,[t("div",j,[t("div",D,[t("div",E,[t("div",R,[t("div",z,[t("h5",null,_(o.post.title),1),t("h3",null,_(o.post.body),1)]),o.post.imgUrl?(r(),n("div",A,[t("img",{src:o.post.imgUrl,alt:"this is the post image"},null,8,L)])):b("",!0)])])]),t("div",M,[t("div",T,[t("div",q,[(r(!0),n(w,null,B(o.comments,m=>(r(),S(h,{key:m.id,comment:m},null,8,["comment"]))),128)),t("div",G,[k(g)])])])])]),t("div",H,[t("div",J,[t("img",{src:o.post.imgUrl||((i=o.post.creator)==null?void 0:i.picture),alt:"",class:"img-fluid"},null,8,K)])])])])}const X=v(N,[["render",O],["__scopeId","data-v-ea57241a"]]);export{X as default};