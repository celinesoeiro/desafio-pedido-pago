/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react';

// Libs
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

// Components
import Input from '../../components/Input';
import Button from '../../components/Button';
import Toast from '../../components/Toast';

// Assets
import logo from '../../assets/logo.png';
import rodapeImg from '../../assets/rodape-direito.png';

// Services
import api from '../../services/api';
import { login } from '../../services/auth';

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
      alignItems: 'center',
      height: '84px',
      placeContent: 'center',
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
    formContainer: {
      height: '448px',
      width: '448px',
      display: 'flex',
      placeContent: 'center',
      flexDirection: 'column',
      border: '1px solid #E1E1E1',
      borderRadius: '10px',
      padding: '56px',
      marginTop: '88px ',
      marginBottom: '208px',
      textAlign: 'center',
      '& h1': {
        fontSize: '16px',
        fontWeight: 700,
        color: '#424242',
      },
      '& >p': {
        padding: '16px ',
        color: '#424242',
        letterSpacing: '0.03em',
        lineHeight: '18px',
        fontSize: '12px',
      },
    },
    formFooter: {
      display: 'flex',
      flexDirection: 'row',
      fontSize: '12px',
      fontFamily: 'Poppins',
      fontWeight: 400,
      lineHeight: '18px',
      letterSpacing: '0.03em',
      '& a': {
        textDecoration: 'none',
        color: '#22E0A1',
      },
    },
    footer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '0px 88px',
      height: '72px',
      placeContent: 'center',
      alignItems: 'center',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '24px',
      color: '#424242',

    },
    rigthFooter: {
      display: 'flex',
      flexDirection: 'row',
      lineHeight: '24px',
      letterSpacing: '0.03em',
      '& a': {
        textDecoration: 'none',
        color: '#CFCECE',
        letterSpacing: '0.03em',
        lineHeight: '24px',
      },
    },
  }
));

function Login(props) {
  const classes = useStyles();

  /** STATES */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastKey, setToastKey] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  /** FUNCTIONS */
  function handleLogin(submittedEmail, submittedPassword) {
    api.post('/agent/login', {
      password: submittedPassword,
      type: 'agent',
      username: submittedEmail,
    })
      .then((response) => {
        const { jwt } = response.data;
        login(jwt);
        props.history.push('/categories');
      })
      .catch((err) => {
        setOpenToast(true);
        setToastKey('loginError');
        setToastMessage('Algo deu errado. Por favor, revise seus dados.');
        setToastType('error');
      });
  }

  /** CALLBACKS */
  const handleSubmit = useCallback(() => {
    if (!email || !password) {
      !email ? setEmailError(true) : setEmailError(false);
      !password ? setPasswordError(true) : setPasswordError(false);
    } else {
      setEmailError(false);
      setPasswordError(false);
      handleLogin(email, password);
    }
  }, [email, password]);

  return (
    <div className={classes.root}>
      <Toast
        key={toastKey}
        message={toastMessage}
        type={toastType}
        isOpen={openToast}
      />
      <div className={classes.header}>
        <img src={logo} alt="logo" />
      </div>
      <div className={classes.divider} />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <div className={classes.formContainer}>
          <h1>Fazer Login</h1>
          <p>Ir para a interface administrativa da Pedido Pago</p>
          <form>
            <Input
              id="email"
              variant="outlined"
              margin="normal"
              borderRadius="10px"
              fullWidth
              label="E-mail/Usuário"
              required
              size="small"
              value={email}
              error={emailError}
              errorMessage="O campo E-mail/Usuário é obrigatório"
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              id="password"
              variant="outlined"
              margin="normal"
              borderRadius="10px"
              fullWidth
              label="Senha"
              required
              type="password"
              size="small"
              value={password}
              error={passwordError}
              errorMessage="O campo Senha é obrigatório"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              text="continuar"
              onClick={handleSubmit}
            />
          </form>
          <div className={classes.formFooter}>
            <p>
              {' '}
              <a href="/">Esqueceu a senha?</a>
              {' '}
              Receba o link de troca de senha no email cadastrado.
            </p>
          </div>
        </div>
      </Grid>
      <div className={classes.divider} />
      <div className={classes.footer}>
        <div className={classes.rigthFooter}>
          © 2020 Pedido Pago
          <div className={classes.verticalDivider} />
          <a href="/">Termos Gerais e Condições de Uso</a>
          <div className={classes.verticalDivider} />
          <a href="/">Política de privacidade</a>
        </div>
        <div>
          <img src={rodapeImg} alt="feito com <3 em SP" />
        </div>
      </div>
    </div>

  );
}

export default Login;
