import Popup from './Popup.js';

export default class extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._handleFormSubmit = handleFormSubmit;
        this._popup = document.querySelector(this._popupSelector);
        this._popupForm =  this._popup.querySelector('.popup__form');
        this._inputsList = this._popup.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputsList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}