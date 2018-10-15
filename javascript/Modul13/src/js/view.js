export default class View {
    constructor() {
        this.refs = {};

        this.refs.form = document.querySelector(".bookmarks__form");
        this.refs.container = document.querySelector(".bookmarks__container");
        this.refs.input = document.querySelector(".bookmark__input");
        this.refs.urlListWrap = document.querySelector(".bookmarks__list");
    }

    createMarkup(list) {
        this.refs.urlListWrap.innerHTML = "";
        const source = document.querySelector("#bookmark__template").innerHTML.trim();
        const template = Handlebars.compile(source);
        const markup = list.reduce((acc, bookmark) => acc + template(bookmark), "");
        this.refs.urlListWrap.insertAdjacentHTML("beforeend", markup);
    }
}