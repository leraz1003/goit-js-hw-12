import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import Notiflix from 'notiflix';


import  createImageGallery  from './js/render-function.js';
import { fetchRequest } from './js/pixabay-api.js';

const form = document.querySelector('.form');
const gallery = document.querySelector(".gallery");
const loadBtn = document.querySelector(".loadMoreBtn");

const loader = document.querySelector('.loader');

let queryValue = '';


class ButtonService {
  constructor(buttonEL, hiddenClass) {
    this.buttonEL = buttonEL;
    this.hiddenClass = hiddenClass;
  }

  hide() {
    this.buttonEL.classList.add(this.hiddenClass);
  }

  show() {
    this.buttonEL.classList.remove(this.hiddenClass);
  }

  disable() {
    this.buttonEL.disabled = true;
  }

  enable() {
    this.buttonEL.disabled = false;
  }
}

const loadMoreBtn = new ButtonService(loadBtn, "is-hidden");

loadMoreBtn.hide();

const params = {
  page: 1,
  per_page: 15,
  maxPage: 0
}


form.addEventListener('submit', async (event)=>{
  event.preventDefault();

  gallery.innerHTML = '';
  queryValue = event.currentTarget.elements.search_query.value.trim().toLowerCase();
  params.page = 1;

  try {
      const { hits, totalHits } = await fetchRequest(queryValue, params.page, params.per_page);

    console.log("totalHits", totalHits);
    console.log("hits", hits);


    if (!hits || hits.length === 0) {
        iziToast.show({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          backgroundColor: "#ef4040",
          position: "topRight",
          messageSize: 16,
          messageColor: '#fff',
          messageLineHeight: "150%",

          image: './img/error.svg',
          imageWidth: 24,
          timeout: 4000
        });

      loadMoreBtn.hide();

      } else {
        createImageGallery(hits);
        initLightbox();
        loadMoreBtn.show();
        loadMoreBtn.enable();
    }


    params.maxPage = Math.ceil(totalHits / params.per_page);

    console.log("maxPage", params.maxPage);

    if (params.maxPage > 1) {
      loadMoreBtn.enable();
      loadBtn.addEventListener("click", handleLoadMore);
    } else {
      loadMoreBtn.hide();
    }
  }
  catch (error) {
    console.log(error);
  }
  finally {
    loader.classList.add('hidden');
  }
  form.reset();
});

async function handleLoadMore() {
  loader.classList.remove('hidden');
  loadMoreBtn.disable();

  params.page += 1;

  try {
    const { hits } = await fetchRequest(params);
    createImageGallery(hits);
  } catch (error) {
    console.log(error);
  } finally {
    if (params.page === params.maxPage) {
      loadMoreBtn.hide();
      loadBtn.removeEventListener("click", handleLoadMore);
    } else {
      loadMoreBtn.enable();
    }
  }
}



export function initLightbox() {
    const lightbox = new SimpleLightbox('.gallery a', {
        captions: true,
        captionSelector: 'img',
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250
    });
    lightbox.refresh();
}