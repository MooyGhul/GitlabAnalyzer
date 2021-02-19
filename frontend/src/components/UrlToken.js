import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Token } from '../mockDataDir/mockToken';
// import { setTokenStatus } from "../LoginStatus";

// Note: Use token from mockToken
const urlString = 'https://csil-git1.cs.surrey.sfu.ca';

function UrlToken() {
    const history = useHistory();
    const [urlToken, setUrlToken] = useState({url: urlString, token:''});
    const [errorMsg, setErrorMsg] = useState('');
    const [validToken, setValidToken] = useState(false);

    const authenticateToken  = () => {
        if(urlToken.token === Token.token) {
            return true;
        } else {
            return false;
         }
    }

    const checkToken = urlToken => {

        if(authenticateToken()) {
            history.push('/overview');
        } else {
            setUrlToken({url: urlString, token:''});
            setErrorMsg('Url or token is incorrect. Try Again.');
        }
    }

    const nextHandler = event => {
        event.preventDefault();
        console.log({urlToken});

        checkToken(urlToken);
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
    )
}

export default UrlToken;