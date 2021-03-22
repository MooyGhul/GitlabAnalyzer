import React from "react";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import {useStyles} from "../style/InnerBannerStyle";

const MiniNavBar = () => {
  const { project_id, member_id } = useParams();
  const classes = useStyles();

  return (
    <div> 
      <ul className={classes.ul}>
        <li className={classes.li}>
          <Link to={`/overview/${project_id}/${member_id}/codecontribution`} className={classes.link}>
            CODE
          </Link>
        </li>

        <li className={classes.li}>
          <Link to={`/overview/${project_id}/${member_id}/commentcontribution`} className={classes.link}>
            COMMENT
          </Link>
        </li>

        <li className={classes.li}>
          <Link to={`/overview/${project_id}/${member_id}/issuecontribution`} className={classes.link}>
            ISSUE
          </Link>
        </li>
      </ul> 
    </div>
  );
};

export default MiniNavBar;
