import axios from 'axios';
const apiKey = '43560822-853d258fb61c3d5dd4d985685';

// export const getImages = async searchParams => {
//   const response = await axios.get(
//     `https://pixabay.com/api/?key=${apiKey}&${searchParams}`
//   );
//   return response.data;
// };

export async function getImages(searchParams) {
  return await axios
    .get(`https://pixabay.com/api/?key=${apiKey}&${searchParams}`)
    .then(response => {
      return response.data;
    });
}
