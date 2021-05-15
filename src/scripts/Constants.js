const popupAddFoto = '.popup_type_add';
const popupEdit = '.popup_type_edit';
const popupBigImage = '.popup_type_photo';
const sectionWithCard = '.elements';
const nameUserSelector = '.profile__info-name';
const statusUserSelector = '.profile__info-status';
const buttonEditProfile = document.querySelector('.profile__info-edit-button');
const popupFormUser = document.querySelector('.popup__edit-form');
const nameInput = popupFormUser.querySelector('#name');
const statusInput = popupFormUser.querySelector('#status');
const addButton = document.querySelector('.profile__add-button');
const addForm = document.querySelector('.popup__add-form');
const cardTemplate = document.querySelector('#card-template').content;

const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disable',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
}

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export {popupAddFoto, popupEdit, popupBigImage, sectionWithCard,
    nameUserSelector, statusUserSelector, buttonEditProfile, popupFormUser, nameInput, statusInput, addButton,
    addForm, cardTemplate, validationConfig, initialCards};