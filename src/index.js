import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { getImages } from './services';

const form = document.querySelector('form#search-form');
const gallery = document.querySelector('div.gallery');

form.addEventListener('submit', ev => {
  ev.preventDefault();
  let query = ev.target.elements.searchQuery.value;
  console.log(query);
  const searchParams = new URLSearchParams({
    q: `${query}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });
  getImages(searchParams)
    .then(images => {
      console.log(images.hits);
      const cardList = images.hits
        .map(image => {
          return `<div class="photo-card">
          <img src="${image.webFormatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${image.likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${image.views}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${image.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${image.downloads}
            </p>
          </div>
        </div>`;
        })
        .join('');
      gallery.innerHTML = cardList;
    })
    .catch(error => {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
});
