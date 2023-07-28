export default class UserInfo {
    constructor({ nameElementSelector, infoElementSelector, avatarElementSelector }) {
        this._nameElement = document.querySelector(nameElementSelector); 
        this._infoElement = document.querySelector(infoElementSelector);
        this._avatarElementSelector = document.querySelector(avatarElementSelector)
    }
    getUserInfo() {
        return{
            name: this._nameElement.textContent,
            info: this._infoElement.textContent,
        }
    }
    // setUserInfo({job, name}) {
    setUserInfo({ name, about }) {
        this._nameElement.textContent = name
        this._infoElement.textContent = about
    }
}