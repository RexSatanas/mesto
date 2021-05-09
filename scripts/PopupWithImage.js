import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.open()
    }

    open(url, text) {
        this._popup.querySelector('.popup__image').src = url
        this._popup.querySelector('.popup__img-title').textContent = text
        super.open()
    }
}

//const popupWithImage = new PopupWithImage('.popup_type_image')
//popupWithImage.open()


