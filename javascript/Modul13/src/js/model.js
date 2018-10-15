import * as LS_urlList from './services/LS_urlList'

export default class Model {
    constructor() {
        this.urlList = [];
    }

    LSgetUrlList() {
        this.urlList = LS_urlList.get();
        return this.urlList;
    }

    LSsetUrlList(value) {
        return LS_urlList.set(value);
    }

    checkForPrevSaved(name) {
        let urlListFromLS = LS_urlList.get();
        const savedUrlNames = urlListFromLS ? urlListFromLS.map(i => i.name) : [];
        return savedUrlNames.some(bookmark => bookmark === name);
    }

    checkForValidUrlSyntax(url) {
        const regExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        return regExp.test(url)
    }

    // updateLocalStorage(valueToUpdate) {
    //     LS_urlList.set(valueToUpdate);
    // }

}