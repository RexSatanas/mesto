const popupEdit = document.querySelector('.popup_type_edit');
const openPopupBtn = document.querySelector('.profile__info-edit-button');
const closePopupBtn = popupEdit.querySelector('.popup__close-btn');
const formElement = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__info-name');
const profileStatus = document.querySelector('.profile__info-status');
const nameInput = document.getElementById('name');
const statusInput = document.getElementById('status');
const addPopup = document.querySelector('.popup_type_add');
const openAddBtn = document.querySelector('.profile__add-button');
const closeAddPopupBtn = addPopup.querySelector('.popup__close_add-btn');
const formAddPopup = addPopup.querySelector('.popup__add-form');
const placeInput = addPopup.querySelector('.popup__input_name-place');
const linkInput = addPopup.querySelector('.popup__input_link-place');
const imageModalWindow = document.querySelector('.popup_type_photo');
const imageElement = imageModalWindow.querySelector('.popup__image');
const imageElementClose = imageModalWindow.querySelector('.popup__img_close');
const imageElementName = imageModalWindow.querySelector('.popup__img-title');
const elementContainer = document.querySelector('.elements');
const cardTemplate = document.getElementById('card-template').content;


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

function HandlerformSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = statusInput.value;
    closePopup(popupEdit);
}

function deleteCard(evt) {
    evt.target.closest('.element').remove();
}

function likeCard(evt) {
    evt.target.classList.toggle('element__like_active');
}

function createCard(item) {

    const newElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = newElement.querySelector('.element__image');
    const cardName = newElement.querySelector('.element__name');
    const cardLikeButton = newElement.querySelector('.element__like');
    const cardDeleteBtn = newElement.querySelector('.card__del-button');

    cardName.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;


    cardLikeButton.addEventListener('click', likeCard);
    cardDeleteBtn.addEventListener('click', deleteCard);
    cardImage.addEventListener('click', () => openFullImg(item.link, item.name));


    return newElement;
}

function renderList() {
    const data = initialCards.map(item => {
        const newElement = createCard(item);
        return newElement;
    });
    elementContainer.append(...data);
}

renderList();

function HandlerformAddSubmit(evt) {
    evt.preventDefault();
    const card = createCard({name: placeInput.value, link: linkInput.value});
    elementContainer.prepend(card);
    closePopup(addPopup);
    formAddPopup.reset()
}

function openFullImg(link, alt) {
    imageElement.src = link;
    imageElement.alt = alt;
    imageElementName.textContent = alt;
    openPopup(imageModalWindow);
}

imageElementClose.addEventListener('click', () => closePopup(imageModalWindow));
openAddBtn.addEventListener('click', ()=> openPopup(addPopup));
closeAddPopupBtn.addEventListener('click', () => closePopup(addPopup));
formAddPopup.addEventListener('submit', HandlerformAddSubmit);
openPopupBtn.addEventListener('click', openEditPopup);
closePopupBtn.addEventListener('click', () => closePopup(popupEdit));
formElement.addEventListener('submit', HandlerformSubmit);