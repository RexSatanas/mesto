export const wokConstants = {
    openPopupBtn: document.querySelector('.profile__info-edit-button'),
    formEditPopup: document.querySelector('.popup__edit-form'),
    nameInput: document.getElementById('name'),
    statusInput: document.getElementById('status'),
    addPopup: document.querySelector('.popup_type_add'),
    openAddBtn: document.querySelector('.profile__add-button'),
    formAddPopup: document.querySelector('.popup__add-form'),
    cardTemplate: document.querySelector('#card-template')
}

export const workImages = {
    addButtonSVG: new URL('../images/AddButton.svg', import.meta.url),
    addButtonSmallSVG: new URL('../images/AddButtonSmall.svg', import.meta.url),
    avatarkaPNG: new URL('../images/avatarka.png', import.meta.url),
    closeiconSVG: new URL('../images/Closeicon.svg', import.meta.url),
    closeIconSmallSVG: new URL('../images/CloseIconSmall.svg', import.meta.url),
    editButtonSVG: new URL('../images/EditButton.svg', import.meta.url),
    editButtonSmallSVG: new URL('../images/EditButtonSmall.svg', import.meta.url),
    headerLogoSVG: new URL('../images/header-logo.svg', import.meta.url),
    likebtnSVG: new URL('../images/likebtn.svg', import.meta.url),
    likebtnBlkSVG: new URL('../images/likebtnBlk.svg', import.meta.url),
    submitButtonSVG: new URL('../images/SubmitButton.svg', import.meta.url),
    trashSvg: new URL('../images/trash.svg', import.meta.url)
}

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
export const validateConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disable',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};
