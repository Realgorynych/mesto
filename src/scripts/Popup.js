export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(`${popupSelector}`)
        this._crossButton = document.querySelector(popupSelector + '__cross-button')
        this._lisenerHandleEscClose = (evt) => this._handleEscClose(evt);
        this._lisenerHandleBGClose = (evt) => this._handleBGClose(evt);
    }
    open() {
        this.setEventListeners
        this._popupSelector.classList.add('popup_opened')
        document.addEventListener('keydown', this._lisenerHandleEscClose)
    }
    close() {
        this._popupSelector.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._lisenerHandleEscClose)
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

        this._crossButton.addEventListener('click', () => {this.close()})
        this._popupSelector.addEventListener('click', this._lisenerHandleBGClose)


    }

}

// Создайте класс Popup
// Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
//Модальное окно также закрывается при клике на затемнённую область вокруг формы.