import Popup from "./Popup.js";

export default class extends Popup {
    open(link, name) {
        super.open()
        this._popup.querySelector('.popup__image').src = link
        this._popup.querySelector('.popup__img-title').textContent = name
        super.setEventListeners();
    }
}


