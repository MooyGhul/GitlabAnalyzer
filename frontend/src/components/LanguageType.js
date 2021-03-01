import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core";
import styles from "../style/LanguageTypeStyles";

const LanguageType = (props) => {
  // TO DO :
  // When backend is ready, either GREY OUT "PLEASE CHOOSE LANGUAGE"
  // or calculate overall submission when ppl choose "PLEASE CHOOSE LANGUAGE"

  const { classes } = props;
  const options = ["JS", "C++", "Java", "Python"];

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFile = (event, index) => {
    props.onChange(options[index]);
    setSelectedIndex(index);
    handleClose();
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.languageBtn}
      >
        File Type: {options[selectedIndex]}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        variant="menu"
        disableScrollLock={true}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleFile(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default withStyles(styles)(LanguageType);
