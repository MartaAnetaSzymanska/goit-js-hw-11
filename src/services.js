import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const apiKey = '43560822-853d258fb61c3d5dd4d985685';
export const gallery = document.querySelector('div.gallery');

// export const getImages = async searchParams => {
//   const response = await axios.get(
//     `https://pixabay.com/api/?key=${apiKey}&${searchParams}`
//   );
//   return response.data;
// };

export async function getImages(query, page) {
  const searchParams = new URLSearchParams({
    q: `${query}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 40,
  });
  const response = await axios.get(
    `https://pixabay.com/api/?key=${apiKey}&${searchParams}`
  );
  return response.data;
}
export function renderImages(images) {
  console.log(images);
  const cardList = images
    .map(image => {
      return `<div class="photo-card">
      <a href = "${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy" /></a>
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
  gallery.insertAdjacentHTML('beforeend', cardList);
  const lightbox = new SimpleLightbox(`.gallery a`);
}
