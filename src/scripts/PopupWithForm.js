import Popup from "./Popup.js";

export default class extends Popup{
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._handleFormSubmit = handleFormSubmit;
        this._popup = document.querySelector(this._popupSelector);
        this._form =  this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        this._inputsData = this._popup.querySelectorAll('.popup__input ');
        this._formValues = {};
        this._inputsData.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form = this._popup.querySelector('.popup__form')
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues())
        })
    }

    close(){
        super.close()
        this._form.reset()
    }
}
