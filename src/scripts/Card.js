import {newCardSelector} from '../utils/constants.js'
export default class {
    constructor(userID, data, cardTemplate, {handleCardClick, handleDelClick, counterLikes}) {
        this._userID = userID;
        this._data = data;
        this._cardTemplate = cardTemplate;
        this._newCardSelector = newCardSelector
        this._newCardElement = this._cardTemplate.querySelector(this._newCardSelector);
        this._handleCardClick = handleCardClick;
        this._handleDelClick = handleDelClick;
        this._counterLikes = counterLikes;
    }

    _getTemplate() {
        if (this._data.owner._id !== this._userID) {
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
        this._counterLikeElement = this._element.querySelector('.element__like-counter');
        this._setEventListeners();
        this._placeWithImage.src = this._data.link;
        this._placeWithCaption.textContent = this._data.name;
        this._placeWithImage.alt = this._data.name;
        this._counterLikeElement.textContent = this._data.likes.length
        this._data.likes.forEach(user => {
            if(user._id == this._userID) {
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
                this._handleDelClick(evt);
            });
        }
    }

    _likeCard = (button) => {
        button.classList.toggle('element__like_active');
        this._counterLikes();
    }

    showLikes(likesNumber) {
        this._counterLikeElement.textContent = likesNumber;
    }

    getCardId() {
        return this._data._id
    }

    removeCard() {
        this._element.remove()
    }
}