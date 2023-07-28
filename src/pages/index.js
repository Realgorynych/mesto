import { Card } from '../scripts/Card.js'
import { FormValidator } from '../scripts/FormValidator.js'
import Section from '../scripts/Section.js';
import PopupWidthForm from '../scripts/PopupWidthForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js'
import UserInfo from '../scripts/UserInfo.js'
import './index.css';
import Api from '../scripts/Api.js';

import { profileForm, addForm, nameInput, jobInput, editButton, popupPhoto, popupPhotoSrc, popupPhotoTitle, addButton, validationConfig } from '../utils/constants.js';

const api = new Api(
    {
        baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71/',
        headers: {
            authorization: 'fc2baf0c-9957-43ec-9441-1036867399f2',
            'Content-Type': 'application/json'
        }
    }
)

Promise.all([api.getUser(), api.getCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo({
            name: userData.name,
            about: userData.about,
            // avatar: userData.avatar
        })
        document.querySelector('.profile__avatar').src = userData.avatar;
        console.log(cards)
        cards.forEach((item) => cardsList.renderItem(item));
    })

const arrForCards = []

const cardsList = new Section(
    {
        items: arrForCards,
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
                                            .then(() => {
                                                this._element.remove()
                                                this._element = null;
                                                popupDelete.close()
                                            })
                                            .finally(() => popupDelete.renderLoading(false))

                                    }
                                },

                            )
                            popupDelete.setEventListeners()
                            popupDelete.open();

                        }

                },
                {
                    handleLike: function () {
                        api.like(element)
                            .then((res) => {

                                console.log(res);
                                console.log('пришел ответ')
                                this._buttonLike.classList.add("card__like-button_active")
                            })

                    }
                },
                {
                    removeLike: function () {
                        api.unLike(element)
                            .then((res) => {

                                console.log(res);
                                console.log('пришел ответ')
                                this._buttonLike.classList.remove("card__like-button_active")
                            })

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
                .then(() => popupAddForm.close())
                .finally(() => popupAddForm.renderLoading(false))


        }

})
popupAddForm.setEventListeners()
addButton.addEventListener('click', function () {
    cardValidation.resetValidation();
    popupAddForm.open()
});

const userInfo = new UserInfo({ nameElementSelector: '.profile__name', infoElementSelector: '.profile__stat' })

const profileValidation = new FormValidator(validationConfig, profileForm)
profileValidation.enableValidation()

const cardValidation = new FormValidator(validationConfig, addForm)
cardValidation.enableValidation()

editButton.addEventListener('click', function () {
    const { name, info } = userInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = info;
    popupProfileForm.open();
});

const popupProfileForm = new PopupWidthForm('.popup-profile', {
    submitCallback:
        function (inputValues) {
            userInfo.setUserInfo(inputValues);
            console.log(inputValues)
            api.editProfile(inputValues)
                .then(() => popupProfileForm.close())
                .finally(() => popupProfileForm.renderLoading(false))

        }
})

popupProfileForm.setEventListeners()


const popupWithImage = new PopupWithImage('.popup-photo');
popupWithImage.setEventListeners()

const popupAvatarForm = new PopupWidthForm('.popup-avatar', {
    submitCallback:
        function () {
            const avatarInput = document.querySelector('.popup__input_type_avatar').value
            api.editAvatar()
                .then(() => {document.querySelector('.profile__avatar').src = avatarInput})
                .finally(() => popupAvatarForm.renderLoading(false))

            popupAvatarForm.close()


        }

})

popupAvatarForm.setEventListeners()

const avatarButton = document.querySelector('.profile__avatar-button');
avatarButton.addEventListener('click', function () { popupAvatarForm.open() })