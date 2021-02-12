import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { Token } from '../mockDataDir/mockToken'

// Note: Use token from mockToken

function UrlToken() {
    const [urlToken, setUrlToken] = useState({url:'https://csil-git1.cs.surrey.sfu.ca', token:''});
    const [errorMsg, setErrorMsg] = useState('');

    const nextHandler = event => {
        event.preventDefault();
        console.log({urlToken});

        if(urlToken.token === Token.token) {
            ReactDOM.render(
                <React.StrictMode>
                    <App />
                </React.StrictMode>,
                document.getElementById('root')
            );
        } else {
            setUrlToken({url:'https://csil-git1.cs.surrey.sfu.ca', token:''});
            setErrorMsg('Url or token is incorrect. Try Again.');
        }
    }

    return(
        <div>
            <form onSubmit={nextHandler}>
                <h3>{errorMsg}</h3>
                <label>
                    Enter GitLab Server URL
                    <input type ='url' value={urlToken.url} onChange={e=> setUrlToken({...urlToken, url: e.target.value})} />
                </label>
                <label>
                    Enter Token
                    <input type ='text' value={urlToken.token} onChange={e=> setUrlToken({...urlToken, token: e.target.value})} />
                </label>
                <button type ='submit'>
                    Next
                </button>
            </form>
        </div>
    )
}

export default UrlToken;