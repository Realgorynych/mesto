const enableValidationKeys = {
    formSelector: '.popup__inputbox',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active2'
};

const enableValidation = ({ formSelector, ...rest }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        // formElement.addEventListener('submit', (evt) => {
        //     evt.preventDefault();
        // })

        setEventListeners(formElement, rest);
    })
}

const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...rest }) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, rest);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, rest);
            toggleButtonState(inputList, buttonElement, rest);
        });
    });
};


const toggleButtonState = (inputList, buttonElement, { inactiveButtonClass }) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'disabled')
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled')
    }
};

// const enableButton = (button, { inactiveButtonClass }) => {
//     button.classList.remove(inactiveButtonClass);
//     button.removeAttribute('disabled')
// }

// const disableButton = (button, { inactiveButtonClass }) => {
//     button.classList.add(inactiveButtonClass);
//     button.setAttribute('disabled', 'disabled')
// }

const checkInputValidity = (formElement, inputElement, rest) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, rest);

    } else {
        hideInputError(formElement, inputElement, rest);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const showInputError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass, ...rest }) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass, ...rest }) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

enableValidation(enableValidationKeys);