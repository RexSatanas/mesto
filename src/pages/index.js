import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import Popup from '../scripts/Popup.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import '../pages/index.css'
import {wokConstants, workImages, initialCards, validateConfig} from '../scripts/Constants.js'
const popupWithFormAdd = new PopupWithForm({
    popupSelector: '.popup_type_add',
    handleFormSubmit: (formValues) => {
        const card = new Card(
            { image: formValues.url, text: formValues.place },
            wokConstants.cardTemplate,
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
            wokConstants.cardTemplate,
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

wokConstants.openAddBtn.addEventListener('click', (evt) => {
    const validFormNewCard = new FormValidator(validateConfig, wokConstants.formAddPopup);
    validFormNewCard.clearErrors()
    validFormNewCard.enableValidation();
    popupWithFormAdd.open();
})
wokConstants.openPopupBtn.addEventListener('click', (evt) => {
    wokConstants.nameInput.value = userInfo.getUserInfo().name;
    wokConstants.statusInput.value = userInfo.getUserInfo().status;
    const validFormUser = new FormValidator(validateConfig, wokConstants.formEditPopup);
    validFormUser.clearErrors()
    validFormUser.enableValidation();
    popupWithFormUser.open();
})
cardList.renderItems();