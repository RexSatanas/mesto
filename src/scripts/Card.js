export default class {
    constructor(data, cardTemplate, {handleCardClick}) {
        this._text = data.text;
        this._image = data.image;
        this._cardTemplate = cardTemplate;
        this._newCardSelector = '.element';
        this._placeLikeSelector = 'element__like';
        this._newCardElement = this._cardTemplate.querySelector(this._newCardSelector);
        this._handleCardClick = handleCardClick;
        this._placeWithImage = this._element.querySelector('.element__image');
        this._placeWithCaption = this._element.querySelector('.element__name');
        this._placeLikeSymbol = this._element.querySelector('.element__like');
        this._placeBasketSymbol = this._element.querySelector('.card__del-button');
    }

    _getTemplate() {
        const cardElement = this._newCardElement.cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._placeWithImage.src = this._image;
        this._placeWithCaption.textContent = this._text;
        this._placeWithImage.alt = this._text;

        return this._element;
    }

    _setEventListeners() {
        this._placeWithImage.addEventListener('click', () => {
            this._handleCardClick();
        });
        this._placeLikeSymbol.addEventListener('click', () => {
            this._likeCard(this._placeLikeSymbol);
        });
        this._placeBasketSymbol.addEventListener('click', (evt) => {
            this._deleteCard(evt);
        });
    }

    _likeCard = (button) => {
        button.classList.toggle(`${this._placeLikeSelector}_active`);
    }

    _deleteCard = (evt) => {
        evt.target.closest(this._newCardSelector).remove();
    }
}