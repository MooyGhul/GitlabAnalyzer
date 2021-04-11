import { Grid, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ScoreBoard from "./ScoreBoard";
import useStyles from "../style/BannerStyles";
import getMemberList from "../data/memberListGetter";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import * as PropTypes from "prop-types";
import userImage from "../logo/user.png"

const Banner = ({ memberName, type }) => {
  const { project_id } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setMembers(await getMemberList(project_id));
    };
    fetchData().then();
  }, [project_id]);

  const onMemberChange = (event) => {
    const newMemberName = event.target.value;

    history.push(`/overview/${project_id}/${newMemberName}/${type}`);
  };

  return (
    <Grid container justify={"space-evenly"} className={classes.container}>
      <Grid item md={4} sm={4} className={classes.profile}>
      <img src={userImage} alt="user" className={classes.large} />         

        <Select
          value={memberName}
          onChange={onMemberChange}
          className={classes.details}
        >
          {members.map((member) => (
            <MenuItem value={member}>{member}</MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item md={8} sm={8}>
        <ScoreBoard />
      </Grid>
    </Grid>
  );
};

Banner.propTypes = {
  avatar_url: PropTypes.string,
  memberName: PropTypes.string,
  type: PropTypes.string,
};

export default Banner;
