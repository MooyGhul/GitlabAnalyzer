import React, { useState } from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
// import App from '../App';
import { Token } from '../mockDataDir/mockToken' 
import ProjectInfoPage from '../ProjectInfoPage/ProjectInfoPage' 
=======
import { Token } from '../mockDataDir/mockToken'
import ProjectListPage from '../projectListPage';

>>>>>>> c8fd7763b4318c2978a6e2fc993373c45cff4a45

// Note: Use token from mockToken
const urlString = 'https://csil-git1.cs.surrey.sfu.ca';

function UrlToken() {
    const [urlToken, setUrlToken] = useState({url: urlString, token:''});
    const [errorMsg, setErrorMsg] = useState('');
    
    const nextHandler = event => {
        event.preventDefault();
        console.log({urlToken});

        if(urlToken.token === Token.token) {
            ReactDOM.render(
                <React.StrictMode>
<<<<<<< HEAD
                    <ProjectInfoPage />
=======
                    <ProjectListPage />
>>>>>>> c8fd7763b4318c2978a6e2fc993373c45cff4a45
                </React.StrictMode>,
                document.getElementById('root')
            );
        } else {
            setUrlToken({url: urlString, token:''});
            setErrorMsg('Url or token is incorrect. Try Again.');
        }
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