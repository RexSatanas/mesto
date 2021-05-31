import {KEYBOARD_KEYCODE_ESC} from '../utils/constants'
export default class {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupActiveSelector = 'popup_opened';
        this._buttonClosePopup = this._popup.querySelector('.popup__close-btn');
    }

    open() {
        this._popup.classList.add(this._popupActiveSelector);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove(this._popupActiveSelector);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === KEYBOARD_KEYCODE_ESC) {
            this.close();
        }
    }

    setEventListeners() {
        this._buttonClosePopup.addEventListener('click', () => {
            this.close();
        })

        this._popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        })
    }
}
