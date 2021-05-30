export default class {
    constructor({nameUserSelector, statusUserSelector, avatarUserSelector}) {
        this._name = document.querySelector(nameUserSelector);
        this._status = document.querySelector(statusUserSelector);
        this._avatar = document.querySelector(avatarUserSelector)
    }

    getUserInfo() {
        const userInfo = {};
        userInfo.name = this._name.textContent;
        userInfo.status = this._status.textContent;
        userInfo.avatar = this._userData.avatar;
        userInfo.id = this._userData._id;
        return userInfo
    }

    // принимает новые данные пользователя и добавляет их на страницу в ф.-колбэке
    setUserInfo(userData) {
        this._userData = userData;
        this._name.textContent = this._userData.name;
        this._status.textContent = this._userData.about;
        this._avatar.src = this._userData.avatar;
    }
}
