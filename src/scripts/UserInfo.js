export default class {
    constructor({name, about, avatar}) {
        this._name = document.querySelector(name);
        this._status = document.querySelector(about);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._information.textContent,
            avatar: this._avatar.src
        }
    }


    setUserInfo(data) { //метод принимает новые данные пользователя и добавляет их на страницу
        this._name.textContent = data.name;
        this._status.textContent = data.about;
        this._avatar.style.backgroundImage = `url(${data.avatar})`;
    }
}
