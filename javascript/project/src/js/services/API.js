const axios = require('axios');
const BASE_URL = 'https://www.pexabay.com/api/';
const Authorization = '10456559-0f017c1b081538875f387541b';


// export const apiRequest = () => {
//     return axios
//         .get(`${BASE_URL}?${Authorization}`)
//         .then(response => response.data)
//         .catch(err => console.log(err))
// };
export const request = {
    page: 1,
    query: '',
    Authorization: '10456559-0f017c1b081538875f387541b',
    resetPage() {
        this.page = 1;
    },
    incrementPage() {
        this.page += 1;
    },
};

const url = `https://pixabay.com/api/?image_type=photo&q=${request.query}&key=${request.Authorization}&per_page=12&page=${request.page}`;
export function fetchAllImages() {

    return axios
        .get(url)
        .then(response => { return response.data })
        .catch(error => {
            console.log('ERROR: ', error);
        });
}
const arr = fetchAllImages()
console.log(fetchAllImages().hits)
const arr = fetchAllImages()
console.log(arr.hits)