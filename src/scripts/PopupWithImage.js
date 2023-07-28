import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._img = this._popupSelector.querySelector('.popup-photo__img');
        this._title = this._popupSelector.querySelector('.popup-photo__title');
        this._inputSrc = document.querySelector('#mesto-src')
        this._inputText = document.querySelector('#mesto-name')
    }
    open(name, link) {
        this._img.src = link
        this._img.alt = name
        this._title.textContent = name

        super.open()
    }
}