const Authentication = {
    isLoggedIn: window.localStorage.getItem('isLoggedIn') === 'true',

    onAuthentication() {
        this.isLoggedIn = true;
        window.localStorage.setItem('isLoggedIn', 'true');
    },

    onLogout() {
        this.isLoggedIn = false;
        window.localStorage.setItem('isLoggedIn', 'false');
    },

    isAuthenticated(){
      return this.isLoggedIn;
    }
};

export default Authentication;