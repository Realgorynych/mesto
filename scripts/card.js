class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);


        return cardElement;
    }

    _setEventListeners() {
        this._element
            .querySelector(".card__like-button")
            .addEventListener("click", () =>
                this._likeButton(this._element.querySelector(".card__like-button"))
            );


        this._element
            .querySelector(".card__trash-button")
            .addEventListener("click", () =>
                this._deleteButton(this._element)
            );

        this._element
            .querySelector(".card__photo")
            .addEventListener("click", () => this._openPopup());
    }

    _likeButton(likeButton) {
        likeButton.classList.toggle("card__like-button_active");
    }

    _deleteButton(cardElement) {
        cardElement.remove();
    }

    _openPopup() {
        popupPhotoSrc.src = this._link;
        popupPhotoSrc.alt = this._name;
        popupPhotoTitle.textContent = this._name;
        openPopup(popupPhoto);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();


        this._element.querySelector(".card__title").textContent = this._name;
        this._element.querySelector(".card__photo").src = this._link;
        this._element.querySelector(".card__photo").alt = this._name;

        return this._element;
    }
}

import { popupPhotoSrc, popupPhotoTitle, popupPhoto, openPopup } from './index.js'
export { Card };