let editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', edit);

let popup = document.querySelector('.popup');


function edit() {
    popup.classList.add('popup_opened');
}

let cross = document.querySelector('.popup__cross-button');
cross.addEventListener('click', close);

function close() {
    popup.classList.remove('popup_opened');
}


let formElement = document.querySelector('.popup__inputbox');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let nameProfile = document.querySelector('.profile__name');
let nameJob = document.querySelector('.profile__stat');

nameInput.value = nameProfile.textContent;
jobInput.value = nameJob.textContent;

function handleFormSubmit (evt){
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    nameJob.textContent = jobInput.value;

    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);