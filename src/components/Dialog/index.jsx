import React from 'react';

// Libs
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import MUIDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

// Icons
import CloseIcon from '@material-ui/icons/Close';

// Styles
const useStyles = makeStyles(() => (
  {
    dialogTitle: {
      margin: 0,
      padding: '9px 16px 9px 16px',
      '& h2': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Poppins',
        letterSpacing: '0.03em',
        fontWeight: 600,
        fontSize: '12px',
        color: '#A3A3A3',
      },
      borderBottom: '1px solid rgba(47,49,56,0.15)',
    },
    closeButton: {
      color: '#A3A3A3',
    },
    dialogContent: {
      margin: 0,
      padding: '24px',
      '& p': {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: '12px',
        color: '#424242',
      },
    },
  }
));

function Dialog(props) {
  const classes = useStyles();
  const {
    open, close, title, content, actions,
  } = props;

  return (
    <MUIDialog open={open} onClose={close}>
      <DialogTitle className={classes.dialogTitle}>
        <p>{title}</p>
        {close ? (
          <IconButton
            className={classes.closeButton}
            onClick={close}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {content}
      </DialogContent>
      <DialogActions>
        {actions}
      </DialogActions>
    </MUIDialog>
  );
}

export default Dialog;
