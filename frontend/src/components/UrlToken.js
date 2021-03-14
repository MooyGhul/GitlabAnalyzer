import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';  
import Authentication from "../Authentication";
import Header from "./Header";
import axios from 'axios';
import Box from '@material-ui/core/Box';  
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'; 
import logo from '../logo/gitlab_analyzer.png';
import {useStyles} from '../style/UrlTokenStyle'
import {Grid} from "@material-ui/core";

function UrlToken() {
    
    const history = useHistory();
    const [urlToken, setUrlToken] = useState({url: '', token:''});
    const [errorMsg, setErrorMsg] = useState('');
    const [loginToken, setLoginToken] = useState('');

    const authenticateToken  = async () => {
        let tokenUrl = `http://localhost:8080/project/create?token=${urlToken.token}`;
        let addUrl = `http://localhost:8080/project/add?url=${urlToken.url}`;

        if(process.env.NODE_ENV === 'development') {
            tokenUrl = `${process.env.REACT_APP_DEVHOST}/project/create?token=${urlToken.token}`
            addUrl = `${process.env.REACT_APP_DEVHOST}/project/add?url=${urlToken.url}`
        }

        await axios.post(tokenUrl);
        await axios.post(addUrl)
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
     
    const classes = useStyles();

    return(
        <Grid container>
            <Header pageTitle="Gitlab Analyzer" />
            <Box className={classes.formBox} borderRadius={16} boxShadow={8}>
            <img src={logo} alt="Logo" className={classes.logo}/>   
            <form onSubmit={nextHandler}>
                <h2 className={classes.h2}> Server information </h2>

                <h3>{errorMsg}</h3>


                <TextField id='url' classes={{root: classes.customTextField}} label='Server URL' value={urlToken.url}
                        onChange={e=> setUrlToken({...urlToken, url: e.target.value})}/>

                <TextField id='url' classes={{root: classes.customTextField}} label='Server Token'  value={urlToken.token}
                        onChange={e=> setUrlToken({...urlToken, token: e.target.value})}/>
                 
                <Button classes={{root: classes.customButton}} variant='contained'  type ='submit' color='secondary'>Next</Button>   
            </form>
            </Box>
        </Grid>
    );
}

export default UrlToken;