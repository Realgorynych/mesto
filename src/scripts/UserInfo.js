export default class UserInfo {
    constructor({ nameElementSelector, infoElementSelector, avatarElementSelector }) {
        this._nameElement = document.querySelector(nameElementSelector);
        this._infoElement = document.querySelector(infoElementSelector);
        this._avatarElementSelector = document.querySelector(avatarElementSelector)
    }
    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._infoElement.textContent,
        }
    }

    getUserData() {
        return {
            name: this._nameElement.textContent,
            about: this._infoElement.textContent,
            avatar: this._avatarElementSelector.src,
            _id: this._id,
            cohort: this._cohort
        }
    }

    // setUserInfo({job, name}) {
    setUserInfo({ name, about }) {
        this._nameElement.textContent = name
        this._infoElement.textContent = about
    }
    setUserAvatar(avatar) {
        this._avatarElementSelector.src = avatar
    }
    setID(id){
        this._id = id
    }
}

//{name: 'Ода Нобунага', about: 'Демон-повелитель Шестого Неба', avatar: 'https://i.pinimg.com/originals/91/3d/7d/913d7d7591e4b0f9c6e8c1da502907fd.jpg', _id: '93b7898903e1fcb7088eea73', cohort: 'cohort-71'}