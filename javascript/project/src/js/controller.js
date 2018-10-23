export default class Controller {
    constructor(view, model) {
        this._view = view;
        this._model = model;

        // this._view.refs.form.addEventListener('click', this.handleAddBookmark.bind(this));
        // this._view.refs.container.addEventListener('click', this.handleRemoveBookmark.bind(this))
        // document.addEventListener('DOMContentLoaded', this.handleOnDomcreated.bind(this))

    }

    // handleOnDomcreated() {
    //     const urlList = this._model.LSgetUrlList() ? this._model.LSgetUrlList() : [];
    //     this._model.LSsetUrlList(urlList);
    //     this._view.createMarkup(urlList);
    //     this._model.getAllPictures();
    // };

    // handleAddBookmark(e) {
    //     e.preventDefault();

    //     const target = event.target;
    //     let urlListFromLS = this._model.LSgetUrlList();

    //     if (target.textContent === "Add") {
    //         let urlList = urlListFromLS.reverse();
    //         const bookmark = {
    //             name: "",
    //         };

    //         if (!this._model.checkForValidUrlSyntax(this._view.refs.input.value)) {
    //             alert("Not valid Url");
    //             this._view.refs.form.reset();
    //             return
    //         }

    //         if (!this._model.checkForPrevSaved(this._view.refs.input.value)) {
    //             bookmark.name = this._view.refs.input.value;
    //             urlList.push(bookmark);

    //             this._view.createMarkup(urlListFromLS.reverse());
    //             this._model.LSsetUrlList(urlList);
    //             this._view.refs.form.reset();
    //         } else {
    //             alert("This URL has been already saved!!!");
    //             this._view.refs.form.reset();
    //         }
    //     }
    // }

    // handleRemoveBookmark(e) {
    //     e.preventDefault();
    //     const target = event.target;

    //     if (target.textContent === "Delete") {
    //         const card = target.parentNode;
    //         const bookmarkToDelete = target.previousElementSibling.textContent;

    //         let urlListFromLS = this._model.LSgetUrlList();
    //         let updatedUrlList = urlListFromLS.filter(e => e.name != bookmarkToDelete);

    //         localStorage.removeItem('urlList');
    //         this._model.LSsetUrlList(updatedUrlList);

    //         card.remove();
    //         this._view.refs.form.reset();
    //     }
    // }



}