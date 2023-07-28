export const profileForm = document.querySelector('.popup-profile__inputbox');
export const addForm = document.querySelector('.popup-add__inputbox');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');
export const editButton = document.querySelector('.profile__edit-button');
export const popupPhoto = document.querySelector('.popup-photo');
export const popupPhotoSrc = document.querySelector('.popup-photo__img');
export const popupPhotoTitle = document.querySelector('.popup-photo__title');
export const addButton = document.querySelector('.profile__add-button');
export const validationConfig = {
    formSelector: '.popup__inputbox',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input-error_active',
    errorClass: 'popup__input-error'
};