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

        })
        userInfo.setUserAvatar(userData.avatar)
        userInfo.setID(userData._id)
        cards.forEach((item) => cardsList.renderItem(item));
    })
    .catch((err) => console.log('ошибка:' + err))

const arrForCards = []

const userInfo = new UserInfo({ nameElementSelector: '.profile__name', infoElementSelector: '.profile__stat', avatarElementSelector: '.profile__avatar' })
const userIndificator = userInfo.getUserData()

const submitDelete = function (element, card) {
    popupDelete.setButtonText('Сохранение...')
    api.deleteCard(element)
        .then(() => {
            card.remove()
            popupDelete.close()
        })
        .catch((err) => console.log('ошибка:' + err))
        .finally(() => popupDelete.setButtonText('Да'))
}

const popupDelete = new PopupWidthForm('.popup-delete',
    {
        submitCallback: (element, card) => {
            submitDelete(element, card)


        }
    },

)
popupDelete.setEventListeners()

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
                            popupDelete.open();
                            popupDelete.changeSubmitForm(() => {
                                submitDelete(element, this.element);
                            })

                        }

                },
                {
                    handleLike: function () {
                        console.log(element)
                        api.like(element)
                            .then(() => {
                                this.putLike()
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
            popupAddForm.setButtonText('Сохранение...')
            api.postCard(inputValues)
                .then((res) => {
                    cardsList.renderItem(
                        {
                            likes: res.likes,
                            _id: res._id,
                            owner: res.owner,
                            name: inputValues.name,
                            link: inputValues.link
                        }
                    );
                    popupAddForm.close()
                    console.log(res)
                })
                .catch((err) => console.log('ошибка:' + err))
                .finally(() => popupAddForm.setButtonText('Сохранить'))



        }

})
popupAddForm.setEventListeners()
addButton.addEventListener('click', function () {
    cardValidation.resetValidation();
    popupAddForm.open()
});


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
            popupProfileForm.setButtonText('Сохранение...')
            api.editProfile(inputValues)
                .then(() => {
                    popupProfileForm.close()
                    userInfo.setUserInfo({
                        name: inputValues.name,
                        about: inputValues.about
                    });
                })
                .catch((err) => console.log('ошибка:' + err))
                // .finally(() => popupProfileForm.renderLoading(false))
                .finally(() => popupProfileForm.setButtonText('Cохранить'))


        }
})

popupProfileForm.setEventListeners()


const popupWithImage = new PopupWithImage('.popup-photo');
popupWithImage.setEventListeners()

const popupAvatarForm = new PopupWidthForm('.popup-avatar', {
    submitCallback:
        function (inputValues) {
            popupAvatarForm.setButtonText('Сохранение...')
            // popupAvatarForm.renderLoading(true)
            api.editAvatar()
                .then(() => {
                    userInfo.setUserAvatar(inputValues.link)
                    popupAvatarForm.close()
                })
                .catch((err) => console.log('ошибка:' + err))
                // .finally(() => popupAvatarForm.renderLoading(false))
                .finally(() => popupAvatarForm.setButtonText('Сохранить'))

        }

})

popupAvatarForm.setEventListeners()

const avatarButton = document.querySelector('.profile__avatar-button');
avatarButton.addEventListener('click', function () {
    popupAvatarForm.open();
    avatarValidation.resetValidation()
})

const avatarValidation = new FormValidator(validationConfig, document.querySelector('.popup-avatar__inputbox'))
avatarValidation.enableValidation()