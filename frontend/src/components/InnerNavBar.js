import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"; 
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"; 
import CodeIcon from '@material-ui/icons/Code';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';


const MiniNavBar = () => {
  const { project_id, member_id } = useParams(); 
  const [value, setValue] = React.useState(0);
 
  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels 
      >
        <BottomNavigationAction
          label="CODE"
          component={Link}
          to={`/overview/${project_id}/${member_id}/codecontribution`}
          value="code"
          icon={<CodeIcon />}
        />
        <BottomNavigationAction
          label="COMMENT"
          component={Link}
          to={`/overview/${project_id}/${member_id}/commentcontribution`}
          value="comment"
          icon={<CommentOutlinedIcon/>}
        />
        <BottomNavigationAction
         label="ISSUE" 
         component={Link}
          to={`/overview/${project_id}/${member_id}/issuecontribution`}
          value="issue"
          icon={<NoteOutlinedIcon/>}
          />
      </BottomNavigation>
 
    </div>
  );
};

export default MiniNavBar;
