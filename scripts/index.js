import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const profileForm = document.querySelector('.popup__inputbox');
const addForm = document.querySelector('.popup-add__inputbox');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const nameProfile = document.querySelector('.profile__name');
const nameJob = document.querySelector('.profile__stat');
const editButton = document.querySelector('.profile__edit-button');
const profileCross = document.querySelector('.popup-profile__cross-button');
const popupProfile = document.querySelector('.popup-profile');
export const popupPhoto = document.querySelector('.popup-photo');
const cardsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
export const popupPhotoSrc = document.querySelector('.popup-photo__img');
export const popupPhotoTitle = document.querySelector('.popup-photo__title');
const mestoName = document.querySelector('#mesto-name');
const mestoSrc = document.querySelector('#mesto-src');
const popupAdd = document.querySelector('.popup-add');
const addButton = document.querySelector('.profile__add-button');
const addCross = document.querySelector('.popup-add__cross-button');
const addSaveButton = document.querySelector('#saveAdd');
const allPopup = document.querySelectorAll('.popup');

function offButton() {
    addSaveButton.setAttribute('disabled', 'disabled');
    addSaveButton.classList.add('popup__save-button_inactive');
}

export function openPopup(popup) {
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', handleCloseByEsc)
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleCloseByEsc)
}

addCross.addEventListener('click', function () { closePopup(popupAdd) });
addButton.addEventListener('click', function () {
    openPopup(popupAdd);
    offButton();
});
editButton.addEventListener('click', function () {
    nameInput.value = nameProfile.textContent;
    jobInput.value = nameJob.textContent;
    openPopup(popupProfile);
});
profileCross.addEventListener('click', function () { closePopup(popupProfile) });
profileForm.addEventListener('submit', submitProfileForm);
const photoCross = document.querySelector('.popup-photo__cross-button')
photoCross.addEventListener('click', function () { closePopup(popupPhoto) })

function submitProfileForm(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    nameJob.textContent = jobInput.value;
    closePopup(popupProfile)
}

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }

];

function handleCloseByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function handleCloseByOverlay(evt, popupName) {
    if (evt.target === popupName) {
        closePopup(popupName)
    }
}

popupAdd.addEventListener('click', function (evt) { handleCloseByOverlay(evt, popupAdd) })
popupPhoto.addEventListener('click', function (evt) { handleCloseByOverlay(evt, popupPhoto) })
popupProfile.addEventListener('click', function (evt) { handleCloseByOverlay(evt, popupProfile) })


initialCards.forEach((item) => {
    const card = new Card(item, "#card-template");
    createCard(card)
});

addForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const newCard = new Card({
        name: mestoName.value,
        link: mestoSrc.value
    }, "#card-template");
    createCard(newCard)
    closePopup(popupAdd);
    evt.target.reset()
});

function createCard(card){
    const newCard = card.generateCard();
    cardsList.prepend(newCard)
}

const enableValidationKeys = {
    formSelector: '.popup__inputbox',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input-error_active',
    errorClass: 'popup__input-error'
};

const formElements = document.querySelectorAll(enableValidationKeys.formSelector);
formElements.forEach(formElement => {
    const formValidator = new FormValidator(enableValidationKeys, formElement);
    formValidator.enableValidation();
});