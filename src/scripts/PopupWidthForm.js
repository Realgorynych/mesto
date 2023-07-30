import Popup from "./Popup.js";

export default class PopupWidthForm extends Popup {
    constructor(popupSelector,{ submitCallback }) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._inputbox = document.querySelector(popupSelector + '__inputbox');
        this._inputList = Array.from(this._inputbox.querySelectorAll('.popup__input'));
        this._submitBtn = this._inputbox.querySelector(`${popupSelector}-save-button`)
        this._submitBtnText = this._submitBtn.textContent 

    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.getAttribute('name')] = input.value;
        });

        return inputValues;
    }

    setEventListeners() {
        this._inputbox.addEventListener('submit', evt => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
        });
        super.setEventListeners();
    }

    close() {
        this._inputbox.reset()
        super.close()
    }

    renderLoading(isLoading, loadingText = 'Сохранение...') {
        if (isLoading) {
            this._setDefultButtonText()
        } else {
            this._submitBtn.textContent = loadingText;
        }
    }

    _setDefultButtonText() {
        this._submitBtn.textContent = this._submitBtnText;
    }

    setButtonText(text) {
        this._submitBtn.textContent = text;
    }

    submitCallback(item, card) {
        this._inputbox.addEventListener('submit', evt => {
            evt.preventDefault();
            this._submitCallback(item, card);
            this.deleteSubmit(item, card)
        });
    }
    changeSubmitForm(newHandleSubmitForm) {
        this._submitCallback = newHandleSubmitForm;
      }
}