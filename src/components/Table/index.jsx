/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

// Libs
import { makeStyles } from '@material-ui/core/styles';
import { useTable, usePagination } from 'react-table';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Icons
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

// Styles
const useStyles = makeStyles(() => (
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    table: {
      padding: 0,
      border: '1px solid #E1E1E1',
      borderRadius: '4px',
      width: '100%',
      '& th': {
        fontFamily: 'Poppins',
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.03em',
      },
      '& tr': {
        height: '48px',
        '& td': {
          padding: '8px',
          fontSize: '12px',
          letterSpacing: '0.03em',
        },

      },
    },
    pagination: {
      display: 'flex',
      justifyContent: 'space-evenly',
      border: '1px solid #E1E1E1',
      alignItems: 'center',
    },
    button: {
      background: 'transparent',
      border: 'none',
      borderRadius: '50%',
      margin: '5px',
    },
  }
));

function Table(props) {
  const { columns, data } = props;
  const classes = useStyles();

  const categoriesTable = useTable({
    columns,
    data,
    initialState: { pageIndex: 0 },
  },
  usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = categoriesTable;

  return (
    <div className={classes.root}>
      <MaUTable {...getTableProps()} className={classes.table}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </MaUTable>
      <div className={classes.pagination}>
        {/* <button type="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        {' '} */}
        <button
          type="button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={classes.button}
        >
          <ArrowBackIosIcon color="primary" />
        </button>
        {' '}
        <span>
          Página
          {' '}
          <strong>
            {pageIndex + 1}
            {' '}
            de
            {' '}
            {pageOptions.length}
          </strong>
          {' '}
        </span>
        <button
          type="button"
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={classes.button}
        >
          <ArrowForwardIosIcon color="primary" />
        </button>
        {/* {' '}
        <button type="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        {' '} */}
      </div>
    </div>
  );
}

export default Table;
