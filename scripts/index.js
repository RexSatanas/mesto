let popup = document.querySelector('.popup');
let openPopupBtn = document.querySelector('.profile__info-editbutton');
let closePopupBtn = document.querySelector('.popup__close-btn');
let formElement = document.querySelector('.popup__container');
let profileName = document.querySelector('.profile__info-name');
let profileStatus = document.querySelector('.profile__info-status');
let nameInput = document.querySelector('.popup__name')
let statusInput = document.querySelector('.popup__status');

openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);


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
    profileName.textContent = nameInput.value;
    profileStatus.textContent = statusInput.value;
    closePopup(); 
}



