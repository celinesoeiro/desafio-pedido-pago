/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

// Libs
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

// Icons
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

// Components
import Toast from '../../components/Toast';
import Header from '../../components/Header';

// Assets
import logo from '../../assets/logo-branco.png';

// Styles
const useStyles = makeStyles(() => (
  {
    root: {
      margin: '0px',
      padding: '0px',
    },

    divider: {
      border: '1px solid rgba(47,49,56,0.15)',
      display: 'flex',
    },
    verticalDivider: {
      borderRight: '0.5px solid #CFCECE',
      height: '32px',
      margin: '0px 16px',
    },
  }
));

function Categories() {
  const classes = useStyles();

  /** STATES */

  /** FUNCTIONS */
  function handleClick() {
    alert('voce clicou');
  }

  return (
    <>
      <Header pageTitle="Lista de categorias">
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link color="inherit" variant="inherit" href="/" onClick={handleClick}>
            Catálogo
          </Link>
          <Typography color="inherit" variant="inherit">Categorias</Typography>
        </Breadcrumbs>
      </Header>
    </>
  );
}

export default Categories;
