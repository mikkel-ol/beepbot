// TODO: This can maybe be done with self.$set in Vue.js


const StorageManager = {
  setToken(token) {
    localStorage.setItem("beepbot-token", JSON.stringify(token));
  },

  getToken() {
    return JSON.parse(localStorage.getItem("beepbot-token"));
  },

  destroyToken() {
    localStorage.removeItem("beepbot-token");
  },

  isExpired() {
    var token = this.getToken();
    var base64Url = token.split('.')[1];
    var decodedValue = JSON.parse(window.atob(base64Url));

    if (Date.now() / 1000 > decodedValue["exp"]) {
      this.destroyToken();
      return true;
    }
    return false;
  }
};

export default StorageManager;
