import Popup from "./Popup.js";

export default class extends Popup{
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._handleFormSubmit = handleFormSubmit;
        this._popup = document.querySelector(this._popupSelector);
        this._form =  this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.popup__input')
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
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
