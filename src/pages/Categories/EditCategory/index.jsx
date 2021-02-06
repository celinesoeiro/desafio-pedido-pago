/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, {
  useState, useEffect, useCallback,
} from 'react';

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
    buttons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '50%',
    },
  }
));

function EditCategory(props) {
  const classes = useStyles();
  const url = window.location.pathname;

  /** STATES */
  const [openToast, setOpenToast] = useState(false);
  const [toastKey, setToastKey] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');

  const [categoryId, setCategoryId] = useState(null);
  const [category, setCategory] = useState(null);

  const [logo, setLogo] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [callcenter, setCallcenter] = useState(null);
  const [ecommerce, setEcommerce] = useState(null);

  const [edit, setEdit] = useState(false);

  const [nameError, setNameError] = useState(false);

  /** EFFECTS */
  useEffect(() => {
    const id = url.substring(url.lastIndexOf('/') + 1);
    setCategoryId(id);
    getCategory(id);
  }, [url]);

  useEffect(() => {
    if (category) {
      setLogo(category.logo);
      setName(category.name);
      setDescription(category.description);
      setCallcenter(category.callcenter);
      setEcommerce(category.ecommerce);
    }
  }, [category]);

  /** FUNCTIONS */
  function getCategory(id) {
    api.get(`/store/category/${id}`)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((err) => {
        setOpenToast(true);
        setToastType('error');
        setToastKey(`getCategory:error:${err.name}`);
        setToastMessage('Não foi possível pegar as informações da categoria. Tente novamente.');
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

  function updateCategory(data) {
    const { id } = data;
    api.put(`/store/category/${id}`, {
      description: data.description,
      name: data.name,
      new_logo_image: data.logo,
    })
      .then(() => {
        setOpenToast(true);
        setToastType('success');
        setToastKey('updateCategory:success');
        setToastMessage('Categoria atualizada com sucesso! Você será redirecionado para a lista de categorias.');
        setTimeout(() => {
          props.history.push('/categories');
        }, [3000]);
      })
      .catch((err) => {
        setEdit(false);
        setOpenToast(true);
        setToastType('error');
        setToastKey(`updateCategory:error:${err.name}`);
        setToastMessage('Não foi possível atualizar a categoria. Tente novamente');
      });
  }

  /** CALLBACKS */
  const handleSubmit = useCallback(() => {
    if (!name) {
      setNameError(true);
    } else {
      const data = {
        id: categoryId,
        logo,
        name,
        description,
      };
      updateCategory(data);
    }
  }, [logo, name, description, categoryId]);

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
            <Typography color="inherit" variant="inherit">
              {name}
            </Typography>
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
                    disabled={!edit}
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
                  disabled={!edit}
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
                  disabled={!edit}
                  onChange={(event) => setDescription(event.target.value)}
                />
                {edit ? (
                  ''
                ) : (
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Visível em: </FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={ecommerce ? !!ecommerce.status : false}
                            onChange={(event) => setEcommerce(event.target.checked)}
                            name="ecommerce"
                            color="primary"
                            disabled
                          />
                      )}
                        label="E-commerce"
                      />
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={callcenter ? !!callcenter.status : false}
                            onChange={(event) => setCallcenter(event.target.checked)}
                            name="callCenter"
                            color="primary"
                            disabled
                          />
                      )}
                        label="Call center"
                      />
                    </FormGroup>
                  </FormControl>
                )}
                {edit ? (
                  <div className={classes.buttons}>
                    <Button
                      type="button"
                      variant="outlined"
                      color="primary"
                      text="Cancelar"
                      onClick={() => setEdit(false)}
                    />
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      text="Salvar"
                      onClick={handleSubmit}
                    />
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    text="Editar categoria"
                    onClick={() => setEdit(true)}
                  />
                )}
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default EditCategory;
