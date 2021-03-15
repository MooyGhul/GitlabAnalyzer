import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Authentication from "../Authentication";
import Header from "./Header";
import axios from "axios";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import logo from "../logo/gitlab_analyzer.png";
import { useStyles } from "../style/UrlTokenStyle";
import { Grid } from "@material-ui/core";

function UrlToken() {
  const history = useHistory();
  const [urlToken, setUrlToken] = useState({ url: "", token: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [loginToken, setLoginToken] = useState("");

  const createConfigID = async (url, token) => {
    return axios({
      method: "post",
      url: "http://localhost:8080/api/config/",
      data: { url, token },
    }).then((res) => res.data.id);
  };

  const loadAllProjects = async (configID) => {
    return axios({
      method: "post",
      url: "http://localhost:8080/api/config/" + configID + "/load",
    })
      .then((response) => {
        if (response.status === 200) {
          Authentication.onValidToken();
          Authentication.onAuthentication(); 
          history.push({
            pathname: "projectList",
          });
        }
      })
      .catch((error) => {
        setUrlToken({ url: urlToken.url, token: urlToken.token });
        setErrorMsg("Incorrect url or token. Please try again.");
      });
  };

  const test = async (req, res) => {
    const configID = await createConfigID(urlToken.url, urlToken.token);
    //   console.log(configuration)
    const response = await loadAllProjects(configID);
    console.log(response);
  };

  const addLoginToken = () => {
    console.log(window.location.href);
    const data = new URLSearchParams(window.location.search);
    console.log(data.get("ticket"));
    setLoginToken(data.get("ticket"));
    console.log(loginToken);
  };

  const nextHandler = (event) => {
    event.preventDefault();
    addLoginToken();
    test();
  };

  const classes = useStyles();

  return (
    <Grid container>
      <Header pageTitle="Gitlab Analyzer" />
      <Box className={classes.formBox} borderRadius={16} boxShadow={8}>
        <img src={logo} alt="Logo" className={classes.logo} />
        <form onSubmit={nextHandler}>
          <h2 className={classes.h2}> Server information </h2>

          <h3>{errorMsg}</h3>

          <TextField
            id="url"
            classes={{ root: classes.customTextField }}
            label="Server URL"
            value={urlToken.url}
            onChange={(e) => setUrlToken({ ...urlToken, url: e.target.value })}
          />

          <TextField
            id="url"
            classes={{ root: classes.customTextField }}
            label="Server Token"
            value={urlToken.token}
            onChange={(e) =>
              setUrlToken({ ...urlToken, token: e.target.value })
            }
          />

          <Button
            classes={{ root: classes.customButton }}
            variant="contained"
            type="submit"
            color="secondary"
          >
            Next
          </Button>
        </form>
      </Box>
    </Grid>
  );
}

export default UrlToken;
