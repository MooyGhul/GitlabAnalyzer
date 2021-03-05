import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AdminUser } from '../mockDataDir/mockAdminUser';
import Authentication from '../Authentication';
import styles from '../style/Login.module.css';
import Header from './Header'

//Note: Use AdminUser's username and password from mockInfo to login
function Login() {
    const state = {
        loginMethod: 2
    };
    const history = useHistory();
    const [user, setUser] = useState({name:'', password:''});
    const [errorMsg, setErrorMsg] = useState('');

    const authenticateUser  = () => {
        if(user.name === AdminUser.username && user.password === AdminUser.password) {
            Authentication.onValidUser();
            return true;
        } else {
            return false;
        }
    }

    const login = () => {
        if(authenticateUser()){
            history.push('/token');
        } else {
            setUser({name:'', password: ''});
            setErrorMsg('Incorrect username or password. Please try again.');
        }
    }


    const loginHandler = event => {
        event.preventDefault();
        if(state.loginMethod===1){
            login(user);
        }
        else if(state.loginMethod===2){
            window.location = 'https://cas.sfu.ca/cas/login?service=http://cmpt373-1211-14.cmpt.sfu.ca:8080/token';
        }
    }

    return(
        <div>
            <Header pageTitle="Gitlab Analyzer" />
            <h2>Login</h2>
            <form className={styles.form} onSubmit={loginHandler}>
                <h3>{errorMsg}</h3>
                <label className={styles.label}>
                    Username
                    <input type ='text' value={user.name} onChange={e=> setUser({...user, name: e.target.value})} />
                </label>
                <label className={styles.label}>
                    Password
                    <input type ='password' value={user.password} onChange={e=> setUser({...user, password: e.target.value})} />
                </label>
                    <button className={styles.button} onClick={() => (state.loginMethod = 1)} type ='submit'>
                        Login
                    </button>
                    <button className={styles.button} onClick={() => (state.loginMethod = 2)} type ='submit'>
                        Login with SSO
                    </button>
            </form>
        </div>
    );
}

export default Login;


/*
1. Click login
2. Redirect to CAS
3. Wait for CAS response and parameter
4. Store the ticket number into ticket list

*/