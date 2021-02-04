/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';

// Libs
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Toast(props) {
  const {
    key, message, type, isOpen,
  } = props;

  /** STATES */
  const [open, setOpen] = useState(false);

  /** EFFECTS */
  useEffect(() => {
    isOpen ? setOpen(true) : setOpen(false);
  }, [isOpen]);

  /** FUNCTIONS */
  function Alert(alertProps) {
    return <MuiAlert elevation={6} variant="filled" {...alertProps} />;
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
        key={key}
      >
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Toast;
