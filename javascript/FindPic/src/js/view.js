import listItemTpl from '../templates/gallery-template.hbs';

export default class View {

    constructor() {
        this.refs = {};

        this.refs.body = document.querySelector('.page');
        this.refs.siteLogo = document.querySelector('.site-logo');
        this.refs.list = document.querySelector('.list');
        this.refs.form = document.querySelector('.form');
        this.refs.input = document.querySelector('.input-js');
        this.refs.loader = document.querySelector('.loader-overlay');
        this.refs.loadMoreBtn = document.querySelector('.list__load-more');
        this.refs.backdrop = document.querySelector('.backdrop');
        this.refs.modalPage = document.querySelector('.page-modal');
        this.refs.modalImg = document.querySelector('.page-modal__img');
        this.refs.modalIcons = document.querySelector('.page-modal__icons');
        this.refs.favoriteModalBtn = document.querySelector('button[data-action="favorite"]');
        this.refs.showFavorite = document.querySelector('.favorites__link');
    }

    showLoadMoreBtn() {
        if (!this.refs.loadMoreBtn.classList.contains('visible')) {
            this.refs.loadMoreBtn.classList.add('visible');
        }
    }

    createListItems(items) {
        return items.reduce((markup, item) => markup + listItemTpl(item), '');
    }

    updatePhotosList(markup) {
        this.refs.list.insertAdjacentHTML('beforeend', markup);
    }

    resetPhotosList() {
        this.refs.list.innerHTML = '';
    }

    toggleLoader() {
        return this.refs.loader.classList.toggle('show-loader');
    }

    changeColorFavoriteBtn(color) {
        return this.refs.favoriteModalBtn.style.color = color;
    }

    changeDisplayElem(elem, string) {
        elem.style.display = string
    };
}