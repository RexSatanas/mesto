import {newCardSelector, placeLikeSelector} from '../utils/constants.js'
export default class {
    constructor(data, cardTemplate, {handleCardClick, handleBasketClick, counterLikes}) {
        this._data = data;
        this._cardTemplate = cardTemplate;
        this._newCardSelector = newCardSelector
        this._placeLikeSelector = placeLikeSelector;
        this._newCardElement = this._cardTemplate.querySelector(this._newCardSelector);
        this._handleCardClick = handleCardClick;
        this._handleBasketClick = handleBasketClick;
        this._counterLikes = counterLikes;
    }

    _getTemplate() {
        if (this._data.owner._id !== "042e9b68a6fc29c7223d0553") {
            const cardElement = this._newCardElement.cloneNode(true);
            cardElement.querySelector('.card__del-button').remove();
            return cardElement;
        } else {
            const cardElement = this._newCardElement.cloneNode(true);

            return cardElement;
        }
    }

    generateCard() {
        this._element = this._getTemplate();
        this._placeWithImage = this._element.querySelector('.element__image');
        this._placeWithCaption = this._element.querySelector('.element__name');
        this._placeLikeSymbol = this._element.querySelector('.element__like');
        this._placeBasketSymbol = this._element.querySelector('.card__del-button');
        this._setEventListeners();
        this._placeWithImage.src = this._data.link;
        this._placeWithCaption.textContent = this._data.name;
        this._placeWithImage.alt = this._data.name;
        this._data.likes.forEach(user => {
            if(user._id == "042e9b68a6fc29c7223d0553") {
                this._placeLikeSymbol.classList.add('element__like_active')
            }
        });
        return this._element;
    }

    _setEventListeners() {
        this._placeWithImage.addEventListener('click', () => {
            this._handleCardClick();
        });
        this._placeLikeSymbol.addEventListener('click', () => {
            this._likeCard(this._placeLikeSymbol);
        });
        if(this._placeBasketSymbol) {
            this._placeBasketSymbol.addEventListener('click', (evt) => {
                this._handleBasketClick(evt);
            });
        }
    }

    _likeCard = (button) => {
        button.classList.toggle('element__like_active');
        this._counterLikes();
    }

    deleteElement = (event) => {
        event.target.closest(this._newCardSelector).remove();
    }
}