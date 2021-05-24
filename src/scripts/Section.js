export default class {
    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) { //метод добавления карточку в начало списка
        this._container.prepend(element);
    }

    renderItems(cards) {
        cards.forEach(item => this._renderer(item));
    };
}