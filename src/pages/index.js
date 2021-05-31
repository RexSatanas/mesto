import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithSubmit from "../scripts/PopupWithSubmit.js";
import UserInfo from '../scripts/UserInfo.js';
import Api from '../scripts/Api.js'
import './index.css';
import {
    popupAddFoto, popupUser, popupBigImage, popupSubmit, popupAvatar, sectionWithCard,
    nameUserSelector, statusUserSelector, likeCounter, clickedLike, buttonSubmit, userAvatar,
    buttonEditProfile, popupFormUser, nameInput, statusInput, addButton, addForm, avatarForm, avatarEdit, cardTemplate,
    token, url, validationConfig, avatarUserSelector
} from '../utils/constants.js';

const popupWithImage = new PopupWithImage(popupBigImage);
const popupWithSubmit = new PopupWithSubmit(popupSubmit, buttonSubmit)
const userInfo = new UserInfo({
    nameUserSelector: nameUserSelector,
    statusUserSelector: statusUserSelector,
    avatarUserSelector: avatarUserSelector});
const addCardFormValidator = new FormValidator(validationConfig, addForm);
const editProfileFormValidator = new FormValidator(validationConfig, popupFormUser);
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
const section = new Section({
    renderer: (itemWithData) => {
        const cardElement = createCard(itemWithData);
        section.addItem(cardElement);
    }
}, sectionWithCard);

// Api
const api = new Api({
    url: url,
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
});

Promise.all([api.getUser(), api.getCards()])
    .then(([userData, dataCardList]) => {
        userInfo.setUserInfo(userData);
        dataCardList.reverse()
        section.renderItems(dataCardList)
    })
    .catch(err => console.log(err))

//создание карточки
const createCard = (dataCard) => {
    const card = new Card(userInfo.getUserInfo().id, dataCard, cardTemplate,
        {
            handleCardClick() {
                popupWithImage.open(dataCard.link, dataCard.name);
            },
            handleDelClick() {
                const handleConfirm = () => {
                    api.deleteCard(card.getCardId())
                        .then(() => {
                            card.removeCard()
                            popupWithSubmit.close();
                        })
                        .catch(err => console.log(err));
                }
                popupWithSubmit.open(handleConfirm);
                buttonSubmit.addEventListener('click', handleConfirm);
            },
            counterLikes() {
                if (cardElement.querySelector(clickedLike)) {
                    api.likeCard(card.getCardId())
                        .then(res => {
                            card.showLikes(res.likes.length)
                        })
                        .catch(err => console.log(err))
                } else {
                    api.likeCardCancel(dataCard._id)
                        .then(res => {
                            card.showLikes(res.likes.length)
                        })
                        .catch(err => console.log(err))
                }
            }
        }
    );
    const cardElement = card.generateCard();
    return cardElement;
}

function loadingText(isLoading, saveButton, initialText) {
    if (isLoading) {
        saveButton.textContent = 'Сохранение...'
    } else {
        saveButton.textContent = initialText
    }
}

// попапы
const popupWithFormAdd = new PopupWithForm({
    popupSelector: popupAddFoto,
    handleFormSubmit: (formValues, saveButton, initialText) => {
        loadingText(true, saveButton, initialText)
        api.saveNewCard({ name: formValues.name, url: formValues.link })
            .then(cardData => {
                section.renderItems([cardData]);
                popupWithFormAdd.close();
            })
            .catch(err => console.log(err))
            .finally(() =>  loadingText(false, saveButton, initialText))
    }
});

const popupWithFormUser = new PopupWithForm({
    popupSelector: popupUser,
    handleFormSubmit: (formValues, saveButton, initialText) => {
        loadingText(true, saveButton, initialText)
        api.updateUserInfo({ name: formValues.name, status: formValues.status })
            .then(userData => {
                userInfo.setUserInfo(userData) // в ДОМ добавили имя и работу из ответа сервера
                loadingText(false, saveButton, initialText)
                popupWithFormUser.close();
            })
            .catch(err => console.log(err))
    }
});

const popupWithFormAvatar = new PopupWithForm({
    popupSelector: popupAvatar,
    handleFormSubmit: (formValues, saveButton, initialText) => {
        loadingText(true, saveButton, initialText)
        api.newAvatar(formValues.link)
            .then(userData => {
                userInfo.setUserInfo(userData);
                popupWithFormAvatar.close()
            })
            .catch(err => console.log(err))
            .finally(() => loadingText(false, saveButton, initialText))
    }
});

//слушатели событий на кнопки
addButton.addEventListener('click', () => {
    popupWithFormAdd.open();
})
buttonEditProfile.addEventListener('click', () => {
    nameInput.value = userInfo.getUserInfo().name;
    statusInput.value = userInfo.getUserInfo().status;
    popupWithFormUser.open();
})
avatarEdit.addEventListener('click', () => {
    popupWithFormAvatar.open();
})

popupWithFormAdd.setEventListeners();
popupWithFormUser.setEventListeners();
popupWithFormAvatar.setEventListeners();
popupWithSubmit.setEventListeners();
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

