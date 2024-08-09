//  функції для відображення елементів інтерфейсу.
const gallery = document.querySelector(".gallery");

export default function createImageGallery(images) {
  const markup = images.map(({ webformatURL, largeImageURL, tags,likes,views,comments,downloads }) =>
        `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img
              class="gallery-image"
              src="${webformatURL}"
              alt="${tags}"
            />
          </a>
          <div class="gallery-info">
            <p class="info-item">
              <b>Likes</b> <span>${likes}</span>
            </p>
            <p class="info-item">
              <b>Views</b> <span>${views}</span>
            </p>
            <p class="info-item">
              <b>Comments</b> <span>${comments}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b> <span>${downloads}</span>
            </p>
          </div>

        </li>`)
    .join("");

  gallery.insertAdjacentHTML('beforeend', markup);
}