import Popup from "./Popup.js";
export default class PopupWithImage extends Popup{
    constructor(popupSelector, photo){
        super(popupSelector);
        this._src = document.querySelector('.popup-photo__img');
        this._imageSrc = photo;
    }
    open(){
        this._src.src = this._imageSrc
        super.open()
    }
}

// Создайте класс PopupWithImage
// Создайте класс PopupWithImage, который наследует от Popup. Этот класс должен перезаписывать родительский метод open.
// В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.