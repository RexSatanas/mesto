const popup = document.querySelector('.popup');
const openPopupBtn = document.querySelector('.open_popup_btn');
const closePopupBtn = document.querySelector('.popup__close-btn');
console.log(closePopupBtn);

function openPopup() {
    popup.classList.add('popup_opened');  
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

openPopupBtn.addEventListener('click', function() {
    openPopup();
});

closePopupBtn.addEventListener('click', function() {closePopup();});
