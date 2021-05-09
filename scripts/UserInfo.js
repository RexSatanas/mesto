export default class {
    constructor({userName, userStatus}) {
        this._userName = userName;
        this._userStatus = userStatus;
    }

    getUserInfo() {
        const userInfo = {};
        userInfo.name = document.querySelector(this._userName).textContent;
        userInfo.status = document.querySelector(this._userStatus).textContent;
        return userInfo  //данные пользователя - подставить в форму при открытии
    }


    setUserInfo(userNameInput, userStatusInput) {
        document.querySelector(this._userName).textContent = userNameInput;
        document.querySelector(this._userStatus).textContent = userStatusInput;
    }
}
