import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AdminUser } from '../mockDataDir/mockAdminUser';
import Authentication from '../Authentication'; 
import Header from './Header'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';  
import Box from '@material-ui/core/Box';  
import logo from '../logo/gitlab_analyzer.png';



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
        login();
    }

    const useStyles = makeStyles((theme) => ({        
        h2:{ 
            marginTop: '30%',
            marginBottom: '15%', 
        },

        formBox:{ 
            width:'25%',
            height:'55%', 
            position: 'absolute', 
            left: '50%', 
            top: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            
        },
        
        customButton:{
            marginTop:'15%',
            width:'50%',
            backgroundImage: 'linear-gradient(to bottom right,rgb(100,7,254), rgb(214,35,113))',
            backgroundColor: 'rgb(92,58,171)',     
        },

        customTextField: {
            width: '70%'
        },         
        
        logo: {
            width:"50%",
            position: 'absolute',
            left: '50%', 
            top: '15%',
            transform: 'translate(-50%, -50%)', 

        }
      }));
      
      const defaultProps = {
        bgcolor: 'background.paper',
        borderColor: 'rgb(195,195,195)',
        m: 1,
        border: 1, 
      };
    
    const classes = useStyles();

    return(
        <div>
            <Header pageTitle='Gitlab Analyzer' />          
            
             <Box className={classes.formBox} borderRadius={16} {...defaultProps}  boxShadow={8}  > 
                <img src={logo} alt="Logo" className={classes.logo}/>      
                <h2 className={classes.h2}>LOGIN</h2>
                <form noValidate autoComplete='off' onSubmit={loginHandler}>
                    <h4 className={classes.h4}>{errorMsg}</h4>
                    <TextField id='username' classes={{root: classes.customTextField}} label='Username' value={user.name} fullWidth onChange={e=> setUser({...user, name: e.target.value})}/>
                    <TextField id='password' classes={{root: classes.customTextField}} label='Password' value={user.password} fullWidth onChange={e=> setUser({...user, password: e.target.value})}/>                
                    <Button classes={{root: classes.customButton}} variant='contained'  type ='submit' color='secondary'> Log in</Button>    
                </form>  
            </Box>
             
        </div>
    );
}

export default Login;