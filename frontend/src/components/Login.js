import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AdminUser } from '../mockDataDir/mockAdminUser';
// import { setLoginStatus } from "../LoginStatus";
import styles from '../style/Login.module.css';

//Note: Use AdminUser's username and password from mockInfo to login
function Login() {
    const history = useHistory();
    const [user, setUser] = useState({name:'', password:''});
    const [validUser, setValidUser] = useState(false);

    const getUserStatus  = () => {
        if(user.name === AdminUser.username && user.password === AdminUser.password) {
            return true;
        }
        return false;
    }

    const login = user => {
        console.log({user});

        setValidUser(getUserStatus());
        // setLoginStatus(validUser);
        if(validUser) {
            history.push('/token');
        } else {
            setUser({name:'', password: ''});
        }
    }

    const loginHandler = event => {
        event.preventDefault();
        login(user);
    }

    return(
        <div>
            <h2> Login </h2>
            <form className={styles.form} onSubmit={loginHandler}>
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
    )
}

export default Login;