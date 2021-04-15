
const validateConfig = ({
    formSelector: '.popup__form',
    formNew: '.popup__form[name="profile-info"]',
    formAdd: '.popup__form[name="add-card"]',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_invalid',
    activeButtonClass: 'popup__save-btn_valid',
    inputErrorClass: '.popup__input-error',
})


function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const isValid = form.checkValidity();
    if (isValid) {
        console.log('Форма валидна!');
        form.reset();
    } else {
        console.log('Форма НЕ валидна!');
    }
}

function setFieldError() {
    const field = document.querySelector(validateConfig.inputSelector)
    const span = field.nextElementSibling;
    span.textContent = field.validationMessage;
}

function setSubmitButtonState (event, formElement, validateConfig) {
    const button = formElement.querySelector(validateConfig.submitButtonSelector);
    const isValid = event.currentTarget.checkValidity();
    if (isValid) {
        button.removeAttribute('disabled');
        button.classList.add(validateConfig.activeButtonClass);
        button.classList.remove(validateConfig.inactiveButtonClass);
    } else {
        button.setAttribute('disabled', true);
        button.classList.remove(validateConfig.activeButtonClass);
        button.classList.add(validateConfig.activeButtonClass);
    }
}

function enableValidation (event, validateConfig) {
    const input = event.currentTarget;
    setFieldError(input);
    setSubmitButtonState(validateConfig);
}
enableValidation(validateConfig)

document.querySelector(validateConfig.formNew).addEventListener('submit', handleFormSubmit);
document.querySelector(validateConfig.formNew).addEventListener('input', enableValidation)
document.querySelector(validateConfig.formAdd).addEventListener('submit', handleFormSubmit);
document.querySelector(validateConfig.formAdd).addEventListener('input', enableValidation)

