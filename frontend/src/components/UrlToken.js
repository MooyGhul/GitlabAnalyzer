import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

function UrlToken() {
    const [urlToken, setUrlToken] = useState({url:'', token:''});

    const nextHandler = event => {
        event.preventDefault();
        console.log({urlToken});

        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            document.getElementById('root')
        );

    }

    return(
        <div>
            <form onSubmit={nextHandler}>
                <label>
                    Enter GitLab Server URL
                    <input type ='url' onChange={e=> setUrlToken({...urlToken, url: e.target.value})} />
                </label>
                <label>
                    Enter Token
                    <input type ='text' onChange={e=> setUrlToken({...urlToken, token: e.target.value})} />
                </label>
                <button type ='submit'>
                    Next
                </button>
            </form>
        </div>
    )
}

export default UrlToken;