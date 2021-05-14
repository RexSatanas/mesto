export default class {
    constructor({arrayWithDataList, renderer}, containerSelector) {
        this._arrayWithDataList = arrayWithDataList;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._arrayWithDataList.forEach(itemWithData => {
            this._renderer(itemWithData);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}