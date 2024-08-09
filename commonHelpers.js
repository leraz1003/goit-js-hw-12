import{a as h,i as v,S as P}from"./assets/vendor-09bbf0e3.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const d=document.querySelector(".gallery");function p(s){const t=s.map(({webformatURL:n,largeImageURL:e,tags:o,likes:l,views:L,comments:w,downloads:S})=>`<li class="gallery-item">
          <a class="gallery-link" href="${e}">
            <img
              class="gallery-image"
              src="${n}"
              alt="${o}"
            />
          </a>
          <div class="gallery-info">
            <p class="info-item">
              <b>Likes</b> <span>${l}</span>
            </p>
            <p class="info-item">
              <b>Views</b> <span>${L}</span>
            </p>
            <p class="info-item">
              <b>Comments</b> <span>${w}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b> <span>${S}</span>
            </p>
          </div>

        </li>`).join("");d.insertAdjacentHTML("beforeend",t);const r=d.querySelector(".gallery-item");if(r){const n=r.getBoundingClientRect().height;window.scrollBy({top:n*2,left:0,behavior:"smooth"})}}const q="https://pixabay.com/api/";h.defaults.baseURL=q;const m=document.querySelector(".loader");async function f(s,t=1,r=15){if(!s)return[];m.classList.remove("hidden");const n=new URLSearchParams({key:"45116727-e543bef81ffe857c5144581e6",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:r});try{return(await h.get(`?${n}`)).data}catch(e){console.log(e)}finally{m.classList.add("hidden")}}const u=document.querySelector(".form"),x=document.querySelector(".gallery"),c=document.querySelector(".loadMoreBtn"),y=document.querySelector(".loader");let g="";class E{constructor(t,r){this.buttonEL=t,this.hiddenClass=r}hide(){this.buttonEL.classList.add(this.hiddenClass)}show(){this.buttonEL.classList.remove(this.hiddenClass)}disable(){this.buttonEL.disabled=!0}enable(){this.buttonEL.disabled=!1}}const i=new E(c,"is-hidden");i.hide();const a={page:1,per_page:15,maxPage:0};u.addEventListener("submit",async s=>{s.preventDefault(),x.innerHTML="",g=s.currentTarget.elements.search_query.value.trim().toLowerCase(),a.page=1;try{const{hits:t,totalHits:r}=await f(g,a.page,a.per_page);!t||t.length===0?(v.show({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#ef4040",position:"topRight",messageSize:16,messageColor:"#fff",messageLineHeight:"150%",image:"./img/error.svg",imageWidth:24,timeout:4e3}),i.hide()):(p(t),$(),i.show(),i.enable()),a.maxPage=Math.ceil(r/a.per_page),console.log("maxPage",a.maxPage),a.maxPage>1?(i.enable(),c.addEventListener("click",b)):i.hide()}catch(t){console.log(t)}finally{y.classList.add("hidden")}u.reset()});async function b(){y.classList.remove("hidden"),i.disable(),a.page+=1;try{const{hits:s}=await f(a);p(s)}catch(s){console.log(s)}finally{a.page===a.maxPage?(i.hide(),c.removeEventListener("click",b)):i.enable()}}function $(){new P(".gallery a",{captions:!0,captionSelector:"img",captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh()}
//# sourceMappingURL=commonHelpers.js.map
