import { observable, action, reaction } from 'mobx';

class AuthStore {
  @observable appName = 'ITS-FE';
  @observable token = window.localStorage.getItem('jwt');

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem('jwt', token);
        } else {
          window.localStorage.removeItem('jwt');
        }
      }
    );
  }

  @action setToken(token) {
    this.token = token;
  }

  @action logout() {
    this.token = '';
    return Promise.resolve();
  }
}

export default new AuthStore();
