import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';  
import { useHistory } from 'react-router-dom';

const columns = [
  { field: 'id', headerName: 'ID', width: 100},
  { field: 'studentID', headerName: 'Student ID', width: 200},
];

const rows = [
  {id: 1, studentID: 'katelynk'},
  {id: 2, studentID: 'gss'},
  {id: 3, studentID: 'olehs'},
  {id: 4, studentID: 'dular'},
  {id: 5, studentID: 'mmeet'},
  {id: 6, studentID: 'naufals'},
  {id: 7, studentID: 'wangp'},
  {id: 8, studentID: 'richardp'},
]

const useStyles = makeStyles({
  memberList:{ 
    position: 'absolute',
    height: 400,
    marginTop: "2em",
    left: '10%',
  }
})

function MemberList(props) {
 
  const buttonClickHandler = event => {
    history.push('/overview');
}

  const classes = useStyles();
  const history = useHistory();
 
  return (      
      <div className={classes.memberList}>        
        <h3>Please select a student from the member list below.</h3>
        <DataGrid rows={rows} columns={columns} pageSize={5} onRowClick={buttonClickHandler} />
      </div>
    );
  }
  
  export default MemberList;