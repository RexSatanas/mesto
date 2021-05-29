import Popup from './Popup.js';

export default class extends Popup {
    constructor(popupSelector, buttonSubmit) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._buttonSubmit = buttonSubmit;
    }
    open(handleConfirm) {
        super.open()
        this._handleConfirm = handleConfirm;
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        super.close();
        this._buttonSubmit.removeEventListener('click', this._handleConfirm);
    }
}

