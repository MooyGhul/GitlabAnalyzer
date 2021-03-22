import React from 'react';  
import {Link} from "react-router-dom"; 
function MiniNavBar() {
  return (
    <div>
      <p>
        <Link to="/overview/:project_id/:member_id/codecontribution">
          Code contribution
        </Link>
      </p>

      <p>
        <Link to="/overview/:project_id/:member_id/commentContribution">
          Comment contribution
        </Link>
      </p>

      <p>
        <Link to="/overview/:project_id/:member_id/issueContribution">
          Issue contribution
        </Link>
      </p>
    </div>
  );
}

export default MiniNavBar;
