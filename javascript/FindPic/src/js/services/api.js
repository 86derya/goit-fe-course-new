import axios from 'axios';
const API_KEY = '10456559-ece128cde22be6e54d79b9b25';

export const getImages = ({ query, page }) => {
  const url = `https://pixabay.com/api/?image_type=photo&q=${query}&per_page=12&page=${page}&key=${API_KEY}`;

  return axios
    .get(url)
    .then(res => res.data.hits)
    .catch(err => console.log('axios err : ', err));
};
