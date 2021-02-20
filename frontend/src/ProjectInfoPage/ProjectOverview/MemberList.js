import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import axios from 'axios'

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
  const [data, setData] = useState ({ hits: []});
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://hn.algolia.com/api/v1/search?query=redux'

      );
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
     <div>
       <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
     </div>
      // <div className={classes.memberList}>        
      //   <h3>Please select a student from the member list below.</h3>
      //   <DataGrid rows={rows} columns={columns} pageSize={5} />
      //   <Button variant="contained">Analyze</Button>
      // </div>
    );
  }
  
  export default MemberList;