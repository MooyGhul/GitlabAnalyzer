import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom"; 
import { useStyles } from "./ProjectInfoStyle";

function MemberList({ members, commitsArray, MRsArray, commentsArray, issuesArray, projectID, onMemberIdChange}){
    const history = useHistory();
    const classes = useStyles();

    const rows = members.map((member, i) => ({
        id: i,
        studentID: members[i],
        commits: commitsArray[i],
        merge_requests: MRsArray[i],
        CountMR: commentsArray[i],
        CountIssue: issuesArray[i],
      }))
      
      const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "studentID", headerName: "Student", width: 180 },
        { field: "commits", headerName: "Commit (count)", width: 230 },
        { field: "merge_requests", headerName: "MR (count)", width: 200 },
        { field: "CountMR", headerName: "Comments (count)", width: 250 },
        { field: "CountIssue", headerName: "Issue (count)", width: 210 },
      ];
    
      const buttonClickHandler = (e) => {
        let studentID = e.row.studentID
        history.push(
          {pathname:`/overview/${projectID}/${studentID}/codeContribution`, 
           state: {project_id: projectID, member_id:studentID}});
        onMemberIdChange(e.row.studentID);
      };
      
    return(
        <div className={classes.memberList}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          onRowClick={(e) => buttonClickHandler(e)}
        />
      </div>
    )
}

export default MemberList