import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Token } from '../mockDataDir/mockToken';
import Authentication from "../Authentication";

// Note: Use token from mockToken
const urlString = 'https://csil-git1.cs.surrey.sfu.ca';

function UrlToken() {
    const history = useHistory();
    const [urlToken, setUrlToken] = useState({url: urlString, token:''});
    const [errorMsg, setErrorMsg] = useState('');

    const authenticateToken  = () => {
        if(urlToken.token === Token.token) {
            Authentication.onValidToken();
            Authentication.onAuthentication();
            return true;
        } else {
            return false;
         }
    }

    const checkToken = () => {
        if(authenticateToken()) {
            history.push('/overview');
        } else {
            setUrlToken({url: urlString, token:''});
            setErrorMsg('Incorrect url or token. Please try again.');
        }
    }

    const nextHandler = event => {
        event.preventDefault();
        console.log({urlToken});
        checkToken();
    }

    return(
        <div>
            <form onSubmit={nextHandler}>
                <h3>{errorMsg}</h3>
                <label>
                    Enter GitLab Server URL
                    <input type ='url' value={urlToken.url}
                        onChange={e=> setUrlToken({...urlToken, url: e.target.value})} />
                </label>
                <label>
                    Enter Token
                    <input type ='text' value={urlToken.token}
                        onChange={e=> setUrlToken({...urlToken, token: e.target.value})} />
                </label>
                <button type ='submit'>
                    Next
                </button>
            </form>
        </div>
    );
}

export default UrlToken;