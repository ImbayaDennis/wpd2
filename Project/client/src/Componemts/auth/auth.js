class Auth{
    constructor(){
        this.authenticated = false;
    }

    logout(){
        localStorage.removeItem('token');
    }

    isAuthenticated(){
        return localStorage.getItem('token');
    }
}

export default new Auth();