import * as modal from './services/modal'

export default class Model {

    constructor() {
        this.currentQuery = '';
        this.currentPage = 1;
        this.localImages = JSON.parse(localStorage.getItem('favorites'));
        this.keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
        if (this.localImages === null || this.localImages.length === 0) {
            this.localImages = []
        }
    }

    resetCurrentPage() {
        this.currentPage = 1;
    }

    incrementCurrentPage() {
        this.currentPage += 1;
    }

    addToLocalStorage(arr) {
        const jsonObj = JSON.stringify(arr);
        localStorage.setItem(`favorites`, jsonObj);
    }

    isHasId(id, arr) {
        return arr.some(obj => (obj.id === id))
    }

    backdropImageInit(selectedImage) {
        return modal.showCurrentImage(selectedImage);
    }

    backdropShowNextImage() {
        return modal.showNextImage();
    }

    backdropShowPrevImage() {
        return modal.showPrevImage();
    }

    backdropCloseModal() {
            return modal.closeModal();
        }
        // antiScroll=====================================
    preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    preventDefaultForScrollKeys(e) {
        if (this.keys[e.keyCode]) {
            e.preventDefault();
            return false;
        }
    }
    disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', this.preventDefault, false);
        window.onwheel = this.preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
        // window.ontouchmove = this.preventDefault; // mobile
        document.onkeydown = this.preventDefaultForScrollKeys;

    }
    enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }

}