export class Card {
    constructor(data, selector) {
        this._selector = selector;
        this._link = data.link;
        this._name = data.name;
        this._element = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
        this._image = this._element.querySelector('.element__image');
        this._like = this._element.querySelector('.element__like');
    }

    _openFullImg(link, alt) { //просмотр картинки
        imageElement.src = link;
        imageElement.alt = alt;
        imageElementName.textContent = alt;
        openPopup(imageModalWindow);
    }

    _likeCard() { //лайк карточки
        this._like.classList.toggle('element__like_active');
    }

    _deleteCard() { // удаление карточки
        this._element.remove();
    }

    _cardClickHandler(evt) { // обработчик кликов на  картинку, лайк  и удаление
        if (evt.target.classList.contains('element__like')) {
            this._likeCard(evt);
        }
        if (evt.target.classList.contains('element__image')) {
            this._openFullImg(evt);
        }
        if (evt.target.classList.contains('card__del-button')){
            this._deleteCard(evt);
        }
    }

    _setCardEventListeners(){ // установить слушатель на карточку
        this._element.addEventListener('click', (evt) => this._cardClickHandler(evt))
    }

    generateCard() { // наполняем карточку
        this._setCardEventListeners();
        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.element__name').textContent = this._name;
        return this._element
    }
}