/* eslint-disable array-callback-return */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';

// Libs
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

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
import Dialog from '../../components/Dialog';

// Services
import api from '../../services/api';

// Styles
const useStyles = makeStyles(() => (
  {
    root: {
      flexGrow: 1,
      marginBottom: '24px',
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
    removeMsg: {
      textAlign: 'center',
    },
    removeActions: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      '& button': {
        margin: '6px 23px 21px 23px',
      },
    },
    actionButtons: {
      color: '#A3A3A4',
    },
    visibilityMsg: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      '& .MuiTypography-body1': {
        fontFamily: 'Poppins',
        fontSize: '12px',
        color: '#424242',

      },
    },
    visibilityActions: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      '& button': {
        margin: '6px 23px 21px 23px',
      },
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      width: '100%',
    },
  }
));

function Categories(props) {
  const classes = useStyles();

  /** STATES */
  const [openToast, setOpenToast] = useState(false);
  const [toastKey, setToastKey] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [tableData, setTableData] = useState([]);

  const [ecommerce, setEcommerce] = useState(false);
  const [callcenter, setCallcenter] = useState(false);
  const [ecommerceDate, setEcommerceDate] = useState(null);
  const [callcenterDate, setCallcenterDate] = useState(null);

  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [openVisibilityDialog, setOpenVisibilityDialog] = useState(false);

  /** EFFECTS */
  useEffect(() => {
    listCategories();
  }, []);

  useEffect(() => {
    if (categories.items) {
      const arr = [];
      categories.items.map((category) => {
        const date = new Date(category.created_at);
        const data = {
          categoryName: <CategoryName img={category.logo} name={category.name} />,
          createdAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
          actions: <TableButtons id={category.id} />,
        };
        arr.push(data);
      });
      setTableData(arr);
    }
  }, [categories]);

  useEffect(() => {
    if (categoryId) {
      getCategory(categoryId);
    }
  }, [categoryId]);

  /** FUNCTIONS */
  function listCategories() {
    api.get('/store/category')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        setOpenToast(true);
        setToastType('error');
        setToastKey(`listCategory:error:${err.name}`);
        setToastMessage('Não foi possível listas as categorias.');
      });
  }

  function getCategory(id) {
    api.get(`/store/category/${id}`)
      .then((response) => {
        console.log('getCategory response.data', response.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  function deleteCategory(id) {
    api.delete(`/store/category/${id}`)
      .then((response) => {
        setOpenToast(true);
        setToastType('success');
        setToastKey(`deleteCategory:success:${response.data.deleted}`);
        setToastMessage('Categoria deletada com sucesso.');
        setOpenRemoveDialog(false);
        listCategories();
      })
      .catch((err) => {
        setOpenToast(true);
        setToastType('error');
        setToastKey(`deleteCategory:error:${err.name}`);
        setToastMessage('Não foi possível deletar essa categoria. Tente novamente');
        setOpenRemoveDialog(false);
      });
  }

  function updateCategory(data) {
    const { id } = data;
    api.put(`/store/category/${id}`, {
      callcenter: {
        from: data.callcenterDays,
        status: data.callcenter,
      },
      ecommerce: {
        from: data.ecommerceDays,
        status: data.ecommerce,
      },
    })
      .then(() => {
        setOpenToast(true);
        setToastType('success');
        setToastKey('updateCategory:success');
        setToastMessage('Visibilidade da categoria atualizada com sucesso.');
        setOpenVisibilityDialog(false);
      })
      .catch((err) => {
        setOpenToast(true);
        setToastType('error');
        setToastKey(`updateCategory:error:${err.name}`);
        setToastMessage('Não foi possível alterar a visibilidade dessa categoria. Tente novamente');
        setOpenVisibilityDialog(false);
      });
  }

  function handleSearchCategory() {
    setOpenToast(true);
    setToastKey('search');
    setToastMessage('buscar categoria');
    setToastType('info');
  }

  function handleVisibility(id) {
    setCategoryId(id);
    setOpenVisibilityDialog(true);
  }

  function handleEdit(id) {
    setCategoryId(id);
    props.history.push(`/category/${id}`);
  }

  function handleDelete(id) {
    setCategoryId(id);
    setOpenRemoveDialog(true);
  }

  function CategoryName({ img, name }) {
    return (
      <div className={classes.tableCategories}>
        <img src={img} alt={name} width="32px" />
        <span>{name}</span>
      </div>
    );
  }

  function TableButtons({ id }) {
    return (
      <div className={classes.tableActions}>
        <IconButton
          size="small"
          onClick={() => handleVisibility(id)}
        >
          <VisibilityOffIcon className={classes.actionButtons} />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => handleEdit(id)}
        >
          <EditIcon className={classes.actionButtons} />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => handleDelete(id)}
        >
          <ClearIcon className={classes.actionButtons} />
        </IconButton>
      </div>
    );
  }

  function handleClose(type) {
    if (type === 'remove') {
      setOpenRemoveDialog(false);
    } else if (type === 'visibility') {
      setOpenVisibilityDialog(false);
    }
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

  /** CALLBACKS */
  const handleEditCategoryVisibility = useCallback(() => {
    const today = new Date();
    let diffDaysEcommerce = 0;
    let diffDaysCallcenter = 0;

    if (ecommerce) {
      const dateEcommerce = new Date(ecommerceDate);
      const diffItimeEcommerce = Math.abs(dateEcommerce - today);
      diffDaysEcommerce = Math.ceil(diffItimeEcommerce / (1000 * 60 * 60 * 24));
    }

    if (callcenter) {
      const dateCallcenter = new Date(callcenterDate);
      const diffTimeCallcenter = Math.abs(dateCallcenter - today);
      diffDaysCallcenter = Math.ceil(diffTimeCallcenter / (1000 * 60 * 60 * 24));
    }

    const data = {
      id: categoryId,
      ecommerceDays: diffDaysEcommerce,
      ecommerce,
      callcenter,
      callcenterDays: diffDaysCallcenter,
    };

    updateCategory(data);
  }, [ecommerceDate, ecommerce, callcenter, callcenterDate, categoryId]);

  return (
    <div className={classes.root}>
      <Toast
        key={toastKey}
        message={toastMessage}
        type={toastType}
        isOpen={openToast}
      />
      <Dialog
        open={openRemoveDialog}
        close={() => handleClose('remove')}
        title="Remover categoria"
        content={(
          <div className={classes.removeMsg}>
            <p>
              Tem certeza de que deseja remover a categoria
              {' '}
              <b>Emagrecimento</b>
              ?
            </p>
            <p>Esta ação não poderá ser desfeita</p>
          </div>
        )}
        actions={(
          <div className={classes.removeActions}>
            <Button
              onClick={() => deleteCategory(categoryId)}
              color="primary"
              type="button"
              variant="outlined"
              text="remover permanentemente"
              fontSize="14px"
            />
            <Button
              onClick={() => handleClose('remove')}
              color="primary"
              type="button"
              variant="contained"
              text="manter categoria"
              fontSize="14px"
            />
          </div>
        )}
      />
      <Dialog
        open={openVisibilityDialog}
        close={() => handleClose('visibility')}
        title="Alterar visibilidade"
        content={(
          <div className={classes.visibilityMsg}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={ecommerce}
                  onChange={(event) => setEcommerce(event.target.checked)}
                  name="ecommerce"
                  color="primary"
                />
            )}
              label="Visibilidade em E-commerce a partir de:"
            />
            <form className={classes.container} noValidate>
              <TextField
                id="ecommerceDate"
                label="Data"
                type="date"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={ecommerceDate}
                onChange={(event) => setEcommerceDate(event.target.value)}
                disabled={!ecommerce}
                inputProps={{
                  min: new Date(),
                }}
              />
            </form>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={callcenter}
                  onChange={(event) => setCallcenter(event.target.checked)}
                  name="callcenter"
                  color="primary"
                />
            )}
              label="Visibilidade em Call center a partir de:"
            />
            <form className={classes.container} noValidate>
              <TextField
                id="callcenterDate"
                label="Data"
                type="date"
                className={classes.textField}
                margin="normal"
                defaultValue={null}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={callcenterDate}
                onChange={(event) => setCallcenterDate(event.target.value)}
                disabled={!callcenter}
                inputProps={{
                  min: new Date(),
                }}
              />
            </form>
          </div>
        )}
        actions={(
          <div className={classes.visibilityActions}>
            <Button
              onClick={() => handleClose('visibility')}
              color="primary"
              type="button"
              variant="outlined"
              text="cancelar"
              fontSize="14px"
            />
            <Button
              onClick={handleEditCategoryVisibility}
              color="primary"
              type="button"
              variant="contained"
              text="salvar"
              fontSize="14px"
            />
          </div>
        )}
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
              fullWidth
              text="criar nova categoria"
              fontSize="14px"
              onClick={() => props.history.push('/new-category')}
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
