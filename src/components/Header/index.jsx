/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

// Libs
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

// Icons
import SearchIcon from '@material-ui/icons/Search';
import PhoneIcon from '@material-ui/icons/Phone';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ChatIcon from '@material-ui/icons/Chat';

// Components
import Toast from '../Toast';

// Assets
import logo from '../../assets/logo-branco.png';

// Styles
const useStyles = makeStyles(() => (
  {
    root: {
      margin: '0px',
      padding: '0px',
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      height: '104px',
      justifyContent: 'space-between',
      color: '#424242',
      letterSpacing: '0.03em',
      marginBottom: '24px',
    },
    upperHeader: {
      display: 'flex',
      flexDirection: 'row',
      height: '64px',
      justifyContent: 'space-between',
      background: 'linear-gradient(90.17deg, #22E0A1 0%, #034AFD 100%)',
      transform: 'matrix(-1, 0, 0, 1, 0, 0)',
      padding: '0px 22px',
      color: '#fff',
    },
    headerLogo: {
      display: 'flex',
      flexDirection: 'row',
      transform: 'matrix(-1, 0, 0, 1, 0, 0)',
      justifyContent: 'flex-start',
      width: '50%',
      alignItems: 'center',
      letterSpacing: '0.03em',
      '& img': {
        size: '50%',
        marginRight: '6px',
      },
    },
    headerIcons: {
      display: 'flex',
      flexDirection: 'row',
      transform: 'matrix(-1, 0, 0, 1, 0, 0)',
      justifyContent: 'flex-end',
      width: '50%',
      alignItems: 'center',
      '& svg': {
        color: '#fff',
      },
    },
    lowerHeader: {
      display: 'flex',
      flexDirection: 'row',
      margin: '9px 24px',
      fontFamily: 'Poppins',
      alignItems: 'center',
      color: '#424242',
      '& >p': {
        fontSize: '14px',
        fontWeight: 600,
        fontFamily: 'Poppins',
        letterSpacing: '0.03em',
      },
      '& .MuiBreadcrumbs-ol': {
        fontSize: '12px',
        fontWeight: 400,
        fontFamily: 'Poppins',
        letterSpacing: '0.03em',
      },
    },
    divider: {
      border: '1px solid rgba(47,49,56,0.15)',
      display: 'flex',
    },
  }
));

function Header(props) {
  const { pageTitle, children } = props;
  const classes = useStyles();

  /** STATES */
  const [openToast, setOpenToast] = useState(false);
  const [toastKey, setToastKey] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, _] = useState('info');

  /** FUNCTIONS */
  function handleHeaderButton(type) {
    setOpenToast(true);
    setToastKey(type);
    if (type === 'search') {
      setToastMessage('Você clicou para pesquisar uma categoria');
    } else if (type === 'call') {
      setToastMessage('Você clicou para entrar em contato com a Pedido Pago via telefone');
    } else if (type === 'notifications') {
      setToastMessage('Você clicou para visualizar suas notificações');
    } else if (type === 'assignments') {
      setToastMessage('Você clicou para visualizar seus pedidos');
    } else if (type === 'contact') {
      setToastMessage('Você clicou para entrar em contato com a Pedido Pago via chat');
    }
  }

  return (
    <>
      <Toast
        key={toastKey}
        message={toastMessage}
        type={toastType}
        isOpen={openToast}
      />
      <header className={classes.header}>
        <div className={classes.upperHeader}>
          <div className={classes.headerIcons}>
            <IconButton onClick={() => handleHeaderButton('search')}>
              <SearchIcon />
            </IconButton>
            <IconButton onClick={() => handleHeaderButton('call')}>
              <PhoneIcon />
            </IconButton>
            <IconButton onClick={() => handleHeaderButton('notifications')}>
              <NotificationsIcon />
            </IconButton>
            <IconButton onClick={() => handleHeaderButton('assignments')}>
              <AssignmentIcon />
            </IconButton>
            <IconButton onClick={() => handleHeaderButton('contact')}>
              <ChatIcon />
            </IconButton>
          </div>
          <div className={classes.headerLogo}>
            <img src={logo} alt="pedido-pago" />
            <p> ・ Laboratório Buenos Ayres</p>
          </div>
        </div>
        <div className={classes.lowerHeader}>
          <p>
            {pageTitle}
            {' '}
            ・
            {' '}
          </p>
          {children}
        </div>
        <div className={classes.divider} />
      </header>
    </>
  );
}

export default Header;
