
const validateConfig = ({
    formNew: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: 'popup__save-btn',
    inactiveButtonClass: '.popup__save-btn_invalid',
    activeButtonClass: 'popup__save-btn_valid',
    inputErrorClass: '.popup__input-error',
})

document.addEventListener('submit', handleFormSubmit);
document.addEventListener('input', function (event) {
    const input = event.target;
    setFieldError(input);
    setSubmitButtonState(validateConfig.formNew);
});

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

function setFieldError(field) {
    const span = field.nextElementSibling;
    span.textContent = field.validationMessage;
}

function setSubmitButtonState(form, validateConfig) {
    const button = form.querySelector(validateConfig.submitButtonSelector);
    const isValid = form.checkValidity();

    if (isValid) {
        button.removeAttribute('disabled');
        button.classList.add(validateConfig.activeButtonClass);
        button.classList.remove(validateConfig.inactiveButtonClass);
    } else {
        button.setAttribute('disabled', true);
        button.classList.remove(validateConfig.activeButtonClass);
        button.classList.add(validateConfig.inactiveButtonClass);
    }
}

