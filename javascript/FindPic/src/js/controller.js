import {
	getImages
} from './services/api';

import {
	imagesOnThePage
} from './services/modal';

export default class Controller {

	constructor(model, view) {
		this._model = model;
		this._view = view;
		this.images = this._model.localImages;
		this.imagesOnPage = imagesOnThePage;

		this._view.refs.body.addEventListener('click',
			this.handleModalFalseClick.bind(this));

		this._view.refs.siteLogo.addEventListener('click',
			this.handleLogoClick.bind(this));

		this._view.refs.form.addEventListener('submit',
			this.handleFormSumit.bind(this));

		this._view.refs.loadMoreBtn.addEventListener('click',
			this.handleLoadMoreClick.bind(this));

		this._view.refs.list.addEventListener('click',
			this.handleOpenModal.bind(this));

		this._view.refs.modalPage.addEventListener('click',
			this.handleModalControls.bind(this));

		this._view.refs.modalPage.addEventListener('click',
			this.handleFavoritesModalControls.bind(this));

		this._view.refs.showFavorite.addEventListener('click',
			this.handleShowFavorite.bind(this));

		this.init();

	}

	init() {
		this._model.addToLocalStorage(this.images)
	}

	handleLogoClick() {
		window.location.reload();
	}
	// SUBMIT

	handleFormSumit(e) {
		e.preventDefault();
		this.imagesOnPage = []

		this._model.resetCurrentPage();
		this._view.resetPhotosList();
		this._model.currentQuery = this._view.refs.input.value;
		this.handleFetch({
			query: this._model.currentQuery,
			page: this._model.currentPage,
		});

		this._view.showLoadMoreBtn();
		this._view.refs.list.classList.remove('js-favorites');
	}

	handleFetch(params) {
		this._view.toggleLoader();

		getImages(params).then(photos => {
			const markup = this._view.createListItems(photos);
			this._view.updatePhotosList(markup);
			this._view.toggleLoader();
		});
	}

	//LOAD MORE

	handleLoadMoreClick() {
		this._model.incrementCurrentPage();
		this.handleFetch({
			query: this._model.currentQuery,
			page: this._model.currentPage,
		});
	}

	//MODAL

	handleOpenModal(evt) {
		if (!evt.target.src) return;

		this._model.disableScroll();
		this._model.backdropImageInit(evt.target)
		this.changeColorFavorite(evt.target)
		this._view.refs.backdrop.classList.add("show-modal")

		window.addEventListener('keydown', this.handleModalKeyPress.bind(this));
	}

	handleModalFalseClick(evt) {

		if (evt.target.nodeName !== 'IMG' &&
			evt.target.nodeName !== 'BUTTON' &&
			!evt.target.classList.contains('page-modal__icons')) {

			this.handleCloseModal();
		}

	}

	handleModalKeyPress(evt) {
		const key = evt.code;
		switch (key) {
			case 'Escape':
				this.handleCloseModal();
				break;

			case 'ArrowLeft':
				this.keyPrev()
				break;

			case 'ArrowRight':
				this.keyNext()
				break;
		}
	}

	handleCloseModal() {
		this._model.backdropCloseModal();
		this._model.enableScroll();
		if (!this._view.refs.backdrop.classList.contains('show-modal')) return;

		this._view.refs.backdrop.classList.remove('show-modal');
		window.removeEventListener('keydown', this.handleModalKeyPress.bind(this));
	}

	//FAVORITE

	handleShowFavorite() {
		if (!this._view.refs.backdrop.classList.contains('show-modal')) {
			if (this.images.length === 0) {
				alert('Вы ничего не добавили в избранное')
			}
		}
		this._view.refs.list.classList.add('js-favorites');
		this._view.refs.favoriteModalBtn.classList.add('js-favorites__icon');
		this._view.refs.loadMoreBtn.classList.remove('visible');
		this._view.refs.list.textContent = '';
		const markup = this._view.createListItems(this.images);
		this._view.updatePhotosList(markup);
	}

	handleFavoritesModalControls(event) {
		if (!this._view.refs.list.classList.contains('js-favorites')) return;

		const target = event.target;

		if (target.nodeName !== "BUTTON") return;
		const action = target.dataset.action;

		switch (action) {

			case 'favorite':
				this.handleShowFavorite();
				this.handleCloseModal();

		}

	}

	//CONTROLL

	handleModalControls(event) {
		event.preventDefault();
		const target = event.target;

		if (target.nodeName !== "BUTTON") return;

		const action = target.dataset.action;

		switch (action) {
			case 'next':
				this.keyNext()
				break;

			case 'prev':
				this.keyPrev()
				break;

			case 'favorite':
				const imgUrl = this._view.refs.modalImg.getAttribute("src")
				const imgId = this._view.refs.modalImg.getAttribute("id")

				if (this._model.isHasId(imgId, this.images)) {
					this.images = this.images.filter(obj => obj.id !== imgId)
					this._model.addToLocalStorage(this.images)

					this._view.changeColorFavoriteBtn("#ffffff")
					return
				}

				this._view.changeColorFavoriteBtn("#eeed11")

				const obj = {
					id: imgId,
					webformatURL: imgUrl,
				}

				this.images.push(obj)
				this._model.addToLocalStorage(this.images)
				break;

			case 'close-modal':
				this.handleCloseModal()
				break;
		}
	}

	changeColorFavorite(elem) {
		const imgUrl = elem.getAttribute("src")
		this._view.refs.modalImg.setAttribute("src", imgUrl)

		const imgId = elem.getAttribute("id")
		this._view.refs.modalImg.setAttribute("id", imgId)

		this._model.isHasId(imgId, this.images) ?
			this._view.changeColorFavoriteBtn("#eeed11") :
			this._view.changeColorFavoriteBtn("#ffffff")
	}

	keyPrev() {
		const prevImg = this._model.backdropShowPrevImage();
		if (prevImg === '') return
		this._view.refs.modalImg.src = prevImg.src
		this._view.refs.modalImg.id = prevImg.id
		this.changeColorFavorite(prevImg)
	}

	keyNext() {
		const nextImg = this._model.backdropShowNextImage()
		if (nextImg === '') return
		this._view.refs.modalImg.src = nextImg.src
		this._view.refs.modalImg.id = nextImg.id
		this.changeColorFavorite(nextImg)
	}
}