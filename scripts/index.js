import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
export const initialCards = [
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

const popupEdit = document.querySelector('.popup_type_edit');
const openPopupBtn = document.querySelector('.profile__info-edit-button');
const closePopupBtn = popupEdit.querySelector('.popup__close-btn');
export const formEditPopup = document.querySelector('.popup__edit-form');
const profileName = document.querySelector('.profile__info-name');
const profileStatus = document.querySelector('.profile__info-status');
const nameInput = document.getElementById('name');
const statusInput = document.getElementById('status');
const addPopup = document.querySelector('.popup_type_add');
const openAddBtn = document.querySelector('.profile__add-button');
const closeAddPopupBtn = addPopup.querySelector('.popup__close-btn_add');
export const formAddPopup = addPopup.querySelector('.popup__add-form');
const placeInput = addPopup.querySelector('.popup__input_name-place');
const linkInput = addPopup.querySelector('.popup__input_link-place');
export const imageModalWindow = document.querySelector('.popup_type_photo');
export const imageElement = imageModalWindow.querySelector('.popup__image');
const imageElementClose = imageModalWindow.querySelector('.popup__close-btn_img');
export const imageElementName = imageModalWindow.querySelector('.popup__img-title');
const elementContainer = document.querySelector('.elements');

function render () {
    initialCards.forEach(({link, name}) => {
        const cardsArray = new Card({link, name}, '#card-template');
        elementContainer.append(cardsArray.generateCard());
    });
}

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}

function openEditPopup() {
    nameInput.value = profileName.textContent;
    statusInput.value = profileStatus.textContent;
    openPopup(popupEdit)
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc(evt) {
    if(evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

function closePopupByClick(evt) {
    if(evt.target.classList.contains('popup')) {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

const validateConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disable',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

const validateConfigProfile = new FormValidator(validateConfig, formEditPopup)
const validateConfigCard = new FormValidator(validateConfig, formAddPopup)

function startFormValidation() {
    validateConfigProfile.enableValidation()
    validateConfigCard.enableValidation()
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = statusInput.value;
    closePopup(popupEdit);
}

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const obj = {};
    obj.link = linkInput.value
    obj.name = placeInput.value
    const originalCard = new Card(obj, '#card-template')
    elementContainer.prepend(originalCard.generateCard())
    closePopup(addPopup);
}

document.addEventListener('click', closePopupByClick);
imageElementClose.addEventListener('click', () => closePopup(imageModalWindow));
openAddBtn.addEventListener('click', ()=> openPopup(addPopup));
closeAddPopupBtn.addEventListener('click', () => closePopup(addPopup));
formAddPopup.addEventListener('submit', handleAddCardFormSubmit);
openPopupBtn.addEventListener('click', openEditPopup);
closePopupBtn.addEventListener('click', () => closePopup(popupEdit));
formEditPopup.addEventListener('submit', handleProfileFormSubmit);
render ();
startFormValidation();