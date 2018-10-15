export const get = () => {
    try {
        const LSData = localStorage.getItem('urlList');
        console.log(typeof(JSON.parse(LSData)));
        return LSData === null && typeof(JSON.parse(LSData)) != object ?
            undefined :
            JSON.parse(LSData);
    } catch (err) {
        console.error("Get state error: ", err);
    }
};

export const set = (value) => {
    try {
        const valueToSave = JSON.stringify(value);
        localStorage.setItem("urlList", valueToSave);
    } catch (err) {
        console.error("Set state error: ", err);
    }
}