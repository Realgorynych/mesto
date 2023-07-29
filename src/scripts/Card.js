import { data } from "autoprefixer";

class Card {
    constructor(data, cardSelector, { handleOpenPopup }, { handleDelete }, { handleLike }, { removeLike }, { likeCheck }, { userInfo }) {
        this._name = data.name;
        this._link = data.link;
        this._like = data.likes;
        this._owner = data.owner._id;


        this._cardSelector = cardSelector;
        this._handleOpenPopup = handleOpenPopup
        this._handleDeletePopup = handleDelete
        this._handleLike = handleLike
        this._removeLike = removeLike
        this._likeCheck = likeCheck
        this._userInfo = userInfo._id
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        this._buttonLike
            .addEventListener("click", () =>
                this._toggleLike()
            );


        this._element
            .querySelector(".card__trash-button")
            .addEventListener("click", () => {
                this._deletePopup()
            }
            );


        this._cardImage.addEventListener("click", () => this._openPopup());

    }

    _toggleLike() {
        if (this._buttonLike.classList.contains('card__like-button_active')) {
            this._removeLike()
        }
        else {
            this._handleLike()
        }
    }

    putLike() {
        this._buttonLike.classList.add("card__like-button_active")
        this._likeSum.textContent = this._like.length + 1
    }

    delLike() {
        this._buttonLike.classList.remove("card__like-button_active")
        this._likeSum.textContent = this._like.length
    }

    _deleteCard() {
        this._element.remove()
        this._element = null;
    }

    _openPopup() {
        this._handleOpenPopup(this._name, this._link);
    }

    _deletePopup() {
        this._handleDeletePopup()
    }

    _isLiked() {
        if (this._likeCheck()) {
            this._buttonLike.classList.add("card__like-button_active")

        }
    }

    _disableTrashButton() {

        if (this._userInfo !== this._owner) {
            this._trashButton = this._element.querySelector('.card__trash-button')
            this._trashButton.setAttribute('disabled', 'disabled');
            this._trashButton.classList.add('card__trash-button_disable')
        }
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".card__photo")
        this._buttonLike = this._element.querySelector('.card__like-button')
        this._likeSum = this._element.querySelector('.like-calc')
        this._setEventListeners();


        this._element.querySelector(".card__title").textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;


        this._likeSum.textContent = this._like.length
        this._isLiked()
        this._disableTrashButton()

        return this._element;
    }



}

export { Card };