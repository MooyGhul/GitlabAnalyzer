import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({        
    projectOverview:{
        position: 'absolute',
        top: '30%',
        width:'100%',
        height:"70%", 

    },
    
    memberList:{ 
        position: 'absolute',
        width:"20%",
        height: '50%',
        marginTop: '2em',
        left: '10%',
      }
     
  })); 
  export {useStyles}
