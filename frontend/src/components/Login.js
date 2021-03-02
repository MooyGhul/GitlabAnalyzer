import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AdminUser } from '../mockDataDir/mockAdminUser';
import Authentication from '../Authentication';
import styles from '../style/Login.module.css';
import Header from './Header'
import axios from 'axios';

const baseURL = "https://cas.sfu.ca/cas/login";
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

/*
// Causing CORS issue
    async function getAuthenticated(){
        const response =
          await axios.get(baseURL,
              { params: {service: 'http://cmpt373-1211-14.cmpt.sfu.ca:8080/login'}}

          )
        console.log(response.data)
        return true;
    }
*/
   /*
   // CORS issue again!
   const getAuthenticated = async () => {
    const response = await fetch(baseURL, {qs:{service: 'http://cmpt373-1211-14.cmpt.sfu.ca:8080/login'}});
    //const jsonData = await response.json();
    //setUserData(jsonData);
    console.log(response.data);
    return true;
  };*/

    const loginHandler = event => {
        event.preventDefault();
        window.location = 'https://cas.sfu.ca/cas/login?service=http://cmpt373-1211-14.cmpt.sfu.ca:8080/token';
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
                    <button className={styles.button} type ='submit'>
                        Login
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