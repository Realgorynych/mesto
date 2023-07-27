import { Card } from '../scripts/Card.js'
import { FormValidator } from '../scripts/FormValidator.js'
import Section from '../scripts/Section.js';
import PopupWidthForm from '../scripts/PopupWidthForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js'
import UserInfo from '../scripts/UserInfo.js'
import './index.css';
import Api from '../scripts/Api.js';


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





// fetch('https://nomoreparties.co/v1/cohort-71/users/me', {
//     headers: {
//         authorization: 'fc2baf0c-9957-43ec-9441-1036867399f2',
//         'Content-Type': 'application/json'
//     }
// })
//     .then(res => res.json())
//     .then((data) => {
//         return(data)
//     })

const api = new Api(
    {
        baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71/',
        headers: {
            authorization: 'fc2baf0c-9957-43ec-9441-1036867399f2',
            'Content-Type': 'application/json'
        }
    }
)


// const userData = new Api('https://nomoreparties.co/v1/cohort-71/users/me', 'GET')
api.getUser()
api.userInfo()


fetch('https://mesto.nomoreparties.co/v1/cohort-71/cards', {
    headers: {
        authorization: 'fc2baf0c-9957-43ec-9441-1036867399f2'
    }
})
    .then(res => res.json())
    .then((result) => {
        const cardsList = new Section(
            {
                items: Array.from(result),
                renderer: (element) => {
                    const card = new Card(element, "#card-template", {
                        handleOpenPopup: (name, link) => {
                            popupWithImage.open(name, link)
                        }


                    },
                        {
                            handleDelete:
                                function () {
                                    const popupDelete = new PopupWidthForm('.popup-delete',
                                        {
                                            submitCallback: () => {
                                                api.deleteCard(element)
                                                popupDelete.close()
                                            }
                                        }
                                    )
                                    popupDelete.setEventListeners()
                                    popupDelete.open();

                                }

                        },
                        {
                            handleLike: function () {
                                api.like(element)
                                console.log('like on')
                            }
                        },
                        {
                            removeLike: function () {
                                api.unLike(element)
                                console.log('like off')
                            }
                        }

                    );
                    return card.generateCard();
                }
            }, '.cards'
        )
        cardsList.renderItems()

        const popupAddForm = new PopupWidthForm('.popup-add', {
            submitCallback:
                function (inputValues) {
                    cardsList.renderItem(inputValues);
                    api.postCard(inputValues)
                    popupAddForm.close();

                }

        })
        popupAddForm.setEventListeners()
        addButton.addEventListener('click', function () {
            cardValidation.resetValidation();
            popupAddForm.open()
        });
    }
    )

const userInfo = new UserInfo({ nameElementSelector: '.profile__name', infoElementSelector: '.profile__stat' })

const profileValidation = new FormValidator(validationConfig, profileForm)
profileValidation.enableValidation()

const cardValidation = new FormValidator(validationConfig, addForm)
cardValidation.enableValidation()

// addButton.addEventListener('click', function () {
//     cardValidation.resetValidation();
//     popupAddForm.open()
// });
editButton.addEventListener('click', function () {
    const { name, info } = userInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = info;
    popupProfileForm.open();
});

// const cardsList = new Section(
//     {
//         items: initialCards,
//         renderer: (element) => {
//             const card = new Card(element, "#card-template", {
//                 handleOpenPopup: (name, link) => {
//                     popupWithImage.open(name, link)
//                 }
//             });
//             return card.generateCard();
//         }
//     }, '.cards'
// )


// cardsList.renderItems()

// const popupAddForm = new PopupWidthForm('.popup-add', {
//     submitCallback:
//         function (inputValues) {
//             cardsList.renderItem(inputValues);
//             popupAddForm.close();
//         }

// })

// popupAddForm.setEventListeners()

const popupProfileForm = new PopupWidthForm('.popup-profile', {
    submitCallback:
        function (inputValues) {
            userInfo.setUserInfo(inputValues);
            popupProfileForm.close();
            api.editProfile(inputValues)
        }
})

popupProfileForm.setEventListeners()


const popupWithImage = new PopupWithImage('.popup-photo');
popupWithImage.setEventListeners()

// document.querySelectorAll('.card__trash-button').addEventListener('click')

// const popupDelete = new PopupWidthForm('.popup-delete',
//     {
//         submitCallback: () => {
//             api.deleteCard()
//             console.log(delitedElement)
//         }
//     }
// )
// popupDelete.setEventListeners()

const popupAvatarForm = new PopupWidthForm('.popup-avatar', {
    submitCallback:
        function () {

            api.editAvatar()

            popupAvatarForm.close()


        }

})

// const avatarEditForm = document.querySelector('popup-avatar__inputbox')
// const avatarValidation = new FormValidator(validationConfig, avatarEditForm)
// avatarValidation.enableValidation()

popupAvatarForm.setEventListeners()

const avatarButton = document.querySelector('.profile__avatar-button');
avatarButton.addEventListener('click', function () { popupAvatarForm.open() })