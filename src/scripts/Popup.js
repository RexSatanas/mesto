export default class {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._popupOpened  = 'popup_opened'
        this._popupClose = this._popup.querySelector('.popup__close-btn')
    }

    open() {
        this._popup.classList.add(this._popupOpened);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close = () => {
        this._popup.classList.remove(this._popupOpened);
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popupClose.addEventListener('click', () =>  {
            this.close()
        })
        this._popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        })
    }
}