class Api {
  constructor(options) {
    this._options = options;
    this._url = options.baseUrl;
    this._token = options.headers.authorization;
    this._path = {
      user: '/users/me',
      cards: '/cards',
      avatar: '/users/me/avatar',
    };
  }

  _fetch(path, method = 'GET', body) {
    return fetch(`${this._options.baseUrl}${path}`, {
      headers: this._options.headers,
      method: method,
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getCurrentUserInfo() {
    return this._fetch(this._path.user);
  }

  updateCurrentUserInfo(newName, newAbout) {
    return this._fetch(this._path.user, 'PATCH', {
      name: newName,
      about: newAbout,
    });
  }

  updateCurrentUserPhoto(newImageUrl) {
    return this._fetch(this._path.avatar, 'PATCH', {
      avatar: newImageUrl,
    });
  }

  getCards() {
    return this._fetch(this._path.cards);
  }

  addNewCard(name, link) {
    return this._fetch(this._path.cards, 'POST', {
      name: name,
      link: link,
    });
  }

  removeCard(cardId) {
    return this._fetch(`${this._path.cards}/${cardId}`, 'DELETE');
  }

  setLikeCardOn(cardId) {
    return this._fetch(`${this._path.cards}/likes/${cardId}`, 'PUT');
  }

  setLikeCardOff(cardId) {
    return this._fetch(`${this._path.cards}/likes/${cardId}`, 'DELETE');
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '23bbe762-c214-4ce4-b9fd-b26b33fa43ee',
    'Content-Type': 'application/json',
  },
});

export default api;
