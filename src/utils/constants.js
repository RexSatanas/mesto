const popupAddFoto = '.popup_type_add';
const popupUser = '.popup_type_user';
const popupBigImage = '.popup_type_photo';
const popupSubmit = '.popup_type_submit';
const popupAvatar = '.popup_type_avatar';
const sectionWithCard = '.elements';
const newCardSelector = '.element';
const nameUserSelector = '.profile__info-name';
const statusUserSelector = '.profile__info-status';
const avatarUserSelector = '.profile__avatar'
const placeLikeSelector = '.element__like';
const likeCounter = '.element__like-counter';
const clickedLike = '.element__like_active';
const buttonSubmit = document.querySelector('.popup__save-btn_confirm');
const userAvatar = document.querySelector('.profile__avatar');
const KEYBOARD_KEYCODE_ESC = 'Escape'
//изменение профиля
const buttonEditProfile = document.querySelector('.profile__info-edit-button');
const popupFormUser = document.querySelector('.popup__edit-form');
const nameInput = popupFormUser.querySelector('.popup__input-name');
const statusInput = popupFormUser.querySelector('.popup__input-status');
// добавление новых карточек
const addButton = document.querySelector('.profile__add-button');
const addForm = document.querySelector('.popup__add-form');
//изменение автара
const avatarForm = document.querySelector('.popup__avatar-form')
const avatarEdit = document.querySelector('.profile__avatar-edit')
const cardTemplate = document.querySelector('#card-template').content;


//Api
const token = 'be87e10d-5f50-49e4-a06f-5cefb6b5b607';
const url = 'https://mesto.nomoreparties.co/v1/cohort-24';

const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disable',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible',
    openButton: Array.from(document.querySelectorAll('.profile__click'))
}

export {popupAddFoto, popupUser, popupBigImage, popupSubmit, popupAvatar, sectionWithCard, newCardSelector,
    nameUserSelector, statusUserSelector, avatarUserSelector, placeLikeSelector, likeCounter, clickedLike, buttonSubmit, userAvatar,
    buttonEditProfile, popupFormUser, nameInput, statusInput, addButton, addForm, avatarForm, avatarEdit, cardTemplate,
    token, url, validationConfig, KEYBOARD_KEYCODE_ESC}