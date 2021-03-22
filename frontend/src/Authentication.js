const Authentication = {
    isLoggedIn: window.localStorage.getItem('isLoggedIn') === 'true',
    isValidUser: false,
    isValidToken: false,

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