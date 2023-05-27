class FormValidator {
    constructor(data, formElement) {
        this._formElement = formElement;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;


        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some(inputElement => !inputElement.validity.valid);
    }

    offButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', 'disabled');
    }

    onButton() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
    }

    _toggleButtonState() {

        if (this._hasInvalidInput()) {
            this.offButton()
        } else {
            this.onButton()
        }
    }

    _setEventListeners() {
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._formElement.addEventListener('submit', e => {
            e.preventDefault();
        });

        this._setEventListeners();
        this._toggleButtonState();
    }

    resetValidation() {
        this._inputList.forEach((input) => {
            this._hideInputError(input)
        })
        this._toggleButtonState()
    }
}

export { FormValidator };