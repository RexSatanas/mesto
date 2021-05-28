import Popup from './Popup.js';

export default class extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._bigFoto = this._popup.querySelector('.popup__image');
        this._bigCaption = this._popup.querySelector('.popup__img-title');
    }

    open(link, name) {
        super.open()
        this._bigFoto.src = link;
        this._bigCaption.textContent =  name;
        this._bigFoto.alt = place;
        super.setEventListeners();
    }
}