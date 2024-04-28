import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { getImages, renderImages } from './services';

const form = document.querySelector('form#search-form');
const moreBtn = document.querySelector('button.load-more');
let page = 1;

form.addEventListener('submit', async ev => {
  ev.preventDefault();
  let query = ev.currentTarget.elements.searchQuery.value;
  console.log(query);
  try {
    const response = await getImages(query);
    Notify.success(`Hooray WE found ${response.totalHits} images!`);
    const images = response.hits;
    renderImages(images);
    moreBtn.classList.remove('hidden');
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
});

moreBtn.addEventListener('click', async ev => {
  ev.preventDefault();
  moreBtn.classList.add('hidden');
  page += 1;
  try {
    const response = await getImages(query);
    const images = response.hits;
    renderImages(images);
    moreBtn.classList.remove('hidden');
  } catch (error) {
    Notify.failure(
      'We are sorry, but you have reached the end of search results.'
    );
  }
});
