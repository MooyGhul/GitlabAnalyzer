import React from "react";
import SettingsIcon from '@material-ui/icons/Settings';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const WeightDialog = (props) => {
    const {weights} = props

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
       <div>
           <SettingsIcon style={{backgroundColor: "#e4e3ff"}} onClick={handleClickOpen}/>
           <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
               <DialogTitle id="form-dialog-title">Configure Weighting</DialogTitle>
               <DialogContent>
                   <DialogContentText>
                       Configure Weights to Change Scoring
                   </DialogContentText>
                   <TextField
                       autoFocus
                       margin="dense"
                       id="commit"
                       label="Commit Weight"
                       type="number"
                       value={weights.commits}
                   />
                   <TextField
                       margin="dense"
                       id="mergeRequest"
                       label="Merge Request Weight"
                       type="number"
                       value={weights.mr}
                   />
               </DialogContent>
               <DialogActions>
                   <Button onClick={handleClose} color="primary">
                       Cancel
                   </Button>
                   <Button onClick={handleClose} color="primary">
                       Confirm
                   </Button>
               </DialogActions>
           </Dialog>
       </div>
    );
};

export default WeightDialog;
