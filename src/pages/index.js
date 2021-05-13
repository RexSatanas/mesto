import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import './index.css'
import {openPopupBtn, formEditPopup, nameInput, statusInput,
    addPopup, editPopup, photoPopup, cardPlace, openAddBtn,
    formAddPopup, cardTemplate, nameUserSelector, statusUserSelector,
    workImages, initialCards, validateConfig} from '../scripts/Constants.js'

const popupWithImage = new PopupWithImage(photoPopup);
const userInfo = new UserInfo({ nameUserSelector: nameUserSelector, statusUserSelector: statusUserSelector });
const validationForm = new FormValidator(validateConfig);

const createCard = (item) => {
    const card = new Card({ image: item.link, text: item.name },
        cardTemplate,
        {
            handleCardClick() {
                popupWithImage.open(item.link, item.name);
            }
        }
    );
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
}

//6 начальных карточек
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        createCard(item)
    }
}, cardPlace);
cardList.renderItems();

const popupWithFormAdd = new PopupWithForm({
    popupSelector: addPopup,
    handleFormSubmit: (formValues) => {
        const cardAdded = new Section({
            items: [formValues],
            renderer: (item) => {
                createCard(item)
            }
        }, cardPlace);

        cardAdded.renderItems();
        popupWithFormAdd.close();
    }
});
popupWithFormAdd.setEventListeners();

const popupWithFormUser = new PopupWithForm({
    popupSelector: editPopup,
    handleFormSubmit: (formValues) => {
        userInfo.setUserInfo(formValues.name, formValues.status);
        popupWithFormUser.close();
    }
});
popupWithFormUser.setEventListeners();

openPopupBtn.addEventListener('click', () =>{
    validationForm.enableValidation(formEditPopup);
    popupWithFormUser.open();
})

openAddBtn.addEventListener('click', () => {
    validationForm.enableValidation(formAddPopup);
    popupWithFormAdd.open();
})

