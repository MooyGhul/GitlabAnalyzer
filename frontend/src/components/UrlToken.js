import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Token } from '../mockDataDir/mockToken';
import Authentication from "../Authentication";
import Header from "./Header";

// Note: Use token from mockToken
const urlString = 'https://csil-git1.cs.surrey.sfu.ca';

function UrlToken() {
    const history = useHistory();
    const [urlToken, setUrlToken] = useState({url: urlString, token:''});
    const [errorMsg, setErrorMsg] = useState('');
    const [loginToken, setLoginToken] = useState('');

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
            history.push('/projectList');
        } else {
            setUrlToken({url: urlString, token:''});
            setErrorMsg('Incorrect url or token. Please try again.');
        }
    }

    const addLoginToken = () => {
        console.log(window.location.href);
        const data = new URLSearchParams(window.location.search)
        console.log(data.get('ticket'))
        setLoginToken(data.get('ticket'))
    }

    const nextHandler = event => {
        event.preventDefault();
        addLoginToken();
        checkToken();
    }

    return(
        <div>
            <Header pageTitle="Gitlab Analyzer" />
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