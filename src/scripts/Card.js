

export default class {
    constructor(data, cardTemplate, {handleCardClick}) {
        this._text = data.text;
        this._image = data.image;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick
    }

   _getTemplate() {
        const cardElement = this._cardTemplate.content.querySelector('.element').cloneNode(true);
        return cardElement
    }

    generateCard() { // наполняем карточку
        this._element = this._getTemplate()
        this._setEventListeners();
        this._element.querySelector('.element__image').src = this._image
        this._element.querySelector('.element__name').textContent = this._text
        return this._element
    }


    _likeCard = (button) => { //лайк карточки
        button.classList.toggle('element__like_active');
    }

    _deleteCard = (evt) => { // удаление карточки
        evt.target.closest('.element').remove();
    }

    _setEventListeners() { // обработчик кликов на  картинку, лайк  и удаление
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick();
        });
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._likeCard(this._element.querySelector('.element__like'));
        });
        this._element.querySelector('.card__del-button').addEventListener('click', (evt) => {
            this._deleteCard(evt);
        });
    }



}
