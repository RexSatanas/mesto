const popupEdit = document.querySelector('.popup_edit');
const openPopupBtn = document.querySelector('.profile__info-edit-button');
const closePopupBtn = document.querySelector('.popup__close-btn');
const formElement = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__info-name');
const profileStatus = document.querySelector('.profile__info-status');
const nameInput = document.getElementById('name');
const statusInput = document.getElementById('status');
const addPopup = document.querySelector('.popup-add');
const openAddBtn = document.querySelector('.profile__add-button');
const closeAddPopupBtn = addPopup.querySelector('.popup__close-addbtn');
const formAddPopup = addPopup.querySelector('.popup__addform');
const placeInput = addPopup.querySelector('.popup__input_name-place');
const linkInput = addPopup.querySelector('.popup__input_link-place');
const fullImg = document.querySelector('.popup-photo')
const fullImgImg = fullImg.querySelector('.popup__image');
const fullImgClose = fullImg.querySelector('.popup__imgclose');
const fullImgName = fullImg.querySelector('.popup__imgtitle');


function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openEditPopup() {
     nameInput.value = profileName.textContent;
     statusInput.value = profileStatus.textContent;
     openPopup(popupEdit)
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = statusInput.value;
    closePopup(popupEdit);
}

openPopupBtn.addEventListener('click', openEditPopup);
closePopupBtn.addEventListener('click', () => closePopup(popupEdit));
formElement.addEventListener('submit', formSubmitHandler);

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


const elementContainer = document.querySelector('.elements');

function delCard(evt) {
    evt.target.closest('.element').remove();
}


function likeCard(evt) {
    evt.target.classList.toggle('element__like_active');
}

function createCards(item) {
    const cardTemplate = document.getElementById('card-template').content;
    const newElement = cardTemplate.querySelector('.element').cloneNode(true);
    const elImage = newElement.querySelector('.element__image');
    const elName = newElement.querySelector('.element__name');
    const elButton = newElement.querySelector('.element__like');
    const elDelete = newElement.querySelector('.card__del-button')

    elName.textContent = item.name;
    elImage.src = item.link;
    elImage.alt = item.name;


    elButton.addEventListener('click', likeCard);
    elDelete.addEventListener('click', delCard);
    elImage.addEventListener('click', () => openFullImg(item.link, item.name));


    return newElement;
}

function cardsData() {
    const data = initialCards.map(item => {
        const newElement = createCards(item);
        return newElement;
    });
    elementContainer.append(...data);
}

cardsData();

openAddBtn.addEventListener('click', ()=> openPopup(addPopup));
closeAddPopupBtn.addEventListener('click', () => closePopup(addPopup));
formAddPopup.addEventListener('submit', formAddSubmitHandler);

function formAddSubmitHandler(evt) {
    evt.preventDefault();
    const card = createCards({name: placeInput.value, link: linkInput.value});
    elementContainer.prepend(card);
    closePopup(addPopup);
    placeInput.value = '';
    linkInput.value = '';
}





function openFullImg(link, alt) {
    fullImgImg.src = link;
    fullImgImg.alt = alt;
    fullImgName.textContent = alt;
    openPopup(fullImg);
}

fullImgClose.addEventListener('click', () => closePopup(fullImg));