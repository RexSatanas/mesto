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
    const elBox = newElement.querySelector('.element__box');
    const elName = newElement.querySelector('.element__name');
    const elButton = newElement.querySelector('.element__like');
    const elDelete = newElement.querySelector('.card__del-button')

    elName.textContent = item.name;
    elImage.src = item.link;
    elImage.alt = item.name;


    elButton.addEventListener('click', likeCard);
    elDelete.addEventListener('click', delCard);


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

const addPopup = document.querySelector('.popup-add');
const cardName = document.querySelector('.element__name');
const cardImg = document.querySelector('.element__image');
const openAddBtn = document.querySelector('.profile__add-button');
const closeAddPopupBtn = addPopup.querySelector('.popup__close-addbtn');
const formAddPopup = addPopup.querySelector('.popup__addform');
const placeInput = addPopup.querySelector('.popup__input_name-place');
const linkInput = addPopup.querySelector('.popup__input_link-place');

function openPopup() {
    addPopup.classList.add('popup_opened');
    placeInput.value = cardName.textContent;
    linkInput.value = cardImg.textContent;
}

function closePopup() {
    addPopup.classList.remove('popup_opened');
}


function formAddSubmitHandler(evt) {
    evt.preventDefault();
    const card = createCards({name: placeInput.value, link: linkInput.value});
    elementContainer.prepend(card);
    openPopup();
    placeInput.value = '';
    linkInput.value = '';
}

openAddBtn.addEventListener('click', openPopup);
closeAddPopupBtn.addEventListener('click', closePopup);
formAddPopup.addEventListener('submit', formAddSubmitHandler);








