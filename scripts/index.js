let popup = document.querySelector('.popup');
let openPopupBtn = document.querySelector('.open_popup_btn');
let closePopupBtn = document.querySelector('.popup__close-btn');
let formElement = document.queryCommandValue('.popup__save-btn')
let profileName = document.querySelector('.profile__info-name');
let profileStatus = document.querySelector('.profile__info-status');
let nameInput = document.querySelector('.popup__name')
let statusInput = document.querySelector('.popup__status');



function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    statusInput.value = profileStatus.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent(nameInput.value);
    closePopup();
}

openPopupBtn.addEventListener('click', function() {openPopup();});
closePopupBtn.addEventListener('click', function() {closePopup();});
formElement.addEventListener('submit', formSubmitHandler());

