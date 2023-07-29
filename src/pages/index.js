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
        console.log(userData)
        // userInfo.setUserInfo(userData)
        // console.log(userData)
        // document.querySelector('.profile__avatar').src = userData.avatar;
        userInfo.setUserAvatar(userData.avatar)
        userInfo.setID(userData._id)
        cards.forEach((item) => cardsList.renderItem(item));
    })
    .catch((err) => console.log('ошибка:' + err))

const arrForCards = []

const cardsList = new Section(
    {
        items: arrForCards,
        renderer: (element) => {
            const card = new Card(element, "#card-template", {
                handleOpenPopup: (name, link) => {
                    popupWithImage.open(name, link)
                    console.log(element.likes)
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
                                            .catch((err) => console.log('ошибка:' + err))
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
                            .then(() => {
                                this.putLike()
                                console.log(element)
                            })
                            .catch((err) => console.log('ошибка:' + err))
                    }
                },
                {
                    removeLike: function () {
                        api.unLike(element)
                            .then(() => {
                                this.delLike()
                            })
                            .catch((err) => console.log('ошибка:' + err))

                    }
                },
                {
                    likeCheck: function () {
                        const likes = element.likes
                        const userinfo = userInfo.getUserData()
                        return likes.map((users) => users._id).includes(userinfo._id)
                    }
                },
                {
                    userInfo: userInfo.getUserData(),
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
            console.log(inputValues)
            api.postCard(inputValues)
                .then(() => {
                    cardsList.renderItem(inputValues);
                    popupAddForm.close()
                })
                .catch((err) => console.log('ошибка:' + err))
                .finally(() => popupAddForm.renderLoading(false))


        }

})
popupAddForm.setEventListeners()
addButton.addEventListener('click', function () {
    cardValidation.resetValidation();
    popupAddForm.open()
});

const userInfo = new UserInfo({ nameElementSelector: '.profile__name', infoElementSelector: '.profile__stat', avatarElementSelector: '.profile__avatar' })

const profileValidation = new FormValidator(validationConfig, profileForm)
profileValidation.enableValidation()

const cardValidation = new FormValidator(validationConfig, addForm)
cardValidation.enableValidation()

editButton.addEventListener('click', function () {
    const { name, about } = userInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = about;
    popupProfileForm.open();
});

const popupProfileForm = new PopupWidthForm('.popup-profile', {
    submitCallback:
        function (inputValues) {
            console.log(inputValues.about)
            
            api.editProfile(inputValues)
                .then(() => {
                    popupProfileForm.close()
                    userInfo.setUserInfo({
                        name: inputValues.name,
                        about: inputValues.about
                    });
                })
                .catch((err) => console.log('ошибка:' + err))
                .finally(() => popupProfileForm.renderLoading(false))

        }
})

popupProfileForm.setEventListeners()


const popupWithImage = new PopupWithImage('.popup-photo');
popupWithImage.setEventListeners()

const popupAvatarForm = new PopupWidthForm('.popup-avatar', {
    submitCallback:
        function (inputValues) {
            api.editAvatar()
                .then(() => {
                    userInfo.setUserAvatar(inputValues.link)
                    popupAvatarForm.close()
                })
                .catch((err) => console.log('ошибка:' + err))
                .finally(() => popupAvatarForm.renderLoading(false))
        }

})

popupAvatarForm.setEventListeners()

const avatarButton = document.querySelector('.profile__avatar-button');
avatarButton.addEventListener('click', function () { popupAvatarForm.open() })

const avatarValidation = new FormValidator(validationConfig, document.querySelector('.popup-avatar__inputbox'))
avatarValidation.enableValidation()