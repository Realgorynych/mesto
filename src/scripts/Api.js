export default class Api {
    constructor(options) {
        this._url = options.baseUrl
        this._headers = options.headers
    }

    _getCheck(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    };

    userInfo() {
        fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(res => res.json())
            .then((data) => {
                return (data)
            })

    }


    getUser() {

        return fetch('https://mesto.nomoreparties.co/v1/cohort-71/users/me', {

            method: 'GET',
            headers: this._headers
        }
        )
            .then((res) => this._getCheck(res))
            .then((data) => {
                document.querySelector('.profile__name').textContent = data.name;
                document.querySelector('.profile__stat').textContent = data.about;
                document.querySelector('.profile__avatar').src = data.avatar;
            })
    }

    postCard(inputValues) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: inputValues.name,
                link: inputValues.link
            })
        })
            .then((res) => this._getCheck(res))
            .finally(() => this._load(false, '#saveAdd'))
    }

    editProfile(inputValues) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: inputValues.name,
                about: inputValues.job
            })
        })
            .then((res) => this._getCheck(res))
            .finally(()=> this._load(false, '#editProfile'))
    }

    editAvatar() {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: document.querySelector('.popup__input_type_avatar').value
            }
            )
        }
        )
            .then((res) => this._getCheck(res))
            .finally(()=> this._load(false, '#saveAvatar'))
    }


    unLike(element) {
        return fetch(`${this._url}cards/${element._id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        }
        )
            .then((res) => this._getCheck(res))
    }

    like(element) {
        console.log(`${this._url}cards/${element._id}/likes`)
        return fetch(`${this._url}cards/${element._id}/likes`, {
            method: 'PUT',
            headers: this._headers
        }
        )
            .then((res) => this._getCheck(res))
    }

    deleteCard(element) {
        return fetch(`${this._url}cards/${element._id}`, {
            method: 'DELETE',
            headers: this._headers
        }
        )
    }

    _load(isLoading, elementSelector) {
        if (isLoading) {
            document.querySelector(`${elementSelector}`).textContent = 'Сохранение...'
        }
        else {
            document.querySelector(`${elementSelector}`).textContent = 'Сохранить'
        }
    }
}