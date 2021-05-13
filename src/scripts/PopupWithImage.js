import Popup from "./Popup.js";

export default class extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._fullImage = this._popup.querySelector('.popup__image')
        this._fullImageTitle =  this._popup.querySelector('.popup__img-title')
    }
    open(link, name) {
        super.open()
        this._fullImage.src = link
        this._fullImage.alt = name
        this._fullImageTitle.textContent = name
        super.setEventListeners();
    }
}


