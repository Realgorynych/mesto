export default class Api {
    constructor(options) {
        this._url = options.baseUrl
        this._headers = options.headers
    }

    _getCheck(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    };

    _request(url, options) {
        return fetch(url, options).then(res => this._getCheck(res))
    }

    getUser() {
        return this._request(`${this._url}users/me`, {
            method: 'GET',
            headers: this._headers
        })
    }

    getCards() {
        return this._request(`${this._url}cards`,
            {
                method: 'GET',
                headers: this._headers
            })
    }

    postCard(inputValues) {
        return this._request(`${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: inputValues.name,
                link: inputValues.link
            })
        })
    }

    editProfile(userData) {
        return this._request(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
              })
        })
    }

    editAvatar() {
        return this._request(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: document.querySelector('.popup__input_type_avatar').value
            }
            )
        })
    }

    unLike(element) {
        return this._request(`${this._url}cards/${element._id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
    }

    like(element) {
        return this._request(`${this._url}cards/${element._id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
    }

    deleteCard(element) {
        return this._request(`${this._url}cards/${element._id}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }
}