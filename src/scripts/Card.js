import {newCardSelector, placeLikeSelector} from '../utils/constants.js'
export default class {
    constructor(data, cardTemplate, {handleCardClick, handleDelClick}) {
        this._text = data.text;
        this._image = data.image;
        this._cardTemplate = cardTemplate;
        this._newCardSelector = newCardSelector
        this._placeLikeSelector = placeLikeSelector;
        this._handleCardClick = handleCardClick;
        this._handleDelClick = handleDelClick
    }

    _getTemplate() {
        this._newCardElement = this._cardTemplate.querySelector(this._newCardSelector);
        const cardElement = this._newCardElement.cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._placeWithImage = this._element.querySelector('.element__image');
        this._placeWithCaption = this._element.querySelector('.element__name');
        this._placeLikeSymbol = this._element.querySelector('.element__like');
        this._placeBasketSymbol = this._element.querySelector('.card__del-button');
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
        this._placeBasketSymbol.addEventListener('click', () => {
            this._handleDelClick()
        });
    }

    _likeCard = (button) => {
        button.classList.toggle('element__like_active');
    }

    _deleteCard = (evt) => {
        evt.target.closest(this._newCardSelector).remove();
    }
}