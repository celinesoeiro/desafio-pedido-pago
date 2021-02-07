import React from 'react';

// Libs
import { makeStyles } from '@material-ui/core/styles';

// Icons
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';

// Styles
const useStyles = makeStyles(() => (
  {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      marginTop: '20%',
      width: '100%',
      height: '100%',
      color: '#22E0A1',
      letterSpacing: '0.03em',
      fontFamily: 'Poppins',
      textAlign: 'center',
      '& svg': {
        alignSelf: 'center',
        marginBottom: '20px',
      },
      '& h1': {
        marginBottom: '15px',
      },
    },
  }
));

function NotFound() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NotListedLocationIcon color="primary" fontSize="large" />
      <h1>404</h1>
      <p>Página não encontrada</p>
    </div>
  );
}

export default NotFound;
