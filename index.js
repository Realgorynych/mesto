let editButton = document.querySelector('.edit-button');
editButton.addEventListener('click', edit);

let popup = document.querySelector('.popup_off');


function edit() {
    popup.classList.remove('popup_off');
    popup.classList.add('popup_on');
}

let cross = document.querySelector('.cross-button');
cross.addEventListener('click', close);

function close() {
    popup.classList.remove('popup_on');
    popup.classList.add('popup_off');
}