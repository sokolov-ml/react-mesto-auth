class Auth {
  constructor(options) {
    this._options = options;
    this._url = options.baseUrl;
    this._path = {
      default: '/',
      user: '/users/me',
      signup: '/signup',
      signin: '/signin',
    };
  }

  _fetch(path, method = 'GET', body) {
    return fetch(`${this._options.baseUrl}${path}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      method: method,
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  signin(email, password) {
    return this._fetch(this._path.signin, 'POST', {
      email: email,
      password: password,
    }).then((data) => {
      localStorage.setItem('token', data.token);
      return data;
    });
  }

  signup(email, password) {
    return this._fetch(this._path.signup, 'POST', {
      email: email,
      password: password,
    });
  }

  checkCurrentToken() {
    return this._fetch(this._path.user);
  }
}

const auth = new Auth({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  baseUrl: 'https://auth.nomoreparties.co',
});

export default auth;
