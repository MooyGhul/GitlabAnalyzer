import React, {useState} from 'react';
import { useHistory } from 'react-router-dom'; 
import axios from 'axios';
import Box from '@material-ui/core/Box';  
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'; 
import logo from '../logo/gitlab_analyzer.png';
import {useStyles} from '../style/UrlTokenStyle'
import {Grid} from "@material-ui/core";
import useFullPageLoader from "./useFullPageLoader"; 

function UrlToken() {

    const history = useHistory();
    const [urlToken, setUrlToken] = useState({url: '', token:''});
    const [errorMsg, setErrorMsg] = useState('');
    const [loginToken, setLoginToken] = useState(''); 
    const [loader, showLoader, hideLoader] = useFullPageLoader();


<<<<<<< HEAD
    const createConfigID = async (url, token) => {
        return axios({
          method: "post",
          url: (process.env.NODE_ENV === 'development' ?           
          `${process.env.REACT_APP_DEVHOST}/api/config/` :
          `/api/config/`),
          data: { url, token },
        }).then((res) => res.data.id);
      };
=======
    const authenticateToken  = async () => {
        showLoader()
        await axios.post(process.env.NODE_ENV === 'development' ?

            `${process.env.REACT_APP_DEVHOST}/project/create?token=${urlToken.token}` :
            `/project/create?token=${urlToken.token}`);
>>>>>>> master

      
      const loadAllProjects = async (configID) => {
        showLoader()
        return axios({
          method: "post",
          url: (process.env.NODE_ENV === 'development' ?
                  `${process.env.REACT_APP_DEVHOST}/api/config/${configID}/load`:
                  `/api/config/${configID}/load`) 
        })
          .then((response) => {
            if (response.status === 200) {
              hideLoader(); 
              history.push({
                pathname: "projectList",
              });
            }
          })
          .catch((error) => {
            hideLoader();
            console.log(error)
            setUrlToken({ url: urlToken.url, token: urlToken.token });
            setErrorMsg("Incorrect url or token. Please try again.");
          });
      };


    const test = async () => {
        const configID = await createConfigID(urlToken.url, urlToken.token); 
        await loadAllProjects(configID); 
      };   
    

      const addLoginToken = () => { 
        const data = new URLSearchParams(window.location.search);
        setLoginToken(data.get("ticket")); 
      };
    

      const nextHandler = (event) => {
        event.preventDefault();
        addLoginToken();
<<<<<<< HEAD
        test();
      };
          
     
=======
        authenticateToken();
    }        

>>>>>>> master
    const classes = useStyles();

    return(
        <div>
        <Grid container>
            <Box className={classes.formBox} borderRadius={16} boxShadow={8}>
            <img src={logo} alt="Logo" className={classes.logo}/>   
            <form onSubmit={nextHandler}>
                <h2 className={classes.h2}> Server information </h2>

                <h3>{errorMsg}</h3>


                <TextField id='url' classes={{root: classes.customTextField}} label='Server URL' value={urlToken.url}
                        onChange={e=> setUrlToken({...urlToken, url: e.target.value})}/>

                <TextField id='token' classes={{root: classes.customTextField}} label='Server Token'  value={urlToken.token}
                        onChange={e=> setUrlToken({...urlToken, token: e.target.value})}/>

                <Button id='create-config' classes={{root: classes.customButton}} variant='contained'  type ='submit' color='secondary'>Next</Button>
            </form>
            </Box>
        </Grid> 
        {loader}
        </div>
    );
}

export default UrlToken;
