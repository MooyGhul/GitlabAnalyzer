import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { AdminUser } from '../mockInfo';
import App from '../App';
import styles from '../style/Login.module.css';

function Login() {
    const [user, setUser] = useState({name:'', password:''});

    const login = user => {
        console.log({user});

        if(user.name === AdminUser.username && user.password === AdminUser.password) {
            ReactDOM.render(
            <React.StrictMode>
                <App />
              </React.StrictMode>,
              document.getElementById('root')
            );
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
                    <input type ='text' onChange={e=> setUser({...user, name: e.target.value})} />
                </label>
                <label className={styles.label}>
                    Password
                    <input type ='password' onChange={e=> setUser({...user, password: e.target.value})} />
                </label>
                    <button className={styles.button} type ='submit'>
                        Login
                    </button>
            </form>
        </div>
    )
}

export default Login;