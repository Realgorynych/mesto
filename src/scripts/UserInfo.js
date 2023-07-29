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
    setUserInfo({ name, about }) {
        this._nameElement.textContent = name
        this._infoElement.textContent = about
    }
    setUserAvatar(avatar) {
        this._avatarElementSelector.src = avatar
    }
    setID(id) {
        this._id = id
    }
}