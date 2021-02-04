import React from 'react';

function LoginForm() {

    return(
    <div>
        <form>
            <label>
                <p>Username</p>
                <input type ='text' />
            </label>
            <label>
                <p>Password</p>
                <input type ='password' />
            </label>
            <div>
               <button className='loginBtn' type ='submit'>
                    Login
               </button>
            </div>
        </form>
    </div>
    )
}

export default LoginForm;