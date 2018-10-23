'use strict'
import './styles/styles.css';



// import Model from './js/model';
// import View from './js/view';
// import Controller from './js/controller';

// const model = new Model();
// const view = new View();

// new Controller(view, model);


const axios = require('axios');
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

export const fetchAllImages = () => {

    return axios
        .get(url)
        .then(response => { return response.data })
        .then(data => { return console.log(data.hits) })
        .catch(error => {
            console.log('ERROR: ', error);
        });
}


fetchAllImages()