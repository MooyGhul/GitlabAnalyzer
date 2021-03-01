import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AdminUser } from '../mockDataDir/mockAdminUser';
import Authentication from '../Authentication'; 
import Header from './Header'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

function Login() {
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
        login(user);
    }

    const useStyles = makeStyles((theme) => ({
        root: { 
            fontFamily:'PT Sans, sans-serif' 
        },  

        formContainer:{
            backgroundColor:'#7553FF',   
            width:'30%',
            position: 'absolute', 
            left: '50%', 
            top: '50%',
            transform: 'translate(-50%, -50%)'
        },

        textfield: {
            display: 'block',
            marginBottom: '5%', 
        }
      })
      )
      ;
    
    const classes = useStyles();

    return(
        <div className={classes.root} >
            {/* <Header pageTitle='Gitlab Analyzer' /> */}          
           
             <Container className={classes.formContainer}>
                <h2 className={classes.h2}>Login</h2>
                <form noValidate autoComplete='off' onSubmit={loginHandler}>
                    <h3>{errorMsg}</h3>
                    <TextField id='standard-basic' className={classes.textfield} label='Username' value={user.name} fullWidth onChange={e=> setUser({...user, name: e.target.value})}/>
                    <TextField id='standard-basic' className={classes.textfield} label='Password' alue={user.password} fullWidth onChange={e=> setUser({...user, password: e.target.value})}/>                
                    <Button variant='contained'  type ='submit' color='secondary'> Log in</Button>
    
                </form>  
            </Container>
             
        </div>
    );
}

export default Login;