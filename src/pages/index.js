import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import Api from '../scripts/Api.js';
import './index.css';
import { popupAddFoto, popupEdit, popupBigImage, sectionWithCard,
    nameUserSelector, statusUserSelector, buttonEditProfile, popupFormUser, nameInput, statusInput, addButton,
    addForm, cardTemplate, validationConfig, initialCards, newCardSelector, placeLikeSelector, popupSubmit
} from '../utils/constants.js';
import PopupWithSubmit from "../scripts/PopupWithSubmit";
const popupWithImage = new PopupWithImage(popupBigImage);
const userInfo = new UserInfo({ nameUserSelector: nameUserSelector, statusUserSelector: statusUserSelector });
const addCardFormValidator = new FormValidator(validationConfig, addForm);
const editProfileFormValidator = new FormValidator(validationConfig, popupFormUser);
const handleAddCardFormSubmit = (dataCard) => cardList.addItem(createCard(dataCard))
const userInformation = new UserInfo({
    name: ".profile__info-name",
    about: ".profile__info-status",
    avatar: ".profile__avatar",
});
let myId
const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1/cohort-24',
    token: 'be87e10d-5f50-49e4-a06f-5cefb6b5b607',
})

const createCard = (item) => {
    const card = new Card({ image: item.link, text: item.name },
        cardTemplate,
        {
            handleCardClick() {
                popupWithImage.open(item.link, item.name);
            },
         /* handleDelClick() {
                popupWithImage.open()
            }*/
        }
    );
    const cardElement = card.generateCard();
    return cardElement;
}

const cardList = new Section((item) =>{
    const image = createCard(item);
    cardList.addItem(image);
}, sectionWithCard);

Promise.all([api.getUserData(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
        myId = userData;
        userInformation.setUserInfo(myId);
        cardList.renderItems(initialCards);
    })
    .catch((error) => console.log(error));

const popupWithFormAdd = new PopupWithForm({
    popupSelector: popupAddFoto,
    handleFormSubmit: (formValues) => {
        handleAddCardFormSubmit(formValues)
        popupWithFormAdd.close();
    }
});

const popupWithFormUser = new PopupWithForm({
    popupSelector: popupEdit,
    handleFormSubmit: (formValues) => {
        userInfo.setUserInfo(formValues.name, formValues.status);
        popupWithFormUser.close();
    }
});

/*const popupWitSubmit = new PopupWithSubmit({
    popupSelector: popupSubmit
})*/

addButton.addEventListener('click', () => {
    addCardFormValidator.clearErrors()
    popupWithFormAdd.open();
})
buttonEditProfile.addEventListener('click', () => {
    editProfileFormValidator.clearErrors()
    nameInput.value = userInfo.getUserInfo().name;
    statusInput.value = userInfo.getUserInfo().status;
    popupWithFormUser.open();
})

popupWithFormAdd.setEventListeners();
popupWithFormUser.setEventListeners();
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

