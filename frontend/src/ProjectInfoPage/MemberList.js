import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom"; 
import { useStyles } from "./AllProjectInfoStyle";

function MemberList(props){
    let members = props.members
    let commitsArray = props.commitsArray
    let MRsArray = props.MRsArray
    let projectID = props.projectID
    const history = useHistory();
    const classes = useStyles();


    const rows = members.map((member, i) => ({
        id: i,
        studentID: members[i],
        commits: commitsArray[i],
        merge_requests: MRsArray[i],
        wordCountMR: "Not Implemented",
        wordCountIssue: "Not Imiplemented"
      }))
      
      const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "studentID", headerName: "Student ID", width: 200 },
        { field: "commits", headerName: "Total commits", width: 230 },
        { field: "merge_requests", headerName: "Total MRs", width: 200 },
        { field: "wordCountMR", headerName: "Review (words)", width: 250 },
        { field: "wordCountIssue", headerName: "Issue (words)", width: 250 },
      ];
    
      const buttonClickHandler = (e) => {
        console.log(e.row.id);
        history.push("/overview/" + projectID + "/" + e.row.studentID+"/codeContribution");
      };
      
    return(
        <div className={classes.memberList}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          onRowClick={(e) => buttonClickHandler(e)}
        />
      </div>
    )
}

export default MemberList