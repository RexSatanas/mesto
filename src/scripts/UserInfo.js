export default class {
    constructor({nameUserSelector, statusUserSelector}) {
        this._name = document.querySelector(nameUserSelector);
        this._status = document.querySelector(statusUserSelector);
    }

    getUserInfo() {
        const userInfo = {};
        userInfo.name = this._name.textContent;
        userInfo.status = this._status.textContent;
        return userInfo
    }

    // принимает новые данные пользователя и добавляет их на страницу в ф.-колбэке
    setUserInfo(userNameInInput, userStatusInInput) {
        this._name.textContent = userNameInInput;
        this._status.textContent = userStatusInInput;
    }
}
