export default class {
    constructor({address, token, groupId}) {
        this._address = address
        this._token = token
        this._groupId = groupId
    }

    getUserData() {
        return fetch(`${this._address}/${this._groupId}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }

    getInitialCards() {
        return fetch(`${this._address}/${this._groupId}/cards`, {
            headers: {
                authorization: this._token
            }
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }
    setUserData({ name, about }) {
        return fetch(`${this._address}/${this._groupId}/users/me`, {
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
        return fetch(`${this._address}/${this._groupId}/cards`, {
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
        return fetch(`${this._address}/${this._groupId}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }

        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }

    toggleCardLike(cardId, like) {
        return fetch(`${this._address}/${this._groupId}/cards/like/${cardId}`, {
            method: like ? 'PUT' : 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }

    setUserAvatar(avatar) {
        return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
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