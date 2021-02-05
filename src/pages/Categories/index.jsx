/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';

// Libs
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

// Icons
import SearchIcon from '@material-ui/icons/Search';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';

// Components
import Toast from '../../components/Toast';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Table from '../../components/Table';

// Services
import api from '../../services/api';

// Assets
import emagrecimento from '../../assets/emagrecimento.png';
import beleza from '../../assets/beleza.png';
import desempenho from '../../assets/desempenho-fisico.png';
import estar from '../../assets/bem-estar.png';

// Styles
const useStyles = makeStyles(() => (
  {
    root: {
      flexGrow: 1,
    },
    pageHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0px 25px',
      fontFamily: 'Poppins',
      '& >p': {
        lineHeight: '27px',
        justifyContent: 'flex-start',
        fontWeight: 'bold',
        fontSize: '18px',
        color: '#A3A3A4',
      },
    },
    pageTable: {
      display: 'flex',
      flexDirection: 'row',
      padding: '0px 25px 0px 25px',
    },
    pageHeaderInput: {
      display: 'flex',
      flexDirection: 'row',
      width: '60%',
      justifyContent: 'flex-end',
      alignItems: 'center',
      '& .MuiFormControl-root': {
        marginRight: '28px',
        marginTop: '9px',
      },
    },
    tableActions: {
      display: 'flex',
      flexDirection: 'row',
      placeContent: 'space-evenly',
    },
    tableCategories: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontFamily: 'Poppins',
      '& span': {
        marginLeft: '8px',
      },
    },
  }
));

function Categories() {
  const classes = useStyles();

  /** STATES */
  const [openToast, setOpenToast] = useState(false);
  const [toastKey, setToastKey] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');

  /** EFFECTS */
  useEffect(() => {
    // listCategories();
  }, []);

  /** FUNCTIONS */
  function listCategories() {
    api.get('/store/category')
      .then((response) => {
        console.log('response.data', response.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  function handleChangeCategoryVisibility() {
    setOpenToast(true);
    setToastKey('changeVisibility');
    setToastMessage('Mudar visibilidade');
    setToastType('warning');
  }

  function handleEditCategory() {
    setOpenToast(true);
    setToastKey('edit');
    setToastMessage('Editar');
  }

  function handleRemoveCategory() {
    setOpenToast(true);
    setToastKey('remove');
    setToastMessage('remover');
    setToastType('warning');
  }

  function handleSearchCategory() {
    setOpenToast(true);
    setToastKey('search');
    setToastMessage('buscar categoria');
    setToastType('info');
  }

  function CategoryName({ img, name }) {
    return (
      <div className={classes.tableCategories}>
        <img src={img} alt={name} />
        <span>{name}</span>
      </div>
    );
  }

  function TableButtons() {
    return (
      <div className={classes.tableActions}>
        <IconButton
          size="small"
          onClick={handleChangeCategoryVisibility}
        >
          <VisibilityOffIcon color="secondary" />
        </IconButton>
        <IconButton
          size="small"
          onClick={handleEditCategory}
        >
          <EditIcon color="secondary" />
        </IconButton>
        <IconButton
          size="small"
          onClick={handleRemoveCategory}
        >
          <ClearIcon color="secondary" />
        </IconButton>
      </div>
    );
  }

  /** MEMOS */
  const tableColumns = useMemo(
    () => [
      {
        Header: 'Nome da Categoria',
        accessor: 'categoryName',
      },
      {
        Header: 'Criação',
        accessor: 'createdAt',
      },
      {
        Header: 'Ações',
        accessor: 'actions',
      },
    ],
    [],
  );

  const tableData = useMemo(
    () => [
      {
        categoryName: <CategoryName img={emagrecimento} name="Emagrecimento" />,
        createdAt: '22/02/2020',
        actions: <TableButtons />,
      },
      {
        categoryName: <CategoryName img={beleza} name="Beleza" />,
        createdAt: '01/01/2020',
        actions: <TableButtons />,
      },
      {
        categoryName: <CategoryName img={desempenho} name="Desempenho Físico" />,
        createdAt: '24/01/2020',
        actions: <TableButtons />,
      },
      {
        categoryName: <CategoryName img={estar} name="Bem-estar" />,
        createdAt: '16/03/2020',
        actions: <TableButtons />,
      },
    ],
  );

  return (
    <div className={classes.root}>
      <Toast
        key={toastKey}
        message={toastMessage}
        type={toastType}
        isOpen={openToast}
      />
      <Header pageTitle="Lista de categorias">
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link color="inherit" variant="inherit" href="/categories">
            Catálogo
          </Link>
          <Typography color="inherit" variant="inherit">Categorias</Typography>
        </Breadcrumbs>
      </Header>
      <Grid
        container
        direction="column"
        alignContent="stretch"
      >
        <div className={classes.pageHeader}>
          <p>Lista de Categorias</p>
          <div className={classes.pageHeaderInput}>
            <Input
              borderRadius="90px"
              width="362px"
              height="40px"
              fontSize="12px"
              icon={<SearchIcon color="primary" />}
              inputIconButtonFunction={handleSearchCategory}
              label="buscar categoria"
              variant="outlined"
              margin="dense"
              fullWidth
              size="small"
            />
            <Button
              type="button"
              variant="contained"
              color="primary"
              text="criar nova categoria"
              fontSize="14px"
            />
          </div>
        </div>
        <div className={classes.pageTable}>
          <Table columns={tableColumns} data={tableData} />
        </div>
      </Grid>
    </div>
  );
}

export default Categories;
