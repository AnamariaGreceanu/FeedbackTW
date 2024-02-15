import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AccessForm = ({ onSubmit, activityId, open, onClose }) => {
  const [accessCode, setAccessCode] = useState("");

  const handleCodeChange = (e) => {
    setAccessCode(e.target.value);
  };

  const handleTryCode = () => {
    onSubmit(accessCode);
  };

  const handleClose = () => {
    setAccessCode(""); // Reset the access code when closing
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Enter Access Code</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the access code to proceed.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="accessCode"
          label="Access Code"
          type="text"
          fullWidth
          value={accessCode}
          onChange={handleCodeChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleTryCode} color="primary">
          Try Code
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccessForm;
