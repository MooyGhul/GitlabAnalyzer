const Authentication = {
    isLoggedIn: false,
    isValidUser: false,
    isValidToken: false,

    onAuthentication() {
        this.isLoggedIn = true;
    },

    onValidUser() {
        this.isValidUser = true;
    },

    onValidToken() {
        this.isValidToken = true;
    },

    isAuthenticated(){
      return this.isLoggedIn;
    }
};

export default Authentication;