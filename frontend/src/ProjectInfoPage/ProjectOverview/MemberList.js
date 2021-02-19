import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

const columns = [
  { field: 'id', headerName: 'ID', width: 100},
  { field: 'studentID', headerName: 'Student ID', width: 200},
];

const rows = [
  {id: 1, studentID: 'katelynk'},
  {id: 2, studentID: 'katelynk'},
  {id: 3, studentID: 'katelynk'},
  {id: 4, studentID: 'katelynk'},
  {id: 5, studentID: 'katelynk'},
  {id: 6, studentID: 'katelynk'},
  {id: 7, studentID: 'katelynk'},
  {id: 8, studentID: 'katelynk'},
]

const useStyles = makeStyles({
  memberList:{ 
    position: 'absolute',
    top: 100,
    right: '10%',
    width: '30%',
    height: 400,
  }
})


function MemberList(props) {
  const classes = useStyles();
  return (
      <div className={classes.memberList}>        
        <DataGrid rows={rows} columns={columns} pageSize={5} />
  
      </div>
    );
  }
  
  export default MemberList;