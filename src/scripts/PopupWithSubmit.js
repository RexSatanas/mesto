import Popup from "./Popup.js";

export default class extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._popupForm =  this._popup.querySelector('.popup__form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', evt => {
            evt.preventDefault();
            this._handleSubmit();
        })
    }

    setSubmitAction(action) {
        this._handleSubmit = action;
    }
}
