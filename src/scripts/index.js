import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { initialCards } from './initialCards.js';
import Section from './Section.js';
import PopupWidthForm from './PopupWidthForm.js';
import UserInfo from './UserInfo.js';

const profileForm = document.querySelector('.popup-profile__inputbox');
const addForm = document.querySelector('.popup-add__inputbox');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const nameProfile = document.querySelector('.profile__name');
const nameJob = document.querySelector('.profile__stat');
const editButton = document.querySelector('.profile__edit-button');
export const popupPhoto = document.querySelector('.popup-photo');
const cardsContainer = document.querySelector('.cards');
export const popupPhotoSrc = document.querySelector('.popup-photo__img');
export const popupPhotoTitle = document.querySelector('.popup-photo__title');
const mestoName = document.querySelector('#mesto-name');
const mestoSrc = document.querySelector('#mesto-src');
const addButton = document.querySelector('.profile__add-button');
const validationConfig = {
    formSelector: '.popup__inputbox',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input-error_active',
    errorClass: 'popup__input-error'
};

//для формы профиля
const profileValidation = new FormValidator(validationConfig, profileForm)
profileValidation.enableValidation()

//для формы добавления карточек
const cardValidation = new FormValidator(validationConfig, addForm)
cardValidation.enableValidation()

addButton.addEventListener('click', function () {
    popupAddForm.open()
});
editButton.addEventListener('click', function () {
    nameInput.value = nameProfile.textContent;
    jobInput.value = nameJob.textContent;
    popupProfileForm.open();
});

const createCards = new Section(
    {
        items: initialCards,
        renderer: (element) => {
            const card = new Card(element, "#card-template");
            return card.generateCard();
        }
    }, cardsContainer
)

createCards.render()


const popupAddForm = new PopupWidthForm('.popup-add', {
    submitCallback:
        function (evt) {
            evt.preventDefault();
            createCards.addItem({
                name: mestoName.value,
                link: mestoSrc.value
            })

        }
})

popupAddForm.setEventListeners()

const popupProfileForm = new PopupWidthForm('.popup-profile', {
    submitCallback:
        function (evt) {
            evt.preventDefault();
            const userInfo = new UserInfo({ nameElement: nameProfile, infoElement: nameJob })
            userInfo.setUserInfo({ name: nameInput.value, link: jobInput.value });

        }
})

popupProfileForm.setEventListeners()