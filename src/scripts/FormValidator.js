export default class  {
    constructor(validateConfig, formElement) {
        this._formElement = formElement
        this._inputList = Array.from(this._formElement.querySelectorAll(validateConfig.inputSelector))
        this._buttonElement = this._formElement.querySelector(validateConfig.submitButtonSelector)
        this._inactiveButtonClass = validateConfig.inactiveButtonClass
        this._inputErrorClass = validateConfig.inputErrorClass
        this._errorClass = validateConfig.errorClass
    }

    _showInputError(inputElement, errorMessage)  {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass)
        errorElement.textContent = errorMessage
        errorElement.classList.add(this._errorClass)
    };

    _hideInputError(inputElement)  { // функция скрытия ошибки
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
        inputElement.classList.remove(this._inputErrorClass)
        inputElement.classList.remove(this._errorClass)
        errorElement.textContent = ''
    }

    _checkInputValidity(inputElement)  { // функция проверяет корректность введеных данных
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        };
    }

    _hasInvalidInput(){ //выключение невалидных полей
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }

    _toggleButtonState(){ // функция включает и выключает кнопку отправить
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._inactiveButtonClass)
            this._buttonElement.disabled = true
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass)
            this._buttonElement.disabled = false
        }
    }

    _setFormEventListeners() { // функция устанавливает слушатели инпута на формы
        this._toggleButtonState()
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity (inputElement)
                this._toggleButtonState ()
            })
        })
    }

    _clearErrors() {
        this._toggleButtonState(this._inputList, this._buttonElement)
        this._inputList.forEach((inputElement) => {
            this._hideInputError (inputElement)
            this._toggleButtonState (this._inputList, this._buttonElement)
        })
    }

    clearErrors() {
        this._clearErrors(this._formElement);
    }

    enableValidation() { // функция запускающая процесс валидации
        this._setFormEventListeners(this._formElement);
    }

}