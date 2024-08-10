import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



import  createImageGallery  from './js/render-function.js';
import { fetchRequest } from './js/pixabay-api.js';

const form = document.querySelector('.form');
const gallery = document.querySelector(".gallery");
const loadBtn = document.querySelector(".loadMoreBtn");
const loader = document.querySelector('.loader');

let queryValue = '';

export function showError(errorMessage) {
  iziToast.show({
          message: errorMessage,
          backgroundColor: "#ef4040",
          position: "topRight",
          messageSize: 16,
          messageColor: '#fff',
          messageLineHeight: "150%",

          image: './img/error.svg',
          imageWidth: 24,
          timeout: 4000
        });
}

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


  loader.classList.remove('hidden');


  try {
    const { hits, totalHits } = await fetchRequest(queryValue, params.page, params.per_page);

    if (!hits || hits.length === 0) {
      showError('Sorry, there are no images matching your search query. Please try again!');

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
    showError(error);
  }
  finally {
    loader.classList.add('hidden');
  }
  form.reset();
});

async function handleLoadMore() {
  loader.classList.remove('hidden');
  loadMoreBtn.hide();
  // loadMoreBtn.disable();

  params.page += 1;

  try {
    const { hits } = await fetchRequest(queryValue, params.page, params.per_page);
    createImageGallery(hits);
    loadMoreBtn.show();

  } catch (error) {
     showError(error);
  } finally {
    if (params.page === params.maxPage) {
      loadMoreBtn.hide();
      showError("We're sorry, but you've reached the end of search results.");
      loadBtn.removeEventListener("click", handleLoadMore);
    } else {
      loadMoreBtn.enable();
    }
    loader.classList.add('hidden');
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