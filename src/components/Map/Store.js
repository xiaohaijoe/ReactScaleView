const Store = {
  // _state: {
  //   maps: new WeakMap(),
  // },
  _state: {},
  eventList: {},
  set(key, value) {
    // this._state[key] = value;
    this._state[key] = value;
  },
  get(key) {
    return this._state[key];
    // return this._state[key];
  },
  on(event, fn) {
    const list = this.eventList[event] || [];
    const ff = list.find(e => e === fn);
    if (!ff) {
      list.push(fn);
    }
    this.eventList[event] = list;
  },
  off(event, fn) {
    const list = this.eventList[event] || [];
    const i = list.findIndex(e => e === fn);
    if (i > -1) {
      list.splice(i, 1);
      this.eventList[event] = list;
    }
  },
  trigger(event) {
    const list = this.eventList[event] || [];
    list.forEach(fn => fn());
  },
};

export default Store;
