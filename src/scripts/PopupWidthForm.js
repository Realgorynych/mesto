import Popup from "./Popup.js";

export default class PopupWidthForm extends Popup {
    constructor(popupSelector, { submitCallback }) {
        super(popupSelector);
        this._submitCallback = (evt) => submitCallback(evt);
        this._inputbox = document.querySelector(popupSelector + '__inputbox');
    }
    _getImputValues() {
        return {
            inputName: this._popupSelector.querySelector(".popup__input_type_name").value,
            inputJob: this._popupSelector.querySelector(".popup__input_type_job").value
        }
    }
    setEventListeners() {
        this._inputbox.addEventListener('submit', this._submitCallback);
        this._inputbox.addEventListener('submit', () => { this.close() })
        super.setEventListeners();
        this.close
    }

    close() {
        document.querySelector('#mesto-name').value = ''
        document.querySelector('#mesto-src').value = ''
        super.close()
    }
}


// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
// Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.