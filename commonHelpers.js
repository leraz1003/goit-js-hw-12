import{a as f,S as P,i as q}from"./assets/vendor-dab02853.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(e){if(e.ep)return;e.ep=!0;const a=r(e);fetch(e.href,a)}})();const m=document.querySelector(".gallery");function y(t){const s=t.map(({webformatURL:n,largeImageURL:e,tags:a,likes:l,views:w,comments:v,downloads:S})=>`<li class="gallery-item">
          <a class="gallery-link" href="${e}">
            <img
              class="gallery-image"
              src="${n}"
              alt="${a}"
            />
          </a>
          <div class="gallery-info">
            <p class="info-item">
              <b>Likes</b> <span>${l}</span>
            </p>
            <p class="info-item">
              <b>Views</b> <span>${w}</span>
            </p>
            <p class="info-item">
              <b>Comments</b> <span>${v}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b> <span>${S}</span>
            </p>
          </div>

        </li>`).join("");m.insertAdjacentHTML("beforeend",s);const r=m.querySelector(".gallery-item");if(r){const n=r.getBoundingClientRect().height;window.scrollBy({top:n*2,left:0,behavior:"smooth"})}}const x="https://pixabay.com/api/";f.defaults.baseURL=x;const p=document.querySelector(".loader");async function b(t,s=1,r=15){if(!t)return[];p.classList.remove("hidden");const n=new URLSearchParams({key:"45116727-e543bef81ffe857c5144581e6",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:r});try{return(await f.get(`?${n}`)).data}catch(e){c(e)}finally{p.classList.add("hidden")}}const g=document.querySelector(".form"),E=document.querySelector(".gallery"),h=document.querySelector(".loadMoreBtn"),d=document.querySelector(".loader");let u="";function c(t){q.show({message:t,backgroundColor:"#ef4040",position:"topRight",messageSize:16,messageColor:"#fff",messageLineHeight:"150%",image:"./img/error.svg",imageWidth:24,timeout:4e3})}class ${constructor(s,r){this.buttonEL=s,this.hiddenClass=r}hide(){this.buttonEL.classList.add(this.hiddenClass)}show(){this.buttonEL.classList.remove(this.hiddenClass)}disable(){this.buttonEL.disabled=!0}enable(){this.buttonEL.disabled=!1}}const i=new $(h,"is-hidden");i.hide();const o={page:1,per_page:15,maxPage:0};g.addEventListener("submit",async t=>{t.preventDefault(),E.innerHTML="",u=t.currentTarget.elements.search_query.value.trim().toLowerCase(),o.page=1,d.classList.remove("hidden");try{const{hits:s,totalHits:r}=await b(u,o.page,o.per_page);!s||s.length===0?(c("Sorry, there are no images matching your search query. Please try again!"),i.hide()):(y(s),C(),i.show(),i.enable()),o.maxPage=Math.ceil(r/o.per_page),console.log("maxPage",o.maxPage),o.maxPage>1?(i.enable(),h.addEventListener("click",L)):i.hide()}catch(s){c(s)}finally{d.classList.add("hidden")}g.reset()});async function L(){d.classList.remove("hidden"),i.hide(),o.page+=1;try{const{hits:t}=await b(u,o.page,o.per_page);y(t),i.show()}catch(t){c(t)}finally{o.page===o.maxPage?(i.hide(),c("We're sorry, but you've reached the end of search results."),h.removeEventListener("click",L)):i.enable(),d.classList.add("hidden")}}function C(){new P(".gallery a",{captions:!0,captionSelector:"img",captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh()}
//# sourceMappingURL=commonHelpers.js.map
