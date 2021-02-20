import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AdminUser } from '../mockDataDir/mockAdminUser';
import Authentication from '../Authentication';
import styles from '../style/Login.module.css';

//Note: Use AdminUser's username and password from mockInfo to login
function Login() {
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
        console.log({user});
        login(user);
    }

    return(
        <div>
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
                    <button className={styles.button} type ='submit'>
                        Login
                    </button>
            </form>
        </div>
    );
}

export default Login;