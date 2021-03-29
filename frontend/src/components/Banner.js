import {Avatar, Grid, MenuItem, Select, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import ScoreBoard from "./ScoreBoard";
import useStyles from "../style/BannerStyles";
import getMemberList from "../data/memberListGetter";
import {useHistory } from "react-router-dom";
import {useParams} from "react-router";
import * as PropTypes from "prop-types";

const Banner = ({ avatar_url, memberName, type }) => {
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

  function onMemberChange(event) {
    const newMemberName = event.target.value;

    history.push(`/overview/${project_id}/${newMemberName}/${type}`);
  }

  return (
    <Grid container justify={"space-evenly"} className={classes.container}>
      <Grid item md={4} sm={4} className={classes.profile}>
        <Avatar
          src={
            avatar_url
              ? avatar_url
              : "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png"
          }
          className={classes.large}
        />
        <Typography className={classes.details}>
          <Select value={memberName} onChange={onMemberChange}>
            {members.map((member) => <MenuItem value={member}>{member}</MenuItem>)}
          </Select>
        </Typography>
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
