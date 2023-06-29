export default class UserInfo {
    constructor({ nameElementSelector, infoElementSelector }) {
        this._nameElement = document.querySelector(nameElementSelector); 
        this._infoElement = document.querySelector(infoElementSelector);
    }
    getUserInfo() {
        return{
            name: this._nameElement.textContent,
            info: this._infoElement.textContent
        }
    }
    setUserInfo({job, name}) {
        this._nameElement.textContent = name
        this._infoElement.textContent = job
    }
}