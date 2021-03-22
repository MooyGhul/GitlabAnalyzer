import React from "react";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";

const MiniNavBar = () => {
  const {project_id, member_id} = useParams();
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
