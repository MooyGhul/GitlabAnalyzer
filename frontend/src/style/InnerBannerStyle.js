import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  ul: {  
    listStyleType: "none",
    color: "red",
    fontSize: "20px", 
    display: "flex",   
    width:"30%",
    borderBottom: "2px solid rgb(195,195,195)",
    justifyContent:"center",
  },

  li: { 
    display: "inline-block",  
    paddingLeft: "7%",
    paddingRight:"7%",
    paddingBottom:"1%",
    listStyle: "none", 
  },

  link:{
      textDecoration:"none",

      '&:visited':{
        color:"black"
      },
      '&:hover':{
          color:"red",
      },      
  },  
 
   
 
}));
export { useStyles };
