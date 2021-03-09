import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AdminUser } from '../mockDataDir/mockAdminUser';
import Authentication from '../Authentication'; 
import Header from './Header'
import TextField from '@material-ui/core/TextField'; 
import Button from '@material-ui/core/Button';  
import Box from '@material-ui/core/Box';  
import logo from '../logo/gitlab_analyzer.png';
import {useStyles} from '../style/LoginStyle'
import Grid from "@material-ui/core/Grid";


function Login() {
    const state = {
        loginMethod: 2
    };
    const history = useHistory();
    const [user, setUser] = useState({name:'', password:''});
    const [errorMsg, setErrorMsg] = useState('');

    const authenticateUser  = () => {
        if(user.name === AdminUser.username && user.password === AdminUser.password) {
            Authentication.onValidUser();
            return true;
        } else {
            return false;
        }
    }

    const login = () => {
        if(authenticateUser()){
            history.push('/token');
        } else {
            setUser({name:'', password: ''});
            setErrorMsg('Incorrect username or password. Please try again.');
        }
    }


    const loginHandler = event => {
        event.preventDefault();
        if(state.loginMethod===1){
            login(user);
        }
        else if(state.loginMethod===2){
            window.location = 'https://cas.sfu.ca/cas/login?service=http://cmpt373-1211-14.cmpt.sfu.ca:8080/token';
        }
    }
        
    const classes = useStyles();

    return(
        <Grid container>
            <Header pageTitle='Gitlab Analyzer' />
            
             <Box className={classes.formBox} borderRadius={16} boxShadow={8}  > 
                <img src={logo} alt="Logo" className={classes.logo}/>      
                <h2 className={classes.h2}>LOGIN</h2>
                <form noValidate autoComplete='off' onSubmit={loginHandler}>
                    <h4 className={classes.h4}>{errorMsg}</h4>
                    <TextField id='username' classes={{root: classes.customTextField}} label='Username' value={user.name} fullWidth onChange={e=> setUser({...user, name: e.target.value})}/>
                    <TextField id='password' classes={{root: classes.customTextField}} label='Password' value={user.password} fullWidth onChange={e=> setUser({...user, password: e.target.value})}/>                
                    <Button classes={{root: classes.customButton}} variant='contained'  onClick={() => (state.loginMethod = 1)} type ='submit' color='secondary'> Log in</Button>
                    <Button classes={{root: classes.customButton}} variant='contained' onClick={() => (state.loginMethod = 2)} type ='submit' color='secondary'> Login with SSO </Button>
                </form>  
            </Box>             
        </Grid>
    );
}

export default Login;
