let formElement = document.querySelector('.popup__inputbox');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let nameProfile = document.querySelector('.profile__name');
let nameJob = document.querySelector('.profile__stat');
let editButton = document.querySelector('.profile__edit-button');
let cross = document.querySelector('.popup__cross-button');
let popup = document.querySelector('.popup');



function edit() {
    popup.classList.add('popup_opened');
    nameInput.value = nameProfile.textContent;
    jobInput.value = nameJob.textContent;
}

function close() {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    nameJob.textContent = jobInput.value;
    close();
}

cross.addEventListener('click', close);
editButton.addEventListener('click', edit);
formElement.addEventListener('submit', handleFormSubmit);


let popupAdd = document.querySelector('.popup-add');
let addButton = document.querySelector('.profile__add-button');
let addCross = document.querySelector('.popup-add__cross-button');

addCross.addEventListener('click', closeAdd);
addButton.addEventListener('click', openAdd);

function openAdd() {
    popupAdd.classList.add('popup-add_opened');
}

function closeAdd() {
    popupAdd.classList.remove('popup-add_opened');
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


let popupPhoto = document.querySelector('.popup-photo');

let cardsList = document.querySelector('.cards');
let cardTemplate = document.querySelector('#card-template').content;
let popupPhotoSrc = document.querySelector('.popup-photo__img');
let popupPhotoTitle = document.querySelector('.popup-photo__title');

initialCards.forEach(function (element) {
    let cardsElement = cardTemplate.cloneNode(true);
    cardsElement.querySelector('.card__title').textContent = element.name;
    cardsElement.querySelector('.card__photo').src = element.link;
    cardsElement.querySelector('.card__like-button').addEventListener('click', function (e) {
        e.target.classList.toggle('card__like-button_active');
    })
    cardsElement.querySelector('.card__trash-button').addEventListener('click', function (e) {
        e.target.closest('.card').remove();
    })
    cardsElement.querySelector('.card__photo').addEventListener('click', function(){
        popupPhoto.classList.toggle('popup-photo_opened');
        popupPhotoSrc.src = element.link;
        popupPhotoTitle.textContent = element.name;
        let photoCross = document.querySelector('.popup-photo__cross-button').addEventListener('click', function(){
            popupPhoto.classList.remove('popup-photo_opened');
        })
    })
    
    cardsList.append(cardsElement);
});



let mestoName = document.querySelector('#mesto-name');
let mestoSrc = document.querySelector('#mesto-src');

let addMesto = document.querySelector("#saveAdd").addEventListener('click', function (evt) {
    evt.preventDefault();
    let cardsElementAdd = cardTemplate.cloneNode(true);
    let cardSrc = cardsElementAdd.querySelector('.card__photo');
    let cardTitle = cardsElementAdd.querySelector('.card__title')
    cardsElementAdd.querySelector('.card__title').textContent = mestoName.value;
    cardsElementAdd.querySelector('.card__photo').src = mestoSrc.value;
    cardsElementAdd.querySelector('.card__like-button').addEventListener('click', function (e) {
        e.target.classList.toggle('card__like-button_active');
    })
    cardsElementAdd.querySelector('.card__trash-button').addEventListener('click', function (e) {
        e.target.closest('.card').remove();
    })
    cardsElementAdd.querySelector('.card__photo').addEventListener('click', function(){
        popupPhoto.classList.toggle('popup-photo_opened');
        popupPhotoSrc.src = cardSrc.src;
        popupPhotoTitle.textContent = cardTitle.textContent;
    })

    let photoCross = document.querySelector('.popup-photo__cross-button').addEventListener('click', function(){
        popupPhoto.classList.remove('popup-photo_opened');
    })
    mestoName.value="";
    mestoSrc.value="";
    cardsList.prepend(cardsElementAdd); 
    closeAdd()
});

