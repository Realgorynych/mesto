const profileForm = document.querySelector('.popup__inputbox');
const addForm = document.querySelector('.popup-add__inputbox');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const nameProfile = document.querySelector('.profile__name');
const nameJob = document.querySelector('.profile__stat');
const editButton = document.querySelector('.profile__edit-button');
const profileCross = document.querySelector('.popup-profile__cross-button');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup-profile');
const popupPhoto = document.querySelector('.popup-photo');
const cardsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
const popupPhotoSrc = document.querySelector('.popup-photo__img');
const popupPhotoTitle = document.querySelector('.popup-photo__title');
let mestoName = document.querySelector('#mesto-name');
let mestoSrc = document.querySelector('#mesto-src');
const popupAdd = document.querySelector('.popup-add');
const addButton = document.querySelector('.profile__add-button');
const addCross = document.querySelector('.popup-add__cross-button');

function openPopup(a) {
    a.classList.add('popup_opened')
    console.log('open')
}

function closePopup(a) {
    a.classList.remove('popup_opened');
    console.log('close')
}

addCross.addEventListener('click', function () { closePopup(popupAdd) });
addButton.addEventListener('click', function () { openPopup(popupAdd) });
editButton.addEventListener('click', function () { openPopup(popupProfile) });
profileCross.addEventListener('click', function () { closePopup(popupProfile) });
profileForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    nameJob.textContent = jobInput.value;
    closePopup(popupProfile)
}

nameInput.value = nameProfile.textContent;
jobInput.value = nameJob.textContent;



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
//Я не понял как можно сделать функцию создания карточек по другому, пока все что получилось это добавить данные из формы в массив 
function createCard(item) {
    let cardsElement = cardTemplate.cloneNode(true);
    let cardTitle = cardsElement.querySelector('.card__title');
    let cardPhoto = cardsElement.querySelector('.card__photo');
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
        popupPhotoTitle.textContent = cardTitle.textContent;
    })
    mestoName.value = "";
    mestoSrc.value = "";

    return cardsElement
}



initialCards.forEach(function (element) {
    const cardsElement = createCard(element)
    cardsList.append(cardsElement);
});



addForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    createCard(initialCards.unshift({
        name: mestoName.value,
        link: mestoSrc.value
    }));
    closePopup(popupAdd);
    console.log(initialCards);
});


let photoCross = document.querySelector('.popup-photo__cross-button').addEventListener('click', function () {
    closePopup(popupPhoto);
})