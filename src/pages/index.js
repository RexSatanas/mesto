import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import Popup from '../scripts/Popup.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import '../pages/index.css'
const openPopupBtn = document.querySelector('.profile__info-edit-button');
const formEditPopup = document.querySelector('.popup__edit-form');
const nameInput = document.getElementById('name');
const statusInput = document.getElementById('status');
const addPopup = document.querySelector('.popup_type_add');
const openAddBtn = document.querySelector('.profile__add-button');
const formAddPopup = addPopup.querySelector('.popup__add-form');
const cardTemplate = document.querySelector('#card-template')
//картинки в html
const addButtonSVG = new URL('../images/AddButton.svg', import.meta.url);
const addButtonSmallSVG = new URL('../images/AddButtonSmall.svg', import.meta.url);
const avatarkaPNG = new URL('../images/avatarka.png', import.meta.url);
const closeiconSVG = new URL('../images/Closeicon.svg', import.meta.url);
const closeIconSmallSVG = new URL('../images/CloseIconSmall.svg', import.meta.url);
const EditButtonSVG = new URL('../images/EditButton.svg', import.meta.url);
const EditButtonSmallSVG = new URL('../images/EditButtonSmall.svg', import.meta.url);
const HeaderLogoSVG = new URL('../images/header-logo.svg', import.meta.url);
const likebtnSVG = new URL('../images/likebtn.svg', import.meta.url);
const likebtnBlkSVG = new URL('../images/likebtnBlk.svg', import.meta.url);
const SubmitButtonSVG= new URL('../images/SubmitButton.svg', import.meta.url);
const TrashSvg= new URL('../images/trash.svg', import.meta.url);
const mestoImage = [
    {name:'addButtonSVG' , image:addButtonSVG},
    {name:'addButtonSmallSVG' , image:addButtonSmallSVG},
    {name:'avatarkaPNG' , image:avatarkaPNG},
    {name:'closeiconSVG' , image:closeiconSVG},
    {name:'closeIconSmallSVG' , image:closeIconSmallSVG},
    {name:'EditButtonSVG' , image:EditButtonSVG},
    {name:'EditButtonSmallSVG' , image:EditButtonSmallSVG},
    {name:'HeaderLogoSVG' , image:HeaderLogoSVG},
    {name:'likebtnSVG' , image:likebtnSVG},
    {name:'likebtnBlkSVG' , image:likebtnBlkSVG},
    {name:'SubmitButtonSVG' , image:SubmitButtonSVG},
    {name:'TrashSvg' , image:TrashSvg},
]
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
const validateConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disable',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

const popupWithFormAdd = new PopupWithForm({
    popupSelector: '.popup_type_add',
    handleFormSubmit: (formValues) => {
        const card = new Card(
            { image: formValues.url, text: formValues.place },
            cardTemplate,
            {
                handleCardClick() {
                    const popupWithImage = new PopupWithImage('.popup_type_photo');
                    popupWithImage.open(formValues.url, formValues.place);
                }
            }
        );
        const cardElement = card.generateCard();
        document.querySelector('.elements').prepend(cardElement);
        popupWithFormAdd.close();
    }
});

popupWithFormAdd.setEventListeners();

const userInfo = new UserInfo({ userName: '.profile__info-name', userStatus: '.profile__info-status' })


const popupWithFormUser = new PopupWithForm({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (formValues) => {
        userInfo.setUserInfo(formValues.name, formValues.status);
        popupWithFormUser.close();
    }
});
popupWithFormUser.setEventListeners();


const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({ image: item.link, text: item.name },
            cardTemplate,
            {
                handleCardClick () {
                    const popupWithImage = new PopupWithImage('.popup_type_photo');
                    popupWithImage.open(item.link, item.name)
                }
            }
        );
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }
}, '.elements');

openAddBtn.addEventListener('click', (evt) => {
    const popup = new Popup('.popup_type_add');
    const validFormNewCard = new FormValidator(validateConfig, formAddPopup);
    validFormNewCard.clearErrors()
    validFormNewCard.enableValidation();
    popup.open();
})
openPopupBtn.addEventListener('click', (evt) => {
    const popup = new Popup('.popup_type_edit');
    nameInput.value = userInfo.getUserInfo().name;
    statusInput.value = userInfo.getUserInfo().status;
    const validFormUser = new FormValidator(validateConfig, formEditPopup);
    validFormUser.clearErrors()
    validFormUser.enableValidation();
    popup.open();
})
cardList.renderItems();