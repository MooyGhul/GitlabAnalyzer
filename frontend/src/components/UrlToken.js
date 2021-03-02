import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';  
import Authentication from "../Authentication";
import Header from "./Header";
import axios from 'axios';

function UrlToken() {
    
    const history = useHistory();
    const [urlToken, setUrlToken] = useState({url: '', token:''});
    const [errorMsg, setErrorMsg] = useState('');
    const [loginToken, setLoginToken] = useState('');

    const authenticateToken  = async () => {
        await axios.post('http://localhost:8080/project/create?token='+ urlToken.token);
        await axios.post('http://localhost:8080/project/add?url='+ urlToken.url)
        .then(function(response){
            console.log(response.status);
            if (response.status === 200){
                Authentication.onValidToken();
                Authentication.onAuthentication();
                history.push('/projectList');
            }
        })
        .catch(function(error){
            console.log(error.response.status);
            if (error.response.status === 500){
                setUrlToken({url: urlToken.url, token:urlToken.token});
                setErrorMsg('Incorrect url or token. Please try again.');
            }
        }) 
    }   
       


    const addLoginToken = () => {
        console.log(window.location.href);
        const data = new URLSearchParams(window.location.search)
        console.log(data.get('ticket'))
        setLoginToken(data.get('ticket'))
        console.log(loginToken)
    }

    const nextHandler = event => {
        event.preventDefault();
        addLoginToken();
        authenticateToken();
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