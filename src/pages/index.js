import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithSubmit from "../scripts/PopupWithSubmit.js";
import UserInfo from '../scripts/UserInfo.js';
import Api from '../scripts/Api.js'
import './index.css';
import {popupAddFoto, popupUser, popupBigImage, popupSubmit, popupAvatar, sectionWithCard,
    nameUserSelector, statusUserSelector, likeCounter, clickedLike, buttonSubmit, userAvatar,
    buttonEditProfile, popupFormUser, nameInput, statusInput, addButton, addForm, avatarForm, avatarEdit, cardTemplate,
    token, url, validationConfig} from '../utils/constants.js';

const popupWithImage = new PopupWithImage(popupBigImage);
const popupWithSubmit = new PopupWithSubmit(popupSubmit, buttonSubmit)
const userInfo = new UserInfo({nameUserSelector: nameUserSelector, statusUserSelector: statusUserSelector});
const addCardFormValidator = new FormValidator(validationConfig, addForm);
const editProfileFormValidator = new FormValidator(validationConfig, popupFormUser);
const AvatarFormValidator = new FormValidator(validationConfig, avatarForm);
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

api.getUser() //получение информации о юзере
    .then(res => {
        userInfo.setUserInfo(res.name, res.about);
        userAvatar.src = res.avatar;
    })
    .catch(err => console.log(err))

api.getCards()     // рендер стартовых карточек
    .then(dataCardList => {
        section.renderItems(dataCardList)
    });


//создание карточки
const createCard = (dataCard) => {
    const card = new Card(dataCard, cardTemplate,
        {
            handleCardClick() {
                popupWithImage.open(dataCard.link, dataCard.name);
            },
            handleDelClick() {
                const handleConfirm = () => {
                    api.deleteCard(card._data._id)
                        .then(() => {
                            card._element.remove()
                            popupWithSubmit.close();
                        })
                        .catch(err => console.log(err));
                }
                popupWithSubmit.open(handleConfirm);
                popupWithSubmit.setEventListeners();
                buttonSubmit.addEventListener('click', handleConfirm);
            },
            counterLikes() {
                if (cardElement.querySelector(clickedLike)) {
                    api.likeCard(dataCard._id)
                        .then(res => {
                            cardElement.querySelector(likeCounter).textContent = res.likes.length
                        })
                        .catch(err => console.log(err))
                } else {
                    api.likeCardCancel(dataCard._id)
                        .then(res => {
                            cardElement.querySelector(likeCounter).textContent = res.likes.length
                        })
                        .catch(err => console.log(err))
                }
            }
        }
    );
    const cardElement = card.generateCard();
    return cardElement;
}
//Отрисовка загрузки сабмита
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
            .then(dataCard => {
                section.renderItems([dataCard])
                loadingText(false, saveButton, initialText)
                popupWithFormAdd.close();
            })
            .catch(err => console.log(err))
    }
});

const popupWithFormUser = new PopupWithForm({
    popupSelector: popupUser,
    handleFormSubmit: (formValues, saveButton, initialText) => {
        loadingText(true, saveButton, initialText)
        api.updateUserInfo({ name: formValues.name, status: formValues.status })
            .then(userData => {
                userInfo.setUserInfo(userData.name, userData.about) // в ДОМ добавили имя и работу из ответа сервера
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
            .then(res => {
                userAvatar.src = res.avatar;
                loadingText(false, saveButton, initialText)
                popupWithFormAvatar.close()
            })
            .catch(err => console.log(err))
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
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
AvatarFormValidator.enableValidation();

