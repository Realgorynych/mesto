import { Card } from '../scripts/Card.js'
import { FormValidator } from '../scripts/FormValidator.js'
import { initialCards } from '../utils/initialCards.js';
import Section from '../scripts/Section.js';
import PopupWidthForm from '../scripts/PopupWidthForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js'
import UserInfo from '../scripts/UserInfo.js'
import './index.css';

const profileForm = document.querySelector('.popup-profile__inputbox');
const addForm = document.querySelector('.popup-add__inputbox');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const editButton = document.querySelector('.profile__edit-button');
export const popupPhoto = document.querySelector('.popup-photo');
export const popupPhotoSrc = document.querySelector('.popup-photo__img');
export const popupPhotoTitle = document.querySelector('.popup-photo__title');
const addButton = document.querySelector('.profile__add-button');
const validationConfig = {
    formSelector: '.popup__inputbox',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input-error_active',
    errorClass: 'popup__input-error'
};

const userInfo = new UserInfo({ nameElementSelector: '.profile__name', infoElementSelector: '.profile__stat' })

const profileValidation = new FormValidator(validationConfig, profileForm)
profileValidation.enableValidation()

const cardValidation = new FormValidator(validationConfig, addForm)
cardValidation.enableValidation()

addButton.addEventListener('click', function () {
    cardValidation.resetValidation();
    popupAddForm.open()
});
editButton.addEventListener('click', function () {
    const { name, info } = userInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = info;
    popupProfileForm.open();
});

const cardsList = new Section(
    {
        items: initialCards,
        renderer: (element) => {
            const card = new Card(element, "#card-template", {
                handleOpenPopup: (name, link) => {
                    popupWithImage.open(name, link)
                }
            });
            return card.generateCard();
        }
    }, '.cards'
)


cardsList.renderItems()

const popupAddForm = new PopupWidthForm('.popup-add', {
    submitCallback:
        function (inputValues) {
            cardsList.renderItem(inputValues);
            popupAddForm.close();
        }

})

popupAddForm.setEventListeners()

const popupProfileForm = new PopupWidthForm('.popup-profile', {
    submitCallback:
        function (inputValues) {
            userInfo.setUserInfo(inputValues);
            popupProfileForm.close();
        }
})

popupProfileForm.setEventListeners()


const popupWithImage = new PopupWithImage('.popup-photo');
popupWithImage.setEventListeners()