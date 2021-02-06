/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';

// Libs
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { lighten, darken } from 'polished';
import MuiInput from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// Services
import api from '../../../services/api';

// Components
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Toast from '../../../components/Toast';

// Styles
const theme = createMuiTheme({
  palette: {
    primary: {
      light: lighten(0.1, '#22E0A1'),
      main: '#22E0A1',
      dark: darken(0.1, '#22E0A1'),
      contrastText: '#fff',
    },
  },
});

const useStyles = makeStyles(() => (
  {
    root: {
      flexGrow: 1,
    },
    card: {
      margin: '15px 25px 15px 25px',
      padding: '26px',
    },
    input: {
      display: 'none',
    },
    avatar: {
      display: 'flex',
      placeContent: 'center',
    },
  }
));

function CreateCategory(props) {
  const classes = useStyles();

  /** STATES */
  const [logo, setLogo] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [ecommerce, setEcommerce] = useState(null);
  const [callCenter, setCallCenter] = useState(null);
  const [keywords, setKeywords] = useState(null);
  const [nameError, setNameError] = useState(false);

  const [openToast, setOpenToast] = useState(false);
  const [toastKey, setToastKey] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');

  /** FUNCTIONS */
  function createCategory(data) {
    console.log('data', data);

    api.post('/store/category', {
      callcenter: {
        from: 0,
        status: data.callCenter,
      },
      description: data.description,
      ecommerce: {
        from: 0,
        status: data.ecommerce,
      },
      keywords_concat: data.keywords,
      logo: data.logo,
      name: data.name,
    })
      .then((response) => {
        setOpenToast(true);
        setToastType('success');
        setToastKey(`categoryCreated:id:${response.data.id}`);
        setToastMessage('Categoria cadastrada com sucesso! Você será redirecionado para a lista de categorias.');
        setTimeout(() => {
          props.history.push('/categories');
        }, [3000]);
      })
      .catch((err) => {
        setOpenToast(true);
        setToastType('error');
        setToastKey(`categoryCreated:error:${err.name}`);
        setToastMessage('Não foi possíve cadastrar a categoria. Tente novamente.');
      });
  }

  function handleAddImg(e) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setLogo(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  /** CALLBACKS */
  const handleSubmit = useCallback(() => {
    if (!name) {
      setNameError(true);
    } else {
      const data = {
        logo,
        name,
        description,
        ecommerce,
        callCenter,
        keywords,
      };

      createCategory(data);
    }
  }, [logo, name, description, ecommerce, callCenter, keywords]);

  return (
    <>
      <Toast
        key={toastKey}
        message={toastMessage}
        type={toastType}
        isOpen={openToast}
      />
      <ThemeProvider theme={theme}>
        <Header pageTitle="Gerenciar categoria">
          <Breadcrumbs separator="›">
            <Link color="inherit" variant="inherit" href="/categories">
              Catálogo
            </Link>
            <Link color="inherit" variant="inherit" href="/categories">
              Categorias
            </Link>
            <Typography color="inherit" variant="inherit">Nova Categoria</Typography>
          </Breadcrumbs>
        </Header>
        <Grid
          container
          direction="column"
          alignContent="stretch"
        >
          <Card className={classes.card} variant="outlined">
            <Grid container>
              <Grid item xs={3} className={classes.avatar}>
                <label>
                  <MuiInput
                    type="file"
                    inputProps={{
                      accept: 'image/*',
                    }}
                    onChange={handleAddImg}
                    className={classes.input}
                  />
                  <IconButton component="span">
                    <Avatar
                      src={logo}
                      style={{
                        margin: '10px',
                        width: '120px',
                        height: '120px',
                      }}
                    />
                  </IconButton>
                </label>

              </Grid>
              <Grid item xs>
                <Input
                  height="40px"
                  fontSize="12px"
                  label="Nome da categoria"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  size="small"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  error={nameError}
                  errorMessage="O campo Nome da categoria é obrigatório"
                />
                <Input
                  height="40px"
                  fontSize="12px"
                  label="Descrição"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  size="small"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
                <Input
                  height="40px"
                  fontSize="12px"
                  label="Palavras chave"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  size="small"
                  value={keywords}
                  onChange={(event) => setKeywords(event.target.value)}
                />
                <FormControl component="fieldset">
                  <FormLabel component="legend">Visível em: </FormLabel>
                  <FormGroup row>
                    <FormControlLabel
                      control={(
                        <Checkbox
                          checked={ecommerce}
                          onChange={(event) => setEcommerce(event.target.checked)}
                          name="ecommerce"
                          color="primary"
                        />
                    )}
                      label="E-commerce"
                    />
                    <FormControlLabel
                      control={(
                        <Checkbox
                          checked={callCenter}
                          onChange={(event) => setCallCenter(event.target.checked)}
                          name="callCenter"
                          color="primary"
                        />
                    )}
                      label="Call center"
                    />
                  </FormGroup>
                </FormControl>
                <Button
                  type="button"
                  // fullWidth
                  variant="contained"
                  color="primary"
                  text="Cadastrar nova categoria"
                  onClick={handleSubmit}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default CreateCategory;
