import React from 'react';  
import {Link} from "react-router-dom"; 
function MiniNavBar() {
  
    let project_id = 2
    let member_id = 2
    return (
    <div>
      <p>
        <Link to={`/overview/${project_id}/${member_id}/codecontribution`}>
          Code 
        </Link>
      </p>

      <p>
        <Link to={`/overview/${project_id}/${member_id}/commentcontribution`}>
          Comment 
        </Link>
      </p>

      <p>
        <Link to={`/overview/${project_id}/${member_id}/issuecontribution`}>
          Issue 
        </Link>
      </p>
    </div>
  );
}

export default MiniNavBar;
