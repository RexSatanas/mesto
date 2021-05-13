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


    setUserInfo(userNameInput, userStatusInput) {
        document.querySelector(this._name).textContent = userNameInput;
        document.querySelector(this._status).textContent = userStatusInput;
    }
}
