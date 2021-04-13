const formNew = document.querySelector('.popup__form[name="profile-info"]');
const formAdd = document.querySelector('.popup__form[name="add-card"]');


formNew.addEventListener('submit', handleFormSubmit);

formNew.addEventListener('input', function (event) {
    const input = event.target;
    setFieldError(input);
    setSubmitButtonState(formNew);
});

formAdd.addEventListener('submit', handleFormSubmit);
formAdd.addEventListener('input', function (event) {
    const input = event.target;
    setFieldError(input);
    setSubmitButtonState(formAdd);
});


/* Функция-коллбэк, обрабатывающая событие отправки формы. */
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

function setSubmitButtonState(form) {
    const button = form.querySelector('.popup__save-btn');
    const isValid = form.checkValidity();

    if (isValid) {
        button.removeAttribute('disabled');
        button.classList.add('popup__save-btn_valid');
        button.classList.remove('popup__button_invalid');
    } else {
        button.setAttribute('disabled', true);
        button.classList.remove('popup__button_valid');
        button.classList.add('popup__button_invalid');
    }
}
