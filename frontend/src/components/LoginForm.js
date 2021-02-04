import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { AdminUser } from '../mockInfo';
import App from '../App';

function LoginForm() {
    const [user, setUser] = useState({name:'', password:''});

    const login = user => {
        console.log({user});

        if(user.name === AdminUser.username && user.password === AdminUser.password) {
            console.log('Logged in!');

            ReactDOM.render(
            <React.StrictMode>
                console.log('Entered');
                <App />
              </React.StrictMode>,
              document.getElementById('root')
            );
        }
    }

    const loginHandler = event => {
        event.preventDefault();
        console.log({user});

        login(user);
    }

    return(
        <div>
            <h1> Login </h1>
            <form onSubmit={loginHandler}>
                <label>
                    <p>Username</p>
                    <input type ='text' onChange={e=> setUser({...user, name: e.target.value})} />
                </label>
                <label>
                    <p>Password</p>
                    <input type ='password' onChange={e=> setUser({...user, password: e.target.value})} />
                </label>
                <div>
                    <button type ='submit'>
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;