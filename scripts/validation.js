
const showInputError = (elementForm, inputElement, errorMessage) => {
    console.log(inputElement.name, errorMessage)
    const errorElement = elementForm.querySelector(`#${inputElement.id}-error`)
    console.log(errorElement)
    errorElement.textContent = errorMessage
    errorElement.classList.add('popup__input-error_active')
}

const hideInputError = (elementForm,  inputElement) => {
    const errorElement = elementForm.querySelector(`#${inputElement.id}-error`)

    errorElement.textContent = ''
    errorElement.classList.remove('popup__input-error_active')
}


const checkInputValidity = (elementForm, inputElement) => {
    const isInputNotValid =  !inputElement.validity.valid

    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage
        showInputError(elementForm, inputElement, errorMessage)
    } else {
        hideInputError(inputElement)
    }
}

const setEventListeners = (elementForm) => {
    elementForm.addEventListener('submit', (event) => {
        event.preventDefault()
    })
    const inputList = Array.from(elementForm.querySelectorAll('.popup__input'))

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', (event) => {
            checkInputValidity(elementForm, inputElement)
        })
    })
}

const enableValidation = () => {
    const formlist = Array.from(document.querySelectorAll('.popup__form'))
    formlist.forEach(setEventListeners )
}

enableValidation()