import{a as p,i as S,S as v}from"./assets/vendor-09bbf0e3.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(e){if(e.ep)return;e.ep=!0;const a=r(e);fetch(e.href,a)}})();const P=document.querySelector(".gallery");function g(s){const t=s.map(({webformatURL:r,largeImageURL:n,tags:e,likes:a,views:l,comments:b,downloads:L})=>`<li class="gallery-item">
          <a class="gallery-link" href="${n}">
            <img
              class="gallery-image"
              src="${r}"
              alt="${e}"
            />
          </a>
          <div class="gallery-info">
            <p class="info-item">
              <b>Likes</b> <span>${a}</span>
            </p>
            <p class="info-item">
              <b>Views</b> <span>${l}</span>
            </p>
            <p class="info-item">
              <b>Comments</b> <span>${b}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b> <span>${L}</span>
            </p>
          </div>

        </li>`).join("");P.insertAdjacentHTML("beforeend",t)}const w="https://pixabay.com/api/";p.defaults.baseURL=w;const d=document.querySelector(".loader");async function f(s,t=1,r=15){if(!s)return[];d.classList.remove("hidden");const n=new URLSearchParams({key:"45116727-e543bef81ffe857c5144581e6",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:r});try{return(await p.get(`?${n}`)).data}catch(e){console.log(e)}finally{d.classList.add("hidden")}}const u=document.querySelector(".form"),x=document.querySelector(".gallery"),c=document.querySelector(".loadMoreBtn"),h=document.querySelector(".loader");let m="";class q{constructor(t,r){this.buttonEL=t,this.hiddenClass=r}hide(){this.buttonEL.classList.add(this.hiddenClass)}show(){this.buttonEL.classList.remove(this.hiddenClass)}disable(){this.buttonEL.disabled=!0}enable(){this.buttonEL.disabled=!1}}const i=new q(c,"is-hidden");i.hide();const o={page:1,per_page:15,maxPage:0};u.addEventListener("submit",async s=>{s.preventDefault(),x.innerHTML="",m=s.currentTarget.elements.search_query.value.trim().toLowerCase(),o.page=1;try{const{hits:t,totalHits:r}=await f(m,o.page,o.per_page);!t||t.length===0?(S.show({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#ef4040",position:"topRight",messageSize:16,messageColor:"#fff",messageLineHeight:"150%",image:"./img/error.svg",imageWidth:24,timeout:4e3}),i.hide()):(g(t),E(),i.show(),i.enable()),o.maxPage=Math.ceil(r/o.per_page),console.log("maxPage",o.maxPage),o.maxPage>1?(i.enable(),c.addEventListener("click",y)):i.hide()}catch(t){console.log(t)}finally{h.classList.add("hidden")}u.reset()});async function y(){h.classList.remove("hidden"),i.disable(),o.page+=1;try{const{hits:s}=await f(o);g(s)}catch(s){console.log(s)}finally{o.page===o.maxPage?(i.hide(),c.removeEventListener("click",y)):i.enable()}}function E(){new v(".gallery a",{captions:!0,captionSelector:"img",captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh()}
//# sourceMappingURL=commonHelpers.js.map
