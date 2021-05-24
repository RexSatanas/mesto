export default class {
    constructor({address, token}) {
        this._address = address
        this._token = token
    }

    getUserData() {
        return fetch(`${this._address}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }

    getInitialCards() {
        return fetch(`${this._address}/cards`, {
            headers: {
                authorization: this._token
            }
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }
    setUserData({ name, about }) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }

    addCard({ name, link }) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }

    removeCard(cardId) {
        return fetch(`${this._address}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }

        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }

    toggleCardLike(cardId, like) {
        return fetch(`${this._address}/cards/like/${cardId}`, {
            method: like ? 'PUT' : 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }

    setUserAvatar(avatar) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar
            })
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }
}