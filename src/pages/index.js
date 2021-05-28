import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithSubmit from "../scripts/PopupWithSubmit.js";
import UserInfo from '../scripts/UserInfo.js';
import Api from '../scripts/Api.js'
import './index.css';
import { popupAddFoto, popupEdit, popupBigImage, sectionWithCard,
    nameUserSelector, statusUserSelector, buttonEditProfile, popupFormUser, nameInput, statusInput, addButton,
    addForm, cardTemplate, validationConfig, token, url, userAvatar, likeCounter, clickedLike, popupAvatar,
    avatarForm, avatarEdit, popupSubmit, buttonConfirm
} from '../utils/constants.js';

const popupWithImage = new PopupWithImage(popupBigImage);
const popupWithSubmit = new PopupWithSubmit(popupSubmit)
const userInfo = new UserInfo({ nameUserSelector: nameUserSelector, statusUserSelector: statusUserSelector });
const addCardFormValidator = new FormValidator(validationConfig, addForm);
const editProfileFormValidator = new FormValidator(validationConfig, popupFormUser);
const AvatarFormValidator = new FormValidator(validationConfig, popupAvatar);

// Api
const api = new Api({
    url: url,
    headers: {
        authorization: token, 'Content-Type': 'application/json'
    }
});

api.getCards()
    .then(res => {
        const newArr = res
        const cardList = new Section({
            arrayWithDataList: newArr,
            renderer: (itemWithData) => {
                const cardElement = createCard(itemWithData);
                cardList.addItem(cardElement);
            }
        }, sectionWithCard);
        cardList.renderItems();
    })
    .catch(err => console.log(err))

api.getUser()
    .then(res => {
        userInfo.setUserInfo(res.name, res.about);
        userAvatar.src = res.avatar;
    })
    .catch(err => console.log(err))

//создание карточки
const createCard = (item) => {
    const card = new Card(item, cardTemplate,
        {
            handleCardClick() {
                popupWithImage.open(item.link, item.name);
            },
            handleBasketClick(evt) {  // обр-к клика удаления карточки
                popupWithSubmit.open();
                buttonConfirm.addEventListener('click', () => {
                    api.deleteCard(item._id) // удалил с сервера
                        .then(() => {
                            popupWithSubmit.close();
                            this.deleteCard(evt); // удалил из DOM
                        })
                        .catch(err => console.log(err));
                })
                popupWithSubmit.setEventListeners();
            },
            counterLikes() {
                if (cardElement.querySelector(clickedLike)) {
                    api.likeCard(item._id)
                        .then(res => {
                            cardElement.querySelector(likeCounter).textContent = res.likes.length
                        })
                        .catch(err => console.log(err))
                } else {
                    api.likeCardCancel(item._id)
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
function loadingText(isLoading, buttonSubmit, initialText) {
    if (isLoading) {
        buttonSubmit.textContent = 'Сохранение...'
    } else {
        buttonSubmit.textContent = initialText
    }
}

// попапы
const popupWithFormAdd = new PopupWithForm({
    popupSelector: popupAddFoto,
    handleFormSubmit: (formValues, buttonSubmit, initialText) => {
        loadingText(true, buttonSubmit, initialText)
        const cardAdded = new Section({
            arrayWithDataList: [formValues],
            renderer: (itemWithData) => {
                api.saveNewCard({ name: itemWithData.name, url: itemWithData.link })
                    .then((cardData) => {
                        const cardElement = createCard(cardData);
                        cardAdded.addItem(cardElement);
                    })
                    .catch(err => console.log(err))
                    .finally(() => {
                        loadingText(false, buttonSubmit, initialText)
                        popupWithFormAdd.close();
                    });
            }
        }, sectionWithCard);
        cardAdded.renderItems();
    }
});

const popupWithFormUser = new PopupWithForm({
    popupSelector: popupEdit,
    handleFormSubmit: (formValues, buttonSubmit, initialText) => {
        loadingText(true, buttonSubmit, initialText)
        api.saveUserInfo({ name: formValues.name, activity: formValues.activity })
            .then(res => {
                userInfo.setUserInfo(res.name, res.about)
            })
            .catch(err => console.log(err))
            .finally(() => {
                loadingText(false, buttonSubmit, initialText)
                popupWithFormUser.close();
            });
    }
});

const popupWithFormAvatar = new PopupWithForm({
    popupSelector: popupAvatar,
    handleFormSubmit: (formValues, buttonSubmit, initialText) => {
        loadingText(true, buttonSubmit, initialText)
        api.newAvatar(formValues.link)
            .then(res => {
                userAvatar.src = res.avatar;
            })
            .catch(err => console.log(err))
            .finally(() => {
                loadingText(false, buttonSubmit, initialText)
                popupWithFormAvatar.close()
            });
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
popupWithFormAvatar.setEventListeners()
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
AvatarFormValidator.enableValidation()

