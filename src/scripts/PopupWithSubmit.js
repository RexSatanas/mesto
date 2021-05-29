import Popup from './Popup.js';


export default class extends Popup {
    constructor(popupSelector, saveButton) {
        super(popupSelector);
        this._saveButton = saveButton;
    }
    open(handleConfirm) {
        super.open()
        this._handleConfirm = handleConfirm;
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        super.close();
        this._saveButton.removeEventListener('click', this._handleConfirm);
    }
}

