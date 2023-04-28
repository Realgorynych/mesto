const profileForm = document.querySelector('.popup__inputbox');
const addForm = document.querySelector('.popup-add__inputbox');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const nameProfile = document.querySelector('.profile__name');
const nameJob = document.querySelector('.profile__stat');
const editButton = document.querySelector('.profile__edit-button');
const profileCross = document.querySelector('.popup-profile__cross-button');
const popupProfile = document.querySelector('.popup-profile');
const popupPhoto = document.querySelector('.popup-photo');
const cardsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
const popupPhotoSrc = document.querySelector('.popup-photo__img');
const popupPhotoTitle = document.querySelector('.popup-photo__title');
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

function openPopup(popup) {
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', addEscapeClose)
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', addEscapeClose)
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
const photoCross = document.querySelector('.popup-photo__cross-button').addEventListener('click', function () { closePopup(popupPhoto) })

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

function createCard(item) {
    const cardsElement = cardTemplate.cloneNode(true);
    const cardTitle = cardsElement.querySelector('.card__title');
    const cardPhoto = cardsElement.querySelector('.card__photo');
    cardsElement.querySelector('.card__title').textContent = item.name;
    cardPhoto.src = item.link;
    cardPhoto.alt = item.link;
    cardsElement.querySelector('.card__like-button').addEventListener('click', function (e) {
        e.target.classList.toggle('card__like-button_active');
    })
    cardsElement.querySelector('.card__trash-button').addEventListener('click', function (e) {
        e.target.closest('.card').remove();
    })
    cardPhoto.addEventListener('click', function () {
        openPopup(popupPhoto);
        popupPhotoSrc.src = cardPhoto.src;
        popupPhotoSrc.alt = cardTitle.textContent;
        popupPhotoTitle.textContent = cardTitle.textContent;

    })

    return cardsElement
}

initialCards.forEach(function (element) {
    const cardsElement = createCard(element)
    cardsList.append(cardsElement);
});

addForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const newCard = createCard({
        name: mestoName.value,
        link: mestoSrc.value
    });
    cardsList.prepend(newCard);
    closePopup(popupAdd);
    evt.target.reset()
});

function escapeClose(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function addEscapeClose(evt) {
    escapeClose(evt)
}

function bgClose(evt, popupName) {
    if (evt.target === popupName) {
        closePopup(popupName)
    }
}

popupAdd.addEventListener('click', function (evt) { bgClose(evt, popupAdd) })
popupPhoto.addEventListener('click', function (evt) { bgClose(evt, popupPhoto) })
popupProfile.addEventListener('click', function (evt) { bgClose(evt, popupProfile) })