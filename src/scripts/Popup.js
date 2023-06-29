export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector)
        this._crossButton = document.querySelector(popupSelector + '__cross-button')
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleBGClose = this._handleBGClose.bind(this);
    }
    open() {
        this._popupSelector.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscClose)
    }
    close() {
        this._popupSelector.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._handleEscClose)
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    _handleBGClose(evt) {
        if (evt.target === this._popupSelector) {
            this.close();
        }
    }
    setEventListeners() {

        this._crossButton.addEventListener('click', () => { this.close() })
        this._popupSelector.addEventListener('click', this._handleBGClose)


    }

}