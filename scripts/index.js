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