import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

import { getImages, renderImages, gallery } from './services.js';

const form = document.querySelector('form#search-form');
const moreBtn = document.querySelector('button.load-more');

let page = 1;
let query;

form.addEventListener('submit', async ev => {
  ev.preventDefault();
  query = ev.currentTarget.elements.searchQuery.value;
  console.log(query);
  page = 1;
  gallery.innerHTML = '';
  try {
    const response = await getImages(query, page);
    const images = response.hits;
    // --------sprawdzenie czy znaleziono zdjęcia-------
    if (response.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (response.totalHits < 40) {
      renderImages(images);
      Notify.success(`Hooray We found ${response.totalHits} images!`);
      Notify.failure(
        'We are sorry, but you have reached the end of search results.'
      );
    } else {
      Notify.success(`Hooray We found ${response.totalHits} images!`);
      renderImages(images);
      moreBtn.classList.remove('hidden');
    }
  } catch (error) {
    console.error(error.message);
    Notify.failure('There was an error downloading data. Please try again.');
  }
});

moreBtn.addEventListener('click', async ev => {
  moreBtn.classList.add('hidden');
  page += 1;
  try {
    const response = await getImages(query, page);
    const images = response.hits;
    const totalPages = Math.ceil(response.totalHits / 40);
    console.log(totalPages);
    renderImages(images);
    if (page === totalPages) {
      Notify.failure(
        'We are sorry, but you have reached the end of search results.'
      );
    } else {
      moreBtn.classList.remove('hidden');
    }
  } catch (error) {
    console.error(error.message);
    Notify.failure('There was an error downloading data. Please try again.');
  }
});
