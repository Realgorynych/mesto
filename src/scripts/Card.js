class Card {
    constructor(data, cardSelector, { handleOpenPopup }, {handleDelete}, {handleLike}, {removeLike}) {
        this._name = data.name;
        this._link = data.link;
        this._like = data.likes;

        this._cardSelector = cardSelector;
        this._handleOpenPopup = handleOpenPopup
        this._handleDeletePopup = handleDelete
        this._handleLike = handleLike
        this._removeLike = removeLike
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
                // document.querySelector('.popup-delete').classList.add('popup_opened');
                // document.querySelector('#save-delete').addEventListener('click', console.log(this._element) )
                this._deletePopup()
                // this._deleteCard()
            }
            );
    

        this._cardImage.addEventListener("click", () => this._openPopup());

    }

    _toggleLike() {
        // this._buttonLike.classList.toggle("card__like-button_active");
        // this._handleLike()
        if(this._buttonLike.classList.contains('card__like-button_active')){
            // this._buttonLike.classList.remove("card__like-button_active")
            this._removeLike()
        }
        else{
            // this._buttonLike.classList.add("card__like-button_active")
            this._handleLike()
        }
    }

    _deleteCard() {
        this._element.remove()
        this._element = null;
        // const trashButtons = document.querySelectorAll('.card__trash-button');
        // trashButtons.forEach(button => console.log(button))


    }

    _openPopup() {
        this._handleOpenPopup(this._name, this._link);
    }

    _deletePopup() {
        this._handleDeletePopup()
    }


    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".card__photo")
        this._buttonLike = this._element.querySelector('.card__like-button')
        this._likeSum = this._buttonLike.querySelector('.like-calc')
        this._setEventListeners();

        this._element.querySelector(".card__title").textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._likeSum.textContent = this._like.length


        return this._element;
    }
}

export { Card };